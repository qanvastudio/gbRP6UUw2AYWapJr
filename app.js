const menuButton = document.querySelector('.menu-button');
const menu = document.querySelector('#site-menu');
function closeMenu(){if(!menu||!menuButton)return;menu.hidden=true;menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','Abrir menú');}
if(menu&&menuButton){
menuButton.addEventListener('click',()=>{const open=menu.hidden;menu.hidden=!open;menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'Cerrar menú':'Abrir menú');});
document.addEventListener('click',event=>{if(!event.target.closest('.site-menu, .menu-button'))closeMenu();});
document.addEventListener('keydown',event=>{if(event.key==='Escape')closeMenu();});
menu.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
}

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
  const updateHeaderBackground = () => siteHeader.classList.toggle('is-scrolled', document.body.classList.contains('subpage') || window.scrollY > 24);
  window.addEventListener('scroll', updateHeaderBackground, { passive: true });
  window.addEventListener('pageshow', updateHeaderBackground);
  window.addEventListener('hashchange', updateHeaderBackground);
  updateHeaderBackground();
}

// Completed years since the medical degree examination on March 3, 2005.
const trajectoryYears = document.querySelector('#trajectory-years');
if (trajectoryYears) {
  const today = new Date();
  const beforeAnniversary = today.getMonth() < 2 || (today.getMonth() === 2 && today.getDate() < 3);
  const years = Math.max(0, today.getFullYear() - 2005 - Number(beforeAnniversary));
  trajectoryYears.firstChild.nodeValue = String(years);
  trajectoryYears.setAttribute('aria-label', years + ' años de trayectoria como médico cirujano');
}
