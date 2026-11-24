import { page, sectionHead, badge } from '../layout.mjs';

const body = `
<section class="page-hero">
  <div class="wrap">
    <nav class="crumbs" aria-label="ब्रेडक्रंब"><a href="index.html">मुखपृष्ठ</a><span>/</span><span>नाम और पहचान</span></nav>
    <p class="eyebrow">पीपा क्षत्रिय · दर्जी · राजपूत · छीपा</p>
    <h1>नाम और पहचान</h1>
    <p class="lede">यह इस वेबसाइट का सबसे संवेदनशील पृष्ठ है। यहाँ कोई पक्ष नहीं लिया गया — केवल वह सब रखा गया है जो समाज के भीतर कहा जा रहा है, और वह जो दस्तावेज़ में है।</p>
  </div>
</section>

<section class="section section--tight">
  <div class="wrap">
    <div class="note" style="border-left-color:var(--madder);background:var(--paper-3);padding:clamp(1.8rem,4vw,2.8rem)">
      <span class="note__label">पहले यह</span>
      <p style="font-family:var(--font-display);font-size:var(--step-2);line-height:1.6;color:var(--ink)">समाज के भीतर तीन मत हैं। तीनों समाज के भीतर के हैं। इस वेबसाइट का काम किसी एक को सही ठहराना नहीं है।</p>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    ${sectionHead({
      index: '०१ — तीन मत',
      title: 'जो कहा जा रहा है',
      intro: 'नीचे तीनों स्थितियाँ उनके अपने तर्क के साथ हैं। किसी को "ग़लत" या "सही" का दर्जा नहीं दिया गया।',
    })}
    <div class="grid grid--3">
      <article class="card" style="border-top-color:var(--madder)">
        <span class="card__kicker">मत — एक</span>
        <h3>"हम पीपा क्षत्रिय दर्जी हैं"</h3>
        <p><strong>दर्जी हमारा पेशा है, क्षत्रिय हमारा वंश।</strong></p>
        <p>यह सबसे प्रचलित और सबसे संस्थागत स्थिति है। समदड़ी मंदिर ट्रस्ट, पाँच पट्टी और अखिल भारतीय पीपा क्षत्रिय महासभा — सब अपने नाम में "पीपा क्षत्रिय दर्जी" लिखते हैं।</p>
        <p>तर्क: पीपाजी के शिष्य क्षत्रिय थे; गुरु ने सिलाई अपनाई तो शिष्यों ने भी; इसलिए पेशा बदला, वंश नहीं।</p>
        <p class="tiny">${badge('ok', 'संस्थागत')} ${badge('trad', 'परंपरा')}</p>
      </article>
      <article class="card" style="border-top-color:var(--indigo)">
        <span class="card__kicker">मत — दो</span>
        <h3>"हम पीपा क्षत्रिय राजपूत हैं"</h3>
        <p><strong>"दर्जी" शब्द पेशे का है, पहचान का नहीं।</strong></p>
        <p>यह स्थिति कहती है कि जाति-नाम में पेशा जोड़ने से पहचान अधूरी रह जाती है — जैसे किसी राजपूत को केवल "राजपूत किसान" लिख देना। वंश खींची चौहान है, और वह अपने पूरे नाम के साथ जाना जाना चाहता है।</p>
        <p>तर्क: ५२ कुलों की सूची, बारह रानियों के राजवंश, और गागरोन का दुर्ग — ये सब क्षत्रिय वंश के प्रमाण हैं।</p>
        <p class="tiny">${badge('trad', 'परंपरा')} ${badge('diff', 'मतभेद')}</p>
      </article>
      <article class="card" style="border-top-color:var(--gold)">
        <span class="card__kicker">मत — तीन</span>
        <h3>"दर्जी शब्द हमारी पहचान है"</h3>
        <p><strong>यही शब्द हमारी मेहनत और हुनर का प्रमाण है।</strong></p>
        <p>यह स्थिति कहती है कि "दर्जी" हटाने की कोशिश में वही श्रम छिपाया जा रहा है जिसने समाज को जीवित रखा — और जिसे स्वयं पीपाजी ने अपनाया।</p>
        <p>तर्क: जो पेशा गुरु ने चुना, वह अपमान कैसे हो सकता है? "तरवार त्याग’र सुंई धारण करी" — सुई त्याग का चिह्न है, शर्म का नहीं।</p>
        <p class="tiny">${badge('trad', 'परंपरा')} ${badge('diff', 'मतभेद')}</p>
      </article>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap split">
    <div>
      ${sectionHead({
        index: '०२ — अभिलेख',
        title: 'जो प्रमाणित है',
        intro: 'तीनों मतों के ऊपर, तीन बातें ऐसी हैं जिन पर सबको सहमत होना चाहिए — क्योंकि वे मत नहीं, अभिलेख हैं।',
      })}
      <div class="dl">
        <div class="dl__row">
          <span class="dl__k">एक</span>
          <span class="dl__v"><strong>राजस्थान की ओ.बी.सी. सूची में दर्जी (क्रम १२) और छीपा (क्रम ८) अलग प्रविष्टियाँ हैं।</strong> यह सरकारी अभिलेख है, व्याख्या नहीं।</span>
        </div>
        <div class="dl__row">
          <span class="dl__k">दो</span>
          <span class="dl__v"><strong>समाज की सभी प्रमुख संस्थाएँ अपने नाम में "पीपा क्षत्रिय दर्जी" लिखती हैं</strong> — समदड़ी मंदिर ट्रस्ट, पाँच पट्टी, अखिल भारतीय पीपा क्षत्रिय महासभा।</span>
        </div>
        <div class="dl__row">
          <span class="dl__k">तीन</span>
          <span class="dl__v"><strong>संत पीपाजी का कोई भी प्रामाणिक ग्रंथ यह नहीं कहता कि उन्होंने कोई जाति बनाई।</strong> भक्तमाल में भी नहीं, गुरु ग्रंथ साहिब के शब्द में भी नहीं।</span>
        </div>
      </div>
      <p class="small" style="margin-top:1.4rem;max-width:64ch">तीसरी बात सबसे महत्वपूर्ण है, क्योंकि वह बहस का बोझ हल्का कर देती है: <strong>किसी की पहचान इस बात पर निर्भर नहीं है कि बहस कौन जीतता है।</strong></p>
    </div>
    <div>
      <div class="note note--warn">
        <span class="note__label">इस पृष्ठ की सीमा</span>
        <p>यह पृष्ठ इतिहास नहीं लिख रहा — यह <strong>स्थितियों का नक्शा</strong> है।</p>
        <p>कौन सही है, यह तय करने के लिए तीन चीज़ें चाहिए जो अभी किसी के पास नहीं हैं: पंद्रहवीं सदी के जाति-अभिलेख, समकालीन स्रोत, और समाज की संस्थाओं का खुला निर्णय।</p>
        <p><strong>जब तक वे नहीं हैं, हम दस्तावेज़ रखते हैं, फ़ैसला नहीं करते।</strong></p>
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    ${sectionHead({
      index: '०३ — अभिलेख',
      title: 'दो नाम, दो प्रविष्टियाँ',
      intro: 'समाज के नाम को लेकर जो चर्चा चलती है, उसकी जड़ में तीन तथ्य हैं। ये तीनों तथ्य हैं — इनके आगे की व्याख्या हर पाठक अपनी परंपरा से करता है।',
    })}
    <div class="grid grid--3">
      <div class="card">
        <span class="card__kicker">एक</span>
        <h3>दोनों अलग प्रविष्टियाँ हैं</h3>
        <p>राजस्थान की ओ.बी.सी. सूची में छीपा क्रम ८ पर है और दर्जी क्रम १२ पर। प्रशासनिक रूप से ये दो अलग श्रेणियाँ हैं — इसलिए दोनों नामों की चर्चा अलग-अलग चलती है।</p>
      </div>
      <div class="card">
        <span class="card__kicker">दो</span>
        <h3>नामदेव कौन थे</h3>
        <p>संत नामदेव, जिन्हें समाज आदर से पूजता है, परंपरा में <strong>छीपा</strong> कहे जाते हैं — दर्जी नहीं। कुछ लेखक इसे दर्जी-पहचान के विरुद्ध तर्क की तरह पढ़ते हैं; दूसरे कहते हैं कि नामदेव का पेशा और पीपाजी का पेशा दो अलग बातें हैं।</p>
        <p class="tiny">इसी बिंदु पर समाज के भीतर सबसे अधिक चर्चा होती है।</p>
      </div>
      <div class="card">
        <span class="card__kicker">तीन</span>
        <h3>जो आज जुड़ रहा है</h3>
        <p>आज सोशल मीडिया पर समाज के नाम, पेशे और इतिहास को लेकर कई तरह के दावे जोड़े जाते हैं — कुछ समाज के भीतर से, कुछ बाहर से।</p>
        <p><strong>इस संग्रह का नियम सरल है:</strong> जो बात किसी ग्रंथ, अभिलेख या संस्था से पुष्ट न हो, उसे यहाँ प्रमाण के रूप में नहीं रखा जाता।</p>
        <p class="tiny">${badge('diff', 'मतभेद')} ${badge('local', 'स्थानीय')}</p>
      </div>
    </div>
    <div class="note" style="margin-top:2rem">
      <span class="note__label">जो सबके लिए साझा है</span>
      <p>पीपाजी और नामदेव — दोनों इस समाज के आराध्य हैं। दोनों की वाणी गुरु ग्रंथ साहिब में है। दोनों ने जाति और पेशे की सीमाओं पर सवाल उठाए। <strong>उनके बीच का अंतर समाज की श्रद्धा को नहीं तोड़ता।</strong></p>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap split">
    <div class="prose">
      ${sectionHead({ index: '०४ — पाठक', title: 'इस पृष्ठ को कैसे पढ़ें' })}
      <p>अगर आप इस समाज के हैं, तो आपका अपना मत होगा — और होना चाहिए। यह पृष्ठ आपको बदलने के लिए नहीं लिखा गया।</p>
      <p>यह इसलिए लिखा गया है कि जब कोई बाहर का व्यक्ति पूछे — "आप लोग दर्जी हो या राजपूत?" — तो आपके पास एक जगह हो जिसे आप दिखा सकें, जहाँ <strong>उत्तर एक पक्ष नहीं, तीन पक्ष हैं</strong>, और जहाँ यह भी लिखा है कि तीनों समाज के भीतर से आते हैं।</p>
      <p>बाहर से आए पाठक के लिए एक बात: भारत में बहुत सी जातियाँ अपने पेशे का नाम अपने नाम में रखती हैं — लोहार, सुनार, बढ़ई, कुम्हार। <strong>यह अपमान नहीं, अभिलेख है।</strong> जो समाज अपने पेशे को अपने नाम से नहीं मिटाता, वह अपने श्रम को नहीं मिटाता।</p>
      <p>और अगर आप इस समाज के बाहर के हैं, तो यह पृष्ठ आपके लिए एक परिचय है — सम्मान के साथ पढ़िए। नाम और दिशा तय करने का अधिकार उनका है जिनका नाम इसमें है।</p>
    </div>
    <div>
      <div class="note" style="background:var(--paper-3)">
        <span class="note__label">एक वाक्य में</span>
        <p style="font-family:var(--font-display);font-size:var(--step-1);line-height:1.7">पीपाजी ने कोई जाति नहीं बनाई। जो बना, वह उनके शिष्यों का समाज था — और वह समाज अपने नाम पर आज भी सोचता है। यह सोच उसकी ज़िंदगी का चिह्न है, उसकी मौत का नहीं।</p>
      </div>
      <div class="dl" style="margin-top:1.6rem">
        <div class="dl__row"><span class="dl__k">स्रोत</span><span class="dl__v">राजस्थान ओ.बी.सी. सूची · भक्तमाल (१५८५) · क्षितिज कक्षा १० · समाज की संस्थाओं के नाम और विवरण</span></div>
        <div class="dl__row"><span class="dl__k">चर्चा</span><span class="dl__v">समाज के भीतर प्रचलित मत · darjirajput.blogspot.com · missionkuldevi.in</span></div>
        <div class="dl__row"><span class="dl__k">नियम</span><span class="dl__v">कोई पक्ष नहीं लिया गया; कोई व्यक्ति नाम से नहीं आँका गया</span></div>
      </div>
    </div>
  </div>
</section>

<section class="section section--tight">
  <div class="wrap" style="text-align:center">
    <p class="eyebrow" style="justify-content:center">आगे</p>
    <h2 style="max-width:26ch;margin-inline:auto">सुई और धागे की तीन व्याख्याएँ</h2>
    <p class="lede" style="margin:1rem auto 0;text-align:center">इतिहास पृष्ठ पर — पेशा, शिष्य-परंपरा, और प्रतीक। तीनों एक साथ।</p>
    <a class="btn btn--ghost" href="itihas.html#gotra" style="margin-top:1.8rem">इतिहास पढ़ें</a>
  </div>
</section>
`;

export default {
  slug: 'pehchan.html',
  html: page({
    slug: 'pehchan.html',
    title: 'नाम और पहचान',
    description: 'पीपा क्षत्रिय, दर्जी, राजपूत, छीपा — समाज के भीतर के तीन मत, प्रमाणित अभिलेख, और इस संग्रह की स्थिति।',
    body,
    current: 'pehchan.html',
  }),
};
