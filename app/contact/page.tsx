// PATH: app/contact/page.tsx
'use client'
import { useState } from 'react'
import { Mail, Phone, MapPin, Clock, Send, MessageSquare } from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    type: 'general'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // TODO: Implement actual form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitStatus('success')
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        type: 'general'
      })
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-terracotta to-terracotta-dark text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-6">
            Get in Touch
          </h1>
          <p className="text-xl text-terracotta-light max-w-2xl mx-auto">
            Have questions about buying property in Puglia? Need help with our platform? We&apos;re here to help!
          </p>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Email */}
            <div className="text-center">
              <div className="bg-terracotta/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-terracotta" />
              </div>
              <h3 className="font-semibold text-stone-800 mb-2">Email Us</h3>
              <p className="text-stone-600 mb-2">For general inquiries and support</p>
              <a href="mailto:info@apulink.com" className="text-terracotta hover:text-terracotta-dark font-medium">
                info@apulink.com
              </a>
            </div>

            {/* Phone */}
            <div className="text-center">
              <div className="bg-sea/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-sea" />
              </div>
              <h3 className="font-semibold text-stone-800 mb-2">Call Us</h3>
              <p className="text-stone-600 mb-2">Mon-Fri, 9:00 AM - 6:00 PM CET</p>
              <a href="tel:+390804050607" className="text-sea hover:text-sea-dark font-medium">
                +39 080 405 0607
              </a>
            </div>

            {/* Office */}
            <div className="text-center">
              <div className="bg-olive/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-olive" />
              </div>
              <h3 className="font-semibold text-stone-800 mb-2">Visit Us</h3>
              <p className="text-stone-600">
                Via Sparano 123<br />
                70122 Bari, Italy
              </p>
            </div>
          </div>

          {/* Contact Form & Info */}
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h2 className="font-playfair text-2xl font-bold text-stone-800 mb-6">
                Send Us a Message
              </h2>

              {submitStatus === 'success' && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <p className="text-green-800">Thank you for your message! We&apos;ll get back to you within 24 hours.</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:border-terracotta focus:ring-2 focus:ring-terracotta/20"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:border-terracotta focus:ring-2 focus:ring-terracotta/20"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    Subject *
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:border-terracotta focus:ring-2 focus:ring-terracotta/20"
                  >
                    <option value="general">General Inquiry</option>
                    <option value="buyer">Buyer Support</option>
                    <option value="professional">Professional Support</option>
                    <option value="technical">Technical Issue</option>
                    <option value="partnership">Partnership Opportunity</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:border-terracotta focus:ring-2 focus:ring-terracotta/20"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                    isSubmitting
                      ? 'bg-stone-300 text-stone-500 cursor-not-allowed'
                      : 'bg-terracotta text-white hover:bg-terracotta-dark'
                  }`}
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      Send Message
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Additional Info */}
            <div className="space-y-8">
              {/* Quick Help */}
              <div className="bg-white rounded-xl shadow-sm p-8">
                <h3 className="font-playfair text-xl font-bold text-stone-800 mb-4">
                  Need Immediate Help?
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MessageSquare className="w-5 h-5 text-terracotta mt-0.5" />
                    <div>
                      <p className="font-medium text-stone-800">Chat with Trullo</p>
                      <p className="text-sm text-stone-600">
                        Our AI assistant is available 24/7 to answer your questions about property in Puglia.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-sea mt-0.5" />
                    <div>
                      <p className="font-medium text-stone-800">Response Time</p>
                      <p className="text-sm text-stone-600">
                        We typically respond to emails within 24 hours during business days.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Business Hours */}
              <div className="bg-stone-50 rounded-xl p-8">
                <h3 className="font-playfair text-xl font-bold text-stone-800 mb-4">
                  Business Hours
                </h3>
                <div className="space-y-2 text-stone-700">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span className="font-medium">9:00 AM - 6:00 PM CET</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span className="font-medium">10:00 AM - 2:00 PM CET</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span className="font-medium">Closed</span>
                  </div>
                </div>
                <p className="text-sm text-stone-600 mt-4">
                  * Trullo, our AI assistant, is available 24/7
                </p>
              </div>

              {/* Company Info */}
              <div className="bg-sea/5 rounded-xl p-8">
                <h3 className="font-playfair text-xl font-bold text-stone-800 mb-4">
                  Company Information
                </h3>
                <div className="space-y-2 text-stone-700">
                  <p><strong>Company:</strong> 1402 Celsius Ltd</p>
                  <p><strong>Registration:</strong> 124 75013</p>
                  <p><strong>VAT:</strong> GB 343 1702 32</p>
                  <p><strong>Registered Office:</strong><br />
                    20-22 Wenlock Road<br />
                    N1 7GU, London<br />
                    United Kingdom
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
