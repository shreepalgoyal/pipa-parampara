import { page, esc } from '../layout.mjs';

/* Hand-written English. Not a translation of the Hindi pages — an independent
   introduction for researchers, journalists and readers outside the community. */

const body = `
<section class="page-hero">
  <div class="wrap">
    <nav class="crumbs" aria-label="Breadcrumb"><a href="index.html">मुखपृष्ठ</a><span>/</span><span lang="en">English</span></nav>
    <p class="eyebrow">A source-based community archive</p>
    <h1 lang="en">Pipa Parampara</h1>
    <p class="lede" lang="en">Pipa was a fourteenth- or fifteenth-century Rajput king who gave up his throne, his sword and eventually his kingdom's expectations — and took up a needle. This site is a documented archive of the tradition that grew around him.</p>
    <p class="lang-note" style="margin-top:1.2rem">
      <span>मूल पाठ हिन्दी में है।</span>
      <a href="index.html" hreflang="hi" lang="hi">हिन्दी में पढ़ें →</a>
    </p>
  </div>
</section>

<section class="section">
  <div class="wrap">
  <div class="prose prose--en" lang="en">

    <h2>Who this is for</h2>
    <p>This archive was built for four kinds of readers: members of the Pipa Kshatriya / Darji community who want their own history in one place; students who meet Pipa in a Class 10 Rajasthan Board textbook and want to know what lies beyond the lesson; researchers who need to see where each claim comes from; and anyone who has heard the name and wants a straight answer.</p>
    <p>Every page carries its sources at the bottom. Every claim carries one of four badges — <strong>verified</strong>, <strong>tradition</strong>, <strong>local</strong>, or <strong>disputed</strong>. Where two accounts conflict, both are printed side by side and neither is declared correct.</p>

    <h2>The short version</h2>
    <p>Pipa (पीपाजी) is remembered as the ruler of Gagron, a hill fort in what is now Jhalawar district, Rajasthan, where the Kali Sindh and Ahu rivers meet. He is said to have been a Khichi Chauhan Rajput. According to the <em>Bhaktamal</em> of Nabhadas (c. 1585 CE) and its seventeenth-century commentary by Priyadas, Pipa was a devotee of the goddess Bhavani until a night when she told him that liberation was not hers to give — he should go to Kashi and find Ramananda. He did. He became Ramananda's disciple, returned to his kingdom, and later renounced it. He spent his last years in Toda, near present-day Todaraisingh in Tonk district, living as a householder-saint.</p>
    <p>The line the community quotes most is <em>taravār tyāg'ar suī dhāraṇ karī</em> — "he abandoned the sword and took up the needle." The needle is not a joke in this tradition. It is the emblem of a king who chose stitching over killing, and it is why the community that traces itself to his disciples calls itself Darji — tailor.</p>

    <h2>Four places, one life</h2>
    <p>The narrative is organised by geography rather than by date, because the dates are contested and the places are not.</p>
    <ul>
      <li><strong>Gagron</strong> — birth, accession, the goddess, the decision to leave. The fort is a UNESCO World Heritage site (2013) and the town below holds a Pipa temple, a chhatri and a cave.</li>
      <li><strong>Kashi</strong> — the search for Ramananda, the initiation, and the return. This is the section the <em>Bhaktamal</em> treats most briefly and the community's oral tradition treats most dramatically.</li>
      <li><strong>The forest</strong> — the years of wandering, and the twelve queens. Eleven turned back when the jewels had to be given up. Only Sita, remembered in the arati as "Sita the companion," walked on.</li>
      <li><strong>Toda</strong> — the longest and least-told section. Here Pipa runs an almshouse during a famine, digs up buried treasure and gives it away, restores a man excommunicated for cow-killing, and walks away from a comfortable hut because comfort had become a trap.</li>
    </ul>

    <h2>The dating problem</h2>
    <p>There are three serious positions, and this archive does not choose between them.</p>
    <div class="table-wrap">
      <table class="data">
        <caption>Three dating frames for Pipa</caption>
        <thead><tr><th>Frame</th><th>Dates</th><th>Held by</th></tr></thead>
        <tbody>
          <tr><td>Community Jayanti count</td><td>VS 1380 (c. 1323 CE)</td><td>Pipa Chetna, the Miraheze page, and the annual Jayanti calculation</td></tr>
          <tr><td>Rajasthan Board textbook</td><td>VS 1390–1470 (c. 1333–1413 CE)</td><td><em>Kshitij</em>, Class 10, Lesson 18</td></tr>
          <tr><td>Academic consensus</td><td>c. 1425 CE</td><td>Farquhar, Cunningham, and later survey histories</td></tr>
        </tbody>
      </table>
    </div>
    <p>All three agree on the day of the Jayanti: Chaitra Shukla Purnima. That agreement matters more than it looks. It means the disagreement is about chronology, not about identity.</p>

    <h2>What the sources actually say — and don't</h2>
    <p>The <em>Bhaktamal</em> never mentions stitching. It describes a king who became a devotee, and it places him in Toda. The sewing appears in community memory, in the arati, and in the etiological story that explains how a Kshatriya lineage produced a tailoring community: the disciples copied the guru.</p>
    <p>That silence is not a refutation. It is a silence, and this archive treats it as one. The distinction between "the text says" and "the tradition says" is the whole reason the badges exist.</p>

    <h2>Identity, stated carefully</h2>
    <p>Inside the community there are three positions about the name. One holds that "Pipa Kshatriya Darji" is the correct and complete name — the caste is Kshatriya, the profession is Darji, and the institutions use both. A second holds that "Darji" is a profession and not an identity, and that the community should be known as Pipa Kshatriya Rajput. A third holds that "Darji" is precisely the name to keep, because it honours the labour the guru himself chose.</p>
    <p>All three are printed on the <a href="pehchan.html">identity page</a> in their own terms. This archive does not adjudicate. What it does record is the documentary situation: in Rajasthan's OBC list, Chhipa is entry 8 and Darji is entry 12 — two separate entries. That is a fact about a list, not a verdict on anyone's ancestry.</p>
    <p>Readers outside India should know that a community's name, its ritual rank and its legal classification are three different things, and that the people concerned are the ones entitled to decide what they are called.</p>

    <h2>Five pattis, 204 villages</h2>
    <p>The community is organised into five regional <em>pattis</em> — Jalori, Sivachi, Malani, Chorai and Jodhpuri. A patti is not a clan. It is a territorial and ceremonial division, and each one holds a single seat on the trust that runs the Samdari temple. The archive lists 204 villages with their patti and gotra, searchable by name, and includes a normalisation note: Dabi/Dabhi, Padihariya/Parihar and Rakesha/Rakhecha are spelling variants of the same gotras, not different ones.</p>
    <p>Twelve gotras actually appear in the village list. Separately, the community keeps a list of fifty-two clans, which is a genealogy charter rather than a census. Both are published, labelled for what they are.</p>

    <h2>Samdari Dham</h2>
    <p>The community's largest temple stands at Samdari in Barmer district, built in 1975 on roughly eight to nine bighas. Its founding trustees are the clearest evidence of how the community works: one founder from each of the five pattis, plus the initiating ascetic Khetaram Maharaj of Asotra. The temple hosts two annual fairs — Chaitra Purnima, which is the Jayanti, and Kartik Purnima, the annakut. A mass-marriage ceremony has been held there since the 2000s; the sixth took place in February 2016. Those 2016 figures are published as 2016 figures and should be confirmed with the trust before anyone acts on them.</p>

    <h2>What this archive will not publish</h2>
    <p>Only office-bearers and institutional contact numbers appear here. The household and mobile directory of Samdari, and the list of thirteen patrons, are deliberately excluded. A community archive that republishes private phone numbers is not an archive; it is a leak.</p>
    <p>Financial details from 2016–18 are marked as unverified. Membership fees and bank details are reproduced only where an institution published them itself, with a note to confirm before sending money.</p>

    <h2>How to use and cite it</h2>
    <p>The whole site is readable without JavaScript. Search, reading preferences, translation and the book-progress bar are enhancements, not requirements.</p>
    <p>Suggested citation:</p>
    <blockquote class="verse__text" style="font-size:1rem;border-left:2px solid var(--rule);padding-left:1rem">
      Pipa Parampara, "Pipa Parampara — English summary," pipaparampara.in, accessed <span data-date>20 November 2026</span>.
    </blockquote>
    <p>Machine-readable versions: <a href="llms.txt">llms.txt</a> for a summary and page index, <a href="llms-full.txt">llms-full.txt</a> for the full Hindi text section by section, <a href="search-index.json">search-index.json</a> for the search corpus, and <a href="sitemap.xml">sitemap.xml</a> for the URL list.</p>

    <h2>Corrections</h2>
    <p>This archive is incomplete on purpose, and says so. If a village is missing, a gotra is wrong, a date is disputed, or you hold a document we do not, write to <a href="mailto:goyaltailors@gmail.com">goyaltailors@gmail.com</a> or use the <a href="yogdan.html">contribution page</a>. Corrections are published with the name of the person who supplied them, unless they ask otherwise.</p>

    <p class="book-footnote" style="margin-top:2.4rem">Written in English for this archive. It is not a machine translation of the Hindi pages, and the Hindi remains the primary text.</p>
    </div>
  </div>
</section>
`;

export default {
  slug: 'en.html',
  html: page({
    slug: 'en.html',
    title: 'Pipa Parampara — English summary',
    description: 'A source-based English introduction to Pipaji of Gagron, the Pipa Kshatriya / Darji tradition, the five pattis and 204 villages, Samdari Dham, and the dating and identity debates.',
    body,
    bodyClass: 'page-en',
    current: 'en.html',
    lang: 'en',
    sources: [
      ['Primary', 'Nabhadas, <em>Bhaktamal</em>, doha 301 (c. 1585 CE)'],
      ['Commentary', 'Priyadas, <em>Bhaktirasbodhini</em> (1712 CE) — the source for the Toda years'],
      ['Textbook', 'Rajasthan Board, <em>Kshitij</em>, Class 10, Lesson 18', 'assets/docs/kshitij-pipa.pdf'],
      ['Hagiography', 'Nimar–Malwa tradition, <em>Pipaji Maharaj ki Jeevan Gatha</em> (2016)', 'assets/docs/jeevan-gatha.pdf'],
      ['Archive', 'pkds.in and panchpatti.in', 'https://www.pkds.in/'],
    ],
    schema: {
      '@type': 'Article',
      '@id': 'https://pipaparampara.in/en.html#article',
      headline: 'Pipa Parampara — English summary',
      inLanguage: 'en',
      url: 'https://pipaparampara.in/en.html',
      about: { '@id': 'https://pipaparampara.in/#organisation' },
      author: { '@type': 'Organization', name: 'Pipa Parampara Archive' },
      publisher: { '@id': 'https://pipaparampara.in/#organisation' },
      isAccessibleForFree: true,
    },
  }),
};
