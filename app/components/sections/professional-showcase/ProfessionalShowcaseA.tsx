// Path: /app/components/sections/professional-showcase/ProfessionalShowcaseA.tsx
// Professional showcase section variant A - Grid layout

'use client';

import { ProfessionalShowcaseProps } from '@/types/sections';
import Link from 'next/link';

export default function ProfessionalShowcaseA({ title, subtitle, professionals }: ProfessionalShowcaseProps) {
  // Show placeholder if no professionals yet
  const displayProfessionals = professionals.length > 0 ? professionals : [
    {
      id: '1',
      name: 'Marco Rossi',
      profession: 'Real Estate Agent',
      image: '/placeholder-avatar.jpg',
      rating: 5,
      projectsCompleted: 47
    },
    {
      id: '2',
      name: 'Sofia Bianchi',
      profession: 'Property Lawyer',
      image: '/placeholder-avatar.jpg',
      rating: 5,
      projectsCompleted: 89
    },
    {
      id: '3',
      name: 'Luigi Verdi',
      profession: 'Architect',
      image: '/placeholder-avatar.jpg',
      rating: 4.9,
      projectsCompleted: 31
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#F5F2ED]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#2C3E50] mb-4">
            {title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {displayProfessionals.slice(0, 3).map((professional) => (
            <div
              key={professional.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-3xl text-gray-500">👤</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-[#2C3E50] mb-1">
                  {professional.name}
                </h3>
                <p className="text-[#8B9A7B] mb-4">{professional.profession}</p>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center">
                    <span className="text-yellow-500 mr-1">★</span>
                    <span>{professional.rating}</span>
                  </div>
                  <div>
                    {professional.projectsCompleted} projects
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/professionals"
            className="inline-block bg-[#D4A574] hover:bg-[#C19660] text-white font-semibold py-3 px-8 rounded-lg transition duration-300"
          >
            Browse All Professionals
          </Link>
        </div>
      </div>
    </section>
  );
}
