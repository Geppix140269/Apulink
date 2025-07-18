import React from 'react'
import { Star, Quote, MapPin } from 'lucide-react'

export default function SocialProof() {
  const testimonials = [
    {
      name: "Sarah Thompson",
      location: "London, UK",
      property: "Trullo in Ostuni, Puglia",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      rating: 5,
      text: "Apulink made buying our dream home in Puglia so simple. Our surveyor found issues we would have missed, saving us €30,000 in repairs. The architect they connected us with handled all the renovation permits perfectly.",
      professionals: ["Surveyor", "Architect", "Lawyer"]
    },
    {
      name: "Michael Chen",
      location: "San Francisco, USA",
      property: "Villa in Polignano a Mare",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
      rating: 5,
      text: "As an overseas buyer, having English-speaking professionals was crucial. The lawyer Apulink recommended walked us through every step of the purchase. Response times were incredible - usually within hours!",
      professionals: ["Lawyer", "Notary", "Surveyor"]
    },
    {
      name: "Klaus & Anna Weber",
      location: "Munich, Germany",
      property: "Masseria near Lecce",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Klaus",
      rating: 5,
      text: "We compared 5 different surveyors through Apulink and saved 40% compared to the first quote we got elsewhere. The platform made it easy to see credentials, reviews, and pricing all in one place.",
      professionals: ["Surveyor", "Engineer", "Architect"]
    }
  ]

  const stats = [
    { number: "€15M+", label: "Property value protected" },
    { number: "92%", label: "Issues found before purchase" },
    { number: "€350", label: "Average savings per survey" },
    { number: "4.9/5", label: "Average customer rating" }
  ]

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-4">
            Join Thousands of Happy Property Buyers
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real stories from international buyers who found their dream Italian property with Apulink&apos;s professional network
          </p>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center p-6 bg-gradient-to-br from-sea/5 to-olive/5 rounded-xl">
              <p className="text-3xl font-bold text-terracotta">{stat.number}</p>
              <p className="text-sm text-gray-600 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-6 relative">
              <Quote className="absolute top-4 right-4 w-8 h-8 text-terracotta/20" />
              
              <div className="flex items-center gap-4 mb-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                  <p className="text-sm text-gray-600">{testimonial.location}</p>
                </div>
              </div>

              <div className="flex items-center gap-1 mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                ))}
              </div>

              <p className="text-gray-700 mb-4">&ldquo;{testimonial.text}&rdquo;</p>

              <div className="pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-600 mb-2 flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  Property: {testimonial.property}
                </p>
                <p className="text-xs text-gray-600">
                  Used: {testimonial.professionals.join(", ")}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-lg text-gray-600">
            Ready to join them? Start your Italian property journey today.
          </p>
        </div>
      </div>
    </section>
  )
}
