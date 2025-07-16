// PATH: app/privacy/page.tsx
'use client'
import { useState } from 'react'

export default function PrivacyPolicyPage() {
  const [language, setLanguage] = useState<'en' | 'it'>('en')

  return (
    <div className="min-h-screen bg-stone-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="font-playfair text-3xl font-bold text-stone-800 mb-2">
                Privacy Policy
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
            
            {/* ENGLISH VERSION ONLY */}
            
            <section className="mb-8">
                  <h2 className="font-playfair text-2xl font-semibold text-stone-800 mb-4">1. Introduction</h2>
                  <p className="text-stone-700 mb-4">
                    Welcome to Apulink, operated by 1402 Celsius Ltd (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform connecting property buyers with local professionals in Puglia, Italy.
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
                  <h2 className="font-playfair text-2xl font-semibold text-stone-800 mb-4">2. Information We Collect</h2>
                  
                  <h3 className="font-semibold text-stone-800 mb-3">2.1 Personal Information</h3>
                  <ul className="list-disc list-inside text-stone-700 mb-4 space-y-2">
                    <li>Name, email address, and phone number</li>
                    <li>Nationality and preferred language</li>
                    <li>Property preferences and budget information</li>
                    <li>Professional credentials and business information</li>
                    <li>Communication preferences</li>
                  </ul>

                  <h3 className="font-semibold text-stone-800 mb-3">2.2 Property Information</h3>
                  <ul className="list-disc list-inside text-stone-700 mb-4 space-y-2">
                    <li>Property addresses and locations</li>
                    <li>Property types and characteristics</li>
                    <li>Budget ranges and timeline preferences</li>
                    <li>Property documents and photos (when provided)</li>
                  </ul>

                  <h3 className="font-semibold text-stone-800 mb-3">2.3 Technical Information</h3>
                  <ul className="list-disc list-inside text-stone-700 mb-4 space-y-2">
                    <li>IP addresses and browser information</li>
                    <li>Device information and operating system</li>
                    <li>Usage patterns and platform interactions</li>
                    <li>Cookies and similar tracking technologies</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="font-playfair text-2xl font-semibold text-stone-800 mb-4">3. How We Use Your Information</h2>
                  
                  <h3 className="font-semibold text-stone-800 mb-3">3.1 Service Provision</h3>
                  <ul className="list-disc list-inside text-stone-700 mb-4 space-y-2">
                    <li>Match property buyers with qualified professionals</li>
                    <li>Facilitate communications between parties</li>
                    <li>Process inquiries and registrations</li>
                    <li>Provide customer support</li>
                  </ul>

                  <h3 className="font-semibold text-stone-800 mb-3">3.2 Platform Improvement</h3>
                  <ul className="list-disc list-inside text-stone-700 mb-4 space-y-2">
                    <li>Analyze usage patterns to improve our services</li>
                    <li>Develop new features and functionality</li>
                    <li>Ensure platform security and prevent fraud</li>
                    <li>Conduct market research and analytics</li>
                  </ul>

                  <h3 className="font-semibold text-stone-800 mb-3">3.3 Legal Compliance</h3>
                  <ul className="list-disc list-inside text-stone-700 mb-4 space-y-2">
                    <li>Comply with legal obligations and regulations</li>
                    <li>Respond to legal requests and court orders</li>
                    <li>Protect our rights and interests</li>
                    <li>Prevent illegal activities</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="font-playfair text-2xl font-semibold text-stone-800 mb-4">4. Information Sharing</h2>
                  
                  <h3 className="font-semibold text-stone-800 mb-3">4.1 With Professionals</h3>
                  <p className="text-stone-700 mb-4">
                    We share relevant buyer information with matched professionals to facilitate property transactions. This includes contact details, property preferences, and inquiry specifics.
                  </p>

                  <h3 className="font-semibold text-stone-800 mb-3">4.2 With Service Providers</h3>
                  <p className="text-stone-700 mb-4">
                    We may share information with third-party service providers who assist us in operating our platform, including hosting, email services, and payment processing.
                  </p>

                  <h3 className="font-semibold text-stone-800 mb-3">4.3 Legal Requirements</h3>
                  <p className="text-stone-700 mb-4">
                    We may disclose information when required by law, regulation, or legal process, or to protect our rights and the safety of our users.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="font-playfair text-2xl font-semibold text-stone-800 mb-4">5. Data Security</h2>
                  <p className="text-stone-700 mb-4">
                    We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. This includes:
                  </p>
                  <ul className="list-disc list-inside text-stone-700 mb-4 space-y-2">
                    <li>Encryption of sensitive data in transit and at rest</li>
                    <li>Regular security assessments and updates</li>
                    <li>Access controls and authentication measures</li>
                    <li>Employee training on data protection</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="font-playfair text-2xl font-semibold text-stone-800 mb-4">6. Your Rights (GDPR)</h2>
                  <p className="text-stone-700 mb-4">
                    Under the General Data Protection Regulation (GDPR), you have the following rights:
                  </p>
                  <ul className="list-disc list-inside text-stone-700 mb-4 space-y-2">
                    <li><strong>Right to Access:</strong> Request information about your personal data</li>
                    <li><strong>Right to Rectification:</strong> Correct inaccurate or incomplete data</li>
                    <li><strong>Right to Erasure:</strong> Request deletion of your personal data</li>
                    <li><strong>Right to Restriction:</strong> Limit how we process your data</li>
                    <li><strong>Right to Portability:</strong> Receive your data in a structured format</li>
                    <li><strong>Right to Object:</strong> Object to certain types of processing</li>
                  </ul>
                  <p className="text-stone-700 mb-4">
                    To exercise these rights, please contact us at <a href="mailto:apulink@1402celsius.com" className="text-terracotta hover:text-terracotta-dark">apulink@1402celsius.com</a>
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="font-playfair text-2xl font-semibold text-stone-800 mb-4">7. Cookies and Tracking</h2>
                  <p className="text-stone-700 mb-4">
                    We use cookies and similar technologies to enhance your experience on our platform. These include:
                  </p>
                  <ul className="list-disc list-inside text-stone-700 mb-4 space-y-2">
                    <li><strong>Essential Cookies:</strong> Necessary for platform functionality</li>
                    <li><strong>Analytics Cookies:</strong> Help us understand how you use our platform</li>
                    <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
                  </ul>
                  <p className="text-stone-700 mb-4">
                    You can manage your cookie preferences through your browser settings. For more information, see our <a href="/cookies" className="text-terracotta hover:text-terracotta-dark">Cookie Policy</a>.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="font-playfair text-2xl font-semibold text-stone-800 mb-4">8. Data Retention</h2>
                  <p className="text-stone-700 mb-4">
                    We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required by law. Generally:
                  </p>
                  <ul className="list-disc list-inside text-stone-700 mb-4 space-y-2">
                    <li>Active user accounts: Retained while account is active</li>
                    <li>Inquiries and transactions: Retained for 7 years for business and legal purposes</li>
                    <li>Marketing communications: Until you unsubscribe</li>
                    <li>Technical logs: Retained for 12 months</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="font-playfair text-2xl font-semibold text-stone-800 mb-4">9. International Transfers</h2>
                  <p className="text-stone-700 mb-4">
                    As a UK-based company operating in Italy, we may transfer your personal information between the UK, EU, and other countries. We ensure appropriate safeguards are in place for such transfers in accordance with applicable data protection laws.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="font-playfair text-2xl font-semibold text-stone-800 mb-4">10. Changes to This Policy</h2>
                  <p className="text-stone-700 mb-4">
                    We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date. Your continued use of our platform after any changes constitutes acceptance of the updated policy.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="font-playfair text-2xl font-semibold text-stone-800 mb-4">11. Contact Information</h2>
                  <p className="text-stone-700 mb-4">
                    If you have questions about this Privacy Policy or our data practices, please contact us:
                  </p>
                  <div className="bg-stone-50 rounded-lg p-4">
                    <p className="text-stone-700">
                      <strong>Email:</strong> <a href="mailto:apulink@1402celsius.com" className="text-terracotta hover:text-terracotta-dark">apulink@1402celsius.com</a><br/>
                      <strong>Mail:</strong> 1402 Celsius Ltd, 20-22 Wenlock Road, N1 7GU, London, United Kingdom<br/>
                      <strong>Data Protection Officer:</strong> <a href="mailto:apulink@1402celsius.com" className="text-terracotta hover:text-terracotta-dark">apulink@1402celsius.com</a>
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
