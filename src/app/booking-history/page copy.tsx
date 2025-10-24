'use client';

import React, { useEffect, useState } from 'react';
import Layout from '@/components/layout/Layout';
import {
  Calendar,
  MapPin,
  Users,
  Download,
  MessageCircle,
  Car,
  Plane,
} from 'lucide-react';

interface CarBooking {
  type: 'car';
  _id: string;
  carSnapshot: {
    name: string;
    price: number;
    image: string;
    type: string;
  };
  paymentStatus: string;
  paymentMethod: string;
  total: number;
  pickupPlace: string;
  traveler: {
    firstName: string;
    lastName: string;
    email: string;
  };
  createdAt: string;
}

interface TourBooking {
  type: 'tour';
  _id: string;
  title: string;
  location: string;
  total: number;
  paymentStatus: string;
  paymentMethod: string;
  pickupPlace: string;
  createdAt: string;
}

type Booking = CarBooking | TourBooking;

const BookingHistory = () => {
  const [loading, setLoading] = useState(true);
  const [carBookings, setCarBookings] = useState<CarBooking[]>([]);
  const [tourBookings, setTourBookings] = useState<TourBooking[]>([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('/api/user-bookings', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();

        // Add explicit type flags
        const cars = (data.carBookings || []).map((b: any) => ({
          ...b,
          type: 'car',
        })) as CarBooking[];

        const tours = (data.tourBookings || []).map((b: any) => ({
          ...b,
          type: 'tour',
        })) as TourBooking[];

        setCarBookings(cars);
        setTourBookings(tours);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return (
      <div className="p-10 text-center text-gray-500">
        Loading your bookings...
      </div>
    );
  }

  const renderStatus = (status: string) => {
    const color =
      status === 'paid'
        ? 'bg-green-100 text-green-700'
        : status === 'pending'
        ? 'bg-yellow-100 text-yellow-700'
        : 'bg-red-100 text-red-700';
    return (
      <span
        className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${color}`}
      >
        {status}
      </span>
    );
  };

  const allBookings: Booking[] = [...carBookings, ...tourBookings].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  if (allBookings.length === 0) {
    return (
      <div className="p-10 text-center text-gray-500">
        You have no bookings yet.
      </div>
    );
  }

  // ✅ Type guards to narrow the booking type
  const isCarBooking = (booking: Booking): booking is CarBooking =>
    booking.type === 'car';
  const isTourBooking = (booking: Booking): booking is TourBooking =>
    booking.type === 'tour';

  return (
    <Layout>
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Booking History
      </h2>

      <div className="space-y-6">
        {allBookings.map((booking) => (
          <div
            key={booking._id}
            className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-start space-x-4">
              {/* Booking type icon */}
              <div className="w-20 h-20 rounded-lg bg-gray-100 flex items-center justify-center">
                {isCarBooking(booking) ? (
                  <Car className="w-8 h-8 text-blue-600" />
                ) : (
                  <Plane className="w-8 h-8 text-orange-600" />
                )}
              </div>

              {/* Booking details */}
              <div className="flex-1">
                <div className="flex justify-between mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {isCarBooking(booking)
                        ? booking.carSnapshot.name
                        : booking.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {isCarBooking(booking)
                        ? booking.carSnapshot.type
                        : booking.location}
                    </p>
                  </div>
                  {renderStatus(booking.paymentStatus)}
                </div>

                <div className="text-sm text-gray-600 grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {new Date(booking.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4" />
                    <span>
                      {booking.pickupPlace || 'Pickup not specified'}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4" />
                    <span>{booking.paymentMethod.toUpperCase()}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-4">
                  <p className="font-bold text-lg text-gray-800">
                    ${booking.total.toFixed(2)}
                  </p>

                  <div className="flex items-center space-x-3">
                    <button className="flex items-center text-sm text-gray-600 hover:text-gray-800">
                      <Download className="w-4 h-4 mr-1" />
                      Receipt
                    </button>

                    <button className="flex items-center text-sm text-blue-600 hover:text-blue-800">
                      <MessageCircle className="w-4 h-4 mr-1" />
                      Contact
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </Layout>
  );
};

export default BookingHistory;
