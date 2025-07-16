// PATH: lib/i18n/config.ts
export const i18n = {
  defaultLocale: 'en',
  locales: ['en', 'it'] as const,
} as const

export type Locale = (typeof i18n.locales)[number]

// Dictionary structure that matches our Sanity translation schema
export interface Dictionary {
  common: Record<string, string>
  form: Record<string, string>
  validation: Record<string, string>
  navigation: Record<string, string>
  messages: Record<string, string>
  errors: Record<string, string>
}

// Type-safe translation key helper
export function getTranslationKey(namespace: keyof Dictionary, key: string): string {
  return `${namespace}.${key}`
}

// Locale display names for UI
export const localeNames: Record<Locale, { native: string; english: string }> = {
  en: { native: 'English', english: 'English' },
  it: { native: 'Italiano', english: 'Italian' },
}
