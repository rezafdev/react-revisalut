import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import de from './locales/de/default.json';
import en from './locales/en/default.json';


export const resources = {
    en: {
        translation: {
            ...en
        }
    },
    de: {
        translation: {
            ...de
        }
    }
} as const;

i18n.use(initReactI18next).init({
    lng: localStorage.getItem('lang') ?? 'en',
    resources,
    returnNull: false,
});
