'use client';

import Layout from '@/components/layout/Layout';
import LocationHeroSection from '@/components/locations/LocationHeroSection';
import { Star } from 'lucide-react';

export default function LocationsPage() {
  const destinations = [
    {
      id: 1,
      name: 'Dominican Republic',
      image: '/images/locations/Dominican-Republic.png',
      tourCount: 12,
      rating: 4.8,
      featured: true,
    },
    {
      id: 2,
      name: 'Santo Domingo',
      image: '/images/locations/Santo-Domingo.png',
      tourCount: 10,
      rating: 4.7,
      featured: true,
    },
    {
      id: 3,
      name: 'Samaná',
      image: '/images/locations/Samana.png',
      tourCount: 8,
      rating: 4.6,
      featured: false,
    },
    {
      id: 4,
      name: 'Puerto Plata',
      image: '/images/locations/Puerto-Plata.png',
      tourCount: 9,
      rating: 4.5,
      featured: false,
    },
    {
      id: 5,
      name: 'Punta Cana',
      image: '/images/locations/Punta-Cana.png',
      tourCount: 15,
      rating: 4.9,
      featured: true,
    },
    {
      id: 6,
      name: 'Bayahibe',
      image: '/images/locations/Bayahibe.png',
      tourCount: 7,
      rating: 4.6,
      featured: false,
    },
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Locations page</h1>
          <h5 className="text-3xl font-bold text-gray-800">🚧 Page Under Construction</h5>
        </div>
      </div>
    </Layout>
  );
}
