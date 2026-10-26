# Imágenes del canje

- `confirmacion-web.webp`: modal de confirmación para web (598 × 408 px).
- `confirmacion-mobile.webp`: modal de confirmación para mobile (312 × 424 px).

Se seleccionan con `<picture>` en `clubSuccessScreen()`. Cada imagen contiene un único botón «Ir a mis bonos»; el botón HTML transparente conserva la interacción y el nombre accesible.

- Los PNG originales entregados por el usuario se conservan en `internal/source-assets/unused/imgs/club-olimpo/canje/`.

Se seleccionan con `<picture>` en `clubTermsScreen()` para el paso 5. Se utiliza la imagen completa, con un botón HTML transparente sobre Canjear y otro sobre la X de la imagen web. Los textos y la barra de desplazamiento dibujada forman parte del bitmap; el contenedor completo permite desplazamiento en pantallas de poca altura. El coach mark y la flecha siguen siendo elementos HTML independientes.

Las variantes activas son `terminos-web-transparent.webp` y `terminos-mobile-transparent.webp`. Conservan las dimensiones y transparencia de los PNG de origen, archivados en `internal/source-assets/png/`. Los porcentajes de los botones superpuestos siguen coincidiendo con la imagen original.
