// PATH: app/providers/language-provider.tsx
'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type Language = 'en' | 'it'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (en: string, it: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en')

  useEffect(() => {
    // Check localStorage first
    const saved = localStorage.getItem('language') as Language
    if (saved) {
      setLanguage(saved)
    } else {
      // Then check browser language
      const browserLang = navigator.language.toLowerCase()
      if (browserLang.startsWith('it')) {
        setLanguage('it')
      }
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem('language', lang)
  }

  const t = (en: string, it: string) => {
    return language === 'en' ? en : it
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
