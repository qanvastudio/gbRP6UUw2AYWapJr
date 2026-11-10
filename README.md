# Dr. Tony Bustos — sitio web

Sitio estático en HTML, CSS y JavaScript. Abrir `index.html` o servir esta carpeta mediante HTTP; no requiere instalar dependencias.

## Contenido

- Hero con portada y video, navegación fija y cambio de fondo al desplazarse.
- Trayectoria, experiencia, retrato editado y carrusel de nueve logotipos.
- Preguntas frecuentes, artículos y contacto en Hospital San Ángel Inn Universidad.
- Pie de página con dos logos y favicon de flecha roja.

Los datos profesionales y textos marcados como pendientes siguen sujetos a confirmación. El teléfono mostrado es provisional; no se envían formularios ni se agendan citas desde el sitio.

## Assets y rendimiento

`assets/` contiene únicamente los archivos usados por HTML, CSS o JavaScript. Se eliminaron originales sustituidos, variantes antiguas, prompts de generación y la grabación de referencia sin uso. El script de conversión puntual se retiró porque sus fuentes ya no se conservan.

Las imágenes de contenido usan WebP con carga diferida. La portada actual es `assets/hero-img.jpg` (960 × 540); el archivo móvil era idéntico y se eliminó. Se corrigieron las referencias a versiones WebP de la portada que ya no estaban disponibles.

El video se solicita después de cargar la portada, excepto con ahorro de datos, conexión 2G/3G o movimiento reducido. En móvil no bloquea el contenido. En escritorio la espera máxima es de 2,5 segundos. Se pausa fuera de pantalla o al ocultar la pestaña. Las flechas diagonales son SVG para evitar emojis.

## Verificación

La trayectoria se consulta en `trayectoria.html` desde «Conoce su trayectoria». `timeline-data.js` reúne los 64 registros del CV y los 13 hitos adicionales (77 en total), ordenados por año inicial; el reconocimiento sin fecha aparece al final. Los títulos destacan la formación, participación y responsabilidades indicadas, sin añadir certificaciones. `timeline.css` y `timeline.js` dibujan una sola línea curva continua en azul principal (#012150), con bandas translúcidas sobre fondo claro. Los hitos se agrupan bajo encabezados de año y cada uno conserva su nodo. Un carril exclusivo separa la línea de los textos y detalles, tanto en escritorio como en móvil. Todos los detalles permanecen visibles y cada hito conserva su nodo.

- `node scripts/verify-timeline.cjs` (77 registros visibles, agrupación anual, colores únicos y trazado de la línea)

- `node scripts/verify-loading.cjs`
- `node --check app.js`
- `node --check hero-loading.js`

La verificación comprueba lógica de carga y referencias locales. No mide tiempos reales de red ni sustituye una revisión visual en navegador.

## Páginas de contenido

Los modales se sustituyeron por navegación HTML normal. La página principal es `index.html`; el resto comparte el encabezado, los filtros de transparencia de los logos, la navegación y el pie de página. `pages.css` define la distribución adaptable de las páginas internas.

- `doctor.html`: formación y acceso a trayectoria.
- `trayectoria.html`: línea de tiempo completa con los 77 hitos visibles.
- `procedimientos.html`: catálogo de 69 elementos en siete categorías, con búsqueda, filtros por color y esferas animadas. El contenido permanece visible sin JavaScript. `procedimientos-data.js` contiene los nombres y descripciones; ejecutar `node scripts/build-procedures.cjs` después de editarlo para regenerar el HTML. `procedimientos.css` y `procedimientos.js` controlan la presentación y los filtros; el movimiento respeta la preferencia de movimiento reducido y puede pausarse.
- `resultados.html`: estado del contenido pendiente.
- Las seis tarjetas principales de Procedimientos se editan en `procedimientos-featured.cjs` y se regeneran con el mismo comando. Usan fotografías provisionales de `assets/article-*.webp`; reemplazar su campo `image` cuando lleguen las fotografías definitivas. Al seleccionarlas muestran descripción y un enlace de WhatsApp con el nombre del procedimiento. La apertura funciona con ratón, toque y teclado mediante `details`/`summary`, también sin JavaScript. El número de destino es el mismo que usa el resto del sitio.
- `pacientes.html`: orientación y acceso a preguntas frecuentes.
- `articulos.html`: índice de artículos.
- `articulo-consulta.html`, `articulo-credenciales.html` y `articulo-acompanamiento.html`: lecturas individuales.

Las páginas internas no cargan el video del Hero. Su encabezado azul mantiene el contraste desde el inicio; incluyen rutas de navegación y accesos a contenido relacionado y contacto. Los archivos HTML pueden abrirse directamente desde el disco.
