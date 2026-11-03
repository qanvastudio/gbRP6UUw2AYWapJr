const fs=require('fs'),vm=require('vm'),assert=require('assert');
class Element{
 constructor(tag){this.tag=tag;this.children=[];this.attrs={};this.events={};this.className='';this.style={setProperty(){}};this.classList={add:c=>{this.className+=' '+c},remove:c=>{this.className=this.className.split(' ').filter(v=>v!==c).join(' ')}};}
 setAttribute(k,v){this.attrs[k]=v}getAttribute(k){return this.attrs[k]}
 append(...nodes){this.children.push(...nodes)}
 before(node){this.beforeNode=node}replaceChildren(){this.children=[]}
 addEventListener(n,f){this.events[n]=f}focus(){}showModal(){this.open=true}close(){this.open=false;this.events.close?.()}
 getBoundingClientRect(){return {left:0,top:0,width:400,height:1000,right:400,bottom:1000}}
 querySelectorAll(s){const matches=n=>s.startsWith('.')?n.className.split(' ').includes(s.slice(1)):n.tag===s;return this.children.flatMap(n=>[...(matches(n)?[n]:[]),...n.querySelectorAll(s)])}
 querySelector(s){return this.querySelectorAll(s)[0]}
}
const dialog=new Element('dialog'),container=new Element('div'),close=new Element('button'),trigger=new Element('a');container.className='journey-panels';close.className='trajectory-close';dialog.append(container,close);
const context={window:{addEventListener(){}},requestAnimationFrame:f=>f(),document:{addEventListener(){},querySelector:()=>dialog,querySelectorAll:()=>[trigger],createElement:t=>new Element(t),createElementNS:(_,t)=>new Element(t),body:new Element('body')}};
vm.createContext(context);vm.runInContext(fs.readFileSync('timeline-data.js','utf8'),context);vm.runInContext(fs.readFileSync('timeline.js','utf8'),context);

const items=context.window.trajectoryItems;
const select=container.querySelector('select');
const years=[...new Set(items.map(item=>item.year))].sort((a,b)=>b-a);
assert.equal(Number(select.value),years[0]);
assert.deepEqual(select.children.map(option=>option.value),years.map(String));
assert.equal(container.querySelectorAll('.journey-event').length,items.filter(item=>item.year===years[0]).length);
assert.equal(container.beforeNode,undefined);
const colors=[];
for(const year of years){
 select.value=String(year);select.events.change();
 assert.equal(container.querySelectorAll('.journey-event').length,items.filter(item=>item.year===year).length);
 assert.equal(container.querySelectorAll('.journey-year').length,1);
 assert.equal(container.querySelector('h3').querySelector('select'),select);
 assert(container.querySelectorAll('.journey-detail').every(detail=>!detail.hidden));
 assert(container.querySelector('path').getAttribute('d').length>0);
 colors.push(container.querySelector('stop').getAttribute('stop-color'));
}
assert.equal(new Set(colors).size,years.length);
console.log('PASS: latest year initially, descending year options, embedded year selector, every filter, unique colors and expanded details.');

const picker=container.querySelector('.journey-year-picker');
const choices=picker.querySelectorAll('button');
assert.equal(choices.length,years.length);
choices[0].events.click();
assert.equal(select.value,String(years[0]));
assert.equal(picker.open,false);
assert.equal(choices[0].getAttribute('aria-current'),'true');
picker.open=true;picker.events.keydown({key:'Escape'});assert.equal(picker.open,false);
assert(select.hidden);
console.log('PASS: custom year choices select correctly, active state, Escape closes and native select hidden.');
