import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { TITLES } from './src/layout.mjs';
import { VILLAGES, PATTIS, VERSES } from './src/data.mjs';
import { SITE, ORIGIN_PLACEHOLDER } from './site.config.mjs';

const root = path.dirname(fileURLToPath(import.meta.url));
const out = path.join(root, 'dist');
const SITE_URL = SITE.url;
const SITE_NAME = SITE.name;
const PLACEHOLDER_BARE = ORIGIN_PLACEHOLDER.replace(/^https?:\/\//, '');
const SITE_HOST = new URL(SITE_URL).host;

/* ---------- numerals ----------
   The archive is written in Devanagari numerals; readers get Western digits by
   default and can switch back. Every numeral run in the body is emitted as a
   pair of spans, so the switch is pure CSS and works before first paint.
   Devanagari is still what the build reads, indexes and prints. */
const DEV_DIGITS = '०१२३४५६७८९';
const LAT = (d) => String(DEV_DIGITS.indexOf(d));
const latinDigits = (s) => String(s).replace(/[०-९]/g, LAT);

const SKIP_IN = new Set(['script', 'style', 'svg', 'code', 'pre', 'kbd', 'samp', 'option', 'textarea']);
const VOID = new Set(['br', 'hr', 'img', 'input', 'meta', 'link', 'source', 'area', 'base', 'col', 'embed', 'param', 'track', 'wbr']);

function wrapRuns(text) {
  return text.replace(/[०-९]+(?:,[०-९]+)*/g, (run, offset) => {
    const before = text[offset - 1] || '';
    const after = text[offset + run.length] || '';
    /* Leave URLs, e-mail addresses and anything glued to Latin text alone. */
    if (/[A-Za-z0-9/@_]/.test(before) || /[A-Za-z0-9/@_]/.test(after)) return run;
    /* Long digit strings are phone numbers or account numbers — keep them dialable. */
    if ((run.match(/[०-९]/g) || []).length > 6) return run;
    const latin = latinDigits(run);
    return `<span class="num"><span class="num-l">${latin}</span><span class="num-d">${run}</span></span>`;
  });
}

function dualNumerals(html) {
  const re = /<!--[\s\S]*?-->|<([a-zA-Z][\w:-]*)((?:"[^"]*"|'[^']*'|[^>"'])*)>|<\/([a-zA-Z][\w:-]*)>|<![^>]*>|[^<]+/g;
  const stack = [];
  let out = '';
  let m;
  while ((m = re.exec(html))) {
    const tok = m[0];
    if (m[1]) {
      const name = m[1].toLowerCase();
      out += tok;
      if (!VOID.has(name) && !/\/\s*$/.test(m[2])) stack.push(name);
    } else if (m[3]) {
      const name = m[3].toLowerCase();
      out += tok;
      for (let i = stack.length - 1; i >= 0; i--) {
        if (stack[i] === name) { stack.length = i; break; }
      }
    } else if (tok[0] === '<') {
      out += tok;
    } else {
      out += stack.some((t) => SKIP_IN.has(t)) ? tok : wrapRuns(tok);
    }
  }
  return out;
}

/*
 * Western digits stay the canonical form in <head> and in every machine-readable
 * artefact: no duplicate text, no inflated snippets, no Devanagari phone numbers.
 */
function toWestern(raw) {
  const at = raw.indexOf('<body');
  return at === -1 ? latinDigits(raw) : latinDigits(raw.slice(0, at)) + raw.slice(at);
}

fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out, { recursive: true });

/* ---------- assets ---------- */
fs.cpSync(path.join(root, 'assets'), path.join(out, 'assets'), { recursive: true });

/* ---------- pages ---------- */
const pageFiles = [
  'home', 'pipaji', 'vani', 'samdari', 'panch-patti', 'tirth',
  'itihas', 'pehchan', 'sangathan', 'pustakalaya', 'samachar',
  'yogdan', 'prashnottari', 'granth', 'khoj', 'adhikar', 'en', 'notfound',
];

/* ---------- extensionless URLs ----------
   Cloudflare Pages serves /pipaji for pipaji.html and 308-redirects the .html
   form, so the extensionless path is the address that is actually served. The
   source keeps real file names — they are what this build writes and what the
   tools read — and every emitted internal URL is rewritten here, once, so the
   canonical tag, sitemap, JSON-LD, og:url, feed, llms.txt and the search index
   cannot drift apart on the question of what a page's address is. */
const RE = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const PAGE_NAMES = pageFiles
  .map((n) => (n === 'home' ? 'index.html' : n === 'notfound' ? '404.html' : `${n}.html`))
  .filter((s) => s !== '404.html')
  .map((s) => s.replace(/\.html$/, ''));
const ALT = PAGE_NAMES.filter((s) => s !== 'index').join('|');
const REL_RE = new RegExp(`"(${ALT})\\.html(?![a-z0-9-])`, 'g');
const ABS_RE = new RegExp(`${RE(SITE_URL)}/(${ALT})\\.html(?![a-z0-9-])`, 'g');
const BARE_RE = new RegExp(`${RE(SITE_HOST)}/(${ALT})\\.html(?![a-z0-9-])`, 'g');

function extensionless(html) {
  return html
    .split(`${SITE_URL}/index.html`).join(`${SITE_URL}/`)
    .replace(ABS_RE, `${SITE_URL}/$1`)
    /* Both forms consume the closing quote: the earlier lookahead left it
       behind and produced href="./"" — a stray quote that made the tokenizer
       treat the whole tag as text. */
    .replace(/"index\.html#/g, '"./#')
    .replace(/"index\.html"/g, '"./"')
    .replace(REL_RE, '"$1')
    .replace(BARE_RE, `${SITE_HOST}/$1`);
}

/* Pages serves 404.html at whatever path was mistyped, so a relative asset URL
   on that one page would resolve against /a/b/ and arrive broken. Every normal
   page is one segment deep; the 404 page is not, so its URLs go absolute. */
function rootAbsolute(html) {
  return html
    .replace(/\b(href|src)="\.\/"/g, '$1="/"')
    .replace(/\b(href|src)="(?![/#]|https?:|mailto:|tel:|data:)([^"]+)"/g, '$1="/$2"');
}

/* A page's public address, used wherever the build writes a URL itself. */
const pagePath = (slug) => (slug === 'index.html' ? '/' : `/${slug.replace(/\.html$/, '')}`);

const built = [];
for (const name of pageFiles) {
  const mod = await import(`./src/pages/${name}.mjs`);
  const { slug, html } = mod.default;
  let pageHtml = html;

  /* Page modules write ORIGIN_PLACEHOLDER; the published origin comes from
     site.config.mjs, so the domain is a one-line edit. Bare hostnames in the
     citation rows ("pipaparampara.in, accessed …") follow the same rule. */
  pageHtml = pageHtml
    .split(ORIGIN_PLACEHOLDER).join(SITE_URL)
    .split(PLACEHOLDER_BARE).join(SITE_HOST);

  pageHtml = extensionless(pageHtml);
  if (name === 'notfound') pageHtml = rootAbsolute(pageHtml);

  /* Stable deep-link anchors for every h2 without one. */
  const prefix = slug.replace(/\.html$/, '');
  let hn = 0;
  pageHtml = pageHtml.replace(/<h2(\s[^>]*)?>/g, (m, attrs = '') => {
    if (/\bid=/.test(attrs)) return m;
    hn++;
    return `<h2${attrs} id="${prefix}-s${hn}">`;
  });

  /* Stable anchors for village rows, in source order. */
  if (slug === 'panch-patti.html') {
    let vi = 0;
    pageHtml = pageHtml.replace(/<tr data-name=/g, () => `<tr id="ganv-${++vi}" data-name=`);
  }

  const finalHtml = dualNumerals(toWestern(pageHtml));
  fs.writeFileSync(path.join(out, slug), finalHtml);
  built.push({ slug, name, kb: (Buffer.byteLength(finalHtml) / 1024).toFixed(1), raw: pageHtml });
}

/* ==========================================================================
   Search index — one entry per section, plus one per village
   ========================================================================== */

function plain(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<svg[\s\S]*?<\/svg>/gi, ' ')
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

const SCOPES = {
  'pipaji.html': 'katha',
  'granth.html': 'katha',
  'vani.html': 'vani',
  'itihas.html': 'itihas',
  'pehchan.html': 'itihas',
  'tirth.html': 'tirth',
  'samdari.html': 'tirth',
  'panch-patti.html': 'gaon',
};
const WEIGHTS = {
  'index.html': 8,
  'pipaji.html': 7,
  'granth.html': 5,
  'vani.html': 5,
  'tirth.html': 5,
  'panch-patti.html': 5,
  'samdari.html': 4,
  'itihas.html': 4,
  'pehchan.html': 3,
  'pustakalaya.html': 3,
  'prashnottari.html': 3,
  'sangathan.html': 2,
  'samachar.html': 2,
  'yogdan.html': 1,
};

const index = [];
for (const p of built) {
  if (p.slug === '404.html') continue;
  const label = TITLES[p.slug] || SITE_NAME;
  const scope = SCOPES[p.slug] || '';
  const weight = WEIGHTS[p.slug] || 0;

  const mainMatch = p.raw.match(/<main id="main">([\s\S]*?)<\/main>/);
  if (!mainMatch) continue;
  const main = mainMatch[1];

  let added = 0;
  main.replace(/<section\b([^>]*)>([\s\S]*?)<\/section>/g, (m, attrs, inner) => {
    const text = plain(latinDigits(inner));
    if (text.length < 30) return m;

    const head = inner.match(/<h([1-4])([^>]*)>([\s\S]*?)<\/h\1>/);
    const title = head ? plain(head[3]) : label;
    const headingId = head ? (head[2].match(/\bid="([^"]+)"/) || [])[1] : '';
    const sectionId = (attrs.match(/\bid="([^"]+)"/) || [])[1];
    const anchor = sectionId || headingId;
    const url = anchor ? `${pagePath(p.slug)}#${anchor}` : pagePath(p.slug);

    index.push({
      u: url,
      p: label,
      t: title,
      x: text.slice(0, 2200),
      s: scope,
      w: weight,
    });
    added++;
    return m;
  });

  /* If a page has a hero outside a section (none today), index it whole. */
  if (!added) {
    index.push({ u: pagePath(p.slug), p: label, t: label, x: plain(latinDigits(main)).slice(0, 2200), s: scope, w: weight });
  }
}

/* ---------- romanisation for Latin-typed searches ----------
   Most readers type on a phone in Latin script: "samdari", "jodhpur",
   "banswara". The index stores Hindi, so every entry also carries a few
   romanised spellings, including the schwa-deleted form that Indian place
   names normally take in English. Matching only; nothing is displayed. */
const ROMAN_C = {
  'क':'k','ख':'kh','ग':'g','घ':'gh','ङ':'n',
  'च':'ch','छ':'chh','ज':'j','झ':'jh','ञ':'n',
  'ट':'t','ठ':'th','ड':'d','ढ':'dh','ण':'n',
  'त':'t','थ':'th','द':'d','ध':'dh','न':'n',
  'प':'p','फ':'ph','ब':'b','भ':'bh','म':'m',
  'य':'y','र':'r','ल':'l','व':'v','श':'sh','ष':'sh','स':'s','ह':'h','ळ':'l',
  'क़':'q','ख़':'kh','ग़':'g','ज़':'z','ड़':'r','ढ़':'rh','फ़':'f','य़':'y',
};
const ROMAN_V = {
  'अ':'a','आ':'a','इ':'i','ई':'i','उ':'u','ऊ':'u','ऋ':'ri','ए':'e',
  'ऐ':'ai','ओ':'o','औ':'au','ऍ':'e','ऑ':'o',
};
const ROMAN_M = {
  'ा':'a','ि':'i','ी':'i','ु':'u','ू':'u','ृ':'ri','े':'e','ै':'ai',
  'ो':'o','ौ':'au','ॅ':'e','ॉ':'o',
};

function toRoman(hi) {
  /* Source writes nukta as a combining mark (ड + ़), never precomposed. */
  const NUKTA = { '\u0915': 'q', '\u0916': 'kh', '\u0917': 'g', '\u091C': 'z', '\u0921': 'r', '\u0922': 'rh', '\u092B': 'f', '\u092F': 'y' };
  let out = '';
  for (let i = 0; i < hi.length; i++) {
    const ch = hi[i];
    if (ROMAN_C[ch]) {
      let base = ROMAN_C[ch];
      if (hi[i + 1] === '\u093C') { base = NUKTA[ch] || base; i++; }
      out += base;
      const after = hi[i + 1];
      if (after === '\u094D') { i++; continue; }          // virama: no inherent vowel
      if (ROMAN_M[after]) { out += ROMAN_M[after]; i++; continue; }
      out += 'a';
    } else if (ROMAN_V[ch]) out += ROMAN_V[ch];
    else if (ch === '\u0902' || ch === '\u0901') out += 'n';
    else if (ch === '\u0903') out += 'h';
    else if (/[0-9\u0966-\u096F]/.test(ch)) out += latinDigits(ch);
    else if (/\s/.test(ch)) out += ' ';
    else if (/[A-Za-z]/.test(ch)) out += ch.toLowerCase();
  }
  return out.replace(/\s+/g, ' ').trim();
}

function romanVariants(hi) {
  const full = toRoman(hi);
  if (!full) return '';
  /* English spellings of Indian names drop the schwa: "samadari" → "samdari",
     "jodhapuri" → "jodhpuri". Emit each single deletion plus the fully
     deleted form, so both spellings match. */
  const dropAt = (w, at) => w.slice(0, at) + w.slice(at + 1);
  const eligible = [];
  for (let i = 1; i < full.length - 1; i++) {
    if (full[i] !== 'a') continue;
    if (!/[bcdfghjklmnpqrstvwxyz]/.test(full[i - 1])) continue;
    if (!/[bcdfghjklmnpqrstvwxyz]/.test(full[i + 1])) continue;
    eligible.push(i);
  }
  const forms = [full];
  eligible.slice(0, 4).forEach((at) => forms.push(dropAt(full, at)));
  forms.push(eligible.reduceRight((w, at) => dropAt(w, at), full));
  const phonetic = (w) => w
    .replace(/chh/g, 'ch').replace(/ph/g, 'f').replace(/v/g, 'w')
    .replace(/ee/g, 'i').replace(/oo/g, 'u').replace(/sh/g, 's');
  const set = new Set();
  forms.forEach((f) => { set.add(f); set.add(phonetic(f)); });
  return [...set].filter(Boolean).join(' ');
}

/* One entry per verse, so searching "गुरु" or "उद्यम" lands on the verse
   itself (`vani.html#pad-7`) instead of the whole 23-verse collection.
   Added after de-duplication: two verses may open with the same line. */
const verseEntries = VERSES.map((v, i) => {
  const text = latinDigits(v.text.replace(/\n/g, ' ')).replace(/\s+/g, ' ').trim();
  return {
    u: `/vani#pad-${i + 1}`,
    p: 'वाणी',
    t: text.slice(0, 90),
    x: `${text} — ${v.gloss || ''} ${v.type} · ${v.theme} · ${v.source || ''}`.replace(/\s+/g, ' ').trim(),
    s: 'vani',
    w: 16,
  };
});

const PATTI_LABEL = Object.fromEntries(PATTIS.map((x) => [x.key, x.hi]));
VILLAGES.forEach((v, i) => {
  index.push({
    u: `/panch-patti#ganv-${i + 1}`,
    p: 'पाँच पट्टी',
    t: v.name,
    x: `${v.name} — ${PATTI_LABEL[v.patti] || v.patti} · गोत्र: ${v.gotras}`,
    s: 'gaon',
    w: 14,
  });
});

/* De-duplicate: same page + same heading = one result. Keep the fullest text. */
const dedup = new Map();
for (const e of index) {
  const k = `${e.p}|${e.t}`;
  const prev = dedup.get(k);
  if (!prev || e.x.length > prev.x.length) dedup.set(k, e);
}
const searchIndex = [...verseEntries, ...dedup.values()].map((e) => ({
  ...e,
  r: romanVariants(`${e.t} ${e.p}`),
}));

fs.writeFileSync(path.join(out, 'search-index.json'), JSON.stringify(searchIndex));

/* ==========================================================================
   sitemap, robots, manifest, feed
   ========================================================================== */

const today = new Date().toISOString().slice(0, 10);
const indexable = built.filter((p) => p.slug !== '404.html');
const sitemapEntries = indexable.map((p) => {
  const loc = `${SITE_URL}${pagePath(p.slug)}`;
  const priority = p.slug === 'index.html' ? '1.0' : ['pipaji.html', 'granth.html', 'panch-patti.html', 'tirth.html'].includes(p.slug) ? '0.9' : '0.7';
  return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
}).join('\n');
fs.writeFileSync(path.join(out, 'sitemap.xml'),
`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries}
</urlset>
`);

const AI_BOTS = [
  'GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-SearchBot',
  'PerplexityBot', 'Google-Extended', 'Applebot-Extended', 'CCBot', 'meta-externalagent',
];
fs.writeFileSync(path.join(out, 'robots.txt'),
`# ${SITE_NAME} — ${SITE_URL}
User-agent: *
Allow: /
Disallow: /404

${AI_BOTS.map((b) => `User-agent: ${b}\nAllow: /`).join('\n\n')}

Sitemap: ${SITE_URL}/sitemap.xml
# For language models: ${SITE_URL}/llms.txt and ${SITE_URL}/llms-full.txt
`);

fs.writeFileSync(path.join(out, 'manifest.webmanifest'), JSON.stringify({
  name: `${SITE_NAME} — समाज का इतिहास, साहित्य और तीर्थ`,
  short_name: SITE_NAME,
  description: 'पीपा क्षत्रिय · दर्जी समाज की परंपरा — पीपाजी की कथा, वाणी, समदड़ी धाम, २०४ गाँव और सभी तीर्थ, स्रोतों के साथ।',
  lang: 'hi',
  dir: 'ltr',
  start_url: '/',
  scope: '/',
  display: 'standalone',
  background_color: '#f8f3e8',
  theme_color: '#97382a',
  categories: ['education', 'reference', 'books'],
  icons: [
    { src: 'assets/favicon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
    { src: 'assets/icon-180.png', sizes: '180x180', type: 'image/png' },
    { src: 'assets/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' },
  ],
  shortcuts: [
    { name: 'अपना गाँव खोजें', url: '/panch-patti' },
    { name: 'पूरा ग्रंथ पढ़ें', url: '/granth' },
    { name: 'साइट में खोजें', url: '/khoj' },
  ],
}, null, 2));

/* Atom feed — from the news page's published items. */
const { NEWS } = await import('./src/pages/samachar.mjs');
const xmlEsc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const feedUpdated = '2026-11-20T00:00:00+05:30';
const feedEntries = NEWS.map((n) => `  <entry>
    <title type="text">${xmlEsc(n.title)}</title>
    <link href="${SITE_URL}/samachar"/>
    <id>${SITE_URL}/samachar#${encodeURIComponent(n.title.slice(0, 24))}</id>
    <updated>${n.iso ? new Date(n.iso).toISOString() : feedUpdated}</updated>
    <summary type="text">${xmlEsc(n.body + ' ' + (n.note || ''))}</summary>
    <category term="${xmlEsc(n.tag)}"/>
  </entry>`).join('\n');
fs.writeFileSync(path.join(out, 'feed.xml'),
`<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom" xml:lang="hi">
  <title>${SITE_NAME} — समाचार</title>
  <subtitle>समाज के आयोजन, जयंती, सामूहिक विवाह और विरासत की ख़बरें।</subtitle>
  <link href="${SITE_URL}/feed.xml" rel="self"/>
  <link href="${SITE_URL}/samachar"/>
  <id>${SITE_URL}/feed.xml</id>
  <updated>${feedUpdated}</updated>
  <author><name>${SITE_NAME}</name><email>goyaltailors@gmail.com</email></author>
${feedEntries}
</feed>
`);

/* ==========================================================================
   llms.txt + llms-full.txt
   ========================================================================== */

const llmsPages = [
  ['मुखपृष्ठ', 'index.html', 'संग्रह का प्रवेश-द्वार, मुख्य संख्याएँ और पाँच प्रश्न।'],
  ['श्री पीपाजी', 'pipaji.html', '३३ प्रसंगों में जीवन — गागरोन, काशी, वन, टोडा; तीन तिथियाँ।'],
  ['ग्रंथ', 'granth.html', 'पूरा संग्रह एक पुस्तक-रूप में — क्रम से पढ़ने योग्य।'],
  ['वाणी', 'vani.html', '२३ पद और दोहे, आरती, गुरु ग्रंथ साहिब का शब्द।'],
  ['समदड़ी धाम', 'samdari.html', 'पाँच पट्टियों का संयुक्त तीर्थ, १९७५, मेले और यात्रा।'],
  ['पाँच पट्टी', 'panch-patti.html', '२०४ गाँव, ५ पट्टियाँ, १२ गोत्र — खोजने योग्य सूची।'],
  ['तीर्थ', 'tirth.html', '११ स्थल — गागरोन, टोडा, समदड़ी, मलवाड़ा, सागवाड़ा, वसई आदि।'],
  ['इतिहास', 'itihas.html', 'खींची चौहान वंश, ५२ कुल, १२ रानियाँ, समय-रेखा।'],
  ['नाम और पहचान', 'pehchan.html', 'दर्जी, छीपा, राजपूत — तीन मत, अभिलेख और संग्रह की नीति।'],
  ['संगठन', 'sangathan.html', 'प्रकाशित पदाधिकारी, सदस्यता और संपर्क।'],
  ['पुस्तकालय', 'pustakalaya.html', 'स्रोत-ग्रंथ, पाठ्यपुस्तक, PDF और उद्धरण।'],
  ['समाचार', 'samachar.html', 'जयंती, सामूहिक विवाह और विरासत की ख़बरें।'],
  ['प्रश्नोत्तरी', 'prashnottari.html', 'पाठ्यपुस्तक-आधारित १० प्रश्न और उत्तर।'],
  ['खोज', 'khoj.html', 'पूरी साइट में खोज।'],
  ['योगदान दें', 'yogdan.html', 'सुधार, स्रोत और सुझाव भेजने का तरीक़ा।'],
  ['स्रोत और अधिकार', 'adhikar.html', 'स्रोत, पाठ पर अधिकार, उद्धरण नीति, सुधार और हटाने का रास्ता।'],
  ['English', 'en.html', 'Hand-written English summary of the tradition and the archive.'],
];

fs.writeFileSync(path.join(out, 'llms.txt'),
`# ${SITE_NAME} — Pipa Parampara
> पीपा क्षत्रिय · दर्जी समाज की परंपरा, स्रोतों के साथ। A source-based public archive of the Pipa Kshatriya / Darji Rajput tradition: the life and verses of Pipaji, the five pattis and 204 villages, Samdari Dham, pilgrimage sites, and the community's organisations.

Canonical: ${SITE_URL}/
Primary language: Hindi (hi). English summary: ${SITE_URL}/en
Contact: goyaltailors@gmail.com
License: source code MIT; the original editorial text is not open-licensed (quote and cite with attribution); quoted and scanned works remain with their authors and publishers. Rights, quoting policy and the takedown route: ${SITE_URL}/adhikar
Last updated: ${today}

## How to cite
${SITE_NAME}, "पृष्ठ का नाम", ${SITE_HOST}, accessed ${today}.

## Core pages
${llmsPages.map(([t, u, d]) => `- [${t}](${SITE_URL}${u === 'index.html' ? '/' : '/' + u.replace(/\.html$/, '')}): ${d}`).join('\n')}

## Key facts
- पीपाजी गागरोन के खींची चौहान राजा थे; रामानंद के शिष्य; टोडानगर में गृहस्थ-संत के रूप में रहे।
- जन्म पर तीन मत हैं: वि.सं. १३८० (≈१३२३ ई., समाज की जयंती-गणना), वि.सं. १३९०–१४७० (राजस्थान बोर्ड), और ≈१४२५ ई. (अकादमिक)। जयंती सब में चैत्र शुक्ल पूर्णिमा है।
- समाज पाँच पट्टियों में संगठित है: जालोरी, सिवांची, मालाणी, चोराई, जोधपुरी। सूची में २०४ गाँव और १२ गोत्र हैं।
- समदड़ी धाम (बाड़मेर) १९७५ में बना; पाँच पट्टियों से एक-एक संस्थापक ट्रस्टी।
- राजस्थान ओ.बी.सी. सूची में छीपा (क्रम ८) और दर्जी (क्रम १२) अलग प्रविष्टियाँ हैं।
- यह संग्रह किसी जाति-सीमा का फ़ैसला नहीं करता; हर दावे के साथ स्रोत और विश्वास-स्तर दिया जाता है।

## Editorial policy
- हर दावे पर स्रोत और चार में से एक बैज: प्रमाणित, परंपरा, स्थानीय, मतभेद।
- जहाँ स्रोत टकराते हैं, दोनों पक्ष रखे जाते हैं; कोई पक्ष सही नहीं ठहराया जाता।
- केवल प्रकाशित पदाधिकारी और कार्यालय-संपर्क प्रकाशित होते हैं; व्यक्तिगत सदस्य-सूची या फ़ोन निर्देशिका नहीं।
- मशीनी अनुवाद उपलब्ध है, पर मूल पाठ हिन्दी है।

## Machine-readable
- Full text: ${SITE_URL}/llms-full.txt
- Search index: ${SITE_URL}/search-index.json
- Sitemap: ${SITE_URL}/sitemap.xml
- Feed: ${SITE_URL}/feed.xml
`);

/* Full text — grouped by page, section by section. */
const byPage = new Map();
for (const e of index) {
  if (e.s === 'gaon') continue;
  if (!byPage.has(e.p)) byPage.set(e.p, []);
  byPage.get(e.p).push(e);
}
let full = `# ${SITE_NAME} — पूरा पाठ\n\n> ${SITE_URL}/\n> मूल पाठ हिन्दी में। सभी अंश स्रोत-चिह्नित हैं।\n\n`;
for (const [page, entries] of byPage) {
  full += `\n\n${'='.repeat(68)}\n# ${page}\n${'='.repeat(68)}\n`;
  for (const e of entries) {
    full += `\n## ${e.t}\n\n${e.x}\n`;
  }
}
fs.writeFileSync(path.join(out, 'llms-full.txt'), full.trim() + '\n');

/* ---------- report ---------- */
const total = built.reduce((n, p) => n + Number(p.kb), 0);
console.log('\n  पीपा परंपरा — build\n');
for (const p of built) console.log(`  ${p.slug.padEnd(20)} ${p.kb.padStart(7)} kB`);
console.log(`\n  ${built.length} pages · ${total.toFixed(1)} kB html · ${searchIndex.length} search entries · dist/\n`);
