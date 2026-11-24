import { page, sectionHead, verseBlock, badge, dev } from '../layout.mjs';
import { VERSES, AARTI, SHABAD } from '../data.mjs';

const THEMES = ['उद्यम', 'अहिंसा', 'ज्ञान', 'गुरु', 'समानता', 'वैराग्य', 'नीति'];

const attr = (v) => String(v || '')
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;');

const curated = [0, 1, 14, 11, 5];

const vcard = (v, i) => `<article class="vcard" id="pad-${i + 1}" data-text="${attr(v.text)}" data-theme="${attr(v.theme)}" data-type="${attr(v.type)}" data-gloss="${attr(v.gloss)}">
  <p class="vcard__text">${v.text.replace(/\n/g, '<br>')}</p>
  ${v.gloss ? `<p class="vcard__gloss">${v.gloss}</p>` : ''}
  <div class="vcard__meta">
    <span class="badge">${v.type}</span>
    ${v.theme.split(' ').map(t => `<span class="badge">${t}</span>`).join('')}
    <button class="vcard__action vcard__action--poster" type="button" data-poster="${attr(v.text)}" data-poster-src="${attr(v.source)}" title="पोस्टर बनाएँ — साझा करने के लिए तस्वीर" aria-label="इस पद का पोस्टर बनाएँ">पोस्टर</button>
    <button class="vcard__action vcard__action--link" type="button" data-copy-anchor="pad-${i + 1}" title="इस पद का सीधा लिंक कॉपी करें" aria-label="इस पद का लिंक कॉपी करें">लिंक</button>
  </div>
</article>`;

const body = `
<section class="page-hero">
  <div class="wrap">
    <nav class="crumbs" aria-label="ब्रेडक्रंब"><a href="index.html">मुखपृष्ठ</a><span>/</span><span>वाणी</span></nav>
    <p class="eyebrow">दोहे · पद · साखी · आरती · शब्द</p>
    <h1>जो सुई चलाते हुए कहा गया</h1>
    <p class="lede">पीपाजी की वाणी का सबसे बड़ा संग्रह — समाज के अपने संकलनों से, पाठ्यपुस्तक से, और गुरु ग्रंथ साहिब के शब्द से। हर पद के साथ उसका सरल अर्थ और स्रोत।</p>
  </div>
</section>

<section class="section">
  <div class="wrap">
    ${sectionHead({
      index: '०१ — पाँच पद',
      title: 'अगर केवल पाँच पढ़ें',
      intro: 'ये पाँच पद पूरी परंपरा का सार हैं — काम, अहिंसा, समानता, गुरु और संकल्प।',
    })}
    <div class="stack-lg">
      ${curated.map((i, n) => {
        const v = VERSES[i];
        return `<div>
          <p class="tiny" style="margin-bottom:.6rem">${dev(String(n + 1).padStart(2, '0'))} · ${v.theme}</p>
          ${verseBlock({ text: v.text, gloss: v.gloss, source: v.source, large: true })}
        </div>`;
      }).join('')}
    </div>
  </div>
</section>

<section class="section" id="corpus">
  <div class="wrap">
    ${sectionHead({
      index: '०२ — संग्रह',
      title: 'पूरा संग्रह',
      intro: 'तेईस पद और दोहे। नाम से, विषय से या स्रोत से छाँटें।',
    })}
    <div class="filters">
      <input class="searchbox" id="verse-q" type="search" placeholder="शब्द खोजें — जैसे: उद्यम, गुरु, राम…" aria-label="वाणी में खोजें">
      <button class="chip" data-theme="" aria-pressed="true">सभी</button>
      ${THEMES.map(t => `<button class="chip" data-theme="${t}" aria-pressed="false">${t}</button>`).join('')}
      <span class="tiny" style="margin-left:auto"><strong id="verse-count">${dev(VERSES.length)}</strong> पद</span>
    </div>
    <div class="vgrid" id="verse-list">
      ${VERSES.map((v, i) => vcard(v, i)).join('\n')}
    </div>
  </div>
</section>

<section class="section" id="aarti">
  <div class="wrap split">
    <div>
      ${sectionHead({ index: '०३ — आरती', title: 'ॐ जय पीपा स्वामी' })}
      <div class="verse verse--lg" style="border-left-color:var(--madder)">
        <div class="verse__text" style="font-size:var(--step-1);line-height:2">
          ${AARTI.map(l => l === '' ? '<br>' : l).join('<br>')}
        </div>
        <cite class="verse__src">स्रोत: panchpatti.in और pkds.in — दो स्वतंत्र प्रतियाँ, एक ही पाठ</cite>
      </div>
    </div>
    <div>
      <div class="note">
        <span class="note__label">पाठ की पुष्टि</span>
        <p>यह आरती दो अलग-अलग वेबसाइटों से मिली — <strong>panchpatti.in</strong> (समदड़ी ट्रस्ट के करीब) और <strong>pkds.in</strong> (हुबली शाखा)। दोनों का पाठ लगभग अक्षरशः एक है।</p>
        <p>इसका मतलब है कि यह केवल एक व्यक्ति का संस्करण नहीं, बल्कि पूरे समाज में प्रचलित पाठ है।</p>
        <p class="tiny" style="margin-top:.8rem">आरती में "सिंधु माही समाये" पंक्ति द्वारका-समाधि की परंपरा कहती है। भक्तमाल इसे मृत्यु नहीं, बिलोकेशन बताता है — दोनों को <a href="tirth.html">तीर्थ</a> पृष्ठ पर समझाया गया है।</p>
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap split">
    <div>
      ${sectionHead({ index: '०४ — शब्द', title: 'गुरु ग्रंथ साहिब में पीपाजी' })}
      <p class="prose" style="margin-bottom:1.5rem">गुरु ग्रंथ साहिब में पीपाजी का एक शब्द है — राग धनासरी में। यह उसी शब्द की राजस्थानी वर्तनी है, जैसी कक्षा १० की क्षितिज पुस्तक में छपी है।</p>
      ${verseBlock({ text: SHABAD.text, gloss: SHABAD.gloss, source: 'गुरु ग्रंथ साहिब · राग धनासरी', large: true })}
      <p class="small">${SHABAD.note}</p>
    </div>
    <div>
      <div class="note" style="background:var(--paper-3)">
        <span class="note__label">एक बात ध्यान में</span>
        <p>पीपाजी की वाणी <strong>निर्गुण</strong> और <strong>सगुण</strong> के बीच झूलती है — और यही उसकी ख़ूबसूरती है। वे "काया ही देवल" कहते हैं, पर भवानी के मंदिर में चालीस मन अन्न भी भेजते हैं।</p>
        <p>उनके अपने दोहे इस द्वंद्व को हल करते हैं:</p>
        <blockquote style="margin:1rem 0 0;font-family:var(--font-display);font-size:1.1rem;line-height:1.75">सगुण मीठो खांड सो, निर्गुण कड़वो नीम।<br>पीपा गुरु जो पुरस दे, निर्भय होकर जीम॥</blockquote>
        <p style="margin-top:.9rem">सगुण खांड जैसा मीठा, निर्गुण नीम जैसा कड़वा — पर गुरु जो दे, उसे निर्भय होकर ग्रहण करो। यह वह उदारता है जिसने इस समाज को दोनों धाराओं में जगह दी।</p>
      </div>
    </div>
  </div>
</section>

<section class="section section--tight">
  <div class="wrap">
    <div class="dl">
      <div class="dl__row"><span class="dl__k">स्रोत — वागड़</span><span class="dl__v">श्री पीपा क्षत्रिय दर्जी समाज वागड़, "संत पीपाजी महाराज के दोहे" — १९ दोहे + १५ नीतिगत दोहे</span></div>
      <div class="dl__row"><span class="dl__k">स्रोत — पाठ्यपुस्तक</span><span class="dl__v">राजस्थान बोर्ड, <em>क्षितिज</em>, कक्षा १०, पाठ १८</span></div>
      <div class="dl__row"><span class="dl__k">स्रोत — आरती</span><span class="dl__v">panchpatti.in · pkds.in</span></div>
      <div class="dl__row"><span class="dl__k">स्रोत — शब्द</span><span class="dl__v">गुरु ग्रंथ साहिब, राग धनासरी</span></div>
      <div class="dl__row"><span class="dl__k">वर्तनी</span><span class="dl__v">मूल संकलनों की वर्तनी जहाँ तक संभव हो रखी गई है — इसलिए "सांधा", "थाळी", "माँय" जैसे रूप मिलेंगे। ये अशुद्धियाँ नहीं, राजस्थानी रूप हैं।</span></div>
    </div>
  </div>
</section>
`;

export default {
  slug: 'vani.html',
  html: page({ slug: 'vani.html', title: 'वाणी', description: 'पीपाजी के दोहे, पद, साखी, आरती और गुरु ग्रंथ साहिब का शब्द — अर्थ और स्रोत के साथ।', body, current: 'vani.html' }),
};
