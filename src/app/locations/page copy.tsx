'use client';

import Layout from '@/components/layout/Layout';
import LocationHeroSection from '@/components/locations/LocationHeroSection';
import { Star } from 'lucide-react';
import Link from 'next/link';

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
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <LocationHeroSection />

        {/* Destinations Grid */}
        <section className="py-16">
          <div className="container-custom">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {destinations.map((destination) => (
                <Link
                  key={destination.id}
                  href={{
                    pathname: '/tours',
                    query: { location: destination.name }, // ✅ Pass location in query
                  }}
                  className="group relative transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)] lg:col-span-1 hover:lg:col-span-2"
                >
                  <div className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)]">
                    {/* Image Section */}
                    <div className="relative h-64 overflow-hidden cursor-pointer">
                      <img
                        src={destination.image}
                        alt={destination.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)]"
                      />
                      <div className="absolute inset-0 bg-black/30" />
                      <div className="absolute bottom-4 left-4 text-white text-lg font-semibold drop-shadow-md">
                        {destination.name}
                      </div>

                      {/* Featured Badge */}
                      {destination.featured && (
                        <div className="absolute top-4 left-4 bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                          Featured
                        </div>
                      )}

                      {/* Rating */}
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium text-gray-700">
                          {destination.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-white">
          <div className="container-custom text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Can't find what you're looking for?
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Our travel experts can help you plan the perfect Dominican Republic experience tailored to your preferences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-primary-500 hover:bg-primary-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-200">
                Contact Us
              </button>
              <button className="border border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-200">
                View All Tours
              </button>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
