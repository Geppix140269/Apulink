/* PATH: app/components/home/SurveyPackages.tsx */
import React from 'react';
import { Home, FileText, BarChart, Wrench, SearchCheck, Euro } from 'lucide-react';

const services = [
  {
    title: 'Basic Property Survey',
    description: 'Structural & legal status, utilities, market positioning',
    icon: <Home className="w-6 h-6 text-terracotta" />,
  },
  {
    title: 'Renovation Cost Estimate',
    description: 'Breakdown from local contractors',
    icon: <Wrench className="w-6 h-6 text-terracotta" />,
  },
  {
    title: 'Mini PIA Grant Assessment',
    description: 'Eligibility check & strategy',
    icon: <SearchCheck className="w-6 h-6 text-terracotta" />,
  },
  {
    title: 'EU Grants Analysis',
    description: 'Overview of EU funding potential',
    icon: <Euro className="w-6 h-6 text-terracotta" />,
  },
  {
    title: 'Legal Documentation Review',
    description: 'Ownership, title, and compliance verification',
    icon: <FileText className="w-6 h-6 text-terracotta" />,
  },
  {
    title: 'Market Analysis',
    description: 'Local trends, value forecasts, and risks',
    icon: <BarChart className="w-6 h-6 text-terracotta" />,
  },
];

const SurveyPackages = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-center text-4xl font-playfair font-semibold mb-12 text-stone-800">
          Our <span className="gradient-text">Survey Services</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="card-modern slide-up flex flex-col gap-4 animation-delay-100"
            >
              <div className="flex items-center gap-3">
                {service.icon}
                <h3 className="text-lg font-semibold text-stone-900">
                  {service.title}
                </h3>
              </div>
              <p className="text-stone-600 text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SurveyPackages;
