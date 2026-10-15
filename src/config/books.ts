export const bookLanguages = [
  { id: 'fr', label: 'Français', short: 'FR' },
  { id: 'en', label: 'English', short: 'EN' },
  { id: 'zh', label: '中文', short: '中文' },
] as const;

export type BookLang = (typeof bookLanguages)[number]['id'];

export type Book = {
  slug: string;
  year: string;
  format: { fr: string; en: string };
  status: { fr: string; en: string };
  title: Record<BookLang, string>;
  subtitle: Record<BookLang, string>;
  cover: Record<BookLang, string>;
  pdf: Record<BookLang, string>;
  idea: { fr: string[]; en: string[] };
  refuses: { fr: string[]; en: string[] };
};

export const books: Book[] = [
  {
    slug: 'souverainete-cloud-europeenne',
    year: '2026',
    format: {
      fr: 'Essai technologique · 18 chapitres · PDF',
      en: 'Technology essay · 18 chapters · PDF',
    },
    status: {
      fr: 'Essai · éditions FR · EN · ZH · 2026',
      en: 'Essay · FR · EN · ZH editions · 2026',
    },
    title: {
      fr: 'La souveraineté cloud européenne',
      en: 'European Cloud Sovereignty',
      zh: '欧洲云主权',
    },
    subtitle: {
      fr: 'Les capacités humaines, économiques, technologiques et industrielles qui déterminent l’autonomie numérique de l’Europe.',
      en: 'The human, economic, technological and industrial capabilities that shape Europe’s digital autonomy.',
      zh: '决定欧洲数字自主的人文、经济、技术与产业能力。',
    },
    cover: {
      fr: '/Livres/souverainete-cloud-europeenne/cover-fr.png',
      en: '/Livres/souverainete-cloud-europeenne/cover-en.png',
      zh: '/Livres/souverainete-cloud-europeenne/cover-zh.png',
    },
    pdf: {
      fr: '/Livres/souverainete-cloud-europeenne/fr/La-souverainete-cloud-europeenne_FR.pdf',
      en: '/Livres/souverainete-cloud-europeenne/en/European-Cloud-Sovereignty_EN.pdf',
      zh: '/Livres/souverainete-cloud-europeenne/zh/European-Cloud-Sovereignty_ZH.pdf',
    },
    idea: {
      fr: [
        'Le livre reformule la souveraineté cloud comme un degré de capacités interdépendantes — humaines, économiques, technologiques, industrielles et institutionnelles — plutôt que comme une étiquette d’hébergement ou un score unique.',
        'Dix-huit chapitres progressent de l’infrastructure au capital humain, à l’économie, à l’industrie, à la mesure et aux scénarios, en distinguant faits établis, estimations, hypothèses plausibles et questions ouvertes.',
      ],
      en: [
        'The book reframes cloud sovereignty as a degree of interdependent capabilities — human, economic, technological, industrial and institutional — rather than a hosting label or a single score.',
        'Eighteen chapters move from infrastructure to human capital, economics, industry, measurement and scenarios, while distinguishing established facts, estimates, plausible hypotheses and open questions.',
      ],
    },
    refuses: {
      fr: [
        'Réduire la souveraineté à une localisation de données ou à un label marketing.',
        'Confondre ambition politique et preuve empirique déjà acquise.',
        'Présenter un score unique comme mesure suffisante de l’autonomie numérique.',
        'Masquer les limites : coûts totaux, inventaires de contrôle, réversibilité encore partielle.',
      ],
      en: [
        'Reducing sovereignty to data location or a marketing label.',
        'Confusing political ambition with already established empirical proof.',
        'Presenting a single score as a sufficient measure of digital autonomy.',
        'Hiding limits: total costs, control inventories, still-partial reversibility.',
      ],
    },
  },
  {
    slug: 'si-einstein-avait-eu-chatgpt',
    year: '2026',
    format: {
      fr: 'Essai scientifique illustré · ~120 pages · PDF',
      en: 'Illustrated scientific essay · ~120 pages · PDF',
    },
    status: {
      fr: 'Essai scientifique illustré · version de travail · 2026',
      en: 'Illustrated scientific essay · working draft · 2026',
    },
    title: {
      fr: 'Si Einstein avait eu ChatGPT',
      en: 'If Einstein Had Had ChatGPT',
      zh: '如果爱因斯坦用过ChatGPT',
    },
    subtitle: {
      fr: 'Ce que l’intelligence artificielle pourrait apprendre de notre manière de penser — et ce que nous sommes en train de lui apprendre du monde.',
      en: 'What artificial intelligence could learn from the way we think — and what we are teaching it about the world.',
      zh: '人工智能可能从我们的思维方式中学到什么 — 以及我们正在教它认识怎样的世界。',
    },
    cover: {
      fr: '/Livres/si-einstein-avait-eu-chatgpt/cover-fr.jpg',
      en: '/Livres/si-einstein-avait-eu-chatgpt/cover-en.jpg',
      zh: '/Livres/si-einstein-avait-eu-chatgpt/cover-zh.jpg',
    },
    pdf: {
      fr: '/Livres/si-einstein-avait-eu-chatgpt/si-einstein-avait-eu-chatgpt.pdf',
      en: '/Livres/si-einstein-avait-eu-chatgpt/if-einstein-had-had-chatgpt.pdf',
      zh: '/Livres/si-einstein-avait-eu-chatgpt/ruguo-aijisitan-you-chatgpt.pdf',
    },
    idea: {
      fr: [
        'Le livre part d’une expérience de pensée : un Einstein contemporain confie ses traces intellectuelles à un assistant. Non pour le ressusciter, mais pour demander ce qu’un système pourrait réellement modéliser — et ce qu’il ne pourra jamais reconstituer.',
        'Cette question s’élargit ensuite au miroir collectif : nos traces numériques deviennent des données ; des modèles en tirent des représentations du monde. Le texte donne des outils pour distinguer ce qui est établi, inféré, hypothétique ou encore inconnu.',
      ],
      en: [
        'The book starts from a thought experiment: a contemporary Einstein entrusts his intellectual traces to an assistant. Not to resurrect him, but to ask what a system could actually model — and what it could never reconstruct.',
        'The question then expands to a collective mirror: our digital traces become data; models extract world representations from them. The text offers tools to distinguish what is established, inferred, hypothetical, or still unknown.',
      ],
    },
    refuses: {
      fr: [
        'Confondre une personne avec les traces qu’elle laisse.',
        'Prendre une réponse fluide pour une preuve.',
        'Présenter une simulation comme une identité ou une conscience.',
        'Transformer un scénario conditionnel en prédiction.',
      ],
      en: [
        'Confusing a person with the traces they leave.',
        'Taking a fluent answer as proof.',
        'Presenting a simulation as an identity or a consciousness.',
        'Turning a conditional scenario into a prediction.',
      ],
    },
  },
];

export function getBook(slug: string) {
  return books.find((book) => book.slug === slug);
}
