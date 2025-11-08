'use client';

import React, { useState, useEffect } from 'react';
import { Search, MapPin } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const slides = [
  {
    image: '/images/top-hero-image1.png',
    title: 'Explore the Heart of',
    highlight: 'Santo Domingo',
  },
  {
    image: '/images/top-hero-image2.png',
    title: 'Discover the Beauty of',
    highlight: 'Punta Cana',
  },
  {
    image: '/images/top-hero-image3.png',
    title: 'Experience the Charm of',
    highlight: 'Samaná',
  },
];

const HeroSection = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);

  // 🔁 Auto change slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
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

  const { image, title, highlight } = slides[currentSlide];

  return (
    <section className="relative h-[720px] bg-gradient-to-br from-blue-200 via-blue-200 to-blue-200 overflow-hidden">
      {/* 🔁 Background Image with Fade Transition */}
      <div className="absolute inset-0 z-0 transition-all duration-1000 ease-in-out">
        <div
          key={image}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        ></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container-custom lg:h-[720px] flex items-center px-4">
        <div className="text-left text-white max-w-4xl transition-all duration-1000 ease-in-out">
          {/* Animated Heading */}
          <h1
            key={currentSlide}
            className="
              font-rubik
              font-medium
              text-[72px]
              leading-[78px]
              mb-6
              transition-all
              duration-700
              ease-in-out
              text-4xl lg:text-6xl xl:text-[72px]
            "
          >
            {title}
            <br />
            <span className="text-accent-400">{highlight}</span>
          </h1>

          {/* Search Form */}
          <div className="flex flex-row items-center bg-white rounded-[16px] w-[756px] h-[80px] p-[12px_12px_12px_32px] gap-[88px] shadow-xl">
            <form
              onSubmit={handleSearch}
              className="flex flex-row items-center gap-[24px] w-full font-rubik"
            >
              {/* Keyword Input */}
              <div className="flex flex-row items-center gap-4 w-[188px] h-[38px]">
                <Search className="w-[28px] h-[28px] text-gray-600" />
                <div className="flex flex-col justify-center">
                  <span className="text-[#191919] text-[16px] font-medium leading-[20px]">
                    Search
                  </span>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Enter your keyword"
                    className="text-[12px] leading-[18px] font-normal text-gray-400 bg-transparent focus:outline-none"
                  />
                </div>
              </div>

              {/* Divider Line */}
              <div className="w-[40px] border-[2px] border-[#F4F7F9] rotate-90"></div>

              {/* Location Selector */}
              <div className="flex flex-row items-center gap-4 w-[204px] h-[38px]">
                <MapPin className="w-[28px] h-[28px] text-gray-600" />
                <div className="flex flex-col items-start">
                  <div className="flex flex-row items-center gap-6">
                    <span className="text-[#191919] text-[16px] font-medium leading-[20px]">
                      Destination
                    </span>
                  </div>
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="text-[12px] leading-[18px] font-normal text-gray-400 bg-transparent focus:outline-none appearance-none"
                  >
                    <option value="">Select destinations</option>
                    <option value="Santo+Domingo">Santo Domingo</option>
                    <option value="Punta+Cana">Punta Cana</option>
                    <option value="Samaná">Samaná</option>
                    <option value="Puerto+Plata">Puerto Plata</option>
                    <option value="Bayahibe">Bayahibe</option>
                  </select>
                </div>
              </div>

              {/* Search Button */}
              <button
                type="submit"
                className="flex flex-row items-center justify-center gap-2 px-6 py-4 w-[184px] h-[56px] bg-[#EE2552] text-white rounded-[12px] font-medium text-[16px] leading-[24px] hover:bg-[#d82047] transition"
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
