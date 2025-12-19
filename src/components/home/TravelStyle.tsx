'use client';

import React from 'react';
import Link from 'next/link';

const TravelStyle = () => {
  const styles = [
    {
      id: 1,
      title: 'Nature and boat trip',
      description: 'Explore pristine waters and untouched natural beauty',
      image: '/images/destinations/Nature-and-boat-trip.png',
      category: 'nature'
    },
    {
      id: 2,
      title: 'Adventures',
      description: 'Thrilling experiences for adrenaline seekers',
      image: '/images/destinations/Adventures.png',
      category: 'adventure'
    },
    {
      id: 3,
      title: 'Culture',
      description: 'Immerse yourself in rich Dominican heritage',
      image: '/images/destinations/culture.png',
      category: 'culture'
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-[1180px] mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            Travel style
          </h2>
          
        </div>

        {/* Travel Styles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
  {styles.map((style) => (
    <div key={style.id} className="group">
      <Link href={`/tours?category=${style.category}`}>
        <div
          className="relative h-[277px] w-full rounded-[16px] overflow-hidden 
                     shadow-lg hover:shadow-xl transition-all duration-500 
                     transform hover:-translate-y-2 flex items-center justify-center"
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
            style={{ backgroundImage: `url('${style.image}')` }}
          />

          {/* Blue Gradient Overlay (on hover visible stronger) */}
          <div
            className="absolute inset-0 bg-gradient-to-b from-[rgba(0,52,89,0.8)] 
                       to-[rgba(0,52,89,0.8)] opacity-0 group-hover:opacity-100 
                       transition-opacity duration-500"
          />

          {/* Title (Center) */}
          <h3
            className="relative z-10 text-white font-rubik text-[28px] font-medium leading-[32px] 
                       text-center opacity-0 group-hover:opacity-100 transition-all duration-500"
          >
            {style.title}
          </h3>
          <div className="absolute bottom-0 left-0 right-0 p-6 group-hover:hidden transition-all duration-300">
    <h3 className="text-2xl font-bold text-center text-white mb-2">
      {style.title}
    </h3>
  </div>
        </div>
        
      </Link>
    </div>
  ))}
</div>

      </div>
    </section>
  );
};

export default TravelStyle;

