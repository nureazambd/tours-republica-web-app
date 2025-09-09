'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Star, MapPin, Clock, Users, Heart, Grid, List } from 'lucide-react';

const TourGrid = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('popular');

  const tours = [
    {
      id: 1,
      title: 'Aventura En Buggys',
      description: 'Experience the thrill of off-road adventure through scenic landscapes and hidden gems of the Dominican Republic.',
      price: 50,
      originalPrice: 75,
      discount: 30,
      rating: 4.8,
      reviewCount: 12,
      duration: 'Full Day',
      pickup: 'Punta Cana',
      image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><defs><linearGradient id="buggy" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%23F59E0B;stop-opacity:1" /><stop offset="100%" style="stop-color:%23D97706;stop-opacity:1" /></linearGradient></defs><rect width="400" height="300" fill="url(%23buggy)"/><rect x="100" y="150" width="200" height="80" fill="%23374151" rx="10"/><circle cx="130" cy="210" r="20" fill="%23111827"/><circle cx="270" cy="210" r="20" fill="%23111827"/><rect x="120" y="160" width="160" height="40" fill="%236B7280" rx="5"/><text x="200" y="280" text-anchor="middle" fill="white" font-size="16" font-weight="bold">Buggy Adventure</text></svg>',
      category: 'Adventure',
      featured: true,
      highlights: ['Professional Guide', 'Safety Equipment', 'Hotel Pickup', 'Lunch Included']
    },
    {
      id: 2,
      title: 'Santo Domingo City Tour',
      description: 'Discover the rich history and culture of the first city in the Americas with expert local guides.',
      price: 50,
      originalPrice: 75,
      discount: 30,
      rating: 4.8,
      reviewCount: 15,
      duration: 'Full Day',
      pickup: 'Punta Cana',
      image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><defs><linearGradient id="city" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%23D4A574;stop-opacity:1" /><stop offset="100%" style="stop-color:%238B4513;stop-opacity:1" /></linearGradient></defs><rect width="400" height="300" fill="url(%23city)"/><rect x="50" y="100" width="300" height="150" fill="%23CD853F" opacity="0.8"/><rect x="80" y="120" width="60" height="80" fill="%23A0522D"/><rect x="160" y="110" width="80" height="90" fill="%23A0522D"/><rect x="260" y="130" width="70" height="70" fill="%23A0522D"/><text x="200" y="280" text-anchor="middle" fill="white" font-size="16" font-weight="bold">Historic City</text></svg>',
      category: 'Culture',
      featured: true,
      highlights: ['UNESCO World Heritage', 'Colonial Architecture', 'Local Lunch', 'Museum Visits']
    },
    {
      id: 3,
      title: 'Saona Island Day Trip Lunch',
      description: 'Paradise island experience with crystal clear waters, white sand beaches, and tropical lunch.',
      price: 50,
      originalPrice: 75,
      discount: 30,
      rating: 4.9,
      reviewCount: 32,
      duration: 'Full Day',
      pickup: 'Punta Cana',
      image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><defs><linearGradient id="island" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%2306B6D4;stop-opacity:1" /><stop offset="100%" style="stop-color:%230284C7;stop-opacity:1" /></linearGradient></defs><rect width="400" height="300" fill="url(%23island)"/><ellipse cx="200" cy="200" rx="150" ry="60" fill="%23F3F4F6" opacity="0.9"/><circle cx="120" cy="180" r="15" fill="%2322C55E" opacity="0.8"/><circle cx="280" cy="190" r="20" fill="%2322C55E" opacity="0.8"/><circle cx="200" cy="160" r="12" fill="%2322C55E" opacity="0.8"/><text x="200" y="280" text-anchor="middle" fill="white" font-size="16" font-weight="bold">Paradise Island</text></svg>',
      category: 'Nature',
      featured: true,
      highlights: ['Catamaran Cruise', 'Snorkeling', 'Beach Time', 'Tropical Lunch']
    },
    {
      id: 4,
      title: 'Whale Watching Samaná',
      description: 'Witness the majestic humpback whales in their natural habitat during migration season.',
      price: 85,
      originalPrice: 120,
      discount: 25,
      rating: 4.7,
      reviewCount: 28,
      duration: 'Full Day',
      pickup: 'Samaná',
      image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><defs><linearGradient id="whale" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%230EA5E9;stop-opacity:1" /><stop offset="100%" style="stop-color:%230284C7;stop-opacity:1" /></linearGradient></defs><rect width="400" height="300" fill="url(%23whale)"/><ellipse cx="200" cy="180" rx="80" ry="30" fill="%23374151" opacity="0.8"/><ellipse cx="180" cy="170" rx="15" ry="8" fill="%23111827"/><path d="M 120 180 Q 100 160 90 180" stroke="%23374151" stroke-width="8" fill="none"/><text x="200" y="280" text-anchor="middle" fill="white" font-size="16" font-weight="bold">Whale Watching</text></svg>',
      category: 'Nature',
      featured: false,
      highlights: ['Boat Tour', 'Marine Biologist Guide', 'Photography Tips', 'Lunch']
    },
    {
      id: 5,
      title: 'Zip Line Adventure',
      description: 'Soar through the treetops on an exhilarating zip line adventure in tropical forests.',
      price: 65,
      originalPrice: 90,
      discount: 28,
      rating: 4.6,
      reviewCount: 19,
      duration: 'Half Day',
      pickup: 'Puerto Plata',
      image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><defs><linearGradient id="zipline" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%2322C55E;stop-opacity:1" /><stop offset="100%" style="stop-color:%2316A34A;stop-opacity:1" /></linearGradient></defs><rect width="400" height="300" fill="url(%23zipline)"/><circle cx="80" cy="120" r="25" fill="%23065F46" opacity="0.8"/><circle cx="200" cy="100" r="30" fill="%23065F46" opacity="0.8"/><circle cx="320" cy="140" r="20" fill="%23065F46" opacity="0.8"/><line x1="80" y1="120" x2="320" y2="140" stroke="%23374151" stroke-width="4"/><circle cx="200" cy="130" r="8" fill="%23EF4444"/><text x="200" y="280" text-anchor="middle" fill="white" font-size="16" font-weight="bold">Zip Line</text></svg>',
      category: 'Adventure',
      featured: false,
      highlights: ['Multiple Zip Lines', 'Safety Briefing', 'Forest Views', 'Photos Included']
    },
    {
      id: 6,
      title: 'Catamarán Party Boat',
      description: 'Join the ultimate party boat experience with music, drinks, and beautiful coastal views.',
      price: 75,
      originalPrice: 100,
      discount: 25,
      rating: 4.5,
      reviewCount: 41,
      duration: 'Half Day',
      pickup: 'Punta Cana',
      image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><defs><linearGradient id="catamaran" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%23F59E0B;stop-opacity:1" /><stop offset="100%" style="stop-color:%23D97706;stop-opacity:1" /></linearGradient></defs><rect width="400" height="300" fill="url(%23catamaran)"/><ellipse cx="200" cy="200" rx="120" ry="40" fill="%23F3F4F6" opacity="0.9"/><rect x="150" y="160" width="100" height="40" fill="%23374151" rx="5"/><polygon points="180,120 220,120 210,160 190,160" fill="%23E5E7EB"/><text x="200" y="280" text-anchor="middle" fill="white" font-size="16" font-weight="bold">Party Boat</text></svg>',
      category: 'Adventure',
      featured: false,
      highlights: ['Open Bar', 'DJ Music', 'Swimming Stops', 'Snacks']
    }
  ];

  const formatPrice = (price: number) => `$${price}`;

  const sortOptions = [
    { value: 'popular', label: 'Most Popular' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'newest', label: 'Newest First' },
  ];

  return (
    <div>
      {/* Header with Sort and View Options */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            All Tours ({tours.length})
          </h2>
          <p className="text-gray-600">
            Discover amazing experiences in the Dominican Republic
          </p>
        </div>

        <div className="flex items-center space-x-4">
          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          {/* View Mode Toggle */}
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-colors duration-200 ${
                viewMode === 'grid' 
                  ? 'bg-white text-primary-500 shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-colors duration-200 ${
                viewMode === 'list' 
                  ? 'bg-white text-primary-500 shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Tours Grid/List */}
      <div className={viewMode === 'grid' 
        ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' 
        : 'space-y-6'
      }>
        {tours.map((tour) => (
          <div key={tour.id} className={`group ${viewMode === 'list' ? 'flex' : ''}`}>
            <Link href={`/tours/${tour.id}`}>
              <div className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden ${
                viewMode === 'list' ? 'flex w-full' : ''
              }`}>
                {/* Tour Image */}
                <div className={`relative overflow-hidden ${
                  viewMode === 'list' ? 'w-80 flex-shrink-0' : 'h-48'
                }`}>
                  <div 
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                    style={{ backgroundImage: `url('${tour.image}')` }}
                  />
                  {tour.discount && (
                    <div className="absolute top-4 left-4 bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {tour.discount}% off
                    </div>
                  )}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-sm font-medium text-gray-700">
                    {tour.category}
                  </div>
                  <button className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors duration-200">
                    <Heart className="w-4 h-4 text-gray-600" />
                  </button>
                </div>

                {/* Tour Content */}
                <div className="p-6 flex-1">
                  {/* Rating */}
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < Math.floor(tour.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {tour.rating} ({tour.reviewCount} Reviews)
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-primary-500 transition-colors duration-200">
                    {tour.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {tour.description}
                  </p>

                  {/* Highlights */}
                  {viewMode === 'list' && (
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {tour.highlights.slice(0, 3).map((highlight, index) => (
                          <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                            {highlight}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tour Details */}
                  <div className="flex items-center space-x-4 mb-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>Pickup: {tour.pickup}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 mb-6 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{tour.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>Everyday (9am-7pm)</span>
                    </div>
                  </div>

                  {/* Price and Book Button */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">From</span>
                      {tour.originalPrice && (
                        <span className="text-sm text-gray-400 line-through">
                          {formatPrice(tour.originalPrice)}
                        </span>
                      )}
                      <span className="text-2xl font-bold text-primary-500">
                        {formatPrice(tour.price)}
                      </span>
                    </div>
                    <button className="bg-primary-500 hover:bg-primary-600 text-white font-semibold px-6 py-2 rounded-lg transition-colors duration-200">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      <div className="text-center mt-12">
        <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-8 py-3 rounded-lg transition-colors duration-200">
          Load More Tours
        </button>
      </div>
    </div>
  );
};

export default TourGrid;

