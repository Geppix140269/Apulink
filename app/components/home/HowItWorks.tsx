/* PATH: app/components/home/HowItWorks.tsx */
import React from 'react';
import { BadgeCheck, MessageCircle, Send, CreditCard, ClipboardList, UserCheck } from 'lucide-react';

const HowItWorks = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-center text-4xl font-playfair font-semibold mb-16 text-stone-800">
          How It <span className="gradient-text">Works</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* For Buyers */}
          <div className="card-modern slide-up">
            <h3 className="text-terracotta text-lg font-playfair font-bold mb-6">For Buyers</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <ClipboardList className="text-terracotta w-5 h-5 mt-1 animate-float" />
                <div>
                  <p className="font-semibold text-stone-800">Submit Request</p>
                  <p className="text-stone-600">Tell us what you need and where.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <BadgeCheck className="text-terracotta w-5 h-5 mt-1" />
                <div>
                  <p className="font-semibold text-stone-800">Receive Quotes</p>
                  <p className="text-stone-600">Get quotes from verified professionals.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MessageCircle className="text-terracotta w-5 h-5 mt-1" />
                <div>
                  <p className="font-semibold text-stone-800">Message & Choose</p>
                  <p className="text-stone-600">Ask questions before you choose.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CreditCard className="text-terracotta w-5 h-5 mt-1" />
                <div>
                  <p className="font-semibold text-stone-800">Pay & Connect</p>
                  <p className="text-stone-600">Pay securely and unlock contact details.</p>
                </div>
              </li>
            </ul>
          </div>

          {/* For Surveyors */}
          <div className="card-modern slide-up animation-delay-200">
            <h3 className="text-sea text-lg font-playfair font-bold mb-6">For Surveyors</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <UserCheck className="text-sea w-5 h-5 mt-1 animate-float-delayed" />
                <div>
                  <p className="font-semibold text-stone-800">Register Free</p>
                  <p className="text-stone-600">Create your profile and choose areas.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <ClipboardList className="text-sea w-5 h-5 mt-1" />
                <div>
                  <p className="font-semibold text-stone-800">Receive Requests</p>
                  <p className="text-stone-600">Get notified of matching projects.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Send className="text-sea w-5 h-5 mt-1" />
                <div>
                  <p className="font-semibold text-stone-800">Send Quotes</p>
                  <p className="text-stone-600">Send offers and answer questions.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CreditCard className="text-sea w-5 h-5 mt-1" />
                <div>
                  <p className="font-semibold text-stone-800">Get Paid</p>
                  <p className="text-stone-600">Get paid after buyer selects you.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
