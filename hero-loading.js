// Reveal the page with the first video frame, with a bounded poster fallback.
(() => {
  const root = document.documentElement;
  root.classList.add('hero-loading');
  let finished = false;
  let video;
  let frameId;
  const reveal = (playVideo = false) => {
    if (finished) return;
    finished = true;
    clearTimeout(timeout);
    if (video) {
      if (playVideo) video.classList.add('is-playing');
      else {
        video.pause();
        if (frameId !== undefined) video.cancelVideoFrameCallback(frameId);
      }
    }
    root.classList.remove('hero-loading');
  };
  // A failed script/media request must never leave the site inaccessible.
  const timeout = setTimeout(() => reveal(), 8000);
  document.addEventListener('DOMContentLoaded', () => {
    video = document.querySelector('.hero-video');
    const poster = document.querySelector('.hero-photo');
    const showPoster = () => {
      if (!poster || poster.complete) reveal();
      else {
        poster.addEventListener('load', () => reveal(), { once: true });
        poster.addEventListener('error', () => reveal(), { once: true });
      }
    };
    if (finished) return;
    if (!video || matchMedia('(prefers-reduced-motion: reduce)').matches) {
      showPoster();
      return;
    }
    video.muted = true;
    video.addEventListener('error', showPoster, { once: true });
    video.querySelector('source').addEventListener('error', showPoster, { once: true });
    video.addEventListener('playing', () => {
      if (finished) { video.pause(); return; }
      if ('requestVideoFrameCallback' in video) {
        frameId = video.requestVideoFrameCallback(() => reveal(true));
      } else {
        requestAnimationFrame(() => requestAnimationFrame(() => reveal(true)));
      }
    }, { once: true });
    if (video.error) showPoster();
    else video.play().catch(showPoster);
  }, { once: true });
})();
