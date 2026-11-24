import { page, sectionHead, badge } from '../layout.mjs';
import { SITES } from '../data.mjs';

const STATES = [...new Set(SITES.map(s => s.state))];

const card = (s) => `<article class="tirth" id="${s.id}" data-tags="${s.state} ${s.conf}">
  <span class="tirth__state">${s.state} · ${s.region}</span>
  <h3>${s.name}</h3>
  <span class="tirth__type">${s.type}</span>
  <p>${s.blurb}</p>
  <p style="margin-top:.7rem;font-size:.82rem;color:var(--ink-3)"><strong>कैसे पहुँचें:</strong> ${s.go}</p>
  <p style="margin-top:.8rem">${badge(s.conf, s.confLabel)}</p>
</article>`;

const ITIN = [
  ['दिन १', 'गागरोन', 'दुर्ग, मंदिर, छतरी, संगम पर गुफा। झालावाड़ में रात।'],
  ['दिन २', 'टोडा', 'टोडारायसिंह — गुफा-तीर्थ। अजमेर या जयपुर की ओर।'],
  ['दिन ३', 'पीपाड़', 'पीपल के नीचे तपस्या-स्थल। जोधपुर में रात।'],
  ['दिन ४', 'समदड़ी', 'धाम, खेतारामजी महाराज की कुटिया, पिपेश्वर महादेव।'],
  ['दिन ५', 'सागवाड़ा', 'वागड़ शाखा, द्वारिकाधीश मंदिर। डूंगरपुर से वापसी।'],
];

const body = `
<section class="page-hero">
  <div class="wrap">
    <nav class="crumbs" aria-label="ब्रेडक्रंब"><a href="index.html">मुखपृष्ठ</a><span>/</span><span>तीर्थ</span></nav>
    <p class="eyebrow">११ स्थल · ५ राज्य · हर स्थल पर प्रमाण का दर्जा</p>
    <h1>पीपाजी के तीर्थ</h1>
    <p class="lede">पीपाजी की स्मृति एक जगह नहीं, एक मार्ग है — गागरोन से काशी, काशी से टोडा, और टोडा से द्वारिका। यहाँ हर वह स्थल है जो उनसे जुड़ा मिला, और यह भी बताया गया है कि किस स्थल पर कितना भरोसा किया जा सकता है।</p>
  </div>
</section>

<section class="section section--tight">
  <div class="wrap">
    <div class="note" style="border-left-color:var(--madder)">
      <span class="note__label">एक वाक्य में पूरी भूगोल</span>
      <p style="font-family:var(--font-display);font-size:var(--step-2);line-height:1.55;color:var(--ink)">गागरोन में जन्म और साधना। टोडा में गृहस्थ-संन्यास का जीवन, अन्नदान और गुफा। द्वारिका में कृपा से उपस्थिति।</p>
      <p style="margin-top:.8rem"><strong>तीन स्थान, तीन अवस्थाएँ, कोई विरोध नहीं।</strong></p>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="filters" data-filter-group data-filter-target="#tirth-grid .tirth">
      <button class="chip" data-filter="" aria-pressed="true">सभी</button>
      ${STATES.map(s => `<button class="chip" data-filter="${s}" aria-pressed="false">${s}</button>`).join('')}
      <span style="width:1px;height:1.6rem;background:var(--rule);margin-inline:.4rem"></span>
      <button class="chip" data-filter="ok" aria-pressed="false">प्रमाणित</button>
      <button class="chip" data-filter="trad" aria-pressed="false">परंपरा</button>
      <button class="chip" data-filter="local" aria-pressed="false">स्थानीय</button>
    </div>
    <h2 class="sr-only">तीर्थ-स्थल</h2>
    <div class="tirth-grid" id="tirth-grid">
      ${SITES.map(card).join('\n')}
    </div>
    <p class="tiny" style="margin-top:1.4rem">ग्यारह स्थल। पाँच पर पूरा भरोसा, तीन परंपरा के आधार पर, और तीन पर केवल एक स्थानीय उल्लेख — उन तीन की यात्रा से पहले स्थानीय पुष्टि कर लें।</p>
  </div>
</section>

<section class="section">
  <div class="wrap">
    ${sectionHead({
      index: '०१ — गुफा का सवाल',
      title: 'गुफा कहाँ है?',
      intro: 'यह वह सवाल है जिस पर दो सरकारी दस्तावेज़ एक-दूसरे से नहीं मिलते — और इसका जवाब दोनों को मानना है।',
    })}
    <div class="split">
      <div class="prose">
        <p>राजस्थान बोर्ड की <strong>कक्षा १० की क्षितिज</strong> पुस्तक कहती है कि पीपाजी ने गागरोन में गुफा के अंदर साधना की।</p>
        <p>राजस्थान <strong>पटवारी परीक्षा (२४ अक्टूबर २०२१) की आधिकारिक उत्तर-कुंजी</strong> कहती है — "'संत पीपाजी' की गुफा कहाँ है? → <strong>टोडा</strong>।" और साथ में यह भी: "संत पीपाजी गागरोन में आहू और कालीसिंध नदियों के संगम के पास स्थित एक गुफा के दर्शन भी किया करते थे।"</p>
        <p>और <strong>भक्तमाल</strong> — सबसे पुराना ग्रंथ — पीपाजी का निवास <strong>टोडानगर</strong> बताता है।</p>
        <p><strong>यानी दो गुफाएँ हैं, और दोनों सच हैं:</strong> गागरोन की गुफा साधना की है, टोडा की गुफा निवास की। इन्हें आपस में लड़ाने की ज़रूरत नहीं।</p>
      </div>
      <div>
        <div class="dl">
          <div class="dl__row"><span class="dl__k">गागरोन गुफा</span><span class="dl__v">कालीसिंध-आहू संगम के पास, दुर्ग के नीचे। साधना और दर्शन की गुफा।</span></div>
          <div class="dl__row"><span class="dl__k">टोडा गुफा</span><span class="dl__v">टोडारायसिंह, जिला टोंक। निवास और, वागड़ परंपरा के अनुसार, देहावसान का स्थान।</span></div>
          <div class="dl__row"><span class="dl__k">स्रोत</span><span class="dl__v">क्षितिज कक्षा १० · RPSC पटवारी उत्तर-कुंजी २०२१ · भक्तमाल १५८५</span></div>
        </div>
        <p class="tiny" style="margin-top:1rem">इस वेबसाइट पर <strong>दोनों को तीर्थ माना गया है।</strong></p>
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    ${sectionHead({
      index: '०२ — यात्रा',
      title: 'पाँच दिन, पाँच स्थान',
      intro: 'एक सुझाया हुआ मार्ग — जोधपुर या जयपुर से शुरू करके, गाड़ी से। दूरियाँ बदल सकती हैं; रात का ठहरना पहले तय कर लें।',
    })}
    <div class="itin">
      ${ITIN.map(i => `<div class="itin__stop">
        <span class="itin__day">${i[0]}</span>
        <h3>${i[1]}</h3>
        <p>${i[2]}</p>
      </div>`).join('')}
    </div>
    <div class="note" style="margin-top:2rem">
      <span class="note__label">व्यवस्था की सलाह</span>
      <p>समदड़ी में धर्मशाला है, पर बड़े मेलों में पहले से पूछ लें — <strong>02900-276257</strong>। गागरोन में झालावाड़ शहर में ठहरना आसान है। टोडा और पीपाड़ छोटे स्थल हैं; उन्हें एक ही दिन में जोड़ा जा सकता है।</p>
      <p>सागवाड़ा में वागड़ शाखा का द्वारिकाधीश मंदिर है — वहाँ संपर्क गोविन्द दर्जी, <strong>7665057775</strong>।</p>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    ${sectionHead({ index: '०३ — स्रोत', title: 'यह सूची कहाँ से बनी' })}
    <div class="dl">
      <div class="dl__row"><span class="dl__k">मुख्य</span><span class="dl__v">भक्तमाल (१५८५) एवं प्रियादास की टीका (१७१२) — स्थानों का सबसे पुराना क्रम</span></div>
      <div class="dl__row"><span class="dl__k">सरकारी</span><span class="dl__v">राजस्थान बोर्ड क्षितिज कक्षा १०; RPSC पटवारी उत्तर-कुंजी २०२१</span></div>
      <div class="dl__row"><span class="dl__k">स्थानीय</span><span class="dl__v">panchpatti.in, pkds.in, वागड़ ब्लॉग, निमाड़–मालवा जीवन-गाथा (२०१६)</span></div>
      <div class="dl__row"><span class="dl__k">मानचित्र</span><span class="dl__v">गागरोन धाम: 24.6205568, 76.1855113 · मलवाड़ा: ☎ 8103056705 · चेम्बूर: ☎ 086527 90010</span></div>
    </div>
    <p class="tiny" style="margin-top:1.2rem;max-width:70ch">जिन स्थलों पर केवल एक उल्लेख मिला — काशी का कूप, द्वारिका का पीपा वाट, अमरोली की बाव — उन्हें "स्थानीय" का दर्जा दिया गया है। यह उन्हें झूठा नहीं कहता; यह केवल ईमानदारी है कि हमारे पास एक ही स्रोत है।</p>
  </div>
</section>
`;

export default {
  slug: 'tirth.html',
  html: page({
    slug: 'tirth.html',
    title: 'पीपा तीर्थ',
    description: 'गागरोन, टोडा, समदड़ी, पीपाड़, मलवाड़ा, सागवाड़ा, वसई और चेम्बूर — पीपाजी से जुड़े सभी तीर्थ, यात्रा-मार्ग और प्रमाण के साथ।',
    body,
    current: 'tirth.html',
    schema: {
      '@type': 'ItemList',
      '@id': 'https://pipaparampara.in/tirth.html#places',
      name: 'पीपाजी से जुड़े तीर्थ',
      numberOfItems: SITES.length,
      inLanguage: 'hi',
      itemListElement: SITES.map((site, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'TouristAttraction',
          name: site.name,
          description: site.blurb,
          address: {
            '@type': 'PostalAddress',
            addressRegion: site.region,
            addressCountry: 'IN',
          },
          ...(site.coords ? { geo: (() => {
            const [lat, lon] = site.coords.split(',').map((x) => Number(x.trim()));
            return { '@type': 'GeoCoordinates', latitude: lat, longitude: lon };
          })() } : {}),
          touristType: 'धार्मिक यात्रा',
        },
      })),
    },
  }),
};
