'use-client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Calendar,
  MapPin,
  Users,
  Download,
  MessageCircle,
  Car,
  Plane,
  AlertCircle,
} from 'lucide-react';

// Interfaces for booking types
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
  const [error, setError] = useState<string | null>(null);
  const [allBookings, setAllBookings] = useState<Booking[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/login');
          return;
        }

        const res = await fetch('/api/user-bookings', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 401) {
            setError("Your session has expired. Please log in again.");
            localStorage.removeItem('token'); // Clear the expired token
            return;
        }

        if (!res.ok) {
          throw new Error('Failed to fetch your bookings. Please try again later.');
        }

        const data = await res.json();

        // Add a 'type' property to each booking to easily distinguish them
        const carsWithType = (data.carBookings || []).map((b: any) => ({ ...b, type: 'car' })) as CarBooking[];
        const toursWithType = (data.tourBookings || []).map((b: any) => ({ ...b, type: 'tour' })) as TourBooking[];

        // Combine, sort, and set all bookings in one state
        const combinedBookings = [...carsWithType, ...toursWithType].sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        
        setAllBookings(combinedBookings);

      } catch (err: any) {
        console.error(err);
        setError(err.message || "An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [router]);

  // Type guards to help TypeScript understand the booking type inside the map function
  const isCarBooking = (booking: Booking): booking is CarBooking => booking.type === 'car';

  const renderStatus = (status: string) => {
    const statusClasses = {
      paid: 'bg-green-100 text-green-700',
      pending: 'bg-yellow-100 text-yellow-700',
      cancelled: 'bg-red-100 text-red-700',
      default: 'bg-gray-100 text-gray-700',
    };
    const color = statusClasses[status as keyof typeof statusClasses] || statusClasses.default;
    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${color}`}>
        {status}
      </span>
    );
  };

  if (loading) {
    return <div className="p-10 text-center text-gray-500">Loading your bookings...</div>;
  }

  if (error) {
    return (
      <div className="p-10 text-center text-red-600 bg-red-50 rounded-lg flex items-center justify-center">
        <AlertCircle className="w-6 h-6 mr-2" />
        {error}
      </div>
    );
  }

  if (allBookings.length === 0) {
    return <div className="p-10 text-center text-gray-500">You have no bookings yet.</div>;
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Booking History</h2>
      <div className="space-y-6">
        {allBookings.map((booking) => (
          <div
            key={booking._id}
            className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="w-20 h-20 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                {isCarBooking(booking) ? (
                  <Car className="w-8 h-8 text-blue-600" />
                ) : (
                  <Plane className="w-8 h-8 text-orange-600" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row justify-between mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {isCarBooking(booking) ? booking.carSnapshot.name : booking.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {isCarBooking(booking) ? booking.carSnapshot.type : booking.location}
                    </p>
                  </div>
                  <div className="mt-2 sm:mt-0">
                     {renderStatus(booking.paymentStatus)}
                  </div>
                </div>
                <div className="text-sm text-gray-600 grid grid-cols-1 sm:grid-cols-3 gap-2 my-3">
                  <div className="flex items-center space-x-2"><Calendar className="w-4 h-4" /><span>{new Date(booking.createdAt).toLocaleDateString()}</span></div>
                  <div className="flex items-center space-x-2"><MapPin className="w-4 h-4" /><span>{booking.pickupPlace || 'N/A'}</span></div>
                  <div className="flex items-center space-x-2"><Users className="w-4 h-4" /><span>{booking.paymentMethod.toUpperCase()}</span></div>
                </div>
                <div className="flex flex-col sm:flex-row justify-between items-center mt-4">
                  <p className="font-bold text-lg text-gray-800">${booking.total.toFixed(2)}</p>
                  <div className="flex items-center space-x-3 mt-3 sm:mt-0">
                    <button className="flex items-center text-sm text-gray-600 hover:text-gray-800"><Download className="w-4 h-4 mr-1" />Receipt</button>
                    <button className="flex items-center text-sm text-blue-600 hover:text-blue-800"><MessageCircle className="w-4 h-4 mr-1" />Contact</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingHistory;
