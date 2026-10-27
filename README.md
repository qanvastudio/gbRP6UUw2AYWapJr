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

- `node scripts/verify-loading.cjs`
- `node --check app.js`
- `node --check hero-loading.js`

La verificación comprueba lógica de carga y referencias locales. No mide tiempos reales de red ni sustituye una revisión visual en navegador.
