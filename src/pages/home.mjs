import { page, sectionHead, verseBlock, badge, SEAL_SVG, dev } from '../layout.mjs';
import { VILLAGES, PATTIS, VERSES } from '../data.mjs';

const counts = PATTIS.map(p => ({
  ...p,
  n: VILLAGES.filter(v => v.patti === p.key).length,
}));
const maxN = Math.max(...counts.map(c => c.n));

const body = `
<section class="hero">
  <div class="wrap hero__grid">
    <div class="hero__copy">
      <p class="eyebrow">गागरोन · काशी · टोडा · समदड़ी</p>
      <h1 class="hero__title">तरवार त्याग’र<br><em>सुंई धारण करी</em></h1>
      <p class="hero__lede">गागरोन का राजा, रामानंद का शिष्य, टोडा का संत — और सुई-धागे का धर्म।</p>
      <div class="hero__actions">
        <a class="btn btn--solid" href="pipaji.html">पीपाजी की कथा पढ़ें</a>
        <a class="btn btn--ghost" href="panch-patti.html">अपना गाँव खोजें</a>
      </div>
      <p class="hero__note">२०४ गाँव · ५ पट्टियाँ · १२ गोत्र · हर दावे के साथ उसका स्रोत</p>
    </div>
    <div class="hero__seal">
      <div class="seal">
        ${SEAL_SVG}
        <div class="seal__text">
          <span class="seal__hi">पीपाजी</span>
          <span class="seal__rule"></span>
          <span class="seal__sub">परंपरा</span>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="section section--tight">
  <div class="wrap">
    <div class="stats reveal">
      <div class="stat"><span class="stat__n">२०४</span><span class="stat__l">गाँव, पाँच पट्टियों में</span></div>
      <div class="stat"><span class="stat__n">५</span><span class="stat__l">पट्टियाँ, एक धाम</span></div>
      <div class="stat"><span class="stat__n">१२</span><span class="stat__l">गोत्र, ज़मीन पर</span></div>
      <div class="stat"><span class="stat__n">७००<small>+</small></span><span class="stat__l">वर्षों की परंपरा</span></div>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    ${sectionHead({
      index: '०१ — चार स्थान',
      title: 'एक जीवन, चार ठिकाने',
      intro: 'जन्म-तिथि पर तीन मत हैं। स्थानों पर कोई मतभेद नहीं। इसीलिए यह कथा तारीख़ों से नहीं, जगहों से बँधी है — और हर जगह पर जीवन का एक अलग रूप खुलता है।',
    })}
    <div class="phases reveal">
      <a class="phase" href="pipaji.html#gagron">
        <span class="phase__n">०१</span>
        <h3>गागरोन</h3>
        <span class="phase__sub">राजा</span>
        <p>जन्म, राज्याभिषेक, भवानी की उपासना — और वह रात जब देवी ने सच कह दिया: मोक्ष मेरे हाथ में नहीं।</p>
        <span class="phase__go">कथा पढ़ें →</span>
      </a>
      <a class="phase" href="pipaji.html#kashi">
        <span class="phase__n">०२</span>
        <h3>काशी</h3>
        <span class="phase__sub">खोज</span>
        <p>बंद द्वार, कुएँ की परीक्षा, एक वर्ष की सेवा — और गुरु की पालकी में अपना कंधा लगाना।</p>
        <span class="phase__go">कथा पढ़ें →</span>
      </a>
      <a class="phase" href="pipaji.html#van">
        <span class="phase__n">०३</span>
        <h3>मारवाड़–मालवा</h3>
        <span class="phase__sub">वन</span>
        <p>बारह रानियाँ, केवल सीता, शेर, बाँस, और सात दिन पानी के नीचे — कृष्ण और रुक्मिणी के अतिथि।</p>
        <span class="phase__go">कथा पढ़ें →</span>
      </a>
      <a class="phase" href="pipaji.html#toda">
        <span class="phase__n">०४</span>
        <h3>टोडा</h3>
        <span class="phase__sub">संत</span>
        <p>कुटी, राजा सूर्यसेनमल, अकाल, मिटा हुआ बहीखाता — और दो स्त्रियाँ जो समाज से निकाली गईं और लौट आईं।</p>
        <span class="phase__go">कथा पढ़ें →</span>
      </a>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap split">
    <div>
      ${sectionHead({
        index: '०२ — वाणी',
        title: 'सुई चलाते हुए जो कहा गया',
        intro: 'पीपाजी की वाणी में कोई भेद नहीं है — हाथ का काम और मुख का नाम, दोनों एक ही धर्म के अंग हैं।',
      })}
      ${verseBlock({
        text: VERSES[0].text,
        gloss: VERSES[0].gloss,
        source: VERSES[0].source,
        large: true,
      })}
      <a class="btn btn--ghost" href="vani.html">पूरी वाणी — २३ पद, दोहे और आरती</a>
    </div>
    <div>
      <div class="note">
        <span class="note__label">भक्तमाल में सिलाई का ज़िक्र नहीं है</span>
        <p>यह सच है, और इसे छिपाना नहीं चाहिए। भक्तमाल भक्ति का ग्रंथ है, जीविका का नहीं। पर वही भक्तमाल पीपाजी को टोडानगर में बसा हुआ, कुछ न चाहने वाला और धन को हाथ न लगाने वाला संत बताता है — और ऐसा संत जीवित रहने के लिए कुछ तो करता ही था।</p>
        <p>समाज की परंपरा कहती है कि वह "कुछ" सुई-धागा था। यह परंपरा भक्तमाल से टकराती नहीं — वह उसकी खाली जगह भरती है।</p>
        <p><a href="pehchan.html">पूरा विवरण — नाम और पहचान →</a></p>
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    ${sectionHead({
      index: '०३ — पाँच पट्टी',
      title: 'एक धाम, पाँच हिस्से',
      intro: 'समदड़ी का मंदिर किसी एक गोत्र या गाँव का नहीं — यह पाँच पट्टियों का संयुक्त निर्माण है। हर पट्टी ने एक संस्थापक ट्रस्टी दिया।',
    })}
    <div class="split">
      <div class="bars reveal">
        ${counts.map(c => `<div class="bar">
          <span class="bar__label">${c.hi}</span>
          <span class="bar__track"><span class="bar__fill" style="--w:${(c.n / maxN * 100).toFixed(1)}%"></span></span>
          <span class="bar__n">${dev(c.n)}</span>
        </div>`).join('\n        ')}
      </div>
      <div>
        <p class="lede" style="font-size:1.05rem">पट्टी कोई गोत्र नहीं है — यह गाँवों का क्षेत्रीय संघ है, जो मंदिर के ट्रस्ट में सीट रखता है और रीति-रिवाजों में बारी-बारी हिस्सा लेता है।</p>
        <p style="margin-top:1rem;color:var(--ink-3);font-size:.93rem">समदड़ी गाँव का अपना गोत्र <strong>पड़िहारिया</strong> है। यह तथ्य महत्वपूर्ण है — धाम का होस्ट गोत्र ही पट्टी-व्यवस्था का हिस्सा है, उससे बाहर नहीं।</p>
        <a class="btn btn--ghost btn--sm" href="panch-patti.html" style="margin-top:1.4rem">पूरी २०४-गाँव सूची</a>
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    ${sectionHead({
      index: '०४ — आज',
      title: 'समाज, इस वक़्त',
      intro: 'कोई समाज अतीत से ज़िंदा नहीं रहता। ये तीन चीज़ें बताती हैं कि यह समाज अभी क्या कर रहा है।',
    })}
    <div class="grid grid--3">
      <article class="card">
        <span class="card__kicker">जयंती · २०२६</span>
        <h3>२ अप्रैल २०२६, गुरुवार</h3>
        <p>सागवाड़ा में श्री पीपाजी महाराज की जयंती "बड़ी धूमधाम से" मनाई गई। नौ तस्वीरें और स्थानीय समाचार-कवरेज वागड़ ब्लॉग पर।</p>
        <a class="card__link" href="samachar.html">समाचार देखें</a>
      </article>
      <article class="card">
        <span class="card__kicker">सामूहिक विवाह · समदड़ी</span>
        <h3>एक संस्था, जो चलती रही</h3>
        <p>२०१६ के छठे आयोजन में १५ जोड़ों की सीमा, ₹११,००१ शुल्क और एक पूरी सहयोग-सूची थी। अगली तिथि ट्रस्ट से पुष्ट करें।</p>
        <a class="card__link" href="samdari.html#vivah">विवाह समिति</a>
      </article>
      <article class="card">
        <span class="card__kicker">पुस्तकालय · नया</span>
        <h3>तीन ग्रंथ, अब पढ़ने को</h3>
        <p>भक्तमाल का पीपा-प्रसंग, राजस्थान बोर्ड का पाठ १८, और निमाड़–मालवा की पूरी जीवन-गाथा — सब एक जगह।</p>
        <a class="card__link" href="pustakalaya.html">पुस्तकालय खोलें</a>
      </article>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="note" style="background:var(--paper-3);border-left-color:var(--madder);padding:clamp(2rem,5vw,3.4rem)">
      <span class="note__label">रामानंद, पीपाजी से</span>
      <blockquote style="font-family:var(--font-display);font-size:var(--step-3);line-height:1.5;margin:0;color:var(--ink)">
        राज बेशक करते रहना,<br>लेकिन हरि भजन का सिमरन मत छोड़ना।
      </blockquote>
      <p style="margin-top:1.4rem;max-width:60ch;color:var(--ink-2)">यह वह वाक्य है जिस पर इस समाज की पूरी जीवन-शैली टिकी है। गुरु ने राजा से यह नहीं कहा कि महल छोड़ो — कहा कि <strong>महल में रहते हुए भी पीपाजी के हो सकते हो।</strong> दुकान, कारख़ाना, खेत, ऑफ़िस — सब वही जगह है।</p>
      <p class="tiny" style="margin-top:1rem">स्रोत: निमाड़–मालवा जीवन-गाथा (२०१६) · भक्तमाल की टीका में इसी बात का दूसरा रूप: "राज्य या वन, अब दोनों बराबर हैं।"</p>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    ${sectionHead({ index: '०५ — शुरुआत', title: 'आप कहाँ से आए हैं?' })}
    <div class="grid grid--3">
      <a class="card" href="samdari.html" style="text-decoration:none">
        <span class="card__kicker">तीर्थयात्री</span>
        <h3>मुझे समदड़ी जाना है</h3>
        <p>कैसे पहुँचें, कहाँ ठहरें, कब आएँ, किससे बात करें — और मंदिर की पूरी कहानी।</p>
        <span class="card__link">समदड़ी धाम</span>
      </a>
      <a class="card" href="prashnottari.html" style="text-decoration:none">
        <span class="card__kicker">विद्यार्थी</span>
        <h3>मुझे परीक्षा की तैयारी है</h3>
        <p>राजस्थान बोर्ड के पाठ १८ से दस प्रश्न — उत्तर सहित, और हर उत्तर के पीछे का संदर्भ।</p>
        <span class="card__link">प्रश्नोत्तरी</span>
      </a>
      <a class="card" href="panch-patti.html" style="text-decoration:none">
        <span class="card__kicker">परिवार</span>
        <h3>मुझे अपना गाँव ढूँढना है</h3>
        <p>२०४ गाँव, पाँच पट्टियाँ, गोत्र के साथ — नाम से खोजें या पट्टी से छाँटें।</p>
        <span class="card__link">पाँच पट्टी</span>
      </a>
    </div>
  </div>
</section>

<section class="section section--tight">
  <div class="wrap" style="text-align:center">
    <p class="eyebrow" style="justify-content:center">योगदान</p>
    <h2 style="max-width:26ch;margin-inline:auto">यह संग्रह आपके बिना अधूरा है</h2>
    <p class="lede" style="margin:1.2rem auto 0;text-align:center">पुरानी किताबें, तस्वीरें, काग़ज़, या कोई ऐसी बात जो हमसे छूट गई — हमें बताइए।</p>
    <a class="btn btn--solid" href="yogdan.html" style="margin-top:2rem">कुछ भेजें</a>
  </div>
</section>
`;

export default {
  slug: 'index.html',
  html: page({ slug: 'index.html', title: '', description: undefined, body, current: 'index.html' }),
};
