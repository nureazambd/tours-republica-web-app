'use client';

import React from 'react';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      location: 'New York, USA',
      rating: 5,
      comment:
        'Amazing experience! The tour guides were knowledgeable and friendly. The Santo Domingo city tour was absolutely fantastic. Highly recommend Tours Republica for anyone visiting Dominican Republic.',
      avatar:
        'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" fill="%23E91E63"/><circle cx="50" cy="40" r="15" fill="white"/><ellipse cx="50" cy="75" rx="20" ry="15" fill="white"/></svg>',
      platform: 'Google',
    },
    {
      id: 2,
      name: 'Michael Chen',
      location: 'Toronto, Canada',
      rating: 5,
      comment:
        'Incredible adventure! The buggy tour was thrilling and the Saona Island trip was like paradise. Professional service from start to finish. Will definitely book again on our next visit.',
      avatar:
        'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" fill="%2314B8A6"/><circle cx="50" cy="40" r="15" fill="white"/><ellipse cx="50" cy="75" rx="20" ry="15" fill="white"/></svg>',
      platform: 'Facebook',
    },
    {
      id: 3,
      name: 'Emma Rodriguez',
      location: 'Madrid, Spain',
      rating: 5,
      comment:
        'Perfect organization and beautiful destinations! The team at Tours Republica made our Dominican Republic vacation unforgettable. Great value for money and excellent customer service.',
      avatar:
        'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" fill="%23F59E0B"/><circle cx="50" cy="40" r="15" fill="white"/><ellipse cx="50" cy="75" rx="20" ry="15" fill="white"/></svg>',
      platform: 'TrustPilot',
    },
  ];

  const stats = [
    { icon: '⭐', value: '4.9', label: 'Average Rating' },
    { icon: '👥', value: '100,000+', label: 'Happy Travelers' },
    { icon: '🏆', value: '2017', label: 'Since' },
    { icon: '📍', value: '50+', label: 'Destinations' },
  ];

  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="container-custom px-4">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            Trusted by more than 100,000 travelers since 2017
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Join thousands of satisfied customers who have experienced the magic of Dominican Republic with us
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</div>
              <div className="text-gray-600 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Logos */}
        <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-6 mb-12">
          {[
            { name: 'Google', rating: '4.9/5', color: 'bg-blue-500', letter: 'G' },
            { name: 'Facebook', rating: '4.8/5', color: 'bg-blue-600', letter: 'f' },
            { name: 'TrustPilot', rating: '4.9/5', color: 'bg-green-500', letter: 'T' },
          ].map((platform, idx) => (
            <div key={idx} className="flex items-center space-x-2">
              <div className={`w-8 h-8 rounded flex items-center justify-center ${platform.color}`}>
                <span className="text-white font-bold text-sm">{platform.letter}</span>
              </div>
              <span className="font-medium text-gray-600">{platform.name}</span>
              <div className="flex items-center space-x-1 ml-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
                <span className="text-sm text-gray-600 ml-1">{platform.rating}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-2xl p-6 md:p-8 shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              {/* Quote Icon */}
              <div className="mb-4">
                <Quote className="w-6 h-6 text-primary-500 opacity-50" />
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-1 mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Comment */}
              <p className="text-gray-700 mb-5 leading-relaxed text-sm sm:text-base">
                "{testimonial.comment}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden"
                  style={{
                    backgroundImage: `url('${testimonial.avatar}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                ></div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800 text-sm sm:text-base">{testimonial.name}</h4>
                  <p className="text-gray-500 text-xs sm:text-sm">{testimonial.location}</p>
                </div>
                <div className="ml-auto">
                  <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {testimonial.platform}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
