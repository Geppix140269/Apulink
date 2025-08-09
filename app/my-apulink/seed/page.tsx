'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { seedDemoData } from '@/lib/firebase/seed-data';
import { useRouter } from 'next/navigation';

export default function SeedDataPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSeedData = async () => {
    if (!user) {
      setMessage('You must be logged in to seed data');
      return;
    }

    setLoading(true);
    setMessage('Seeding demo data...');

    try {
      const result = await seedDemoData(user.uid);
      setMessage('Demo data seeded successfully! Redirecting to dashboard...');
      
      setTimeout(() => {
        router.push('/my-apulink');
      }, 2000);
    } catch (error) {
      console.error('Error seeding data:', error);
      setMessage('Error seeding data. Check console for details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6">Seed Demo Data</h1>
        
        <p className="text-gray-600 mb-6">
          This will create sample projects with milestones, budgets, and documents 
          to demonstrate the dashboard functionality.
        </p>

        <button
          onClick={handleSeedData}
          disabled={loading || !user}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Seeding Data...' : 'Seed Demo Data'}
        </button>

        {message && (
          <div className={`mt-4 p-3 rounded-lg ${
            message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
          }`}>
            {message}
          </div>
        )}

        {!user && (
          <div className="mt-4 p-3 bg-yellow-100 text-yellow-700 rounded-lg">
            Please log in first to seed data.
          </div>
        )}
      </div>
    </div>
  );
}
