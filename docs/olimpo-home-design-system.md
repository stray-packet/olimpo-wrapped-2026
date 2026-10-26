# Referencia visual de Olimpo.bet

**Fuente:** copia local de la demo `olimpo-interactive-walktrough/prototype`. Los valores de abajo se leen de sus CSS; describen esta referencia y no garantizan que coincidan con los tokens actuales de producción.

## Tipografía

- Familia local: **GT Walsheim**, registrada como `Olimpo`.
- Pesos disponibles: Regular 400, Medium 500 y Bold 700. Archivos WOFF2 locales.
- Base de página: 16 px / 24 px, peso regular.
- Navegación desktop: 14 px, bold.
- Navegación móvil inferior: 10 px / 14 px, medium.
- Títulos de sección: 32 px desktop y 27 px móvil.
- Título del bloque de eventos: 32 px desktop y 26 px móvil.

## Colores principales

| Token | Valor | Uso visible |
|---|---|---|
| `--ink` | `#121212` | Fondo principal |
| `--surface` | `#1c1c1c` | Superficies oscuras |
| `--forest` | `#0d2b16` | Verde oscuro, footer y navegación móvil |
| `--green-700` | `#19572c` | Header y acentos de marca |
| `--green` | `#3cc666` | Bordes y acentos verdes |
| `--lime` | `#9ee86e` | CTA, selección activa y acento primario |
| `--lime-soft` | `#d9f6c6` | Texto verde claro |
| `--text` | `#fff` | Texto sobre superficies oscuras |
| `--muted` | `#c9c9c9` | Texto secundario |

## Layout y responsive

- Header fijo al hacer scroll: 64 px desktop y 60 px en móvil; fondo `--green-700`.
- Navegación horizontal visible por encima de 1150 px. Entre 769 y 1150 px se oculta.
- En móvil (768 px o menos), header compacto y navegación inferior fija de 76 px, con cinco destinos y scroll horizontal si hace falta.
- Home centrada: ancho máximo aproximado de 1080 px; accesos rápidos, 1030 px.
- Hero: altura calculada desde el ancho (23.96vw), con límites de 260–330 px desktop; en móvil, 40vw con mínimo de 180 px.
- Los módulos de home usan 64 px de padding vertical desktop y 38 px en móvil.
- La barra inferior reserva 76 px de espacio en el documento móvil.

## Componentes y estados

- Botón primario: fondo lima, texto oscuro, radio de 12 px; cambia a lima suave en hover.
- Botón de contorno: borde y texto lima, fondo transparente, radio de 12 px.
- Accesos rápidos: bloque gris `#2b2b2b`, cuatro columnas desktop; en móvil se desplaza horizontalmente con elementos de al menos 130 px.
- Tarjetas de evento: fondo verde oscuro en gradiente, borde verde, radios de 14 px.
- Tarjetas de juego: radio de 14 px; botón «Jugar» se revela al hover en escritorio y queda visible en móvil.
- Indicador de banner activo: píldora lima de 28 px; inactivos, círculos blancos de 9 px.
- Menú de perfil: panel claro de hasta 384 px que entra desde la derecha con scrim oscuro; también se cierra con Escape o al pulsar fuera.

## Movimiento y controles

- Carrusel del hero: cuatro piezas; avanza automáticamente cada 5 segundos. Flechas y puntos permiten cambiarlo manualmente y reinician el temporizador.
- Cambio de banner: transición de fondo de 450 ms.
- Menú de perfil: transición de entrada de 250 ms.
- Estados hover de botones principales: transición de aproximadamente 200 ms.
- La home usa banners separados para escritorio y móvil, elegidos con el breakpoint de 768 px.

## Cómo usar esta referencia en Wrapped

Consulta primero [`../reference/olimpo-home/`](../reference/olimpo-home/). La demo abre en la home autenticada y permite revisar el menú de perfil, el carrusel, la grilla de home y la navegación inferior en móvil. Para el punto de entrada a Wrapped habrá que escoger luego si se inserta una tarjeta en el contenido, una pieza en el hero o un aviso al ingresar; esta copia todavía no contiene UI de Wrapped.
