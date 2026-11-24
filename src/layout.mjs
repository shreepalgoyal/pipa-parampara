import fs from 'node:fs';
import path from 'node:path';
import { SITE } from '../site.config.mjs';

export { SITE };

export const NAV = [
  { href: 'index.html', label: 'मुखपृष्ठ' },
  { href: 'pipaji.html', label: 'श्री पीपाजी' },
  { href: 'vani.html', label: 'वाणी' },
  { href: 'samdari.html', label: 'समदड़ी धाम' },
  { href: 'panch-patti.html', label: 'पाँच पट्टी' },
  { href: 'tirth.html', label: 'तीर्थ' },
  { href: 'itihas.html', label: 'इतिहास' },
  { href: 'granth.html', label: 'ग्रंथ' },
];

/* Shown in the mobile drawer and in the desktop "और" menu. */
export const NAV_EXTRA = [
  { href: 'pustakalaya.html', label: 'पुस्तकालय' },
  { href: 'pehchan.html', label: 'नाम और पहचान' },
  { href: 'sangathan.html', label: 'संगठन' },
  { href: 'samachar.html', label: 'समाचार' },
  { href: 'prashnottari.html', label: 'प्रश्नोत्तरी' },
  { href: 'khoj.html', label: 'खोज' },
  { href: 'yogdan.html', label: 'योगदान दें' },
];

export const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/* Latin digits → Devanagari, for counts and years computed at build time. */
const DIGITS = '०१२३४५६७८९';
export const dev = (n) => String(n).replace(/[0-9]/g, (d) => DIGITS[+d]);

const jsonld = (data) => JSON.stringify(data).replace(/</g, '\\u003c');

export const canonical = (slug) =>
  slug === 'index.html' ? `${SITE.url}/` : `${SITE.url}/${slug}`;

/* ---------- Seal ---------- */
export function sealTicks() {
  let out = '';
  for (let i = 0; i < 72; i++) {
    const a = (i / 72) * Math.PI * 2;
    const r1 = 98, r2 = i % 6 === 0 ? 90 : 94;
    const x1 = 120 + r1 * Math.cos(a), y1 = 120 + r1 * Math.sin(a);
    const x2 = 120 + r2 * Math.cos(a), y2 = 120 + r2 * Math.sin(a);
    out += `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="currentColor" stroke-width="${i % 6 === 0 ? 1 : .5}" opacity="${i % 6 === 0 ? .8 : .45}"/>`;
  }
  return out;
}

export const SEAL_SVG = `
<svg viewBox="0 0 240 240" role="img" aria-label="पीपा परंपरा की मुहर">
  <circle cx="120" cy="120" r="114" fill="none" stroke="currentColor" stroke-width="1"/>
  <circle cx="120" cy="120" r="107" fill="none" stroke="currentColor" stroke-width=".5" opacity=".55"/>
  ${sealTicks()}
  <circle cx="120" cy="120" r="82" fill="none" stroke="currentColor" stroke-width=".5" opacity=".4"/>
  <g opacity=".9">
    <path d="M186 54 L96 144" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
    <path d="M96 144 l-7 7" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
    <ellipse cx="184" cy="56" rx="2.6" ry="5.2" transform="rotate(-45 184 56)" fill="none" stroke="currentColor" stroke-width="1.1"/>
    <path d="M180 51 C 150 26, 74 40, 66 78 C 58 116, 96 132, 112 112" fill="none" stroke="currentColor" stroke-width=".9" opacity=".75"/>
  </g>
</svg>`;

/* ---------- Small components ---------- */
export const badge = (kind, text) => {
  const map = { ok: 'badge--ok', trad: 'badge--trad', local: 'badge--local', diff: 'badge--diff' };
  return `<span class="badge ${map[kind] || ''}">${esc(text)}</span>`;
};

export function sectionHead({ index, title, intro, id, align = '' }) {
  return `<header class="s-head ${align}">
    ${index ? `<span class="s-head__index">${esc(index)}</span>` : ''}
    <h2${id ? ` id="${id}"` : ''}>${title}</h2>
    ${intro ? `<p>${intro}</p>` : ''}
  </header>`;
}

export function verseBlock({ text, gloss, source, large = false, copy = true }) {
  return `<figure class="verse ${large ? 'verse--lg' : ''}">
    <blockquote class="verse__text">${esc(text).replace(/\n/g, '<br>')}</blockquote>
    ${gloss ? `<figcaption class="verse__gloss">${gloss}</figcaption>` : ''}
    <div class="verse__foot">
      ${source ? `<cite class="verse__src">${esc(source)}</cite>` : ''}
      <span class="verse__tools">
        ${copy ? `<button class="chip" type="button" data-copy="${esc(text)}">कॉपी</button>` : ''}
        <button class="chip" type="button" data-share="${esc(text)}" data-share-label="पीपाजी की वाणी">साझा</button>
        <button class="chip" type="button" data-poster="${esc(text)}" data-poster-src="${esc(source || '')}" title="पोस्टर बनाएँ — साझा करने के लिए तस्वीर">पोस्टर</button>
      </span>
    </div>
  </figure>`;
}

/* ---------- Page-level sources ---------- */
const SRC_MAP = {
  'index.html': [
    ['मूल', 'नाभादास, भक्तमाल, दोहा ३०१ (लगभग १५८५ ई.)'],
    ['पाठ्यपुस्तक', 'राजस्थान बोर्ड, क्षितिज, कक्षा १०, पाठ १८ — "लोक संत पीपा"', 'pustakalaya.html'],
    ['संस्था', 'श्री पीपा क्षत्रिय पंचपट्टी दर्जी समाज मंदिर ट्रस्ट, समदड़ी', 'samdari.html'],
    ['गाँव', 'पाँच पट्टी गाँव-सूची — panchpatti.in से संकलित', 'panch-patti.html'],
  ],
  'pipaji.html': [
    ['मूल', 'नाभादास, भक्तमाल, दोहा ३०१ (लगभग १५८५ ई.)'],
    ['टीका', 'प्रियादास, भक्तिरसबोधिनी (१७१२ ई.) — टोडा के वर्षों का एकमात्र स्रोत'],
    ['पाठ्यपुस्तक', 'राजस्थान बोर्ड, क्षितिज, कक्षा १०, पाठ १८', 'assets/docs/kshitij-pipa.pdf'],
    ['लोक-जीवनी', 'निमाड़–मालवा परंपरा, पीपाजी महाराज की जीवन-गाथा (२०१६)', 'assets/docs/jeevan-gatha.pdf'],
    ['अनुवाद', 'Satsang with Ananta — भक्तमाल का पीपा-प्रसंग', 'https://anantasatsang.org/scripture/bhaktamal/167'],
  ],
  'vani.html': [
    ['संग्रह', 'श्री पीपा क्षत्रिय दर्जी समाज वागड़ — "संत पीपाजी महाराज के दोहे"', 'https://shreepipakshatriya.wordpress.com/'],
    ['पाठ्यपुस्तक', 'राजस्थान बोर्ड, क्षितिज, कक्षा १०, पाठ १८', 'assets/docs/kshitij-pipa.pdf'],
    ['शब्द', 'गुरु ग्रंथ साहिब — राग धनासरी, पीपाजी का शब्द'],
    ['आरती', 'panchpatti.in और pkds.in — दो स्वतंत्र प्रतियाँ', 'https://www.pkds.in/'],
  ],
  'samdari.html': [
    ['इतिहास', 'panchpatti.in — "समदड़ी मंदिर का इतिहास"', 'https://panchpatti.in/'],
    ['ट्रस्ट', 'श्री पीपा क्षत्रिय पंचपट्टी दर्जी समाज मंदिर ट्रस्ट — प्रकाशित पदाधिकारी सूची', 'sangathan.html'],
    ['मेला', 'समदड़ी धाम — चैत्र पूर्णिमा एवं कार्तिक पूर्णिमा आयोजन'],
    ['संपर्क', 'मंदिर कार्यालय ☎ 02900-276257'],
  ],
  'panch-patti.html': [
    ['सूची', 'panchpatti.in — पाँच पट्टी गाँव और गोत्र सूची', 'https://panchpatti.in/'],
    ['संस्था', 'श्री पीपा क्षत्रिय पंचपट्टी दर्जी समाज मंदिर ट्रस्ट, समदड़ी', 'samdari.html'],
    ['नोट', 'वर्तनी-भेद एक किया गया है; मूल सूची जैसी है वैसी सुरक्षित है'],
  ],
  'tirth.html': [
    ['पाठ्यपुस्तक', 'राजस्थान बोर्ड, क्षितिज, कक्षा १०, पाठ १८', 'assets/docs/kshitij-pipa.pdf'],
    ['उत्तर-कुंजी', 'राजस्थान पटवारी परीक्षा, २४ अक्टूबर २०२१ — आधिकारिक उत्तर-कुंजी'],
    ['मूल', 'नाभादास, भक्तमाल — टोडानगर निवास'],
    ['स्थल', 'स्थानीय मंदिर समितियाँ एवं प्रकाशित पते/फ़ोन'],
  ],
  'itihas.html': [
    ['मूल', 'नाभादास, भक्तमाल एवं प्रियादास की टीका'],
    ['पाठ्यपुस्तक', 'राजस्थान बोर्ड, क्षितिज, कक्षा १०, पाठ १८', 'assets/docs/kshitij-pipa.pdf'],
    ['शोध', 'गौरीशंकर हीराचंद ओझा, History of Rajputana, Vol. 1'],
    ['अभिलेख', 'राजस्थान ओ.बी.सी. सूची — छीपा क्रम ८, दर्जी क्रम १२'],
    ['वंशावली', 'समाज की बावन-कुल एवं बारह-रानी पारंपरिक सूचियाँ'],
  ],
  'pehchan.html': [
    ['अभिलेख', 'राजस्थान ओ.बी.सी. सूची — छीपा क्रम ८, दर्जी क्रम १२'],
    ['मूल', 'नाभादास, भक्तमाल; गुरु ग्रंथ साहिब — पीपाजी का शब्द'],
    ['पाठ्यपुस्तक', 'राजस्थान बोर्ड, क्षितिज, कक्षा १०, पाठ १८', 'assets/docs/kshitij-pipa.pdf'],
    ['संस्था', 'समदड़ी मंदिर ट्रस्ट, पाँच पट्टी, अखिल भारतीय पीपा क्षत्रिय महासभा के प्रकाशित नाम'],
  ],
  'sangathan.html': [
    ['ट्रस्ट', 'श्री पीपा क्षत्रिय पंचपट्टी दर्जी समाज मंदिर ट्रस्ट, समदड़ी — प्रकाशित पदाधिकारी'],
    ['महासभा', 'अखिल भारतीय पीपा क्षत्रिय महासभा, पुष्कर — प्रकाशित पदाधिकारी'],
    ['डिजिटल', 'pkds.in — पीकेडीएस मीडिया फ़ाउंडेशन, हुबली', 'https://www.pkds.in/'],
    ['शाखा', 'श्री पीपा क्षत्रिय दर्जी समाज, वागड़ — सागवाड़ा'],
  ],
  'pustakalaya.html': [
    ['ग्रंथ', 'नाभादास, भक्तमाल; प्रियादास, भक्तिरसबोधिनी'],
    ['पाठ्यपुस्तक', 'राजस्थान बोर्ड, क्षितिज, कक्षा १०, पाठ १८', 'assets/docs/kshitij-pipa.pdf'],
    ['जीवनी', 'निमाड़–मालवा परंपरा, पीपाजी महाराज की जीवन-गाथा (२०१६)', 'assets/docs/jeevan-gatha.pdf'],
    ['सूची', 'पूरी ग्रंथ-सूची इसी पृष्ठ पर — लेखक, ग्रंथ, काल और भूमिका'],
  ],
  'samachar.html': [
    ['जयंती', 'वागड़ ब्लॉग — ५ अप्रैल २०२६ की जयंती रिपोर्ट', 'https://shreepipakshatriya.wordpress.com/'],
    ['विवाह', 'panchpatti.in — समदड़ी का छठा सामूहिक विवाह (२०१६)', 'https://panchpatti.in/'],
    ['समाज', 'फ़ेसबुक — Pipa Kshtriya Darj Samaj', 'https://www.facebook.com/PipaKshtriyaDarjSamaj'],
    ['विरासत', 'यूनेस्को — राजस्थान के पहाड़ी दुर्ग (२०१३)', 'https://whc.unesco.org/en/list/247/'],
  ],
  'prashnottari.html': [
    ['स्रोत', 'राजस्थान बोर्ड, क्षितिज, कक्षा १०, पाठ १८ — "लोक संत पीपा"', 'assets/docs/kshitij-pipa.pdf'],
    ['पृष्ठ', 'पुस्तक के पृष्ठ १०१–१०५, २०१७ संस्करण'],
    ['नोट', 'प्रश्न पाठ्यपुस्तक के हैं; उत्तर के साथ संदर्भ दिया गया है'],
  ],
  'yogdan.html': [
    ['नीति', 'हर दावे के साथ स्रोत; असत्यापित बात को परंपरा या मतभेद का दर्जा'],
    ['गोपनीयता', 'केवल प्रकाशित पदाधिकारी और कार्यालय-संपर्क; कोई व्यक्तिगत सदस्य-सूची नहीं'],
  ],
  'granth.html': [
    ['मूल', 'नाभादास, भक्तमाल; प्रियादास, भक्तिरसबोधिनी'],
    ['पाठ्यपुस्तक', 'राजस्थान बोर्ड, क्षितिज, कक्षा १०, पाठ १८', 'assets/docs/kshitij-pipa.pdf'],
    ['जीवनी', 'निमाड़–मालवा परंपरा, पीपाजी महाराज की जीवन-गाथा (२०१६)', 'assets/docs/jeevan-gatha.pdf'],
    ['सूची', 'पूरी ग्रंथ-सूची अध्याय ११ में', 'pustakalaya.html'],
  ],
  'en.html': [
    ['Primary', 'Nabhadas, Bhaktamal, doha 301 (c. 1585 CE)'],
    ['Commentary', 'Priyadas, Bhaktirasbodhini (1712 CE)'],
    ['Textbook', 'Rajasthan Board, Kshitij, Class 10, Lesson 18', 'assets/docs/kshitij-pipa.pdf'],
    ['Archive', 'pkds.in and panchpatti.in', 'https://www.pkds.in/'],
  ],
};

function sourcesBlock(slug, sources) {
  const list = sources || SRC_MAP[slug];
  if (!list || !list.length) return '';
  const title = slug === 'granth.html' ? 'इस ग्रंथ के स्रोत' : 'इस पृष्ठ के स्रोत';
  return `<section class="page-sources" aria-labelledby="page-sources-title">
  <div class="wrap">
    <header class="page-sources__head">
      <span class="s-head__index">संदर्भ</span>
      <h2 id="page-sources-title">${title}</h2>
      <p>जो कुछ इस पृष्ठ पर है, उसका आधार नीचे है। जहाँ स्रोत आपस में टकराते हैं, वहाँ दोनों रखे गए हैं।</p>
    </header>
    <dl class="src-list">
      ${list.map(([k, v, href]) => `<div class="src-list__row">
        <dt>${esc(k)}</dt>
        <dd>${href ? `<a href="${esc(href)}"${/^https?:/.test(href) ? ' target="_blank" rel="noopener"' : ''}>${v}</a>` : v}</dd>
      </div>`).join('\n      ')}
    </dl>
    <div class="cite">
      <p class="cite__text" data-cite>पीपा परंपरा, “${esc(pageTitleForCite(slug))}”, <em>pipaparampara.in</em>, अभिगम <span data-date>२० नवंबर २०२६</span>।</p>
      <div class="cite__actions">
        <button class="chip" type="button" data-copy-cite>उद्धरण कॉपी करें</button>
        <button class="chip" type="button" data-print>यह पृष्ठ छापें</button>
        <button class="chip" type="button" data-share>साझा करें</button>
        <button class="chip" type="button" data-share-wa title="WhatsApp पर भेजें">WhatsApp</button>
      </div>
    </div>
  </div>
</section>`;
}

export const TITLES = {
  'index.html': 'मुखपृष्ठ',
  'pipaji.html': 'श्री पीपाजी',
  'vani.html': 'वाणी',
  'samdari.html': 'समदड़ी धाम',
  'panch-patti.html': 'पाँच पट्टी',
  'tirth.html': 'तीर्थ',
  'itihas.html': 'इतिहास',
  'granth.html': 'ग्रंथ',
  'pustakalaya.html': 'पुस्तकालय',
  'pehchan.html': 'नाम और पहचान',
  'sangathan.html': 'संगठन',
  'samachar.html': 'समाचार',
  'prashnottari.html': 'प्रश्नोत्तरी',
  'khoj.html': 'खोज',
  'yogdan.html': 'योगदान दें',
  'adhikar.html': 'स्रोत और अधिकार',
  'en.html': 'English',
  '404.html': 'पृष्ठ नहीं मिला',
};
const pageTitleForCite = (slug) => TITLES[slug] || 'पीपा परंपरा';

/* ---------- Preferences + search chrome ---------- */
const LANGS = [
  ['hi', 'हिन्दी (मूल)'], ['en', 'English'], ['gu', 'ગુજરાતી'], ['mr', 'मराठी'],
  ['pa', 'ਪੰਜਾਬੀ'], ['bn', 'বাংলা'], ['ta', 'தமிழ்'], ['te', 'తెలుగు'],
  ['kn', 'ಕನ್ನಡ'], ['ml', 'മലയാളം'], ['or', 'ଓଡ଼ିଆ'], ['ur', 'اردو'],
  ['ne', 'नेपाली'], ['si', 'සිංහල'], ['ar', 'العربية'], ['es', 'Español'],
  ['fr', 'Français'], ['de', 'Deutsch'], ['zh-CN', '中文'], ['ja', '日本語'],
];


const PREFS_DIALOG = `
<dialog class="prefs" id="prefs-dialog" aria-labelledby="prefs-title">
  <div class="prefs__inner">
    <header class="prefs__head">
      <div>
        <span class="s-head__index">पढ़ने की सुविधा</span>
        <h2 id="prefs-title">दिखावट</h2>
      </div>
      <button class="prefs__close" type="button" data-close-prefs aria-label="सेटिंग बंद करें">✕</button>
    </header>

    <fieldset class="prefs__group">
      <legend>रंग</legend>
      <div class="prefs__grid">
        <label class="swatch"><input type="radio" name="theme" value="paper"><span class="swatch__chip swatch__chip--paper"></span><span>पांडुलिपि</span></label>
        <label class="swatch"><input type="radio" name="theme" value="night"><span class="swatch__chip swatch__chip--night"></span><span>रात्रि</span></label>
        <label class="swatch"><input type="radio" name="theme" value="soft"><span class="swatch__chip swatch__chip--soft"></span><span>कोमल</span></label>
        <label class="swatch"><input type="radio" name="theme" value="contrast"><span class="swatch__chip swatch__chip--contrast"></span><span>कंट्रास्ट</span></label>
      </div>
    </fieldset>

    <fieldset class="prefs__group">
      <legend>अक्षर</legend>
      <div class="prefs__grid prefs__grid--2">
        <label class="opt"><input type="radio" name="font" value="serif"><span>सेरिफ़ — पारंपरिक</span></label>
        <label class="opt"><input type="radio" name="font" value="sans"><span>सैंस — साफ़</span></label>
      </div>
    </fieldset>

    <fieldset class="prefs__group">
      <legend>आकार</legend>
      <div class="prefs__grid prefs__grid--4">
        <label class="opt"><input type="radio" name="size" value="s"><span>छोटा</span></label>
        <label class="opt"><input type="radio" name="size" value="m"><span>सामान्य</span></label>
        <label class="opt"><input type="radio" name="size" value="l"><span>बड़ा</span></label>
        <label class="opt"><input type="radio" name="size" value="xl"><span>बहुत बड़ा</span></label>
      </div>
    </fieldset>

    <fieldset class="prefs__group">
      <legend>पंक्ति की चौड़ाई</legend>
      <div class="prefs__grid prefs__grid--2">
        <label class="opt"><input type="radio" name="measure" value="normal"><span>सामान्य</span></label>
        <label class="opt"><input type="radio" name="measure" value="wide"><span>चौड़ी</span></label>
      </div>
    </fieldset>

    <fieldset class="prefs__group">
      <legend>गति</legend>
      <div class="prefs__grid prefs__grid--2">
        <label class="opt"><input type="radio" name="motion" value="on"><span>चालू</span></label>
        <label class="opt"><input type="radio" name="motion" value="off"><span>बंद</span></label>
      </div>
    </fieldset>

    <fieldset class="prefs__group">
      <legend>अंक</legend>
      <div class="prefs__grid prefs__grid--2">
        <label class="opt"><input type="radio" name="numerals" value="latin"><span>1, 2, 3 — आज के अंक</span></label>
        <label class="opt"><input type="radio" name="numerals" value="dev"><span>१, २, ३ — देवनागरी अंक</span></label>
      </div>
    </fieldset>

    <fieldset class="prefs__group">
      <legend>भाषा</legend>
      <label class="prefs__field">
        <span class="sr-only">भाषा चुनें</span>
        <select class="select" data-lang-select>
          ${LANGS.map(([code, label]) => `<option value="${code}">${label}</option>`).join('')}
        </select>
      </label>
      <p class="tiny" style="margin:.7rem 0 0">मूल पाठ हिन्दी में है। अन्य भाषाएँ मशीनी अनुवाद से खुलती हैं — <a href="en.html" hreflang="en" lang="en">English summary</a> हाथ से लिखा है।</p>
    </fieldset>

    <footer class="prefs__foot">
      <p class="tiny">यह सेटिंग इसी ब्राउज़र में सुरक्षित रहती है — किसी खाते की ज़रूरत नहीं।</p>
      <div class="prefs__actions">
        <button class="btn btn--ghost btn--sm" type="button" data-prefs-reset>मूल पर लौटें</button>
        <button class="btn btn--solid btn--sm" type="button" data-close-prefs>ठीक है</button>
      </div>
    </footer>
  </div>
</dialog>`;

const SEARCH_DIALOG = `
<dialog class="searchdlg" id="search-dialog" aria-labelledby="search-title">
  <div class="searchdlg__inner">
    <h2 id="search-title" class="sr-only">पूरी साइट में खोजें</h2>
    <div class="searchdlg__bar">
      <svg viewBox="0 0 24 24" aria-hidden="true" width="18" height="18"><circle cx="10.5" cy="10.5" r="6.5" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M15.5 15.5 21 21" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>
      <input id="site-search" type="search" placeholder="गाँव, गोत्र, पद, तीर्थ, व्यक्ति…" aria-label="पूरी साइट में खोजें" autocomplete="off" spellcheck="false">
      <button class="searchdlg__close" type="button" data-close-search aria-label="खोज बंद करें">Esc</button>
    </div>
    <div class="searchdlg__scopes" role="group" aria-label="खोज का दायरा">
      <button type="button" data-scope="" aria-pressed="true">सब</button>
      <button type="button" data-scope="katha" aria-pressed="false">कथा</button>
      <button type="button" data-scope="vani" aria-pressed="false">वाणी</button>
      <button type="button" data-scope="itihas" aria-pressed="false">इतिहास</button>
      <button type="button" data-scope="tirth" aria-pressed="false">तीर्थ</button>
      <button type="button" data-scope="gaon" aria-pressed="false">गाँव</button>
    </div>
    <p class="searchdlg__status" id="search-status" aria-live="polite"></p>
    <ul class="searchdlg__results" id="search-results"></ul>
    <div class="searchdlg__suggest" id="search-suggest">
      <p class="tiny">अक्सर खोजा जाता है</p>
      <div class="searchdlg__chips">
        <button class="chip" type="button" data-suggest="समदड़ी">समदड़ी धाम</button>
        <button class="chip" type="button" data-suggest="गागरोन">गागरोन</button>
        <button class="chip" type="button" data-suggest="टोडा">टोडा</button>
        <button class="chip" type="button" data-suggest="सोलंकी">सोलंकी गोत्र</button>
        <button class="chip" type="button" data-suggest="सामूहिक विवाह">सामूहिक विवाह</button>
        <button class="chip" type="button" data-suggest="अहिंसा">अहिंसा</button>
      </div>
    </div>
    <div class="searchdlg__empty" id="search-empty" hidden>
      <p><strong>कुछ नहीं मिला।</strong> दूसरा शब्द आज़माएँ — जैसे “समदड़ी”, “सोलंकी”, “अहिंसा”, या अंग्रेज़ी में “samdari”, “gagron”।</p>
      <p class="tiny">पूरी सूची <a href="khoj.html">खोज पृष्ठ</a> पर भी है।</p>
    </div>
    <div class="searchdlg__hint">
      <span><kbd>↑</kbd><kbd>↓</kbd> चुनें</span>
      <span><kbd>Enter</kbd> खोलें</span>
      <span><kbd>/</kbd> कहीं भी खोजें</span>
      <span>हिन्दी या अंग्रेज़ी में लिखें</span>
    </div>
  </div>
</dialog>`;

/* ---------- Header ---------- */
function header(current) {
  return `<header class="site-header">
  <div class="wrap site-header__inner">
    <a class="brand" href="index.html" aria-label="${esc(SITE.name)} — मुखपृष्ठ">
      <svg class="brand__mark" viewBox="0 0 40 40" aria-hidden="true">
        <circle cx="20" cy="20" r="18.5" fill="none" stroke="currentColor" stroke-width="1"/>
        <circle cx="20" cy="20" r="15" fill="none" stroke="currentColor" stroke-width=".5" opacity=".5"/>
        <path d="M31 9 L13 27" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
        <ellipse cx="30.4" cy="9.6" rx="1.7" ry="3.4" transform="rotate(-45 30.4 9.6)" fill="none" stroke="currentColor" stroke-width="1"/>
        <path d="M29 8 C 21 3, 9 8, 8 17 C 7 25, 15 29, 19 24" fill="none" stroke="currentColor" stroke-width=".9" opacity=".7"/>
      </svg>
      <span class="brand__text">
        <span class="brand__hi">पीपा परंपरा</span>
        <span class="brand__en" lang="en">PIPA PARAMPARA</span>
      </span>
    </a>

    <nav class="nav" id="site-nav" aria-label="मुख्य मेन्यू">
      ${NAV.map(n => `<a href="${n.href}"${n.href === current ? ' aria-current="page"' : ''}>${n.label}</a>`).join('\n      ')}
      <details class="nav-more">
        <summary${NAV_EXTRA.some(n => n.href === current) ? ' class="is-current"' : ''}>और</summary>
        <div class="nav-more__panel">
          ${NAV_EXTRA.map(n => `<a href="${n.href}"${n.href === current ? ' aria-current="page"' : ''}>${n.label}</a>`).join('\n          ')}
          <a href="en.html" hreflang="en" lang="en">English summary</a>
        </div>
      </details>
      ${NAV_EXTRA.map(n => `<a class="nav__extra" href="${n.href}"${n.href === current ? ' aria-current="page"' : ''}>${n.label}</a>`).join('\n      ')}
      <a class="nav__extra" href="en.html" hreflang="en" lang="en">English summary</a>
    </nav>
    <div class="header-tools">
      <button class="tool-btn" type="button" data-open-search aria-label="पूरी साइट में खोजें" aria-keyshortcuts="/">
        <svg viewBox="0 0 24 24" aria-hidden="true" width="17" height="17"><circle cx="10.5" cy="10.5" r="6.5" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M15.5 15.5 21 21" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>
        <span class="tool-btn__label">खोजें</span>
      </button>
      <button class="tool-btn tool-btn--icon" type="button" data-open-prefs aria-label="पढ़ने की सेटिंग">
        <span aria-hidden="true">Aa</span>
      </button>
      <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav">सूची</button>
    </div>

  </div>
</header>`;
}

/* ---------- Footer ---------- */

export function footer() {
  return `<footer class="site-footer">
  <div class="wrap">
    <div class="footer__grid">
      <div class="footer__brand">
        <a class="brand" href="index.html">
          <span class="brand__text">
            <span class="brand__hi">पीपा परंपरा</span>
            <span class="brand__en">PIPA PARAMPARA</span>
          </span>
        </a>
        <p>${esc(SITE.tagline)}। एक स्वतंत्र, स्रोत-आधारित संग्रह — किसी संस्था का मुखपत्र नहीं।</p>
        <p class="footer__seal">${SEAL_SVG}</p>
      </div>
      <div>
        <h3>पढ़ें</h3>
        <ul>
          <li><a href="pipaji.html">श्री पीपाजी</a></li>
          <li><a href="vani.html">वाणी</a></li>
          <li><a href="itihas.html">इतिहास</a></li>
          <li><a href="granth.html">पूरा ग्रंथ</a></li>
          <li><a href="pehchan.html">नाम और पहचान</a></li>
        </ul>
      </div>
      <div>
        <h3>जाएँ</h3>
        <ul>
          <li><a href="samdari.html">समदड़ी धाम</a></li>
          <li><a href="tirth.html">सभी तीर्थ</a></li>
          <li><a href="panch-patti.html">पाँच पट्टी</a></li>
          <li><a href="samachar.html">समाचार</a></li>
        </ul>
      </div>
      <div>
        <h3>समाज</h3>
        <ul>
          <li><a href="sangathan.html">संगठन</a></li>
          <li><a href="pustakalaya.html">पुस्तकालय</a></li>
          <li><a href="prashnottari.html">प्रश्नोत्तरी</a></li>
          <li><a href="khoj.html">खोज</a></li>
          <li><a href="yogdan.html">योगदान दें</a></li>
        </ul>
      </div>
    </div>

    <div class="footer__bottom">
      <p>© <span data-year>२०२६</span> पीपा परंपरा। यह संकलन हमारा है; उद्धृत ग्रंथों, पाठों और चित्रों के अधिकार उनके स्वामियों के हैं। <a href="adhikar.html">स्रोत, अधिकार और अस्वीकरण</a> · संपर्क <a href="mailto:goyaltailors@gmail.com">goyaltailors@gmail.com</a>।</p>
      <span class="footer__legend">
        <span>${badge('ok', 'प्रमाणित')}</span>
        <span>${badge('trad', 'परंपरा')}</span>
        <span>${badge('local', 'स्थानीय')}</span>
        <span>${badge('diff', 'मतभेद')}</span>
      </span>
    </div>
  </div>
</footer>`;
}

/* ---------- Page shell ---------- */
export function page({
  slug,
  title,
  description,
  body,
  bodyClass = '',
  current = slug,
  noindex = false,
  lang = 'hi',
  sources = null,
  schema = null,
  ogType = 'website',
}) {
  const fullTitle = title ? `${title} · ${SITE.name}` : `${SITE.name} — ${SITE.tagline}`;
  const desc = description || SITE.desc;
  const url = canonical(slug);
  /* One card per page, produced by tools/og.mjs; the shared card is the fallback
     so a fresh clone still builds without running the renderer. */
  const ogName = slug.replace(/\.html$/, '');
  const ogFile = new URL(`../assets/og/${ogName}.png`, import.meta.url);
  const ogImage = fs.existsSync(ogFile) ? `${SITE.url}/assets/og/${ogName}.png` : `${SITE.url}/assets/og.png`;

  const crumbs = [{ name: 'मुखपृष्ठ', item: `${SITE.url}/` }];
  if (slug !== 'index.html') crumbs.push({ name: pageTitleForCite(slug), item: url });

  const graph = [
    {
      '@type': 'WebSite',
      '@id': `${SITE.url}/#website`,
      url: `${SITE.url}/`,
      name: SITE.name,
      alternateName: SITE.nameEn,
      description: SITE.desc,
      inLanguage: 'hi',
      publisher: { '@id': `${SITE.url}/#organisation` },
      potentialAction: {
        '@type': 'SearchAction',
        target: { '@type': 'EntryPoint', urlTemplate: `${SITE.url}/khoj.html?q={search_term_string}` },
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'Organization',
      '@id': `${SITE.url}/#organisation`,
      name: SITE.name,
      url: `${SITE.url}/`,
      logo: `${SITE.url}/assets/icon-512.png`,
      email: SITE.email,
      sameAs: SITE.sameAs,
    },
    {
      '@type': 'WebPage',
      '@id': `${url}#webpage`,
      url,
      name: fullTitle,
      description: desc,
      inLanguage: lang,
      isPartOf: { '@id': `${SITE.url}/#website` },
      breadcrumb: { '@id': `${url}#breadcrumb` },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${url}#breadcrumb`,
      itemListElement: crumbs.map((c, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: c.name,
        item: c.item,
      })),
    },
  ];
  if (schema) graph.push(...(Array.isArray(schema) ? schema : [schema]));

  return `<!doctype html>
<html lang="${lang}" data-page-lang="${lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(fullTitle)}</title>
<meta name="description" content="${esc(desc)}">
${noindex ? '<meta name="robots" content="noindex,follow">' : '<meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1">'}
<meta name="author" content="पीपा परंपरा संग्रह">
<meta name="theme-color" content="#f8f3e8" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#14161a" media="(prefers-color-scheme: dark)">
<link rel="canonical" href="${url}">
${slug === 'index.html' ? `<link rel="alternate" hreflang="hi" href="${SITE.url}/">\n<link rel="alternate" hreflang="en" href="${SITE.url}/en.html">\n<link rel="alternate" hreflang="x-default" href="${SITE.url}/">` : ''}
${slug === 'en.html' ? `<link rel="alternate" hreflang="en" href="${SITE.url}/en.html">\n<link rel="alternate" hreflang="hi" href="${SITE.url}/">\n<link rel="alternate" hreflang="x-default" href="${SITE.url}/">` : ''}

<meta property="og:site_name" content="${esc(SITE.name)}">
<meta property="og:title" content="${esc(fullTitle)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:type" content="${ogType}">
<meta property="og:locale" content="${lang === 'en' ? 'en_US' : 'hi_IN'}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${ogImage}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="पीपा परंपरा — ${esc(fullTitle)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(fullTitle)}">
<meta name="twitter:description" content="${esc(desc)}">
<meta name="twitter:image" content="${ogImage}">

<link rel="icon" href="assets/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="assets/icon-180.png">
<link rel="manifest" href="manifest.webmanifest">
<link rel="alternate" type="application/atom+xml" title="पीपा परंपरा — समाचार" href="feed.xml">
<link rel="preload" href="assets/fonts/tiro-dev-400n.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="assets/fonts/notoserifdev-dev-400n.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="assets/fonts.css">
<link rel="stylesheet" href="assets/styles.css">
<script>document.documentElement.classList.add('js');</script>
<script>(function(){try{var d=document.documentElement,p=JSON.parse(localStorage.getItem('pp.prefs')||'{}');if(p.theme)d.setAttribute('data-theme',p.theme);if(p.font)d.setAttribute('data-font',p.font);if(p.size)d.setAttribute('data-size',p.size);if(p.measure)d.setAttribute('data-measure',p.measure);if(p.motion)d.setAttribute('data-motion',p.motion);if(p.numerals)d.setAttribute('data-numerals',p.numerals);}catch(e){}})();</script>
<script type="application/ld+json">${jsonld({ '@context': 'https://schema.org', '@graph': graph })}</script>
</head>
<body class="${bodyClass}">
<a href="#main" class="skip">मुख्य सामग्री पर जाएँ</a>
${header(current)}
<main id="main">
${body}
${sourcesBlock(slug, sources)}
</main>
${footer()}
${PREFS_DIALOG}
${SEARCH_DIALOG}
<div id="google_translate_element" class="gt-hidden" aria-hidden="true"></div>
<script src="assets/app.js" defer></script>
</body>
</html>`;
}

/* ---------- Build helpers ---------- */
export function writePage(outDir, slug, html) {
  fs.writeFileSync(path.join(outDir, slug), html);
}
