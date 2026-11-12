const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
function siteFiles() {
  const files = new Set(fs.readdirSync(root).filter(name => name.endsWith('.html')));
  for (const file of ['sitemap.xml', 'robots.txt', 'CNAME', '.nojekyll']) {
    if (!fs.existsSync(path.join(root, file))) throw Error(`Missing deployment file: ${file}. Run scripts/build-seo.cjs.`);
    files.add(file);
  }
  const queue = [...files];
  for (const file of queue) {
    if (!/\.(html|css|js)$/.test(file)) continue;
    const content = fs.readFileSync(path.join(root, file), 'utf8');
    const refs = [
      ...[...content.matchAll(/(?:src|href|data-src|data-mobile|data-desktop)="([^"#]+)"/g)].map(m => m[1]),
      ...[...content.matchAll(/srcset="([^"]+)"/g)].flatMap(m => m[1].split(',').map(s => s.trim().split(/\s+/)[0])),
      ...[...content.matchAll(/url\(\s*['"]?([^'"\s)]+)['"]?\s*\)/g)].map(m => m[1]),
      ...[...content.matchAll(/['"](assets\/[\w./-]+(?:\?[^'"\s]*)?)['"]/g)].map(m => m[1])
    ];
    for (const ref of refs) {
      if (/^(?:[a-z]+:|#|\/\/)/i.test(ref)) continue;
      const local = path.posix.normalize(path.posix.join(path.posix.dirname(file), ref.split(/[?#]/)[0]));
      if (local.startsWith('../') || !fs.existsSync(path.join(root, local))) throw Error(`${file}: missing or unsafe resource ${ref}`);
      if (!files.has(local)) { files.add(local); queue.push(local); }
    }
  }
  return [...files].sort();
}
module.exports = { root, siteFiles };
