(() => {
  const catalog = document.querySelector('.procedure-catalog');
  if (!catalog) return;
  const search = catalog.querySelector('#procedure-search');
  const filters = [...catalog.querySelectorAll('.category-filter')];
  const groups = [...catalog.querySelectorAll('.procedure-group')];
  const clear = catalog.querySelector('#clear-filters');
  const normalize = value => value.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('es').trim();
  const entries = groups.map(group => ({ group, items: [...group.querySelectorAll('.procedure-item')].map(item => ({ item, text: normalize(item.querySelector('h3').textContent) })) }));
  let category = 'all';
  function update() {
    const terms = normalize(search.value).split(/\s+/).filter(Boolean);
    let total = 0;
    entries.forEach(({ group, items }) => {
      let count = 0;
      items.forEach(({ item, text }) => {
        const matches = (category === 'all' || group.dataset.category === category) && terms.every(term => text.includes(term));
        item.hidden = !matches;
        if (matches) count++;
      });
      group.hidden = count === 0;
      group.querySelector('.group-count').textContent = `${count} ${count === 1 ? 'procedimiento' : 'procedimientos'}`;
      total += count;
    });
    filters.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.category === category)));
    catalog.querySelector('#procedure-status').textContent = `${total} ${total === 1 ? 'procedimiento para explorar' : 'procedimientos para explorar'}`;
    catalog.querySelector('.catalog-empty').hidden = total > 0;
    clear.hidden = !search.value && category === 'all';
  }
  search.addEventListener('input', update);
  filters.forEach(button => button.addEventListener('click', () => { category = button.dataset.category; update(); }));
  function reset() { search.value = ''; category = 'all'; update(); search.focus(); }
  clear.addEventListener('click', reset);
  catalog.querySelector('#reset-search').addEventListener('click', reset);
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => entry.target.classList.toggle('is-visible', entry.isIntersecting)));
    groups.forEach(group => observer.observe(group));
  } else groups.forEach(group => group.classList.add('is-visible'));
  catalog.querySelector('.catalog-tools').hidden = false;
  update();
})();

// Request only the appropriate file when visible; keep a still image until playback succeeds.
(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const mobile = window.matchMedia('(max-width: 600px)');
  document.querySelectorAll('.featured-video').forEach(video => {
    const card = video.closest('.featured-procedure');
    let visible = false;
    let attempt = 0;
    video.muted = true;
    async function sync() {
      const current = ++attempt;
      if (!visible || document.hidden || reduced.matches || navigator.connection?.saveData) { video.pause(); return; }
      if (!video.getAttribute('src')) video.src = mobile.matches ? video.dataset.mobile : video.dataset.desktop;
      try {
        await video.play();
        if (current !== attempt) return;
        video.classList.add('has-frame');
      } catch { /* Keep the image if autoplay is blocked. */ }
    }
    video.addEventListener('error', () => { video.classList.remove('has-frame'); video.pause(); });
    document.addEventListener('visibilitychange', sync);
    reduced.addEventListener('change', sync);
    navigator.connection?.addEventListener('change', sync);
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(entries => {
        visible = entries[0].isIntersecting;
        sync();
      }, { threshold: 0.1 });
      observer.observe(card);
    } else { visible = true; sync(); }
  });
})();
