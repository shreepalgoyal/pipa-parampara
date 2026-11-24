/*
 * Smoke test for the built site.
 *
 *   node build.mjs
 *   (cd dist && python3 -m http.server 4321)
 *   node tools/verify.mjs            # defaults to http://localhost:4321
 *   node tools/verify.mjs --shots    # also write screenshots to /tmp/pipashots
 *
 * Requires Google Chrome installed; `npm i -D playwright-core` (the only
 * dev dependency in this repo). Nothing here runs in production.
 */
import { chromium } from 'playwright-core';

const BASE = process.env.BASE || 'http://localhost:4321';
const SHOTS = process.argv.includes('--shots');
const SHOT_DIR = '/tmp/pipashots';

const PAGES = [
  'index.html', 'pipaji.html', 'vani.html', 'samdari.html', 'panch-patti.html',
  'tirth.html', 'itihas.html', 'pehchan.html', 'sangathan.html', 'pustakalaya.html',
  'samachar.html', 'yogdan.html', 'prashnottari.html', 'granth.html', 'khoj.html',
  'adhikar.html', 'en.html',
];

const problems = [];
const note = (s) => problems.push(s);
const browser = await chromium.launch({ channel: 'chrome', headless: true });

/* Every page: console, network, overflow, broken internal links, duplicate ids. */
for (const slug of PAGES) {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage();
  page.on('console', (m) => { if (m.type() === 'error') note(`${slug}: console ${m.text()}`); });
  page.on('pageerror', (e) => note(`${slug}: pageerror ${e.message}`));
  page.on('requestfailed', (r) => note(`${slug}: failed ${r.url()} ${r.failure()?.errorText}`));

  const res = await page.goto(`${BASE}/${slug}`, { waitUntil: 'networkidle' });
  if (!res || !res.ok()) note(`${slug}: HTTP ${res && res.status()}`);

  const report = await page.evaluate(async () => {
    const de = document.documentElement;
    const ids = [...document.querySelectorAll('[id]')].map((e) => e.id);
    const dupes = [...new Set(ids.filter((id, i) => ids.indexOf(id) !== i))];
    const broken = [];
    for (const a of document.querySelectorAll('a[href]')) {
      const href = a.getAttribute('href');
      if (!href || /^(https?:|mailto:|tel:|#)/.test(href)) continue;
      const u = new URL(href, location.href);
      if (u.origin !== location.origin) continue;
      const r = await fetch(u.href, { method: 'HEAD' }).catch(() => null);
      if (!r || !r.ok) broken.push(href);
    }
    /* Markup that leaked into visible text. A stray quote in one tag makes the
       HTML tokenizer give up and emit the whole tag as a text node, which no
       other check here notices: the page still renders, links still resolve,
       and the reader just sees `a class="brand" href="./"`. */
    const leaks = [];
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    for (let n = walker.nextNode(); n; n = walker.nextNode()) {
      const t = n.nodeValue;
      if (!t || !/\b(class|href|src|id)="/.test(t)) continue;
      if (n.parentElement && n.parentElement.closest('pre,code,kbd,samp,script,style,textarea,noscript')) continue;
      leaks.push(t.replace(/\s+/g, ' ').trim().slice(0, 80));
    }
    return {
      overflow: de.scrollWidth - de.clientWidth,
      dupes,
      broken,
      leaks,
      title: document.title,
      h1: document.querySelectorAll('h1').length,
      lang: de.lang,
      canonical: !!document.querySelector('link[rel=canonical]'),
      jsonld: !!document.querySelector('script[type="application/ld+json"]'),
    };
  });

  if (report.overflow > 0) note(`${slug}: overflow ${report.overflow}px`);
  if (report.dupes.length) note(`${slug}: duplicate ids ${report.dupes.slice(0, 5).join(', ')}`);
  if (report.broken.length) note(`${slug}: broken links ${report.broken.slice(0, 5).join(', ')}`);
  if (report.leaks.length) note(`${slug}: markup in text — ${report.leaks.slice(0, 3).join(' | ')}`);
  if (!report.title) note(`${slug}: empty <title>`);
  if (report.h1 !== 1) note(`${slug}: ${report.h1} <h1> elements`);
  if (!report.lang) note(`${slug}: missing <html lang>`);
  if (!report.canonical) note(`${slug}: missing canonical`);
  if (!report.jsonld) note(`${slug}: missing JSON-LD`);

  await ctx.close();
}

/* Narrow viewports must not scroll sideways. */
for (const width of [320, 390, 768, 1180]) {
  for (const slug of ['index.html', 'granth.html', 'khoj.html', 'panch-patti.html', 'vani.html', 'samdari.html']) {
    const ctx = await browser.newContext({ viewport: { width, height: 860 } });
    const page = await ctx.newPage();
    await page.goto(`${BASE}/${slug}`, { waitUntil: 'networkidle' });
    const over = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    if (over > 0) note(`${slug} @${width}: overflow ${over}px`);
    await ctx.close();
  }
}

/* Search: `/` opens, ranks, Enter navigates. */
{
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage();
  page.on('pageerror', (e) => note(`search: ${e.message}`));
  await page.goto(`${BASE}/index.html`, { waitUntil: 'networkidle' });
  await page.keyboard.press('/');
  await page.waitForTimeout(250);
  if (!(await page.evaluate(() => document.getElementById('search-dialog')?.open))) {
    note('search: dialog did not open on /');
  }
  await page.fill('#site-search', 'समदड़ी');
  await page.waitForTimeout(800);
  if (!(await page.locator('#search-results a').count())) note('search: no results for समदड़ी');
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('Enter');
  await page.waitForTimeout(700);
  if (!/samdari|#/.test(page.url())) note(`search: Enter went to ${page.url()}`);
  if (SHOTS) await page.screenshot({ path: `${SHOT_DIR}/search-dialog.png` });
  await ctx.close();
}

/* Verse filter and search — the Devanagari normaliser regresses easily. */
{
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage();
  page.on('pageerror', (e) => note(`vani: ${e.message}`));
  await page.goto(`${BASE}/vani.html`, { waitUntil: 'networkidle' });
  const before = await page.locator('.vcard:not([hidden])').count();
  await page.click('.filters [data-theme="अहिंसा"]');
  await page.waitForTimeout(250);
  const after = await page.locator('.vcard:not([hidden])').count();
  if (!(after > 0 && after < before)) note(`vani: theme filter ${before} → ${after}`);
  await page.click('.filters [data-theme="अहिंसा"]');
  await page.fill('#verse-q', 'गुरु');
  await page.waitForTimeout(250);
  if (!(await page.locator('.vcard:not([hidden])').count())) note('vani: search for गुरु found nothing');
  await ctx.close();
}

/* Village directory: row count, patti filter, stable anchors. */
{
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/panch-patti.html`, { waitUntil: 'networkidle' });
  const all = await page.locator('#village-body tr:not([hidden])').count();
  if (all !== 204) note(`villages: expected 204 rows, got ${all}`);
  await page.selectOption('#village-patti', 'jalori');
  await page.waitForTimeout(200);
  const jalori = await page.locator('#village-body tr:not([hidden])').count();
  if (jalori !== 41) note(`villages: jalori expected 41, got ${jalori}`);
  const anchors = await page.evaluate(
    () => !!document.getElementById('ganv-1') && !!document.getElementById('ganv-204'),
  );
  if (!anchors) note('villages: row anchors missing');
  await ctx.close();
}

/* Preferences persist across a reload. */
{
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/pipaji.html`, { waitUntil: 'networkidle' });
  await page.click('[data-open-prefs]');
  await page.waitForTimeout(200);
  await page.check('input[name="theme"][value="night"]');
  await page.check('input[name="size"][value="l"]');
  if (SHOTS) await page.screenshot({ path: `${SHOT_DIR}/prefs.png` });
  await page.click('[data-close-prefs]');
  await page.reload({ waitUntil: 'networkidle' });
  const theme = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
  if (theme !== 'night') note(`prefs: theme not persisted (${theme})`);
  if (SHOTS) await page.screenshot({ path: `${SHOT_DIR}/night.png` });
  await ctx.close();
}

/* Print styles drop the book chrome. */
{
  const ctx = await browser.newContext({ viewport: { width: 1000, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/granth.html`, { waitUntil: 'networkidle' });
  await page.emulateMedia({ media: 'print' });
  if (!(await page.locator('.book-toc').isHidden())) note('print: table of contents still visible');
  await ctx.close();
}

/* The archive must still read with JavaScript disabled. */
{
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 }, javaScriptEnabled: false });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/granth.html`, { waitUntil: 'domcontentloaded' });
  const text = await page.locator('body').innerText();
  if (!text.includes('इस ग्रंथ का तरीक़ा')) note('nojs: book text missing');
  if (!text.includes('इस ग्रंथ के स्रोत')) note('nojs: sources missing');
  await ctx.close();
}

if (SHOTS) {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 860 }, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  for (const slug of ['index.html', 'granth.html', 'khoj.html']) {
    await page.goto(`${BASE}/${slug}`, { waitUntil: 'networkidle' });
    await page.screenshot({ path: `${SHOT_DIR}/${slug.replace('.html', '')}-390.png` });
  }
  await ctx.close();
}

await browser.close();
console.log(problems.length ? `\n${problems.length} problem(s):\n${problems.join('\n')}` : 'ALL CLEAN');
process.exitCode = problems.length ? 1 : 0;
