import { stories, storyMarkup } from './stories.js';
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
floatingWrapped.innerHTML = `<span class="wrapped-floating-art wrapped-floating-art-web" aria-hidden="true" data-node-id="10916:1670">
  <img class="wrapped-floating-ring" src="assets/wrapped/floating/web-ring.svg" alt="">
  <svg class="wrapped-floating-label" width="96" height="96" viewBox="0 0 96 96" aria-hidden="true"><defs><path id="wrapped-label-web" d="M 4 47 A 44 44 0 0 1 92 47"/></defs><text><textPath href="#wrapped-label-web" startOffset="50%" text-anchor="middle">WRAPPED</textPath></text></svg>
  <span class="wrapped-floating-face"><span class="wrapped-floating-flags"><img src="assets/wrapped/banner/checkered-flags.png" alt=""></span><span class="wrapped-floating-lightning"><img src="assets/wrapped/banner/gold-lightning.png" alt=""></span></span>
</span><span class="wrapped-floating-art wrapped-floating-art-mobile" aria-hidden="true" data-node-id="10916:1669">
  <img class="wrapped-floating-ring" src="assets/wrapped/floating/mobile-ring.svg" alt="">
  <svg class="wrapped-floating-label" width="48" height="48" viewBox="0 0 48 48" aria-hidden="true"><defs><path id="wrapped-label-mobile" d="M 2 23.5 A 22 22 0 0 1 46 23.5"/></defs><text><textPath href="#wrapped-label-mobile" startOffset="50%" text-anchor="middle">WRAPPED</textPath></text></svg>
  <span class="wrapped-floating-face"><span class="wrapped-floating-flags"><img src="assets/wrapped/banner/checkered-flags.png" alt=""></span><span class="wrapped-floating-lightning"><img src="assets/wrapped/banner/gold-lightning.png" alt=""></span></span>
</span>`;
document.body.append(floatingWrapped);
let announcementTimer;
let announcementPreviousFocus;
let announcementBodyOverflow = '';
let announcementClosing = false;
let floatingUnlocked = false;
let floatingRetired = false;

function revealFloatingWrapped(animate = true) {
  if (!floatingUnlocked || floatingRetired) return;
  floatingWrapped.hidden = false;
  if (animate && !reducedMotion.matches) floatingWrapped.animate([
    { opacity: 0, transform: 'scale(.6)' },
    { offset: .75, opacity: 1, transform: 'scale(1.08)' },
    { opacity: 1, transform: 'scale(1)' }
  ], { duration: 480, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'backwards' });
}

function retireFloatingWrapped() {
  floatingRetired = true;
  floatingWrapped.getAnimations().forEach(animation => animation.cancel());
  floatingWrapped.hidden = true;
}

document.addEventListener('olimpo-wrapped:drawer-open', retireFloatingWrapped);

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
viewer.innerHTML = `<div class="viewer-shell"><aside class="viewer-prev"><span>Anterior</span><button class="prev-preview" data-prev-story aria-label="Ver la historia anterior"><img alt=""><b></b></button></aside><div class="story-frame"><div class="story-canvas"></div></div><aside class="viewer-next"><span>Siguiente</span><button class="next-preview" data-next-story aria-label="Ver la siguiente historia"><img alt=""><b></b></button></aside></div><div class="wrap-toast" role="status" aria-live="polite"></div>`;
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
let toastTimer;
const safeRead = key => { try { return sessionStorage.getItem(key); } catch { return null; } };
const safeWrite = (key, value) => { try { sessionStorage.setItem(key, String(value)); } catch {} };
const storyAssetLoads = new Map();
const clampStoryIndex = value => Number.isFinite(Number(value)) ? Math.max(0, Math.min(stories.length - 1, Math.trunc(Number(value)))) : 0;

function preloadStoryAssets(index) {
  if (!Number.isInteger(index) || index < 0 || index >= stories.length) return Promise.resolve();
  if (!storyAssetLoads.has(index)) {
    const sources = [...new Set([...storyMarkup(index).matchAll(/<img\b[^>]*\bsrc="([^"]+)"/g)].map(match => match[1]))];
    storyAssetLoads.set(index, Promise.allSettled(sources.map(src => {
      const image = new Image();
      image.src = src;
      return image.decode();
    })));
  }
  return storyAssetLoads.get(index);
}

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

function updateChrome() {
  viewer.dataset.story = current + 1;
  const previous = stories[current - 1];
  viewer.querySelector('.viewer-prev').hidden = !previous;
  if (previous) {
    viewer.querySelector('.prev-preview img').src = previous.background;
    viewer.querySelector('.prev-preview b').textContent = previous.title;
  }
  const next = stories[current + 1];
  viewer.querySelector('.viewer-next').hidden = !next;
  if (next) {
    viewer.querySelector('.next-preview img').src = next.background;
    viewer.querySelector('.next-preview b').textContent = next.title;
  }
  preloadStoryAssets(current + 1);
  preloadStoryAssets(current - 1);
  safeWrite('olimpo-wrapped-last-story', current);
  if (current === stories.length - 1) safeWrite('olimpo-wrapped-completed', true);
}

function introAnimation() {
  const page = canvas.firstElementChild;
  if (reducedMotion.matches) { page.dataset.intro = 'done'; return; }
  page.dataset.intro = 'playing';
  const reveal = page.querySelector('.cover-art')?.animate([
    { transform: 'scale(1.25) rotate(-3deg)', opacity: 0 },
    { offset: .35, opacity: 1 },
    { transform: 'scale(1) rotate(0)', opacity: 1 }
  ], { duration: 2100, easing: 'cubic-bezier(.2,.75,.2,1)', fill: 'backwards' });
  reveal?.finished.then(() => { page.dataset.intro = 'done'; }, () => {});
  page.querySelectorAll('.intro-copy').forEach((copy, index) => copy.animate([
    { opacity: 0, transform: 'translateY(26px)' },
    { opacity: 1, transform: 'translateY(0)' }
  ], { duration: 800, delay: 400 + index * 180, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'backwards' }));
  page.querySelector('.wrap-story-action').animate([
    { opacity: 0, transform: 'translateY(16px)' }, { opacity: 1, transform: 'translateY(0)' }
  ], { duration: 650, delay: 850, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'backwards' });
}

async function showViewer(index = 0) {
  if (viewer.open || announcementClosing) return;
  dismissAnnouncement(false, false);
  floatingUnlocked = true;
  retireFloatingWrapped();
  current = clampStoryIndex(index);
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
  }
  if (current === 0) introAnimation();
  else animateStoryMotion(canvas.firstElementChild, reducedMotion.matches);
  canvas.firstElementChild.focus({ preventScroll: true });
}

document.addEventListener('olimpo-wrapped:open', openSavedWrapped);

async function closeViewer() {
  if (!viewer.open || viewer.dataset.closing) return;
  viewer.dataset.closing = 'true';
  if (!reducedMotion.matches) {
    const fade = viewer.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 320, easing: 'ease-in', fill: 'forwards' });
    frame.animate([{ transform: 'scale(1)' }, { transform: 'translateY(22px) scale(.96)' }], { duration: 320, easing: 'ease-in' });
    await fade.finished;
    fade.cancel();
  }
  stopStoryMotion(canvas.firstElementChild);
  viewer.close();
  webBannerBlockedByIntro = false;
  startWebBannerEntrance();
  delete viewer.dataset.closing;
  document.body.style.overflow = '';
  const focusTarget = previousFocus?.isConnected && previousFocus !== document.body && previousFocus.getClientRects().length
    ? previousFocus : document.querySelector('#profileTrigger') ?? banner;
  focusTarget.focus({ preventScroll: true });
}

async function goTo(index) {
  if (switching || index < 0 || index >= stories.length || index === current) return;
  switching = true;
  await preloadStoryAssets(index);
  const direction = index > current ? 1 : -1;
  const old = canvas.firstElementChild;
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
  stopStoryMotion(old);
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

function openSavedWrapped() {
  const index = safeRead('olimpo-wrapped-completed') === 'true' ? 0 : clampStoryIndex(safeRead('olimpo-wrapped-last-story'));
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
  else if (target.hasAttribute('data-share-story')) shareStory();
});
viewer.addEventListener('keydown', event => {
  if (event.key === 'ArrowRight') { event.preventDefault(); goTo(current + 1); }
  if (event.key === 'ArrowLeft') { event.preventDefault(); goTo(current - 1); }
});
frame.addEventListener('pointerdown', event => {
  if (event.target.closest('.wrap-story-header,.wrap-story-action,.recap-card')) return;
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
const initialStory = query.has('story') ? clampStoryIndex(Number(query.get('story')) - 1) : safeRead('olimpo-wrapped-completed') === 'true' ? 0 : clampStoryIndex(safeRead('olimpo-wrapped-last-story'));
preloadStoryAssets(initialStory);
preloadStoryAssets(initialStory + 1);
if (query.has('story')) {
  webBannerBlockedByIntro = true;
  preloadStoryAssets(initialStory).then(() => showViewer(initialStory));
} else showAnnouncement();
