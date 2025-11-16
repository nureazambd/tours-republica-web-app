'use client';

import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function PopularDestinations() {
  const destinations = [
    { id: 1, name: 'Santo Domingo', image: '/images/locations/Santo-Domingo.png', tourCount: 10 },
    { id: 2, name: 'Samaná', image: '/images/locations/Samana.png', tourCount: 8 },
    { id: 3, name: 'Puerto Plata', image: '/images/locations/Puerto-Plata.png', tourCount: 9 },
    { id: 4, name: 'Punta Cana', image: '/images/locations/Punta-Cana.png', tourCount: 15 },
    { id: 5, name: 'Bayahibe', image: '/images/locations/Bayahibe.png', tourCount: 7 },
    { id: 6, name: 'All Destinations', all: true },
  ];

  // Default active cards
  const [activeCardRow1, setActiveCardRow1] = useState<number>(1);
  const [activeCardRow2, setActiveCardRow2] = useState<number>(6);

  // Hover states
  const [hoveredCardRow1, setHoveredCardRow1] = useState<number | null>(null);
  const [hoveredCardRow2, setHoveredCardRow2] = useState<number | null>(null);

  return (
    <section className="bg-[#EFF2F8] flex flex-col items-center px-6 lg:px-[130px] py-[96px] lg:py-[112px]">
      <div className="w-full max-w-[1180px] flex flex-col gap-[56px]">

        <h2 className="font-rubik text-[32px] md:text-[40px] font-medium text-[#111318] tracking-[-1.44px]">
          Popular Destinations
        </h2>

        {/* DESKTOP */}
        <div className="hidden md:flex flex-col gap-6">

          {/* -------- ROW 1 -------- */}
          <div className="flex gap-6">
            {destinations.slice(0, 3).map((destination) => {
              const isActive = activeCardRow1 === destination.id;

              return (
                <Link
                  key={destination.id}
                  href={destination.all ? '/locations' : `/tours?location=${destination.name}`}
                  onMouseEnter={() => {
                    !destination.all && setActiveCardRow1(destination.id);
                    !destination.all && setHoveredCardRow1(destination.id);
                  }}
                  onMouseLeave={() => {
                    setActiveCardRow1(1); // default
                    setHoveredCardRow1(null);
                  }}
                  className={`relative rounded-[16px] overflow-hidden transition-all duration-700 isolate 
                    ${isActive ? 'flex-[2]' : 'flex-[1]'}
                    h-[277px]`}
                >
                  {/* ALL DESTINATIONS */}
                  {destination.all ? (
                    <div className="flex flex-col justify-center items-center text-center bg-[rgba(233,48,91,0.08)] border border-[#E9305B14] rounded-[16px] py-[113px] gap-6">
                      <span className="text-[#191919] text-[24px] font-rubik">All Destinations</span>
                      <div className="flex items-center justify-center bg-[#EE2552] rounded-full px-[20px] py-[8px]">
                        <ChevronRight className="text-white w-6 h-6" />
                      </div>
                    </div>
                  ) : (
                    <>
                      <Image
                        src={destination.image!}
                        alt={destination.name}
                        width={600}
                        height={277}
                        className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 
                          ${isActive ? 'scale-105' : 'scale-100'}`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[rgba(0,52,89,0.5)]" />

                      {/* Expanded Box: show only if active + hovered */}
                      {isActive && hoveredCardRow1 === destination.id && (
                        <div className="absolute left-[24px] top-[177px]
                          w-[90%] max-w-[530px] min-h-[76px]
                          bg-white/75 backdrop-blur-sm rounded-[12px]
                          flex flex-row items-center justify-between
                          px-[20px] py-[14px]
                          shadow-[0_9px_19px_rgba(103,70,77,0.1)]"
                        >
                          <div className="flex flex-col text-[#191919]">
                            <span className="font-rubik font-medium text-[18px]">{destination.name}</span>
                            <span className="font-rubik text-[14px]">{destination.tourCount} tours</span>
                          </div>
                          <button className="flex items-center justify-center bg-[#EE2552] text-white rounded-[8px] px-[24px] py-[10px]">
                            <ChevronRight className="w-5 h-5" />
                          </button>
                        </div>
                      )}

                      {/* Title when inactive */}
                      {!isActive && (
                        <div className="absolute left-[24px] bottom-[28px] text-white font-rubik font-medium text-[22px]">
                          {destination.name}
                        </div>
                      )}
                    </>
                  )}
                </Link>
              );
            })}
          </div>

          {/* -------- ROW 2 -------- */}
          <div className="flex gap-6">
            {destinations.slice(3).map((destination) => {
              const isActive = activeCardRow2 === destination.id;

              return (
                <Link
                  key={destination.id}
                  href={destination.all ? '/locations' : `/tours?location=${destination.name}`}
                  onMouseEnter={() => {
                    !destination.all && setActiveCardRow2(destination.id);
                    !destination.all && setHoveredCardRow2(destination.id);
                  }}
                  onMouseLeave={() => {
                    setActiveCardRow2(6); // default row 2
                    setHoveredCardRow2(null);
                  }}
                  className={`relative rounded-[16px] overflow-hidden transition-all duration-700 isolate
                    ${isActive ? 'flex-[2]' : 'flex-[1]'}
                    h-[277px]`}
                >
                  {destination.all ? (
                    <div className="flex flex-col justify-center items-center text-center bg-[rgba(233,48,91,0.08)] border border-[#E9305B14] rounded-[16px] py-[113px] gap-6">
                      <span className="text-[#191919] text-[24px] font-rubik">All Destinations</span>
                      <div className="flex items-center justify-center bg-[#EE2552] rounded-full px-[20px] py-[8px]">
                        <ChevronRight className="text-white w-6 h-6" />
                      </div>
                    </div>
                  ) : (
                    <>
                      <Image
                        src={destination.image!}
                        alt={destination.name}
                        width={600}
                        height={277}
                        className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700
                          ${isActive ? 'scale-105' : 'scale-100'}`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[rgba(0,52,89,0.5)]" />

                      {isActive && hoveredCardRow2 === destination.id && (
                        <div className="absolute left-[24px] top-[177px]
                          w-[90%] max-w-[530px] min-h-[76px]
                          bg-white/75 backdrop-blur-sm rounded-[12px]
                          flex flex-row items-center justify-between
                          px-[20px] py-[14px]
                          shadow-[0_9px_19px_rgba(103,70,77,0.1)]"
                        >
                          <div className="flex flex-col text-[#191919]">
                            <span className="font-rubik font-medium text-[18px]">{destination.name}</span>
                            <span className="font-rubik text-[14px]">{destination.tourCount} tours</span>
                          </div>
                          <button className="flex items-center justify-center bg-[#EE2552] text-white rounded-[8px] px-[24px] py-[10px]">
                            <ChevronRight className="w-5 h-5" />
                          </button>
                        </div>
                      )}

                      {!isActive && (
                        <div className="absolute left-[24px] bottom-[28px] text-white font-rubik font-medium text-[22px]">
                          {destination.name}
                        </div>
                      )}
                    </>
                  )}
                </Link>
              );
            })}
          </div>

        </div>

        {/* MOBILE */}
        <div className="flex flex-col gap-6 md:hidden">
          {destinations.map((destination) => (
            <Link
              key={destination.id}
              href={destination.all ? '/locations' : `/tours?location=${destination.name}`}
              className="relative w-full h-[240px] rounded-[16px] overflow-hidden"
            >
              {!destination.all ? (
                <>
                  <Image
                    src={destination.image!}
                    alt={destination.name}
                    width={400}
                    height={240}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[rgba(0,52,89,0.5)]" />
                  <div className="absolute left-[24px] bottom-[28px] text-white">
                    <div className="font-rubik text-[20px] font-medium">{destination.name}</div>
                    <div className="font-rubik text-[14px]">{destination.tourCount} tours</div>
                  </div>
                </>
              ) : (
                <div className="flex flex-col justify-center items-center gap-4 bg-[rgba(233,48,91,0.08)] border border-[#E9305B14] h-full rounded-[16px]">
                  <span className="text-[#191919] text-[18px] font-rubik">All Destinations</span>
                  <div className="flex items-center justify-center bg-[#EE2552] rounded-full px-[12px] py-[6px]">
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
