'use client';

import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
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

  const [activeCard, setActiveCard] = useState(destinations[0].id);

  return (
    <div className="bg-[#EFF2F8]">
      <div className="max-w-[1180px] mx-auto px-4 lg:px-0 py-14 md:py-20">
        {/* Title */}
        <div className="text-left mb-8 md:mb-12">
          <h2 className="text-[28px] md:text-[40px] font-medium text-[#111318]">
            Popular Destinations
          </h2>
        </div>

        {/* Mobile Layout */}
        <div className="flex flex-col gap-6 md:hidden">
          {destinations.map((destination) =>
            destination.id !== 6 ? (
              <Link
                key={destination.id}
                href={{
                  pathname: '/tours',
                  query: { location: destination.name },
                }}
                className="relative w-full h-[240px] rounded-[16px] overflow-hidden"
              >
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[rgba(0,52,89,0.5)] rounded-[16px]" />
                <div className="absolute left-[24px] bottom-[28px] text-white">
                  <div className="font-rubik font-medium text-[20px] leading-[24px]">
                    {destination.name}
                  </div>
                  <div className="font-rubik text-[14px] leading-[24px]">
                    {destination.tourCount} tours
                  </div>
                </div>
              </Link>
            ) : (
              <Link
                key={destination.id}
                href="/locations"
                className="flex flex-col justify-center items-center gap-2 bg-white border border-[#E9305B14] bg-[rgba(233,48,91,0.08)] py-6 rounded-[16px]"
              >
                <div className="flex items-center gap-4">
                  <span className="text-[#191919] text-[18px]">
                    All Destinations
                  </span>
                  <div className="flex items-center justify-center bg-[#EE2552] rounded-full px-[12px] py-[4px]">
                    <ChevronRight className="text-white w-4 h-4" />
                  </div>
                </div>
              </Link>
            )
          )}
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:flex flex-wrap gap-8 justify-start pb-8">
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
                  transition-all duration-[3000ms] ease-out
                  ${
                    isHovered || isAlwaysActive
                      ? 'w-[48%] shadow-2xl z-10'
                      : 'w-[23%] opacity-90'
                  }
                `}
              >
                <div className="relative h-[277px] overflow-hidden rounded-[16px] isolate">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-full object-cover"
                  />
                  <div
                    className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                      isHovered
                        ? 'opacity-100 bg-gradient-to-b from-transparent to-[rgba(0,52,89,0.5)]'
                        : 'opacity-0'
                    }`}
                  ></div>

                  {/* Info on Hover */}
                  {isHovered ? (
                    <div
                      className="absolute left-[24px] top-[177px] w-[530px] h-[76px] bg-white/75 backdrop-blur-sm 
                        rounded-[12px] flex items-center justify-between px-[20px] py-[14px]
                        shadow-[0_9px_19px_rgba(103,70,77,0.1)] transition-all duration-700"
                    >
                      <div className="flex flex-col text-[#191919]">
                        <span className="font-rubik font-medium text-[20px] leading-[28px] tracking-[-0.48px]">
                          {destination.name}
                        </span>
                        {destination.tourCount > 0 && (
                          <span className="font-rubik text-[16px] leading-[20px]">
                            {destination.tourCount} tours
                          </span>
                        )}
                      </div>

                      <button className="flex items-center justify-center bg-[#EE2552] text-white rounded-[8px] px-[24px] py-[10px] hover:bg-[#d82047] transition-all duration-300">
                        <ChevronRight className="w-5 h-5 text-white" />
                      </button>
                    </div>
                  ) : (
                    <div className="absolute left-[24px] bottom-[28px] text-white font-medium text-[22px] leading-[32px]">
                      {destination.name}
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
