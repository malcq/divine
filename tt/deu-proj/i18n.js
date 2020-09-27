const NextI18Next = require('next-i18next').default;
const {
  localeSubpaths,
} = require('next/config').default().publicRuntimeConfig;

const nativeLanguage = {
  de: 'de',
};
const foreignLanguages = {
  // en: 'en',
  de: 'de',
};

const localeSubpathVariations = {
  none: {},
  foreign: {
    ...foreignLanguages,
  },
  all: {
    ...nativeLanguage,
    ...foreignLanguages,
  },
};

module.exports = new NextI18Next({
  defaultLanguage: Object.keys(nativeLanguage)[0],
  otherLanguages: Object.keys(foreignLanguages),
  // localeSubpaths: localeSubpathVariations[localeSubpaths],
  localePath: typeof window === 'undefined' ? 'public/locales' : 'static/locales',
});