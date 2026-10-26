# Revisión visual · Olimpo Wrapped 2026

Fecha: 26 de octubre de 2026. Alcance: primera versión del acceso, portada, recorrido responsive y cierre; datos de muestra.

## Referencias y evidencia

- Fuente Figma: sección `4009:2927` del archivo `8wpuE9yWVC1SnC8ENdlWE7`; diez nodos y recursos originales registrados en `design/figma-context.json` y `design/figma-assets.json`.
- Capturas de referencia: `design/references/story-01.png` a `story-10.png`, 624 × 1220 px.
- Implementación: `design/qa/story-01.png` a `story-10.png`, capturadas desde el navegador a 312 × 610 CSS px, DPR 1.
- Comparaciones en una misma imagen: `design/qa/comparison-01.png` a `comparison-10.png`. Cada referencia se redujo con Lanczos a 312 × 610; no se recortaron regiones para ocultar diferencias.
- Vista desktop: `design/qa/desktop-home.png` y `desktop-story-01.png`, viewport 1440 × 900.
- Vista móvil: `design/qa/mobile-home.png` y `mobile-story-01.png`, viewport 390 × 844.
- Estado de historias: pausa natural después de la entrada; sin progresión automática. La portada se capturó después de terminar su revelación.
- Los primeros bytes del servicio de capturas son JPEG; se normalizaron los archivos a PNG para guardarlos. El navegador renderiza con DPR 1; el antialiasing puede diferir del render de Figma.

## Historial de correcciones

1. **[P1, resuelto] Escala del lienzo durante la entrada.** Se medía el rectángulo transformado del visor y quedaban márgenes involuntarios después de la animación. Se sustituyó por `clientWidth/clientHeight`, que representan su tamaño de layout. Se volvió a capturar en desktop y móvil.
2. **[P2, resuelto] Relieve de las cifras.** La primera conversión reproducía el gradiente, pero no las sombras interiores. Se leyeron los efectos de las capas del componente `10763:11248` en Figma y se trasladaron a filtros sobre texto editable. Evidencia inicial: `initial-comparison-02.png`, `initial-comparison-04.png`, `initial-comparison-06.png`; evidencia final: comparaciones 02, 04 y 06.
3. **[P2, resuelto] Texto verde oscurecido.** La sombra CSS del título interfería con su fondo recortado al texto. Se separó la sombra para conservar el color verde. Evidencia: comparaciones inicial/final 02 y 04.
4. **[P2, resuelto] Encuadre y geometría de assets.** Se contrastaron los fondos con su posición en Figma. Portada y cierre mantienen `object-fit: cover`; el emblema de racha usa el marco de 309.72 px y la imagen de 268 px con rotación de 9.8° del contexto original. Evidencia final: comparaciones 01, 04 y 10.
5. **[P2, resuelto] Foco y estado oculto.** Al cambiar historia se devuelve el foco al nuevo artículo para mantener operativas las flechas de teclado; el contenido saliente queda inerte. El control de reinicio permanece oculto en la portada.

## Superficies revisadas

| Superficie | Resultado |
|---|---|
| Tipografía | GT Walsheim local, pesos 400/500/700; jerarquía y saltos principales conservados. Los títulos oblicuos se sintetizan desde bold; queda como refinamiento menor el font exacto Bold Oblique. |
| Layout | Lienzo base 312 × 610, proporciones conservadas. La versión móvil contiene la composición y mantiene visibles cierre, progreso y CTA. Desktop añade columnas de apoyo y vista previa. |
| Color | Negro, verdes y lima derivados de Figma y la home. Brillo y profundidad de cifras reproducidos con sus valores de origen. |
| Assets | Fondos, escudos, columnas, emblema, moneda de nivel, premios y recursos de Club provienen de Figma. El logo coincide con el recurso local de la home. No hay imágenes de pantallas completas usadas como UI. |
| Slots de assets | Se compararon las diez capturas completas y las regiones de portada, cifras, emblema, podio, moneda de nivel y tarjetas de premios. Todos los assets visibles de las historias cargaron con dimensiones naturales distintas de cero. |
| Copy | Mantiene la propuesta original, con cambios intencionales: Real Madrid de España para coincidir con el escudo; nuevo resumen en el frame vacío 9; acción de volver en el cierre. |
| Movimiento | Entrada de portada, transición en ambas direcciones, cierre y secuencia de resumen comprobados en navegador. Las estadísticas permanecen estáticas. |

## Interacciones probadas

- Apertura automática de portada mediante `?intro=1` y apertura manual desde el banner.
- «Empezar», diez segmentos de progreso, siguiente/anterior y límites de la secuencia.
- Flecha derecha de teclado: historia 2 → 3.
- Gesto lateral: historia 3 → 2.
- Cierre desde el header y desde «Volver a Olimpo» al final.
- Reanudación en una sesión nueva: cerrar en historia 2, CTA «Continuar mi Wrapped», reapertura en historia 2.
- Player del frame 9: inicio manual, secuencia completa y retorno al estado reproducible al terminar.
- Carga de imágenes en las diez historias: ninguna rota.
- Consola del navegador: sin errores ni advertencias en las revisiones finales.
- Sintaxis Node de los módulos JavaScript: válida.

## Límites y pulido posterior

- **[P3]** Diferencias menores de antialiasing, tipografía oblicua sintetizada y espaciado del texto secundario frente al render de Figma. No ocultan datos ni controles.
- La hoja nativa de compartir del sistema operativo no se probó hasta enviar contenido. El prototipo comparte texto o lo copia; no exporta una imagen o un video.
- Se usaron viewports de navegador; no se probó físicamente en Safari/iOS o Android.
- Elegibilidad real, persistencia por cuenta y conexión de métricas a backend están fuera del alcance de esta demo.
- La historia 9 es una propuesta en código porque el diseño no aporta un archivo de video.

No quedan hallazgos P0/P1/P2 accionables dentro del alcance de esta primera versión.

final result: passed
