'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Car, Users, Shield, Clock } from 'lucide-react';

const TransportSection = () => {
  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-6">
              Need transport? We handle airport transfers.
            </h2>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              Arrive and depart in comfort with our reliable, hassle-free private airport transfers. 
              Professional drivers, comfortable vehicles, and peace of mind included.
            </p>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <div className="flex items-start space-x-3">
                <div className="bg-primary-100 p-2 rounded-lg flex-shrink-0">
                  <Shield className="w-5 h-5 text-primary-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Safe & Reliable</h3>
                  <p className="text-gray-600 text-sm">Professional licensed drivers</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="bg-primary-100 p-2 rounded-lg flex-shrink-0">
                  <Clock className="w-5 h-5 text-primary-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">24/7 Service</h3>
                  <p className="text-gray-600 text-sm">Available anytime you need</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="bg-primary-100 p-2 rounded-lg flex-shrink-0">
                  <Car className="w-5 h-5 text-primary-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Modern Fleet</h3>
                  <p className="text-gray-600 text-sm">Clean, comfortable vehicles</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="bg-primary-100 p-2 rounded-lg flex-shrink-0">
                  <Users className="w-5 h-5 text-primary-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">All Group Sizes</h3>
                  <p className="text-gray-600 text-sm">From solo to large groups</p>
                </div>
              </div>
            </div>

            <Link href="/car-booking">
              <button className="bg-primary-500 hover:bg-primary-600 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                <span>Book Transfer</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
          </div>

          {/* Image/Visual */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              {/* Large Vehicle Image */}
              <div className="col-span-2 h-48 rounded-2xl overflow-hidden shadow-lg">
                <div 
                  className="w-full h-full bg-cover bg-center"
                  style={{
                    backgroundImage: `url('/images/destinations/transport-1.png')`
                  }}
                />
              </div>

              {/* Smaller Vehicle Images */}
              <div className="h-32 rounded-xl overflow-hidden shadow-lg">
                <div 
                  className="w-full h-full bg-cover bg-center"
                  style={{
                    backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200"><defs><linearGradient id="car2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%23059669;stop-opacity:1" /><stop offset="100%" style="stop-color:%23047857;stop-opacity:1" /></linearGradient></defs><rect width="300" height="200" fill="%23F3F4F6"/><rect x="25" y="80" width="250" height="80" fill="url(%23car2)" rx="10"/><circle cx="75" cy="145" r="20" fill="%23111827"/><circle cx="225" cy="145" r="20" fill="%23111827"/><rect x="40" y="95" width="220" height="40" fill="%2322C55E" rx="5"/><text x="150" y="185" text-anchor="middle" fill="%23374151" font-size="12" font-weight="bold">Sedan</text></svg>')`
                  }}
                />
              </div>

              <div className="h-32 rounded-xl overflow-hidden shadow-lg">
                <div 
                  className="w-full h-full bg-cover bg-center"
                  style={{
                    backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200"><defs><linearGradient id="car3" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%230284C7;stop-opacity:1" /><stop offset="100%" style="stop-color:%230369A1;stop-opacity:1" /></linearGradient></defs><rect width="300" height="200" fill="%23F3F4F6"/><rect x="25" y="70" width="250" height="90" fill="url(%23car3)" rx="12"/><circle cx="75" cy="145" r="20" fill="%23111827"/><circle cx="225" cy="145" r="20" fill="%23111827"/><rect x="40" y="85" width="220" height="50" fill="%2306B6D4" rx="6"/><text x="150" y="185" text-anchor="middle" fill="%23374151" font-size="12" font-weight="bold">Van</text></svg>')`
                  }}
                />
              </div>
            </div>

            {/* Floating Badge */}
            <div className="absolute -top-4 -right-4 bg-accent-500 text-white px-4 py-2 rounded-full font-semibold shadow-lg">
              24/7 Available
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TransportSection;

