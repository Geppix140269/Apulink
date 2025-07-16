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
                Founded in 2024 by 1402 Celsius Ltd, we set out to solve this problem by creating a digital bridge between foreign property buyers and Puglia&apos;s most qualified local professionals. Our platform connects international investors with verified geometri, architects, lawyers, notaries, and other essential service providers who understand both the local market and the unique needs of foreign buyers.
              </p>
              <p className="text-stone-700 mb-4">
                What started as a response to the growing international interest in Puglia&apos;s stunning trulli, masserie, and coastal properties has evolved into a comprehensive platform that streamlines the entire property acquisition process. We&apos;re not just a marketplace – we&apos;re your trusted partner in making your Italian property dreams a reality.
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
                <h3 className="font-semibold text-stone-800 mb-2">Trust &amp; Security</h3>
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
                  Clear pricing, honest communication, and no hidden fees. You always know exactly what you&apos;re paying for.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
