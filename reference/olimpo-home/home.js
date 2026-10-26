const banners = [
  { desktop: 'assets/remote/d28gilnhu2bcbp.cloudfront.net/landing/1788819667718-banner_homedesktop1920x460.webp', mobile: 'assets/remote/d28gilnhu2bcbp.cloudfront.net/landing/1788818860361-banner_homemobile_1080x548.webp' },
  { desktop: 'assets/remote/d28gilnhu2bcbp.cloudfront.net/landing/1788793711245-ob_banner_homedesktop_torneocasinero_1920x460.webp', mobile: 'assets/remote/d28gilnhu2bcbp.cloudfront.net/landing/1788560002450-ob_banner_homemobile_torneocasinero_1080x548.webp' },
  { desktop: 'assets/remote/d28gilnhu2bcbp.cloudfront.net/landing/1788793979305-ob_banner_homedesktop_pozo_1920x4601.webp', mobile: 'assets/remote/d28gilnhu2bcbp.cloudfront.net/landing/1788560482783-ob_banner_homemobile_pozo_1080x548.webp' },
  { desktop: 'assets/remote/d28gilnhu2bcbp.cloudfront.net/landing/1789492588432-1786559145824-bannernuevohomeinvita-a-un-amigo.webp', mobile: 'assets/remote/d28gilnhu2bcbp.cloudfront.net/landing/1780503123921-invita-a-un-amigo-mobile.webp' }
];

const heroTrack = document.querySelector('#heroTrack');
const heroDots = document.querySelector('#heroDots');
let activeBanner = 0;
let bannerTimer;

function renderBanner(index) {
  activeBanner = (index + banners.length) % banners.length;
  const mode = window.matchMedia('(max-width: 768px)').matches ? 'mobile' : 'desktop';
  heroTrack.style.backgroundImage = `url("${banners[activeBanner][mode]}")`;
  [...heroDots.children].forEach((dot, dotIndex) => dot.classList.toggle('is-active', dotIndex === activeBanner));
}

function resetBannerTimer() {
  window.clearInterval(bannerTimer);
  bannerTimer = window.setInterval(() => renderBanner(activeBanner + 1), 5000);
}

banners.forEach((_, index) => {
  const dot = document.createElement('button');
  dot.type = 'button';
  dot.setAttribute('aria-label', `Mostrar banner ${index + 1}`);
  dot.addEventListener('click', () => { renderBanner(index); resetBannerTimer(); });
  heroDots.append(dot);
});

document.querySelector('#previousBanner').addEventListener('click', () => { renderBanner(activeBanner - 1); resetBannerTimer(); });
document.querySelector('#nextBanner').addEventListener('click', () => { renderBanner(activeBanner + 1); resetBannerTimer(); });
renderBanner(0);
resetBannerTimer();
window.addEventListener('resize', () => renderBanner(activeBanner));

const profileTrigger = document.querySelector('#profileTrigger');
const drawer = document.querySelector('#profileDrawer');
const scrim = document.querySelector('#drawerScrim');
const closeButton = document.querySelector('#closeDrawer');

function openProfileDrawer() {
  drawer.classList.add('is-open');
  document.body.classList.add('has-open-drawer');
  drawer.setAttribute('aria-hidden', 'false');
  profileTrigger.setAttribute('aria-expanded', 'true');
  scrim.hidden = false;
  closeButton.focus();
}

function closeProfileDrawer() {
  drawer.classList.remove('is-open');
  document.body.classList.remove('has-open-drawer');
  drawer.setAttribute('aria-hidden', 'true');
  profileTrigger.setAttribute('aria-expanded', 'false');
  scrim.hidden = true;
  profileTrigger.focus();
}

profileTrigger.addEventListener('click', openProfileDrawer);
closeButton.addEventListener('click', closeProfileDrawer);
scrim.addEventListener('click', closeProfileDrawer);
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && drawer.classList.contains('is-open')) closeProfileDrawer();
});

document.querySelector('.brand').addEventListener('click', event => {
  const grayscale = document.documentElement.classList.toggle('is-grayscale');
  event.currentTarget.setAttribute('aria-pressed', String(grayscale));
});

document.querySelectorAll('.mobile-nav button').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelector('.mobile-nav button.is-active')?.classList.remove('is-active');
    button.classList.add('is-active');
  });
});
