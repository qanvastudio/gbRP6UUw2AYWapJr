(() => {
 const dialog=document.querySelector('#trajectory-dialog');
 const container=dialog.querySelector('.journey-panels');
 const ns='http://www.w3.org/2000/svg';
 const groupYear=item=>item.year===null||item.year<2010?2009:item.year;
 // Preserve the editorial sequence within each displayed year group.
 const items=[...window.trajectoryItems].sort((a,b)=>groupYear(b)-groupYear(a));
 const yearLabel=year=>year==='all'?'Todas':Number(year)===2009?'< 2010':String(year);
 const years=[...new Set(items.map(groupYear))];
 const colors=new Map([...years].reverse().map((year,index)=>[year,`hsl(${(198+index*38/Math.max(1,years.length-1)).toFixed(3)} ${55+(index%3)*10}% ${28+(index%4)*7}%)`]));
 let observer;
 const select=document.createElement('select');select.id='journey-year-filter';select.className='journey-year-select';select.setAttribute('aria-label','Seleccionar año de trayectoria');
 for(const [value,text] of ['all',...years].map(year=>[String(year),yearLabel(year)])){
  const option=document.createElement('option');option.value=value;option.textContent=text;select.append(option);
 }
 select.value='all';
 select.hidden=true;
 const picker=document.createElement('details');picker.className='journey-year-picker';
 const trigger=document.createElement('summary');trigger.className='journey-year-trigger';trigger.setAttribute('aria-label','Seleccionar año de trayectoria');
 const menu=document.createElement('div');menu.className='journey-year-options';menu.setAttribute('aria-label','Años disponibles');
 const choices=[];
 for(const year of ['all',...years]){
  const choice=document.createElement('button');choice.type='button';choice.textContent=yearLabel(year);
  choice.addEventListener('click',()=>{select.value=String(year);updateYear()});
  choices.push({choice,year});menu.append(choice);
 }
 picker.append(trigger,menu,select);
 function updateYear(){picker.open=false;render();trigger.focus();requestAnimationFrame(drawPaths)}
 select.addEventListener('change',updateYear);
 picker.addEventListener('keydown',event=>{if(event.key==='Escape'){picker.open=false;trigger.focus()}});
 document.addEventListener('click',event=>{if(!picker.contains(event.target))picker.open=false});


 function drawPaths(){
  if(!container.children.length)return;
  const track=container.querySelector('.journey-track'),svg=track.querySelector('svg'),rect=track.getBoundingClientRect();
  const points=[...track.querySelectorAll('.journey-dot')].map(dot=>{const r=dot.getBoundingClientRect();return {x:r.left+r.width/2-rect.left,y:r.top+r.height/2-rect.top}});
  svg.setAttribute('viewBox',`0 0 ${rect.width} ${rect.height}`);
  svg.querySelector('linearGradient').setAttribute('y2',rect.height);
  const years=[...track.querySelectorAll('.journey-year')];
  const stops=svg.querySelectorAll('stop');
  years.forEach((group,i)=>{
    const start=i===0?0:(group.getBoundingClientRect().top-rect.top)/rect.height;
    const end=i===years.length-1?1:(years[i+1].getBoundingClientRect().top-rect.top)/rect.height;
    stops[i*2].setAttribute('offset',Math.max(0,Math.min(1,start)));
    stops[i*2+1].setAttribute('offset',Math.max(0,Math.min(1,end)));
  });
  if(!points.length)return;
  let d=points.length===1?`M ${points[0].x} ${Math.max(0,points[0].y-20)} L ${points[0].x} ${points[0].y+40}`:`M ${points[0].x} ${points[0].y}`;
  for(let i=1;i<points.length;i++){const a=points[i-1],b=points[i],mid=(a.y+b.y)/2;d+=` C ${a.x} ${mid}, ${b.x} ${mid}, ${b.x} ${b.y}`;}
  svg.querySelectorAll('path').forEach(path=>path.setAttribute('d',d));
 }
 function render(){
  if(observer)observer.disconnect();
  container.replaceChildren();
  const visible=items.filter(item=>select.value==='all'||String(groupYear(item))===select.value);
  const panel=document.createElement('div');panel.className='journey-panel';
  trigger.textContent=yearLabel(select.value);choices.forEach(({choice,year})=>choice.setAttribute('aria-current',String(year)===select.value?'true':'false'));panel.append(picker);
  const track=document.createElement('div');track.className='journey-track';
  const svg=document.createElementNS(ns,'svg');svg.classList.add('journey-line');svg.setAttribute('aria-hidden','true');svg.setAttribute('preserveAspectRatio','none');
  const defs=document.createElementNS(ns,'defs');
  const gradient=document.createElementNS(ns,'linearGradient');gradient.id='journey-year-colors';gradient.setAttribute('gradientUnits','userSpaceOnUse');gradient.setAttribute('x1','0');gradient.setAttribute('x2','0');gradient.setAttribute('y1','0');gradient.setAttribute('y2','1');defs.append(gradient);svg.append(defs);
  for(const name of ['outer','middle','inner','core']){const path=document.createElementNS(ns,'path');path.setAttribute('class','flow-'+name);svg.append(path);}
  track.append(svg);
  const groups=new Map();
  for(const item of visible){const year=groupYear(item);if(!groups.has(year))groups.set(year,[]);groups.get(year).push(item);}
  let nodeIndex=0;
  for(const [year,items] of groups){
   const group=document.createElement('section');group.className='journey-year';
   const color=colors.get(year);group.style.setProperty('--year-color',color);
   for(let n=0;n<2;n++){const stop=document.createElementNS(ns,'stop');stop.setAttribute('stop-color',color);gradient.append(stop);}
   const heading=document.createElement('h3');heading.id='journey-year-'+year;heading.textContent=yearLabel(year);heading.setAttribute('aria-label',yearLabel(year));group.setAttribute('aria-labelledby',heading.id);group.append(heading);
   const list=document.createElement('ol');list.className='journey-year-list';
   for(const item of items){
    const left=nodeIndex++%2===0;
    const row=document.createElement('li');row.className='journey-event '+(left?'label-left':'label-right');
    const dot=document.createElement('span');dot.className='journey-dot';dot.setAttribute('aria-hidden','true');
    const copy=document.createElement('div');copy.className='journey-copy';
    const button=document.createElement('div');button.className='journey-label';
    const title=document.createElement('span');title.className='journey-title';title.textContent=item.title;button.append(title);
    const detail=document.createElement('p');detail.className='journey-detail';detail.id='journey-detail-'+item.id;detail.hidden=false;detail.textContent=item.text;
    if(/^Cédula (profesional|de especialidad)$/.test(item.title)){
     const badge=document.createElement('img');badge.className='credential-verified';badge.src='assets/credential-verified.svg';badge.alt='Verificado';badge.width=16;badge.height=16;detail.append(badge);
    }
    copy.append(button,detail);
    if(item.image){
     const figure=document.createElement('figure');figure.className='journey-photo';
     const image=document.createElement('img');image.src=item.image.src;image.alt=item.image.caption;image.width=item.image.width;image.height=item.image.height;image.loading='lazy';image.decoding='async';
     const caption=document.createElement('figcaption');caption.textContent=item.image.caption;
     figure.append(image,caption);copy.append(figure);
    }
    row.append(dot,copy);list.append(row);
   }
   group.append(list);track.append(group);
  }
  panel.append(track);container.append(panel);
  if('ResizeObserver' in window){observer=new ResizeObserver(()=>requestAnimationFrame(drawPaths));observer.observe(track);}
 }
 render();
 requestAnimationFrame(drawPaths);
 if(document.fonts)document.fonts.ready.then(drawPaths);
 window.addEventListener('resize',()=>requestAnimationFrame(drawPaths));
})();
