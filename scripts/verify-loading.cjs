const fs=require('fs'),vm=require('vm'),assert=require('assert');
const code=fs.readFileSync('hero-loading.js','utf8');
async function scenario(mode){
 const root=new Set(),vc=new Set(),events={},ve={},source={dataset:{src:'video.mp4'},removeAttribute(){delete this.src},addEventListener(){}};
 let timeout;
 const video={classList:{add:x=>vc.add(x),contains:x=>vc.has(x)},querySelector:()=>source,addEventListener:(n,f)=>ve[n]=f,pause(){},load(){},play:()=>mode==='blocked'?Promise.reject():Promise.resolve(),requestVideoFrameCallback:f=>f()};
 vm.runInNewContext(code,{navigator:{connection:{saveData:mode==='save',effectiveType:mode==='slow'?'3g':'4g'}},matchMedia:q=>({matches:q.includes('600')?mode==='mobile':mode==='reduced'}),document:{documentElement:{classList:{add:x=>root.add(x),remove:x=>root.delete(x)}},addEventListener:(n,f)=>events[n]=f,querySelector:s=>s==='.hero-video'?video:{complete:true}},window:{},setTimeout:f=>{timeout=f;return 1},clearTimeout(){}});
 if(mode==='mobile')assert(!root.has('hero-loading'));
 events.DOMContentLoaded();await Promise.resolve();
 if(['save','slow','reduced','blocked'].includes(mode)){assert(!source.src);assert(!root.has('hero-loading'));}
 else if(mode==='timeout'){timeout();assert(!source.src);assert(!root.has('hero-loading'));}
 else{assert(source.src);ve.playing();assert(vc.has('is-playing'));assert(!root.has('hero-loading'));}
 console.log(mode+': OK');
}
(async()=>{for(const m of ['desktop','mobile','save','slow','reduced','blocked','timeout'])await scenario(m);
const html=fs.readFileSync('index.html','utf8');
assert(!html.includes('↗'));
for(const m of html.matchAll(/(?:src|href|data-src)="(assets\/[^"?#]+)/g))assert(fs.existsSync(m[1]),m[1]);
assert(html.includes('<source data-src='));
assert.equal((html.match(/src="assets\/article-\d.webp"/g)||[]).length,3);
console.log('Asset references, lazy article images and SVG arrows: OK');})();
