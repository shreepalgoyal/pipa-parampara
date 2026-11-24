import { page } from '../layout.mjs';

const body = `
<section class="page-hero">
  <div class="wrap">
    <p class="eyebrow">४०४ · पृष्ठ नहीं मिला</p>
    <h1>यह पन्ना कहीं और है</h1>
    <p class="lede">जिस पते पर आप आए हैं, वह इस संग्रह में नहीं है — हो सकता है कि वह पुराना लिंक हो, या अभी लिखा ही न गया हो।</p>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="grid grid--3">
      <article class="card">
        <span class="card__kicker">एक</span>
        <h2>मुखपृष्ठ से शुरू करें</h2>
        <p>चार ठिकाने, पाँच पट्टियाँ और पूरा संग्रह — एक ही जगह से।</p>
        <a class="card__link" href="index.html">मुखपृष्ठ</a>
      </article>
      <article class="card">
        <span class="card__kicker">दो</span>
        <h2>अपना गाँव खोजें</h2>
        <p>२०४ गाँव, पाँच पट्टियाँ, गोत्र के साथ।</p>
        <a class="card__link" href="panch-patti.html">पाँच पट्टी</a>
      </article>
      <article class="card">
        <span class="card__kicker">तीन</span>
        <h2>पीपाजी की कथा</h2>
        <p>गागरोन से काशी, वन और टोडा तक — ३३ प्रसंग।</p>
        <a class="card__link" href="pipaji.html">श्री पीपाजी</a>
      </article>
    </div>

    <div class="note" style="margin-top:2.5rem">
      <span class="note__label">लिंक टूटा है?</span>
      <p>अगर किसी पृष्ठ का लिंक यहाँ आकर रुकता है, तो <a href="yogdan.html">बताइए</a> — कौन-सा पन्ना खोज रहे थे। हम वह लिंक ठीक कर देंगे या पन्ना लिख देंगे।</p>
    </div>
  </div>
</section>
`;

export default {
  slug: '404.html',
  html: page({
    slug: '404.html',
    title: 'पृष्ठ नहीं मिला',
    description: 'यह पन्ना इस संग्रह में नहीं है।',
    body,
    current: '',
    noindex: true,
  }),
};
