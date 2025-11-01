'use client';

import React, { useState } from 'react';
import { Search, MapPin, Calendar } from 'lucide-react';
import Image from 'next/image';

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Search:', searchQuery, selectedLocation);
  };

  return (
    <section className="relative h-[720px] bg-gradient-to-br from-blue-200 via-blue-200 to-blue-200 overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('/images/top-hero-image1.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Content */}
      <div className="relative z-10 container-custom px-4 py-20 lg:py-32">
        <div className="text-left text-white max-w-4xl">
          {/* Heading */}
           <h1 className="text-4xl lg:text-6xl xl:text-6xl font-medium mb-6 leading-tight">
      Explore the Heart of
      <br />
      <span className="text-accent-400">Santo Domingo</span>
    </h1>
          

          {/* Search Form */}
          <div className="bg-white rounded-2xl p-2 lg:p-2 lg:w-[756px]  shadow-2xl">
            <form
              onSubmit={handleSearch}
              className="flex flex-col gap-4 md:flex-row items-center"
            >
              {/* Location Input */}
              <div className="w-full relative">
                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Where to?"
                  className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl text-gray-800 text-lg focus:ring-2 focus:ring-primary-500 focus:outline-none"
                />
              </div>

              {/* Date Selector */}
              <div className="w-full  relative">
                <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl text-gray-800 text-lg focus:ring-2 focus:ring-primary-500 focus:outline-none bg-white"
                >
                  <option value="">Select Date</option>
                  <option value="today">Today</option>
                  <option value="tomorrow">Tomorrow</option>
                  <option value="this-week">This Week</option>
                </select>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full md:w-auto bg-primary-500 hover:bg-primary-600 text-white font-semibold px-8 py-4 rounded-xl transition duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
              >
                <Search className="w-5 h-5" />
                <span>Search</span>
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Feature Icons */}
      <div className="absolute bottom-0 left-0 w-full h-auto py-4 z-10 bg-white/10 backdrop-blur-md border-t border-white/20">
        <div className="container-custom px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-white">
            {/* Instant Confirmation */}
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0">
                <Image
                  src="/icons/Instant-Confirmation.svg"
                  alt="Instant Confirmation Icon"
                  width={32}
                  height={32}
                />
              </div>
              <div>
                <h3 className="font-[400] text-[18px]">Instant Confirmation</h3>
                {/* <p className="text-white/80 text-sm">Get confirmed bookings instantly</p> */}
              </div>
            </div>

            {/* No Hidden Fees */}
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0">
                <Image
                  src="/icons/No-Hidden-Fees.svg"
                  alt="No Hidden Fees Icon"
                  width={32}
                  height={32}
                />
              </div>
              <div>
                <h3 className="font-[400] text-[18px]">No Hidden Fees</h3>
                {/* <p className="text-white/80 text-sm">Transparent pricing always</p> */}
              </div>
            </div>

            {/* Free Cancellation */}
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0">
                <Image
                  src="/icons/Free-Cancellation.svg"
                  alt="Free Cancellation Icon"
                  width={32}
                  height={32}
                />
              </div>
              <div>
                <h3 className="font-[400] text-[18px]">Free Cancellation</h3>
                {/* <p className="text-white/80 text-sm">Cancel up to 24 hours before</p> */}
              </div>
            </div>

            {/* Secured Payment */}
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0">
                <Image
                  src="/icons/Secured-Payment.svg"
                  alt="Secured Payment Icon"
                  width={32}
                  height={32}
                />
              </div>
              <div>
                <h3 className="font-[400] text-[18px]">Secured Payment</h3>
                {/* <p className="text-white/80 text-sm">Your payments are safe with us</p> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
