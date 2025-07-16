// PATH: app/cookies/page.tsx
export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-stone-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="font-playfair text-3xl font-bold text-stone-800 mb-2">
                Cookie Policy
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
              <h2 className="font-playfair text-2xl font-semibold text-stone-800 mb-4">1. What Are Cookies</h2>
              <p className="text-stone-700 mb-4">
                Cookies are small text files that are placed on your computer or mobile device when you visit our website. They are widely used to make websites work more efficiently and to provide a better user experience.
              </p>
              <div className="bg-stone-50 rounded-lg p-4 mb-4">
                <h3 className="font-semibold text-stone-800 mb-2">About This Policy:</h3>
                <p className="text-stone-700 text-sm">
                  This Cookie Policy explains how 1402 Celsius Ltd uses cookies and similar technologies on the Apulink platform (apulink.com). This policy should be read alongside our Privacy Policy and Terms of Service.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="font-playfair text-2xl font-semibold text-stone-800 mb-4">2. Types of Cookies We Use</h2>
              
              <h3 className="font-semibold text-stone-800 mb-3">2.1 Essential Cookies</h3>
              <p className="text-stone-700 mb-4">
                These cookies are necessary for the website to function properly. They cannot be disabled without severely affecting the functionality of our platform.
              </p>
              <ul className="list-disc list-inside text-stone-700 mb-4 space-y-2">
                <li><strong>Session Management:</strong> Maintain your login status and session security</li>
                <li><strong>Security:</strong> Protect against cross-site request forgery attacks</li>
                <li><strong>Load Balancing:</strong> Distribute traffic across our servers</li>
                <li><strong>Language Preferences:</strong> Remember your language selection</li>
              </ul>

              <h3 className="font-semibold text-stone-800 mb-3">2.2 Performance Cookies</h3>
              <p className="text-stone-700 mb-4">
                These cookies help us understand how visitors use our platform, allowing us to improve its performance and user experience.
              </p>
              <ul className="list-disc list-inside text-stone-700 mb-4 space-y-2">
                <li><strong>Analytics:</strong> Track page views, bounce rates, and user interactions</li>
                <li><strong>Error Tracking:</strong> Monitor and fix technical issues</li>
                <li><strong>Performance Monitoring:</strong> Measure page load times and optimization</li>
              </ul>

              <h3 className="font-semibold text-stone-800 mb-3">2.3 Functional Cookies</h3>
              <p className="text-stone-700 mb-4">
                These cookies enable enhanced functionality and personalization on our platform.
              </p>
              <ul className="list-disc list-inside text-stone-700 mb-4 space-y-2">
                <li><strong>User Preferences:</strong> Remember your settings and preferences</li>
                <li><strong>Form Data:</strong> Save partially completed forms</li>
                <li><strong>Saved Searches:</strong> Remember your property search criteria</li>
                <li><strong>Customization:</strong> Personalize your dashboard experience</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="font-playfair text-2xl font-semibold text-stone-800 mb-4">3. Third-Party Cookies</h2>
              
              <h3 className="font-semibold text-stone-800 mb-3">3.1 Analytics Services</h3>
              <p className="text-stone-700 mb-4">
                We use third-party analytics services to understand how users interact with our platform:
              </p>
              <ul className="list-disc list-inside text-stone-700 mb-4 space-y-2">
                <li><strong>Google Analytics:</strong> Website traffic analysis and user behavior tracking</li>
                <li><strong>Supabase Analytics:</strong> Database performance and user authentication metrics</li>
                <li><strong>Netlify Analytics:</strong> Website performance and uptime monitoring</li>
              </ul>

              <h3 className="font-semibold text-stone-800 mb-3">3.2 Payment Processing</h3>
              <p className="text-stone-700 mb-4">
                When you make payments through our platform, third-party payment processors may set cookies:
              </p>
              <ul className="list-disc list-inside text-stone-700 mb-4 space-y-2">
                <li><strong>Stripe:</strong> Secure payment processing and fraud prevention</li>
                <li><strong>PayPal:</strong> Alternative payment method processing</li>
              </ul>

              <h3 className="font-semibold text-stone-800 mb-3">3.3 Communication Services</h3>
              <p className="text-stone-700 mb-4">
                We use third-party services for email and customer support:
              </p>
              <ul className="list-disc list-inside text-stone-700 mb-4 space-y-2">
                <li><strong>Resend:</strong> Email delivery and tracking</li>
                <li><strong>Intercom:</strong> Customer support chat functionality</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="font-playfair text-2xl font-semibold text-stone-800 mb-4">4. Cookie Duration</h2>
              
              <h3 className="font-semibold text-stone-800 mb-3">4.1 Session Cookies</h3>
              <p className="text-stone-700 mb-4">
                These cookies are temporary and are deleted when you close your browser. They are used for essential website functionality and security.
              </p>

              <h3 className="font-semibold text-stone-800 mb-3">4.2 Persistent Cookies</h3>
              <p className="text-stone-700 mb-4">
                These cookies remain on your device for a specified period or until you delete them. Our persistent cookies have the following durations:
              </p>
              <ul className="list-disc list-inside text-stone-700 mb-4 space-y-2">
                <li><strong>User Preferences:</strong> 1 year</li>
                <li><strong>Analytics:</strong> 2 years</li>
                <li><strong>Security:</strong> 30 days</li>
                <li><strong>Performance:</strong> 6 months</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="font-playfair text-2xl font-semibold text-stone-800 mb-4">5. Managing Your Cookie Preferences</h2>
              
              <h3 className="font-semibold text-stone-800 mb-3">5.1 Browser Settings</h3>
              <p className="text-stone-700 mb-4">
                You can control cookies through your browser settings. Most browsers allow you to:
              </p>
              <ul className="list-disc list-inside text-stone-700 mb-4 space-y-2">
                <li>View and delete cookies</li>
                <li>Block cookies from specific websites</li>
                <li>Block all cookies</li>
                <li>Delete all cookies when you close your browser</li>
              </ul>

              <div className="bg-blue-50 rounded-lg p-4 mb-4">
                <h4 className="font-semibold text-stone-800 mb-2">Popular Browser Cookie Settings:</h4>
                <ul className="text-stone-700 text-sm space-y-1">
                  <li><strong>Chrome:</strong> Settings → Privacy and security → Cookies and other site data</li>
                  <li><strong>Firefox:</strong> Settings → Privacy & Security → Cookies and Site Data</li>
                  <li><strong>Safari:</strong> Preferences → Privacy → Manage Website Data</li>
                  <li><strong>Edge:</strong> Settings → Site permissions → Cookies and site data</li>
                </ul>
              </div>

              <h3 className="font-semibold text-stone-800 mb-3">5.2 Platform Settings</h3>
              <p className="text-stone-700 mb-4">
                When you first visit our platform, you can choose your cookie preferences through our consent banner. You can update these preferences at any time by clicking the &quot;Cookie Preferences&quot; link in our website footer.
              </p>

              <h3 className="font-semibold text-stone-800 mb-3">5.3 Impact of Disabling Cookies</h3>
              <p className="text-stone-700 mb-4">
                Please note that disabling cookies may affect your experience on our platform:
              </p>
              <ul className="list-disc list-inside text-stone-700 mb-4 space-y-2">
                <li>You may need to re-enter information more frequently</li>
                <li>Some features may not function properly</li>
                <li>Your preferences may not be remembered</li>
                <li>You may see less relevant content</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="font-playfair text-2xl font-semibold text-stone-800 mb-4">6. Legal Basis for Cookie Use</h2>
              
              <h3 className="font-semibold text-stone-800 mb-3">6.1 EU Cookie Law Compliance</h3>
              <p className="text-stone-700 mb-4">
                We comply with the EU Cookie Law (ePrivacy Directive) by:
              </p>
              <ul className="list-disc list-inside text-stone-700 mb-4 space-y-2">
                <li>Obtaining your consent before setting non-essential cookies</li>
                <li>Providing clear information about cookie purposes</li>
                <li>Giving you control over your cookie preferences</li>
                <li>Allowing you to withdraw consent at any time</li>
              </ul>

              <h3 className="font-semibold text-stone-800 mb-3">6.2 GDPR Compliance</h3>
              <p className="text-stone-700 mb-4">
                Under GDPR, our legal basis for cookie use varies by type:
              </p>
              <ul className="list-disc list-inside text-stone-700 mb-4 space-y-2">
                <li><strong>Essential Cookies:</strong> Legitimate interest (necessary for service provision)</li>
                <li><strong>Performance Cookies:</strong> Legitimate interest (improving our services)</li>
                <li><strong>Functional Cookies:</strong> Consent (enhancing user experience)</li>
                <li><strong>Analytics Cookies:</strong> Consent (understanding user behavior)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="font-playfair text-2xl font-semibold text-stone-800 mb-4">7. Data Protection and Security</h2>
              
              <h3 className="font-semibold text-stone-800 mb-3">7.1 Data Security</h3>
              <p className="text-stone-700 mb-4">
                We implement appropriate security measures to protect cookie data:
              </p>
              <ul className="list-disc list-inside text-stone-700 mb-4 space-y-2">
                <li>Secure transmission using HTTPS encryption</li>
                <li>Regular security audits and updates</li>
                <li>Access controls and authentication</li>
                <li>Secure storage and processing</li>
              </ul>

              <h3 className="font-semibold text-stone-800 mb-3">7.2 Data Retention</h3>
              <p className="text-stone-700 mb-4">
                We retain cookie data only for as long as necessary for the purposes outlined in this policy. When cookies expire or are deleted, the associated data is also removed from our systems.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-playfair text-2xl font-semibold text-stone-800 mb-4">8. International Transfers</h2>
              <p className="text-stone-700 mb-4">
                Some of our third-party service providers may be located outside the European Economic Area (EEA). When cookie data is transferred internationally, we ensure appropriate safeguards are in place, including:
              </p>
              <ul className="list-disc list-inside text-stone-700 mb-4 space-y-2">
                <li>Adequacy decisions by the European Commission</li>
                <li>Standard contractual clauses</li>
                <li>Binding corporate rules</li>
                <li>Certification schemes</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="font-playfair text-2xl font-semibold text-stone-800 mb-4">9. Changes to This Policy</h2>
              <p className="text-stone-700 mb-4">
                We may update this Cookie Policy from time to time to reflect changes in our practices or applicable laws. We will notify you of any material changes by:
              </p>
              <ul className="list-disc list-inside text-stone-700 mb-4 space-y-2">
                <li>Posting the updated policy on our website</li>
                <li>Updating the &quot;Last updated&quot; date at the top of this page</li>
                <li>Sending email notifications for significant changes</li>
                <li>Displaying a notice on our platform</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="font-playfair text-2xl font-semibold text-stone-800 mb-4">10. Contact Information</h2>
              <p className="text-stone-700 mb-4">
                If you have questions about this Cookie Policy or our cookie practices, please contact us:
              </p>
              <div className="bg-stone-50 rounded-lg p-4">
                <p className="text-stone-700">
                  <strong>Email:</strong> <a href="mailto:apulink@1402celsius.com" className="text-terracotta hover:text-terracotta-dark">apulink@1402celsius.com</a><br/>
                  <strong>Subject Line:</strong> Cookie Policy Inquiry<br/>
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
