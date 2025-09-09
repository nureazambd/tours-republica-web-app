'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const PopularDestinations = () => {
  const destinations = [
    {
      id: 1,
      name: 'Santo Domingo',
      image: '/images/destinations/santo-domingo.png',
      featured: true
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
      <div className="container-custom">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* Featured Destination - Santo Domingo (larger) */}
          {/* <div className="md:col-span-2 lg:col-span-1 lg:row-span-2">
            <Link href={`/locations/${destinations[0].name.toLowerCase().replace(' ', '-')}`}>
              <div className="group relative h-80 lg:h-full rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div 
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                  style={{ backgroundImage: `url('${destinations[0].image}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                    {destinations[0].name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-white/90">Historic Capital</span>
                    <div className="bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Featured
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div> */}

          <div className="md:col-span-2 lg:col-span-1 lg:row-span-2">
  <Link href={`/locations/${destinations[0].name.toLowerCase().replace(' ', '-')}`}>
    <div className="group relative w-[578px] h-[277px] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
      <div 
        className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
        style={{ backgroundImage: `url('${destinations[0].image}')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      <div className="absolute bottom-6 left-6 right-6">
        <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2">
          {destinations[0].name}
        </h3>
        <div className="flex items-center justify-between">
          <span className="text-white/90">Historic Capital</span>
          <div className="bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            Featured
          </div>
        </div>
      </div>
    </div>
  </Link>
</div>

          {/* Other Destinations */}
          {destinations.slice(1).map((destination) => (
            <div key={destination.id}>
              <Link href={`/locations/${destination.name.toLowerCase().replace(' ', '-')}`}>
                <div className="group relative h-64 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  <div 
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                    style={{ backgroundImage: `url('${destination.image}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white mb-1">
                      {destination.name}
                    </h3>
                    <span className="text-white/90 text-sm">Explore Now</span>
                  </div>
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

