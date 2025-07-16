// PATH: app/components/language-selector.tsx
'use client'
import { useLanguage } from '@/app/providers/language-provider'

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage()

  return (
    <select 
      value={language}
      onChange={(e) => setLanguage(e.target.value as 'en' | 'it')}
      className="px-3 py-1.5 text-sm text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
    >
      <option value="en">🇬🇧 English</option>
      <option value="it">🇮🇹 Italiano</option>
    </select>
  )
}
