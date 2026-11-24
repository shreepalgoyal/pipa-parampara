import { page, sectionHead, dev } from '../layout.mjs';
import { QUIZ } from '../data.mjs';

const body = `
<section class="page-hero">
  <div class="wrap">
    <nav class="crumbs" aria-label="ब्रेडक्रंब"><a href="index.html">मुखपृष्ठ</a><span>/</span><span>प्रश्नोत्तरी</span></nav>
    <p class="eyebrow">राजस्थान बोर्ड · कक्षा १० · पाठ १८</p>
    <h1>ज्ञान प्रश्नोत्तरी</h1>
    <p class="lede">दस प्रश्न — सीधे राजस्थान बोर्ड की <em>क्षितिज</em> पुस्तक के पाठ १८ से। हर उत्तर के साथ यह भी लिखा है कि वह किस पंक्ति से आया है।</p>
  </div>
</section>

<section class="section">
  <div class="wrap wrap--narrow">
    <div class="note" style="margin-bottom:2.5rem">
      <span class="note__label">कैसे खेलें</span>
      <p>विकल्प पर क्लिक करें — सही उत्तर हरा हो जाएगा, ग़लत लाल। नीचे उत्तर का कारण भी खुल जाएगा।</p>
      <p class="tiny" style="margin-top:.5rem">ये प्रश्न पाठ्यपुस्तक के हैं; उत्तर भी उसी के हैं। जहाँ पुस्तक और अन्य स्रोत अलग हैं, वहाँ <a href="itihas.html#samay">इतिहास</a> पृष्ठ पर बताया गया है।</p>
    </div>
    <div class="quiz">
      ${QUIZ.map((q, i) => `<div class="q" data-i="${i}">
        <span class="q__q"><span class="num" style="color:var(--gold-text);margin-right:.5rem">${dev(String(i + 1).padStart(2, '0'))}</span>${q.q}</span>
        <div class="q__opts">
          ${q.opts.map((o, j) => `<button class="q__opt" type="button" data-correct="${j === q.a}">${o}</button>`).join('')}
        </div>
        <p class="q__a"><strong>कारण:</strong> ${q.why}</p>
      </div>`).join('')}
    </div>
    <noscript>
      <div class="note note--warn" style="margin-top:1.5rem">
        <span class="note__label">जावास्क्रिप्ट बंद है</span>
        <p>उत्तर देखने के लिए जावास्क्रिप्ट चालू करें। सही उत्तर क्रम से: ${QUIZ.map((q, i) => `${dev(i + 1)}. ${q.opts[q.a]}`).join(' · ')}</p>
      </div>
    </noscript>
  </div>
</section>

<section class="section">
  <div class="wrap">
    ${sectionHead({
      index: '०१ — पाठ',
      title: 'परीक्षा के लिए पाँच बातें',
      intro: 'अगर आपको केवल पाँच वाक्य याद रखने हों, तो ये पाँच।',
    })}
    <div class="dl">
      <div class="dl__row"><span class="dl__k">एक</span><span class="dl__v"><strong>पीपाजी संत काव्यधारा के कवि हैं</strong> और कबीर की परंपरा का अनुसरण करते हैं।</span></div>
      <div class="dl__row"><span class="dl__k">दो</span><span class="dl__v"><strong>जन्म: गागरौन</strong> (झालावाड़), कालीसिंध और आहू के संगम पर।</span></div>
      <div class="dl__row"><span class="dl__k">तीन</span><span class="dl__v"><strong>गुरु: रामानंद।</strong> द्वार बंद मिला, कुएँ की परीक्षा दी, एक वर्ष सेवा की।</span></div>
      <div class="dl__row"><span class="dl__k">चार</span><span class="dl__v"><strong>पत्नी: सीता।</strong> बारह रानियों में से केवल वही साथ चलीं।</span></div>
      <div class="dl__row"><span class="dl__k">पाँच</span><span class="dl__v"><strong>"जीव मार जीमण करै… थाली मांहि मसाण"</strong> — हिंसा का भोजन श्मशान है। यही अहिंसा का आधार है।</span></div>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap split">
    <div>
      ${sectionHead({ index: '०२ — पाठ्यपुस्तक', title: 'मूल पाठ पढ़ें' })}
      <p class="prose">पूरा पाठ १८ — "लोक संत पीपाजी" — पुस्तकालय में स्कैन किए हुए मूल रूप में उपलब्ध है। पाँच पृष्ठ, राजस्थान बोर्ड, २०१७।</p>
      <a class="btn btn--solid" href="assets/docs/kshitij-pipa.pdf" style="margin-top:1rem">PDF खोलें</a>
    </div>
    <div>
      <div class="note">
        <span class="note__label">एक सावधानी</span>
        <p>पाठ्यपुस्तक कहती है कि पीपाजी का जन्म <strong>वि.सं. १३९०</strong> में हुआ और देहावसान <strong>वि.सं. १४७०</strong> में — यानी अस्सी वर्ष का जीवन।</p>
        <p>समाज की जयंती-गणना इससे अलग है, और अकादमिक शोध भी। <strong>परीक्षा में पुस्तक का उत्तर लिखें; इतिहास में तीनों मत जानें।</strong></p>
        <p class="tiny" style="margin-top:.7rem"><a href="itihas.html#samay">तीनों तिथियाँ देखें →</a></p>
      </div>
    </div>
  </div>
</section>
`;

export default {
  slug: 'prashnottari.html',
  html: page({
    slug: 'prashnottari.html',
    title: 'प्रश्नोत्तरी',
    description: 'राजस्थान बोर्ड कक्षा १० की क्षितिज पुस्तक के पाठ १८ पर आधारित दस प्रश्न — उत्तर और कारण के साथ।',
    body,
    current: 'prashnottari.html',
    schema: {
      '@type': 'FAQPage',
      '@id': 'https://pipaparampara.in/prashnottari.html#faq',
      inLanguage: 'hi',
      mainEntity: QUIZ.map((q) => ({
        '@type': 'Question',
        name: q.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `${q.opts[q.a]} — ${q.why}`,
        },
      })),
    },
  }),
};
