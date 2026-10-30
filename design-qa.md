# Revisión de historias · 28 de octubre de 2026

Se revisaron el marcado, los recursos y las secuencias de animación de las diez historias. Los 61 usos de imagen presentes en el marcado apuntan a archivos locales existentes. Se comprobó la sintaxis de los tres módulos JavaScript y que el servidor local responde.

| Historia | Revisión y ajuste |
|---|---|
| 1 · Portada | Se conservaron composición y entrada; se eliminó el desenfoque animado del texto y el cambio de brillo del fondo para reducir trabajo de pintura. |
| 2 · Bonos | Se verificaron nueve referencias de imagen. Se amplió el espacio de pintura de «BONOS» para evitar que se corte la S oblicua. |
| 3 · Equipo favorito | Se verificaron cuatro referencias de imagen. Se amplió el espacio de pintura del título para que la O final de «APOSTADO» quede completa. |
| 4 · Racha | Se verificaron cuatro referencias de imagen y la entrada del fondo. |
| 5 · Equipos ganadores | Se verificaron ocho referencias de imagen y la entrada del podio. |
| 6 · Club Olimpo | Se verificaron siete referencias de imagen y la entrada del fondo. |
| 7 · Canjes realizados | Se verificaron diez referencias de imagen. Se retiraron las copias con máscaras de las monedas que elevaban el costo de composición. |
| 8 · Canjes estrella | Se verificaron ocho referencias de imagen y se retiraron las mismas copias con máscaras. |
| 9 · Resumen | Se verificaron cinco referencias de imagen. La portada es estática: sin botón funcional, secuencia, barra de progreso ni texto «Olimpo Wrapped / Tu año, en un vistazo». |
| 10 · Cierre | Se verificaron tres referencias de imagen. Se retiró «Volver a Olimpo»; la X superior cierra el visor. |

En todas las historias 2–10 se retiraron dos copias grandes del fondo que se animaban como cintas y se evitó animar el filtro de desenfoque de los títulos. Ahora se precargan los recursos adyacentes y se espera su decodificación antes de cambiar de historia. Las entradas conservan movimiento de escala/opacidad, halos, luces y, donde corresponde, confeti.

**Límite de esta revisión:** el acceso automatizado al navegador local fue rechazado por la política del navegador. Por ello no hay medición de FPS ni confirmación visual en ejecución de cada transición o del antialiasing de las letras. La corrección de las letras responde al ejemplo visual compartido por el usuario y al análisis de las cajas CSS. Se recomienda una pasada manual en web y móvil antes de dar por cerrada la validación visual.

## Ajustes posteriores

- Web: se añadió una vista previa «Anterior» a la izquierda de la historia, además de «Siguiente» a la derecha.
- Se retiraron los contornos blancos del marco de historia y las tarjetas de vista previa. El foco del acceso flotante y de la X del anuncio se indica con un brillo verde, sin círculo.
- El anuncio conserva el cierre automático a los diez segundos, sin mostrar contador ni barra.
- Móvil: el anuncio ocupa hasta 360 px de ancho y el acceso flotante escala 1,5 veces respecto al icono original de Figma. El borde del anuncio usa `#FFCC00` en 0 %, `#2CFF4A` en 51 % y `#4CFF68` en 100 %.
