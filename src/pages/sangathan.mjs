import { page, sectionHead, badge } from '../layout.mjs';
import { ORGS } from '../data.mjs';

const body = `
<section class="page-hero">
  <div class="wrap">
    <nav class="crumbs" aria-label="ब्रेडक्रंब"><a href="index.html">मुखपृष्ठ</a><span>/</span><span>संगठन</span></nav>
    <p class="eyebrow">ट्रस्ट · महासभा · शाखाएँ</p>
    <h1>संगठन</h1>
    <p class="lede">समाज की चार प्रमुख संस्थाएँ — समदड़ी का मंदिर ट्रस्ट, पुष्कर की महासभा, हुबली की मीडिया फ़ाउंडेशन, और सागवाड़ा की वागड़ शाखा। यहाँ केवल पदाधिकारियों के नाम और कार्यालय संपर्क हैं।</p>
  </div>
</section>

<section class="section">
  <div class="wrap">
    ${ORGS.map(o => `<article class="org">
      <div class="split">
        <div>
          <span class="card__kicker">${o.role}</span>
          <h2 style="font-size:var(--step-2);margin-top:.4rem">${o.name}</h2>
          <p style="margin-top:.9rem;color:var(--ink-2);max-width:56ch">${o.note}</p>
        </div>
        <div class="table-wrap">
          <table class="data">
            <thead><tr><th>पद</th><th>नाम</th><th>संपर्क / गाँव</th></tr></thead>
            <tbody>
              ${o.people.map(p => `<tr><td>${p[0]}</td><td>${p[1]}</td><td class="muted">${p[2] || '—'}</td></tr>`).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </article>`).join('')}
  </div>
</section>

<section class="section">
  <div class="wrap split">
    <div>
      ${sectionHead({ index: '०१ — सदस्यता', title: 'महासभा की सदस्यता' })}
      <div class="dl">
        <div class="dl__row"><span class="dl__k">आजीवन शुल्क</span><span class="dl__v">₹५००</span></div>
        <div class="dl__row"><span class="dl__k">खाता</span><span class="dl__v">पंजाब नेशनल बैंक, पुष्कर शाखा · A/c 0825000100140906</span></div>
        <div class="dl__row"><span class="dl__k">IFSC</span><span class="dl__v">PUNB0082500</span></div>
        <div class="dl__row"><span class="dl__k">संपर्क</span><span class="dl__v">ओमप्रकाश बडगुजर · 09314483184</span></div>
      </div>
      <div class="note note--warn" style="margin-top:1.5rem">
        <span class="note__label">पुष्टि आवश्यक</span>
        <p>ये विवरण २०१६–१८ के सार्वजनिक पृष्ठों से हैं। <strong>पैसा भेजने से पहले महासभा से सीधे पुष्टि करें</strong> — खाता संख्या, शुल्क और पदाधिकारी बदल सकते हैं। यह वेबसाइट कोई भुगतान नहीं लेती और किसी लेन-देन की ज़िम्मेदारी नहीं लेती।</p>
      </div>
    </div>
    <div>
      ${sectionHead({ index: '०२ — नियम', title: 'यहाँ क्या नहीं है' })}
      <div class="note" style="background:var(--paper-3)">
        <span class="note__label">गोपनीयता</span>
        <p><strong>इस वेबसाइट पर किसी सदस्य का निजी मोबाइल नंबर, घर का पता या पारिवारिक सूची नहीं है।</strong></p>
        <p>केवल वे नाम और नंबर हैं जो पदाधिकारी के रूप में सार्वजनिक रूप से प्रकाशित हो चुके हैं, और जिनका उपयोग कार्यालय-संपर्क के लिए होता है।</p>
        <p>सागवाड़ा की घर-घर सूची और १३ संरक्षकों की फ़ोन-सूची जानबूझकर छोड़ी गई है। <strong>वह किसी के काम की नहीं, और किसी की निजता का उल्लंघन है।</strong></p>
      </div>
      <div class="note" style="margin-top:1rem">
        <span class="note__label">सुधार</span>
        <p>कोई नाम, पद या नंबर ग़लत हो तो <a href="yogdan.html">बताइए</a> — सुधार तुरंत किया जाएगा। पद बदलते रहते हैं; यह सूची एक तस्वीर है, स्थायी सत्य नहीं।</p>
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    ${sectionHead({
      index: '०३ — जुड़ना',
      title: 'अगर आप जुड़ना चाहें',
      intro: 'समाज में काम करने के तीन रास्ते हैं — और तीनों के लिए किसी की अनुमति नहीं चाहिए।',
    })}
    <div class="grid grid--3">
      <article class="card">
        <span class="card__kicker">एक</span>
        <h3>अपने गाँव का प्रतिनिधित्व करें</h3>
        <p>हर पट्टी का ट्रस्ट में हिस्सा है। अपने गाँव के पट्टी-प्रतिनिधि से मिलिए — समदड़ी के मेले में या जयंती पर।</p>
        <a class="card__link" href="panch-patti.html">अपनी पट्टी देखें</a>
      </article>
      <article class="card">
        <span class="card__kicker">दो</span>
        <h3>जयंती और मेले में आएँ</h3>
        <p>चैत्र पूर्णिमा पर समदड़ी में पूरे समाज का मिलन होता है। यह वह जगह है जहाँ काम बातचीत से तय होता है, ईमेल से नहीं।</p>
        <a class="card__link" href="samdari.html#vivah">समदड़ी धाम</a>
      </article>
      <article class="card">
        <span class="card__kicker">तीन</span>
        <h3>इस संग्रह में कुछ जोड़ें</h3>
        <p>पुरानी किताब, तस्वीर, काग़ज़, या कोई ऐसी बात जो हमसे छूट गई। यह संग्रह लोगों के भेजे बिना नहीं बढ़ेगा।</p>
        <a class="card__link" href="yogdan.html">योगदान दें</a>
      </article>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    ${sectionHead({ index: '०४ — संरचना', title: 'पट्टी और संगठन में फ़र्क' })}
    <div class="split">
      <div class="prose">
        <p>अक्सर यह भ्रम होता है कि पट्टी कोई संगठन है। <strong>नहीं है।</strong></p>
        <p>पट्टी <strong>गाँवों का क्षेत्रीय समूह</strong> है — जन्म से, पते से, ब्याह से बनता है। इसमें सदस्यता नहीं ली जाती; इसमें आप पैदा होते हैं या ब्याह कर आते हैं।</p>
        <p>महासभा और ट्रस्ट <strong>संगठन</strong> हैं — इनमें सदस्यता ली जाती है, पद होते हैं, चुनाव होते हैं, और खाते होते हैं।</p>
        <p>समदड़ी का मंदिर ट्रस्ट दोनों को जोड़ता है: वह संगठन है, पर उसकी सीटें <strong>पट्टियों से</strong> आती हैं। इसीलिए वह समाज की सबसे स्थिर संस्था है — वह किसी एक गोत्र या गुट के हाथ में नहीं जा सकता।</p>
      </div>
      <div>
        <div class="table-wrap">
          <table class="data">
            <caption>पट्टी बनाम संगठन</caption>
            <thead><tr><th></th><th>पट्टी</th><th>संगठन</th></tr></thead>
            <tbody>
              <tr><td>कैसे मिलती है</td><td>जन्म / विवाह / गाँव</td><td>सदस्यता शुल्क</td></tr>
              <tr><td>संख्या</td><td>५</td><td>कई</td></tr>
              <tr><td>पद</td><td>प्रतिनिधि</td><td>अध्यक्ष, मंत्री…</td></tr>
              <tr><td>अवधि</td><td>स्थायी</td><td>चुनावी</td></tr>
              <tr><td>मुख्य काम</td><td>रीति, मंदिर, मेला</td><td>नीति, सदस्यता, प्रकाशन</td></tr>
            </tbody>
          </table>
        </div>
        <p class="tiny" style="margin-top:1rem">यह स्पष्टीकरण इसलिए ज़रूरी है कि बहुत से लोग "पट्टी" को "गुट" समझ लेते हैं। वह गुट नहीं, भूगोल है।</p>
      </div>
    </div>
  </div>
</section>
`;

export default {
  slug: 'sangathan.html',
  html: page({
    slug: 'sangathan.html',
    title: 'संगठन',
    description: 'समदड़ी मंदिर ट्रस्ट, अखिल भारतीय पीपा क्षत्रिय महासभा, PKDS मीडिया फ़ाउंडेशन और वागड़ शाखा — पदाधिकारी और संपर्क।',
    body,
    current: 'sangathan.html',
  }),
};
