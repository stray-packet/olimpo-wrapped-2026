// Background templates are independent of customer data. No video or runtime dependency.
const ease = 'cubic-bezier(.22,1,.36,1)';
const templates = ['cover', 'celebration', 'stadium', 'lightning', 'podium', 'club', 'rewards', 'rewards', 'recap', 'closing'];
const titles = '.bonuses-title h2,.story-heading>span,.level-heading,.closing-top,.closing-bottom';

function maskURL(body) {
  return `url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" preserveAspectRatio="none"><defs><filter id="soft"><feGaussianBlur stdDeviation="5"/></filter></defs>${body}</svg>`)}")`;
}

// Full-size copies preserve the original art's framing. Masks isolate decorative
// coins, including their glow; the base uses inverse masks to avoid duplicates.
function isolateCoins(art) {
  const source = art?.querySelector(':scope > img');
  if (!source) return [];
  const coins = [[128,105,145,62], [854,165,130,53], [78,225,95,36], [78,435,155,68], [875,830,180,80]];
  const ellipse = ([cx,cy,rx,ry], fill) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${fill}" filter="url(#soft)"/>`;
  source.style.maskImage = maskURL(`<rect width="1000" height="1000" fill="white"/>${coins.map(c=>ellipse(c,'black')).join('')}`);
  source.style.maskSize = '100% 100%';
  source.style.maskMode = 'luminance';
  return coins.map((coin, index) => {
    const layer = source.cloneNode();
    layer.classList.add('motion-coin');
    layer.dataset.coin = index;
    layer.style.maskImage = maskURL(ellipse(coin, 'white'));
    art.insertBefore(layer, art.querySelector('.story-art-shade'));
    return layer;
  });
}

export function prepareStoryMotion(page, index) {
  if (index === 0) return; // Preserve the approved opening exactly.
  const template = templates[index];
  page.dataset.motionTemplate = template;
  const backdrop = document.createElement('div');
  backdrop.className = 'motion-backdrop';
  backdrop.setAttribute('aria-hidden', 'true');
  page.querySelectorAll(':scope > .story-art').forEach(art => backdrop.append(art));
  page.prepend(backdrop);
  if (template === 'rewards') isolateCoins(backdrop.querySelector(index === 6 ? '.redemptions-art' : '.star-art'));
  const atmosphere = document.createElement('div');
  atmosphere.className = `motion-atmosphere motion-${template}`;
  const confetti = ['celebration','stadium','podium','lightning'].includes(template);
  // Deterministic layout: the same template renders identically on mobile/desktop.
  atmosphere.innerHTML = `<i class="motion-aura"></i><i class="motion-beam motion-beam-left"></i><i class="motion-beam motion-beam-right"></i>${confetti ? Array.from({length:16}, (_,i) => `<i class="motion-confetti" style="--x:${[7,91,18,83,4,95,26,76,11,89,34,69,3,97,22,80][i]}%;--y:${9+(i*29)%80}%;--turn:${i*47}deg;--size:${i%3===0?5:3}px"></i>`).join('') : ''}`;
  backdrop.append(atmosphere);
}

export function animateStoryMotion(page, reduced = false) {
  if (!page?.dataset.motionTemplate || page.dataset.motionState) return;
  page.dataset.motionState = reduced ? 'settled' : 'entering';
  const backdrop = page.querySelector('.motion-backdrop');
  const coins = [...page.querySelectorAll('.motion-coin')];
  const cleanupCoins = () => {
    coins.forEach(coin => coin.remove());
    backdrop.querySelectorAll('.story-art>img').forEach(img => { img.style.maskImage = ''; img.style.maskSize = ''; img.style.maskMode = ''; });
  };
  if (reduced) { cleanupCoins(); return; }
  const animations = [];
  const run = (node, frames, duration, delay = 0) => {
    if (!node) return;
    const animation = node.animate(frames, {duration, delay, easing:ease, fill:'backwards'});
    animations.push(animation);
    return animation;
  };
  run(backdrop, [
    {transform:'scale(1.075) translateY(6px)', opacity:.5},
    {transform:'scale(1) translateY(0)', opacity:1}
  ], 2400);
  // Independent ribbon zones: masked duplicates exist only during the reveal.
  const art = backdrop.querySelector('.story-art');
  for (const [i, position] of ['top','bottom'].entries()) {
    if (!art) continue;
    const ribbon = art.cloneNode(true);
    ribbon.querySelectorAll('.motion-coin').forEach(coin=>coin.remove());
    ribbon.classList.add('motion-ribbon', `motion-ribbon-${position}`);
    ribbon.style.maskImage = position === 'top' ? 'linear-gradient(#000 0%,transparent 33%)' : 'linear-gradient(transparent 61%,#000 100%)';
    backdrop.append(ribbon);
    run(ribbon, [
      {transform:`translateX(${i ? 12 : -10}px) scale(1.06)`, opacity:0},
      {offset:.28, opacity:.65},
      {transform:'translateX(0) scale(1)', opacity:0}
    ], 2300, i*120);
  }
  coins.forEach((coin,i) => run(coin, [
    {transform:`translate(${i%2?12:-9}px, -24px)`, opacity:0},
    {offset:.24,opacity:1},
    {transform:'translate(0,0)',opacity:1}
  ], 1750, 160+i*110));
  page.querySelectorAll(titles).forEach((title,i) => run(title, [
    {opacity:0,translate:`${i%2?12:-12}px 9px`,filter:'blur(3px)'},
    {opacity:1,translate:'0 0',filter:'blur(0)'}
  ], 780, 120+i*130));
  run(page.querySelector('.motion-aura'), [
    {opacity:0,transform:'scale(.7)'},
    {offset:.4,opacity:.65},
    {opacity:0,transform:'scale(1.13)'}
  ], 2600, 100);
  page.querySelectorAll('.motion-beam').forEach((beam,i)=>run(beam, [
    {opacity:0,transform:`rotate(${i?-9:9}deg) scaleX(.7)`},
    {offset:.3,opacity:.8},
    {offset:.65,opacity:.4},
    {opacity:0,transform:'rotate(0) scaleX(1)'}
  ], 2300, 180+i*200));
  page.querySelectorAll('.motion-confetti').forEach((piece,i)=>run(piece, [
    {opacity:0,translate:`${i%2?6:-8}px -27px`,rotate:'-35deg'},
    {offset:.18,opacity:.75},
    {offset:.74,opacity:.5},
    {opacity:0,translate:'0 8px',rotate:'25deg'}
  ], 1550+i%4*140, 120+i%5*85));
  Promise.allSettled(animations.map(a=>a.finished)).then(()=>{
    if (!page.isConnected) return;
    cleanupCoins();
    backdrop.querySelectorAll('.motion-ribbon').forEach(layer=>layer.remove());
    page.querySelector('.motion-atmosphere')?.remove();
    page.dataset.motionState = 'settled';
  });
}

export function stopStoryMotion(page) {
  // Cancel descendant animations when the story exits, without affecting its
  // parent navigation transition or leaving timers running off-screen.
  page?.querySelectorAll('*').forEach(node=>node.getAnimations().forEach(a=>a.cancel()));
}
