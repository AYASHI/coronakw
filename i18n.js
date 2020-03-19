import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
// import Backend from 'i18next-xhr-backend';
import en from './src/locales/en-translations.json';
import ar from './src/locales/ar-translations.json';
const languageDetector = {
  type: 'languageDetector',
  async: true,
  detect: cb => cb('en'),
  init: () => {},
  cacheUserLanguage: () => {},
};

i18n
  // load translation using xhr -> see /public/locales
  // learn more: https://github.com/i18next/i18next-xhr-backend
  // .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  // pass the i18n instance to react-i18next.
  .use(languageDetector)
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    fallbackLng: 'en',
    debug: true,
    resources: {
      en: {
        translation: en,
      },
      ar: {
        translation: ar,
      },
    },

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    wait: true,
  });
export default i18n;
