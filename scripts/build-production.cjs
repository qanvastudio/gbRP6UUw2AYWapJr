const fs = require('node:fs');
const path = require('node:path');
const { root, siteFiles } = require('./site-files.cjs');
const output = path.join(root, 'dist');
const files = siteFiles();
fs.mkdirSync(output, { recursive: true });
// Reject stale outputs instead of silently deploying resources from an earlier build.
function scan(dir, relative = '') {
  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    if (item.isSymbolicLink()) throw Error('Symlinks are not supported in dist');
    const name = relative + item.name;
    if (item.isDirectory()) scan(path.join(dir, item.name), name+'/');
    else if (!files.includes(name)) throw Error(`Stale deployment file: dist/${name}. Remove it before building.`);
  }
}
scan(output);
for (const file of files) {
  const target = path.join(output, file);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.copyFileSync(path.join(root, file), target);
}
console.log(`Built dist/: ${files.length} public files, ${files.reduce((sum, f) => sum + fs.statSync(path.join(root,f)).size, 0)} bytes. Sources, scripts and Git metadata excluded.`);
