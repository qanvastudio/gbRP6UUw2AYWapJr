// Regenerate the static catalog after editing procedimientos-data.js.
const fs = require('node:fs');
const categories = require('../procedimientos-data.js');
const featured = require('../procedimientos-featured.cjs');
const escape = text => text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('"', '&quot;');
const featuredCards = featured.map(({ id, title, image, mobileImage, mobileWidth, video, description, width = 640, height = 640 }, index) => {
  const message = `Hola, estoy comunicándome con el Dr. Tony Bustos, acerca del procedimiento ${title}.`;
  const whatsapp = `https://wa.me/5215579468246?text=${encodeURIComponent(message)}`;
  const mobileSources = mobileWidth < width ? mobileImage+' 1x, '+image+' '+(width/mobileWidth)+'x' : mobileImage;
  return `<details class="featured-procedure" name="featured-procedures" id="${id}">
  <summary><span class="featured-photo"><picture><source media="(max-width: 600px)" srcset="${mobileSources}"><img src="${image}" alt="" width="${width}" height="${height}" loading="${index === 0 ? 'eager' : 'lazy'}" decoding="async"${index === 0 ? ' fetchpriority="high"' : ''}></picture>${video ? `<video class="featured-video" data-desktop="${video.desktop}" data-mobile="${video.mobile}" muted loop playsinline preload="none" aria-hidden="true"></video>` : ''}</span><span class="featured-caption"><h3>${escape(title)}</h3></span><span class="featured-toggle" aria-hidden="true"></span></summary>
  <div class="featured-info"><p>${escape(description)}</p><a class="featured-whatsapp" href="${escape(whatsapp)}" target="_blank" rel="noopener noreferrer" aria-label="Consultar por WhatsApp sobre ${escape(title)} (abre una pestaña nueva)">Consultar por WhatsApp <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14"/></svg></a></div>
  </details>`;
}).join('\n');
const filters = '<button type="button" class="category-filter" data-category="all" aria-pressed="true">Todos</button>' + categories.map(([key, label]) => `<button type="button" class="category-filter" data-category="${key}" aria-pressed="false"><span class="category-dot" aria-hidden="true"></span>${label}</button>`).join('');
const sections = categories.map(([key, label, items]) => `<section class="procedure-group" data-category="${key}" aria-labelledby="heading-${key}"><div class="procedure-group-heading"><h2 id="heading-${key}">${label}</h2><span class="group-count">${items.length} procedimientos</span></div><div class="procedure-grid">${items.map(([name, description], i) => `<article class="procedure-item"><span class="orb-tile" aria-hidden="true"><span class="procedure-orb" style="--delay:-${(i * 1.3).toFixed(1)}s"></span></span><div><h3>${escape(name)}</h3><p>${escape(description)}</p></div></article>`).join('\n')}</div></section>`).join('\n');
const content = `<header class="page-heading"><p class="eyebrow">UN CAMINO PENSADO PARA TI</p><h1>Procedimientos</h1></header>
<section class="featured-procedures" aria-label="Procedimientos principales"><div class="featured-grid">${featuredCards}</div></section>
<section class="procedure-catalog" aria-label="Catálogo de procedimientos">
<div class="catalog-tools" hidden>
<div class="catalog-search-row"><label class="procedure-search"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4 4"/></svg><span class="sr-only">Buscar procedimientos</span><input id="procedure-search" type="search" placeholder="Busca el procedimiento que tienes en mente…" autocomplete="off"></label></div>
<div class="category-filters" role="group" aria-label="Filtrar por categoría">${filters}</div>
<div class="catalog-status"><p id="procedure-status" role="status" aria-live="polite" aria-atomic="true"></p><button id="clear-filters" type="button" hidden>Limpiar filtros <span aria-hidden="true">×</span></button></div>
</div>
<div id="procedure-groups">${sections}</div>
<div class="catalog-empty" hidden><h2>No encontramos ese procedimiento</h2><p>Prueba con otro nombre o explora todas las categorías.</p><button type="button" id="reset-search">Ver todos los procedimientos</button></div>
</section>
<aside class="procedure-consult"><div><p class="eyebrow">HABLEMOS DE TI</p><h2>Todo comienza con una conversación.</h2><p>Cuéntanos qué tienes en mente y resolvamos tus dudas en tu primera consulta.</p></div><a class="credential-button" href="https://wa.me/5215579468246" target="_blank" rel="noopener noreferrer">Agendar Consulta <span aria-hidden="true">↗</span></a></aside>
`;
const path = require('node:path').join(__dirname, '../procedimientos.html');
let html = fs.readFileSync(path, 'utf8');
if (!html.includes('href="procedimientos.css"')) html = html.replace('<link rel="stylesheet" href="pages.css">', '<link rel="stylesheet" href="pages.css">\n<link rel="stylesheet" href="procedimientos.css">\n<script src="procedimientos.js" defer></script>');
html = html.replace('<body class="subpage">', '<body class="subpage procedures-page">').replace('content="Procedimientos · Dr. Tony Bustos"', 'content="Explora las opciones de cirugía facial, mamaria, corporal, reconstructiva, íntima y procedimientos no quirúrgicos del Dr. Tony Bustos."');
html = html.slice(0, html.indexOf('<header class="page-heading">')) + content + html.slice(html.indexOf('</main>'));
fs.writeFileSync(path, html.replace(/^[ \t]+$/gm, ''));
console.log(`Catalog generated: ${categories.length} categories, ${categories.reduce((sum, c) => sum + c[2].length, 0)} items.`);
