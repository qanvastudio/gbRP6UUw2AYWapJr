const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const { root, siteFiles } = require('./site-files.cjs');
const files = siteFiles();
const pages = files.filter(f => f.endsWith('.html'));
let links = 0;
for (const page of pages) {
  const html = fs.readFileSync(path.join(root, page), 'utf8');
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
  assert.equal(new Set(ids).size, ids.length, `${page}: duplicate id`);
  assert(/<title>[^<]+<\/title>/.test(html), `${page}: title missing`);
  assert(/<meta name="description" content="[^"]+"/.test(html), `${page}: description missing`);
  assert.equal((html.match(/<h1\b/g) || []).length, 1, `${page}: expected one h1`);
  assert(!/Borrador editorial|55 0000 0000|número provisional|4784686|9940991/i.test(html), `${page}: stale content`);
  for (const match of html.matchAll(/<a\b([^>]+)>/g)) {
    const attrs = match[1], href = attrs.match(/href="([^"]+)"/)?.[1]?.replaceAll('&amp;', '&');
    assert(href, `${page}: empty anchor`); links++;
    if (attrs.includes('target="_blank"')) assert(/rel="[^"]*noopener/.test(attrs), `${page}: unsafe new tab`);
    if (/^https:/.test(href)) { new URL(href); continue; }
    if (/^(?:mailto|tel):/.test(href)) continue;
    const [target, fragment] = href.split('#');
    const destination = target || page;
    assert(fs.existsSync(path.join(root, destination)), `${page}: broken link ${href}`);
    if (fragment) {
      const targetHtml = fs.readFileSync(path.join(root, destination), 'utf8');
      assert(targetHtml.includes(`id="${fragment}"`), `${page}: missing anchor ${href}`);
    }
  }
  for (const match of html.matchAll(/<img\b([^>]+)>/g)) {
    assert(/\balt="[^"]*"/.test(match[1]), `${page}: missing image alternative`);
    assert(/\bwidth="\d+"/.test(match[1]) && /\bheight="\d+"/.test(match[1]), `${page}: image dimensions missing`);
  }
  for (const match of html.matchAll(/aria-(?:controls|labelledby)="([^"]+)"/g)) {
    for (const id of match[1].split(/\s+/)) assert(ids.includes(id), `${page}: broken accessibility reference ${id}`);
  }
}
const runtimeAssets = new Set(files.filter(f => f.startsWith('assets/')));
const unused = fs.readdirSync(path.join(root, 'assets')).filter(f => !runtimeAssets.has('assets/'+f));
assert.deepEqual(unused, [], 'Unused public assets');
const cards = require('../procedimientos-featured.cjs');
for (const card of cards) assert(fs.existsSync(path.join(root, card.sourceImage)), `${card.id}: missing regeneration source`);
console.log(`PASS: ${pages.length} pages, ${links} links, ${runtimeAssets.size} public assets, no missing files/anchors or unused public assets.`);
