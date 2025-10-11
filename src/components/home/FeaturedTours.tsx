'use client';

import React from 'react';
import Link from 'next/link';
import { Star, MapPin, Clock, Users, ArrowRight } from 'lucide-react';

const FeaturedTours = () => {
  const tours = [
    {
      id: '68e9e2e4f69da497c573b2a2',
      title: 'Aventura En Buggys',
      description: 'Experience the thrill of off-road adventure through scenic landscapes',
      price: 50,
      originalPrice: 75,
      discount: 30,
      rating: 4.8,
      reviewCount: 12,
      duration: 'Full Day',
      pickup: 'Punta Cana',
      image: '/images/destinations/Aventura-En-Buggys.png',
      category: 'Adventure',
      featured: true
    },
    {
      id: '68e9e2e4f69da497c573b2a5',
      title: 'Santo Domingo City Tour',
      description: 'Discover the rich history and culture of the first city in the Americas',
      price: 50,
      originalPrice: 75,
      discount: 30,
      rating: 4.8,
      reviewCount: 15,
      duration: 'Full Day',
      pickup: 'Punta Cana',
      image: '/images/destinations/Santo-Domingo-City-Tour.png',
      category: 'Culture',
      featured: true
    },
    {
      id: '68e9e2e4f69da497c573b2a7',
      title: 'Saona Island Day Trip Lunch',
      description: 'Paradise island experience with crystal clear waters and white sand beaches',
      price: 50,
      originalPrice: 75,
      discount: 30,
      rating: 4.9,
      reviewCount: 32,
      duration: 'Full Day',
      pickup: 'Punta Cana',
      image: '/images/destinations/Saona-Island-Day-Trip-Lunch.png',
      category: 'Nature',
      featured: true
    }
  ];

  const formatPrice = (price: number) => `$${price}`;

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
              Featured Tours
            </h2>
            <p className="text-gray-600 text-lg">
              Handpicked experiences for unforgettable memories
            </p>
          </div>
          <div className="hidden lg:flex space-x-2">
            <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200">
              <ArrowRight className="w-5 h-5 rotate-180" />
            </button>
            <button className="p-2 rounded-full bg-primary-500 hover:bg-primary-600 text-white transition-colors duration-200">
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tours Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {tours.map((tour) => (
            <div key={tour.id} className="group">
              <Link href={`/tours/${tour.id}`}>
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
                  {/* Tour Image */}
                  <div className="relative h-48 overflow-hidden">
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
                  </div>

                  {/* Tour Content */}
                  <div className="p-6">
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

        {/* View All Tours Button */}
        <div className="text-center">
          <Link href="/tours">
            <button className="bg-primary-500 hover:bg-primary-600 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200 flex items-center space-x-2 mx-auto shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              <span>View All Tours</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedTours;

