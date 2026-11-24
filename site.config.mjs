/*
 * One file, one origin.
 *
 * `canonical` URLs, sitemap.xml, robots.txt, llms.txt, JSON-LD @ids, og:image
 * paths and the address printed on verse posters all derive from SITE.url.
 * Page modules carry the ORIGIN_PLACEHOLDER literal instead of a real domain;
 * build.mjs rewrites it to SITE.url on every build.
 *
 * To change the address: edit SITE.url, then run
 *   npm run build && npm run og
 * and every machine-readable artefact follows. Nothing else needs touching.
 */
export const SITE = {
  name: 'पीपा परंपरा',
  nameEn: 'PIPA PARAMPARA',
  tagline: 'समाज का इतिहास, साहित्य और तीर्थ',
  desc: 'पीपा क्षत्रिय · दर्जी समाज की परंपरा — स्रोतों के साथ। पीपाजी की कथा, वाणी, समदड़ी धाम, पाँच पट्टी के २०४ गाँव, और सभी पीपा तीर्थ।',
  email: 'goyaltailors@gmail.com',
  url: 'https://pkds.pages.dev',
  sameAs: [
    'https://www.pkds.in/',
    'https://panchpatti.in/',
    'https://shreepipakshatriya.wordpress.com/',
    'https://darjirajput.blogspot.com/',
  ],
};

/* The literal that page modules and the poster renderer write down.
   It is never published: build.mjs replaces it with SITE.url. */
export const ORIGIN_PLACEHOLDER = 'https://pipaparampara.in';
