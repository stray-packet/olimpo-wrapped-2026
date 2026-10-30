# Olimpo Wrapped 2026

Prototipo local: **http://127.0.0.1:4173/**.

[Handoff en Figma: acceso, 10 historias web, 10 mobile y recursos](https://www.figma.com/design/8wpuE9yWVC1SnC8ENdlWE7/-MARKETING--Wrapped-Olimpo?node-id=10955-39).

La home con el banner está en `/`; la copia anterior de la home está en `/reference/olimpo-home/`.

## Ejecutar localmente

No requiere instalar dependencias. Con Node disponible, ejecuta `npm run dev` o `node scripts/serve.mjs --port 4173`. Mantén el proceso abierto mientras revisas el prototipo.

Para abrir una historia concreta usa `?story=2` (valores del 1 al 10). Para repetir el anuncio inicial, abre una sesión nueva del navegador.

## Prototipo Wrapped

- `app/wrapped.js`: acceso temporal y desde el panel, apertura, navegación, gestos, reanudación y cierre.
- `app/wrapped.css`: banner, layout web/móvil, movimiento y estilos de historias.
- `app/stories.js`: plantillas HTML, recursos originales y datos de muestra.
- `app/story-motion.js`: entradas de los fondos, luces y confeti; sin dependencias adicionales.
- `assets/wrapped/`: recursos descargados de Figma; las versiones WebP se usan en la web.
- [`docs/wrapped-handoff.md`](docs/wrapped-handoff.md): decisiones, tiempos de animación e integración.

La historia 9 es una portada fija con el símbolo de play; no reproduce video.

Referencia de la home adaptable de Olimpo.bet: [`reference/olimpo-home/`](reference/olimpo-home/).

Notas de estilo, tamaños, breakpoints y comportamiento: [`docs/olimpo-home-design-system.md`](docs/olimpo-home-design-system.md).

La referencia fue extraída de `D:\Olimpo Bet\olimpo-interactive-walktrough\prototype`; es una copia independiente para apoyar la ideación e implementación de Wrapped.
