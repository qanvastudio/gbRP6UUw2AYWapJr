# Dr. Tony Bustos — sitio web

Portal estático en HTML, CSS y JavaScript, sin dependencias de ejecución.

## Edición

- `index.html`: inicio, FAQ y contacto.
- `doctor.html` y `trayectoria.html`: formación y trayectoria; los 26 hitos se editan en `timeline-data.js`.
- `procedimientos-data.js`: catálogo de 69 elementos en siete categorías.
- `procedimientos-featured.cjs`: seis tarjetas principales, fotografías y videos.
- `articulos.html` y `articulo-*.html`: índice y lecturas informativas.

Después de editar los datos de procedimientos, ejecutar `node scripts/build-procedures.cjs`.

## Recursos y rendimiento

`assets/` contiene los recursos públicos utilizados. `source-assets/` conserva originales para regenerar imágenes y no se publica. Ejecutar `./scripts/optimize-procedure-images.ps1` desde la raíz y luego regenerar Procedimientos para actualizar sus variantes JPEG.

Las seis imágenes suman 98.630 bytes en versión móvil y 182.674 bytes en versión grande. El navegador selecciona mediante `picture`; la densidad de pantalla puede requerir la variante grande. La primera tiene prioridad alta y las restantes carga diferida.

Los videos de procedimientos se solicitan al entrar en pantalla. Se conserva la imagen de respaldo si falla la reproducción. Se evita iniciarlos con ahorro de datos, conexión 2G/3G o preferencia de movimiento reducido, cuando el navegador informa esas condiciones. Se pausan fuera de pantalla y al ocultar la pestaña. El hero también controla su carga para no bloquear indefinidamente el contenido.

## Verificación y publicación

Ejecutar desde la raíz:

```powershell
node scripts/build-seo.cjs
node scripts/verify-seo.cjs
node scripts/verify-site.cjs
node scripts/verify-loading.cjs
node scripts/verify-procedure-video.cjs
node scripts/verify-timeline.cjs
node scripts/build-production.cjs
```

Publicar exclusivamente el contenido de `dist/` en la raíz del alojamiento estático. El empaquetado incluye recursos alcanzables desde las páginas HTML y los archivos públicos de SEO y GitHub Pages; excluye originales, scripts, documentación y metadatos Git. Rechaza archivos sobrantes de compilaciones anteriores para evitar publicarlos accidentalmente.

El alojamiento debe servir HTML, CSS, JavaScript, imágenes y MP4 con sus tipos de contenido correctos, admitir solicitudes parciales de video y HTTPS. Evitar caché permanente de HTML o de recursos con nombres reutilizados. La configuración concreta depende del proveedor.

Las comprobaciones automatizadas cubren recursos, enlaces locales y anclas, metadatos básicos, imágenes, carga y trayectoria. No sustituyen una prueba visual ni una prueba de red en dispositivos reales. Antes de publicar, revisar `dist/` mediante un servidor HTTP en escritorio y móvil; después comprobar el dominio final y sus enlaces. El dominio previsto es https://drtonybustos.com.mx y el alojamiento es GitHub Pages. La activación del dominio, HTTPS y Search Console se documenta en SEO.md; no se ha publicado desde esta tarea.

## SEO

Consultar [SEO.md](SEO.md) para configuración, búsquedas objetivo y pasos de publicación. Los metadatos se editan en seo.config.cjs. El sitemap, robots y las URL canónicas se regeneran automáticamente al preparar producción.

