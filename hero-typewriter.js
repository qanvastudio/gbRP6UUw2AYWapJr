(() => {
  const heading = document.querySelector('.hero-copy h1');
  if (!heading) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  if (reduced.matches) return;
  const original = heading.innerHTML;
  heading.setAttribute('aria-label', heading.innerText.replace(/\s+/g, ' ').trim());
  const letters = [];
  // Keep the full phrase in the layout so typing never moves the content below it.
  for (const node of [...heading.childNodes]) {
    if (node.nodeType !== Node.TEXT_NODE) continue;
    const fragment = document.createDocumentFragment();
    for (const character of node.textContent) {
      const span = document.createElement('span');
      span.textContent = character;
      span.setAttribute('aria-hidden', 'true');
      span.style.visibility = 'hidden';
      letters.push(span);
      fragment.append(span);
    }
    node.replaceWith(fragment);
  }
  let position = 0;
  let timer;
  let stopped = false;
  function tick() {
    if (stopped) return;
    if (document.hidden || document.documentElement.classList.contains('hero-loading')) {
      timer = setTimeout(tick, 200);
      return;
    }
    if (position < letters.length) {
      letters[position++].style.visibility = 'visible';
      if (position < letters.length) timer = setTimeout(tick, 75);
    }
  }
  reduced.addEventListener('change', event => {
    if (!event.matches) return;
    stopped = true;
    clearTimeout(timer);
    heading.innerHTML = original;
    heading.removeAttribute('aria-label');
  });
  timer = setTimeout(tick, 250);
})();
