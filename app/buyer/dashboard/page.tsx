// PATH: app/buyer/dashboard/page.tsx
'use client'
import { useState } from 'react'

export default function BuyerDashboard() {
  const [language, setLanguage] = useState<'it' | 'en'>('en')
  const [activeTab, setActiveTab] = useState('properties')
  
  return (
    <div className="min-h-screen bg-stone-50">
      {/* Dashboard Header */}
      <header className="bg-white border-b border-stone-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <h1 className="font-playfair text-2xl font-bold text-stone-800">
                {language === 'en' ? 'My Property Search' : 'La Mia Ricerca'}
              </h1>
              
              {/* Tab Navigation */}
              <nav className="hidden md:flex space-x-6">
                <button
                  onClick={() => setActiveTab('properties')}
                  className={`pb-2 font-medium transition-colors ${
                    activeTab === 'properties' 
                      ? 'text-terracotta border-b-2 border-terracotta' 
                      : 'text-stone-600 hover:text-stone-800'
                  }`}
                >
                  {language === 'en' ? 'Properties' : 'Proprietà'}
                </button>
                <button
                  onClick={() => setActiveTab('saved')}
                  className={`pb-2 font-medium transition-colors ${
                    activeTab === 'saved' 
                      ? 'text-terracotta border-b-2 border-terracotta' 
                      : 'text-stone-600 hover:text-stone-800'
                  }`}
                >
                  {language === 'en' ? 'Saved' : 'Salvate'}
                  <span className="ml-2 bg-terracotta text-white text-xs px-2 py-0.5 rounded-full">3</span>
                </button>
                <button
                  onClick={() => setActiveTab('tools')}
                  className={`pb-2 font-medium transition-colors ${
                    activeTab === 'tools' 
                      ? 'text-terracotta border-b-2 border-terracotta' 
                      : 'text-stone-600 hover:text-stone-800'
                  }`}
                >
                  {language === 'en' ? 'Tools' : 'Strumenti'}
                </button>
                <button
                  onClick={() => setActiveTab('guides')}
                  className={`pb-2 font-medium transition-colors ${
                    activeTab === 'guides' 
                      ? 'text-terracotta border-b-2 border-terracotta' 
                      : 'text-stone-600 hover:text-stone-800'
                  }`}
                >
                  {language === 'en' ? 'Guides' : 'Guide'}
                </button>
              </nav>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Language Toggle */}
              <button 
                onClick={() => setLanguage(language === 'it' ? 'en' : 'it')}
                className="flex items-center space-x-2 text-stone-600 hover:text-terracotta font-medium"
              >
                <span className="text-xl">{language === 'en' ? '🇬🇧' : '🇮🇹'}</span>
                <span>{language === 'en' ? 'IT' : 'EN'}</span>
              </button>
              
              {/* User Menu */}
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <div className="text-sm font-medium text-stone-800">Welcome, Sarah</div>
                  <div className="text-xs text-stone-600">{language === 'en' ? 'Premium Member' : 'Membro Premium'}</div>
                </div>
                <img 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" 
                  alt="User"
                  className="w-10 h-10 rounded-full"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-stone-200">
            <div className="text-3xl font-bold text-terracotta mb-1">47</div>
            <div className="text-sm text-stone-600">{language === 'en' ? 'New Properties' : 'Nuove Proprietà'}</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-stone-200">
            <div className="text-3xl font-bold text-sea mb-1">3</div>
            <div className="text-sm text-stone-600">{language === 'en' ? 'Saved Favorites' : 'Preferiti Salvati'}</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-stone-200">
            <div className="text-3xl font-bold text-olive mb-1">2</div>
            <div className="text-sm text-stone-600">{language === 'en' ? 'Viewing Scheduled' : 'Visite Programmate'}</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-stone-200">
            <div className="text-3xl font-bold text-stone-800 mb-1">€280k</div>
            <div className="text-sm text-stone-600">{language === 'en' ? 'Avg. in Budget' : 'Media Budget'}</div>
          </div>
        </div>

        {/* Properties Tab */}
        {activeTab === 'properties' && (
          <div>
            {/* Filters */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-stone-200 mb-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <select className="px-4 py-2 border border-stone-300 rounded-lg focus:border-terracotta focus:ring-2 focus:ring-terracotta/20">
                  <option>{language === 'en' ? 'Property Type' : 'Tipo Proprietà'}</option>
                  <option>Trullo</option>
                  <option>Masseria</option>
                  <option>Villa</option>
                </select>
                <select className="px-4 py-2 border border-stone-300 rounded-lg focus:border-terracotta focus:ring-2 focus:ring-terracotta/20">
                  <option>{language === 'en' ? 'Location' : 'Località'}</option>
                  <option>Ostuni</option>
                  <option>Alberobello</option>
                  <option>Locorotondo</option>
                </select>
                <select className="px-4 py-2 border border-stone-300 rounded-lg focus:border-terracotta focus:ring-2 focus:ring-terracotta/20">
                  <option>{language === 'en' ? 'Budget' : 'Budget'}</option>
                  <option>€0 - €200k</option>
                  <option>€200k - €400k</option>
                  <option>€400k+</option>
                </select>
                <button className="bg-terracotta text-white px-6 py-2 rounded-lg font-medium hover:bg-terracotta-dark transition-colors">
                  {language === 'en' ? 'Apply Filters' : 'Applica Filtri'}
                </button>
              </div>
            </div>

            {/* Exclusive Badge */}
            <div className="bg-gradient-to-r from-terracotta/10 to-terracotta/5 border border-terracotta/20 rounded-xl p-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="bg-terracotta/20 p-2 rounded-lg">
                    <svg className="w-6 h-6 text-terracotta" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-stone-800">
                      {language === 'en' ? '12 Exclusive Properties' : '12 Proprietà Esclusive'}
                    </div>
                    <div className="text-sm text-stone-600">
                      {language === 'en' ? 'Not available on public sites' : 'Non disponibili sui siti pubblici'}
                    </div>
                  </div>
                </div>
                <button className="text-terracotta font-medium hover:underline">
                  {language === 'en' ? 'View All →' : 'Vedi Tutte →'}
                </button>
              </div>
            </div>

            {/* Property Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Property Card 1 - Exclusive */}
              <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border border-stone-200 relative">
                <div className="absolute top-4 left-4 z-10 bg-terracotta text-white px-3 py-1 rounded-full text-sm font-medium">
                  {language === 'en' ? 'Exclusive' : 'Esclusiva'}
                </div>
                <div className="relative h-64">
                  <img 
                    src="https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=600&h=400&fit=crop" 
                    alt="Trullo"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-lg">
                    <span className="font-bold text-stone-800">€285,000</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-playfair text-xl font-bold text-stone-800 mb-2">
                    Restored Trullo Complex
                  </h3>
                  <p className="text-stone-600 mb-4">Ostuni • 3 beds • 2 baths • Pool</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <button className="text-terracotta hover:text-terracotta-dark">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </button>
                      <button className="text-stone-600 hover:text-stone-800">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m9.032 4.026a9.001 9.001 0 01-7.432 0m9.032 0a9.003 9.003 0 00-7.432-10.708m7.432 10.708L21 12m-9.716-2.342A9.003 9.003 0 0012 3c-1.948 0-3.75.617-5.232 1.658m0 14.684L3 12m9.716-2.342A9.003 9.003 0 003.768 9.658" />
                        </svg>
                      </button>
                    </div>
                    <button className="bg-sea text-white px-4 py-2 rounded-lg font-medium hover:bg-sea-dark transition-colors">
                      {language === 'en' ? 'View Details' : 'Dettagli'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Property Card 2 */}
              <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border border-stone-200">
                <div className="relative h-64">
                  <img 
                    src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&h=400&fit=crop" 
                    alt="Villa"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-lg">
                    <span className="font-bold text-stone-800">€420,000</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-playfair text-xl font-bold text-stone-800 mb-2">
                    Modern Villa with Sea View
                  </h3>
                  <p className="text-stone-600 mb-4">Polignano a Mare • 4 beds • 3 baths</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <button className="text-stone-400 hover:text-terracotta">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </button>
                      <button className="text-stone-600 hover:text-stone-800">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m9.032 4.026a9.001 9.001 0 01-7.432 0m9.032 0a9.003 9.003 0 00-7.432-10.708m7.432 10.708L21 12m-9.716-2.342A9.003 9.003 0 0012 3c-1.948 0-3.75.617-5.232 1.658m0 14.684L3 12m9.716-2.342A9.003 9.003 0 003.768 9.658" />
                        </svg>
                      </button>
                    </div>
                    <button className="bg-sea text-white px-4 py-2 rounded-lg font-medium hover:bg-sea-dark transition-colors">
                      {language === 'en' ? 'View Details' : 'Dettagli'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Property Card 3 */}
              <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border border-stone-200">
                <div className="relative h-64">
                  <img 
                    src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop" 
                    alt="Masseria"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-lg">
                    <span className="font-bold text-stone-800">€680,000</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-playfair text-xl font-bold text-stone-800 mb-2">
                    Historic Masseria Estate
                  </h3>
                  <p className="text-stone-600 mb-4">Fasano • 6 beds • 5 baths • 5 hectares</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <button className="text-terracotta hover:text-terracotta-dark">
                        <svg className="w-6 h-6" fill="currentColor" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </button>
                      <button className="text-stone-600 hover:text-stone-800">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m9.032 4.026a9.001 9.001 0 01-7.432 0m9.032 0a9.003 9.003 0 00-7.432-10.708m7.432 10.708L21 12m-9.716-2.342A9.003 9.003 0 0012 3c-1.948 0-3.75.617-5.232 1.658m0 14.684L3 12m9.716-2.342A9.003 9.003 0 003.768 9.658" />
                        </svg>
                      </button>
                    </div>
                    <button className="bg-sea text-white px-4 py-2 rounded-lg font-medium hover:bg-sea-dark transition-colors">
                      {language === 'en' ? 'View Details' : 'Dettagli'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tools Tab */}
        {activeTab === 'tools' && (
          <div className="grid md:grid-cols-2 gap-6">
            {/* ROI Calculator */}
            <div className="bg-white rounded-xl p-8 shadow-lg border border-stone-200">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-playfair text-2xl font-bold text-stone-800">
                  {language === 'en' ? 'ROI Calculator' : 'Calcolatore ROI'}
                </h3>
                <div className="bg-terracotta/10 p-3 rounded-lg">
                  <svg className="w-6 h-6 text-terracotta" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <p className="text-stone-600 mb-6">
                {language === 'en' 
                  ? 'Calculate potential rental income and return on investment for any property.'
                  : 'Calcola il reddito da affitto potenziale e il ritorno sull&apos;investimento.'
                }
              </p>
              <button className="w-full bg-terracotta text-white px-6 py-3 rounded-lg font-medium hover:bg-terracotta-dark transition-colors">
                {language === 'en' ? 'Open Calculator' : 'Apri Calcolatore'}
              </button>
            </div>

            {/* Tax Estimator */}
            <div className="bg-white rounded-xl p-8 shadow-lg border border-stone-200">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-playfair text-2xl font-bold text-stone-800">
                  {language === 'en' ? 'Tax Estimator' : 'Stimatore Tasse'}
                </h3>
                <div className="bg-sea/10 p-3 rounded-lg">
                  <svg className="w-6 h-6 text-sea" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
              </div>
              <p className="text-stone-600 mb-6">
                {language === 'en' 
                  ? 'Estimate all taxes and fees associated with purchasing property in Italy.'
                  : 'Stima tutte le tasse e commissioni associate all&apos;acquisto di proprietà in Italia.'
                }
              </p>
              <button className="w-full bg-sea text-white px-6 py-3 rounded-lg font-medium hover:bg-sea-dark transition-colors">
                {language === 'en' ? 'Calculate Taxes' : 'Calcola Tasse'}
              </button>
            </div>

            {/* Mortgage Calculator */}
            <div className="bg-white rounded-xl p-8 shadow-lg border border-stone-200">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-playfair text-2xl font-bold text-stone-800">
                  {language === 'en' ? 'Mortgage Calculator' : 'Calcolatore Mutuo'}
                </h3>
                <div className="bg-olive/10 p-3 rounded-lg">
                  <svg className="w-6 h-6 text-olive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
              </div>
              <p className="text-stone-600 mb-6">
                {language === 'en' 
                  ? 'Compare mortgage options from Italian banks for foreign buyers.'
                  : 'Confronta opzioni di mutuo da banche italiane per acquirenti stranieri.'
                }
              </p>
              <button className="w-full bg-olive text-white px-6 py-3 rounded-lg font-medium hover:bg-olive-dark transition-colors">
                {language === 'en' ? 'Compare Mortgages' : 'Confronta Mutui'}
              </button>
            </div>

            {/* Renovation Planner */}
            <div className="bg-white rounded-xl p-8 shadow-lg border border-stone-200">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-playfair text-2xl font-bold text-stone-800">
                  {language === 'en' ? 'Renovation Planner' : 'Pianificatore Ristrutturazione'}
                </h3>
                <div className="bg-stone-100 p-3 rounded-lg">
                  <svg className="w-6 h-6 text-stone-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                  </svg>
                </div>
              </div>
              <p className="text-stone-600 mb-6">
                {language === 'en' 
                  ? 'Estimate renovation costs and timeline for traditional Puglia properties.'
                  : 'Stima costi e tempi di ristrutturazione per proprietà tradizionali pugliesi.'
                }
              </p>
              <button className="w-full bg-stone-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-stone-700 transition-colors">
                {language === 'en' ? 'Plan Renovation' : 'Pianifica Ristrutturazione'}
              </button>
            </div>
          </div>
        )}

        {/* Saved Properties Tab */}
        {activeTab === 'saved' && (
          <div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-stone-200 mb-6">
              <h3 className="font-playfair text-2xl font-bold text-stone-800 mb-4">
                {language === 'en' ? 'Your Saved Properties' : 'Le Tue Proprietà Salvate'}
              </h3>
              <p className="text-stone-600">
                {language === 'en' 
                  ? 'Properties you\'ve saved for later viewing. We\'ll notify you of any price changes.'
                  : 'Proprietà che hai salvato per visualizzare più tardi. Ti avviseremo di eventuali cambiamenti di prezzo.'
                }
              </p>
            </div>

            <div className="space-y-4">
              {/* Saved Property 1 */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-stone-200 flex items-center space-x-6">
                <img 
                  src="https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=200&h=150&fit=crop" 
                  alt="Saved property"
                  className="w-32 h-24 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h4 className="font-playfair text-xl font-bold text-stone-800 mb-1">Restored Trullo Complex</h4>
                  <p className="text-stone-600 mb-2">Ostuni • €285,000</p>
                  <div className="flex items-center space-x-4 text-sm">
                    <span className="text-green-600 font-medium">↓ €5,000 price drop</span>
                    <span className="text-stone-500">Saved 3 days ago</span>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <button className="bg-terracotta text-white px-4 py-2 rounded-lg font-medium hover:bg-terracotta-dark transition-colors">
                    {language === 'en' ? 'Schedule Viewing' : 'Prenota Visita'}
                  </button>
                  <button className="text-stone-400 hover:text-stone-600">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Saved Property 2 */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-stone-200 flex items-center space-x-6">
                <img 
                  src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=200&h=150&fit=crop" 
                  alt="Saved property"
                  className="w-32 h-24 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h4 className="font-playfair text-xl font-bold text-stone-800 mb-1">Historic Masseria Estate</h4>
                  <p className="text-stone-600 mb-2">Fasano • €680,000</p>
                  <div className="flex items-center space-x-4 text-sm">
                    <span className="text-orange-600 font-medium">Viewing scheduled: Jan 20</span>
                    <span className="text-stone-500">Saved 1 week ago</span>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <button className="bg-sea text-white px-4 py-2 rounded-lg font-medium hover:bg-sea-dark transition-colors">
                    {language === 'en' ? 'View Details' : 'Dettagli'}
                  </button>
                  <button className="text-stone-400 hover:text-stone-600">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Guides Tab */}
        {activeTab === 'guides' && (
          <div>
            <div className="bg-gradient-to-r from-terracotta/10 to-terracotta/5 border border-terracotta/20 rounded-xl p-6 mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-playfair text-2xl font-bold text-stone-800 mb-2">
                    {language === 'en' ? 'Your Personalized Buying Guide' : 'La Tua Guida Personalizzata'}
                  </h3>
                  <p className="text-stone-600">
                    {language === 'en' 
                      ? 'Based on your preferences and saved properties, we\'ve created a custom guide for you.'
                      : 'Basata sulle tue preferenze e proprietà salvate, abbiamo creato una guida personalizzata.'
                    }
                  </p>
                </div>
                <button className="bg-terracotta text-white px-6 py-3 rounded-lg font-medium hover:bg-terracotta-dark transition-colors">
                  {language === 'en' ? 'Download PDF' : 'Scarica PDF'}
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Guide 1 */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-stone-200 hover:shadow-lg transition-all">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="bg-terracotta/10 p-3 rounded-lg">
                    <svg className="w-8 h-8 text-terracotta" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-playfair text-xl font-bold text-stone-800">
                      {language === 'en' ? 'Complete Buying Process' : 'Processo di Acquisto Completo'}
                    </h4>
                    <p className="text-sm text-stone-600">45 pages • Updated Jan 2025</p>
                  </div>
                </div>
                <p className="text-stone-600 mb-4">
                  {language === 'en' 
                    ? 'Step-by-step guide from initial search to getting your keys, with timeline and costs.'
                    : 'Guida passo-passo dalla ricerca iniziale al ricevimento delle chiavi, con tempistiche e costi.'
                  }
                </p>
                <button className="text-terracotta font-medium hover:underline">
                  {language === 'en' ? 'Read Guide →' : 'Leggi Guida →'}
                </button>
              </div>

              {/* Guide 2 */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-stone-200 hover:shadow-lg transition-all">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="bg-sea/10 p-3 rounded-lg">
                    <svg className="w-8 h-8 text-sea" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-playfair text-xl font-bold text-stone-800">
                      {language === 'en' ? 'Tax & Legal Guide' : 'Guida Fiscale e Legale'}
                    </h4>
                    <p className="text-sm text-stone-600">32 pages • Expert verified</p>
                  </div>
                </div>
                <p className="text-stone-600 mb-4">
                  {language === 'en' 
                    ? 'Understanding Italian property taxes, legal requirements, and residency implications.'
                    : 'Comprendere le tasse immobiliari italiane, requisiti legali e implicazioni di residenza.'
                  }
                </p>
                <button className="text-sea font-medium hover:underline">
                  {language === 'en' ? 'Read Guide →' : 'Leggi Guida →'}
                </button>
              </div>

              {/* Guide 3 */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-stone-200 hover:shadow-lg transition-all">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="bg-olive/10 p-3 rounded-lg">
                    <svg className="w-8 h-8 text-olive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-playfair text-xl font-bold text-stone-800">
                      {language === 'en' ? 'Property Types Guide' : 'Guida Tipi di Proprietà'}
                    </h4>
                    <p className="text-sm text-stone-600">28 pages • With photos</p>
                  </div>
                </div>
                <p className="text-stone-600 mb-4">
                  {language === 'en' 
                    ? 'Detailed guide to trulli, masserie, villas, and apartments - pros, cons, and costs.'
                    : 'Guida dettagliata a trulli, masserie, ville e appartamenti - pro, contro e costi.'
                  }
                </p>
                <button className="text-olive font-medium hover:underline">
                  {language === 'en' ? 'Read Guide →' : 'Leggi Guida →'}
                </button>
              </div>

              {/* Guide 4 */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-stone-200 hover:shadow-lg transition-all">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="bg-stone-100 p-3 rounded-lg">
                    <svg className="w-8 h-8 text-stone-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-playfair text-xl font-bold text-stone-800">
                      {language === 'en' ? 'Area Comparison' : 'Confronto Aree'}
                    </h4>
                    <p className="text-sm text-stone-600">24 pages • Interactive maps</p>
                  </div>
                </div>
                <p className="text-stone-600 mb-4">
                  {language === 'en' 
                    ? 'Compare different areas of Puglia - lifestyle, prices, accessibility, and amenities.'
                    : 'Confronta diverse aree della Puglia - stile di vita, prezzi, accessibilità e servizi.'
                  }
                </p>
                <button className="text-stone-600 font-medium hover:underline">
                  {language === 'en' ? 'Read Guide →' : 'Leggi Guida →'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Floating Help Button */}
      <div className="fixed bottom-8 right-8">
        <button className="bg-terracotta text-white p-4 rounded-full shadow-xl hover:shadow-2xl hover:scale-110 transition-all">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </button>
      </div>
    </div>
  )
}
