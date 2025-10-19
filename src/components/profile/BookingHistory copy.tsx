'use client';

import React, { useState } from 'react';
import { Calendar, MapPin, Users, Star, Download, MessageCircle, RefreshCw } from 'lucide-react';

const BookingHistory = () => {
  const [filter, setFilter] = useState('all');

  const bookings = [
    {
      id: 'TR-2024-001',
      tourName: 'Aventura En Buggys',
      date: '2024-02-15',
      status: 'completed',
      participants: 2,
      total: 118.00,
      rating: 5,
      image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><defs><linearGradient id="buggy" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%23F59E0B;stop-opacity:1" /><stop offset="100%" style="stop-color:%23D97706;stop-opacity:1" /></linearGradient></defs><rect width="400" height="300" fill="url(%23buggy)"/><rect x="100" y="150" width="200" height="80" fill="%23374151" rx="10"/><circle cx="130" cy="210" r="20" fill="%23111827"/><circle cx="270" cy="210" r="20" fill="%23111827"/><text x="200" y="280" text-anchor="middle" fill="white" font-size="16" font-weight="bold">Buggy Adventure</text></svg>',
      pickup: 'Punta Cana'
    },
    {
      id: 'TR-2024-002',
      tourName: 'Santo Domingo City Tour',
      date: '2024-03-20',
      status: 'upcoming',
      participants: 3,
      total: 177.00,
      rating: null,
      image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><defs><linearGradient id="city" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%236366F1;stop-opacity:1" /><stop offset="100%" style="stop-color:%234F46E5;stop-opacity:1" /></linearGradient></defs><rect width="400" height="300" fill="url(%23city)"/><rect x="50" y="100" width="60" height="150" fill="%23374151"/><rect x="130" y="80" width="60" height="170" fill="%23374151"/><rect x="210" y="120" width="60" height="130" fill="%23374151"/><rect x="290" y="90" width="60" height="160" fill="%23374151"/><text x="200" y="280" text-anchor="middle" fill="white" font-size="16" font-weight="bold">City Tour</text></svg>',
      pickup: 'Santo Domingo'
    },
    {
      id: 'TR-2024-003',
      tourName: 'Saona Island Day Trip',
      date: '2024-01-10',
      status: 'completed',
      participants: 2,
      total: 118.00,
      rating: 4,
      image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><defs><linearGradient id="island" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%2306B6D4;stop-opacity:1" /><stop offset="100%" style="stop-color:%230284C7;stop-opacity:1" /></linearGradient></defs><rect width="400" height="300" fill="url(%23island)"/><ellipse cx="200" cy="200" rx="150" ry="80" fill="%23FEF3C7"/><circle cx="180" cy="180" r="15" fill="%2316A34A"/><circle cx="220" cy="170" r="12" fill="%2316A34A"/><text x="200" y="280" text-anchor="middle" fill="white" font-size="16" font-weight="bold">Island Paradise</text></svg>',
      pickup: 'Punta Cana'
    },
    {
      id: 'TR-2023-045',
      tourName: 'Whale Watching Samaná',
      date: '2023-12-05',
      status: 'cancelled',
      participants: 4,
      total: 340.00,
      rating: null,
      image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><defs><linearGradient id="whale" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%231E40AF;stop-opacity:1" /><stop offset="100%" style="stop-color:%231E3A8A;stop-opacity:1" /></linearGradient></defs><rect width="400" height="300" fill="url(%23whale)"/><ellipse cx="200" cy="180" rx="80" ry="30" fill="%23374151"/><ellipse cx="160" cy="170" rx="15" ry="8" fill="%23374151"/><text x="200" y="280" text-anchor="middle" fill="white" font-size="16" font-weight="bold">Whale Watching</text></svg>',
      pickup: 'Samaná'
    },
    {
      id: 'TR-2023-032',
      tourName: 'Zip Line Adventure',
      date: '2023-11-18',
      status: 'completed',
      participants: 2,
      total: 130.00,
      rating: 5,
      image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><defs><linearGradient id="zipline" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%2316A34A;stop-opacity:1" /><stop offset="100%" style="stop-color:%2315803D;stop-opacity:1" /></linearGradient></defs><rect width="400" height="300" fill="url(%23zipline)"/><line x1="50" y1="100" x2="350" y2="200" stroke="%23374151" stroke-width="4"/><circle cx="200" cy="150" r="8" fill="%23374151"/><text x="200" y="280" text-anchor="middle" fill="white" font-size="16" font-weight="bold">Zip Line</text></svg>',
      pickup: 'Puerto Plata'
    }
  ];

  const filteredBookings = bookings.filter(booking => {
    if (filter === 'all') return true;
    return booking.status === filter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'upcoming':
        return 'Upcoming';
      case 'cancelled':
        return 'Cancelled';
      default:
        return status;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Booking History</h2>
        <div className="flex items-center space-x-4">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="input text-sm"
          >
            <option value="all">All Bookings</option>
            <option value="completed">Completed</option>
            <option value="upcoming">Upcoming</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="space-y-6">
        {filteredBookings.map((booking) => (
          <div key={booking.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-start space-x-4">
              {/* Tour Image */}
              <div className="flex-shrink-0">
                <div 
                  className="w-20 h-20 rounded-lg bg-cover bg-center"
                  style={{ backgroundImage: `url('${booking.image}')` }}
                />
              </div>

              {/* Booking Details */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-1">{booking.tourName}</h3>
                    <p className="text-sm text-gray-600">Booking ID: {booking.id}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                    {getStatusText(booking.status)}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(booking.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>Pickup: {booking.pickup}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>{booking.participants} {booking.participants === 1 ? 'Person' : 'People'}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="text-lg font-bold text-gray-800">
                      ${booking.total.toFixed(2)}
                    </div>
                    {booking.rating && (
                      <div className="flex items-center space-x-1">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-4 h-4 ${i < booking.rating! ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">Your Rating</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center space-x-2">
                    {booking.status === 'completed' && (
                      <>
                        <button className="flex items-center space-x-1 px-3 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                          <Download className="w-4 h-4" />
                          <span>Receipt</span>
                        </button>
                        {!booking.rating && (
                          <button className="flex items-center space-x-1 px-3 py-2 text-sm text-primary-600 hover:text-primary-700 border border-primary-300 rounded-lg hover:bg-primary-50 transition-colors duration-200">
                            <Star className="w-4 h-4" />
                            <span>Rate Tour</span>
                          </button>
                        )}
                      </>
                    )}
                    {booking.status === 'upcoming' && (
                      <>
                        <button className="flex items-center space-x-1 px-3 py-2 text-sm text-blue-600 hover:text-blue-700 border border-blue-300 rounded-lg hover:bg-blue-50 transition-colors duration-200">
                          <MessageCircle className="w-4 h-4" />
                          <span>Contact</span>
                        </button>
                        <button className="flex items-center space-x-1 px-3 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                          <RefreshCw className="w-4 h-4" />
                          <span>Modify</span>
                        </button>
                      </>
                    )}
                    {booking.status === 'cancelled' && (
                      <button className="flex items-center space-x-1 px-3 py-2 text-sm text-primary-600 hover:text-primary-700 border border-primary-300 rounded-lg hover:bg-primary-50 transition-colors duration-200">
                        <RefreshCw className="w-4 h-4" />
                        <span>Book Again</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredBookings.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-800 mb-2">No bookings found</h3>
          <p className="text-gray-600 mb-6">
            {filter === 'all' 
              ? "You haven't made any bookings yet." 
              : `No ${filter} bookings found.`}
          </p>
          <button className="bg-primary-500 hover:bg-primary-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200">
            Browse Tours
          </button>
        </div>
      )}
    </div>
  );
};

export default BookingHistory;

