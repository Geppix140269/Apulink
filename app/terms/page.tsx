// PATH: app/terms/page.tsx
export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-stone-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="font-playfair text-3xl font-bold text-stone-800 mb-2">
                Terms of Service
              </h1>
              <p className="text-stone-600">
                Last updated: July 15, 2025
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl shadow-sm p-8">
          <div className="prose prose-stone max-w-none">
            
            <section className="mb-8">
              <h2 className="font-playfair text-2xl font-semibold text-stone-800 mb-4">1. Acceptance of Terms</h2>
              <p className="text-stone-700 mb-4">
                By accessing and using Apulink (&quot;the Platform&quot;), operated by 1402 Celsius Ltd (&quot;Company&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), you accept and agree to be bound by these Terms of Service (&quot;Terms&quot;). If you do not agree to these Terms, please do not use our Platform.
              </p>
              <div className="bg-stone-50 rounded-lg p-4 mb-4">
                <h3 className="font-semibold text-stone-800 mb-2">Company Information:</h3>
                <p className="text-stone-700 text-sm">
                  1402 Celsius Ltd<br/>
                  20-22 Wenlock Road<br/>
                  N1 7GU, London<br/>
                  United Kingdom<br/>
                  Registration Number: 124 75013<br/>
                  VAT Number: GB 343 1702 32
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="font-playfair text-2xl font-semibold text-stone-800 mb-4">2. Platform Description</h2>
              <p className="text-stone-700 mb-4">
                Apulink is a digital marketplace that connects foreign property buyers with qualified local professionals in Puglia, Italy. Our services include:
              </p>
              <ul className="list-disc list-inside text-stone-700 mb-4 space-y-2">
                <li>Matching property buyers with verified surveyors, architects, lawyers, and other professionals</li>
                <li>Facilitating communication between buyers and professionals</li>
                <li>Processing property inquiries and professional registrations</li>
                <li>Providing support services for document acquisition and translation</li>
                <li>Enabling secure transactions and commission processing</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="font-playfair text-2xl font-semibold text-stone-800 mb-4">3. User Accounts and Registration</h2>
              
              <h3 className="font-semibold text-stone-800 mb-3">3.1 Account Creation</h3>
              <p className="text-stone-700 mb-4">
                To use certain features of the Platform, you must create an account. You agree to provide accurate, current, and complete information and to update such information as necessary.
              </p>

              <h3 className="font-semibold text-stone-800 mb-3">3.2 Account Security</h3>
              <p className="text-stone-700 mb-4">
                You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must notify us immediately of any unauthorized use of your account.
              </p>

              <h3 className="font-semibold text-stone-800 mb-3">3.3 Professional Verification</h3>
              <p className="text-stone-700 mb-4">
                Professionals registering on the Platform must provide valid credentials and undergo our verification process. We reserve the right to request additional documentation and to reject applications that do not meet our standards.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-playfair text-2xl font-semibold text-stone-800 mb-4">4. User Conduct</h2>
              
              <h3 className="font-semibold text-stone-800 mb-3">4.1 Permitted Use</h3>
              <p className="text-stone-700 mb-4">
                You may use the Platform only for lawful purposes and in accordance with these Terms. You agree not to use the Platform:
              </p>
              <ul className="list-disc list-inside text-stone-700 mb-4 space-y-2">
                <li>To violate any applicable laws or regulations</li>
                <li>To transmit harmful, offensive, or inappropriate content</li>
                <li>To interfere with the Platform&apos;s security or functionality</li>
                <li>To impersonate another person or entity</li>
                <li>To engage in fraudulent or deceptive practices</li>
                <li>To bypass our matching system or contact professionals directly without authorization</li>
              </ul>

              <h3 className="font-semibold text-stone-800 mb-3">4.2 Professional Standards</h3>
              <p className="text-stone-700 mb-4">
                Professionals using the Platform must maintain appropriate professional standards, provide accurate information about their services, and comply with applicable licensing requirements and industry regulations.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-playfair text-2xl font-semibold text-stone-800 mb-4">5. Document Upload and Security</h2>
              
              <h3 className="font-semibold text-stone-800 mb-3">5.1 Document Requirements</h3>
              <p className="text-stone-700 mb-4">
                Buyers must provide specific property documents for professionals to provide accurate quotes. Required documents include but are not limited to:
              </p>
              <ul className="list-disc list-inside text-stone-700 mb-4 space-y-2">
                <li>Property deed (Atto di Proprietà)</li>
                <li>Cadastral certificate (Visura Catastale)</li>
                <li>Building permits (Permesso di Costruire/DIA/SCIA)</li>
                <li>Property photos (minimum 10 exterior, 10 interior)</li>
                <li>Location details and GPS coordinates</li>
                <li>Utility connection information</li>
                <li>Energy certificate (APE) if available</li>
              </ul>

              <h3 className="font-semibold text-stone-800 mb-3">5.2 Document Security</h3>
              <p className="text-stone-700 mb-4">
                All uploaded documents are stored securely and encrypted. Access is restricted to matched professionals only. We maintain strict confidentiality and will not share documents with unauthorized parties.
              </p>

              <h3 className="font-semibold text-stone-800 mb-3">5.3 Missing Documents</h3>
              <p className="text-stone-700 mb-4">
                If buyers do not have required documents, they may request our support services for document acquisition at additional cost. Pricing for support services is available upon request.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-playfair text-2xl font-semibold text-stone-800 mb-4">6. Transactions and Payments</h2>
              
              <h3 className="font-semibold text-stone-800 mb-3">6.1 Commission Structure</h3>
              <p className="text-stone-700 mb-4">
                Our Platform operates on a commission-based model. We charge a commission of 10-15% on successfully completed transactions between buyers and professionals. This commission is deducted from payments made through our Platform.
              </p>

              <h3 className="font-semibold text-stone-800 mb-3">6.2 Payment Processing</h3>
              <p className="text-stone-700 mb-4">
                All payments are processed through secure third-party payment processors. We do not store your payment information on our servers. Transaction disputes must be reported within 30 days of the transaction.
              </p>

              <h3 className="font-semibold text-stone-800 mb-3">6.3 Support Services</h3>
              <p className="text-stone-700 mb-4">
                Additional support services are charged separately according to our published fee schedule:
              </p>
              <ul className="list-disc list-inside text-stone-700 mb-4 space-y-2">
                <li>Document retrieval: €50-150 per document</li>
                <li>Translation services: €25 per page</li>
                <li>Legal document review: €100-200</li>
                <li>Property research: €200-500</li>
                <li>Full due diligence: €500-1000</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="font-playfair text-2xl font-semibold text-stone-800 mb-4">7. Intellectual Property</h2>
              
              <h3 className="font-semibold text-stone-800 mb-3">7.1 Platform Rights</h3>
              <p className="text-stone-700 mb-4">
                The Platform and its content, features, and functionality are owned by 1402 Celsius Ltd and are protected by copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written permission.
              </p>

              <h3 className="font-semibold text-stone-800 mb-3">7.2 User Content</h3>
              <p className="text-stone-700 mb-4">
                By submitting content to the Platform, you grant us a non-exclusive, royalty-free license to use, modify, and display such content in connection with our services. You retain ownership of your content but are responsible for ensuring you have the right to share it.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-playfair text-2xl font-semibold text-stone-800 mb-4">8. Privacy and Data Protection</h2>
              <p className="text-stone-700 mb-4">
                Your privacy is important to us. Please review our <a href="/privacy" className="text-terracotta hover:text-terracotta-dark">Privacy Policy</a>, which explains how we collect, use, and protect your information. By using the Platform, you consent to the collection and use of your information as described in our Privacy Policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-playfair text-2xl font-semibold text-stone-800 mb-4">9. Disclaimers and Limitations</h2>
              
              <h3 className="font-semibold text-stone-800 mb-3">9.1 Service Disclaimer</h3>
              <p className="text-stone-700 mb-4">
                The Platform is provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind. We do not guarantee that the Platform will be error-free, secure, or continuously available. We are not responsible for the quality, accuracy, or reliability of services provided by professionals on the Platform.
              </p>

              <h3 className="font-semibold text-stone-800 mb-3">9.2 Professional Services</h3>
              <p className="text-stone-700 mb-4">
                We act as a marketplace connecting buyers and professionals. We do not provide professional services directly and are not liable for the work performed by professionals. All professional services are provided by independent contractors.
              </p>

              <h3 className="font-semibold text-stone-800 mb-3">9.3 Limitation of Liability</h3>
              <p className="text-stone-700 mb-4">
                To the maximum extent permitted by law, 1402 Celsius Ltd shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Platform. Our total liability shall not exceed the fees paid by you in the 12 months preceding the claim.
              </p>

              <h3 className="font-semibold text-stone-800 mb-3">9.4 Third-Party Services</h3>
              <p className="text-stone-700 mb-4">
                The Platform may contain links to third-party websites or services. We are not responsible for the content, privacy policies, or practices of these third parties. Your use of third-party services is at your own risk.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-playfair text-2xl font-semibold text-stone-800 mb-4">10. Termination</h2>
              
              <h3 className="font-semibold text-stone-800 mb-3">10.1 Termination by You</h3>
              <p className="text-stone-700 mb-4">
                You may terminate your account at any time by contacting us. Upon termination, your right to use the Platform will cease immediately, but these Terms will remain in effect regarding past use.
              </p>

              <h3 className="font-semibold text-stone-800 mb-3">10.2 Termination by Us</h3>
              <p className="text-stone-700 mb-4">
                We reserve the right to terminate or suspend your account immediately, without prior notice, if you violate these Terms or engage in activities that may harm our Platform or other users.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-playfair text-2xl font-semibold text-stone-800 mb-4">11. Dispute Resolution</h2>
              
              <h3 className="font-semibold text-stone-800 mb-3">11.1 Governing Law</h3>
              <p className="text-stone-700 mb-4">
                These Terms are governed by the laws of England and Wales. Any disputes will be subject to the exclusive jurisdiction of the courts of England and Wales.
              </p>

              <h3 className="font-semibold text-stone-800 mb-3">11.2 Dispute Resolution Process</h3>
              <p className="text-stone-700 mb-4">
                Before pursuing formal legal action, we encourage users to contact us to resolve disputes informally. We will make reasonable efforts to resolve disputes within 30 days of notification.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-playfair text-2xl font-semibold text-stone-800 mb-4">12. Changes to Terms</h2>
              <p className="text-stone-700 mb-4">
                We may update these Terms from time to time. We will notify you of any material changes by posting the updated Terms on this page and updating the &quot;Last updated&quot; date. Your continued use of the Platform after any changes constitutes acceptance of the updated Terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-playfair text-2xl font-semibold text-stone-800 mb-4">13. Contact Information</h2>
              <p className="text-stone-700 mb-4">
                If you have questions about these Terms, please contact us:
              </p>
              <div className="bg-stone-50 rounded-lg p-4">
                <p className="text-stone-700">
                  <strong>Email:</strong> <a href="mailto:apulink@1402celsius.com" className="text-terracotta hover:text-terracotta-dark">apulink@1402celsius.com</a><br/>
                  <strong>Mail:</strong> 1402 Celsius Ltd, 20-22 Wenlock Road, N1 7GU, London, United Kingdom<br/>
                  <strong>Phone:</strong> +44 20 7946 0958 (Business hours: 9:00 AM - 6:00 PM GMT)
                </p>
              </div>
            </section>
              
          </div>
        </div>

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
