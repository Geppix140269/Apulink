// components/home/HowItWorks.tsx
'use client'

import { motion } from 'framer-motion'

export default function HowItWorks() {
  const steps = {
    buyer: [
      'Submit Request',
      'Receive Quotes',
      'Message & Choose',
      'Pay & Connect',
    ],
    surveyor: [
      'Register Free',
      'Receive Requests',
      'Send Quotes',
      'Get Paid',
    ],
  }

  return (
    <section className="bg-gray-50 py-20 px-6 sm:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-center text-3xl sm:text-4xl font-light text-gray-900 mb-16">
          How It <strong className="font-bold">Works</strong>
        </h2>

        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <h3 className="text-xl font-semibold text-orange-600 mb-4">
              For Buyers
            </h3>
            <ol className="space-y-6">
              {steps.buyer.map((step, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.2, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="relative pl-10 text-gray-800"
                >
                  <span className="absolute left-0 top-0 w-6 h-6 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center font-bold">
                    {i + 1}
                  </span>
                  <strong>{step}</strong>
                  <p className="text-sm text-gray-600">
                    {[
                      'Tell us what you need and where.',
                      'Get quotes from verified professionals.',
                      'Ask questions before you choose.',
                      'Pay securely and unlock contact details.',
                    ][i]}
                  </p>
                </motion.li>
              ))}
            </ol>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-blue-600 mb-4">
              For Surveyors
            </h3>
            <ol className="space-y-6">
              {steps.surveyor.map((step, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.2, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="relative pl-10 text-gray-800"
                >
                  <span className="absolute left-0 top-0 w-6 h-6 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center font-bold">
                    {i + 1}
                  </span>
                  <strong>{step}</strong>
                  <p className="text-sm text-gray-600">
                    {[
                      'Create your profile and choose areas.',
                      'Get notified of matching projects.',
                      'Send offers and answer questions.',
                      'Get paid after buyer selects you.',
                    ][i]}
                  </p>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
