const a = (slide, name, ext = 'webp') => `assets/wrapped/slide-${String(slide).padStart(2, '0')}-${name}.${ext}`;
export const coverArt = a(1, 'imgBackgroundImage');
export const logo = 'reference/olimpo-home/assets/remote/www.olimpo.bet/static/img/isotipo_olimpo_pe.svg';
export const closeIcon = a(1, 'imgClose', 'svg');
export const demoData = { memberSince: 2024, bonuses: 800, activated: 315, missions: 340, challenges: 206, loyalty: 254, favoriteTeam: 'Real Madrid', favoriteCountry: 'de España', streak: 12, level: 'DIOS', earnedPoints: '24,850', redemptions: 18, remainingPoints: '3,245', productRedemptions: 8, experienceRedemptions: 4, bonusRedemptions: 6 };

const img = (src, cls = '', alt = '', style = '') => `<img src="${src}" class="${cls}" alt="${alt}" draggable="false" style="${style}" decoding="async">`;
const bg = (src, cls = '', opacity = 0) => `<div class="story-art ${cls}" aria-hidden="true">${img(src)}${opacity ? `<div class="story-art-shade" style="opacity:${opacity}"></div>` : ''}</div>`;
const glossy = (value, cls = '') => `<div class="glossy ${cls}" aria-label="${value}"><span aria-hidden="true" class="glossy-glow">${value}</span><span aria-hidden="true" class="glossy-depth">${value}</span><span aria-hidden="true" class="glossy-face">${value}</span><span aria-hidden="true" class="glossy-shine">${value}</span></div>`;
const heading = (first, second, cls = '') => `<h2 class="story-heading ${cls}"><span>${first}</span><span>${second}</span></h2>`;
const metric = (image, label, number, unit = '') => `<div class="mini-metric">${img(a(2, 'imgGlow', 'svg'), 'mini-glow')}${img(image, 'metric-icon')}<b>${label}</b><strong>${number}</strong>${unit ? `<small>${unit}</small>` : ''}</div>`;
const points = (image, eyebrow, value, below = '') => `<div class="points-card">${img(image)}<div><small>${eyebrow}</small><strong>${value}</strong>${below ? `<small>${below}</small>` : ''}</div></div>`;

export const stories = [
  {
    id: '10763:11406', title: 'Tu 2026 en Olimpo', category: 'Tu historia comienza', background: coverArt,
    summary: 'Eres parte de Olimpo.bet desde 2024. Revive tu 2026.',
    render: () => `${bg(coverArt, 'cover-art')}<div class="cover-member intro-copy"><p>Eres parte de<br><em>Olimpo.bet</em> desde</p><strong>${demoData.memberSince}</strong></div><div class="cover-tagline intro-copy"><p>Revive un año</p><b>DE GRANDES</b><b>JUGADAS</b></div>`
  },
  {
    id: '10763:11239', title: 'Tus bonos del año', category: 'Un año de momentos', background: a(2, 'imgImage943'),
    summary: 'Recibiste 800 bonos y activaste 315: 340 de misiones, 206 de retos y 254 de fidelidad.',
    render: () => `${bg(a(2, 'imgImage943'), 'bonuses-art', .8)}<div class="bonuses-title"><h2>RECIBISTE</h2>${glossy(String(demoData.bonuses), 'bonuses-number')}<h2 class="green-text">BONOS</h2></div><div class="bonus-activation"><div><i></i></div><p>Activaste <b>${demoData.activated}/${demoData.bonuses}</b></p></div><div class="bonus-metrics"><p>Cada <b>logro</b> hizo de tu 2026 más épico</p><div class="metric-grid">${metric(a(2, 'imgImage945'), 'Misiones', demoData.missions, 'Bonos')}${metric(a(2, 'imgImage944'), 'Retos', demoData.challenges, 'Bonos')}${metric(a(2, 'imgImage946'), 'Fidelidad', demoData.loyalty, 'Bonos')}</div></div>`
  },
  {
    id: '10763:11291', title: 'Tu favorito del año', category: 'Tu lado del juego', background: a(3, 'imgWrapped2026Slide3TuFavoritoDelAno'),
    summary: 'Real Madrid fue tu equipo más apostado en 2026.',
    render: () => `${bg(a(3, 'imgWrapped2026Slide3TuFavoritoDelAno'), 'favorite-art', .8)}${heading('EQUIPO MÁS', 'APOSTADO', 'favorite-heading')}<p class="favorite-subtitle">Infaltable en cada jugada</p>${img(a(3, 'imgPngwingCom1'), 'favorite-crest', 'Escudo del Real Madrid')}<h3 class="favorite-team">${demoData.favoriteTeam}<br>${demoData.favoriteCountry}</h3>`
  },
  {
    id: '10763:11390', title: 'Tu mayor racha', category: 'Tu lado del juego', background: a(4, 'imgImage952'),
    summary: 'Tu mayor racha del año fue de 12 días seguidos.',
    render: () => `${bg(a(4, 'imgImage952'), 'streak-art', .8)}<div class="streak-emblem-frame">${img(a(4, 'imgImage951'), 'streak-emblem', '')}</div>${heading('MAYOR', 'RACHA', 'streak-heading')}${glossy(String(demoData.streak), 'streak-number')}<div class="streak-copy"><b>DÍAS SEGUIDOS</b><em class="green-text">APOSTANDO</em></div>`
  },
  {
    id: '10763:11358', title: 'Tus tres equipos ganadores', category: 'Tu lado del juego', background: a(5, 'imgImage964'),
    summary: 'Tus tres equipos ganadores: Real Madrid, Manchester City y Barcelona.',
    render: () => `${bg(a(5, 'imgWrapped2026Slide5DondeMasGanaste'))}${bg(a(5, 'imgImage964'), 'podium-art', .8)}${heading('TOP 3 EQUIPOS', 'GANADORES', 'podium-heading')}<p class="podium-subtitle">Estos equipos te dieron tus mayores ganancias</p>${img(a(5, 'imgImage963'), 'podium-columns') }<div class="podium-team podium-team-city">${img(a(5, 'imgCity'), '', 'Manchester City')}<b>Manchester<br>City</b></div><div class="podium-team podium-team-madrid">${img(a(5, 'imgRealMadrid'), '', 'Real Madrid')}<b>Real Madrid</b></div><div class="podium-team podium-team-barcelona">${img(a(5, 'imgPngwingCom21'), '', 'Barcelona')}<b>Barcelona</b></div>`
  },
  {
    id: '10763:11516', title: 'Tu progreso en Club Olimpo', category: 'Tu año en el Club', background: a(6, 'imgWrapped2026Slide6TuProgresoEnClubOlimpo'),
    summary: 'Alcanzaste el nivel Dios en Club Olimpo y ganaste 24,850 puntos este año.',
    render: () => `${bg(a(6, 'imgWrapped2026Slide6TuProgresoEnClubOlimpo'), 'level-art', .52)}<h2 class="level-heading">ALCANZASTE</h2><div class="level-badge"><div>${img(a(6, 'imgDios22'))}</div></div><div class="level-copy">${img(a(6, 'imgVector1188', 'svg'), 'level-line level-line-left')}${img(a(6, 'imgVector1189', 'svg'), 'level-line level-line-right')}<em>NIVEL</em>${glossy(demoData.level, 'level-number')}<p>EN CLUB OLIMPO</p></div>${points(a(6, 'imgImage'), 'PUNTOS GANADOS ESTE AÑO', demoData.earnedPoints)}`
  },
  {
    id: '10763:11543', title: 'Tus canjes realizados', category: 'Tu año en el Club', background: a(7, 'imgWrapped2026Slide7TuActividadEnClubOlimpo'),
    summary: 'Realizaste 18 canjes: 8 productos, 4 experiencias y 6 bonos. Aún tienes 3,245 puntos para canjear.',
    render: () => `${bg(a(7, 'imgWrapped2026Slide7TuActividadEnClubOlimpo'), 'redemptions-art', .8)}${heading('CANJES', 'REALIZADOS', 'redemptions-heading')}${glossy(String(demoData.redemptions), 'redemptions-number')}<div class="redemptions-metrics metric-grid">${metric(a(7, 'imgImage958'), 'Productos', demoData.productRedemptions)}${metric(a(7, 'imgImage957'), 'Experiencias', demoData.experienceRedemptions)}${metric(a(7, 'imgImage956'), 'Bonos', demoData.bonusRedemptions)}</div>${points(a(7, 'imgImage'), 'Y TODAVÍA TIENES', demoData.remainingPoints, 'PUNTOS PARA CANJEAR')}`
  },
  {
    id: '10763:11309', title: 'Tus canjes estrella', category: 'Tu año en el Club', background: a(8, 'imgImage960'),
    summary: 'Tus canjes estrella: bono de casino en vivo, camiseta y apuesta gratis. También ganaste un premio en un sorteo.',
    render: () => `${bg(a(8, 'imgImage959'), 'star-art-under')}${bg(a(8, 'imgImage960'), 'star-art', .8)}${heading('CANJES', 'ESTRELLA', 'stars-heading')}<div class="star-list"><div>${img(a(8, 'imgBonoDoradoEsmeralda1'))}<p><b>Bono de Casino en Vivo</b><span><strong>8,500</strong> pts</span></p></div><div>${img(a(8, 'imgImage968'))}<p><b>Camiseta</b><span><strong>6,200</strong> pts</span></p></div><div>${img(a(8, 'imgBoletoDoradoApuestaGratis1'))}<p><b>Apuesta</b><span><strong>4,800</strong> pts</span></p></div></div><div class="prize-card">${img(a(8, 'imgImage967'))}<div><small>Y HUBO UNA SORPRESA MÁS:</small><b>GANASTE UN PREMIO</b><small>EN UNO DE NUESTROS SORTEOS</small></div></div>`
  },
  {
    id: '10763:11490', title: 'Tu año en un vistazo', category: 'Un último recuerdo', background: a(9, 'imgBackgroundImage'),
    summary: 'Tu 2026 en un vistazo: 800 bonos, nivel Dios y 18 canjes.',
    render: () => `${bg(a(9, 'imgBackgroundImage'))}<div class="recap-card" aria-label="Portada del resumen">${img(coverArt, 'recap-cover')}<span class="recap-play-icon" aria-hidden="true">${img(a(9, 'imgPlay', 'svg'))}</span><span class="recap-play-label">Reproducir resumen</span></div>`
  },
  {
    id: '10763:11446', title: 'Tu historia continúa', category: 'Hasta el próximo año', background: a(10, 'imgBackgroundImage'),
    summary: 'Lo mejor todavía está por venir. Nos vemos el próximo año.',
    render: () => `${bg(a(10, 'imgBackgroundImage'))}<div class="closing-top"><p>Lo mejor todavía</p><b>ESTÁ POR VENIR</b></div><div class="closing-bottom"><b>NOS VEMOS EL</b><b>PRÓXIMO AÑO</b><p>¡Sigamos<br>jugando como<br>los dioses!</p></div>`
  }
];

export function storyMarkup(index) {
  const story = stories[index];
  return `<article class="story-page story-${index + 1}" data-node-id="${story.id}" aria-label="${story.title}" tabindex="-1">${story.render()}<header class="wrap-story-header"><div class="wrap-story-top"><img class="wrap-story-logo" src="${logo}" alt="Olimpo.bet"><button class="wrap-close" data-close-wrapped aria-label="Cerrar Wrapped"><img src="${closeIcon}" alt=""></button></div><nav class="wrap-story-progress" aria-label="Historias de Wrapped">${stories.map((s,i)=>`<button data-story-index="${i}" class="${i <= index ? 'is-seen' : ''}" aria-label="Ir a historia ${i+1}: ${s.title}" ${i === index ? 'aria-current="step"' : ''}><span></span></button>`).join('')}</nav></header><div class="story-tap-zones"><button data-prev-story aria-label="Historia anterior" ${index===0?'disabled':''}></button><button data-next-story aria-label="Siguiente historia" ${index===9?'disabled':''}></button></div><button class="wrap-story-action" ${index===0?'data-next-story':'data-share-story'}>${index===0?'Empezar':'Compartir esta historia'}</button></article>`;
}
