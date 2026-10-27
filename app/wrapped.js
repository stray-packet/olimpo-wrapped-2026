import { stories, storyMarkup, coverArt, logo } from './stories.js';
import { prepareStoryMotion, animateStoryMotion, stopStoryMotion } from './story-motion.js';

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const bannerSection = document.createElement('section');
bannerSection.className = 'wrapped-banner-section';
bannerSection.setAttribute('aria-label', 'Tu Olimpo Wrapped 2026');
bannerSection.innerHTML = `<button class="wrapped-banner" data-open-wrapped>
  <span class="wrapped-mobile" data-node-id="10903:2428">
    <span class="wrapped-mobile-surface">
      <span class="wrapped-mobile-flags-top" data-node-id="10903:2429"><span><img src="assets/wrapped/banner/checkered-flags.png" alt=""><span></span></span></span>
      <span class="wrapped-mobile-flags-bottom" data-node-id="10903:2431"><img src="assets/wrapped/banner/checkered-flags.png" alt=""><span></span></span>
      <span class="wrapped-mobile-lights" aria-hidden="true"></span>
      <span class="wrapped-mobile-copy" data-node-id="10903:2432"><span class="wrapped-mobile-heading" data-node-id="10903:2434"><span>OLIMPO</span><span>WRAPPED</span></span><span class="wrapped-mobile-description" data-node-id="10903:2437">Un recorrido por tus mejores momentos.</span><span class="wrapped-mobile-cta-wrap"><span class="wrapped-mobile-cta" data-node-id="10903:2439">Ver mi resumen</span></span></span>
      <span class="wrapped-mobile-year" aria-label="2026"><span class="wrapped-mobile-year-top" data-node-id="10903:2441"><span>2</span><span>0</span></span><span class="wrapped-mobile-year-bottom" data-node-id="10903:2442"><span>2</span><span>6</span></span></span>
    </span>
    <span class="wrapped-mobile-lightning" data-node-id="10903:2430"><img src="assets/wrapped/banner/gold-lightning.png" alt=""></span>
  </span>
  <span class="wrapped-web" data-node-id="10892:2039">
    <span class="wrapped-web-surface" data-node-id="10892:2017">
      <span class="wrapped-web-flags wrapped-web-flags-right" data-node-id="10892:2018"><img src="assets/wrapped/banner/checkered-flags.png" alt=""><span></span></span>
      <span class="wrapped-web-year" aria-label="2026"><span class="wrapped-web-year-top" data-node-id="10892:2020"><span>2</span><span>0</span></span><span class="wrapped-web-year-bottom" data-node-id="10892:2021"><span>2</span><span>6</span></span></span>
      <span class="wrapped-web-flags wrapped-web-flags-left" data-node-id="10895:2062"><img src="assets/wrapped/banner/checkered-flags.png" alt=""><span></span></span>
      <span class="wrapped-web-lights" aria-hidden="true"></span>
      <span class="wrapped-web-copy" data-node-id="10892:2022"><span class="wrapped-web-heading" data-node-id="10892:2024"><span>OLIMPO</span><span>WRAPPED</span></span><span class="wrapped-web-description" data-node-id="10892:2027">Un recorrido por tus mejores momentos.</span><span class="wrapped-web-cta-wrap"><span class="wrapped-web-cta" data-node-id="10892:2029">Ver mi resumen</span></span></span>
    </span>
    <span class="wrapped-web-lightning" data-node-id="10895:2059"><img src="assets/wrapped/banner/gold-lightning.png" alt=""></span>
  </span>
</button>`;
const announcement = document.createElement('dialog');
announcement.className = 'wrapped-announcement';
announcement.setAttribute('aria-label', 'Descubre tu Olimpo Wrapped 2026');
announcement.innerHTML = `<button class="wrapped-announcement-close" type="button" aria-label="Cerrar anuncio de Olimpo Wrapped"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M7.99935 8.00033L4.66602 4.66699M7.99935 8.00033L11.3327 11.3337M7.99935 8.00033L11.3327 4.66699M7.99935 8.00033L4.66602 11.3337" stroke-width="2.02941" stroke-linecap="round" stroke-linejoin="round" stroke="white"/></svg></button>`;
announcement.append(bannerSection);
document.body.append(announcement);
const floatingWrapped = document.createElement('button');
floatingWrapped.className = 'wrapped-floating';
floatingWrapped.type = 'button';
floatingWrapped.hidden = true;
floatingWrapped.setAttribute('aria-label', 'Abrir mi Olimpo Wrapped');
floatingWrapped.setAttribute('title', 'Tu Olimpo Wrapped');
floatingWrapped.innerHTML = `<span class="wrapped-floating-face" aria-hidden="true"><img src="assets/wrapped/banner/gold-lightning.png" alt=""><span class="wrapped-floating-o">O</span><span class="wrapped-floating-w">W</span></span>`;
document.body.append(floatingWrapped);
let announcementTimer;
let announcementPreviousFocus;
let announcementBodyOverflow = '';
let announcementClosing = false;
let floatingUnlocked = false;

function revealFloatingWrapped(animate = true) {
  if (!floatingUnlocked) return;
  floatingWrapped.hidden = false;
  if (animate && !reducedMotion.matches) floatingWrapped.animate([
    { opacity: 0, transform: 'scale(.6)' },
    { offset: .75, opacity: 1, transform: 'scale(1.08)' },
    { opacity: 1, transform: 'scale(1)' }
  ], { duration: 480, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'backwards' });
}

function showAnnouncement() {
  if (announcement.open) return;
  announcementPreviousFocus = document.activeElement;
  announcementBodyOverflow = document.body.style.overflow;
  document.body.style.overflow = 'hidden';
  announcement.showModal();
  // The close control is a sibling, so the entire banner remains one click target.
  announcement.querySelector('.wrapped-announcement-close').focus({ preventScroll: true });
  announcementTimer = setTimeout(() => dismissAnnouncement(), 10000);
}

async function dismissAnnouncement(restoreFocus = true, morph = true) {
  if (!announcement.open || announcementClosing) return;
  announcementClosing = true;
  clearTimeout(announcementTimer);
  floatingUnlocked = true;
  if (morph) {
    revealFloatingWrapped(false);
    if (!reducedMotion.matches) {
      const origin = announcement.getBoundingClientRect();
      const target = floatingWrapped.getBoundingClientRect();
      const dx = target.x + target.width / 2 - origin.x - origin.width / 2;
      const dy = target.y + target.height / 2 - origin.y - origin.height / 2;
      announcement.dataset.dismissing = 'true';
      const flight = announcement.animate([
        { transform: 'translate(0,0) scale(1,1)', opacity: 1, clipPath: 'inset(-80px -40px round 16px)' },
        { offset: .7, transform: `translate(${dx * .86}px,${dy * .86}px) scale(.22,.22)`, opacity: .8, clipPath: 'inset(0 round 40%)' },
        { transform: `translate(${dx}px,${dy}px) scale(${target.width / origin.width},${target.height / origin.height})`, opacity: 0, clipPath: 'inset(0 round 50%)' }
      ], { duration: 680, easing: 'cubic-bezier(.65,0,.25,1)', fill: 'forwards' });
      floatingWrapped.animate([
        { opacity: 0, transform: 'scale(.5)' },
        { offset: .8, opacity: 1, transform: 'scale(1.1)' },
        { opacity: 1, transform: 'scale(1)' }
      ], { duration: 420, delay: 380, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'backwards' });
      await flight.finished.catch(() => {});
      flight.cancel();
    }
  }
  announcement.close();
  delete announcement.dataset.dismissing;
  announcementClosing = false;
  document.body.style.overflow = announcementBodyOverflow;
  if (restoreFocus) {
    const focusTarget = announcementPreviousFocus instanceof HTMLElement && announcementPreviousFocus !== document.body ? announcementPreviousFocus : floatingWrapped;
    focusTarget.focus({ preventScroll: true });
  }
}

announcement.querySelector('.wrapped-announcement-close').addEventListener('click', () => dismissAnnouncement());
announcement.addEventListener('cancel', event => { event.preventDefault(); dismissAnnouncement(); });
announcement.addEventListener('click', event => {
  if (event.target === announcement) dismissAnnouncement();
});
// Keep the Figma composition proportional within the desktop content width.
new ResizeObserver(([entry]) => {
  bannerSection.style.setProperty('--wrapped-web-scale', entry.contentRect.width / 1200);
  bannerSection.style.setProperty('--wrapped-mobile-scale', entry.contentRect.width / 328);
}).observe(bannerSection.querySelector('.wrapped-banner'));

const viewer = document.createElement('dialog');
viewer.className = 'wrapped-viewer';
viewer.setAttribute('aria-label', 'Olimpo Wrapped 2026');
viewer.innerHTML = `<img class="viewer-ambient" src="${coverArt}" alt=""><div class="viewer-shell"><div class="viewer-brand"><img src="reference/olimpo-home/assets/remote/www.olimpo.bet/static/img/logo_olimpo.svg" alt="">OLIMPO WRAPPED 2026</div><aside class="viewer-sidebar"><p class="viewer-eyebrow"></p><h1 class="viewer-title"></h1><p class="viewer-description"></p><div class="viewer-count"><b>01</b><span>/ 10 historias</span></div><div class="viewer-buttons"><button data-prev-story>Anterior</button><button data-next-story>Siguiente</button></div><small class="viewer-hint">Usa las flechas del teclado para avanzar.<br>Puedes cerrar y volver cuando quieras.</small><button class="viewer-restart" data-restart-wrapped>Volver al comienzo</button><button class="viewer-return" data-close-wrapped>Volver a Olimpo</button></aside><div class="story-frame"><div class="story-canvas"></div></div><aside class="viewer-next"><span>A continuación</span><button class="next-preview" data-next-story><img alt=""><b></b></button><p>Cada historia es parte de tu año.</p></aside></div><div class="wrap-toast" role="status" aria-live="polite"></div>`;
document.body.append(viewer);

// Text lighting follows the inner-shadow layers of Figma's editable number component.
const lighting = (id, effects) => `<filter id="${id}" x="-40%" y="-40%" width="180%" height="180%" color-interpolation-filters="sRGB"><feComponentTransfer in="SourceAlpha" result="inverse"><feFuncA type="table" tableValues="1 0"/></feComponentTransfer>${effects.map((effect, i) => `<feGaussianBlur in="inverse" stdDeviation="${effect[2] / 2}" result="blur${i}"/><feOffset in="blur${i}" dx="${effect[0]}" dy="${effect[1]}" result="offset${i}"/><feComposite in="offset${i}" in2="SourceAlpha" operator="in" result="mask${i}"/><feFlood flood-color="${effect[3]}" flood-opacity="${effect[4]}" result="color${i}"/><feComposite in="color${i}" in2="mask${i}" operator="in" result="shadow${i}"/><feComposite in="shadow${i}" in2="${i === 0 ? 'SourceGraphic' : `lit${i - 1}`}" operator="over" result="lit${i}"/>`).join('')}</filter>`;
viewer.insertAdjacentHTML('afterbegin', `<svg aria-hidden="true" width="0" height="0" style="position:absolute;pointer-events:none"><defs>${lighting('wrap-face-lighting', [[-3,-4,7,'#f8ffaf',.35],[5,6,9,'#064a18',.32],[0,-2,4,'#ffe77b',.4]])}${lighting('wrap-depth-lighting', [[-3,9,7,'#f8ffaf',.65],[5,6,9,'#064a18',.32]])}</defs></svg>`);

const frame = viewer.querySelector('.story-frame');
const canvas = viewer.querySelector('.story-canvas');
const banner = bannerSection.querySelector('button');
let current = 0;
let switching = false;
let previousFocus;
let pointerStart;
let suppressClickUntil = 0;
let recapTimers = [];
let toastTimer;
const safeRead = key => { try { return sessionStorage.getItem(key); } catch { return null; } };
const safeWrite = (key, value) => { try { sessionStorage.setItem(key, String(value)); } catch {} };

const webBanner = banner.querySelector('.wrapped-web');
const mobileBanner = banner.querySelector('.wrapped-mobile');
const desktopBanner = window.matchMedia('(min-width: 801px)');
let webBannerReady = false;
const enteredBanners = new WeakSet();
let webBannerInView = false;
let webBannerBlockedByIntro = false;

function startWebBannerEntrance() {
  const activeBanner = desktopBanner.matches ? webBanner : mobileBanner;
  if (!webBannerReady || enteredBanners.has(activeBanner) || !webBannerInView || webBannerBlockedByIntro || viewer.open || document.hidden) return;
  enteredBanners.add(activeBanner);
  activeBanner.dataset.entry = reducedMotion.matches ? 'done' : 'playing';
}

// Each page load gets one entrance, deferred until the announcement is visible.
webBanner.dataset.entry = reducedMotion.matches ? 'done' : 'waiting';
mobileBanner.dataset.entry = reducedMotion.matches ? 'done' : 'waiting';
const webBannerObserver = new IntersectionObserver(([entry]) => {
  webBannerInView = entry.isIntersecting && entry.intersectionRatio >= .25;
  startWebBannerEntrance();
}, { threshold: [0, .25] });
webBannerObserver.observe(banner);
Promise.allSettled([
  document.fonts.ready,
  ...[...banner.querySelectorAll('img')].map(image => image.decode())
]).then(() => { webBannerReady = true; startWebBannerEntrance(); });
desktopBanner.addEventListener('change', startWebBannerEntrance);
document.addEventListener('visibilitychange', startWebBannerEntrance);
webBanner.addEventListener('animationend', event => {
  if (event.animationName === 'wrapped-web-atmosphere') webBanner.dataset.entry = 'done';
});
mobileBanner.addEventListener('animationend', event => {
  if (event.animationName === 'wrapped-web-atmosphere') mobileBanner.dataset.entry = 'done';
});
reducedMotion.addEventListener('change', () => {
  if (reducedMotion.matches) {
    webBanner.dataset.entry = 'done';
    mobileBanner.dataset.entry = 'done';
  }
});

function resizeCanvas() {
  const width = frame.clientWidth;
  const height = frame.clientHeight;
  canvas.style.setProperty('--story-scale', Math.min(width / 312, height / 610));
}
new ResizeObserver(resizeCanvas).observe(frame);

function stopRecap() {
  recapTimers.forEach(clearTimeout);
  recapTimers = [];
}

function updateChrome() {
  const story = stories[current];
  viewer.dataset.story = current + 1;
  viewer.querySelector('.viewer-eyebrow').textContent = story.category;
  viewer.querySelector('.viewer-title').innerHTML = current === 0 ? 'Todo un año.<br><span>Una historia tuya.</span>' : story.title;
  viewer.querySelector('.viewer-description').textContent = current === 0 ? 'Tu Olimpo Wrapped 2026 ya está aquí. Descubre los momentos que marcaron tu año.' : 'Recorre tu año a tu ritmo. Tu historia sigue en cada pantalla.';
  viewer.querySelector('.viewer-count b').textContent = String(current + 1).padStart(2, '0');
  viewer.querySelector('.viewer-buttons [data-prev-story]').disabled = current === 0;
  viewer.querySelector('.viewer-buttons [data-next-story]').disabled = current === stories.length - 1;
  viewer.querySelector('.viewer-restart').hidden = current === 0;
  const next = stories[current + 1];
  viewer.querySelector('.viewer-next').hidden = !next;
  if (next) {
    viewer.querySelector('.next-preview img').src = next.background;
    viewer.querySelector('.next-preview b').textContent = next.title;
    const preload = new Image();
    preload.src = next.background;
  }
  viewer.querySelector('.viewer-ambient').src = story.background;
  safeWrite('olimpo-wrapped-last-story', current);
  if (current === stories.length - 1) safeWrite('olimpo-wrapped-completed', true);
}

function introAnimation() {
  const page = canvas.firstElementChild;
  if (reducedMotion.matches) { page.dataset.intro = 'done'; return; }
  page.dataset.intro = 'playing';
  const reveal = page.querySelector('.cover-art')?.animate([
    { transform: 'scale(1.45) rotate(-5deg)', opacity: 0, filter: 'brightness(1.8)' },
    { offset: .35, opacity: 1, filter: 'brightness(1.3)' },
    { transform: 'scale(1) rotate(0)', opacity: 1, filter: 'brightness(1)' }
  ], { duration: 2100, easing: 'cubic-bezier(.2,.75,.2,1)', fill: 'backwards' });
  reveal?.finished.then(() => { page.dataset.intro = 'done'; }, () => {});
  page.querySelectorAll('.intro-copy').forEach((copy, index) => copy.animate([
    { opacity: 0, transform: 'translateY(26px)', filter: 'blur(5px)' },
    { opacity: 1, transform: 'translateY(0)', filter: 'blur(0)' }
  ], { duration: 800, delay: 400 + index * 180, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'backwards' }));
  page.querySelector('.wrap-story-action').animate([
    { opacity: 0, transform: 'translateY(16px)' }, { opacity: 1, transform: 'translateY(0)' }
  ], { duration: 650, delay: 850, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'backwards' });
}

async function showViewer(index = 0) {
  if (viewer.open || announcementClosing) return;
  dismissAnnouncement(false, false);
  floatingUnlocked = true;
  floatingWrapped.getAnimations().forEach(animation => animation.cancel());
  floatingWrapped.hidden = true;
  current = Math.max(0, Math.min(stories.length - 1, index));
  previousFocus = document.activeElement;
  canvas.innerHTML = storyMarkup(current);
  prepareStoryMotion(canvas.firstElementChild, current);
  updateChrome();
  viewer.showModal();
  document.body.style.overflow = 'hidden';
  resizeCanvas();
  safeWrite('olimpo-wrapped-announced', true);
  if (!reducedMotion.matches) {
    viewer.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 350, fill: 'backwards' });
    frame.animate([{ opacity: 0, transform: 'translateY(45px) scale(.91)' }, { opacity: 1, transform: 'translateY(0) scale(1)' }], { duration: 950, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'backwards' });
    viewer.querySelector('.viewer-sidebar').animate([{ opacity: 0, transform: 'translateX(-25px)' }, { opacity: 1, transform: 'translateX(0)' }], { duration: 950, delay: 250, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'backwards' });
  }
  if (current === 0) introAnimation();
  else animateStoryMotion(canvas.firstElementChild, reducedMotion.matches);
  canvas.firstElementChild.focus({ preventScroll: true });
}

async function closeViewer() {
  if (!viewer.open || viewer.dataset.closing) return;
  viewer.dataset.closing = 'true';
  stopRecap();
  stopStoryMotion(canvas.firstElementChild);
  if (!reducedMotion.matches) {
    const fade = viewer.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 320, easing: 'ease-in', fill: 'forwards' });
    frame.animate([{ transform: 'scale(1)' }, { transform: 'translateY(22px) scale(.96)' }], { duration: 320, easing: 'ease-in' });
    await fade.finished;
    fade.cancel();
  }
  viewer.close();
  webBannerBlockedByIntro = false;
  startWebBannerEntrance();
  delete viewer.dataset.closing;
  document.body.style.overflow = '';
  revealFloatingWrapped();
  (previousFocus?.isConnected && previousFocus !== document.body && previousFocus.getClientRects().length ? previousFocus : floatingWrapped).focus({ preventScroll: true });
}

async function goTo(index) {
  if (switching || index < 0 || index >= stories.length || index === current) return;
  switching = true;
  stopRecap();
  const direction = index > current ? 1 : -1;
  const old = canvas.firstElementChild;
  stopStoryMotion(old);
  const restoreFocus = old.contains(document.activeElement);
  old.setAttribute('aria-hidden', 'true');
  old.inert = true;
  const next = document.createRange().createContextualFragment(storyMarkup(index)).firstElementChild;
  prepareStoryMotion(next, index);
  canvas.append(next);
  if (index !== 0) animateStoryMotion(next, reducedMotion.matches);
  current = index;
  updateChrome();
  const duration = reducedMotion.matches ? 0 : 420;
  const out = old.animate([{ opacity: 1, transform: 'translateX(0)' }, { opacity: 0, transform: `translateX(${-direction * 45}px)` }], { duration, easing: 'cubic-bezier(.4,0,.2,1)', fill: 'forwards' });
  const enter = next.animate([{ opacity: 0, transform: `translateX(${direction * 60}px)` }, { opacity: 1, transform: 'translateX(0)' }], { duration, easing: 'cubic-bezier(.22,1,.36,1)' });
  await Promise.allSettled([out.finished, enter.finished]);
  old.remove();
  if (restoreFocus) next.focus({ preventScroll: true });
  switching = false;
  if (current === 0) introAnimation();
}

function toast(message) {
  const el = viewer.querySelector('.wrap-toast');
  el.textContent = message;
  clearTimeout(toastTimer);
  el.getAnimations().forEach(animation => animation.cancel());
  el.animate([{ opacity: 0, translate: '0 8px' }, { opacity: 1, translate: '0 0' }], { duration: 180, fill: 'forwards' });
  toastTimer = setTimeout(() => el.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 220, fill: 'forwards' }), 2800);
}

async function shareStory() {
  const data = { title: 'Mi Olimpo Wrapped 2026', text: stories[current].summary };
  try {
    if (navigator.share) await navigator.share(data);
    else { await navigator.clipboard.writeText(`${data.title}\n${data.text}`); toast('Resumen de esta historia copiado'); }
  } catch (error) {
    if (error.name !== 'AbortError') toast('No se pudo compartir. Inténtalo de nuevo.');
  }
}

function playRecap() {
  const player = canvas.querySelector('[data-play-recap]');
  if (!player || player.classList.contains('is-playing')) return;
  stopRecap();
  player.classList.add('is-playing');
  const title = player.querySelector('.recap-title');
  const steps = ['Esto fue<br>tu 2026.', '800<br>bonos.', 'Nivel<br>DIOS.', '18<br>canjes.', 'Tu historia<br>continúa.'];
  const duration = reducedMotion.matches ? 1000 : 1500;
  steps.forEach((text, index) => recapTimers.push(setTimeout(() => {
    title.innerHTML = text;
    if (!reducedMotion.matches) title.animate([{ opacity: 0, transform: 'translateY(18px) scale(.95)' }, { opacity: 1, transform: 'translateY(0) scale(1)' }], { duration: 550, easing: 'cubic-bezier(.22,1,.36,1)' });
  }, index * duration)));
  player.querySelector('.recap-progress').animate([{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }], { duration: steps.length * duration, fill: 'forwards', easing: 'linear' });
  if (!reducedMotion.matches) player.querySelector('.recap-cover').animate([{ transform: 'scale(1.25) rotate(-5deg)' }, { transform: 'scale(1.05) rotate(0)' }], { duration: steps.length * duration, easing: 'ease-out' });
  recapTimers.push(setTimeout(() => { player.classList.remove('is-playing'); title.innerHTML = 'Tu año,<br>en un vistazo.'; }, steps.length * duration));
}

function openSavedWrapped() {
  const index = safeRead('olimpo-wrapped-completed') === 'true' ? 0 : Number(safeRead('olimpo-wrapped-last-story') || 0);
  showViewer(index);
}
banner.addEventListener('click', openSavedWrapped);
floatingWrapped.addEventListener('click', openSavedWrapped);
viewer.addEventListener('cancel', event => { event.preventDefault(); closeViewer(); });
viewer.addEventListener('click', event => {
  if (Date.now() < suppressClickUntil) return;
  const target = event.target.closest('button');
  if (!target) return;
  if (target.hasAttribute('data-close-wrapped')) closeViewer();
  else if (target.hasAttribute('data-next-story')) goTo(current + 1);
  else if (target.hasAttribute('data-prev-story')) goTo(current - 1);
  else if (target.hasAttribute('data-story-index')) goTo(Number(target.dataset.storyIndex));
  else if (target.hasAttribute('data-restart-wrapped')) goTo(0);
  else if (target.hasAttribute('data-share-story')) shareStory();
  else if (target.hasAttribute('data-play-recap')) playRecap();
});
viewer.addEventListener('keydown', event => {
  if (event.key === 'ArrowRight') { event.preventDefault(); goTo(current + 1); }
  if (event.key === 'ArrowLeft') { event.preventDefault(); goTo(current - 1); }
});
frame.addEventListener('pointerdown', event => {
  if (event.target.closest('.wrap-story-header,.wrap-story-action,.recap-play,.finish-wrapped')) return;
  pointerStart = { x: event.clientX, y: event.clientY };
});
frame.addEventListener('pointerup', event => {
  if (!pointerStart) return;
  const dx = event.clientX - pointerStart.x;
  const dy = event.clientY - pointerStart.y;
  pointerStart = null;
  if (Math.abs(dx) > 55 && Math.abs(dy) < 100) {
    suppressClickUntil = Date.now() + 350;
    goTo(current + (dx < 0 ? 1 : -1));
  }
});
frame.addEventListener('pointercancel', () => { pointerStart = null; });
const query = new URLSearchParams(location.search);
if (query.has('story')) {
  webBannerBlockedByIntro = true;
  setTimeout(() => showViewer(Number(query.get('story')) - 1), 200);
} else showAnnouncement();
