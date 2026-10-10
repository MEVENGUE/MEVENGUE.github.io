export const site = {
  name: 'Franck Mevengue',
  email: 'mevengueengofranck@gmail.com',
  linkedin: 'https://www.linkedin.com/in/franck-mevengue-839028207/',
  github: 'https://github.com/MEVENGUE',
  deepwiki: 'https://deepwiki.com/MEVENGUE/MEVENGUE',
  location: 'Paris, France',
  book: {
    cover: {
      fr: '/Livres/cover-fr.jpg',
      en: '/Livres/cover-en.jpg',
      zh: '/Livres/cover-zh.jpg',
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
    pdf: {
      fr: '/Livres/si-einstein-avait-eu-chatgpt.pdf',
      en: '/Livres/if-einstein-had-had-chatgpt.pdf',
      zh: '/Livres/ruguo-aijisitan-you-chatgpt.pdf',
    },
    languages: [
      { id: 'fr', label: 'Français', short: 'FR' },
      { id: 'en', label: 'English', short: 'EN' },
      { id: 'zh', label: '中文', short: '中文' },
    ] as const,
    status: {
      fr: 'Essai scientifique illustré · version de travail · 2026',
      en: 'Illustrated scientific essay · working draft · 2026',
    },
  },
} as const;

export type BookLang = (typeof site.book.languages)[number]['id'];
