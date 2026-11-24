import { page, sectionHead } from '../layout.mjs';
import { PATTIS } from '../data.mjs';

const body = `
<section class="page-hero">
  <div class="wrap">
    <nav class="crumbs" aria-label="ब्रेडक्रंब"><a href="index.html">मुखपृष्ठ</a><span>/</span><span>योगदान</span></nav>
    <p class="eyebrow">तस्वीर · दस्तावेज़ · सुधार</p>
    <h1>योगदान दें</h1>
    <p class="lede">यह संग्रह उतना ही बड़ा होगा जितना आप इसे बनाएँगे। पुरानी किताब, जयंती की तस्वीर, दादाजी की लिखी हुई बात, या हमारी कोई ग़लती — सब कीमती है।</p>
  </div>
</section>

<section class="section">
  <div class="wrap split">
    <div>
      ${sectionHead({
        index: '०१ — फ़ॉर्म',
        title: 'क्या भेजना है?',
        intro: 'फ़ॉर्म भरने पर आपका ईमेल ऐप खुलेगा, जिसमें सारी जानकारी पहले से लिखी होगी। आप उसे जाँचकर भेज सकते हैं।',
      })}
      <form data-mailto-form data-to="goyaltailors@gmail.com" data-subject="पीपा परंपरा — योगदान">
        <div class="grid grid--2" style="gap:1rem">
          <div class="field">
            <label for="f-name">आपका नाम</label>
            <input id="f-name" name="name" type="text" required autocomplete="name">
          </div>
          <div class="field">
            <label for="f-village">गाँव</label>
            <input id="f-village" name="village" type="text" autocomplete="address-level2">
          </div>
        </div>
        <div class="grid grid--2" style="gap:1rem">
          <div class="field">
            <label for="f-patti">पट्टी</label>
            <select id="f-patti" name="patti">
              <option value="">— चुनें —</option>
              ${PATTIS.map(p => `<option value="${p.hi}">${p.hi}</option>`).join('')}
              <option value="पता नहीं">पता नहीं</option>
            </select>
          </div>
          <div class="field">
            <label for="f-type">क्या भेज रहे हैं</label>
            <select id="f-type" name="type">
              <option value="तस्वीर">तस्वीर</option>
              <option value="दस्तावेज़ / किताब">दस्तावेज़ / किताब</option>
              <option value="सुधार">किसी बात में सुधार</option>
              <option value="गाँव / गोत्र की जानकारी">गाँव / गोत्र की जानकारी</option>
              <option value="आयोजन की सूचना">आयोजन की सूचना</option>
              <option value="कुछ और">कुछ और</option>
            </select>
          </div>
        </div>
        <div class="field">
          <label for="f-msg">विवरण</label>
          <textarea id="f-msg" name="message" placeholder="जितना हो सके लिखिए — किस बारे में है, किस साल का है, किससे मिला।"></textarea>
        </div>
        <div class="field">
          <label for="f-contact">आपका मोबाइल या ईमेल (वैकल्पिक)</label>
          <input id="f-contact" name="contact" type="text" autocomplete="tel">
        </div>
        <button class="btn btn--solid" type="submit">ईमेल तैयार करें</button>
        <p class="tiny" style="margin-top:.9rem">तस्वीर या PDF संलग्न करने के लिए, ईमेल खुलने पर उसे अटैच कर दें। बड़ी फ़ाइल हो तो पहले बता दें — दूसरा रास्ता बता दिया जाएगा।</p>
      </form>
      <noscript>
        <div class="note" style="margin-top:1.5rem">
          <span class="note__label">जावास्क्रिप्ट बंद है</span>
          <p>फ़ॉर्म काम नहीं करेगा। कृपया सीधे लिखें: <strong>goyaltailors@gmail.com</strong></p>
          <p>विषय में "पीपा परंपरा — योगदान" लिखें, और अपना नाम, गाँव और पट्टी बताएँ।</p>
        </div>
      </noscript>
    </div>
    <div>
      <div class="note" style="background:var(--paper-3)">
        <span class="note__label">क्या सबसे ज़्यादा चाहिए</span>
        <p><strong>१. पुरानी किताबें और पत्रिकाएँ</strong> — <em>श्री पीपा प्रकाश</em>, जयंती स्मरणिका, सामूहिक विवाह के निमंत्रण।</p>
        <p><strong>२. पुरानी तस्वीरें</strong> — मंदिर निर्माण (१९७५), पहला मेला, पुराने संत, बुज़ुर्ग।</p>
        <p><strong>३. हाथ से लिखे काग़ज़</strong> — वंशावली, बहीखाता, पत्र, कोई भी पुराना दस्तावेज़।</p>
        <p><strong>४. सुधार</strong> — गाँव की वर्तनी, गोत्र, तिथि, नाम। हम ग़लतियाँ स्वीकार करते हैं; यही इस साइट का तरीक़ा है।</p>
      </div>
      <div class="dl" style="margin-top:1.5rem">
        <div class="dl__row"><span class="dl__k">ईमेल</span><span class="dl__v">goyaltailors@gmail.com</span></div>
        <div class="dl__row"><span class="dl__k">समदड़ी ट्रस्ट</span><span class="dl__v">02900-276257</span></div>
        <div class="dl__row"><span class="dl__k">वागड़ शाखा</span><span class="dl__v">गोविन्द दर्जी · 7665057775</span></div>
      </div>
      <p class="tiny" style="margin-top:1rem">भेजी गई सामग्री आपकी रहेगी। हम उसे केवल इस संग्रह में, स्रोत के नाम के साथ प्रकाशित करेंगे — आपकी अनुमति के बिना कहीं और नहीं।</p>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    ${sectionHead({
      index: '०२ — क्यों',
      title: 'एक संग्रह तब तक ज़िंदा है जब तक वह मिल रहा है',
      intro: 'यह वेबसाइट अपने आप नहीं बढ़ेगी। इसके पीछे कोई संस्था नहीं, कोई बजट नहीं — केवल वे लोग हैं जो कुछ भेजते हैं।',
    })}
    <div class="grid grid--3">
      <div class="card"><span class="card__kicker">एक</span><h3>जो छपा है, वह नष्ट हो रहा है</h3><p>पचास साल पुरानी स्मरणिकाएँ घरों में सीलन में पड़ी हैं। एक पीढ़ी और — फिर वे किसी को नहीं मिलेंगी। स्कैन करना ही बचाव है।</p></div>
      <div class="card"><span class="card__kicker">दो</span><h3>जो मौखिक है, वह जा रहा है</h3><p>बुज़ुर्गों को पीपाजी की कहानियाँ याद हैं जो किसी किताब में नहीं हैं। उनका नाम, गाँव और सुनी हुई बात — यह भी इतिहास है।</p></div>
      <div class="card"><span class="card__kicker">तीन</span><h3>जो ग़लत है, वह सुधर सकता है</h3><p>इस साइट पर हर दावे के साथ उसका स्रोत लिखा है। जहाँ स्रोत ग़लत निकले, वहाँ सुधार होगा — बस किसी को बताना होगा।</p></div>
    </div>
  </div>
</section>
`;

export default {
  slug: 'yogdan.html',
  html: page({
    slug: 'yogdan.html',
    title: 'योगदान दें',
    description: 'पुरानी किताबें, तस्वीरें, दस्तावेज़ या सुधार भेजिए — पीपा परंपरा संग्रह आपके योगदान से बढ़ता है।',
    body,
    current: 'yogdan.html',
  }),
};
