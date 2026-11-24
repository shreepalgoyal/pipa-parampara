import { page, sectionHead, badge } from '../layout.mjs';
import { DOCS, BIBLIOGRAPHY } from '../data.mjs';

const body = `
<section class="page-hero">
  <div class="wrap">
    <nav class="crumbs" aria-label="ब्रेडक्रंब"><a href="index.html">मुखपृष्ठ</a><span>/</span><span>पुस्तकालय</span></nav>
    <p class="eyebrow">मूल ग्रंथ · पाठ्यपुस्तक · जीवनी · शोध</p>
    <h1>पुस्तकालय</h1>
    <p class="lede">पीपाजी पर जो कुछ छपा है — जो मिल गया, वह यहाँ है; जो नहीं मिला, वह भी लिखा है। हर दस्तावेज़ के साथ उसका स्रोत, उसकी सीमा और उसका पूरा हवाला।</p>
  </div>
</section>

<section class="section">
  <div class="wrap">
    ${sectionHead({
      index: '०१ — दस्तावेज़',
      title: 'जो अब पढ़ा जा सकता है',
      intro: 'तीन दस्तावेज़ पूरे पाठ के साथ उपलब्ध हैं। बाकी के लिंक बाहर जाते हैं।',
    })}
    <div class="grid grid--2">
      ${DOCS.map(d => `<article class="card" style="padding-top:1.4rem">
        <span class="card__kicker">${d.kind}</span>
        <h3>${d.title}</h3>
        <p class="tiny" style="margin:.2rem 0 .4rem">${d.meta}</p>
        <p>${d.note}</p>
        <a class="card__link" href="${d.href}"${d.href.startsWith('http') ? ' target="_blank" rel="noopener"' : ''}>${d.cta}</a>
      </article>`).join('')}
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap split">
    <div>
      ${sectionHead({ index: '०२ — ग्रंथ-सूची', title: 'हवाले के लिए' })}
      <div class="table-wrap">
        <table class="data">
          <caption>पीपाजी पर मुख्य लिखित स्रोत</caption>
          <thead><tr><th>लेखक</th><th>ग्रंथ</th><th>काल</th><th>क्या मिलता है</th></tr></thead>
          <tbody>
            ${BIBLIOGRAPHY.map(b => `<tr><td>${b[0]}</td><td>${b[1]}</td><td class="muted">${b[2]}</td><td class="muted">${b[3]}</td></tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>
    <div>
      <div class="note note--warn">
        <span class="note__label">जो अभी नहीं मिला</span>
        <p><strong>श्री पीपा प्रकाश</strong> — समाज की मासिक/स्मरणिका। केवल छपाई में; कोई अंक डिजिटल नहीं मिला।</p>
        <p><strong>डॉ. पूरन सहगल, <em>संत पीपाजी</em></strong> — विक्रमादित्य शोधपीठ, उज्जैन। यही सबसे संभावित विद्वान-कृति है, और यही अभी तक नहीं मिली।</p>
        <p><strong>Sant Pipaji and His Society</strong> — २८ पृष्ठ, Scribd पर केवल चित्र-रूप में। OCR के लिए डाउनलोड आवश्यक है।</p>
        <p style="margin-top:.9rem"><strong>आपके पास इनमें से कोई हो तो <a href="yogdan.html">बताइए</a>।</strong> यह पुस्तकालय इसीलिए अधूरा है कि ये किताबें किसी के घर में बंद हैं।</p>
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    ${sectionHead({
      index: '०३ — पाठ',
      title: 'OCR के बारे में एक ईमानदार बात',
      intro: 'जो दस्तावेज़ स्कैन से निकाले गए हैं, उनमें ग़लतियाँ हो सकती हैं। यह छिपाने वाली बात नहीं है।',
    })}
    <div class="split">
      <div class="prose">
        <p>पुरानी हिन्दी किताबों के स्कैन से पाठ निकालना कठिन है — ख़ासकर जब मूल PDF में फ़ॉन्ट सबसेट में एम्बेड हों। कुछ अक्षर मिलते-जुलते रूपों में आते हैं, मात्राएँ टूटती हैं, और "श/ष/स" जैसे अंतर मिट जाते हैं।</p>
        <p>इस वेबसाइट पर जो पाठ OCR से आया है, उसे <strong>मूल पृष्ठ की छवि से मिलाकर</strong> जहाँ तक संभव हो ठीक किया गया है। फिर भी ग़लती की गुंजाइश है।</p>
        <p><strong>इसीलिए हर दस्तावेज़ के साथ मूल PDF भी दिया गया है।</strong> जहाँ कोई शब्द संदिग्ध लगे, वहाँ PDF देखें — वही अंतिम प्रमाण है।</p>
      </div>
      <div>
        <div class="dl">
          <div class="dl__row"><span class="dl__k">क्षितिज, पाठ १८</span><span class="dl__v">मूल स्कैन, ५ पृष्ठ · ${badge('ok', 'प्रमाणित')}</span></div>
          <div class="dl__row"><span class="dl__k">जीवन-गाथा</span><span class="dl__v">मूल स्कैन, ११ पृष्ठ · ${badge('trad', 'परंपरा')}</span></div>
          <div class="dl__row"><span class="dl__k">भक्तमाल</span><span class="dl__v">अंग्रेज़ी अनुवाद, बाहरी लिंक · ${badge('ok', 'प्रमाणित')}</span></div>
          <div class="dl__row"><span class="dl__k">दोहे</span><span class="dl__v">वागड़ ब्लॉग से, पाठ जैसा है · ${badge('trad', 'परंपरा')}</span></div>
        </div>
        <p class="tiny" style="margin-top:1rem">यदि आपको कोई पाठ-त्रुटि मिले, तो पृष्ठ संख्या के साथ बताइए — सुधार कर दिया जाएगा।</p>
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    ${sectionHead({ index: '०४ — हवाला', title: 'इस वेबसाइट को कैसे उद्धृत करें' })}
    <div class="note" style="font-family:var(--font-ui);font-size:.9rem;line-height:1.9">
      <p>पीपा परंपरा, "&lt;पृष्ठ का नाम&gt;", <em>pipaparampara.in</em>, अभिगम &lt;तिथि&gt;।</p>
      <p style="margin-top:.6rem">उदाहरण:<br>
      पीपा परंपरा, "श्री पीपाजी", <em>pipaparampara.in/pipaji.html</em>, अभिगम २० नवंबर २०२६।</p>
    </div>
    <p class="tiny" style="margin-top:1rem;max-width:70ch">यह वेबसाइट स्वयं कोई मूल स्रोत नहीं है — यह स्रोतों का संग्रह है। शोध-लेख में जहाँ संभव हो, मूल ग्रंथ (भक्तमाल, क्षितिज, जीवन-गाथा) का हवाला दें, इस वेबसाइट का नहीं।</p>
  </div>
</section>

<section class="section section--tight">
  <div class="wrap" style="text-align:center">
    <p class="eyebrow" style="justify-content:center">अनुरोध</p>
    <h2 style="max-width:26ch;margin-inline:auto">किताबें किसी के घर में बंद हैं</h2>
    <p class="lede" style="margin:1rem auto 0;text-align:center">पुरानी पत्रिकाएँ, स्मरणिकाएँ, हाथ से लिखे काग़ज़, जयंती के सौवेनियर — ये सब इतिहास हैं। इन्हें स्कैन करके लौटा दिया जाएगा।</p>
    <a class="btn btn--solid" href="yogdan.html" style="margin-top:1.8rem">कुछ भेजें</a>
  </div>
</section>
`;

export default {
  slug: 'pustakalaya.html',
  html: page({
    slug: 'pustakalaya.html',
    title: 'पुस्तकालय',
    description: 'भक्तमाल का पीपा-प्रसंग, क्षितिज कक्षा १० पाठ १८, निमाड़-मालवा जीवन-गाथा, दोहे और पूरी ग्रंथ-सूची।',
    body,
    current: 'pustakalaya.html',
  }),
};
