# Olimpo Wrapped 2026 · entrega para tecnología

## Qué se entrega

El Wrapped es una interfaz web de diez historias. No contiene archivos de video ni requiere WebM, MP4, un reproductor o Remotion. Los fondos son imágenes WebP estáticas; sus entradas, luces y partículas se animan con CSS y Web Animations API. La historia 9 muestra únicamente una portada oscurecida con el símbolo de play y el texto «Reproducir resumen». Es una composición fija y no responde al clic.

Archivos principales:

- `app/stories.js`: contenido, datos de muestra y composición HTML de cada historia.
- `app/story-motion.js`: entrada visual de las historias 2 a 10.
- `app/wrapped.js`: modal, navegación, precarga de imágenes y transiciones.
- `app/wrapped.css`: estilos, fondos, tipografía y diseño responsive.
- `assets/wrapped/`: imágenes WebP y vectores SVG locales.
- `reference/olimpo-home/assets/fonts/`: GT Walsheim 400, 500 y 700.

El prototipo se inicia con `npm run dev` y queda disponible en `http://127.0.0.1:4173/`. Se puede abrir una historia directamente con `/?story=1` hasta `/?story=10`. El servidor de `scripts/serve.mjs` es solo para revisión local; en producción estos archivos se pueden servir desde la infraestructura estática habitual.

## Movimiento por historia

| Historia | Efecto de entrada | Contenido fijo |
|---|---|---|
| 1. Portada | Escala y aparición del fondo, texto y CTA | Cifras y arte |
| 2. Bonos | Zoom leve, halo y confeti | Bonos y métricas |
| 3. Equipo favorito | Zoom leve, luces y confeti | Escudo y nombre |
| 4. Racha | Zoom leve, luces y confeti | Número y emblema |
| 5. Equipos ganadores | Zoom leve, halo y confeti | Podio y escudos |
| 6. Club Olimpo | Zoom leve, luces y halo | Nivel y puntos |
| 7. Canjes realizados | Zoom leve y halo | Cifras y premios |
| 8. Canjes estrella | Zoom leve y halo | Productos e importes |
| 9. Resumen | Entrada del fondo | Portada del resumen, sin reproducción |
| 10. Cierre | Entrada del fondo y texto | Cierre mediante la X superior |

Las animaciones duran aproximadamente entre 0,8 y 2,6 segundos, se ejecutan una vez al entrar y se detienen al salir. La historia siguiente se precarga y sus imágenes se decodifican antes del cambio. No hay un video oculto detrás de estos efectos. Con `prefers-reduced-motion`, las historias se muestran sin esas entradas.

## Integración

### Acceso temporal y acceso persistente

Al entrar en la home se abre el anuncio de Wrapped con un fondo rgba(18,18,18,.70) y desenfoque de 6 px. Se cierra con la X, al pulsar fuera o tras 10 segundos sin interacción. Al cerrarse, se contrae hacia la burbujita en 680 ms y esta aparece en 420 ms. Con movimiento reducido, el cambio es inmediato.

La burbujita es un acceso temporal. Desaparece cuando el usuario abre Wrapped desde ella o abre el panel de perfil, y no vuelve durante esa visita. Desde entonces, «Olimpo Wrapped» permanece accesible como primera opción del panel lateral, encima de «Mis bonos». Ambos accesos retoman la última historia pendiente; después de completar el recorrido, empiezan por la primera. El visor se abre sobre el panel con el mismo overlay y blur; al cerrarlo con la X, el panel sigue abierto si fue el punto de entrada.

`demoData` en `app/stories.js` contiene valores de muestra. Tecnología debe sustituirlos por datos reales, decidir elegibilidad y frecuencia de la campaña y conectar la acción «Compartir esta historia» con el producto. La navegación actual admite clic/toque, gesto horizontal, flechas del teclado y segmentos de progreso. La X superior cierra desde cualquier historia.

Para entregar esta versión, se comparte el repositorio completo con sus recursos locales. Si más adelante se pide un video para redes o descarga, sería un entregable nuevo que habría que renderizar a MP4/WebM; no hace falta para reproducir el Wrapped dentro de la web.
