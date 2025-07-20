// PATH: lib/i18n/config.ts
// Configuration for internationalization

export const locales = ['en', 'it', 'de', 'fr', 'es', 'nl', 'ru', 'zh'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const localeNames: Record<Locale, string> = {
  en: 'English',
  it: 'Italiano',
  de: 'Deutsch',
  fr: 'Français',
  es: 'Español',
  nl: 'Nederlands',
  ru: 'Русский',
  zh: '中文'
};

export const localeFlags: Record<Locale, string> = {
  en: '🇬🇧',
  it: '🇮🇹',
  de: '🇩🇪',
  fr: '🇫🇷',
  es: '🇪🇸',
  nl: '🇳🇱',
  ru: '🇷🇺',
  zh: '🇨🇳'
};
