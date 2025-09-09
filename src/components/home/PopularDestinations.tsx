'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image'; // Import the Image component for Next.js
import { ArrowRight } from 'lucide-react';

const PopularDestinations = () => {
  const destinations = [
    {
      id: 1,
      name: 'Santo Domingo',
      image: '/images/destinations/santo-domingo.png',
      featured: true,
      description: 'Historic Capital' // Added a description for clarity
    },
    {
      id: 2,
      name: 'Samaná',
      image: '/images/destinations/samana.png',
      featured: false
    },
    {
      id: 3,
      name: 'Punta Cana',
      image: '/images/destinations/punta-cana.png',
      featured: false
    },
    {
      id: 4,
      name: 'Puerto Plata',
      image: '/images/destinations/puerto-plata.png',
      featured: false
    },
    {
      id: 5,
      name: 'Bayahibe',
      image: '/images/destinations/bayahibe.png',
      featured: false
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="container-custom mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            Popular Destinations
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover the most beautiful places in the Dominican Republic
          </p>
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Featured Destination (Santo Domingo) - Spanning 2 columns and 2 rows on large screens */}
          <div className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2
                      col-span-1 sm:col-span-2 row-span-2 h-[450px] sm:h-auto">
            <Link href={`/locations/${destinations[0].name.toLowerCase().replace(' ', '-')}`}>
              <Image 
                src={destinations[0].image} 
                alt={destinations[0].name} 
                layout="fill" 
                objectFit="cover" 
                className="group-hover:scale-110 transition-transform duration-500" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <h3 className="text-2xl lg:text-3xl font-bold mb-2">
                  {destinations[0].name}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-white/90">{destinations[0].description}</span>
                  <div className="bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Featured
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Other Destinations (the rest of the array) */}
          {destinations.slice(1).map((destination) => (
            <div 
              key={destination.id} 
              className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 h-[200px]"
            >
              <Link href={`/locations/${destination.name.toLowerCase().replace(' ', '-')}`}>
                <Image
                  src={destination.image}
                  alt={destination.name}
                  layout="fill"
                  objectFit="cover"
                  className="group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-xl font-bold mb-1">
                    {destination.name}
                  </h3>
                  <span className="text-white/90 text-sm">Explore Now</span>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* All Destinations Button */}
        <div className="text-center">
          <Link href="/locations">
            <button className="bg-primary-500 hover:bg-primary-600 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200 flex items-center space-x-2 mx-auto shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              <span>All Destinations</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PopularDestinations;