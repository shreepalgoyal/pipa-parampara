import { page, sectionHead, badge } from '../layout.mjs';

export const NEWS = [
  {
    date: '२ अप्रैल २०२६',
    iso: '2026-04-02',
    tag: 'जयंती',
    title: 'सागवाड़ा में पीपाजी की जयंती',
    body: 'श्री पीपाजी महाराज की जयंती सागवाड़ा में "बड़ी धूमधाम से" मनाई गई। वागड़ शाखा ने नौ तस्वीरें और स्थानीय समाचार-कवरेज साझा किया — जिसमें अहम सच न्यूज का वीडियो भी है।',
    note: 'यह वह आयोजन है जो हर साल चैत्र पूर्णिमा पर होता है। तिथि हर साल बदलती है; २०२६ में यह दो अप्रैल थी।',
    src: 'वागड़ ब्लॉग, ५ अप्रैल २०२६',
    conf: 'ok',
    confLabel: 'प्रमाणित',
  },
  {
    date: '२५ जनवरी २०२३',
    iso: '2023-01-25',
    tag: 'सामूहिक विवाह',
    title: 'मंदसौर में सामूहिक विवाह',
    body: 'पीपा क्षत्रिय दर्जी समाज के फ़ेसबुक पृष्ठ पर मंदसौर में आयोजित सामूहिक विवाह की सूचना और तस्वीरें प्रकाशित हुईं।',
    note: 'विवरण सीमित है — केवल पृष्ठ का उल्लेख मिला। आयोजक, जोड़ों की संख्या और शुल्क की पुष्टि नहीं हो सकी।',
    src: 'facebook.com/PipaKshtriyaDarjSamaj',
    conf: 'local',
    confLabel: 'स्थानीय',
  },
  {
    date: '१८ अप्रैल २०१८',
    iso: '2018-04-18',
    tag: 'सामूहिक विवाह',
    title: 'वागड़ का पहला सामूहिक विवाह',
    body: 'श्री पीपा क्षत्रिय दर्जी समाज वागड़ का प्रथम सामूहिक विवाह उत्सव आखा तीज पर आयोजित हुआ। आमंत्रण-पत्र का खाली नमूना आज भी ऑनलाइन मिलता है।',
    note: 'यह वह दस्तावेज़ है जिससे वागड़ शाखा की आयोजन-प्रणाली का पता चलता है। तिथि की पुष्टि आमंत्रण-नमूने से हुई।',
    src: 'वागड़ शाखा · आमंत्रण टेम्पलेट (Google Docs)',
    conf: 'ok',
    confLabel: 'प्रमाणित',
  },
  {
    date: '१२ फ़रवरी २०१६',
    iso: '2016-02-12',
    tag: 'सामूहिक विवाह',
    title: 'समदड़ी का छठा सामूहिक विवाह',
    body: 'वसंत पंचमी पर समदड़ी धाम में छठा सामूहिक विवाह हुआ — १५ जोड़ों की सीमा, ₹११,००१ शुल्क, और पंजीकरण १२ जनवरी तक।',
    note: 'यह वह आयोजन है जिसका पूरा ब्यौरा आज भी panchpatti.in पर है — और जो समाज की सबसे स्थिर संस्था की मिसाल है।',
    src: 'panchpatti.in · समदड़ी मंदिर ट्रस्ट',
    conf: 'ok',
    confLabel: 'प्रमाणित',
  },
  {
    date: '२०१३',
    tag: 'विरासत',
    title: 'गागरोन — यूनेस्को विश्व धरोहर',
    body: 'राजस्थान के पहाड़ी दुर्गों के साथ गागरोन को यूनेस्को विश्व धरोहर का दर्जा मिला। पीपाजी का जन्मस्थान अब विश्व-स्तरीय संरक्षित स्थल है।',
    note: 'यह समाज के लिए वह मान्यता है जो किसी जाति-दावे की मोहताज नहीं — दुर्ग अपनी जगह पर खड़ा है।',
    src: 'UNESCO World Heritage List · Hill Forts of Rajasthan',
    conf: 'ok',
    confLabel: 'प्रमाणित',
  },
];

const body = `
<section class="page-hero">
  <div class="wrap">
    <nav class="crumbs" aria-label="ब्रेडक्रंब"><a href="index.html">मुखपृष्ठ</a><span>/</span><span>समाचार</span></nav>
    <p class="eyebrow">जयंती · विवाह · विरासत</p>
    <h1>समाचार</h1>
    <p class="lede">समाज में क्या हो रहा है — नई से पुरानी तारीख़ तक। हर प्रविष्टि के साथ उसका स्रोत और उसकी सीमा।</p>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <h2 class="sr-only">समाचार-सूची</h2>
    <div class="episodes episodes--news">
      ${NEWS.map((n, i) => `<article class="episode${i === 0 ? ' episode--star' : ''}">
        <span class="episode__n">${n.date}</span>
        <div>
          <span class="card__kicker">${n.tag}</span>
          <h3 style="margin-top:.3rem">${n.title}</h3>
          <p>${n.body}</p>
          <p class="small" style="margin-top:.5rem">${n.note}</p>
          <p style="margin-top:.7rem">${badge(n.conf, n.confLabel)} <span class="tiny" style="margin-left:.6rem">स्रोत: ${n.src}</span></p>
        </div>
      </article>`).join('')}
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap split">
    <div>
      ${sectionHead({ index: '०१ — कैलेंडर', title: 'हर साल क्या होता है' })}
      <div class="dl">
        <div class="dl__row"><span class="dl__k">चैत्र पूर्णिमा</span><span class="dl__v"><strong>पीपाजी जयंती</strong> — समदड़ी में मुख्य मेला; सागवाड़ा और अन्य शाखाओं में भी आयोजन। मार्च–अप्रैल।</span></div>
        <div class="dl__row"><span class="dl__k">कार्तिक पूर्णिमा</span><span class="dl__v"><strong>अन्नकूट</strong> — समदड़ी धाम में अन्नकूट उत्सव। नवंबर।</span></div>
        <div class="dl__row"><span class="dl__k">वसंत पंचमी</span><span class="dl__v">सामूहिक विवाह का पसंदीदा मुहूर्त — २०१६ का आयोजन इसी दिन था।</span></div>
        <div class="dl__row"><span class="dl__k">आखा तीज</span><span class="dl__v">वागड़ शाखा के सामूहिक विवाह का मुहूर्त — २०१८ का पहला आयोजन इसी दिन।</span></div>
      </div>
      <p class="tiny" style="margin-top:1rem">तिथियाँ हर साल बदलती हैं। यात्रा या आयोजन की योजना बनाने से पहले ट्रस्ट से पुष्टि करें — <strong>02900-276257</strong>।</p>
    </div>
    <div>
      <div class="note">
        <span class="note__label">यह पृष्ठ कैसे भरता है</span>
        <p>यह कोई समाचार-पत्र नहीं है। यहाँ केवल वे आयोजन आते हैं जिनका <strong>कोई सार्वजनिक स्रोत</strong> मिलता है — ब्लॉग, फ़ेसबुक पृष्ठ, आमंत्रण-पत्र, या ट्रस्ट की सूचना।</p>
        <p>कोई आयोजन छूट गया हो तो <a href="yogdan.html">भेजिए</a> — तस्वीर, निमंत्रण, या केवल तारीख़ और जगह।</p>
      </div>
      <div class="note" style="margin-top:1rem;background:var(--paper-3)">
        <span class="note__label">पुराने समाचार</span>
        <p>२०१५ से पहले के आयोजनों का कोई ऑनलाइन अभिलेख नहीं मिला। जो किसी के पास पुरानी स्मरणिका या अख़बार की कतरन हो, वह इस पृष्ठ का सबसे कीमती योगदान होगा।</p>
      </div>
    </div>
  </div>
</section>
`;

export default {
  slug: 'samachar.html',
  html: page({
    slug: 'samachar.html',
    title: 'समाचार',
    description: 'पीपा क्षत्रिय समाज के हाल के आयोजन — जयंती, सामूहिक विवाह, और विरासत की ख़बरें, स्रोत के साथ।',
    body,
    current: 'samachar.html',
    schema: {
      '@type': 'ItemList',
      '@id': 'https://pipaparampara.in/samachar.html#events',
      name: 'समाज के प्रमाणित आयोजन',
      numberOfItems: NEWS.filter((n) => n.iso).length,
      inLanguage: 'hi',
      itemListElement: NEWS.filter((n) => n.iso).map((n, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'Event',
          name: n.title,
          description: n.body,
          startDate: n.iso,
          eventStatus: 'https://schema.org/EventScheduled',
          eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
          location: { '@type': 'Place', name: 'भारत', address: { '@type': 'PostalAddress', addressCountry: 'IN' } },
          organizer: { '@id': 'https://pipaparampara.in/#organisation' },
        },
      })),
    },
  }),
};
