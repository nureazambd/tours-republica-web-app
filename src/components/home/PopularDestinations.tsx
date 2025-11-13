'use client';

import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function PopularDestinations() {
  const destinations = [
    {
      id: 1,
      name: 'Santo Domingo',
      image: '/images/locations/Santo-Domingo.png',
      tourCount: 10,
    },
    {
      id: 2,
      name: 'Samaná',
      image: '/images/locations/Samana.png',
      tourCount: 8,
    },
    {
      id: 3,
      name: 'Puerto Plata',
      image: '/images/locations/Puerto-Plata.png',
      tourCount: 9,
    },
    {
      id: 4,
      name: 'Punta Cana',
      image: '/images/locations/Punta-Cana.png',
      tourCount: 15,
    },
    {
      id: 5,
      name: 'Bayahibe',
      image: '/images/locations/Bayahibe.png',
      tourCount: 7,
    },
    {
      id: 6,
      name: 'All Destinations',
      image: '/images/locations/All-Destinations.png',
      tourCount: 0,
      all: true,
    },
  ];

  const [activeCard, setActiveCard] = useState<number | null>(1);

  return (
    <section className="bg-[#EFF2F8] flex flex-col items-center px-6 lg:px-[130px] py-[96px] lg:py-[112px] gap-8 md:gap-[56px]">
      <div className="w-full max-w-[1180px] flex flex-col gap-[56px]">
        {/* Heading */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="flex flex-col gap-3 max-w-[608px]">
            <h2 className="font-rubik text-[32px] md:text-[40px] leading-[48px] tracking-[-1.44px] text-[#111318] font-medium">
              Popular Destinations
            </h2>
            {/* <p className="text-[#8C8C8C] text-[16px] leading-[26px] tracking-[-0.48px] hidden md:block">
              Find your next adventure with ToursRepublica. From relaxing retreats to exciting explorations, we’ve got the perfect destination for you!
            </p> */}
          </div>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:flex flex-col gap-6">
          {/* Row 1 */}
          <div className="flex gap-6">
            {destinations.slice(0, 3).map((destination, index) => {
              const isActive = activeCard === destination.id || (index === 0 && activeCard === null);
              const expanded = index === 0; // First card expanded by default

              return (
                <Link
                  key={destination.id}
                  href={destination.all ? '/locations' : `/tours?location=${destination.name}`}
                  onMouseEnter={() => !destination.all && setActiveCard(destination.id)}
                  onMouseLeave={() => setActiveCard(null)}
                  className={`relative rounded-[16px] overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] isolate 
                    ${expanded || isActive ? 'flex-[2]' : 'flex-[1]'} h-[277px]`}
                >
                  <Image
                    src={destination.image}
                    alt={destination.name}
                    width={600}
                    height={277}
                    className={`absolute  inset-0 w-full h-full object-cover transition-transform duration-700 ${expanded || isActive ? 'scale-105' : 'scale-100'
                      }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[rgba(0,52,89,0.5)] rounded-[16px]" />

                  {/* Info Card */}
                  {(expanded || isActive) && !destination.all ? (
                    <div
                      className={`absolute left-[24px] top-[177px] 
    w-[90%] max-w-[530px] h-auto min-h-[76px]
    bg-white/75 backdrop-blur-sm 
    rounded-[12px] flex flex-col sm:flex-row items-center justify-between 
    gap-4 sm:gap-0 px-[20px] py-[14px]
    shadow-[0_9px_19px_rgba(103,70,77,0.1)] 
    transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:w-[95%]`}
                    >
                      <div className="flex flex-col text-[#191919]">
                        <span className="font-rubik font-medium text-[18px] sm:text-[20px] leading-[28px] tracking-[-0.48px]">
                          {destination.name}
                        </span>
                        <span className="font-rubik text-[14px] sm:text-[16px] leading-[20px]">
                          {destination.tourCount} tours
                        </span>
                      </div>

                      <button
                        className="flex items-center justify-center bg-[#EE2552] text-white 
      rounded-[8px] px-[18px] sm:px-[24px] py-[8px] sm:py-[10px] 
      hover:bg-[#d82047] transition-all duration-300"
                      >
                        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                      </button>
                    </div>

                  ) : (
                    !destination.all && (
                      <div className="absolute left-[24px] bottom-[28px] text-white font-rubik font-medium text-[22px] leading-[32px] transition-all duration-500">
                        {destination.name}
                      </div>
                    )
                  )}
                </Link>
              );
            })}
          </div>

          {/* Row 2 */}
          <div className="flex gap-6">
            {destinations.slice(3).map((destination, index) => {
              const isActive = activeCard === destination.id;
              const expanded = destination.all || (index === 2 && activeCard === null);

              return (
                <Link
                  key={destination.id}
                  href={destination.all ? '/locations' : `/tours?location=${destination.name}`}
                  onMouseEnter={() => !destination.all && setActiveCard(destination.id)}
                  onMouseLeave={() => setActiveCard(null)}
                  className={`relative rounded-[16px] overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] isolate 
                    ${expanded || isActive ? 'flex-[2]' : 'flex-[1]'} h-[277px]`}
                >
                  {/* Normal destination */}
                  {!destination.all ? (
                    <>
                      <Image
                        src={destination.image}
                        alt={destination.name}
                        width={600}
                        height={277}
                        className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ${expanded || isActive ? 'scale-105' : 'scale-100'
                          }`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[rgba(0,52,89,0.5)] rounded-[16px]" />
                      {(expanded || isActive) ? (
                        <div
                          className={`absolute left-[24px] top-[177px] 
    w-[90%] max-w-[530px] h-auto min-h-[76px]
    bg-white/75 backdrop-blur-sm 
    rounded-[12px] flex flex-col sm:flex-row items-center justify-between 
    gap-4 sm:gap-0 px-[20px] py-[14px]
    shadow-[0_9px_19px_rgba(103,70,77,0.1)] 
    transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:w-[95%]`}
                        >
                          <div className="flex flex-col text-[#191919]">
                            <span className="font-rubik font-medium text-[18px] sm:text-[20px] leading-[28px] tracking-[-0.48px]">
                              {destination.name}
                            </span>
                            <span className="font-rubik text-[14px] sm:text-[16px] leading-[20px]">
                              {destination.tourCount} tours
                            </span>
                          </div>

                          <button
                            className="flex items-center justify-center bg-[#EE2552] text-white 
      rounded-[8px] px-[18px] sm:px-[24px] py-[8px] sm:py-[10px] 
      hover:bg-[#d82047] transition-all duration-300"
                          >
                            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                          </button>
                        </div>

                      ) : (
                        <div className="absolute left-[24px] bottom-[28px] text-white font-rubik font-medium text-[22px] leading-[32px] transition-all duration-500">
                          {destination.name}
                        </div>
                      )}
                    </>
                  ) : (
                    /* All Destinations Card */
                    <div className="flex flex-col justify-center items-center text-center bg-[rgba(233,48,91,0.08)] border border-[#E9305B14] rounded-[16px] py-[113px] gap-6">
                      <span className="text-[#191919] text-[24px] leading-[32px] font-rubik">
                        All Destinations
                      </span>
                      <div className="flex items-center justify-center bg-[#EE2552] rounded-full px-[20px] py-[8px] hover:bg-[#d82047] transition-all duration-300">
                        <ChevronRight className="text-white w-6 h-6" />
                      </div>
                    </div>
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="flex flex-col gap-6 md:hidden">
          {destinations.map((destination) => (
            <Link
              key={destination.id}
              href={destination.all ? '/locations' : `/tours?location=${destination.name}`}
              className={`relative w-full h-[240px] rounded-[16px] overflow-hidden ${destination.all ? 'bg-[rgba(233,48,91,0.08)] flex items-center justify-center' : ''
                }`}
            >
              {!destination.all ? (
                <>
                  <Image
                    src={destination.image}
                    alt={destination.name}
                    width={400}
                    height={240}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[rgba(0,52,89,0.5)]" />
                  <div className="absolute left-[24px] bottom-[28px] text-white">
                    <div className="font-rubik font-medium text-[20px] leading-[24px]">
                      {destination.name}
                    </div>
                    <div className="font-rubik text-[14px] leading-[24px]">
                      {destination.tourCount} tours
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center gap-4">
                  <span className="text-[#191919] text-[18px] font-rubik">
                    All Destinations
                  </span>
                  <div className="flex items-center justify-center bg-[#EE2552] rounded-full px-[12px] py-[6px] hover:bg-[#d82047] transition-all duration-300">
                    <ChevronRight className="text-white w-4 h-4" />
                  </div>
                </div>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
