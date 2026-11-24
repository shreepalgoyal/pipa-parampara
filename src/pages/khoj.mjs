import { page, dev, TITLES } from '../layout.mjs';

/* हर पृष्ठ का एक संक्षिप्त परिचय — जावास्क्रिप्ट बंद होने पर भी काम आए। */
const DIRECTORY = [
  ['index.html', 'मुखपृष्ठ', 'संग्रह का प्रवेश-द्वार — चार स्थान, पाँच पट्टियाँ, सात सौ वर्ष।'],
  ['pipaji.html', 'श्री पीपाजी', '३३ प्रसंगों में जीवन: गागरोन का राजा, काशी की खोज, बारह रानियाँ, टोडा के वर्ष।'],
  ['vani.html', 'वाणी', '२३ पद और दोहे, आरती, और गुरु ग्रंथ साहिब का शब्द — सरल अर्थ के साथ।'],
  ['granth.html', 'ग्रंथ', 'पूरा संग्रह एक पुस्तक-रूप में — १२ अध्याय, क्रम से पढ़ने योग्य।'],
  ['samdari.html', 'समदड़ी धाम', 'पाँच पट्टियों का संयुक्त तीर्थ, स्थापना १९७५, दो मेले, पहुँचने का रास्ता।'],
  ['panch-patti.html', 'पाँच पट्टी', '२०४ गाँव, पाँच पट्टियाँ और १२ गोत्र — नाम या गोत्र से खोजें।'],
  ['tirth.html', 'तीर्थ', 'गागरोन, टोडा, समदड़ी, मलवाड़ा, सागवाड़ा, वसई — ११ स्थल, पते और फ़ोन।'],
  ['itihas.html', 'इतिहास', 'खींची चौहान वंश, ५२ कुल, १२ रानियाँ, समय-रेखा और अभिलेख।'],
  ['pehchan.html', 'नाम और पहचान', 'दर्जी, छीपा, राजपूत — तीन मत, दो अभिलेख-प्रविष्टियाँ, और संग्रह की नीति।'],
  ['sangathan.html', 'संगठन', 'प्रकाशित पदाधिकारी, सदस्यता और कार्यालय-संपर्क।'],
  ['pustakalaya.html', 'पुस्तकालय', 'स्रोत-ग्रंथ, पाठ्यपुस्तक का पूरा अध्याय, PDF और उद्धरण।'],
  ['samachar.html', 'समाचार', 'जयंती, सामूहिक विवाह और विरासत की ख़बरें।'],
  ['prashnottari.html', 'प्रश्नोत्तरी', 'पाठ्यपुस्तक-आधारित १० प्रश्न, उत्तर और कारण।'],
  ['yogdan.html', 'योगदान दें', 'गाँव, गोत्र, दस्तावेज़ या सुधार भेजने का तरीक़ा।'],
  ['khoj.html', 'खोज', 'यही पृष्ठ — पूरी साइट में एक ही जगह से खोज।'],
  ['en.html', 'English summary', 'A hand-written English overview of the tradition and this archive.'],
];

const body = `
<section class="khoj-hero">
  <div class="wrap">
    <nav class="crumbs" aria-label="ब्रेडक्रंब"><a href="index.html">मुखपृष्ठ</a><span>/</span><span>खोज</span></nav>
    <p class="eyebrow">पूरी साइट · एक खोज</p>
    <h1>कुछ भी खोजें</h1>
    <p class="lede">गाँव का नाम, गोत्र, पद, तीर्थ, व्यक्ति, या वाणी की कोई पंक्ति — सब एक ही जगह से। खोज आपके ब्राउज़र में ही चलती है; कुछ भी किसी सर्वर को नहीं भेजा जाता।</p>

    <div class="khoj-box">
      <label class="sr-only" for="khoj-q">खोज शब्द</label>
      <input class="searchbox" id="khoj-q" type="search" placeholder="जैसे: समदड़ी, सोलंकी, गागरोन, अहिंसा, दहिया…" autocomplete="off" spellcheck="false">
      <div class="khoj-scopes" role="group" aria-label="खोज का दायरा">
        <button class="chip" type="button" data-khoj-scope="" aria-pressed="true">सब</button>
        <button class="chip" type="button" data-khoj-scope="katha" aria-pressed="false">कथा</button>
        <button class="chip" type="button" data-khoj-scope="vani" aria-pressed="false">वाणी</button>
        <button class="chip" type="button" data-khoj-scope="itihas" aria-pressed="false">इतिहास</button>
        <button class="chip" type="button" data-khoj-scope="tirth" aria-pressed="false">तीर्थ</button>
        <button class="chip" type="button" data-khoj-scope="gaon" aria-pressed="false">गाँव</button>
      </div>
      <p class="khoj-status" id="khoj-status" aria-live="polite">कुछ लिखें — नाम, गाँव, गोत्र, तीर्थ, पद या वाक्य।</p>
      <ul class="khoj-results" id="khoj-results"></ul>
      <div class="khoj-empty" id="khoj-empty" hidden>
        <div class="note">
          <span class="note__label">कुछ नहीं मिला</span>
          <p>वर्तनी बदलकर देखें, या छोटा शब्द आज़माएँ। हिन्दी में “समदड़ी” और अंग्रेज़ी में “samdari” — दोनों चलते हैं; अंक भी “२०४” और “204” एक ही तरह गिने जाते हैं।</p>
          <p class="tiny">कोई गाँव या नाम छूटा हो तो <a href="yogdan.html">बताइए</a> — सूची जीवित है।</p>
        </div>
      </div>
    </div>

    <div class="khoj-tips">
      <span class="tiny" style="color:var(--ink-3)">आज़माएँ:</span>
      <button class="chip" type="button" data-khoj-term="समदड़ी">समदड़ी</button>
      <button class="chip" type="button" data-khoj-term="सोलंकी">सोलंकी</button>
      <button class="chip" type="button" data-khoj-term="गागरोन">गागरोन</button>
      <button class="chip" type="button" data-khoj-term="दहिया">दहिया</button>
      <button class="chip" type="button" data-khoj-term="अहिंसा">अहिंसा</button>
      <button class="chip" type="button" data-khoj-term="चैत्र पूर्णिमा">चैत्र पूर्णिमा</button>
      <button class="chip" type="button" data-khoj-term="समदड़ी">सामूहिक विवाह</button>
    </div>
  </div>
</section>

<section class="section section--tight">
  <div class="wrap">
    <noscript>
      <div class="note note--warn" style="margin-bottom:2rem">
        <span class="note__label">जावास्क्रिप्ट बंद है</span>
        <p>तुरंत खोज के लिए जावास्क्रिप्ट चालू करें। तब तक नीचे पूरी सामग्री-सूची दी है — हर पृष्ठ और उसका विषय।</p>
      </div>
    </noscript>

    <header class="s-head">
      <span class="s-head__index">पूरी सूची</span>
      <h2>संग्रह में क्या-क्या है</h2>
      <p>सोलह पृष्ठ। हर पृष्ठ के नीचे उसके स्रोत भी हैं — इसीलिए यहाँ से कहीं भी जाने पर आपको यह पता रहेगा कि बात कहाँ से आई।</p>
    </header>

    <div class="table-wrap">
      <table class="data">
        <caption>${dev(DIRECTORY.length)} पृष्ठ · विषय और सामग्री</caption>
        <thead><tr><th>पृष्ठ</th><th>इसमें क्या है</th></tr></thead>
        <tbody>
          ${DIRECTORY.map(([href, title, desc]) => `<tr>
            <td><a href="${href}"><strong>${title}</strong></a></td>
            <td class="muted">${desc}</td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>

    <div class="split" style="margin-top:2.6rem">
      <div>
        <h3 style="font-size:var(--step-1)">सीधे कूदें</h3>
        <ul class="linklist" style="margin-top:.8rem">
          <li><a href="panch-patti.html#ganv-1">गाँव-सूची का पहला गाँव</a></li>
          <li><a href="granth.html#ch-2">ग्रंथ में जीवन-कथा</a></li>
          <li><a href="vani.html#verse-list">सभी पद एक साथ</a></li>
          <li><a href="itihas.html#samay">समय-रेखा</a></li>
          <li><a href="tirth.html">सभी तीर्थ</a></li>
        </ul>
      </div>
      <div>
        <h3 style="font-size:var(--step-1)">मशीन के लिए</h3>
        <p class="tiny" style="margin-top:.8rem;line-height:1.9">
          यह संग्रह खुला है — शोधकर्ता, पत्रकार और भाषा-मॉडल इसका पूरा पाठ पढ़ सकते हैं।<br>
          <a href="llms.txt">llms.txt</a> — सार और पृष्ठ-सूची<br>
          <a href="llms-full.txt">llms-full.txt</a> — पूरा पाठ, खंड-वार<br>
          <a href="search-index.json">search-index.json</a> — खोज-सूची<br>
          <a href="sitemap.xml">sitemap.xml</a> · <a href="feed.xml">feed.xml</a>
        </p>
      </div>
    </div>
  </div>
</section>
`;

export default {
  slug: 'khoj.html',
  html: page({
    slug: 'khoj.html',
    title: 'खोज — पूरी साइट में',
    description: 'गाँव, गोत्र, पद, तीर्थ, व्यक्ति या वाणी की पंक्ति — पीपा परंपरा के पूरे संग्रह में एक ही जगह से खोजें।',
    body,
    current: 'khoj.html',
    noindex: false,
    schema: {
      '@type': 'SearchResultsPage',
      '@id': 'https://pipaparampara.in/khoj.html#search',
      name: 'खोज — पीपा परंपरा',
      inLanguage: 'hi',
      url: 'https://pipaparampara.in/khoj.html',
      isPartOf: { '@id': 'https://pipaparampara.in/#website' },
      about: { '@id': 'https://pipaparampara.in/#website' },
    },
  }),
};
