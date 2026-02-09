// Utility function to slugify a blog title

export const slugify = (input: string) => {
  return input
    .toLowerCase()
    .trim()
    .normalize('NFKD') // split accents
    .replace(/[\u0300-\u036f]/g, '') // remove diacritics
    .replace(/[^a-z0-9]+/g, '-') // non-alnum → hyphen
    .replace(/(^-|-$)/g, ''); // trim hyphens
};
