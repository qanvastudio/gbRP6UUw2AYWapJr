const menuButton = document.querySelector('.menu-button');
const menu = document.querySelector('#site-menu');
const dialog = document.querySelector('#detail-dialog');
const sections = {
  articulos: {title:'Todos los artículos', text:'Lecturas para preparar tu conversación con el Dr. Tony Bustos.', links:['articulo-consulta','articulo-credenciales','articulo-acompanamiento']},
  'articulo-consulta': {title:'Cómo preparar tus preguntas para la primera consulta', text:'Antes de tu cita, escribe qué te gustaría conversar con el Dr. Tony Bustos y cuáles son tus principales dudas. Ordenarlas por importancia puede ayudarte a aprovechar la conversación.', paragraphs:['Puedes organizar tu lista en tres temas: tus objetivos, las opciones que deseas conocer y las preguntas sobre el seguimiento. Deja espacio para anotar las respuestas y los puntos que quieras retomar.', 'Confirma con el consultorio la ubicación, el horario y qué documentación solicita para la primera visita. Si algo no queda claro durante la consulta, pide que te lo expliquen nuevamente.'], pending:'Borrador editorial pendiente de revisión por el Dr. Tony Bustos. No contiene indicaciones médicas personalizadas.'},
  'articulo-credenciales': {title:'Formación y credenciales: qué preguntar a tu médico', text:'Conocer la trayectoria del profesional puede empezar por preguntas concretas: dónde se formó, cuál es su especialidad y qué documentos respaldan la información de su perfil.', paragraphs:['Anota los datos que deseas consultar: institución, cédula profesional, certificaciones y vigencia. Si se mencionan asociaciones o consejos, pregunta qué relación tiene el profesional con cada institución y cómo puedes verificarla.', 'El perfil del Dr. Tony Bustos contará con un espacio para esta información. Los datos sobre formación, cédula, AMCPER y CMCPER permanecen pendientes de confirmación; este borrador no acredita membresías ni certificaciones.'], pending:'Borrador editorial pendiente de revisión por el Dr. Tony Bustos.'},
  'articulo-acompanamiento': {title:'Cómo organizar tus dudas y tu acompañamiento', text:'Si deseas que alguien te acompañe a una consulta, confirma primero con el consultorio las condiciones de acceso. Comparte con esa persona las preguntas que quieres plantear y el apoyo que te gustaría recibir.', paragraphs:['Puedes reunir en una misma nota el horario, la ubicación y los temas de conversación. Decide qué información deseas compartir y qué asuntos prefieres tratar en privado.', 'Si estás considerando un procedimiento, pregunta al Dr. Tony Bustos qué apoyo y seguimiento necesitarías en tu caso. La organización de traslados, tiempos y actividades debe partir de las indicaciones que recibas durante la valoración.'], pending:'Borrador editorial pendiente de revisión por el Dr. Tony Bustos. No establece cuidados ni tiempos de recuperación.'},
  doctor: {title:'Dr. Tony Bustos', text:'Formación, credenciales y filosofía de atención.', pending:'El perfil profesional completo se incorporará con la información y las credenciales verificadas del Dr. Tony Bustos.'},
  procedimientos: {title:'Procedimientos', text:'Conoce las categorías de procedimientos y consulta la información de cada uno.', pending:'El catálogo y las fichas detalladas están pendientes de la información proporcionada por el consultorio.'},
  resultados: {title:'Resultados', text:'Galería clínica del Dr. Tony Bustos.', pending:'La galería se habilitará cuando estén disponibles las fotografías clínicas autorizadas. La imagen de portada es ilustrativa y no representa un resultado médico.'},
  pacientes: {title:'Información para pacientes', text:'Preparación, recuperación y preguntas frecuentes.', pending:'Las indicaciones específicas y las respuestas a preguntas frecuentes se incorporarán una vez revisadas por el Dr. Tony Bustos.'},
};
function closeMenu(){menu.hidden=true;menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','Abrir menú');}
menuButton.addEventListener('click',()=>{const open=menu.hidden;menu.hidden=!open;menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'Cerrar menú':'Abrir menú');});
document.addEventListener('click',event=>{
  const trigger=event.target.closest('[data-panel]');
  if(trigger){
    event.preventDefault();
    const section=sections[trigger.dataset.panel];
    if(!section)return;
    document.querySelector('#dialog-title').textContent=section.title;
    const content=document.querySelector('#dialog-content');
    content.replaceChildren();
    for(const [text,cls] of [[section.text,''],...(section.paragraphs||[]).map(text=>[text,'']),[section.pending,'pending']]){
      if(!text)continue;
      const p=document.createElement('p');p.textContent=text;p.className=cls;content.append(p);
    }
    if(section.links){
      const list=document.createElement('ul');list.className='article-directory';
      for(const key of section.links){const li=document.createElement('li');const a=document.createElement('a');a.href='#'+key;a.dataset.panel=key;a.textContent=sections[key].title;li.append(a);list.append(li);}
      content.append(list);
    }
    closeMenu();
    if(!dialog.open)dialog.showModal();
    dialog.scrollTop=0;
    document.querySelector('.close-dialog').focus();
    document.body.classList.add('modal-open');
  }
  else if(!event.target.closest('.site-menu, .menu-button'))closeMenu();
});
document.querySelector('.close-dialog').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
dialog.addEventListener('close',()=>document.body.classList.remove('modal-open'));
document.addEventListener('keydown',event=>{if(event.key==='Escape')closeMenu();});
menu.querySelectorAll('a:not([data-panel])').forEach(link=>link.addEventListener('click',closeMenu));

// Repeat one complete logo group for a seamless, pausable carousel.
const credentialCarousel = document.querySelector('.credential-carousel');
if (credentialCarousel) {
  const track = credentialCarousel.querySelector('.credential-logo-track');
  const group = track.querySelector('.credential-logo-group');
  const copy = group.cloneNode(true);
  copy.setAttribute('aria-hidden', 'true');
  copy.removeAttribute('aria-label');
  copy.querySelectorAll('img').forEach(image => { image.alt = ''; });
  track.append(copy);
  credentialCarousel.classList.add('is-animated');
  const toggle = credentialCarousel.querySelector('.credential-carousel-toggle');
  toggle.hidden = false;
  toggle.addEventListener('click', () => {
    const paused = credentialCarousel.classList.toggle('is-paused');
    toggle.setAttribute('aria-pressed', String(paused));
    toggle.textContent = paused ? 'Reanudar movimiento' : 'Pausar movimiento';
  });
}

const footerYear = document.querySelector('#footer-year');
if (footerYear) footerYear.textContent = new Date().getFullYear();

// Set the header state on load as well as after scrolling (including anchor URLs).
const siteHeader = document.querySelector('.header');
if (siteHeader) {
  const updateHeaderBackground = () => siteHeader.classList.toggle('is-scrolled', window.scrollY > 24);
  window.addEventListener('scroll', updateHeaderBackground, { passive: true });
  window.addEventListener('pageshow', updateHeaderBackground);
  window.addEventListener('hashchange', updateHeaderBackground);
  updateHeaderBackground();
}
