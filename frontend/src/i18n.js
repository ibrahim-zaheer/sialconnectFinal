// import i18n from 'i18next'

// import LanguageDetector from "i18next-browser-languagedetector"

// import {initReactI18next, Translation} from "react-i18next"
// import Backend from "i18next-http-backend";


// i18n.use(LanguageDetector).use(initReactI18next).use(Backend).init({
//     debug: true,
//     returnObjects: true,
//     fallbackLng:"en",
//   });

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector) // Language detection plugin
  .use(initReactI18next)  // React integration plugin
  .use(Backend)           // Load translations from the backend
  .init({
    debug: true,           // Enable debug logging
    returnObjects: true,   // Return objects instead of strings for complex translations
    fallbackLng: 'en',     // Default language if no translation is found
    ns: ['translation', 'profile','about','order'], // Specify the namespaces you're using
    defaultNS: 'translation', // Default namespace to use if none is specified
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json', // Path to translation files
    },
  });

export default i18n;
