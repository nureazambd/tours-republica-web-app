'use client';

import React from 'react';
import Link from 'next/link';
import { Star, MapPin, Clock, Users, ArrowRight } from 'lucide-react';
import Image from 'next/image'

const FeaturedTours = () => {
  const tours = [
    {
      id: '68e9e2e4f69da497c573b2a2',
      title: 'Aventura En Buggys',
      description: 'Explore the highlights of Punta Cana in a thrilling half-day off-road dune buggy..',
      price: 50,
      originalPrice: 75,
      discount: 30,
      rating: 4.8,
      reviewCount: 30,
      duration: '4 Hours',
      pickup: 'Punta Cana',
      image: '/images/destinations/Aventura-En-Buggys.png',
      featureIcon: '/images/home/featured/car-man-food.png',
      category: 'Adventure',
      featured: true
    },
    {
      id: '68e9e2e4f69da497c573b2a5',
      title: 'Santo Domingo City Tour',
      description: 'Explore the highlights of Punta Cana in a thrilling half-day off-road dune buggy..',
      price: 50,
      originalPrice: 75,
      discount: 30,
      rating: 4.8,
      reviewCount: 15,
      duration: '10 Hours',
      pickup: 'Punta Cana',
      image: '/images/destinations/Santo-Domingo-City-Tour.png',
      featureIcon: '/images/home/featured/car-man-food.png',
      category: 'Cultural City trips',
      featured: true
    },
    {
      id: '68e9e2e4f69da497c573b2a7',
      title: 'Saona Island Day Trip Lunch',
      description: 'Explore the highlights of Punta Cana in a thrilling half-day off-road dune buggy..',
      price: 50,
      originalPrice: 75,
      discount: 30,
      rating: 4.9,
      reviewCount: 32,
      duration: '10 Hours',
      pickup: 'Punta Cana',
      image: '/images/destinations/Saona-Island-Day-Trip-Lunch.png',
      featureIcon: '/images/home/featured/car-man.png',
      category: 'Nature and Boat Trip',
      featured: true
    }
  ];

  const formatPrice = (price: number) => `$${price}`;

  return (
    <section className="">
      <div className="container-custom">
        {/* Section Header */}
       

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

                    {/* Tour Details
                    <div className="flex items-center space-x-4 mb-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>Pickup: {tour.pickup}</span>
                      </div>
                      <div className=''>
                        <Image
                          src="/images/home/featured/Aventura-en-Buggys-food.png"
                          width={100}
                          height={50}
                          alt="Picture of the author"
                        />
                      </div>
                    </div> */}

                    {/* Tour Details */}
{/* Note the changes in this line: justify-between and removed space-x-4 */}
<div className="flex items-center justify-between border-t-2 mb-4 text-sm text-gray-500">
  
  <div className="flex items-center pt-4 space-x-1">
    <MapPin className="w-4 h-4" />
    <span>Pickup: {tour.pickup}</span>
  </div>
  
  <div className=''> {/* No changes needed here */}
    <Image
      src={tour.featureIcon}
      width={70}
      height={50}
      alt="Picture of the author"
      className='w-full h-5 mt-3'
    />
  </div>

</div>

                    <div className=" items-center  mb-8 text-sm text-gray-500">
                      <div className="flex items-center border-t-2 pt-4 space-x-1 mb-4">
                        <Users className="w-4 h-4" />
                        <span>Everyday (8am /11am /1pm)</span>
                      </div>
                      <div className="flex items-center border-t-2 border-b-2 pb-4 pt-4 space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{tour.duration}</span>
                      </div>
                      
                    </div>

                    {/* Price and Book Button */}
                    <div className="flex items-center justify-between ">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500">From</span>
                        {tour.originalPrice && (
                          <span className="text-[18px] font-[500] text-[#FAA523] line-through">
                            {formatPrice(tour.originalPrice)}
                          </span>
                        )}
                        <span className="text-[28px] font-[500] text-[#003459]">
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

        
      </div>
    </section>
  );
};

export default FeaturedTours;

