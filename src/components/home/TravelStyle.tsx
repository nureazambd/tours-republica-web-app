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
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            Travel style
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Choose your perfect adventure style and create unforgettable memories
          </p>
        </div>

        {/* Travel Styles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {styles.map((style) => (
            <div key={style.id} className="group">
              <Link href={`/tours?category=${style.category}`}>
                <div className="relative h-80 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  {/* Background Image */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                    style={{ backgroundImage: `url('${style.image}')` }}
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {style.title}
                    </h3>
                    <p className="text-white/90 text-sm leading-relaxed">
                      {style.description}
                    </p>
                    
                    {/* Hover Arrow */}
                    <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="inline-flex items-center text-white font-medium">
                        <span className="mr-2">Explore</span>
                        <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  {/* Play Button for Adventures */}
                  {/* {style.category === 'adventure' && (
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 group-hover:bg-white/30 transition-colors duration-300">
                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                    </div>
                  )} */}
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

