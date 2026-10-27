// Prioritize the poster; never download video on reduced-data connections.
(() => {
  const root = document.documentElement;
  const connection = navigator.connection;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const slow = connection && (connection.saveData || /(^|-)2g|3g/.test(connection.effectiveType || ''));
  const mobile = matchMedia('(max-width: 600px)').matches;
  if (!mobile && !slow && !reduced) root.classList.add('hero-loading');
  let finished = false;
  let video;
  let timer;
  const fallback = () => {
    if (finished) return;
    finished = true;
    clearTimeout(timer);
    root.classList.remove('hero-loading');
    if (video) {
      video.pause();
      video.querySelector('source').removeAttribute('src');
      video.load();
    }
  };
  // Includes poster loading time; a slow connection must not block the site.
  timer = setTimeout(fallback, 2500);
  document.addEventListener('DOMContentLoaded', () => {
    video = document.querySelector('.hero-video');
    const poster = document.querySelector('.hero-photo');
    if (finished || !video || slow || reduced) { fallback(); return; }
    const source = video.querySelector('source');
    const reveal = () => {
      if (finished) return;
      finished = true;
      clearTimeout(timer);
      video.classList.add('is-playing');
      root.classList.remove('hero-loading');
    };
    video.addEventListener('playing', () => {
      if ('requestVideoFrameCallback' in video) video.requestVideoFrameCallback(reveal);
      else requestAnimationFrame(() => requestAnimationFrame(reveal));
    }, { once: true });
    video.addEventListener('error', fallback, { once: true });
    source.addEventListener('error', fallback, { once: true });
    const start = () => {
      if (finished) return;
      video.muted = true;
      source.src = source.dataset.src;
      video.load();
      video.play().catch(fallback);
    };
    if (!poster || poster.complete) start();
    else {
      poster.addEventListener('load', start, { once: true });
      poster.addEventListener('error', start, { once: true });
    }
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(([entry]) => {
        if (!video.classList.contains('is-playing')) return;
        if (entry.isIntersecting && !document.hidden) video.play().catch(() => {});
        else video.pause();
      });
      observer.observe(video);
    }
    document.addEventListener('visibilitychange', () => {
      if (!video.classList.contains('is-playing')) return;
      if (document.hidden) video.pause();
      else if (video.getBoundingClientRect().bottom > 0) video.play().catch(() => {});
    });
  }, { once: true });
})();
