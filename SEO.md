# SEO y publicación — Dr. Tony Bustos

Dominio canónico: https://drtonybustos.com.mx (sin www). Alojamiento previsto: GitHub Pages.

## Implementado

- Sitemap XML con ocho páginas públicas y URL absolutas HTTPS. Inicio usa `/`; la página 404 y los fragmentos de navegación quedan fuera.
- Robots permite rastrear el portal y señala el sitemap. La página 404 lleva `noindex, follow`.
- Cada página tiene título, descripción y URL canónica propios, idioma es-MX, Open Graph y tarjetas para compartir.
- JSON-LD describe el sitio, el Dr. Tony Bustos como persona, las páginas, la ruta de navegación y los artículos. Solo se usan datos ya presentes en el portal. No se atribuyen autores de artículos, reseñas, fechas de publicación ni certificaciones no confirmadas.
- La trayectoria incluye sus 26 hitos en HTML inicial y sigue ofreciendo filtros al activar JavaScript. El catálogo de procedimientos también es HTML estático.
- CNAME, .nojekyll y una página 404 propia. El paquete de producción incluye estos archivos y excluye fuentes, herramientas y originales.
- Generación y validación automatizadas en cada empaquetado. El sitemap no inventa fechas lastmod ni prioridades.

## Intención de búsqueda por página

| Página | Enfoque |
| --- | --- |
| Inicio | Dr. Tony Bustos; Tony Bustos cirujano plástico; contacto y consulta |
| Perfil | Formación profesional del Dr. Tony Bustos; formación internacional |
| Trayectoria | Trayectoria y experiencia del Dr. Tony Bustos |
| Procedimientos | Procedimientos del Dr. Tony Bustos; cirugía plástica, rinoplastia, mamoplastia, liposucción |
| Artículos | Primera consulta, formación y credenciales, acompañamiento |

Los textos usan el nombre y la especialidad con naturalidad. No se añadieron repeticiones ocultas de palabras clave ni promesas de posicionamiento. Los tratamientos se agrupan en el catálogo actual; no se crearon páginas duplicadas para cada término.

## Mantener el SEO

Editar `seo.config.cjs` para cambiar títulos, descripciones o añadir páginas. Ejecutar desde la raíz:

```powershell
node scripts/build-procedures.cjs
node scripts/build-seo.cjs
node scripts/verify-site.cjs
node scripts/verify-seo.cjs
node scripts/build-production.cjs
```

`build-production.cjs` regenera y valida el SEO antes de copiar a `dist/`. No editar manualmente los bloques delimitados SEO en HTML: se regeneran desde la configuración. Las fechas editoriales de los artículos se podrán incorporar cuando estén confirmadas.

## Activar GitHub Pages

El workflow `.github/workflows/pages.yml` quedó preparado para ejecución manual. No se ejecutó, no se hizo push y no se modificaron DNS ni los ajustes del repositorio durante esta tarea.

1. Subir los cambios al repositorio. En Settings → Pages, seleccionar GitHub Actions como origen de publicación.
2. Configurar `drtonybustos.com.mx` en Custom domain. Con un workflow de Actions, el archivo CNAME no sustituye esta configuración.
3. Configurar el dominio raíz con los registros de GitHub Pages. Para el repositorio actual de `qanvastudio`, el subdominio `www` debe apuntar mediante CNAME a `qanvastudio.github.io`, sin el nombre del repositorio. Consultar los valores vigentes y verificar el dominio siguiendo la [guía de dominio personalizado de GitHub](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site).
4. Cuando GitHub emita el certificado, activar Enforce HTTPS en Settings → Pages. [Guía de HTTPS](https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https).
5. Ejecutar Actions → Publish portal to GitHub Pages → Run workflow desde la rama aprobada para producción. Primero valida el sitio y después publica exclusivamente `dist/`.

GitHub Pages administra las redirecciones HTTP/HTTPS y de dominio configuradas en su plataforma; no interpreta archivos .htaccess. El inicio conserva su canonical a `/` para consolidar la variante `/index.html`. No se añadieron redirecciones mediante JavaScript.

## Comprobar después de publicar

- Las ocho URL del sitemap deben responder 200 por HTTPS y servir la versión nueva.
- `/sitemap.xml` y `/robots.txt` deben responder 200 y contener el dominio definitivo.
- Una URL inexistente debe responder 404 real mostrando la página personalizada, sin redirigir al inicio.
- Confirmar que HTTP y www redirigen al dominio HTTPS sin www y que las rutas permanecen correctas.
- Verificar la propiedad de dominio en Google Search Console mediante el TXT que Google proporcione. Enviar `https://drtonybustos.com.mx/sitemap.xml` e inspeccionar Inicio, Perfil y Procedimientos.
- Validar datos estructurados con Schema Markup Validator y la prueba de resultados enriquecidos de Google. Un tipo válido no garantiza que Google muestre un resultado enriquecido.
- Medir móvil con PageSpeed Insights y revisar Core Web Vitals cuando existan datos de tráfico real.

Estas comprobaciones dependen del sitio publicado, DNS y acceso a Search Console. No se han confirmado en esta entrega. Los tests locales validan archivos, referencias y consistencia; no certifican indexación ni posiciones de búsqueda.

Referencias: [sitemaps de Google](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap), [URL canónicas](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls), [workflows de GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).
