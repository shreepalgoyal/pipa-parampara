/*
 * Share-card renderer.
 *
 * Builds one 1200×630 social card per page and writes them to
 * assets/og/<slug>.png, so `build.mjs` can stay dependency-free and the
 * PNGs can be committed alongside the site.
 *
 *   npm run serve          # dist on :4321, required
 *   node tools/og.mjs      # or: npm run og
 *
 * Runs after `npm run build` because it reads the built HTML for each page's
 * real <h1>, eyebrow and description. Needs Google Chrome + playwright-core.
 */
import { chromium } from 'playwright-core';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const dist = path.join(root, 'dist');
const outDir = path.join(root, 'assets', 'og');
const BASE = process.env.BASE || 'http://localhost:4321';

const W = 1200;
const H = 630;

const decode = (s) => String(s)
  .replace(/&nbsp;/g, ' ')
  .replace(/&amp;/g, '&')
  .replace(/&lt;/g, '<')
  .replace(/&gt;/g, '>')
  .replace(/&quot;/g, '"')
  .replace(/&#39;/g, "'")
  .replace(/&#x([0-9a-f]+);/gi, (m, h) => String.fromCodePoint(parseInt(h, 16)))
  .replace(/&#(\d+);/g, (m, d) => String.fromCodePoint(+d));

/* Numerals: the page emits <span class="num-l">204</span><span class="num-d">२०४</span>.
   Social cards use Western digits, so drop the Devanagari half first. */
const plain = (html) => decode(
  String(html)
    .replace(/<span class="num-d">[\s\S]*?<\/span>/g, '')
    .replace(/<[^>]+>/g, ' ')
).replace(/\s+/g, ' ').trim();

function card(slug) {
  const file = path.join(dist, slug);
  const html = fs.readFileSync(file, 'utf8');
  const h1 = (html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1] || '';
  const eyebrow = (html.match(/<p class="eyebrow">([\s\S]*?)<\/p>/) || [])[1] || '';
  const desc = (html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '';
  const lang = (html.match(/<html[^>]*\blang="([^"]+)"/) || [])[1] || 'hi';
  const crumbs = [...html.matchAll(/<nav class="crumbs"[\s\S]*?<\/nav>/g)].map((m) => m[0])[0] || '';
  const spans = [...crumbs.matchAll(/<span>([\s\S]*?)<\/span>/g)].map((m) => plain(m[1]));
  let label = spans.length ? spans[spans.length - 1] : '';
  if (!label || label === '/' || label === 'पीपा परंपरा') label = lang === 'en' ? 'ENGLISH' : 'मुखपृष्ठ';

  return {
    slug,
    lang,
    label,
    eyebrow: plain(eyebrow),
    title: plain(h1) || 'पीपा परंपरा',
    desc: plain(desc),
  };
}

const template = (c) => `<!doctype html>
<html lang="hi">
<head>
<meta charset="utf-8">
<link rel="stylesheet" href="/assets/fonts.css">
<style>
  :root{
    --paper:#f8f3e8; --ink:#1a1613; --ink-2:#3b332c; --ink-3:#665a50;
    --madder:#97382a; --gold:#a67c2e; --gold-lt:#c9a45c;
  }
  *{box-sizing:border-box;margin:0;padding:0}
  html,body{width:${W}px;height:${H}px;overflow:hidden}
  body{
    background:var(--paper); color:var(--ink);
    font-family:"Noto Sans Devanagari",system-ui,sans-serif;
    position:relative;
  }
  /* quiet paper wash + vignette, no images */
  body::before{
    content:"";position:absolute;inset:0;
    background:
      radial-gradient(120% 90% at 8% 0%, rgba(151,56,42,.055), transparent 55%),
      radial-gradient(90% 80% at 100% 100%, rgba(166,124,46,.07), transparent 60%);
  }
  .frame{position:absolute;inset:34px;border:1px solid rgba(166,124,46,.42)}
  .frame::after{content:"";position:absolute;inset:7px;border:1px solid rgba(166,124,46,.18)}
  .inner{position:absolute;inset:34px;padding:46px 62px 44px;display:flex;flex-direction:column}

  header{display:flex;align-items:flex-start;justify-content:space-between;gap:24px}
  .brand{display:flex;align-items:center;gap:16px}
  .brand svg{width:52px;height:52px;flex:none}
  .brand__hi{font-family:"Tiro Devanagari Hindi",serif;font-size:31px;line-height:1;letter-spacing:.005em}
  .brand__en{display:block;font-size:10px;letter-spacing:.3em;color:var(--ink-3);margin-top:7px}
  .kicker{font-size:13px;letter-spacing:.18em;color:var(--madder);text-transform:uppercase;padding-top:8px;text-align:right}
  .rule{height:1px;background:linear-gradient(90deg,var(--gold-lt),rgba(201,164,92,.15));margin:26px 0 0}

  main{flex:1;display:flex;flex-direction:column;justify-content:center;padding:26px 0 8px}
  .eyebrow{font-size:15px;letter-spacing:.14em;color:var(--madder);margin-bottom:18px}
  h1{
    font-family:"Tiro Devanagari Hindi",serif;
    font-weight:400;font-size:74px;line-height:1.18;letter-spacing:-.005em;
    max-width:1000px;
  }
  .desc{margin-top:22px;font-size:21px;line-height:1.55;color:var(--ink-2);max-width:940px}

  footer{display:flex;align-items:flex-end;justify-content:space-between;gap:24px;padding-top:20px;border-top:1px solid rgba(26,22,19,.16)}
  .url{font-size:14px;letter-spacing:.08em;color:var(--ink-3)}
  .tag{font-size:13px;letter-spacing:.12em;color:var(--gold)}
  .tag::before{content:"";display:inline-block;width:22px;height:1px;background:var(--gold);vertical-align:middle;margin-right:10px}
</style>
</head>
<body>
<div class="frame"></div>
<div class="inner">
  <header>
    <div class="brand">
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <circle cx="32" cy="32" r="29" fill="none" stroke="#97382a" stroke-width="1.6"/>
        <circle cx="32" cy="32" r="24.5" fill="none" stroke="#a67c2e" stroke-width=".7" opacity=".7"/>
        <path d="M49 15 L23 41" stroke="#97382a" stroke-width="2.6" stroke-linecap="round"/>
        <ellipse cx="48.2" cy="15.8" rx="2.4" ry="4.8" transform="rotate(-45 48.2 15.8)" fill="none" stroke="#97382a" stroke-width="1.6"/>
        <path d="M46 13.5 C 34 5, 17 12, 15 26 C 13 38, 25 44, 31 37" fill="none" stroke="#a67c2e" stroke-width="1.4" opacity=".85"/>
      </svg>
      <div>
        <span class="brand__hi">पीपा परंपरा</span>
        <span class="brand__en">PIPA PARAMPARA</span>
      </div>
    </div>
    <div class="kicker">${c.label}</div>
  </header>
  <div class="rule"></div>
  <main>
    ${c.eyebrow ? `<p class="eyebrow">${c.eyebrow}</p>` : ''}
    <h1>${c.title}</h1>
    ${c.desc ? `<p class="desc">${c.desc}</p>` : ''}
  </main>
  <footer>
    <span class="url">pipaparampara.in</span>
    <span class="tag">${c.lang === 'en' ? 'Sourced, with citations' : 'स्रोतों के साथ'}</span>
  </footer>
</div>
<script>
  /* Shrink until the title fits three lines, then let CSS take over. */
  (async () => {
    if (document.fonts && document.fonts.ready) await document.fonts.ready;
    const t = document.querySelector('h1');
    let size = 74;
    while (t.scrollHeight > size * 1.22 * 3 && size > 42) {
      size -= 2;
      t.style.fontSize = size + 'px';
    }
    t.style.fontSize = size + 'px';
  })();
</script>
</body>
</html>`;

const slugs = fs.readdirSync(dist).filter((f) => f.endsWith('.html') && f !== '404.html');
fs.mkdirSync(outDir, { recursive: true });
const staging = path.join(dist, '_og');
fs.rmSync(staging, { recursive: true, force: true });
fs.mkdirSync(staging, { recursive: true });

const browser = await chromium.launch({ channel: 'chrome', headless: true });
const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });

for (const slug of slugs) {
  const c = card(slug);
  const name = slug.replace(/\.html$/, '');
  const tmp = path.join(staging, `${name}.html`);
  fs.writeFileSync(tmp, template(c));
  await page.goto(`${BASE}/_og/${name}.html`, { waitUntil: 'networkidle' });
  await page.evaluate(() => (document.fonts ? document.fonts.ready : null));
  await page.waitForTimeout(120);
  const png = path.join(outDir, `${name}.png`);
  await page.screenshot({ path: png, clip: { x: 0, y: 0, width: W, height: H } });
  const kb = Math.round(fs.statSync(png).size / 1024);
  console.log(`${String(kb).padStart(4)} kB  assets/og/${name}.png  — ${c.title}`);
}

await browser.close();
fs.rmSync(staging, { recursive: true, force: true });
console.log(`\n${slugs.length} cards · ${Math.round(fs.readdirSync(outDir).reduce((a, f) => a + fs.statSync(path.join(outDir, f)).size, 0) / 1024)} kB total · assets/og/`);
