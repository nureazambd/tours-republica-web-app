'use client';

import React, { useState, useEffect } from 'react';
import { Search, MapPin } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import CustomDropdown from './CustomDropdown';

const slides = [
  {
    image: '/images/top-hero-image1.png',
    title: 'Explore the Heart of',
    highlight: 'Santo Domingo',
  },
  {
    image: '/images/top-hero-image2.png',
    title: 'Uncover the Wonders',
    highlight: 'of Samaná With Us',
  },
  {
    image: '/images/top-hero-image3.png',
    title: 'Discover the Best',
    highlight: 'of Punta Cana With Us',
  },
];

const HeroSection = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);

  // ⏱️ Auto change every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    let query = '/tours?';
    if (selectedLocation) query += `location=${selectedLocation}`;
    if (searchQuery) {
      query += (selectedLocation ? '&' : '') + `keyword=${searchQuery}`;
    }

    router.push(query);
  };

  return (
    <section className="relative h-[720px] overflow-hidden bg-gray-100">
      {/* 🌄 Background Images with Crossfade */}
      <div className="absolute inset-0 z-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-[2000ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
          >
            <Image
              src={slide.image}
              alt={slide.highlight}
              fill
              priority={index === 0}
              className="object-cover object-center transition-transform duration-[3000ms] ease-in-out scale-105"
            />
            {/* Optional subtle overlay */}
            <div className="absolute inset-0 bg-black/20"></div>
          </div>
        ))}
      </div>

      {/* 🌟 Content */}
      <div className="relative z-10 container-custom lg:h-[720px] flex items-center px-4">
        <div className="text-left text-white max-w-4xl">
          {/* Animated Heading (syncs with image fade) */}
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute transition-all duration-[1500ms] ease-[cubic-bezier(0.4,0,0.2,1)] transform ${index === currentSlide
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-6'
                }`}
            >
              <h1
                className="
                  font-rubik
                  font-medium
                  text-[32px]
                  leading-[42px]
                  lg:text-[72px]
                  lg:leading-[78px]
                  mb-6
                  text-4xl lg:text-6xl xl:text-[72px]
                "
              >
                {slide.title}
                <br />
                <span className="text-accent-400">{slide.highlight}</span>
              </h1>
            </div>
          ))}

          {/* 🔍 Search Form */}
        <div 
  // Main Container: 
  // Mobile (Default): mt-[60px], flex-col, w-full, h-auto, p-4, gap-4, bg-white (explicitly solid)
  // Desktop (lg:): mt-[180px], flex-row, w-[756px], h-[80px], p-[12_12_12_32], gap-[88px]
  className="mt-[120px] lg:mt-[180px] z-20 flex lg:flex-col lg:flex-row items-center bg-white rounded-[16px] w-full lg:w-[756px] h-auto lg:h-[80px] p-4 lg:p-[12px_12px_12px_32px] gap-4 lg:gap-[88px] shadow-xl lg:mx-auto"
>
  <form
    onSubmit={handleSearch}
    // Form Row: flex-col on mobile, flex-row on desktop
    className="flex flex-col lg:flex-row items-center gap-4 lg:gap-6 w-full font-rubik"
  >
    {/* Keyword Input */}
    <div 
      // Input Block: w-full on mobile, added bottom separation
      className="flex flex-row items-center gap-4 w-full lg:w-[188px] h-[38px] border-b border-gray-100 lg:border-b-0 pb-3 lg:pb-0"
    >
      <Search className="w-[28px] h-[28px] text-gray-600 shrink-0" />
      <div className="flex flex-col justify-center w-full">
        <span className="text-[#191919] text-[16px] font-medium leading-[20px]">
          Search
        </span>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Enter your keyword"
          className="text-[12px] leading-[18px] font-normal text-gray-400 bg-transparent focus:outline-none w-full"
        />
      </div>
    </div>

    {/* Divider Line: Hidden on mobile, visible on desktop */}
    <div className="hidden lg:block w-[40px] border-[2px] border-[#F4F7F9] rotate-90 shrink-0"></div>

    {/* Location Selector */}
    <div 
      // Location Block: w-full on mobile, added bottom separation
      className="flex flex-row items-center gap-4 w-full lg:w-[204px] h-[38px] border-b border-gray-100 lg:border-b-0 pb-3 lg:pb-0"
    >
      <MapPin className="w-[28px] h-[28px] text-gray-600 shrink-0" />
      <div className="flex flex-col items-start w-full">
        <div className="flex flex-row items-center gap-6">
          <span className="text-[#191919] text-[16px] font-medium leading-[20px]">
            Destination
          </span>
          <svg
            className="w-4 h-4 text-gray-400 shrink-0"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M6 9l6 6 6-6" />
          </svg>
        </div>
        <CustomDropdown/>
      </div>
    </div>

    {/* Submit Button: Full-width on mobile, fixed width on desktop */}
    <button
      type="submit"
      className="flex flex-row items-center justify-center gap-2 px-6 py-4 w-full lg:w-[184px] h-[56px] bg-[#EE2552] text-white rounded-[12px] font-medium text-[16px] leading-[24px] hover:bg-[#d82047] transition mt-2 lg:mt-0 shrink-0"
    >
      <Search className="w-5 h-5" />
      <span>Search</span>
    </button>
  </form>
</div>
        </div>
      </div>

      {/* Bottom Icons (your original section preserved) */}
      <div className="absolute bottom-0 left-0 w-full h-auto py-4 z-10 bg-white/10 backdrop-blur-md border-t border-white/20">
        <div className="container-custom px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-white">
            <div className="flex items-center gap-4">
              <Image src="/icons/Instant-Confirmation.svg" alt="" width={32} height={32} />
              <h3 className="font-[400] text-[18px]">Instant Confirmation</h3>
            </div>
            <div className="flex items-center gap-4">
              <Image src="/icons/No-Hidden-Fees.svg" alt="" width={32} height={32} />
              <h3 className="font-[400] text-[18px]">No Hidden Fees</h3>
            </div>
            <div className="flex items-center gap-4">
              <Image src="/icons/Free-Cancellation.svg" alt="" width={32} height={32} />
              <h3 className="font-[400] text-[18px]">Free Cancellation</h3>
            </div>
            <div className="flex items-center gap-4">
              <Image src="/icons/Secured-Payment.svg" alt="" width={32} height={32} />
              <h3 className="font-[400] text-[18px]">Secured Payment</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
