'use client';

import { useState } from 'react';
import { Star } from 'lucide-react';
import Link from 'next/link';

export default function PopularDestinations() {
  const destinations = [
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
    {
      id: 6,
      name: '',
      image: '/images/locations/All-Destinations.png',
      tourCount: 0,
    },
  ];

  // default active hover on first card
  const [activeCard, setActiveCard] = useState(destinations[0].id);

  return (
    <div className="bg-gray-50">
      <div className="container-custom mx-auto px-4">
        {/* Section Title */}
        <div className="text-left pt-20 pl-4 mb-12">
          <h2 className="text-[32px] lg:text-[40px] font-[500] text-[#191919]">
            Popular Destinations
          </h2>
        </div>

        {/* Destinations Flex Grid */}
        <section className="pb-16">
          <div className="flex flex-wrap gap-8 justify-start">
            {destinations.map((destination) => {
              const isAlwaysActive = destination.id === 6;
              const isHovered = activeCard === destination.id;

              const destinationLink = isAlwaysActive
                ? '/locations'
                : {
                  pathname: '/tours',
                  query: { location: destination.name },
                };

              return (
                <Link
                  key={destination.id}
                  href={destinationLink}
                  onMouseEnter={() =>
                    !isAlwaysActive && setActiveCard(destination.id)
                  }
                  onMouseLeave={() =>
                    !isAlwaysActive && setActiveCard(destinations[0].id)
                  }
                  className={`
                    group relative rounded-2xl overflow-hidden shadow-lg
                    transform transition-all duration-[4000ms] ease-[cubic-bezier(0.25,1,0.3,1)]
                    will-change-transform
                    ${isHovered || isAlwaysActive
                      ? 'w-[48%] scale-[0.97] shadow-2xl z-10'
                      : 'w-[23%] scale-[0.97] opacity-90'
                    }
                  `}
                >
                  {/* Image Section */}
                  <div className="relative h-[277px] overflow-hidden rounded-[16px] isolate">
                    <img
                      src={destination.image}
                      alt={destination.name}
                      className={`w-full h-full object-cover transition-transform duration-[2] ease-[cubic-bezier(0.25,1,0.3,1)]
                        ${isHovered ? 'scale-100' : 'scale-100'}
                      `}
                    />


                    {/* Gradient Overlay */}
                    <div
                      className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${isHovered
                        ? 'opacity-100 bg-gradient-to-b from-[rgba(0,52,89,0)] to-[rgba(0,52,89,0.5)]'
                        : 'opacity-0'
                        }`}
                    ></div>

                    {/* Info Card */}
                    {isHovered ? (<div
                      className={`absolute left-[24px] top-[177px] w-[530px] h-[76px] bg-white/75 backdrop-blur-sm rounded-[12px] 
                        flex items-center justify-between px-[20px] py-[14px]
                        shadow-[0px_136px_54px_rgba(103,70,77,0.01),0px_77px_46px_rgba(103,70,77,0.05),0px_34px_34px_rgba(103,70,77,0.09),0px_9px_19px_rgba(103,70,77,0.1)]
                        transition-all duration-700 ease-[cubic-bezier(0.25,1,0.3,1)]
                        ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}
                      `}
                    >
                      <div className="flex flex-col text-[#191919]">
                        <span className="font-rubik font-medium text-[20px] leading-[28px] tracking-[-0.48px]">
                          {destination.name}
                        </span>
                        {destination.tourCount > 0 && (
                          <span className="font-rubik font-normal text-[16px] leading-[20px]">
                            {destination.tourCount} tours
                          </span>
                        )}
                      </div>

                      <button className="flex items-center justify-center bg-[#EE2552] text-white rounded-[8px] px-[24px] py-[10px] hover:bg-[#d82047] transition-all duration-300">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5 12H19"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M12 5L19 12L12 19"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </div>) : (<div className='text-white'>{destination.name}</div>)}


                    <div
                      className={`
    absolute left-[24px] bottom-[28px]
    font-rubik font-medium text-[22px] leading-[32px]
    text-white z-10
    transition-opacity duration-300
    ${isHovered ? 'opacity-0' : 'opacity-100'}
  `}
                    >
                      {destination.name}
                    </div>

                    {/* Rating */}
                    {/* {!isAlwaysActive && (
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg flex items-center space-x-1 shadow-md">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium text-gray-700">
                          {destination.rating}
                        </span>
                      </div>
                    )} */}

                    {/* Featured Badge */}
                    {/* {destination.featured && (
                      <div className="absolute top-4 left-4 bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-md">
                        Featured
                      </div>
                    )} */}
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
