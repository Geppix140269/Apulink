// PATH: app/[locale]/layout.tsx
import { notFound } from 'next/navigation'

const locales = ['en', 'it']

export default function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  // Validate that the incoming locale is valid
  if (!locales.includes(locale)) {
    notFound()
  }

  return (
    <div lang={locale}>
      {children}
    </div>
  )
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}
