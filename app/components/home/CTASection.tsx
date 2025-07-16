// components/home/CTASection.tsx
'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function CTASection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 text-white py-20 px-6">
      <div className="absolute -top-1/2 -right-1/2 w-[200%] h-[200%] bg-[radial-gradient(circle,rgba(255,255,255,0.1)_0%,transparent_70%)] animate-spin-slow" />

      <div className="relative max-w-3xl mx-auto text-center z-10">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl font-light mb-6"
        >
          Ready to <strong className="font-bold">Get Started?</strong>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          viewport={{ once: true }}
          className="text-lg sm:text-xl text-white/90 max-w-xl mx-auto mb-10"
        >
          Join hundreds of buyers and professionals using Apulink to build smarter property investments.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          <Link
            href="/survey/request"
            className="bg-white text-orange-600 font-semibold px-8 py-4 rounded-full shadow hover:scale-105 transition"
          >
            Request a Survey
          </Link>
          <Link
            href="/surveyor/register"
            className="bg-white/10 text-white border border-white/20 px-8 py-4 rounded-full font-semibold hover:bg-white/20 transition"
          >
            Register as Surveyor
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
