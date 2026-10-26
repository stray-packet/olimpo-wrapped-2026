import { stories, storyMarkup, coverArt, logo } from './stories.js';
import { prepareStoryMotion, animateStoryMotion, stopStoryMotion } from './story-motion.js';

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const bannerSection = document.createElement('section');
bannerSection.className = 'wrapped-banner-section';
bannerSection.setAttribute('aria-label', 'Tu Olimpo Wrapped 2026');
bannerSection.innerHTML = `<button class="wrapped-banner" data-open-wrapped><img src="${coverArt}" class="wrapped-banner-art" alt="" fetchpriority="high"><span class="wrapped-banner-edition">2026</span><div class="wrapped-banner-copy"><span class="wrapped-banner-eyebrow">OLIMPO WRAPPED · YA ESTÁ AQUÍ</span><h2>Todo un año.<br><em>Una historia tuya.</em></h2><p class="wrapped-banner-description">Revive los momentos que marcaron tu 2026.</p><span class="wrapped-banner-cta">Ver mi Wrapped</span></div></button>`;
document.querySelector('.quick-nav').after(bannerSection);

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

function updateBanner() {
  const last = Number(safeRead('olimpo-wrapped-last-story') || 0);
  banner.querySelector('.wrapped-banner-cta').textContent = safeRead('olimpo-wrapped-completed') === 'true' ? 'Volver a ver mi Wrapped' : last > 0 ? 'Continuar mi Wrapped' : 'Ver mi Wrapped';
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
  if (viewer.open) return;
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
  delete viewer.dataset.closing;
  document.body.style.overflow = '';
  updateBanner();
  (previousFocus?.isConnected && previousFocus !== document.body ? previousFocus : banner).focus({ preventScroll: true });
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

banner.addEventListener('click', () => {
  const index = safeRead('olimpo-wrapped-completed') === 'true' ? 0 : Number(safeRead('olimpo-wrapped-last-story') || 0);
  showViewer(index);
});
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
updateBanner();
const query = new URLSearchParams(location.search);
if (query.has('story')) setTimeout(() => showViewer(Number(query.get('story')) - 1), 200);
else if (query.get('intro') === '1' || (!safeRead('olimpo-wrapped-announced') && query.get('intro') !== '0')) setTimeout(() => showViewer(0), 1200);
