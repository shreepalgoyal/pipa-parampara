import { page, sectionHead, badge, dev } from '../layout.mjs';
import { CLANS, QUEENS, TIMELINE } from '../data.mjs';

const body = `
<section class="page-hero">
  <div class="wrap">
    <nav class="crumbs" aria-label="ब्रेडक्रंब"><a href="index.html">मुखपृष्ठ</a><span>/</span><span>इतिहास</span></nav>
    <p class="eyebrow">खींची चौहान · ५२ कुल · बारह रानियाँ · सुई और धागा</p>
    <h1>इतिहास</h1>
    <p class="lede">एक दुर्ग, एक वंश, बावन कुल, बारह रानियाँ — और एक सुई। यह पृष्ठ वह सब रखता है जो दस्तावेज़ में है, और वह भी जो केवल परंपरा में है।</p>
  </div>
</section>

<section class="section">
  <div class="wrap split">
    <div class="prose">
      ${sectionHead({ index: '०१ — वंश', title: 'खींची चौहान और गागरोन' })}
      <p>गागरोन का दुर्ग <strong>११९५ ई.</strong> में परमार राजा <strong>बिजलदेव</strong> ने बसाया था — कालीसिंध और आहू के संगम पर, जहाँ पानी तीन ओर से घेरता है और चौथी ओर गहरी खाई। इसे <strong>गलकंगिरि</strong> भी कहते हैं, गर्ग ऋषि के तप की स्मृति में।</p>
      <p>बाद में यह दुर्ग <strong>खींची चौहानों</strong> के हाथ में आया — और यही वह वंश है जिसमें पीपाजी का जन्म हुआ।</p>
      <p><strong>१३०० ई.</strong> में अलाउद्दीन खिलजी ने आक्रमण किया; उस समय दुर्ग पर राजा <strong>जैतसी</strong> का राज था। यह युद्ध-परंपरा का आरंभ है, और इसे पीपाजी की कथा से अलग नहीं किया जा सकता।</p>
      <p>फिर <strong>अचलदास खींची</strong> — मालवा के सुल्तान होशंगशाह के आक्रमण में वीरगति को प्राप्त हुए। रानियों ने <strong>जौहर कुंड</strong> में जौहर किया। कहा जाता है कि होशंगशाह उस पराक्रम से इतना प्रभावित हुआ कि उसने अचलदास के कक्ष को दरगाह में बदल दिया।</p>
      <p>उनके उत्तराधिकारी <strong>पल्हाणदेव</strong> ने गागरोन वापस लिया। <strong>१५३२</strong> में गुजरात के बहादुरशाह ने आक्रमण किया, और सोलहवीं सदी में यह दुर्ग कोटा के राजा मुकुंदसिंह के हाथ में चला गया — <strong>१९४८</strong> तक कोटा के पास रहा।</p>
      <p><strong>२०१३</strong> में गागरोन को राजस्थान के पहाड़ी दुर्गों के साथ यूनेस्को विश्व धरोहर का दर्जा मिला।</p>
      <div class="note" style="margin-top:1.6rem">
        <span class="note__label">दो स्वर, एक वंश</span>
        <p>यह वंश दोनों चीज़ों का वारिस है — <strong>जौहर करने वाली रानियाँ</strong> और <strong>राज्य छोड़ने वाला संत</strong>। पीपाजी का त्याग तभी अर्थ रखता है जब यह याद रहे कि वे लड़ भी सकते थे।</p>
      </div>
    </div>
    <div>
      <div class="dl">
        <div class="dl__row"><span class="dl__k">११९५</span><span class="dl__v">बिजलदेव द्वारा दुर्ग की स्थापना</span></div>
        <div class="dl__row"><span class="dl__k">१३००</span><span class="dl__v">अलाउद्दीन खिलजी का आक्रमण; राजा जैतसी</span></div>
        <div class="dl__row"><span class="dl__k">१५वीं सदी</span><span class="dl__v">अचलदास खींची और जौहर</span></div>
        <div class="dl__row"><span class="dl__k">१५वीं सदी</span><span class="dl__v">पीपाजी — जन्म, राज्य, वैराग्य</span></div>
        <div class="dl__row"><span class="dl__k">१५३२</span><span class="dl__v">बहादुरशाह का आक्रमण</span></div>
        <div class="dl__row"><span class="dl__k">१९४८</span><span class="dl__v">कोटा राज से भारत में विलय</span></div>
        <div class="dl__row"><span class="dl__k">२०१३</span><span class="dl__v">यूनेस्को विश्व धरोहर</span></div>
      </div>
      <p class="tiny" style="margin-top:1rem">स्रोत: गागरोन दुर्ग अभिलेख, राजस्थान पर्यटन, यूनेस्को; स्थानीय खींची वंश-परंपरा।</p>
    </div>
  </div>
</section>

<section class="section" id="samay">
  <div class="wrap">
    ${sectionHead({
      index: '०२ — समय',
      title: 'तीन तिथियाँ, एक जयंती',
      intro: 'पीपाजी के जन्म पर तीन मत हैं। यह कोई असामान्य बात नहीं — पंद्रहवीं सदी के संतों की तिथियाँ प्रायः ऐसे ही मिलती हैं। जयंती पर मतभेद नहीं है।',
    })}
    <div class="table-wrap">
      <table class="data">
        <caption>तीन तिथि-प्रणालियाँ</caption>
        <thead><tr><th>मत</th><th>जन्म</th><th>आधार</th><th>स्थिति</th></tr></thead>
        <tbody>
          <tr><td>समाज की गणना</td><td>वि.सं. १३८० · ≈ १३२३ ई.</td><td>जयंती-गणना; २०२६ में "७०३वीं जयंती"</td><td>${badge('trad', 'परंपरा')}</td></tr>
          <tr><td>राजस्थान बोर्ड</td><td>वि.सं. १३९०–१४७० · ≈ १३३३–१४१३</td><td>क्षितिज, कक्षा १०, पाठ १८</td><td>${badge('ok', 'प्रमाणित')}</td></tr>
          <tr><td>अकादमिक</td><td>≈ १४२५ ई.</td><td>फ़ार्क़ुहर, कनिंघम, परशुराम चतुर्वेदी</td><td>${badge('diff', 'मतभेद')}</td></tr>
        </tbody>
      </table>
    </div>
    <div class="grid grid--3" style="margin-top:2rem">
      <div class="note">
        <span class="note__label">सबसे सुसंगत</span>
        <p><strong>वि.सं. १३९०–१४७०</strong> — अस्सी वर्ष का जीवनकाल, रामानंद से मिलन, और पंद्रहवीं सदी का ऐतिहासिक संदर्भ — तीनों मिलते हैं।</p>
      </div>
      <div class="note">
        <span class="note__label">सबसे प्रचलित</span>
        <p><strong>१३२३ ई.</strong> — समाज इसी से जयंती गिनता है। हुबली में "६९१वीं जयंती" (लगभग २०१३) का उल्लेख मिलता है, और उसी गिनती से २०२६ में ७०३वीं बनती है।</p>
      </div>
      <div class="note">
        <span class="note__label">जो नहीं बदलता</span>
        <p><strong>चैत्र शुक्ल पूर्णिमा।</strong> तीनों मतों में जयंती एक ही है। इसीलिए यह साइट तारीख़ों से नहीं, जगहों और पर्व से बँधी है।</p>
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    ${sectionHead({ index: '०३ — कालक्रम', title: 'समय-रेखा' })}
    <ol class="timeline">
      ${TIMELINE.map(t => `<li>
        <span class="timeline__date">${t.date}</span>
        <span class="timeline__title">${t.title}</span>
        <p>${t.text}</p>
      </li>`).join('')}
    </ol>
  </div>
</section>

<section class="section" id="gotra">
  <div class="wrap">
    ${sectionHead({
      index: '०४ — बावन कुल',
      title: '५२ क्षत्रिय कुल',
      intro: 'समाज की वंशावली-सूची कहती है कि पीपाजी के पास बावन राजाओं का साथ था, और उनके वंशज बावन कुलों में फैले। यह सूची एक चार्टर है — आदर्श और ऐतिहासिक दावा, दोनों।',
    })}
    <div class="split">
      <div class="table-wrap">
        <table class="data">
          <caption>५२ कुल · क्रम और पूर्वज-नाम</caption>
          <thead><tr><th>#</th><th>पूर्वज</th><th>कुल / गोत्र</th></tr></thead>
          <tbody>
            ${CLANS.map((c, i) => `<tr><td class="muted">${dev(i + 1)}</td><td>${c[0]}</td><td>${c[1]}</td></tr>`).join('')}
          </tbody>
        </table>
      </div>
      <div>
        <div class="note note--warn">
          <span class="note__label">सूची में ५२ नाम नहीं हैं</span>
          <p>गिनने पर <strong>५१ नाम</strong> मिलते हैं। ५२वाँ नाम — <strong>नागराज सिंह परमार</strong> — बाद में जोड़ा गया प्रतीत होता है।</p>
          <p>यह सूची को झूठा नहीं बनाता। यह बताता है कि सूची <em>जीवित</em> रही है — लोग उसमें नाम जोड़ते रहे, जैसे हर जीवित परंपरा में होता है।</p>
          <p><strong>इसे चार्टर की तरह पढ़ें, जनगणना की तरह नहीं।</strong></p>
        </div>
        <div class="note" style="margin-top:1rem;background:var(--paper-3)">
          <span class="note__label">ज़मीन पर</span>
          <p>गाँवों की सूची में केवल <strong>१२ गोत्र</strong> मिलते हैं — परमार, सोलंकी, गोयल, चौहान, डाभी, परिहार, भाटी, दहिया, राठौड़, दैया, तंवर, राकेशा।</p>
          <p>दोनों सूचियाँ अलग सवालों के जवाब हैं: एक वंश का, दूसरी विवाह-नियम का। <a href="panch-patti.html#suchi">गाँवों की सूची →</a></p>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    ${sectionHead({
      index: '०५ — रानियाँ',
      title: 'बारह रानियाँ, और एक सीता',
      intro: 'पीपाजी की बारह रानियाँ थीं। उनके नाम, उनके पिता के राज्य और उनके गोत्र — यह सूची समाज का विवाह-भूगोल है, जिसे कथा के रूप में सँभाल कर रखा गया है।',
    })}
    <div class="table-wrap">
      <table class="data">
        <caption>बारह रानियाँ · गोत्र और पैतृक स्थान</caption>
        <thead><tr><th>#</th><th>गोत्र</th><th>पैतृक स्थान</th><th>आज का प्रदेश</th></tr></thead>
        <tbody>
          ${QUEENS.map(q => `<tr>
            <td class="muted">${q[0]}</td>
            <td>${q[1]}</td>
            <td>${q[2]}</td>
            <td class="muted">${q[3]}</td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>
    <div class="grid grid--2" style="margin-top:2rem">
      <div class="note">
        <span class="note__label">बारह में से सात गुजरात से</span>
        <p>गोयल (भावनगर), चावड़ा (पाटन), चुड़ासमा (गिरनार), जाडेजा (भुज), चावड़ा (माणसा), झाला (हलवद), सोलंकी (पट्टन)।</p>
        <p>यह संयोग नहीं — यह <strong>विवाह-भूगोल</strong> है। गागरोन का राजवंश गुजरात के राजवंशों से ब्याह-संबंध रखता था, और कथा ने उन नामों को सुरक्षित रख लिया।</p>
      </div>
      <div class="note" style="background:var(--paper-3)">
        <span class="note__label">केवल सीता</span>
        <p>जब गहने उतारने की बारी आई, तो ग्यारह रानियाँ लौट गईं। केवल <strong>सीता सहचरी</strong> ने बिना झिझक गहने धूल में गिराए और साथ चलीं।</p>
        <p>इसीलिए आज भी पीपाजी की पूजा में सीता का नाम साथ लिया जाता है — और आरती में "संग सीता दासी" पंक्ति आती है।</p>
        <p><a href="pipaji.html#katha">वन के वर्ष पढ़ें →</a></p>
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    ${sectionHead({
      index: '०६ — सुई',
      title: 'सुई और धागा',
      intro: 'यह वह बिंदु है जहाँ इतिहास, पेशा और पहचान एक-दूसरे में उलझ जाते हैं। तीनों प्रमुख व्याख्याएँ नीचे हैं — बिना किसी को सही ठहराए।',
    })}
    <div class="grid grid--3">
      <article class="card">
        <span class="card__kicker">एक — पेशा</span>
        <h3>सिलाई जीविका थी</h3>
        <p>पीपाजी ने राज्य छोड़ा और टोडा में कुटी बनाकर रहे। भक्तमाल कहता है वे धन को हाथ नहीं लगाते थे। ऐसे में जीवन-निर्वाह के लिए कुछ तो करना था — परंपरा कहती है वह सिलाई थी।</p>
        <p class="tiny">${badge('trad', 'परंपरा')}</p>
      </article>
      <article class="card">
        <span class="card__kicker">दो — शिष्य</span>
        <h3>शिष्यों ने अपनाया</h3>
        <p>कहा जाता है कि पीपाजी के क्षत्रिय शिष्यों ने गुरु का अनुसरण करते हुए सिलाई अपनाई — और इस तरह एक पीपावंशीय समुदाय बना, जिसके सारे गोत्र राजपूत समुदाय के हैं।</p>
        <p class="tiny">${badge('trad', 'परंपरा')}</p>
      </article>
      <article class="card">
        <span class="card__kicker">तीन — प्रतीक</span>
        <h3>सुई त्याग का चिह्न है</h3>
        <p>"तरवार त्याग’र सुंई धारण करी" — तलवार छोड़कर सुई उठाई। यहाँ सुई केवल औज़ार नहीं, <strong>हिंसा से अहिंसा की ओर जाने का प्रतीक</strong> है।</p>
        <p class="tiny">${badge('trad', 'परंपरा')}</p>
      </article>
    </div>
    <div class="note note--warn" style="margin-top:2rem">
      <span class="note__label">जो प्रमाणित है</span>
      <p><strong>भक्तमाल में पीपाजी के सिलाई करने का उल्लेख नहीं है।</strong> एक बार भी नहीं — न दोहे में, न प्रियादास की टीका में। भक्तमाल भक्ति लिखता है, जीविका नहीं; वह कबीर का करघा भी नहीं लिखता।</p>
      <p>पर वही भक्तमाल उन्हें टोडानगर में <em>वर्षों</em> बसा हुआ और "कुछ न चाहने वाला" बताता है। <strong>परंपरा भक्तमाल से टकराती नहीं — वह उसकी खाली जगह भरती है।</strong></p>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    ${sectionHead({
      index: '०७ — अभिलेख',
      title: 'दर्जी, छीपा और ओ.बी.सी.',
      intro: 'यह केवल तथ्य है, कोई टिप्पणी नहीं। राजस्थान की अन्य पिछड़ा वर्ग सूची में दोनों अलग-अलग प्रविष्टियाँ हैं।',
    })}
    <div class="table-wrap">
      <table class="data" style="max-width:640px">
        <caption>राजस्थान राज्य अन्य पिछड़ा वर्ग सूची</caption>
        <thead><tr><th>क्रम</th><th>प्रविष्टि</th><th>स्थिति</th></tr></thead>
        <tbody>
          <tr><td>८</td><td>छीपा</td><td class="muted">अलग प्रविष्टि</td></tr>
          <tr><td>१२</td><td>दर्जी</td><td class="muted">अलग प्रविष्टि</td></tr>
        </tbody>
      </table>
    </div>
    <p class="small" style="margin-top:1.2rem;max-width:66ch">सरकारी सूची में दोनों अलग हैं — यह तथ्य उस चर्चा की नींव है जो समाज के भीतर और बाहर दोनों जगह चलती है। हम यहाँ केवल अभिलेख रखते हैं; <a href="pehchan.html">नाम और पहचान</a> पृष्ठ पर तीनों पक्षों को उनके अपने शब्दों में रखा गया है।</p>
  </div>
</section>

<section class="section section--tight">
  <div class="wrap" style="text-align:center">
    <p class="eyebrow" style="justify-content:center">आगे</p>
    <h2 style="max-width:24ch;margin-inline:auto">नाम और पहचान</h2>
    <p class="lede" style="margin:1rem auto 0;text-align:center">समाज के भीतर तीन मत हैं। यह पृष्ठ किसी एक को सही नहीं ठहराता — वह तीनों को उनके अपने शब्दों में रखता है।</p>
    <a class="btn btn--solid" href="pehchan.html" style="margin-top:1.8rem">वह पृष्ठ पढ़ें</a>
  </div>
</section>
`;

export default {
  slug: 'itihas.html',
  html: page({
    slug: 'itihas.html',
    title: 'इतिहास',
    description: 'खींची चौहान वंश, गागरोन, ५२ कुल, बारह रानियाँ, सुई-धागे की तीन व्याख्याएँ और ओ.बी.सी. अभिलेख।',
    body,
    current: 'itihas.html',
  }),
};
