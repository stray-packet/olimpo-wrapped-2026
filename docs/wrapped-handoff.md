# Olimpo Wrapped 2026 · primera versión

## Revisión local

- Prototipo y entrada completa: http://127.0.0.1:4173/?intro=1
- Home y banner sin apertura automática: http://127.0.0.1:4173/?intro=0
- Copia de la home previa: http://127.0.0.1:4173/reference/olimpo-home/
- Una historia directa: `/?story=2` (1–10).

El servidor está en `scripts/serve.mjs`. Se ejecuta con `npm run dev` o `node scripts/serve.mjs --port 4173`. No requiere dependencias. El servidor de esta revisión escucha en 127.0.0.1; el enlace es local a este equipo. Para revisar desde un teléfono en la misma red se puede iniciar con `--host 0.0.0.0` y usar la IP local del equipo.

## Propuesta de acceso

Tarjeta persistente entre los accesos rápidos del home y «En vivo». La composición combina texto a la izquierda con la portada original de Figma a la derecha. La tarjeta completa funciona como un botón. El arte tiene un desplazamiento leve; el hover eleva el bloque y aclara el CTA. La versión móvil conserva el mismo contenido con un encuadre vertical compacto.

El aviso inicial abre la primera historia 1.2 segundos después de cargar la home, una vez por sesión de pestaña. El cierre devuelve el foco al acceso de origen y mantiene la tarjeta en la home. Si hay progreso, su CTA permite continuar; al llegar al final ofrece volver a verlo. El estado es de demostración y usa `sessionStorage`; producción debe decidir elegibilidad y frecuencia por usuario/campaña.

## Web y móvil

En desktop, un visor a pantalla completa coloca la historia vertical en el centro, con título, controles y contador a la izquierda y una vista previa de la siguiente a la derecha. Conserva la composición de 312 × 610 del original. En móvil, el visor ocupa toda la pantalla y centra el lienzo sin recortar textos ni controles, adaptándolo al ancho y alto disponibles. No se rasterizan las pantallas: copy, botones, progreso y métricas son HTML; el relieve de las cifras usa las capas y efectos leídos del componente de Figma.

## Movimiento

| Momento | Implementación | Tiempo |
|---|---|---|
| Banner | Desplazamiento y escala leve del arte original | 10 s, alternado |
| Hover del banner | Elevación de 3 px | 350 ms |
| Apertura del fondo | Opacidad de 0 a 1 | 350 ms |
| Entrada del lienzo | Traslación vertical de 45 px y escala de .91 a 1 | 950 ms |
| Revelación de portada | Escala de 1.45 a 1, rotación de −5° a 0° y brillo inicial | 2.1 s |
| Texto de portada | Entrada con opacidad, desenfoque y traslación de 26 px | 800 ms; inicios a 400/580 ms |
| CTA de portada | Opacidad y entrada desde abajo | 650 ms; inicio a 850 ms |
| Cambio de historia | Salida de 45 px y entrada de 60 px según la dirección | 420 ms |
| Cierre | Opacidad y reducción leve del lienzo | 320 ms |
| Resumen de la historia 9 | Cinco mensajes sobre arte original | 7.5 s, tras pulsar reproducir |

La curva principal es `cubic-bezier(.22,1,.36,1)`. `prefers-reduced-motion` elimina el desplazamiento del banner y las entradas/transiciones animadas. Las historias tienen una entrada de fondo de unos 2.7 segundos y después permanecen estáticas; no hay avance automático ni conteo de cifras.

### Fondos por capas · segunda versión

Implementación independiente en `app/story-motion.js`; estilos de las capas en `app/wrapped.css`. Se reutilizan las imágenes originales, sin regenerarlas ni añadir librerías, video o recursos remotos. Las máscaras SVG se crean en código; no son archivos de animación externos.

| Historia | Plantilla de entrada | Contenido que conserva su posición |
|---|---|---|
| 1 · Portada | Se conserva la entrada aprobada | Misma composición |
| 2 · Bonos | Fondo con zoom suave, zonas superior e inferior en distinto desplazamiento, halo dorado, confeti breve; títulos RECIBISTE / BONOS | Cifras, progreso, métricas e iconos |
| 3 · Favorito | Revelación del estadio, haces de luz graduales, confeti breve; título EQUIPO MÁS / APOSTADO | Escudo, nombre del equipo y subtítulo |
| 4 · Racha | Luz dorada desde el rayo, fondo con profundidad y confeti breve; MAYOR / RACHA | Número, emblema y métricas |
| 5 · Equipos | Resplandor central y luces desde el estadio, confeti y título | Equipos, escudos y podio |
| 6 · Club | Halo y haces alrededor del fondo, título ALCANZASTE | Insignia, nivel y puntos |
| 7 y 8 · Canjes | Una misma plantilla `rewards`: cinco monedas decorativas separadas con máscaras, desplazamiento de entrada y halo dorado | Productos, importes y todas las cifras |
| 9 · Resumen | Entrada suave del fondo; el player mantiene su reproducción manual | Controles y tarjeta del resumen |
| 10 · Cierre | Zoom suave y entrada escalonada del copy fijo | Año del arte original |

**Tiempos compartidos:** fondo 2400 ms; zonas de cintas 2300 ms con desfase de 120 ms; halos 2600 ms con retraso de 100 ms; luces 2300 ms con retrasos de 180/380 ms; confeti entre 1550 y 1970 ms con pequeños desfases; monedas 1750 ms con retrasos de 160–600 ms; títulos fijos 780 ms con desfases de 130 ms. Curva `cubic-bezier(.22,1,.36,1)`.

La secuencia se ejecuta una vez cada vez que se entra a la historia, tanto al avanzar como al retroceder o reabrirla. No hay loops en los fondos. Al terminar se retiran las capas temporales y queda el arte original sin máscaras: el confeti original permanece fijo, y las partículas adicionales se disuelven durante la llegada. Las monedas sí son zonas de la propia imagen separadas de su base mediante máscaras inversas. Las cintas se sugieren con zonas enmascaradas del arte compuesto; no son una reconstrucción completa de cada objeto de la ilustración.

El módulo solo conoce el índice y los elementos decorativos de la historia. No lee datos de usuario. Los valores, escudos, nombres, productos e insignias no reciben animación propia; solo comparten la transición de pantalla existente. Al salir, se cancelan las animaciones de los descendientes para no mantener efectos fuera de pantalla. Con movimiento reducido, se presenta directamente la composición estática y no se ejecutan estos efectos.

## Interacción

- «Empezar» lleva de la portada a la historia 2.
- Toque/clic en la mitad derecha o izquierda, flechas del teclado, gesto horizontal o segmentos de progreso permiten navegar.
- El botón superior cierra desde cualquier historia; Escape también cierra.
- En la última historia, «Volver a Olimpo» devuelve a la home.
- «Compartir esta historia» usa la hoja nativa de compartir cuando está disponible. En desktop copia un resumen textual al portapapeles. Esta versión no exporta una imagen o un video personalizado.
- El player de la historia 9 reproduce una secuencia original en HTML/CSS con los datos de muestra. No carga un video externo.

## Recursos y datos

Fuente: https://www.figma.com/design/8wpuE9yWVC1SnC8ENdlWE7/-MARKETING--Wrapped-Olimpo?node-id=4009-2927

Se siguieron los diez nodos `10763:11406`, `10763:11239`, `10763:11291`, `10763:11390`, `10763:11358`, `10763:11516`, `10763:11543`, `10763:11309`, `10763:11490` y `10763:11446`. El contexto extraído y la relación de assets están en `design/figma-context.json` y `design/figma-assets.json`. Los PNG originales y las versiones WebP locales se conservan en `assets/wrapped/`. Las capturas de referencia se guardan en `design/references/` y no se usan como pantallas del prototipo.

Se reutiliza GT Walsheim 400/500/700 y el logo local de la home. Los títulos oblicuos usan el peso bold en cursiva. Las cifras 3D siguen los efectos del componente de Figma, incluidas sus sombras interiores. El resto del sitio conserva los estilos de la demo previa.

Los datos son de muestra. Parte de las métricas está centralizada en `demoData` dentro de `app/stories.js`; la integración con datos reales y las reglas de qué historias mostrar siguen pendientes.

## Decisiones de esta versión

1. Se corrigió el texto del equipo favorito a «Real Madrid de España», porque el original combina su escudo con el nombre Borussia Dortmund.
2. El frame 9 tiene un espacio vacío para video. Se propuso una secuencia nueva con arte y datos de la demo para poder revisar un recorrido completo.
3. Se añadió un cierre explícito «Volver a Olimpo» en la última pantalla.
4. La ubicación del banner y las columnas de apoyo de desktop son propuestas nuevas; las historias conservan la composición del diseño móvil.

## Remotion

Esta primera versión usa HTML, CSS y Web Animations API y no necesita Remotion. Su código controla directamente la interfaz, por lo que puede interrumpirse, reanudarse y adaptarse a la pantalla. Remotion sería una opción para producir una pieza audiovisual independiente o exportar una recapitulación personalizada a WebM/MP4; no es necesario para las entradas y transiciones actuales.
