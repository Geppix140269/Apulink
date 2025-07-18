import React from 'react'
import { Star, MapPin, Clock, CheckCircle, MessageSquare } from 'lucide-react'

export default function ProfessionalShowcase() {
  const professionals = [
    {
      name: "Marco Rossi",
      title: "RICS Chartered Surveyor",
      location: "Bari, Puglia",
      rating: 4.9,
      reviews: 127,
      responseTime: "2 hours",
      expertise: ["Structural Surveys", "Pre-Purchase Inspections", "Defect Analysis"],
      languages: ["English", "Italian", "German"],
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marco"
    },
    {
      name: "Elena Bianchi",
      title: "Licensed Architect",
      location: "Lecce, Puglia",
      rating: 5.0,
      reviews: 89,
      responseTime: "4 hours",
      expertise: ["Renovation Projects", "Historic Properties", "Planning Permissions"],
      languages: ["English", "Italian", "French"],
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena"
    },
    {
      name: "Giuseppe Conti",
      title: "Property Lawyer",
      location: "Brindisi, Puglia",
      rating: 4.8,
      reviews: 156,
      responseTime: "Same day",
      expertise: ["Property Contracts", "Due Diligence", "Tax Advisory"],
      languages: ["English", "Italian", "Spanish"],
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Giuseppe"
    }
  ]

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-4">
            Meet Our Top-Rated Professionals
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Every professional on Apulink is verified, licensed, and rated by real clients. 
            Here are some of our highest-rated experts ready to help with your property needs.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {professionals.map((pro, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <img 
                      src={pro.image} 
                      alt={pro.name}
                      className="w-16 h-16 rounded-full bg-gray-200"
                    />
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{pro.name}</h3>
                      <p className="text-sea font-medium">{pro.title}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4 text-terracotta" />
                    <span>{pro.location}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="font-semibold text-gray-900">{pro.rating}</span>
                    </div>
                    <span className="text-sm text-gray-600">({pro.reviews} reviews)</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4 text-olive" />
                    <span>Responds in {pro.responseTime}</span>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Expertise:</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {pro.expertise.map((skill, i) => (
                      <span key={i} className="text-xs bg-sea/10 text-sea px-2 py-1 rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>

                  <p className="text-sm font-medium text-gray-700 mb-2">Languages:</p>
                  <p className="text-sm text-gray-600">{pro.languages.join(", ")}</p>
                </div>

                <button className="w-full mt-4 bg-terracotta text-white font-semibold py-3 px-4 rounded-lg hover:bg-terracotta/90 transition-colors duration-200">
                  Request Quote
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="inline-flex items-center gap-2 bg-white border-2 border-sea text-sea font-semibold py-3 px-6 rounded-lg hover:bg-sea hover:text-white transition-all duration-200">
            Browse All Professionals
            <CheckCircle className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  )
}
