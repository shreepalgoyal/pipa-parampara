import { page, sectionHead, dev } from '../layout.mjs';
import { VILLAGES, PATTIS } from '../data.mjs';

/* ---------- normalise gotras ---------- */
const CANON = [
  'परमार', 'सोलंकी', 'गोयल', 'चौहान', 'डाभी', 'परिहार',
  'भाटी', 'दहिया', 'राठौड़', 'दैया', 'तंवर', 'राकेशा',
];

const MAP = {
  'डाभि': 'डाभी',
  'पड़िहारिया': 'परिहार', 'पडियार': 'परिहार', 'पड़ियार': 'परिहार', 'पड़ीहरिया': 'परिहार',
  'राकेशा (राखेचा)': 'राकेशा',
  'सभी': 'सभी',
};

const norm = (g) => MAP[g] || g;

const rows = VILLAGES.map(v => {
  const list = v.gotras.split(/[,،]/).map(s => s.trim()).filter(Boolean).map(norm);
  const uniq = [...new Set(list)];
  return { ...v, list: uniq, display: uniq.length ? uniq.join(', ') : '—' };
});

const freq = {};
for (const r of rows) for (const g of r.list) freq[g] = (freq[g] || 0) + 1;
const gotraBars = CANON
  .map(g => ({ g, n: freq[g] || 0 }))
  .filter(x => x.n > 0)
  .sort((a, b) => b.n - a.n);
const maxG = Math.max(...gotraBars.map(x => x.n));

const pattiStats = PATTIS.map(p => ({
  ...p,
  n: rows.filter(r => r.patti === p.key).length,
  gotras: [...new Set(rows.filter(r => r.patti === p.key).flatMap(r => r.list))].filter(g => g !== 'सभी').length,
}));
const maxP = Math.max(...pattiStats.map(p => p.n));

const body = `
<section class="page-hero">
  <div class="wrap">
    <nav class="crumbs" aria-label="ब्रेडक्रंब"><a href="index.html">मुखपृष्ठ</a><span>/</span><span>पाँच पट्टी</span></nav>
    <p class="eyebrow">२०४ गाँव · ५ पट्टियाँ · १२ गोत्र</p>
    <h1>अपना गाँव खोजें</h1>
    <p class="lede">यह वह पृष्ठ है जो इंटरनेट पर कहीं और नहीं है — पाँच पट्टियों के सभी गाँव, उनके गोत्र के साथ। नाम से खोजें, पट्टी से छाँटें, या गोत्र से देखें कि आपके गोत्र के गाँव कहाँ-कहाँ हैं।</p>
  </div>
</section>

<section class="section section--tight">
  <div class="wrap">
    <div class="stats">
      <div class="stat"><span class="stat__n">२०४</span><span class="stat__l">गाँव</span></div>
      <div class="stat"><span class="stat__n">५</span><span class="stat__l">पट्टियाँ</span></div>
      <div class="stat"><span class="stat__n">१२</span><span class="stat__l">गोत्र, ज़मीन पर</span></div>
      <div class="stat"><span class="stat__n">५२</span><span class="stat__l">गोत्र, वंशावली में</span></div>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    ${sectionHead({
      index: '०१ — पट्टियाँ',
      title: 'पाँच हिस्से, एक समाज',
      intro: 'पट्टी कोई गोत्र नहीं है — यह गाँवों का क्षेत्रीय संघ है। हर पट्टी समदड़ी मंदिर के ट्रस्ट में एक सीट रखती है, और रीति-रिवाजों में बारी-बारी हिस्सा लेती है।',
    })}
    <div class="grid grid--3">
      ${pattiStats.map((p, i) => `<article class="card">
        <span class="card__kicker">पट्टी — ${dev(String(i + 1).padStart(2, '0'))}</span>
        <h3>${p.hi}</h3>
        <p style="font-family:var(--font-display);font-size:2rem;line-height:1;color:var(--madder);margin:.4rem 0 .2rem">${dev(p.n)}</p>
        <p class="tiny" style="margin-bottom:.5rem">गाँव · ${dev(p.gotras)} गोत्र</p>
        <p>${p.note}</p>
      </article>`).join('')}
    </div>
    <div class="bars" style="margin-top:2.6rem;max-width:640px">
      ${pattiStats.map(p => `<div class="bar">
        <span class="bar__label">${p.hi}</span>
        <span class="bar__track"><span class="bar__fill" style="--w:${(p.n / maxP * 100).toFixed(1)}%"></span></span>
        <span class="bar__n">${dev(p.n)}</span>
      </div>`).join('')}
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap split">
    <div>
      ${sectionHead({
        index: '०२ — गोत्र',
        title: 'गोत्र वितरण',
        intro: 'नीचे वही संख्या है जो गाँवों की सूची से निकलती है — वंशावली की ५२-कुल सूची से नहीं।',
      })}
      <div class="bars reveal">
        ${gotraBars.map(x => `<div class="bar">
          <span class="bar__label">${x.g}</span>
          <span class="bar__track"><span class="bar__fill" style="--w:${(x.n / maxG * 100).toFixed(1)}%"></span></span>
          <span class="bar__n">${dev(x.n)}</span>
        </div>`).join('')}
      </div>
      <p class="tiny" style="margin-top:1.2rem">एक गाँव में एक से अधिक गोत्र हो सकते हैं, इसलिए संख्याओं का जोड़ २०४ से अधिक है।</p>
    </div>
    <div>
      <div class="note" style="background:var(--paper-3)">
        <span class="note__label">गोत्र क्या है?</span>
        <p><strong>गोत्र वंशावली नहीं, विवाह का नियम है।</strong> यह बताता है कि आप किसके साथ विवाह नहीं कर सकते — एक ही गोत्र में विवाह वर्जित है।</p>
        <p>इसीलिए दो सूचियाँ हैं और दोनों सच हैं:</p>
        <p><strong>५२ कुल</strong> — वंशावली की सूची, जो कहती है कि हमारे पूर्वज कौन-कौन से राजवंशों से आए। यह <em>चार्टर</em> है — आदर्श, ऐतिहासिक दावा।</p>
        <p><strong>१२ गोत्र</strong> — गाँवों की सूची में जो असल में मिलते हैं। यह <em>ज़मीन</em> है — आज का सच।</p>
        <p><strong>दोनों अलग सवालों के जवाब हैं।</strong> एक पूछता है "हम कहाँ से आए", दूसरा पूछता है "हम किससे ब्याह करेंगे"। इन्हें आपस में लड़ाना ज़रूरी नहीं।</p>
        <p class="tiny" style="margin-top:.9rem"><a href="itihas.html#gotra">पूरा विवेचन — ५२ कुल और १२ गोत्र →</a></p>
      </div>
    </div>
  </div>
</section>

<section class="section" id="suchi">
  <div class="wrap">
    ${sectionHead({
      index: '०३ — सूची',
      title: 'सभी २०४ गाँव',
      intro: 'नाम, पट्टी या गोत्र — किसी भी तरह से खोजें। सूची जावास्क्रिप्ट के बिना भी पूरी दिखती है।',
    })}
    <div class="filters" style="align-items:flex-end">
      <div class="field" style="margin:0;flex:1 1 240px;max-width:360px">
        <label for="village-q">गाँव का नाम</label>
        <input class="searchbox" id="village-q" type="search" placeholder="जैसे: आसोतरा, बालोतरा…" autocomplete="off">
      </div>
      <div class="field" style="margin:0;flex:0 1 190px">
        <label for="village-patti">पट्टी</label>
        <select class="searchbox select" id="village-patti">
          <option value="">सभी पट्टियाँ</option>
          ${PATTIS.map(p => `<option value="${p.key}">${p.hi}</option>`).join('')}
        </select>
      </div>
      <div class="field" style="margin:0;flex:0 1 170px">
        <label for="village-gotra">गोत्र</label>
        <select class="searchbox select" id="village-gotra">
          <option value="">सभी गोत्र</option>
          ${CANON.map(g => `<option value="${g}">${g}</option>`).join('')}
        </select>
      </div>
      <p class="tiny" style="margin:0 0 .8rem"><strong id="village-count">${dev(rows.length)}</strong> गाँव दिख रहे हैं</p>
    </div>

    <div class="table-wrap">
      <table class="data" id="village-table">
        <caption>पाँच पट्टियों की गाँव-सूची · स्रोत: panchpatti.in (पाँच पट्टी पृष्ठ), २०२६ में पुनःप्राप्त</caption>
        <thead><tr><th>गाँव</th><th>पट्टी</th><th>गोत्र</th></tr></thead>
        <tbody id="village-body">
          ${rows.map(r => `<tr data-name="${r.name}" data-patti-key="${r.patti}" data-gotras="${r.list.join(' ')}">
            <td>${r.name}</td>
            <td class="muted">${PATTIS.find(p => p.key === r.patti).hi.replace(' पट्टी', '')}</td>
            <td>${r.display}</td>
          </tr>`).join('\n          ')}
        </tbody>
      </table>
    </div>
    <p class="tiny" id="village-empty" hidden style="margin-top:1.2rem;color:var(--madder)">इस खोज से कोई गाँव नहीं मिला। नाम की वर्तनी बदलकर देखें, या पट्टी/गोत्र हटा दें।</p>

    <noscript>
      <div class="note" style="margin-top:1.5rem">
        <span class="note__label">जावास्क्रिप्ट बंद है</span>
        <p>ऊपर की पूरी सूची पढ़ी जा सकती है — केवल खोज और छँटाई काम नहीं करेगी। ब्राउज़र में खोजने के लिए <strong>Ctrl+F</strong> (या Mac पर ⌘F) दबाएँ।</p>
      </div>
    </noscript>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="note note--warn">
      <span class="note__label">इस सूची के बारे में</span>
      <p>यह सूची <strong>panchpatti.in</strong> के पाँच पट्टी पृष्ठों से ली गई है, जिन्हें २०२६ में पुनःप्राप्त किया गया। यह वही सूची है जिसे समाज की संस्थाएँ मानती हैं — पर यह ईश्वरीय नहीं है।</p>
      <p>वर्तनी में अंतर मिलेगा: <strong>डाभी / डाभि</strong>, <strong>पड़िहारिया / पड़ियार / परिहार</strong>, <strong>राकेशा / राखेचा</strong> — ये एक ही गोत्र के अलग रूप हैं। यहाँ उन्हें एक नाम के नीचे लाया गया है।</p>
      <p><strong>कोई गाँव छूट गया हो, या गोत्र ग़लत लिखा हो, तो <a href="yogdan.html">हमें बताइए</a>।</strong> यह सूची इसीलिए अधूरी है कि कोई उसे पूरा करने वाला नहीं था।</p>
    </div>
  </div>
</section>
`;

export default {
  slug: 'panch-patti.html',
  html: page({
    slug: 'panch-patti.html',
    title: 'पाँच पट्टी — २०४ गाँव की सूची',
    description: 'पीपा क्षत्रिय दर्जी समाज के २०४ गाँव, पाँच पट्टियों और गोत्र के साथ — खोजने योग्य पूरी सूची।',
    body,
    current: 'panch-patti.html',
  }),
};
