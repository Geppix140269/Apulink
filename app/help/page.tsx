// PATH: app/help/page.tsx
'use client'
import { useState } from 'react'
import { 
  MessageCircle, 
  FileText, 
  Users, 
  Home,
  Euro,
  Shield,
  Globe,
  Clock,
  Search,
  Book,
  HelpCircle,
  ChevronRight
} from 'lucide-react'

export default function HelpCentrePage() {
  const [searchQuery, setSearchQuery] = useState('')
  
  const helpCategories = [
    {
      icon: Home,
      title: 'Buying Property',
      description: 'Learn about the property buying process in Puglia',
      articles: [
        'How to buy property in Italy as a foreigner',
        'Understanding Italian property taxes',
        'Required documents for property purchase',
        'The role of a notary in Italy'
      ]
    },
    {
      icon: Users,
      title: 'Working with Professionals',
      description: 'Find and work with verified local experts',
      articles: [
        'How to choose a geometra',
        'What does a geometra do?',
        'Understanding survey reports',
        'Professional fees explained'
      ]
    },
    {
      icon: FileText,
      title: 'Documents & Legal',
      description: 'Navigate Italian bureaucracy with confidence',
      articles: [
        'Essential property documents',
        'Getting a codice fiscale',
        'Understanding the compromesso',
        'Property deed (rogito) explained'
      ]
    },
    {
      icon: Euro,
      title: 'Costs & Financing',
      description: 'Budget for your Italian property investment',
      articles: [
        'Total costs of buying property',
        'Getting a mortgage in Italy',
        'Tax benefits for renovations',
        'Currency exchange tips'
      ]
    },
    {
      icon: Shield,
      title: 'Platform & Security',
      description: 'How Apulink works and keeps you safe',
      articles: [
        'How anonymous bidding works',
        'Our verification process',
        'Secure document storage',
        'Payment protection'
      ]
    },
    {
      icon: Globe,
      title: 'Living in Puglia',
      description: 'Practical information about life in Puglia',
      articles: [
        'Best areas for foreign buyers',
        'Cost of living in Puglia',
        'Healthcare system',
        'Residency requirements'
      ]
    }
  ]

  const popularQuestions = [
    'What is a geometra and do I need one?',
    'How much does it cost to buy property in Italy?',
    'Can foreigners buy property in Italy?',
    'What is the difference between a trullo and a masseria?',
    'How long does the buying process take?',
    'Do I need to speak Italian to buy property?'
  ]

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero Section with Trullo */}
      <section className="bg-gradient-to-br from-sea to-sea-dark text-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-6">
              Help Centre
            </h1>
            <p className="text-xl text-sea-light max-w-2xl mx-auto mb-8">
              Get instant answers about buying property in Puglia
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <input
                type="text"
                placeholder="Search for help..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 pr-12 rounded-full text-stone-800 text-lg focus:outline-none focus:ring-4 focus:ring-white/30"
              />
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-stone-400" />
            </div>
          </div>

          {/* Trullo CTA */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="bg-white/20 rounded-full p-6">
                <MessageCircle className="w-12 h-12 text-white" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl font-bold mb-2">Chat with Trullo</h2>
                <p className="text-sea-light mb-4">
                  Our AI assistant knows everything about buying property in Puglia. 
                  Available 24/7 in English and Italian.
                </p>
                <button 
                  onClick={() => {
                    // Trigger chatbot open
                    const chatButton = document.querySelector('[aria-label="Open chat"]') as HTMLButtonElement
                    if (chatButton) chatButton.click()
                  }}
                  className="bg-white text-sea px-6 py-3 rounded-full font-medium hover:bg-stone-100 transition-colors"
                >
                  Start Chat with Trullo
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Questions */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-playfair text-2xl font-bold text-stone-800 mb-6">
            Popular Questions
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {popularQuestions.map((question, index) => (
              <a
                key={index}
                href="#"
                className="flex items-center justify-between p-4 bg-stone-50 rounded-lg hover:bg-stone-100 transition-colors group"
              >
                <span className="text-stone-700 group-hover:text-stone-900">{question}</span>
                <ChevronRight className="w-5 h-5 text-stone-400 group-hover:text-stone-600" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Help Categories */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-playfair text-3xl font-bold text-stone-800 mb-12 text-center">
            Browse Help Topics
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {helpCategories.map((category, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-terracotta/10 rounded-lg p-3">
                    <category.icon className="w-6 h-6 text-terracotta" />
                  </div>
                  <h3 className="font-playfair text-xl font-semibold text-stone-800">
                    {category.title}
                  </h3>
                </div>
                <p className="text-stone-600 mb-4">{category.description}</p>
                <ul className="space-y-2">
                  {category.articles.slice(0, 3).map((article, i) => (
                    <li key={i}>
                      <a href="#" className="text-sm text-sea hover:text-sea-dark flex items-center gap-1">
                        <ChevronRight className="w-4 h-4" />
                        {article}
                      </a>
                    </li>
                  ))}
                </ul>
                <a href="#" className="text-sm text-terracotta hover:text-terracotta-dark font-medium mt-4 inline-block">
                  View all articles →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Video Tutorials */}
            <div className="text-center">
              <div className="bg-sea/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Book className="w-8 h-8 text-sea" />
              </div>
              <h3 className="font-semibold text-stone-800 mb-2">Video Guides</h3>
              <p className="text-stone-600 mb-4">
                Watch step-by-step tutorials about using Apulink and buying property
              </p>
              <a href="#" className="text-sea hover:text-sea-dark font-medium">
                Browse Videos →
              </a>
            </div>

            {/* Glossary */}
            <div className="text-center">
              <div className="bg-olive/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-olive" />
              </div>
              <h3 className="font-semibold text-stone-800 mb-2">Property Glossary</h3>
              <p className="text-stone-600 mb-4">
                Italian property terms explained in plain English
              </p>
              <a href="#" className="text-olive hover:text-olive-dark font-medium">
                View Glossary →
              </a>
            </div>

            {/* Contact Support */}
            <div className="text-center">
              <div className="bg-terracotta/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <HelpCircle className="w-8 h-8 text-terracotta" />
              </div>
              <h3 className="font-semibold text-stone-800 mb-2">Contact Support</h3>
              <p className="text-stone-600 mb-4">
                Can't find what you need? Our team is here to help
              </p>
              <a href="/contact" className="text-terracotta hover:text-terracotta-dark font-medium">
                Contact Us →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Trullo Features */}
      <section className="py-16 bg-gradient-to-br from-sea/5 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-playfair text-3xl font-bold text-stone-800 mb-8">
            Why Chat with Trullo?
          </h2>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <Clock className="w-8 h-8 text-sea mx-auto mb-3" />
              <h3 className="font-semibold text-stone-800 mb-2">Available 24/7</h3>
              <p className="text-stone-600">
                Get instant answers any time, day or night
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <Globe className="w-8 h-8 text-sea mx-auto mb-3" />
              <h3 className="font-semibold text-stone-800 mb-2">Multilingual</h3>
              <p className="text-stone-600">
                Speaks English and Italian fluently
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <Home className="w-8 h-8 text-sea mx-auto mb-3" />
              <h3 className="font-semibold text-stone-800 mb-2">Property Expert</h3>
              <p className="text-stone-600">
                Knows everything about Puglia real estate
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <MessageCircle className="w-8 h-8 text-sea mx-auto mb-3" />
              <h3 className="font-semibold text-stone-800 mb-2">Friendly & Patient</h3>
              <p className="text-stone-600">
                Explains complex topics in simple terms
              </p>
            </div>
          </div>
          <button 
            onClick={() => {
              const chatButton = document.querySelector('[aria-label="Open chat"]') as HTMLButtonElement
              if (chatButton) chatButton.click()
            }}
            className="bg-sea text-white px-8 py-4 rounded-full font-medium hover:bg-sea-dark transition-colors text-lg"
          >
            Chat with Trullo Now
          </button>
        </div>
      </section>
    </div>
  )
}
