/*
 * Quality audit for the built site — accessibility, weight and rendering.
 *
 *   node build.mjs
 *   (cd dist && python3 -m http.server 4321)
 *   node tools/audit.mjs               # human-readable report
 *   node tools/audit.mjs --json        # machine-readable
 *   node tools/audit.mjs --throttle    # 4x CPU + slow 3G, for Core Web Vitals
 *
 * Unlike verify.mjs this does not fail the build; it reports numbers and
 * specific elements so a human can decide. Requires Google Chrome and
 * playwright-core (already the only dev dependency).
 */
import { chromium } from 'playwright-core';

const BASE = process.env.BASE || 'http://localhost:4321';
const JSON_OUT = process.argv.includes('--json');
const THROTTLE = process.argv.includes('--throttle');

const PAGES = (process.env.PAGES ? process.env.PAGES.split(',') : [
  'index.html', 'pipaji.html', 'vani.html', 'samdari.html', 'panch-patti.html',
  'tirth.html', 'itihas.html', 'pehchan.html', 'sangathan.html', 'pustakalaya.html',
  'samachar.html', 'yogdan.html', 'prashnottari.html', 'granth.html', 'khoj.html',
  'en.html', '404.html',
]);

const browser = await chromium.launch({ channel: 'chrome', headless: true });
const report = { pages: [], totals: {} };

/* ---------- helpers that run inside the page ---------- */

const PAGE_PROBE = () => {
  const out = {};

  /* --- layout shift + paint timings --- */
  out.fcp = 0;
  out.lcp = 0;
  out.cls = 0;
  try {
    const p = performance.getEntriesByType('paint').find((e) => e.name === 'first-contentful-paint');
    if (p) out.fcp = Math.round(p.startTime);
    const l = performance.getEntriesByType('largest-contentful-paint');
    if (l.length) out.lcp = Math.round(l[l.length - 1].startTime);
  } catch (e) {}

  /* --- colour contrast, WCAG 2.2 AA --- */
  function parseColor(c) {
    const m = String(c).match(/rgba?\(([^)]+)\)/);
    if (!m) return null;
    const p = m[1].split(/[\s,/]+/).filter(Boolean).map(Number);
    if (p.length < 3) return null;
    return { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 };
  }
  function lum({ r, g, b }) {
    const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
  }
  function blend(fg, bg) {
    const a = fg.a;
    return { r: fg.r * a + bg.r * (1 - a), g: fg.g * a + bg.g * (1 - a), b: fg.b * a + bg.b * (1 - a), a: 1 };
  }
  function bgOf(el) {
    let n = el;
    let acc = { r: 255, g: 255, b: 255, a: 1 };
    const stack = [];
    while (n && n.nodeType === 1) {
      const cs = getComputedStyle(n);
      if (cs.backgroundImage !== 'none') return null;
      const c = parseColor(cs.backgroundColor);
      if (c && c.a > 0) stack.push(c);
      if (c && c.a >= 1) break;
      n = n.parentElement;
    }
    for (let i = stack.length - 1; i >= 0; i--) acc = blend(stack[i], acc);
    return acc;
  }
  const contrastFails = [];
  const seen = new Set();
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let node;
  while ((node = walker.nextNode())) {
    const el = node.parentElement;
    if (!el || seen.has(el)) continue;
    seen.add(el);
    const text = (node.textContent || '').trim();
    if (text.length < 2) continue;
    const cs = getComputedStyle(el);
    if (cs.visibility === 'hidden' || cs.display === 'none' || +cs.opacity === 0) continue;
    const rect = el.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) continue;
    const fg = parseColor(cs.color);
    const bg = bgOf(el);
    if (!fg || !bg) continue;
    const fgc = blend(fg, bg);
    const L1 = lum(fgc), L2 = lum(bg);
    const ratio = (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
    const size = parseFloat(cs.fontSize);
    const bold = parseInt(cs.fontWeight, 10) >= 700;
    const large = size >= 24 || (bold && size >= 18.66);
    const min = large ? 3 : 4.5;
    if (ratio < min - 0.05) {
      contrastFails.push({
        text: text.slice(0, 48),
        ratio: Math.round(ratio * 100) / 100,
        need: min,
        size: Math.round(size),
        sel: el.tagName.toLowerCase() + (el.className ? '.' + String(el.className).split(' ')[1] || '.' + String(el.className).split(' ')[0] : ''),
        cls: String(el.className || ''),
        color: cs.color,
        bg: `rgb(${Math.round(bg.r)}, ${Math.round(bg.g)}, ${Math.round(bg.b)})`,
      });
    }
  }
  out.contrast = contrastFails.slice(0, 12);
  out.contrastCount = contrastFails.length;

  /* --- tap targets (WCAG 2.5.8: 24x24 minimum) --- */
  const small = [];
  document.querySelectorAll('a[href], button, [role="button"], input:not([type="hidden"]), select, summary').forEach((el) => {
    const cs = getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden') return;
    const r = el.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) return;
    const inlineInText = el.tagName === 'A' && el.closest('p, li, dd, td, figcaption, .cite__text, .src-list dd');
    if (!inlineInText && (r.width < 24 || r.height < 24)) {
      small.push({
        sel: el.tagName.toLowerCase() + (el.className ? '.' + String(el.className).split(' ')[0] : ''),
        text: (el.textContent || el.getAttribute('aria-label') || '').trim().slice(0, 30),
        w: Math.round(r.width), h: Math.round(r.height),
      });
    }
  });
  out.smallTargets = small.slice(0, 8);
  out.smallTargetCount = small.length;

  /* --- heading outline --- */
  const hs = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')]
    .filter((h) => h.getBoundingClientRect().height > 0)
    .map((h) => ({ l: +h.tagName[1], t: (h.textContent || '').trim().slice(0, 34) }));
  out.h1 = hs.filter((h) => h.l === 1).length;
  out.headingSkips = [];
  let prev = 0;
  hs.forEach((h) => { if (prev && h.l > prev + 1) out.headingSkips.push(prev + '→' + h.l + ' ' + h.t); prev = h.l; });

  /* --- English runs without lang="en" (screen readers mispronounce) --- */
  let latin = 0;
  const langLess = [];
  const w2 = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const baseLang = document.documentElement.lang || 'hi';
  let n2;
  while ((n2 = w2.nextNode())) {
    const t = (n2.textContent || '').trim();
    if (!/[A-Za-z]{4,}/.test(t)) continue;
    const host = n2.parentElement;
    if (!host) continue;
    const langHost = host.closest('[lang]');
    if (langHost && langHost !== document.documentElement) continue;
    if (host.closest('.notranslate, code, pre, .mera, table, script, style, noscript, .num')) continue;
    latin++;
    if (langLess.length < 6) langLess.push(t.slice(0, 46));
  }
  out.latinRuns = latin;
  out.latinSample = langLess;
  out.baseLang = baseLang;

  /* --- images without intrinsic size (layout shift risk) --- */
  out.unsizedImages = [...document.images].filter((i) => !i.getAttribute('width') || !i.getAttribute('height')).length;

  /* --- DOM size --- */
  out.nodes = document.querySelectorAll('*').length;
  out.domHtmlKb = Math.round(document.documentElement.outerHTML.length / 1024);
  return out;
};

/* ---------- main loop ---------- */

for (const slug of PAGES) {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await ctx.newPage();

  if (THROTTLE) {
    const cdp = await ctx.newCDPSession(page);
    await cdp.send('Network.enable');
    await cdp.send('Network.emulateNetworkConditions', {
      offline: false, latency: 150, downloadThroughput: (1.6 * 1024 * 1024) / 8, uploadThroughput: (750 * 1024) / 8,
    });
    await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
  }

  const bytes = { total: 0, css: 0, js: 0, font: 0, img: 0 };
  page.on('response', async (res) => {
    try {
      const h = res.headers();
      const len = +(h['content-length'] || 0);
      const type = (h['content-type'] || '').split(';')[0];
      bytes.total += len;
      if (type === 'text/css') bytes.css += len;
      else if (type.includes('javascript')) bytes.js += len;
      else if (type.includes('font') || /\.woff2?$/.test(res.url())) bytes.font += len;
      else if (type.startsWith('image/')) bytes.img += len;
    } catch (e) {}
  });

  await page.addInitScript(() => {
    window.__lcp = 0;
    window.__cls = 0;
    try {
      new PerformanceObserver((l) => {
        const e = l.getEntries(); window.__lcp = Math.round(e[e.length - 1].startTime);
      }).observe({ type: 'largest-contentful-paint', buffered: true });
      new PerformanceObserver((l) => {
        l.getEntries().forEach((e) => { if (!e.hadRecentInput) window.__cls += e.value; });
      }).observe({ type: 'layout-shift', buffered: true });
    } catch (e) {}
  });
  await page.goto(`${BASE}/${slug}`, { waitUntil: 'load' });
  await page.waitForTimeout(THROTTLE ? 3500 : 900);

  const probe = await page.evaluate(PAGE_PROBE);

  /* layout shift needs a slightly later read */
  const cls = await page.evaluate(() => Math.round((window.__cls || 0) * 1000) / 1000);
  const lcp = await page.evaluate(() => window.__lcp || 0);
  probe.lcp = lcp;

  /* focus ring on the first three interactive elements */
  const focus = await page.evaluate(() => {
    const els = [...document.querySelectorAll('a[href], button, input, select')]
      .filter((e) => e.getBoundingClientRect().height > 0).slice(0, 6);
    const bad = [];
    els.forEach((el) => {
      el.focus({ preventScroll: true });
      const cs = getComputedStyle(el);
      const ring = (parseFloat(cs.outlineWidth) || 0) > 0 && cs.outlineStyle !== 'none';
      const shadow = cs.boxShadow && cs.boxShadow !== 'none';
      if (!ring && !shadow && el === document.activeElement) {
        bad.push(el.tagName.toLowerCase() + (el.className ? '.' + String(el.className).split(' ')[0] : ''));
      }
    });
    return bad;
  });

  report.pages.push({
    page: slug, ...probe, cls,
    bytes: { total: Math.round(bytes.total / 1024), css: Math.round(bytes.css / 1024), js: Math.round(bytes.js / 1024), font: Math.round(bytes.font / 1024) },
    noFocusRing: focus,
  });
  await ctx.close();
}

report.totals = {
  pages: report.pages.length,
  contrastFailures: report.pages.reduce((a, p) => a + p.contrastCount, 0),
  smallTargets: report.pages.reduce((a, p) => a + p.smallTargetCount, 0),
  headingSkips: report.pages.reduce((a, p) => a + p.headingSkips.length, 0),
  latinRuns: report.pages.reduce((a, p) => a + p.latinRuns, 0),
  maxDomNodes: Math.max(...report.pages.map((p) => p.nodes)),
  maxBytesKb: Math.max(...report.pages.map((p) => p.bytes.total)),
};

await browser.close();

/* ---------- output ---------- */

if (JSON_OUT) {
  console.log(JSON.stringify(report, null, 2));
} else {
  console.log('\nPage              bytes   css   js  font  nodes  h1  cls   contrast  taps  latin');
  console.log('-'.repeat(92));
  for (const p of report.pages) {
    console.log(
      p.page.padEnd(17),
      String(p.bytes.total).padStart(5),
      String(p.bytes.css).padStart(5),
      String(p.bytes.js).padStart(4),
      String(p.bytes.font).padStart(5),
      String(p.nodes).padStart(6),
      String(p.h1).padStart(3),
      String(p.cls).padStart(5),
      String(p.contrastCount).padStart(9),
      String(p.smallTargetCount).padStart(5),
      String(p.latinRuns).padStart(6)
    );
    if (p.fcp) console.log(`  paint: FCP ${p.fcp}ms · LCP ${p.lcp}ms`);
    p.contrast.slice(0, 6).forEach((c) => console.log(`  ✗ contrast ${c.ratio}:1 (need ${c.need}) ${c.sel} ${c.color} on ${c.bg} “${c.text}”`));
    p.smallTargets.forEach((s) => console.log(`  ✗ target ${s.w}×${s.h} ${s.sel} “${s.text}”`));
    p.headingSkips.slice(0, 3).forEach((h) => console.log(`  ✗ heading ${h}`));
    if (p.noFocusRing.length) console.log(`  ✗ no visible focus: ${p.noFocusRing.join(', ')}`);
    if (p.latinSample.length) console.log(`  · English runs without lang="en": ${p.latinSample.length} shown — “${p.latinSample[0]}”`);
  }
  console.log('-'.repeat(92));
  console.log(JSON.stringify(report.totals, null, 2));
  console.log('');
}
