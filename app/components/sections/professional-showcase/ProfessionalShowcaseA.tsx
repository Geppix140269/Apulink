// Path: app/components/sections/professional-showcase/ProfessionalShowcaseA.tsx
// Professional showcase section with new brand colors

'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Star, MapPin, Languages, Briefcase, ChevronLeft, ChevronRight, Play, ArrowRight } from 'lucide-react';

interface ProfessionalAProps {
  title?: string;
  subtitle?: string;
}

export default function ProfessionalShowcaseA({
  title = 'Meet Our Verified Professionals',
  subtitle = 'Connect with experts who specialize in helping international buyers'
}: ProfessionalAProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Mock data - in production this would come from API
  const professionals = [
    {
      id: 1,
      name: 'Marco Benedetti',
      role: 'Real Estate Expert',
      location: 'Bari & Valle d\'Itria',
      languages: ['English', 'Italian', 'German'],
      experience: '15 years',
      specialties: ['Trulli', 'Masserie', 'Investment Properties'],
      rating: 4.9,
      reviews: 127,
      image: '/api/placeholder/400/400',
      video: 'https://res.cloudinary.com/dbvghnclx/video/upload/v1752960674/geppix1402_81420_Imagine_an_adorable_cartoon_character_shaped__f49f78b5-5cbd-4cf1-81ab-96f37c22bbef_j4pvcq.mp4'
    },
    {
      id: 2,
      name: 'Sofia Russo',
      role: 'Property Lawyer',
      location: 'Lecce & Salento',
      languages: ['English', 'Italian', 'French'],
      experience: '12 years',
      specialties: ['Legal Due Diligence', 'Tax Planning', 'Residency'],
      rating: 5.0,
      reviews: 89,
      image: '/api/placeholder/400/400'
    },
    {
      id: 3,
      name: 'Giuseppe Carrieri',
      role: 'Architect & Surveyor',
      location: 'Throughout Puglia',
      languages: ['English', 'Italian', 'Spanish'],
      experience: '20 years',
      specialties: ['Renovations', 'New Builds', 'Grant Applications'],
      rating: 4.8,
      reviews: 156,
      image: '/api/placeholder/400/400'
    }
  ];
  
  const nextProfessional = () => {
    setCurrentIndex((prev) => (prev + 1) % professionals.length);
  };
  
  const prevProfessional = () => {
    setCurrentIndex((prev) => (prev - 1 + professionals.length) % professionals.length);
  };
  
  const current = professionals[currentIndex];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">{title}</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            {subtitle}
          </p>
        </div>
        
        {/* Professional Showcase */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Professional Card */}
          <div className="glass-card overflow-hidden">
            {/* Header with gradient */}
            <div className="bg-gradient-to-br from-purple-600 to-emerald-600 p-6 text-white">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold mb-1">{current.name}</h3>
                  <p className="text-white/90">{current.role}</p>
                </div>
                <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{current.rating}</span>
                  <span className="text-sm text-white/80">({current.reviews})</span>
                </div>
              </div>
              
              {/* Location */}
              <div className="flex items-center gap-2 text-white/90">
                <MapPin className="w-4 h-4" />
                <span>{current.location}</span>
              </div>
            </div>
            
            {/* Body */}
            <div className="p-6 space-y-4">
              {/* Languages */}
              <div>
                <div className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                  <Languages className="w-5 h-5 text-purple-600" />
                  <span>Languages</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {current.languages.map((lang) => (
                    <span key={lang} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Experience */}
              <div>
                <div className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                  <Briefcase className="w-5 h-5 text-emerald-600" />
                  <span>Experience & Specialties</span>
                </div>
                <p className="text-gray-600 mb-2">{current.experience} of experience</p>
                <div className="flex flex-wrap gap-2">
                  {current.specialties.map((specialty) => (
                    <span key={specialty} className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Navigation */}
            <div className="flex justify-between items-center p-6 bg-gray-50">
              <button
                onClick={prevProfessional}
                className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow"
              >
                <ChevronLeft className="w-5 h-5 text-gray-700" />
              </button>
              
              <div className="flex gap-2">
                {professionals.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentIndex 
                        ? 'w-8 bg-gradient-to-r from-purple-600 to-emerald-600' 
                        : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
              
              <button
                onClick={nextProfessional}
                className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow"
              >
                <ChevronRight className="w-5 h-5 text-gray-700" />
              </button>
            </div>
          </div>
          
          {/* Video/Image Section */}
          <div className="relative">
            {current.video ? (
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <video
                  controls
                  className="w-full h-full object-cover"
                  poster={current.image}
                >
                  <source src={current.video} type="video/mp4" />
                </video>
                <div className="absolute bottom-4 left-4 glass-card-dark px-4 py-2">
                  <p className="text-sm font-semibold text-white flex items-center gap-2">
                    <Play className="w-4 h-4" />
                    Meet {current.name.split(' ')[0]}
                  </p>
                </div>
              </div>
            ) : (
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={current.image}
                  alt={current.name}
                  width={500}
                  height={500}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-purple-200 rounded-full filter blur-2xl opacity-40" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-emerald-200 rounded-full filter blur-2xl opacity-40" />
          </div>
        </div>
        
        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-6">
            Join 300+ verified professionals already helping international buyers
          </p>
          <a 
            href="/professional/register"
            className="btn-secondary inline-flex items-center gap-2"
          >
            Become a Verified Professional
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
