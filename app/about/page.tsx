// PATH: app/about/page.tsx
export default function AboutPage() {
  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-terracotta to-terracotta-dark text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-6">
            About Apulink
          </h1>
          <p className="text-xl text-terracotta-light max-w-2xl mx-auto">
            Bridging the gap between international property buyers and trusted local professionals in Puglia, Italy.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Our Story */}
        <section className="mb-16">
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h2 className="font-playfair text-3xl font-bold text-stone-800 mb-6">Our Story</h2>
            
            <div className="prose prose-stone max-w-none">
              <p className="text-stone-700 mb-4">
                Apulink was born from a simple observation: buying property in Italy, particularly in the beautiful region of Puglia, can be challenging for international buyers. Language barriers, complex bureaucracy, and the difficulty of finding trustworthy local professionals often turn what should be an exciting journey into a stressful ordeal.
              </p>
              
              <p className="text-stone-700 mb-4">
                Founded in 2024 by 1402 Celsius Ltd, we set out to solve this problem by creating a digital bridge between foreign property buyers and Puglia's most qualified local professionals. Our platform connects international investors with verified geometri, architects, lawyers, notaries, and other essential service providers who understand both the local market and the unique needs of foreign buyers.
              </p>
              
              <p className="text-stone-700 mb-4">
                What started as a response to the growing international interest in Puglia's stunning trulli, masserie, and coastal properties has evolved into a comprehensive platform that streamlines the entire property acquisition process. We're not just a marketplace – we're your trusted partner in making your Italian property dreams a reality.
              </p>
            </div>
          </div>
        </section>

        {/* Our Mission */}
        <section className="mb-16">
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h2 className="font-playfair text-3xl font-bold text-stone-800 mb-6">Our Mission</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-stone-800 mb-3 flex items-center">
                  <span className="text-2xl mr-3">🌍</span>
                  For International Buyers
                </h3>
                <p className="text-stone-700 mb-4">
                  We make property investment in Puglia accessible, transparent, and secure. Our platform eliminates the uncertainty and complexity that often deters international buyers from pursuing their Italian property dreams.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-stone-800 mb-3 flex items-center">
                  <span className="text-2xl mr-3">🏘️</span>
                  For Local Professionals
                </h3>
                <p className="text-stone-700 mb-4">
                  We connect skilled local professionals with international clients, helping them expand their business globally while maintaining the highest standards of service and professionalism.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="mb-16">
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h2 className="font-playfair text-3xl font-bold text-stone-800 mb-6">Our Values</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-terracotta/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🔒</span>
                </div>
                <h3 className="font-semibold text-stone-800 mb-2">Trust & Security</h3>
                <p className="text-stone-600 text-sm">
                  Every professional on our platform is thoroughly verified. We prioritize security in all transactions and communications.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-sea/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🌟</span>
                </div>
                <h3 className="font-semibold text-stone-800 mb-2">Excellence</h3>
                <p className="text-stone-600 text-sm">
                  We work only with the most qualified professionals and maintain the highest standards in everything we do.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-olive/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🤝</span>
                </div>
                <h3 className="font-semibold text-stone-800 mb-2">Transparency</h3>
                <p className="text-stone-600 text-sm">
                  Clear pricing, honest communication, and no hidden fees. You always know exactly what you're paying for.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Puglia */}
        <section className="mb-16">
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h2 className="font-playfair text-3xl font-bold text-stone-800 mb-6">Why Puglia?</h2>
            
            <div className="prose prose-stone max-w-none">
              <p className="text-stone-700 mb-4">
                Puglia, Italy's heel, is experiencing unprecedented international interest. Known for its distinctive trulli houses, stunning coastline, rich culinary traditions, and affordable property prices compared to other Italian regions, Puglia offers an authentic Italian lifestyle that's increasingly rare elsewhere.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 my-6">
                <div className="bg-stone-50 rounded-lg p-4">
                  <h4 className="font-semibold text-stone-800 mb-2">🏛️ Unique Architecture</h4>
                  <p className="text-stone-600 text-sm">
                    From UNESCO World Heritage trulli to grand masserie, Puglia's architecture is truly one-of-a-kind.
                  </p>
                </div>
                
                <div className="bg-stone-50 rounded-lg p-4">
                  <h4 className="font-semibold text-stone-800 mb-2">🌊 Pristine Coastline</h4>
                  <p className="text-stone-600 text-sm">
                    800km of coastline with crystal-clear waters, from the Adriatic to the Ionian Sea.
                  </p>
                </div>
                
                <div className="bg-stone-50 rounded-lg p-4">
                  <h4 className="font-semibold text-stone-800 mb-2">🍝 Culinary Excellence</h4>
                  <p className="text-stone-600 text-sm">
                    Home to some of Italy's finest cuisine, olive oil, and wine traditions.
                  </p>
                </div>
                
                <div className="bg-stone-50 rounded-lg p-4">
                  <h4 className="font-semibold text-stone-800 mb-2">💰 Value Investment</h4>
                  <p className="text-stone-600 text-sm">
                    Excellent property values with strong potential for appreciation and rental income.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Platform */}
        <section className="mb-16">
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h2 className="font-playfair text-3xl font-bold text-stone-800 mb-6">Our Platform</h2>
            
            <div className="prose prose-stone max-w-none">
              <p className="text-stone-700 mb-6">
                Apulink operates as a digital marketplace that carefully matches property buyers with the right professionals for their specific needs. Our technology-driven approach ensures efficient, secure, and transparent transactions.
              </p>
              
              <h3 className="font-semibold text-stone-800 mb-4">How We Work:</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-stone-800 mb-3 flex items-center">
                    <span className="bg-terracotta text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3">1</span>
                    Professional Verification
                  </h4>
                  <p className="text-stone-600 text-sm mb-4">
                    Every professional undergoes rigorous verification including license checks, experience validation, and reference verification.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-stone-800 mb-3 flex items-center">
                    <span className="bg-terracotta text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3">2</span>
                    Intelligent Matching
                  </h4>
                  <p className="text-stone-600 text-sm mb-4">
                    Our algorithm considers location, expertise, availability, and specific buyer requirements to make optimal matches.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-stone-800 mb-3 flex items-center">
                    <span className="bg-terracotta text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3">3</span>
                    Secure Communication
                  </h4>
                  <p className="text-stone-600 text-sm mb-4">
                    All communications are handled through our secure platform, with translation support when needed.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-stone-800 mb-3 flex items-center">
                    <span className="bg-terracotta text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3">4</span>
                    Transaction Security
                  </h4>
                  <p className="text-stone-600 text-sm mb-4">
                    Secure payment processing and commission handling ensures everyone is protected and paid fairly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Company Information */}
        <section className="mb-16">
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h2 className="font-playfair text-3xl font-bold text-stone-800 mb-6">Company Information</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-stone-800 mb-4">Legal Entity</h3>
                <div className="bg-stone-50 rounded-lg p-4">
                  <p className="text-stone-700 text-sm">
                    <strong>Company Name:</strong> 1402 Celsius Ltd<br/>
                    <strong>Registration Number:</strong> 124 75013<br/>
                    <strong>VAT Number:</strong> GB 343 1702 32<br/>
                    <strong>Jurisdiction:</strong> England and Wales
                  </p>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-stone-800 mb-4">Contact Information</h3>
                <div className="bg-stone-50 rounded-lg p-4">
                  <p className="text-stone-700 text-sm">
                    <strong>Address:</strong><br/>
                    20-22 Wenlock Road<br/>
                    N1 7GU, London<br/>
                    United Kingdom<br/><br/>
                    <strong>Email:</strong> <a href="mailto:apulink@1402celsius.com" className="text-terracotta hover:text-terracotta-dark">apulink@1402celsius.com</a><br/>
                    <strong>Phone:</strong> +44 20 7946 0958
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Compliance & Certifications */}
        <section className="mb-16">
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h2 className="font-playfair text-3xl font-bold text-stone-800 mb-6">Compliance & Security</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🔐</span>
                </div>
                <h3 className="font-semibold text-stone-800 mb-2">GDPR Compliant</h3>
                <p className="text-stone-600 text-sm">
                  Full compliance with European data protection regulations.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🛡️</span>
                </div>
                <h3 className="font-semibold text-stone-800 mb-2">Secure Platform</h3>
                <p className="text-stone-600 text-sm">
                  Bank-level security with encrypted data transmission and storage.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">✅</span>
                </div>
                <h3 className="font-semibold text-stone-800 mb-2">Verified Network</h3>
                <p className="text-stone-600 text-sm">
                  All professionals undergo thorough verification and background checks.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Future Vision */}
        <section className="mb-16">
          <div className="bg-gradient-to-br from-sea/5 to-olive/5 rounded-xl p-8">
            <h2 className="font-playfair text-3xl font-bold text-stone-800 mb-6">Our Vision</h2>
            
            <div className="prose prose-stone max-w-none">
              <p className="text-stone-700 mb-4">
                We envision a future where buying property in Italy is as simple and secure as any other international transaction. Our goal is to become the definitive platform for international property investment in Southern Italy, expanding our services to cover the entire region while maintaining our commitment to quality and trust.
              </p>
              
              <p className="text-stone-700 mb-4">
                As we grow, we're committed to supporting the local economy in Puglia by connecting skilled professionals with international opportunities, while helping more people discover the unique beauty and investment potential of this remarkable region.
              </p>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="text-center">
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h2 className="font-playfair text-2xl font-bold text-stone-800 mb-4">Ready to Start Your Journey?</h2>
            <p className="text-stone-600 mb-6">
              Whether you're looking to buy property in Puglia or you're a professional wanting to join our network, we're here to help.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/buyer/inquiry"
                className="bg-terracotta text-white px-8 py-3 rounded-lg font-semibold hover:bg-terracotta-dark transition-colors"
              >
                Start Property Search
              </a>
              <a 
                href="/professional/register"
                className="bg-sea text-white px-8 py-3 rounded-lg font-semibold hover:bg-sea-dark transition-colors"
              >
                Join Our Network
              </a>
              <a 
                href="/contact"
                className="bg-stone-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-stone-700 transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>
        </section>

        {/* Back to Home */}
        <div className="text-center mt-8">
          <a 
            href="/"
            className="inline-flex items-center text-terracotta hover:text-terracotta-dark font-medium"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </a>
        </div>
      </div>
    </div>
  )
}
