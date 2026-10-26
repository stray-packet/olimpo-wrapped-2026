# Olimpo Wrapped 2026

Prototipo navegable: **http://127.0.0.1:4173/?intro=1**.

La home con el banner está en `/`; la copia anterior de la home está en `/reference/olimpo-home/`.

## Ejecutar localmente

No requiere instalar dependencias. Con Node disponible, ejecuta `npm run dev` o `node scripts/serve.mjs --port 4173`. Mantén el proceso abierto mientras revisas el prototipo.

Para repetir la entrada usa `?intro=1`. Para ver la home sin apertura automática usa `?intro=0`. Para abrir una historia concreta usa `?story=2` (valores del 1 al 10).

## Prototipo Wrapped

- `app/wrapped.js`: acceso, apertura, navegación, gestos, reanudación, cierre y secuencia de resumen.
- `app/wrapped.css`: banner, layout web/móvil, movimiento y estilos de historias.
- `app/stories.js`: plantillas HTML, recursos originales y datos de muestra.
- `app/story-motion.js`: entradas de los fondos por capas, luces, confeti y monedas decorativas; sin dependencias adicionales.
- `assets/wrapped/`: recursos descargados de Figma; las versiones WebP se usan en la web.
- [`docs/wrapped-handoff.md`](docs/wrapped-handoff.md): decisiones, tiempos de animación e integración.

Referencia de la home adaptable de Olimpo.bet: [`reference/olimpo-home/`](reference/olimpo-home/).

Notas de estilo, tamaños, breakpoints y comportamiento: [`docs/olimpo-home-design-system.md`](docs/olimpo-home-design-system.md).

La referencia fue extraída de `D:\Olimpo Bet\olimpo-interactive-walktrough\prototype`; es una copia independiente para apoyar la ideación e implementación de Wrapped.
