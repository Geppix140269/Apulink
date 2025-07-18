// PATH: app/faq/page.tsx
'use client'
import { useState } from 'react'
import { ChevronDown, Search, Home, Users, FileText, Euro, Shield, Globe } from 'lucide-react'

interface FAQItem {
  question: string
  answer: string
  category: string
}

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const [openItems, setOpenItems] = useState<number[]>([])

  const categories = [
    { id: 'all', name: 'All Questions', icon: null },
    { id: 'buying', name: 'Buying Property', icon: Home },
    { id: 'platform', name: 'Using Apulink', icon: Shield },
    { id: 'professionals', name: 'Professionals', icon: Users },
    { id: 'documents', name: 'Documents & Legal', icon: FileText },
    { id: 'costs', name: 'Costs & Fees', icon: Euro },
    { id: 'living', name: 'Living in Puglia', icon: Globe }
  ]

  const faqs: FAQItem[] = [
    // Buying Property
    {
      question: "Can foreigners buy property in Italy?",
      answer: "Yes! Italy welcomes foreign property buyers. EU citizens have the same rights as Italian citizens. Non-EU citizens can also buy property, though some countries have reciprocity agreements that make the process easier. You'll need a codice fiscale (tax code) and a bank account. Apulink helps guide you through the entire process.",
      category: "buying"
    },
    {
      question: "What is a geometra and why do I need one?",
      answer: "A geometra is a licensed professional in Italy who handles property surveys, building permits, cadastral matters, and construction supervision. They're essential for property transactions because they verify legal compliance, check for building violations, handle bureaucracy, and ensure all documents are in order. Think of them as a combination of surveyor, building inspector, and technical consultant.",
      category: "buying"
    },
    {
      question: "How long does the property buying process take in Italy?",
      answer: "Typically 2-4 months from offer acceptance to final deed. The timeline includes: preliminary contract (compromesso) signing, due diligence period (usually 30-60 days), mortgage approval if needed (30-45 days), and final deed (rogito) at the notary. Apulink helps streamline this process by connecting you with efficient professionals.",
      category: "buying"
    },
    {
      question: "What's the difference between a trullo and a masseria?",
      answer: "A trullo is a traditional Apulian stone dwelling with a conical roof, typically small and charming, originally used for storage or temporary shelter. A masseria is a fortified farmhouse, usually much larger, that was the center of agricultural estates. Trulli are perfect for couples or small families, while masserie offer more space and often include land. Both require specialized restoration expertise.",
      category: "buying"
    },
    
    // Using Apulink
    {
      question: "How does Apulink's anonymous bidding system work?",
      answer: "When you post a survey request, verified professionals in your area receive a notification. They can view your property documents and requirements, then submit competitive bids. All communication remains anonymous through our platform until you select a winner. This ensures fair pricing and prevents professionals from circumventing the system. Once you choose a professional, we facilitate the introduction.",
      category: "platform"
    },
    {
      question: "Is my property information secure on Apulink?",
      answer: "Absolutely. We use bank-level encryption for all documents and data. Only verified professionals who match your property location can view your documents, and only while actively bidding. All access is logged and monitored. We never share your personal information until you explicitly choose a professional. Documents are permanently deleted upon request.",
      category: "platform"
    },
    {
      question: "What if I don't have all the required documents?",
      answer: "No problem! Apulink offers a document procurement service. We can obtain official documents from Italian authorities on your behalf, including cadastral records, building permits, and property deeds. This service costs €50-150 per document depending on complexity. It's especially helpful for international buyers who can't easily visit Italian offices.",
      category: "platform"
    },
    {
      question: "How much does Apulink cost?",
      answer: "Apulink is free for buyers to post requests and receive bids. We charge professionals a 10-15% commission only on successfully completed projects. The 10% deposit you pay when selecting a professional is held securely by us and goes toward their final fee. There are no hidden costs, subscription fees, or charges for using the platform.",
      category: "platform"
    },
    
    // Professionals
    {
      question: "How does Apulink verify professionals?",
      answer: "We have a thorough verification process: checking professional licenses and registrations, verifying insurance coverage, confirming business registration and VAT numbers, checking references from past clients, and requiring proof of experience. Only fully verified professionals can bid on projects.",
      category: "professionals"
    },
    {
      question: "Can I communicate with surveyors before choosing one?",
      answer: "Yes! Our platform allows anonymous messaging between you and bidding professionals. You can ask questions about their experience, clarify their proposals, request additional information, or discuss specific concerns. This helps you make an informed decision while maintaining the integrity of the bidding process.",
      category: "professionals"
    },
    {
      question: "What if I'm not satisfied with the professional's work?",
      answer: "Apulink provides several protections: we hold the 10% deposit until you confirm the professional has been selected, we mediate any disputes that arise, all professionals must maintain insurance, and you can leave reviews to help future users. If serious issues occur, we can help you find a replacement professional.",
      category: "professionals"
    },
    
    // Documents & Legal
    {
      question: "What documents do I need to buy property in Italy?",
      answer: "Essential documents include: codice fiscale (tax code), valid passport, proof of funds, bank account details, and power of attorney if buying remotely. The seller must provide: property deed, cadastral documents, building permits, energy certificate (APE), and certificate of habitability. Apulink helps ensure all necessary documents are collected.",
      category: "documents"
    },
    {
      question: "What is a compromesso?",
      answer: "The compromesso (preliminary contract) is a binding agreement between buyer and seller that outlines all terms of the sale. It includes: purchase price, payment schedule, completion date, any conditions, and penalties for breach. Usually, you pay 10-30% deposit at this stage. It's legally binding, so having a professional review it is crucial.",
      category: "documents"
    },
    {
      question: "Do I need to be present in Italy to buy property?",
      answer: "No, you can buy property remotely using a power of attorney (procura). This allows someone you trust (often your lawyer or geometra) to sign documents on your behalf. The power of attorney must be notarized and apostilled in your home country, then translated into Italian. Many international buyers use this option successfully.",
      category: "documents"
    },
    
    // Costs & Fees
    {
      question: "What are the total costs of buying property in Italy?",
      answer: "Beyond the purchase price, expect to pay: registration tax (2% for residents, 9% for non-residents on residential property), notary fees (1-2%), geometra fees (€1,500-3,000), real estate agent commission (3-4% typically), legal fees if using a lawyer (€2,000-5,000), and translation costs if needed. Apulink helps you budget accurately by connecting you with professionals who provide clear, upfront pricing.",
      category: "costs"
    },
    {
      question: "Can I get a mortgage in Italy as a foreigner?",
      answer: "Yes, many Italian banks offer mortgages to foreigners, typically up to 50-60% of the property value. Requirements include: proof of income, employment history, bank statements, credit history, and sometimes a larger deposit. EU citizens generally find it easier. Some international banks with Italian branches may offer better terms to their existing customers.",
      category: "costs"
    },
    {
      question: "Are there tax benefits for renovating property in Italy?",
      answer: "Yes! Italy offers generous tax incentives for renovations: general renovations can receive up to 50% tax credits, energy efficiency improvements up to 65%, and seismic upgrades up to 85%. The famous 'Superbonus' has offered even higher percentages. These incentives make renovating older properties very attractive. Your geometra can help you navigate available benefits.",
      category: "costs"
    },
    
    // Living in Puglia
    {
      question: "What are the best areas in Puglia for foreign buyers?",
      answer: "Popular areas include: Ostuni (the 'White City') for its charm and international community, Alberobello for its unique trulli, Polignano a Mare for coastal beauty, Lecce for baroque architecture and city life, Locorotondo and Cisternino for authentic hill town living, and the Salento peninsula for beaches. Each area offers different lifestyles and price points.",
      category: "living"
    },
    {
      question: "What's the cost of living in Puglia?",
      answer: "Puglia offers excellent value compared to northern Italy or other European destinations. Monthly costs for a couple might include: groceries (€300-500), utilities (€100-200), dining out (€200-400), and transportation (€100-200). Property taxes and maintenance are generally reasonable. Many expats find they can live comfortably on €1,500-2,500 per month.",
      category: "living"
    },
    {
      question: "Do I need residency to buy property in Italy?",
      answer: "No, you don't need residency to buy property. However, residency affects your tax status. Residents (spending 183+ days per year in Italy) pay 2% registration tax on primary homes vs. 9% for non-residents. Residency also provides access to the Italian healthcare system and other benefits. EU citizens can obtain residency easily; non-EU citizens need to meet specific requirements.",
      category: "living"
    }
  ]

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  const filteredFAQs = faqs.filter(faq => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-terracotta to-terracotta-dark text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-terracotta-light max-w-2xl mx-auto mb-8">
            Everything you need to know about buying property in Puglia with Apulink
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 pr-12 rounded-full text-stone-800 text-lg focus:outline-none focus:ring-4 focus:ring-white/30"
            />
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-stone-400" />
          </div>
        </div>
      </section>

      {/* Category Filters */}
      <section className="py-8 bg-white sticky top-0 z-40 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-4 overflow-x-auto pb-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                  activeCategory === category.id
                    ? 'bg-terracotta text-white'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {category.icon && <category.icon className="w-4 h-4" />}
                <span className="font-medium">{category.name}</span>
                <span className="text-sm opacity-75">
                  ({faqs.filter(faq => category.id === 'all' || faq.category === category.id).length})
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Items */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-stone-600 text-lg">No questions found matching your search.</p>
              <p className="text-stone-500 mt-2">Try different keywords or browse by category.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredFAQs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <button
                    onClick={() => toggleItem(index)}
                    className="w-full px-6 py-4 text-left flex items-start justify-between gap-4 focus:outline-none focus:ring-2 focus:ring-terracotta/20 rounded-lg"
                  >
                    <h3 className="font-semibold text-stone-800 text-lg pr-4">
                      {faq.question}
                    </h3>
                    <ChevronDown 
                      className={`w-5 h-5 text-stone-400 flex-shrink-0 transition-transform ${
                        openItems.includes(index) ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {openItems.includes(index) && (
                    <div className="px-6 pb-4">
                      <p className="text-stone-600 leading-relaxed">
                        {faq.answer}
                      </p>
                      <div className="mt-4 pt-4 border-t border-stone-100">
                        <p className="text-sm text-stone-500">
                          Category: {categories.find(c => c.id === faq.category)?.name}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Still Need Help */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-playfair text-3xl font-bold text-stone-800 mb-6">
            Still Have Questions?
          </h2>
          <p className="text-lg text-stone-600 mb-8">
            Our team and AI assistant Trullo are here to help you navigate your property journey in Puglia
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => {
                const chatButton = document.querySelector('[aria-label="Open chat"]') as HTMLButtonElement
                if (chatButton) chatButton.click()
              }}
              className="bg-sea text-white px-6 py-3 rounded-lg font-medium hover:bg-sea-dark transition-colors"
            >
              Chat with Trullo
            </button>
            <a
              href="/contact"
              className="bg-white text-terracotta border-2 border-terracotta px-6 py-3 rounded-lg font-medium hover:bg-terracotta/5 transition-colors"
            >
              Contact Support
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
