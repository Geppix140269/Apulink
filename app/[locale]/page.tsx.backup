// PATH: app/[locale]/page.tsx
import { client } from '@/lib/sanity/client'
import { translationsQuery, categoriesQuery, transformTranslations } from '@/lib/sanity/queries.js'

type Locale = 'en' | 'it'

async function getTranslations(locale: Locale) {
  const translations = await client.fetch(translationsQuery, { locale })
  return transformTranslations(translations)
}

async function getCategories(locale: Locale) {
  return await client.fetch(categoriesQuery, { locale })
}

export default async function HomePage({
  params: { locale }
}: {
  params: { locale: Locale }
}) {
  // Fetch all content from Sanity
  const [dictionary, categories] = await Promise.all([
    getTranslations(locale),
    getCategories(locale)
  ])

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-blue-50 pt-24 pb-32">
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full filter blur-3xl opacity-20 animate-float"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-200 rounded-full filter blur-3xl opacity-20 animate-float-delayed"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-poppins font-bold text-gray-900 mb-6">
              {dictionary.common.heroTitle || 'Join Our Trusted'}
              <span className="block gradient-text">
                {dictionary.common.heroTitleHighlight || 'Supplier Network'}
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
              {dictionary.common.heroSubtitle || 
                'Connect with leading businesses, expand your reach, and grow together in a thriving ecosystem built on trust and innovation.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={`/${locale}/register`} className="btn-primary">
                {dictionary.navigation.startRegistration || 'Start Registration'}
                <svg className="w-5 h-5 ml-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              <button className="btn-secondary">
                {dictionary.navigation.learnMore || 'Learn More'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-12 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-gray-900">500+</div>
              <div className="text-gray-600 mt-1">{dictionary.common.trustedSuppliers || 'Trusted Suppliers'}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900">24/7</div>
              <div className="text-gray-600 mt-1">{dictionary.common.support || 'Support'}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900">50+</div>
              <div className="text-gray-600 mt-1">{dictionary.common.countries || 'Countries'}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900">98%</div>
              <div className="text-gray-600 mt-1">{dictionary.common.satisfaction || 'Satisfaction'}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-poppins font-bold text-gray-900 mb-4">
              {dictionary.common.whyChooseUs || 'Why Partner With Us'}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {dictionary.common.whyChooseUsSubtitle || 
                'We make it simple to connect, collaborate, and grow your business'}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-2xl p-8 shadow-soft card-hover">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">
                {dictionary.common.feature1Title || 'Secure & Trusted'}
              </h3>
              <p className="text-gray-600">
                {dictionary.common.feature1Description || 
                  'Your data is protected with enterprise-grade security. We verify all partners to maintain a trusted network.'}
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-2xl p-8 shadow-soft card-hover">
              <div className="w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">
                {dictionary.common.feature2Title || 'Global Reach'}
              </h3>
              <p className="text-gray-600">
                {dictionary.common.feature2Description || 
                  'Connect with businesses worldwide. Our platform supports multiple languages and international compliance.'}
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-2xl p-8 shadow-soft card-hover">
              <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">
                {dictionary.common.feature3Title || 'Fast Onboarding'}
              </h3>
              <p className="text-gray-600">
                {dictionary.common.feature3Description || 
                  'Get started in minutes with our streamlined registration process. No complex paperwork or long waiting times.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Preview */}
      {categories && categories.length > 0 && (
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-poppins font-bold text-gray-900 mb-4">
                {dictionary.common.categoriesTitle || 'Industries We Serve'}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {dictionary.common.categoriesSubtitle || 
                  'From manufacturing to services, we support suppliers across all major industries'}
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              {categories.slice(0, 8).map((category: any) => (
                <div key={category._id} className="text-center">
                  <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4 hover:bg-blue-50 transition-colors">
                    <span className="text-3xl">{category.icon || '📦'}</span>
                  </div>
                  <h3 className="font-medium text-gray-900">{category.name}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-poppins font-bold mb-6">
            {dictionary.common.ctaTitle || 'Ready to Grow Your Business?'}
          </h2>
          <p className="text-xl mb-10 text-blue-100">
            {dictionary.common.ctaSubtitle || 
              'Join hundreds of suppliers who trust our platform to connect with new opportunities'}
          </p>
          <a href={`/${locale}/register`} className="inline-flex items-center bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:shadow-xl transition-all duration-200 hover:scale-105">
            {dictionary.navigation.startRegistration || 'Start Your Registration'}
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </section>
    </>
  )
}
