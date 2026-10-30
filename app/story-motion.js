// Background templates are independent of customer data. No video or runtime dependency.
const ease = 'cubic-bezier(.22,1,.36,1)';
const templates = ['cover', 'celebration', 'stadium', 'lightning', 'podium', 'club', 'rewards', 'rewards', 'recap', 'closing'];
const titles = '.bonuses-title h2,.story-heading>span,.level-heading,.closing-top,.closing-bottom';

export function prepareStoryMotion(page, index) {
  if (index === 0) return; // Preserve the approved opening exactly.
  const template = templates[index];
  page.dataset.motionTemplate = template;
  const backdrop = document.createElement('div');
  backdrop.className = 'motion-backdrop';
  backdrop.setAttribute('aria-hidden', 'true');
  page.querySelectorAll(':scope > .story-art').forEach(art => backdrop.append(art));
  page.prepend(backdrop);
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
  if (reduced) { page.querySelector('.motion-atmosphere')?.remove(); return; }
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
  page.querySelectorAll(titles).forEach((title,i) => run(title, [
    {opacity:0,transform:`translate(${i%2?12:-12}px,9px)`},
    {opacity:1,transform:'translate(0,0)'}
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
    page.querySelector('.motion-atmosphere')?.remove();
    page.dataset.motionState = 'settled';
  });
}

export function stopStoryMotion(page) {
  // Cancel descendant animations when the story exits, without affecting its
  // parent navigation transition or leaving timers running off-screen.
  page?.querySelectorAll('*').forEach(node=>node.getAnimations().forEach(a=>a.cancel()));
}
