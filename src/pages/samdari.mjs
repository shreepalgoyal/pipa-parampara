import { page, sectionHead, badge } from '../layout.mjs';

const FOUNDERS = [
  ['जालोरी', 'सोगजी', 'गोल (उम्मेदाबाद)'],
  ['सिवांची', 'खंगारजी', 'खंडप'],
  ['मालाणी', 'रामाजी', 'असाड़ा'],
  ['चौराई', 'चमनाजी', 'भोरड़ा'],
  ['जोधपुरी', 'सोनाजी', 'मजल'],
];

const body = `
<section class="page-hero">
  <div class="wrap">
    <nav class="crumbs" aria-label="ब्रेडक्रंब"><a href="index.html">मुखपृष्ठ</a><span>/</span><span>समदड़ी धाम</span></nav>
    <p class="eyebrow">बाड़मेर · राजस्थान · स्थापना १९७५</p>
    <h1>समदड़ी धाम</h1>
    <p class="lede">समाज का सबसे बड़ा मंदिर — और उससे बढ़कर, पाँच पट्टियों का एक संयुक्त निर्माण। यह पृष्ठ उन लोगों के लिए है जो यहाँ आना चाहते हैं, और उनके लिए भी जो जानना चाहते हैं कि यह कैसे बना।</p>
  </div>
</section>

<section class="section section--tight">
  <div class="wrap">
    <div class="stats">
      <div class="stat"><span class="stat__n">१९७५</span><span class="stat__l">स्थापना</span></div>
      <div class="stat"><span class="stat__n">८–९</span><span class="stat__l">बीघा परिसर</span></div>
      <div class="stat"><span class="stat__n">५</span><span class="stat__l">संस्थापक पट्टियाँ</span></div>
      <div class="stat"><span class="stat__n">२</span><span class="stat__l">वार्षिक मेले</span></div>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap split">
    <div>
      ${sectionHead({ index: '०१ — इतिहास', title: 'पाँच पट्टियों ने मिलकर बनाया' })}
      <div class="prose">
        <p>समदड़ी धाम किसी एक गोत्र, किसी एक गाँव या किसी एक संत का प्रकल्प नहीं था। इसे <strong>पाँच पट्टियों</strong> ने मिलकर बनाया — और यह बात मंदिर के संस्थापक ट्रस्टियों की सूची में साफ़ दिखती है।</p>
        <p>नींव रखी <strong>श्री १००८ खेतारामजी महाराज (आसोतरा)</strong> ने — वही संत जिनकी कुटिया आज भी मंदिर के पास खड़ी है, जहाँ उन्होंने ब्रह्म-भक्ति की थी। उनके साथ पाँच स्थानीय संस्थापक थे, और <strong>हर पट्टी से ठीक एक</strong>।</p>
        <p>यह कोई संयोग नहीं है। इसका मतलब है कि मंदिर शुरू से ही एक <strong>संघीय परियोजना</strong> थी — और इसीलिए ट्रस्ट गोत्र के हिसाब से नहीं, पट्टी के हिसाब से चलता है।</p>
      </div>
    </div>
    <div>
      <div class="note">
        <span class="note__label">एक सावधानी</span>
        <p>समाज के हर वेबसाइट पर इसे "भारत का सबसे बड़ा मंदिर" कहा जाता है। यह <strong>समाज का दावा</strong> है, किसी नाप-जोख का नतीजा नहीं।</p>
        <p>इस वेबसाइट पर हम लिखते हैं: <strong>"समाज का सबसे बड़ा मंदिर"</strong> — यह सच है और टिकाऊ है।</p>
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    ${sectionHead({
      index: '०२ — संस्थापक',
      title: 'एक पट्टी, एक संस्थापक',
      intro: 'मंदिर की संवैधानिक विशेषता — हर पट्टी का बराबर हिस्सा।',
    })}
    <div class="table-wrap">
      <table class="data">
        <caption>समदड़ी मंदिर के पाँच संस्थापक ट्रस्टी</caption>
        <thead><tr><th>पट्टी</th><th>संस्थापक</th><th>गाँव</th></tr></thead>
        <tbody>
          ${FOUNDERS.map(f => `<tr><td>${f[0]} पट्टी</td><td>${f[1]}</td><td>${f[2]}</td></tr>`).join('')}
        </tbody>
      </table>
    </div>
    <p class="tiny" style="margin-top:1rem">स्रोत: panchpatti.in — "समदड़ी मंदिर का इतिहास"। नोट: सूची में छह नाम हैं क्योंकि खेतारामजी महाराज संत थे, और पाँच स्थानीय संस्थापक पट्टी-प्रतिनिधि।</p>
  </div>
</section>

<section class="section" id="aana">
  <div class="wrap">
    ${sectionHead({ index: '०३ — यात्रा', title: 'कैसे पहुँचें' })}
    <div class="grid grid--2">
      <div class="dl">
        <div class="dl__row"><span class="dl__k">पता</span><span class="dl__v">श्री पीपाजी मंदिर, समदड़ी (स्टेशन रोड), जिला बाड़मेर, राजस्थान</span></div>
        <div class="dl__row"><span class="dl__k">रेल</span><span class="dl__v">समदड़ी रेलवे स्टेशन — जोधपुर–बाड़मेर लाइन। मंदिर स्टेशन से पैदल दूरी पर।</span></div>
        <div class="dl__row"><span class="dl__k">सड़क</span><span class="dl__v">जोधपुर से लगभग १२० किमी; बाड़मेर से लगभग १०० किमी। बालोतरा से निकटतम।</span></div>
        <div class="dl__row"><span class="dl__k">फ़ोन</span><span class="dl__v">02900-276257</span></div>
        <div class="dl__row"><span class="dl__k">ईमेल</span><span class="dl__v">pkds.webteam@gmail.com</span></div>
      </div>
      <div class="map-note">
        <p style="font-family:var(--font-display);font-size:1.15rem;color:var(--ink);margin-bottom:.6rem">समदड़ी, बाड़मेर</p>
        <p>जोधपुर — बालोतरा — समदड़ी — बाड़मेर</p>
        <p style="margin-top:.8rem">मंदिर स्टेशन रोड पर है। रेल से आने पर उतरते ही पूछ लें — गाँव छोटा है और मंदिर सबको पता है।</p>
        <p style="margin-top:1.2rem"><a href="https://www.google.com/maps/search/?api=1&query=Shri+Pipaji+Mandir+Samdari+Barmer" target="_blank" rel="noopener">मैप पर देखें →</a></p>
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    ${sectionHead({ index: '०४ — ठहरना', title: 'धाम में सुविधाएँ' })}
    <div class="grid grid--4">
      <div class="card"><span class="card__kicker">धर्मशाला</span><h3>ठहरने की जगह</h3><p>यात्रियों के लिए धर्मशाला और कमरे। बड़े आयोजनों के समय पहले से पूछ लें।</p></div>
      <div class="card"><span class="card__kicker">भोजनशाला</span><h3>प्रसाद और भोजन</h3><p>भोजनशाला में सामूहिक भोजन की व्यवस्था।</p></div>
      <div class="card"><span class="card__kicker">पिपेश्वर महादेव</span><h3>पास का मंदिर</h3><p>धाम से सटा श्री पिपेश्वर महादेवजी का मंदिर — पाँच पट्टियों द्वारा निर्मित।</p></div>
      <div class="card"><span class="card__kicker">कुटिया</span><h3>खेतारामजी महाराज की कुटिया</h3><p>संस्थापक संत की कुटिया आज भी परिसर में है।</p></div>
    </div>
    <p class="tiny" style="margin-top:1.2rem">स्रोत: panchpatti.in — "समदडी मंदिर पर उपलब्ध सुविधायें"। दैनिक आरती प्रातः और सायं दो बार होती है।</p>
  </div>
</section>

<section class="section">
  <div class="wrap">
    ${sectionHead({ index: '०५ — कब आएँ', title: 'दो मेले, बारह महीने' })}
    <div class="grid grid--2">
      <div class="card" style="padding-top:1.5rem">
        <span class="card__kicker">मुख्य</span>
        <h3>चैत्र पूर्णिमा मेला</h3>
        <p>मार्च–अप्रैल। पीपाजी की जयंती का सबसे बड़ा आयोजन — पाँचों पट्टियों का संगम, शोभायात्रा, और पूरे समाज का मिलन।</p>
      </div>
      <div class="card" style="padding-top:1.5rem">
        <span class="card__kicker">दूसरा</span>
        <h3>कार्तिक पूर्णिमा अन्नकूट</h3>
        <p>नवंबर। अन्नकूट का उत्सव — अन्न के ढेर, प्रसाद, और सामूहिक भोज।</p>
      </div>
    </div>
  </div>
</section>

<section class="section" id="vivah">
  <div class="wrap">
    ${sectionHead({
      index: '०६ — सामूहिक विवाह',
      title: 'एक संस्था, जो पीढ़ियों से चली',
      intro: 'समदड़ी का सामूहिक विवाह समाज की सबसे जीवंत संस्थाओं में से एक है। नीचे २०१६ के छठे आयोजन का पूरा ब्यौरा है — ताकि आप समझ सकें कि व्यवस्था कैसे चलती है।',
    })}
    <div class="grid grid--2">
      <div class="dl">
        <div class="dl__row"><span class="dl__k">आयोजन</span><span class="dl__v">छठा सामूहिक विवाह</span></div>
        <div class="dl__row"><span class="dl__k">तिथि</span><span class="dl__v">१२ फ़रवरी २०१६ · महासुदी ५, संवत २०७२ · वसंत पंचमी</span></div>
        <div class="dl__row"><span class="dl__k">शुल्क</span><span class="dl__v">₹११,००१</span></div>
        <div class="dl__row"><span class="dl__k">सीमा</span><span class="dl__v">१५ जोड़े</span></div>
        <div class="dl__row"><span class="dl__k">पंजीकरण</span><span class="dl__v">१२ जनवरी २०१६ तक</span></div>
      </div>
      <div>
        <p class="small" style="margin-bottom:.8rem"><strong>वर को:</strong> सूट, साफ़ा, नारियल।</p>
        <p class="small" style="margin-bottom:.8rem"><strong>वधू को:</strong> चाँदी का जूडो, पायल, कांसी की थाली-वाटकी-बाजोट, पलंग-बिस्तर, लोहे की अलमारी, सोने के टोपस-कानरा-फिनी।</p>
        <p class="small" style="margin-bottom:.8rem"><strong>साथ में:</strong> प्रत्येक पक्ष को ७५ भोजन-कूपन और ५० निमंत्रण।</p>
        <div class="note note--warn" style="margin-top:1.2rem">
          <span class="note__label">पुष्टि आवश्यक</span>
          <p>ये आँकड़े २०१६ के हैं। अगली तिथि, शुल्क और नियम बदल सकते हैं — <strong>ट्रस्ट से सीधे पुष्टि करें</strong>, इस पृष्ठ से नहीं।</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    ${sectionHead({ index: '०७ — ट्रस्ट', title: 'कौन चलाता है' })}
    <div class="table-wrap">
      <table class="data">
        <caption>श्री पीपा क्षत्रिय पंचपट्टी दर्जी समाज मंदिर ट्रस्ट — पदाधिकारी</caption>
        <thead><tr><th>पद</th><th>नाम</th><th>संपर्क</th></tr></thead>
        <tbody>
          <tr><td>अध्यक्ष</td><td>बंसीलाल रतनाजी दहिया (सीड़ली जागीर)</td><td class="muted">—</td></tr>
          <tr><td>महामंत्री</td><td>मोहनलाल तिलवाड़ा</td><td>9427068932</td></tr>
          <tr><td>कोषाध्यक्ष</td><td>गिरधारीलाल ढिंढस</td><td>9352232393</td></tr>
          <tr><td>मंदिर व्यवस्थापक</td><td>रणछोड़जी</td><td class="muted">—</td></tr>
        </tbody>
      </table>
    </div>
    <p class="tiny" style="margin-top:1rem">केवल पदाधिकारियों के नाम और कार्यालय संपर्क। सदस्यों की निजी सूची यहाँ नहीं दी जाती।</p>
  </div>
</section>

<section class="section">
  <div class="wrap">
    ${sectionHead({ index: '०८ — आसपास', title: 'धाम के आगे' })}
    <div class="grid grid--3">
      <a class="card" href="tirth.html#gagron" style="text-decoration:none"><span class="card__kicker">जन्मस्थान</span><h3>गागरोन</h3><p>कालीसिंध-आहू संगम पर दुर्ग, मंदिर, छतरी और साधना-गुफा।</p><span class="card__link">तीर्थ देखें</span></a>
      <a class="card" href="tirth.html#toda" style="text-decoration:none"><span class="card__kicker">निवास</span><h3>टोडा</h3><p>भक्तमाल का टोडानगर — गुफा-तीर्थ और टोडा के वर्ष।</p><span class="card__link">तीर्थ देखें</span></a>
      <a class="card" href="tirth.html#pipar" style="text-decoration:none"><span class="card__kicker">तपस्या</span><h3>पीपाड़</h3><p>जोधपुर के पास — पीपल के नीचे तपस्या की परंपरा।</p><span class="card__link">तीर्थ देखें</span></a>
    </div>
  </div>
</section>
`;

export default {
  slug: 'samdari.html',
  html: page({
    slug: 'samdari.html',
    title: 'समदड़ी धाम',
    description: 'समदड़ी मंदिर — इतिहास, पाँच संस्थापक, कैसे पहुँचें, ठहरना, मेले, सामूहिक विवाह और ट्रस्ट।',
    body,
    current: 'samdari.html',
    schema: {
      '@type': 'HinduTemple',
      '@id': 'https://pipaparampara.in/samdari.html#temple',
      name: 'श्री पीपा क्षत्रिय पंचपट्टी दर्जी समाज मंदिर, समदड़ी',
      alternateName: 'समदड़ी धाम',
      description: 'पाँच पट्टियों का संयुक्त तीर्थ, स्थापना १९७५। चैत्र पूर्णिमा और कार्तिक पूर्णिमा पर वार्षिक मेले।',
      foundingDate: '1975',
      telephone: '+91-2900-276257',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'स्टेशन रोड, समदड़ी',
        addressLocality: 'समदड़ी',
        addressRegion: 'राजस्थान',
        postalCode: '344026',
        addressCountry: 'IN',
      },
      geo: { '@type': 'GeoCoordinates', latitude: 25.6327, longitude: 72.1186 },
      religion: { '@type': 'Religion', name: 'हिन्दू' },
      isAccessibleForFree: true,
      publicAccess: true,
      event: [
        {
          '@type': 'Event',
          name: 'चैत्र पूर्णिमा मेला — पीपाजी जयंती',
          eventSchedule: { '@type': 'Schedule', byMonth: 3, byMonthDay: 15, repeatFrequency: 'P1Y' },
          eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
          location: { '@id': 'https://pipaparampara.in/samdari.html#temple' },
        },
        {
          '@type': 'Event',
          name: 'कार्तिक पूर्णिमा अन्नकूट',
          eventSchedule: { '@type': 'Schedule', byMonth: 11, repeatFrequency: 'P1Y' },
          eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
          location: { '@id': 'https://pipaparampara.in/samdari.html#temple' },
        },
      ],
      sameAs: ['https://panchpatti.in/'],
    },
  }),
};
