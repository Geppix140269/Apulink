// PATH: lib/sanity/queries.ts
import { groq } from 'next-sanity'
import type { Locale } from '@/lib/i18n/config'

// Get all translations for a specific locale organized by namespace
export const translationsQuery = groq`
  *[_type == "translation"] {
    key,
    namespace,
    "value": value[$locale]
  }
`

// Get all active categories with localized content
export const categoriesQuery = groq`
  *[_type == "category" && isActive == true] | order(order asc) {
    _id,
    "slug": slug.current,
    "name": name[$locale],
    "description": description[$locale],
    icon,
    "parent": parent->{
      _id,
      "name": name[$locale],
      "slug": slug.current
    }
  }
`

// Get regions by type with localized content
export const regionsByTypeQuery = groq`
  *[_type == "region" && type == $type && isActive == true] | order(name[$locale] asc) {
    _id,
    code,
    "name": name[$locale],
    type,
    "taxIdFormat": {
      "pattern": taxIdFormat.pattern,
      "example": taxIdFormat.example,
      "description": taxIdFormat.description[$locale]
    },
    phonePrefix,
    flag
  }
`

// Get all regions for dropdown with localized names
export const allRegionsQuery = groq`
  *[_type == "region" && isActive == true] | order(type desc, name[$locale] asc) {
    _id,
    code,
    "name": name[$locale],
    type,
    flag,
    "parent": parent->{
      _id,
      code,
      "name": name[$locale]
    }
  }
`

// Homepage content query (for future homepage schema)
export const homepageQuery = groq`
  *[_type == "homepage"][0] {
    "hero": {
      "title": hero.title[$locale],
      "subtitle": hero.subtitle[$locale],
      "ctaText": hero.ctaText[$locale]
    },
    "features": features[] {
      "title": title[$locale],
      "description": description[$locale],
      icon
    },
    "benefits": benefits[] {
      "title": title[$locale],
      "description": description[$locale],
      "image": image.asset->url
    }
  }
`

// Function to transform translations array into nested dictionary
export function transformTranslations(translations: any[]): Record<string, Record<string, string>> {
  const dictionary: Record<string, Record<string, string>> = {
    common: {},
    form: {},
    validation: {},
    navigation: {},
    messages: {},
    errors: {},
  }

  translations.forEach((item) => {
    if (item.namespace && item.key && item.value) {
      dictionary[item.namespace][item.key] = item.value
    }
  })

  return dictionary
}
