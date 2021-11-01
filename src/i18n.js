import i18n from "i18next";
import { initReactI18next } from "react-i18next";
// Pro tip: Move them into their own JSON files
const resources = {
  en: {
    translation: {
      loading_message: "Please wait while the latest tracks are fetched...",
    },
  },
  kr: {
    translation: {
      loading_message: "최신 트랙을 가져오는 동안 잠시 기다려 주십시오...",
    },
  },
};
i18n
  .use(initReactI18next) // Connect react-i18next to React
  .init({
    resources,
    lng: "kr", // default language
    interpolation: {
      escapeValue: false, // react already safe from xss
    },
  });
export default i18n;
