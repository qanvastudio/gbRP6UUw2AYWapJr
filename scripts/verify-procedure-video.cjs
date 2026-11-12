const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const code = fs.readFileSync('procedimientos.js', 'utf8');
async function scenario(mode) {
  let observe, plays = 0, pauses = 0;
  const classes = new Set();
  const video = {
    dataset: {mobile: 'mobile.mp4', desktop: 'desktop.mp4'},
    closest: () => ({}), getAttribute() { return this.src; },
    classList: {add: x => classes.add(x), remove: x => classes.delete(x)},
    addEventListener() {}, pause() { pauses++; },
    play() { plays++; return mode === 'blocked' ? Promise.reject() : Promise.resolve(); }
  };
  const document = {hidden: false, querySelector: () => null, querySelectorAll: () => [video], addEventListener() {}};
  const matchMedia = q => ({matches: q.includes('600') ? mode === 'mobile' : mode === 'reduced', addEventListener() {}});
  const Observer = function (callback) { observe = callback; this.observe = () => {}; };
  vm.runInNewContext(code, {document, navigator: {connection: {saveData: mode === 'save', effectiveType: mode === 'slow' ? '3g' : '4g'}}, window: {matchMedia, IntersectionObserver: Observer}, IntersectionObserver: Observer});
  assert.equal(video.src, undefined, 'must not request video before visible');
  observe([{isIntersecting: true, intersectionRatio: 0.01}]);
  assert.equal(plays, 0, 'must respect visibility threshold');
  observe([{isIntersecting: true, intersectionRatio: 0.5}]);
  await new Promise(resolve => setImmediate(resolve));
  if (['save', 'slow', 'reduced'].includes(mode)) assert.equal(video.src, undefined);
  else {
    assert.equal(video.src, mode === 'mobile' ? 'mobile.mp4' : 'desktop.mp4');
    assert.equal(classes.has('has-frame'), mode !== 'blocked');
  }
  const before = pauses;
  observe([{isIntersecting: false, intersectionRatio: 0}]);
  assert(pauses > before, 'pause when leaving viewport');
  console.log(`Procedure video ${mode}: OK`);
}
(async () => { for (const mode of ['desktop', 'mobile', 'save', 'slow', 'reduced', 'blocked']) await scenario(mode); })().catch(error => { console.error(error); process.exitCode = 1; });

