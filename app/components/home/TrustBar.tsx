import React from 'react'

export default function TrustBar() {
  const trustItems = [
    { value: '10,000+', label: 'Property Buyers Served' },
    { value: '500+', label: 'Verified Professionals' },
    { value: '€50M+', label: 'Property Value Surveyed' },
    { value: '4.8/5', label: 'Average Rating' },
    { value: '24hr', label: 'Average Response Time' }
  ]

  return (
    <section className="bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
          {trustItems.map((item, index) => (
            <div key={index} className="text-white">
              <p className="text-2xl md:text-3xl font-bold text-olive">{item.value}</p>
              <p className="text-sm text-gray-400 mt-1">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
