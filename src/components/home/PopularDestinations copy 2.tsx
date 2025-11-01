'use client';

import Layout from '@/components/layout/Layout';
import LocationHeroSection from '@/components/locations/LocationHeroSection';
import { Star } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function PopularDestinations() {
  const destinations = [
    // {
    //   id: 1,
    //   name: 'Dominican Republic',
    //   image: '/images/locations/Dominican-Republic.png',
    //   tourCount: 12,
    //   rating: 4.8,
    //   featured: true,
    // },
    {
      id: 1,
      name: 'Santo Domingo',
      image: '/images/locations/Santo-Domingo.png',
      tourCount: 10,
      rating: 4.7,
      featured: true,
    },
    {
      id: 2,
      name: 'Samaná',
      image: '/images/locations/Samana.png',
      tourCount: 8,
      rating: 4.6,
      featured: false,
    },
    {
      id: 3,
      name: 'Puerto Plata',
      image: '/images/locations/Puerto-Plata.png',
      tourCount: 9,
      rating: 4.5,
      featured: false,
    },
    {
      id: 4,
      name: 'Punta Cana',
      image: '/images/locations/Punta-Cana.png',
      tourCount: 15,
      rating: 4.9,
      featured: true,
    },
    {
      id: 5,
      name: 'Bayahibe',
      image: '/images/locations/Bayahibe.png',
      tourCount: 7,
      rating: 4.6,
      featured: false,
    },
    // All-Destinations.png
    {
      id: 6,
      name: '',
      image: '/images/locations/All-Destinations.png',
      tourCount: 7,
      rating: 4.6,
      featured: false,
    },
  ];

  // ✅ Default active hover on the first card
  const [activeCard, setActiveCard] = useState(destinations[0].id);
  const [activeCardLast, setActiveCardLast] = useState(destinations[5].id);

  return (

    <div className=" bg-gray-50">
      <div className="container-custom mx-auto px-4">
        <div className="text-left pt-20 pl-4">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 ">
            Popular Destinations
          </h2>
          <p className="text-gray-600 text-lg text-left  mx-auto">
            Discover the most beautiful places in the Dominican Republic
          </p>
        </div>

        {/* Destinations Grid */}
        <section className="py-16">
          <div className="container-custom">
            <div
              className="
                grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 
                gap-8 transition-all duration-[1800ms] ease-[cubic-bezier(0.25,1,0.3,1)]
              "
            >
              {destinations.map((destination) => (
                <Link
                  key={destination.id}
                  href={{
                    pathname: '/tours',
                    query: { location: destination.name },
                  }}
                  onMouseEnter={() => setActiveCard(destination.id)}
                  onMouseLeave={() => setActiveCard(destinations[0].id)} // Reset to first on leave
                  className={`
                    group relative rounded-2xl overflow-hidden shadow-lg
                    transform transition-all duration-[1800ms] ease-[cubic-bezier(0.25,1,0.3,1)] will-change-transform
                    ${activeCard === destination.id 
                      ? 'lg:col-span-2 scale-[1.03] shadow-2xl z-10'
                      : 'lg:col-span-1 scale-[0.97] opacity-90'}
                  `}
                >
                  {/* Image Section */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={destination.image}
                      alt={destination.name}
                      className={`
                        w-full h-full object-cover will-change-transform
                        transition-transform duration-[1800ms] ease-[cubic-bezier(0.25,1,0.3,1)]
                        ${activeCard === destination.id ? 'scale-110' : 'scale-100'}
                      `}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                    {/* Destination Name */}
                    <div className="absolute bottom-4 left-4 text-white text-lg font-semibold drop-shadow-md">
                      {destination.name}
                    </div>

                    {/* Featured Badge */}
                    {destination.featured && (
                      <div className="absolute top-4 left-4 bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-md">
                        Featured
                      </div>
                    )}

                    {/* Rating */}
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg flex items-center space-x-1 shadow-md">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium text-gray-700">
                        {destination.rating}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>


    </div>

  );
}
