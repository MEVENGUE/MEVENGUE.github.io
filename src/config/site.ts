import { books } from './books';

export const site = {
  name: 'Franck Mevengue',
  email: 'mevengueengofranck@gmail.com',
  linkedin: 'https://www.linkedin.com/in/franck-mevengue-839028207/',
  github: 'https://github.com/MEVENGUE',
  deepwiki: 'https://deepwiki.com/MEVENGUE/MEVENGUE',
  location: 'Paris, France',
  books,
  /** @deprecated Prefer `site.books` — kept for transitional imports. */
  book: books.find((entry) => entry.slug === 'si-einstein-avait-eu-chatgpt') ?? books[0],
} as const;

export type { Book, BookLang } from './books';
export { bookLanguages, getBook } from './books';
