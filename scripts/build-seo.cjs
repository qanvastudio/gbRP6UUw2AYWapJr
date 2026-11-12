const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const config = require('../seo.config.cjs');
const root = path.resolve(__dirname, '..');
const esc = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const origin = new URL(config.origin);
if (origin.protocol !== 'https:' || origin.origin !== config.origin) throw Error('SEO origin must be an HTTPS origin without a trailing slash or path');
const url = file => new URL(file === 'index.html' ? '/' : file, config.origin + '/').href;
const person = { '@type': 'Person', '@id': url('#doctor'), name: config.name, url: url('doctor.html'), jobTitle: 'Cirujano plástico, estético y reconstructivo', image: url(config.image), telephone: '+525579468246', workLocation: { '@type': 'Place', name: 'Hospital San Ángel Inn Universidad' } };
const website = { '@type': 'WebSite', '@id': url('#website'), url: url('index.html'), name: config.name, inLanguage: config.language, publisher: { '@id': person['@id'] } };
for (const [file, page] of Object.entries(config.pages)) {
  const filePath = path.join(root, file);
  let html = fs.readFileSync(filePath, 'utf8');
  html = html.replace(/\s*<!-- SEO:START -->[\s\S]*?<!-- SEO:END -->\s*/g, '\n');
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(page.title)}</title>`);
  html = html.replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${esc(page.description)}">`);
  html = html.replace(/<html lang="[^"]+">/, `<html lang="${config.language}">`);
  html = html.replace(/<link rel="icon"[^>]*>/, '<link rel="icon" type="image/png" sizes="192x192" href="assets/favicon.png">');
  const canonical = url(file), image = url(page.image || config.image);
  const webpage = { '@type': page.type === 'Article' ? 'WebPage' : page.type, '@id': canonical + '#webpage', url: canonical, name: page.title, description: page.description, inLanguage: config.language, isPartOf: { '@id': website['@id'] } };
  const graph = [website, webpage, person];
  if (!['Article', 'CollectionPage'].includes(page.type)) {
    webpage.about = { '@id': person['@id'] };
    if (file === 'doctor.html') webpage.mainEntity = { '@id': person['@id'] };
  }
  if (file !== 'index.html') {
    const crumbs = [{ '@type': 'ListItem', position: 1, name: 'Inicio', item: url('index.html') }, { '@type': 'ListItem', position: 2, name: page.label, item: canonical }];
    graph.push({ '@type': 'BreadcrumbList', '@id': canonical + '#breadcrumbs', itemListElement: crumbs });
    webpage.breadcrumb = { '@id': canonical + '#breadcrumbs' };
  }
  if (page.type === 'Article') {
    // Authorship and publication dates are deliberately omitted until confirmed.
    graph.push({ '@type': 'Article', '@id': canonical + '#article', headline: page.label, description: page.description, inLanguage: config.language, image, mainEntityOfPage: { '@id': webpage['@id'] } });
    webpage.mainEntity = { '@id': canonical + '#article' };
  }
  const tags = [
    `<meta name="robots" content="index, follow, max-image-preview:large">`,
    `<link rel="canonical" href="${canonical}">`,
    `<link rel="sitemap" type="application/xml" href="sitemap.xml">`,
    `<meta property="og:locale" content="${config.locale}">`,
    `<meta property="og:site_name" content="${esc(config.name)}">`,
    `<meta property="og:type" content="${page.type === 'Article' ? 'article' : 'website'}">`,
    `<meta property="og:title" content="${esc(page.title)}">`,
    `<meta property="og:description" content="${esc(page.description)}">`,
    `<meta property="og:url" content="${canonical}">`,
    `<meta property="og:image" content="${image}">`,
    `<meta property="og:image:alt" content="${esc(page.image ? page.label : 'Retrato del Dr. Tony Bustos')}">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${esc(page.title)}">`,
    `<meta name="twitter:description" content="${esc(page.description)}">`,
    `<meta name="twitter:image" content="${image}">`,
    `<meta name="twitter:image:alt" content="${esc(page.image ? page.label : 'Retrato del Dr. Tony Bustos')}">`,
    `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replaceAll('<', '\\u003c')}</script>`
  ];
  html = html.replace('</head>', `<!-- SEO:START -->\n${tags.join('\n')}\n<!-- SEO:END -->\n</head>`);
  if (file === 'trayectoria.html') {
    const context = { window: {} };
    vm.runInNewContext(fs.readFileSync(path.join(root, 'timeline-data.js'), 'utf8'), context);
    const groupYear = item => item.year === null || item.year < 2010 ? 2009 : item.year;
    const items = [...context.window.trajectoryItems].sort((a, b) => groupYear(b) - groupYear(a));
    const content = '<!-- TIMELINE:START --><ol class="trajectory-static">' + items.map(item => `<li><h2>${esc(item.title)}</h2><p>${esc(item.text)}</p></li>`).join('') + '</ol><!-- TIMELINE:END -->';
    if (html.includes('<!-- TIMELINE:START -->')) html = html.replace(/<!-- TIMELINE:START -->[\s\S]*?<!-- TIMELINE:END -->/, content);
    else html = html.replace('<div class="journey-panels" aria-label="Línea de tiempo de la trayectoria"></div>', `<div class="journey-panels" aria-label="Línea de tiempo de la trayectoria">${content}</div>`);
  }
  fs.writeFileSync(filePath, html);
}
// No fabricated modification dates: add lastmod only when editorial dates are tracked.
const sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + Object.keys(config.pages).map(file => `  <url><loc>${esc(url(file))}</loc></url>`).join('\n') + '\n</urlset>\n';
fs.writeFileSync(path.join(root, 'sitemap.xml'), sitemap);
fs.writeFileSync(path.join(root, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${url('sitemap.xml')}\n`);
fs.writeFileSync(path.join(root, 'CNAME'), origin.hostname + '\n');
fs.writeFileSync(path.join(root, '.nojekyll'), '');
fs.writeFileSync(path.join(root, '404.html'), `<!doctype html>
<html lang="es-MX"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex, follow"><meta name="description" content="Esta página no está disponible. Regresa al portal del Dr. Tony Bustos."><title>Página no encontrada | Dr. Tony Bustos</title><style>@font-face{font-family:Inter;src:url('${url('assets/inter-latin-variable.woff2')}') format('woff2');font-display:swap}body{margin:0;background:#f3f8ff;color:#012150;font-family:Inter,Arial,sans-serif}main{max-width:640px;margin:15vh auto;padding:24px}h1{font-size:clamp(30px,6vw,52px);letter-spacing:-.04em}p{line-height:1.6}a{color:inherit;display:inline-block;margin:12px 24px 0 0}</style></head><body><main><p>DR. TONY BUSTOS · 404</p><h1>No encontramos esta página.</h1><p>El enlace puede haber cambiado. Puedes volver al inicio o explorar los procedimientos.</p><nav aria-label="Continuar navegando"><a href="${url('index.html')}">Volver al inicio</a><a href="${url('procedimientos.html')}">Ver procedimientos</a></nav></main></body></html>\n`);
console.log(`SEO generated: ${Object.keys(config.pages).length} canonical pages, sitemap, robots, structured data and GitHub Pages files.`);
