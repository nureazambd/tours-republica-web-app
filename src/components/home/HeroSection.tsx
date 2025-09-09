'use client';

import React, { useState } from 'react';
import { Search, MapPin, Calendar, Users, CheckCircle, DollarSign, X, Shield } from 'lucide-react';
// Make sure you have an SVG file named 'instant-confirmation.svg' in the public/icons folder or update the path accordingly
import Image from 'next/image';
import InstantConfirmation from '../../../public/icons/instant-confirmation.svg';
const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search functionality
    console.log('Search:', searchQuery, selectedLocation);
  };

  return (
    <section className="relative h-[720px] bg-gradient-to-br from-blue-200 via-blue-200 to-blue-200">
      {/* Background Image Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-100"
        style={{
          backgroundImage: `url('/images/top-hero-image1.png')`
        }}
      />
      
      <div className="relative z-10 container-custom py-20 lg:py-32 ">
  <div className="text-left text-white">
    {/* Main Heading */}
    <h1 className="text-4xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight">
      Explore the Heart of
      <br />
      <span className="text-accent-400">Santo Domingo</span>
    </h1>
    
    {/* <p className="text-xl lg:text-2xl mb-12 max-w-3xl opacity-90 leading-relaxed">
      Discover unforgettable experiences in the Dominican Republic with handpicked tours and personalized adventures that turn your journey into a story worth telling.
    </p> */}

    {/* Search Form */}
    <div className="bg-white rounded-2xl p-6 lg:p-8 max-w-4xl shadow-2xl">
      <form onSubmit={handleSearch} className="flex flex-col lg:flex-row gap-4 items-center">
        <div className="flex-1 relative">
          <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Where to?"
            className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none text-gray-800 text-lg"
          />
        </div>
        
        <div className="relative lg:w-48">
          <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <select 
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none text-gray-800 text-lg appearance-none bg-white"
          >
            <option value="">Select Date</option>
            <option value="today">Today</option>
            <option value="tomorrow">Tomorrow</option>
            <option value="this-week">This Week</option>
          </select>
        </div>
        
        <button 
          type="submit"
          className="bg-primary-500 hover:bg-primary-600 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          <Search className="w-5 h-5" />
          <span>Search</span>
        </button>
      </form>
    </div>
  </div>
</div>



      {/* Feature Icons Section */}
      <div className="absolute bottom-0 left-0 w-full z-10 bg-white/10 backdrop-blur-sm border-t border-white/20">
        <div className="container-custom py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Instant Confirmation */}
            {/* <div className="flex items-center space-x-4 text-white">
              <div className="bg-accent-500 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Instant Confirmation</h3>
                <p className="text-white/80 text-sm">Get confirmed bookings instantly</p>
              </div>
            </div> */}

            <div className="flex items-center space-x-4 text-white">
  <div className=" rounded-full flex items-center justify-center flex-shrink-0">
    <Image src="/icons/Instant-Confirmation.svg" alt="Instant Confirmation Icon" width={32} height={32} />
  </div>
  <div>
    <h3 className="font-semibold text-lg">Instant Confirmation</h3>
    <p className="text-white/80 text-sm">Get confirmed bookings instantly</p>
  </div>
</div>

            {/* No Hidden Fees */}
            <div className="flex items-center space-x-4 text-white">
              <div className=" rounded-full flex items-center justify-center flex-shrink-0">
                <Image src="/icons/No-Hidden-Fees.svg" alt="Instant Confirmation Icon" width={32} height={32} />
              </div>
              <div>
                <h3 className="font-semibold text-lg">No Hidden Fees</h3>
                <p className="text-white/80 text-sm">Transparent pricing always</p>
              </div>
            </div>

            {/* Free Cancellation */}
            <div className="flex items-center space-x-4 text-white">
              <div className="rounded-full flex items-center justify-center flex-shrink-0">
                <Image src="/icons/Free-Cancellation.svg" alt="Instant Confirmation Icon" width={32} height={32} />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Free Cancellation</h3>
                <p className="text-white/80 text-sm">Cancel up to 24 hours before</p>
              </div>
            </div>

            {/* Secured Payment */}
            <div className="flex items-center space-x-4 text-white">
              <div className="rounded-full flex items-center justify-center flex-shrink-0">
                <Image src="/icons/Secured-Payment.svg" alt="Instant Confirmation Icon" width={32} height={32} />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Secured Payment</h3>
                <p className="text-white/80 text-sm">Your payments are safe with us</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

