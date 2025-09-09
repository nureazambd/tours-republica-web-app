'use client';

import React from 'react';
import { Star, MapPin, Clock, Users, Calendar, Shield, Phone, Mail } from 'lucide-react';

const BookingSummary = () => {
  // Mock tour data - in real app this would come from props or context
  const tour = {
    id: 1,
    title: 'Aventura En Buggys',
    image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><defs><linearGradient id="buggy" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%23F59E0B;stop-opacity:1" /><stop offset="100%" style="stop-color:%23D97706;stop-opacity:1" /></linearGradient></defs><rect width="400" height="300" fill="url(%23buggy)"/><rect x="100" y="150" width="200" height="80" fill="%23374151" rx="10"/><circle cx="130" cy="210" r="20" fill="%23111827"/><circle cx="270" cy="210" r="20" fill="%23111827"/><rect x="120" y="160" width="160" height="40" fill="%236B7280" rx="5"/><text x="200" y="280" text-anchor="middle" fill="white" font-size="16" font-weight="bold">Buggy Adventure</text></svg>',
    rating: 4.8,
    reviewCount: 12,
    duration: 'Full Day',
    pickup: 'Punta Cana',
    price: 50,
    originalPrice: 75,
    discount: 30
  };

  const bookingDetails = {
    date: '2024-03-15',
    adults: 2,
    children: 0,
    infants: 0,
    duration: 'Full Day'
  };

  const calculateTotal = () => {
    const adultPrice = tour.price * bookingDetails.adults;
    const childPrice = (tour.price * 0.8) * bookingDetails.children; // 20% discount for children
    const subtotal = adultPrice + childPrice;
    const tax = subtotal * 0.18; // 18% tax
    return {
      subtotal,
      tax,
      total: subtotal + tax
    };
  };

  const pricing = calculateTotal();

  return (
    <div className="space-y-6">
      {/* Tour Summary Card */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden sticky top-24">
        {/* Tour Image */}
        <div className="relative h-48">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${tour.image}')` }}
          />
          <div className="absolute top-4 left-4 bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            {tour.discount}% off
          </div>
        </div>

        {/* Tour Details */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-3">
            {tour.title}
          </h3>

          {/* Rating */}
          <div className="flex items-center space-x-2 mb-4">
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

          {/* Tour Info */}
          <div className="space-y-2 mb-6 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4" />
              <span>Pickup: {tour.pickup}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>{tour.duration}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>Everyday (9am-7pm)</span>
            </div>
          </div>

          {/* Booking Details */}
          <div className="border-t pt-4 mb-6">
            <h4 className="font-semibold text-gray-800 mb-3">Booking Details</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Date:</span>
                <span className="font-medium">March 15, 2024</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Duration:</span>
                <span className="font-medium">{bookingDetails.duration}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Travelers:</span>
                <span className="font-medium">
                  {bookingDetails.adults} Adults
                  {bookingDetails.children > 0 && `, ${bookingDetails.children} Children`}
                  {bookingDetails.infants > 0 && `, ${bookingDetails.infants} Infants`}
                </span>
              </div>
            </div>
          </div>

          {/* Pricing Breakdown */}
          <div className="border-t pt-4">
            <h4 className="font-semibold text-gray-800 mb-3">Price Breakdown</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">
                  Adults ({bookingDetails.adults} × ${tour.price})
                </span>
                <span>${tour.price * bookingDetails.adults}</span>
              </div>
              {bookingDetails.children > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    Children ({bookingDetails.children} × ${Math.round(tour.price * 0.8)})
                  </span>
                  <span>${Math.round(tour.price * 0.8 * bookingDetails.children)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>${pricing.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax (18%)</span>
                <span>${pricing.tax.toFixed(2)}</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-primary-500">${pricing.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Savings Badge */}
          {tour.originalPrice && (
            <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-3">
              <div className="text-center">
                <span className="text-green-800 font-semibold">
                  You save ${((tour.originalPrice - tour.price) * bookingDetails.adults).toFixed(2)}!
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Security & Support */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
          <Shield className="w-5 h-5 mr-2 text-green-500" />
          Security & Support
        </h4>
        
        <div className="space-y-4 text-sm">
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
            <div>
              <p className="font-medium text-gray-800">Secure Payment</p>
              <p className="text-gray-600">Your payment information is encrypted and secure</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
            <div>
              <p className="font-medium text-gray-800">Free Cancellation</p>
              <p className="text-gray-600">Cancel up to 24 hours before your tour</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
            <div>
              <p className="font-medium text-gray-800">24/7 Support</p>
              <p className="text-gray-600">Get help anytime with our customer support</p>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t">
          <h5 className="font-medium text-gray-800 mb-3">Need Help?</h5>
          <div className="space-y-2 text-sm">
            <div className="flex items-center space-x-2 text-gray-600">
              <Phone className="w-4 h-4" />
              <span>+1 (829) 618 5692</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <Mail className="w-4 h-4" />
              <span>reservas@toursrepublica.com</span>
            </div>
          </div>
        </div>
      </div>

      {/* What's Included */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h4 className="font-semibold text-gray-800 mb-4">What's Included</h4>
        <div className="space-y-2 text-sm">
          {[
            'Professional guide',
            'Safety equipment',
            'Hotel pickup and drop-off',
            'Lunch and refreshments',
            'All entrance fees',
            'Insurance coverage'
          ].map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-primary-500 rounded-full flex-shrink-0"></div>
              <span className="text-gray-700">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookingSummary;

