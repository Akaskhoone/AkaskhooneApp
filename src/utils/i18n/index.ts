import I18n from 'react-native-i18n';
import en from './locales/en';
import fa from './locales/fa';

I18n.fallbacks = 'fa';
I18n.translations = {
  // en,
  fa
};
I18n.defaultLocale = 'fa';
// setting fallback for languages that does not exist
I18n.locales.no = 'fa';
I18n.missingTranslation = val => val;

export default I18n;
