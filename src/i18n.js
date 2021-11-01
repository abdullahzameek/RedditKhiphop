import i18n from "i18next";
import detector from "i18next-browser-languagedetector";
import backend from "i18next-xhr-backend";
import { initReactI18next } from 'react-i18next';
import translationEN from "../src/locales/en/translation.json";
import translationKO from "../src/locales/ko/translation.json";
import translationZH from "../src/locales/zh/translation.json";
import translationFR from "../src/locales/fr/translation.json";

const resources = {
    en: {
        translation : translationEN
    },
    fr: {
        translation: translationFR
    },
    ko: {
        translation: translationKO
    },
    zh: {
        translation: translationZH
    },
}
i18n
    .use(detector)
    .use(backend)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: "en",
        keySeparator: false,
        interpolation:{
            escapeValue: false
        }
    })
export default i18n;

