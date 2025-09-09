'use client';

import React from 'react';
import { Users, Fuel, Settings, Star } from 'lucide-react';

const CarFleet = () => {
  const vehicles = [
    {
      id: 1,
      name: 'Economy Sedan',
      model: 'Nissan Versa or similar',
      image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 200"><defs><linearGradient id="sedan" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%236B7280;stop-opacity:1" /><stop offset="100%" style="stop-color:%234B5563;stop-opacity:1" /></linearGradient></defs><rect width="400" height="200" fill="%23F3F4F6"/><ellipse cx="200" cy="140" rx="150" ry="40" fill="url(%23sedan)"/><rect x="80" y="100" width="240" height="60" fill="url(%23sedan)" rx="15"/><circle cx="120" cy="160" r="20" fill="%23111827"/><circle cx="280" cy="160" r="20" fill="%23111827"/><rect x="100" y="110" width="200" height="30" fill="%236B7280" rx="5"/><text x="200" y="190" text-anchor="middle" fill="%23374151" font-size="14" font-weight="bold">Economy Sedan</text></svg>',
      passengers: 5,
      transmission: 'Automatic',
      fuelType: 'Gasoline',
      pricePerDay: 35,
      features: ['Air Conditioning', 'GPS Navigation', 'Bluetooth', 'USB Charging'],
      rating: 4.2,
      reviews: 128,
      popular: false
    },
    {
      id: 2,
      name: 'Compact SUV',
      model: 'Honda CR-V or similar',
      image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 200"><defs><linearGradient id="suv" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%23059669;stop-opacity:1" /><stop offset="100%" style="stop-color:%23047857;stop-opacity:1" /></linearGradient></defs><rect width="400" height="200" fill="%23F3F4F6"/><ellipse cx="200" cy="150" rx="160" ry="45" fill="url(%23suv)"/><rect x="70" y="90" width="260" height="80" fill="url(%23suv)" rx="20"/><circle cx="120" cy="170" r="25" fill="%23111827"/><circle cx="280" cy="170" r="25" fill="%23111827"/><rect x="90" y="100" width="220" height="40" fill="%23059669" rx="8"/><text x="200" y="190" text-anchor="middle" fill="%23374151" font-size="14" font-weight="bold">Compact SUV</text></svg>',
      passengers: 7,
      transmission: 'Automatic',
      fuelType: 'Gasoline',
      pricePerDay: 55,
      features: ['4WD', 'Air Conditioning', 'GPS Navigation', 'Roof Rack', 'Premium Sound'],
      rating: 4.6,
      reviews: 89,
      popular: true
    },
    {
      id: 3,
      name: 'Luxury Sedan',
      model: 'BMW 3 Series or similar',
      image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 200"><defs><linearGradient id="luxury" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%231F2937;stop-opacity:1" /><stop offset="100%" style="stop-color:%23111827;stop-opacity:1" /></linearGradient></defs><rect width="400" height="200" fill="%23F3F4F6"/><ellipse cx="200" cy="140" rx="155" ry="42" fill="url(%23luxury)"/><rect x="75" y="95" width="250" height="65" fill="url(%23luxury)" rx="18"/><circle cx="120" cy="160" r="22" fill="%23374151"/><circle cx="280" cy="160" r="22" fill="%23374151"/><rect x="95" y="105" width="210" height="35" fill="%23374151" rx="6"/><text x="200" y="190" text-anchor="middle" fill="%23374151" font-size="14" font-weight="bold">Luxury Sedan</text></svg>',
      passengers: 5,
      transmission: 'Automatic',
      fuelType: 'Premium',
      pricePerDay: 85,
      features: ['Leather Seats', 'Premium Sound', 'Climate Control', 'Sunroof', 'Advanced Safety'],
      rating: 4.8,
      reviews: 156,
      popular: false
    },
    {
      id: 4,
      name: 'Full-Size SUV',
      model: 'Chevrolet Tahoe or similar',
      image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 200"><defs><linearGradient id="fullsuv" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%23DC2626;stop-opacity:1" /><stop offset="100%" style="stop-color:%23B91C1C;stop-opacity:1" /></linearGradient></defs><rect width="400" height="200" fill="%23F3F4F6"/><ellipse cx="200" cy="155" rx="170" ry="50" fill="url(%23fullsuv)"/><rect x="60" y="85" width="280" height="90" fill="url(%23fullsuv)" rx="25"/><circle cx="120" cy="175" r="28" fill="%23111827"/><circle cx="280" cy="175" r="28" fill="%23111827"/><rect x="80" y="95" width="240" height="45" fill="%23DC2626" rx="10"/><text x="200" y="190" text-anchor="middle" fill="%23374151" font-size="14" font-weight="bold">Full-Size SUV</text></svg>',
      passengers: 8,
      transmission: 'Automatic',
      fuelType: 'Gasoline',
      pricePerDay: 95,
      features: ['4WD', '3rd Row Seating', 'Towing Capacity', 'Premium Interior', 'Entertainment System'],
      rating: 4.5,
      reviews: 73,
      popular: false
    },
    {
      id: 5,
      name: 'Convertible',
      model: 'Ford Mustang or similar',
      image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 200"><defs><linearGradient id="convertible" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%23F59E0B;stop-opacity:1" /><stop offset="100%" style="stop-color:%23D97706;stop-opacity:1" /></linearGradient></defs><rect width="400" height="200" fill="%23F3F4F6"/><ellipse cx="200" cy="145" rx="145" ry="38" fill="url(%23convertible)"/><rect x="85" y="105" width="230" height="55" fill="url(%23convertible)" rx="12"/><circle cx="125" cy="165" r="20" fill="%23111827"/><circle cx="275" cy="165" r="20" fill="%23111827"/><rect x="105" y="115" width="190" height="25" fill="%23F59E0B" rx="4"/><text x="200" y="190" text-anchor="middle" fill="%23374151" font-size="14" font-weight="bold">Convertible</text></svg>',
      passengers: 4,
      transmission: 'Automatic',
      fuelType: 'Premium',
      pricePerDay: 120,
      features: ['Convertible Top', 'Sport Mode', 'Premium Sound', 'Performance Tires', 'Heated Seats'],
      rating: 4.7,
      reviews: 94,
      popular: false
    },
    {
      id: 6,
      name: 'Minivan',
      model: 'Honda Odyssey or similar',
      image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 200"><defs><linearGradient id="minivan" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%236366F1;stop-opacity:1" /><stop offset="100%" style="stop-color:%234F46E5;stop-opacity:1" /></linearGradient></defs><rect width="400" height="200" fill="%23F3F4F6"/><ellipse cx="200" cy="150" rx="165" ry="48" fill="url(%23minivan)"/><rect x="65" y="80" width="270" height="85" fill="url(%23minivan)" rx="22"/><circle cx="120" cy="170" r="25" fill="%23111827"/><circle cx="280" cy="170" r="25" fill="%23111827"/><rect x="85" y="90" width="230" height="50" fill="%236366F1" rx="8"/><text x="200" y="190" text-anchor="middle" fill="%23374151" font-size="14" font-weight="bold">Family Minivan</text></svg>',
      passengers: 8,
      transmission: 'Automatic',
      fuelType: 'Gasoline',
      pricePerDay: 75,
      features: ['Sliding Doors', 'Family Friendly', 'Entertainment System', 'Extra Storage', 'Easy Access'],
      rating: 4.4,
      reviews: 67,
      popular: false
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {vehicles.map((vehicle) => (
        <div key={vehicle.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 relative">
          {vehicle.popular && (
            <div className="absolute top-4 left-4 bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-semibold z-10">
              Most Popular
            </div>
          )}
          
          {/* Vehicle Image */}
          <div className="relative h-48">
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('${vehicle.image}')` }}
            />
          </div>

          {/* Vehicle Details */}
          <div className="p-6">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-1">{vehicle.name}</h3>
                <p className="text-gray-600 text-sm">{vehicle.model}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-primary-500">${vehicle.pricePerDay}</div>
                <div className="text-sm text-gray-600">per day</div>
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-4 h-4 ${i < Math.floor(vehicle.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
              <span className="text-sm font-medium text-gray-700">
                {vehicle.rating} ({vehicle.reviews} reviews)
              </span>
            </div>

            {/* Vehicle Specs */}
            <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
              <div className="text-center">
                <Users className="w-5 h-5 text-gray-400 mx-auto mb-1" />
                <div className="font-medium text-gray-800">{vehicle.passengers}</div>
                <div className="text-gray-600">Passengers</div>
              </div>
              <div className="text-center">
                <Settings className="w-5 h-5 text-gray-400 mx-auto mb-1" />
                <div className="font-medium text-gray-800">{vehicle.transmission}</div>
                <div className="text-gray-600">Transmission</div>
              </div>
              <div className="text-center">
                <Fuel className="w-5 h-5 text-gray-400 mx-auto mb-1" />
                <div className="font-medium text-gray-800">{vehicle.fuelType}</div>
                <div className="text-gray-600">Fuel</div>
              </div>
            </div>

            {/* Features */}
            <div className="mb-6">
              <h4 className="font-semibold text-gray-800 mb-2">Features</h4>
              <div className="flex flex-wrap gap-2">
                {vehicle.features.slice(0, 3).map((feature, index) => (
                  <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                    {feature}
                  </span>
                ))}
                {vehicle.features.length > 3 && (
                  <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                    +{vehicle.features.length - 3} more
                  </span>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <button className="flex-1 bg-primary-500 hover:bg-primary-600 text-white font-semibold py-3 rounded-lg transition-colors duration-200">
                Book Now
              </button>
              <button className="px-4 py-3 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                Details
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CarFleet;

