import { page, sectionHead, badge, verseBlock } from '../layout.mjs';
import { gagron, kashi, van, toda } from '../data/katha.mjs';

const tab = (id, label, selected) => `<button class="tab" role="tab" id="tab-${id}" aria-controls="panel-${id}" aria-selected="${selected}" type="button">${label}</button>`;
const panel = (id, hidden, inner) => `<div class="tabpanel" role="tabpanel" id="panel-${id}" aria-labelledby="tab-${id}"${hidden ? ' hidden' : ''}>${inner}</div>`;

const body = `
<section class="page-hero">
  <div class="wrap">
    <nav class="crumbs" aria-label="ब्रेडक्रंब"><a href="index.html">मुखपृष्ठ</a><span>/</span><span>श्री पीपाजी</span></nav>
    <p class="eyebrow">१५वीं सदी · गागरोन — काशी — टोडा</p>
    <h1>वह राजा जिसने<br>तलवार छोड़कर सुई उठाई</h1>
    <p class="lede">पीपाजी कोई एक कथा नहीं हैं — कई अलग-अलग परंपराएँ उन्हें कई तरह से बताती हैं। यह पृष्ठ उन सबको एक साथ रखता है, और जो सबसे पुराने ग्रंथ में है उसे सबसे पहले।</p>
  </div>
</section>

<section class="section section--tight">
  <div class="wrap">
    <div class="eras">
      <div>
        <span class="card__kicker">परंपरा</span>
        <p style="font-family:var(--font-display);font-size:1.35rem;margin-top:.4rem">वि.सं. १३८०<br><span style="font-size:.7em;color:var(--ink-3)">≈ १३२३ ई.</span></p>
        <p class="tiny" style="margin-top:.6rem">समाज की जयंती-गणना और अधिकांश वेब-स्रोत</p>
      </div>
      <div>
        <span class="card__kicker">पाठ्यपुस्तक</span>
        <p style="font-family:var(--font-display);font-size:1.35rem;margin-top:.4rem">वि.सं. १३९०–१४७०<br><span style="font-size:.7em;color:var(--ink-3)">≈ १३३३–१४१३ ई.</span></p>
        <p class="tiny" style="margin-top:.6rem">राजस्थान बोर्ड, क्षितिज, कक्षा १० — सबसे सुसंगत</p>
      </div>
      <div>
        <span class="card__kicker">शोध</span>
        <p style="font-family:var(--font-display);font-size:1.35rem;margin-top:.4rem">≈ १४२५ ई.<br><span style="font-size:.7em;color:var(--ink-3)">जन्म</span></p>
        <p class="tiny" style="margin-top:.6rem">फ़ार्क़ुहर, कनिंघम, परशुराम चतुर्वेदी</p>
      </div>
    </div>
    <p class="tiny" style="margin-top:1.2rem">तीनों में तिथि अलग है, पर जयंती एक है — <strong>चैत्र शुक्ल पूर्णिमा</strong>। पूरा विवेचन: <a href="itihas.html#samay">इतिहास — समय की समस्या</a>।</p>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="split">
      <div class="prose">
        <p class="eyebrow">परिचय</p>
        <p style="font-size:var(--step-1);line-height:1.75;color:var(--ink-2)">पीपाजी गागरोन के खींची चौहान राजा थे। उनके पास वह सब था जो एक राजा के पास होता है — दुर्ग, सेना, बारह रानियाँ, और भवानी के मंदिर में रोज़ चालीस मन अन्न। फिर एक रात उन्होंने अपनी कुलदेवी से वह प्रश्न पूछा जो राजा नहीं पूछते: <em>मोक्ष कैसे मिलेगा?</em></p>
        <p>देवी ने झूठ नहीं बोला। उन्होंने कहा कि यह उनके हाथ में नहीं है — किसी गुरु के पास जाओ। पीपाजी काशी गए, रामानंद के द्वार पर खड़े रहे, कुएँ में कूदे, एक वर्ष घर में सेवा की, और अंततः वही हुए जो आज सात सौ वर्षों से इस समाज की स्मृति में हैं।</p>
        <p>कहानी यहीं ख़त्म नहीं होती। भक्तमाल कहता है कि वे <strong>टोडानगर</strong> में बस गए — राजा सूर्यसेनमल के आश्रय में, एक कुटी में, कुछ न चाहते हुए। वहीं अकाल आया और उन्होंने अपनी कुटी को अन्नागार बना दिया। वहीं दो स्त्रियाँ समाज से निकाली गईं और उनके पास लौट आईं। <strong>यही टोडा के वर्ष हैं — और यही वह हिस्सा है जो किसी समाज-वेबसाइट पर कभी नहीं लिखा गया।</strong></p>
      </div>
      <div>
        <div class="note">
          <span class="note__label">इस पृष्ठ का तरीक़ा</span>
          <p>नीचे चार जगहें हैं — गागरोन, काशी, वन, टोडा। हर कथा के आगे उसका स्रोत लिखा है। जहाँ स्रोत आपस में टकराते हैं, वहाँ हम दोनों रखते हैं और बता देते हैं कि टकराहट है।</p>
          <p><strong>हम दस्तावेज़ रखते हैं, फ़ैसला नहीं करते।</strong></p>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="section" id="katha">
  <div class="wrap">
    ${sectionHead({
      index: 'कथा — चार स्थान',
      title: 'जीवन, जगह के हिसाब से',
      intro: 'भक्तमाल (१५८५ ई.) और उसकी टीका (१७१२ ई.) में उनतीस प्रसंग हैं। यहाँ तैंतीस हैं — क्योंकि निमाड़–मालवा और वागड़ की परंपराओं से कुछ और जुड़ते हैं।',
    })}
    <div data-tabs>
      <div class="tabs" role="tablist" aria-label="पीपाजी की कथा के चार स्थान">
        ${tab('gagron', 'गागरोन — राजा', 'true')}
        ${tab('kashi', 'काशी — खोज', 'false')}
        ${tab('van', 'वन — बारह रानियाँ', 'false')}
        ${tab('toda', 'टोडा — संत', 'false')}
      </div>
      ${panel('gagron', false, `<div class="prose" style="margin-bottom:1.5rem"><p>कालीसिंध और आहू के संगम पर बसा गागरोन — जल-दुर्ग, वन-दुर्ग, और खींची चौहानों की राजधानी। यहीं पीपाजी का जन्म, यहीं राज्याभिषेक, और यहीं वह रात जिसने सब बदल दिया।</p></div><div class="episodes">${gagron.join('')}</div><p class="tiny" style="margin-top:1.5rem">स्रोत: भक्तमाल, दोहा ३०१ एवं प्रियादास की टीका · अंग्रेज़ी अनुवाद: anantasatsang.org</p>`)}
      ${panel('kashi', true, `<div class="prose" style="margin-bottom:1.5rem"><p>काशी की यात्रा में पीपाजी राजा से भिक्षु बने — पर रामानंद ने उन्हें तुरंत संन्यास नहीं दिया। पहले द्वार बंद हुआ, फिर कुआँ, फिर एक पूरा वर्ष गृहस्थ के रूप में।</p></div><div class="episodes">${kashi.join('')}</div><p class="tiny" style="margin-top:1.5rem">स्रोत: भक्तमाल एवं टीका · निमाड़–मालवा जीवन-गाथा (२०१६) में कुएँ का प्रसंग विस्तार से है।</p>`)}
      ${panel('van', true, `<div class="prose" style="margin-bottom:1.5rem"><p>वन का अर्थ पलायन नहीं था — भक्तमाल के अनुसार पीपाजी और सीता का अधिकांश समय बस्तियों में ही बीता। पर यही वह हिस्सा है जहाँ बारह रानियों में से ग्यारह लौट गईं, और केवल सीता रहीं।</p></div><div class="episodes">${van.join('')}</div><p class="tiny" style="margin-top:1.5rem">स्रोत: भक्तमाल एवं टीका · सीता की परीक्षा का सबसे विस्तृत वर्णन यहीं है।</p>`)}
      ${panel('toda', true, `<div class="prose" style="margin-bottom:1.5rem"><p><strong>यह वह हिस्सा है जो किसी समाज-वेबसाइट पर नहीं मिलेगा।</strong> भक्तमाल पीपाजी को टोडानगर में बसा हुआ बताता है — राजा सूर्यसेनमल के आश्रय में, एक कुटी में, अकाल में अन्न बाँटते हुए। ये ग्यारह प्रसंग पूरी तरह अनुपलब्ध थे।</p></div><div class="episodes">${toda.join('')}</div><p class="tiny" style="margin-top:1.5rem">स्रोत: भक्तमाल, टोडा के वर्ष — केवल प्रियादास की टीका में · अंग्रेज़ी अनुवाद: anantasatsang.org/scripture/bhaktamal/168</p>`)}
    </div>
    <noscript><style>.tabpanel[hidden]{display:block!important}.tabs{display:none}</style></noscript>
  </div>
</section>

<section class="section">
  <div class="wrap split">
    <div>
      ${sectionHead({ index: 'पीपाजी और मीरा', title: 'वह स्त्री जो उनसे मिलने आई' })}
      <div class="prose">
        <p>राजस्थान बोर्ड की कक्षा १० की पुस्तक में यह वाक्य छपा है — और यह इस समाज के लिए बहुत बड़ी बात है:</p>
        <blockquote>"पीपा जी के इन्हीं उपदेशों के प्रभाव से कृष्ण की अनन्य भक्त मीराबाई भी प्रभावित हुई थीं। पीपा के भक्तिभाव और समर्पण से ही प्रभावित होकर वे उनसे मिलने पहुँची थीं।"</blockquote>
        <p>और मीरा की पदावली से एक पंक्ति:</p>
      </div>
      ${verseBlock({
        text: 'पीपा को प्रभु परचो दीन्हो, दियो रे खजानो पूरि।',
        gloss: 'पीपाजी को प्रभु ने परचा दिया — उसे ख़ज़ाना भरकर दिया।',
        source: 'मीराबाई की पदावली · क्षितिज, कक्षा १०, पाठ १८',
        large: true,
      })}
      <p class="small">उत्तर भारत की सबसे प्रसिद्ध स्त्री-संत मीरा, एक राज्य-पाठ्यपुस्तक में, पीपाजी को खोजने आती हुई। यह वह जोड़ी है जिस पर किसी ने अलग पृष्ठ नहीं बनाया।</p>
    </div>
    <div>
      ${sectionHead({ index: 'सुई', title: 'सिलाई का सवाल' })}
      <div class="note note--warn">
        <span class="note__label">सीधी बात</span>
        <p><strong>भक्तमाल में पीपाजी के सिलाई करने का उल्लेख नहीं है।</strong> एक बार भी नहीं — न दोहे में, न टीका में।</p>
        <p>यह छिपाने वाली बात नहीं है। भक्तमाल भक्ति लिखता है, जीविका नहीं। वह कबीर का करघा भी विस्तार से नहीं लिखता, न रैदास का चर्म-कर्म।</p>
        <p>पर भक्तमाल पीपाजी को टोडानगर में <em>वर्षों</em> बसा हुआ, "कुछ न चाहने वाला", "धन को हाथ न लगाने वाला" बताता है। ऐसा संत जीवित रहने के लिए कुछ तो करता ही था।</p>
        <p><strong>समाज की परंपरा कहती है कि वह "कुछ" सुई-धागा था।</strong> यह परंपरा भक्तमाल से टकराती नहीं — वह उसकी खाली जगह भरती है।</p>
        <p><a href="pehchan.html">नाम और पहचान — पूरी चर्चा →</a></p>
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    ${sectionHead({
      index: 'स्रोत',
      title: 'यह पृष्ठ किन पर टिका है',
      intro: 'हर कथा के आगे स्रोत लिखा है, पर पूरी सूची यहाँ भी रखनी चाहिए।',
    })}
    <div class="dl">
      <div class="dl__row"><span class="dl__k">मूल</span><span class="dl__v">नाभादास, <em>भक्तमाल</em>, लगभग १५८५ ई. — दोहा ३०१</span></div>
      <div class="dl__row"><span class="dl__k">टीका</span><span class="dl__v">प्रियादास, <em>भक्तिरसबोधिनी</em>, १७१२ ई. — टोडा के वर्षों का एकमात्र स्रोत</span></div>
      <div class="dl__row"><span class="dl__k">अनुवाद</span><span class="dl__v"><a href="https://anantasatsang.org/scripture/bhaktamal/167" target="_blank" rel="noopener">Satsang with Ananta</a> — पूरा पीपा-प्रसंग अंग्रेज़ी में</span></div>
      <div class="dl__row"><span class="dl__k">पाठ्यपुस्तक</span><span class="dl__v">राजस्थान बोर्ड, <em>क्षितिज</em>, कक्षा १०, पाठ १८ "लोक संत पीपाजी"</span></div>
      <div class="dl__row"><span class="dl__k">लोक-जीवनी</span><span class="dl__v">निमाड़–मालवा परंपरा, <em>पीपाजी महाराज की जीवन-गाथा</em>, २०१६</span></div>
      <div class="dl__row"><span class="dl__k">वागड़</span><span class="dl__v">श्री पीपा क्षत्रिय दर्जी समाज वागड़, ब्लॉग — जीवनी और दोहे</span></div>
    </div>
    <p class="tiny" style="margin-top:1.5rem;max-width:70ch">नोट: इस पृष्ठ पर कुछ कथाएँ परंपरा के रूप में हैं, प्रमाणित इतिहास के रूप में नहीं। जहाँ ऐसा है, वहाँ "कहा जाता है" लिखा गया है। हमारा उद्देश्य किसी एक संस्करण को सही ठहराना नहीं, सबको ईमानदारी से सामने रखना है।</p>
  </div>
</section>
`;

export default {
  slug: 'pipaji.html',
  html: page({
    slug: 'pipaji.html',
    title: 'श्री पीपाजी',
    description: 'गागरोन के राजा से टोडा के संत तक — पीपाजी की पूरी कथा, तैंतीस प्रसंगों में, स्रोतों के साथ।',
    body,
    current: 'pipaji.html',
    ogType: 'article',
    schema: {
      '@type': 'Person',
      '@id': 'https://pipaparampara.in/pipaji.html#person',
      name: 'पीपाजी',
      alternateName: ['पीपा', 'राजा पीपा', 'संत पीपा', 'Pipa', 'Pipaji'],
      description: 'गागरोन के खींची चौहान राजा जिन्होंने राज्य छोड़कर रामानंद से दीक्षा ली और टोडा में गृहस्थ-संत के रूप में रहे। समाज की परंपरा में सुई-धागे के धर्म के प्रतीक।',
      inLanguage: 'hi',
      gender: 'https://schema.org/Male',
      nationality: { '@type': 'Country', name: 'भारत' },
      religion: { '@type': 'Religion', name: 'हिन्दू — रामानंदी परंपरा' },
      knowsAbout: ['भक्ति', 'रामानंद संप्रदाय', 'अहिंसा', 'निर्गुण भक्ति'],
      mainEntityOfPage: 'https://pipaparampara.in/pipaji.html',
      subjectOf: [
        { '@type': 'Book', name: 'भक्तमाल', author: { '@type': 'Person', name: 'नाभादास' } },
        { '@type': 'Book', name: 'भक्तिरसबोधिनी', author: { '@type': 'Person', name: 'प्रियादास' } },
      ],
    },
  }),
};
