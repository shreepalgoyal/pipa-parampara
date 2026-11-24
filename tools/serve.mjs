/*
 * Local preview that behaves like Cloudflare Pages:
 *
 *   /pipaji   → pipaji.html
 *   /         → index.html
 *   /nope     → 404.html, with a 404 status
 *
 *   node tools/serve.mjs [port]        # default 4321
 *
 * Python's http.server does not do the extensionless lookup that Pages does, so
 * every internal link in the built site would 404 locally and `verify` would be
 * checking behaviour that production does not have. Nothing here ships.
 */
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const port = Number(process.argv[2] || process.env.PORT || 4321);

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.pdf': 'application/pdf',
  '.ico': 'image/x-icon',
};

function resolve(urlPath) {
  const clean = decodeURIComponent(urlPath.split('?')[0].split('#')[0]);
  const base = path.resolve(root, '.' + clean);
  if (!base.startsWith(root)) return null;
  for (const candidate of [base, `${base}.html`, path.join(base, 'index.html')]) {
    try {
      if (fs.statSync(candidate).isFile()) return candidate;
    } catch { /* not there; try the next shape */ }
  }
  return null;
}

http.createServer((req, res) => {
  const file = resolve(req.url || '/');
  if (!file) {
    let body = 'Not found';
    try { body = fs.readFileSync(path.join(root, '404.html')); } catch { /* keep the plain text */ }
    res.writeHead(404, { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' });
    res.end(req.method === 'HEAD' ? undefined : body);
    return;
  }
  const { size } = fs.statSync(file);
  res.writeHead(200, {
    'content-type': TYPES[path.extname(file)] || 'application/octet-stream',
    'content-length': size,
    'cache-control': 'no-store',
  });
  if (req.method === 'HEAD') res.end();
  else fs.createReadStream(file).pipe(res);
}).listen(port, () => {
  console.log(`  serving dist/ on http://localhost:${port} — extensionless, like Pages`);
});
