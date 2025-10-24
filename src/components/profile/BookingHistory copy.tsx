'use client';

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
  ChevronDown,
  ChevronUp,
  Clock,
  Mail,
  Phone,
  Building2,
  XCircle,
  RotateCcw,
} from 'lucide-react';
import clsx from 'clsx';

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
    phone?: string;
  };
  supplier?: string;
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
  traveler?: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
  };
  supplier?: string;
  createdAt: string;
}

type Booking = CarBooking | TourBooking;

const BookingHistory = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [allBookings, setAllBookings] = useState<Booking[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);
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
          setError('Your session has expired. Please log in again.');
          localStorage.removeItem('token');
          return;
        }

        if (!res.ok) {
          throw new Error('Failed to fetch your bookings. Please try again later.');
        }

        const data = await res.json();

        const carsWithType = (data.carBookings || []).map((b: any) => ({
          ...b,
          type: 'car',
        })) as CarBooking[];

        const toursWithType = (data.tourBookings || []).map((b: any) => ({
          ...b,
          type: 'tour',
        })) as TourBooking[];

        const combinedBookings = [...carsWithType, ...toursWithType].sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        setAllBookings(combinedBookings);
      } catch (err: any) {
        setError(err.message || 'An unexpected error occurred.');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [router]);

  const isCarBooking = (b: Booking): b is CarBooking => b.type === 'car';

  const renderStatus = (status: string) => {
    const color =
      status === 'paid'
        ? 'bg-green-100 text-green-700 border border-green-200'
        : status === 'pending'
        ? 'bg-yellow-100 text-yellow-700 border border-yellow-200'
        : status === 'cancelled'
        ? 'bg-red-100 text-red-700 border border-red-200'
        : 'bg-gray-100 text-gray-700 border border-gray-200';
    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${color}`}>
        {status}
      </span>
    );
  };

  const toggleExpand = (id: string) => setExpanded((prev) => (prev === id ? null : id));

  const handleCancel = (id: string, type: string) => {
    alert(`Cancel ${type} ID: ${id}`);
  };

  const handleDownload = (id: string, type: string) => {
    alert(`Download ticket for ${type} ID: ${id}`);
  };

  const handleReschedule = (id: string, type: string) => {
    alert(`Reschedule ${type} ID: ${id}`);
  };

  if (loading)
    return <div className="p-10 text-center text-gray-500">Loading your bookings...</div>;

  if (error)
    return (
      <div className="p-10 text-center text-red-600 bg-red-50 rounded-lg flex items-center justify-center">
        <AlertCircle className="w-6 h-6 mr-2" />
        {error}
      </div>
    );

  if (allBookings.length === 0)
    return <div className="p-10 text-center text-gray-500">You have no bookings yet.</div>;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Booking History</h2>
      <div className="space-y-6">
        {allBookings.map((booking) => {
          const expandedView = expanded === booking._id;
          const traveler = isCarBooking(booking)
            ? booking.traveler
            : booking.traveler || {
                firstName: 'Cynthia',
                lastName: 'Fleming',
                email: 'melvinvillavicencio@gmail.com',
                phone: '+1 8296185692',
              };

          return (
            <div
              key={booking._id}
              className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all duration-200"
            >
              {/* Summary Header */}
              <div
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between cursor-pointer"
                onClick={() => toggleExpand(booking._id)}
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center">
                    {isCarBooking(booking) ? (
                      <Car className="w-8 h-8 text-blue-600" />
                    ) : (
                      <Plane className="w-8 h-8 text-orange-600" />
                    )}
                  </div>
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
                </div>

                <div className="flex items-center gap-3 mt-4 sm:mt-0">
                  {renderStatus(booking.paymentStatus)}
                  {expandedView ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </div>
              </div>

              {/* Collapsible Detail Section */}
              <div
                className={clsx(
                  'transition-all overflow-hidden duration-300 ease-in-out',
                  expandedView ? 'max-h-[600px] mt-6' : 'max-h-0'
                )}
              >
                <div className="bg-gray-50 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">
                    Travel Details
                  </h4>

                  {/* Passenger Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-700">
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-blue-600" />
                      <span>
                        <strong>Passenger Name:</strong> {traveler.firstName}{' '}
                        {traveler.lastName}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-blue-600" />
                      <span>
                        <strong>Email:</strong> {traveler.email}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-blue-600" />
                      <span>
                        <strong>Phone:</strong> {traveler.phone || '+1 8296185692'}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Building2 className="w-4 h-4 text-blue-600" />
                      <span>
                        <strong>Supplier Data:</strong>{' '}
                        {booking.supplier || 'OTIUM INTERNATIONAL DMC'}
                      </span>
                    </div>
                  </div>

                  {/* Booking Timestamp */}
                  <div className="flex items-center mt-4 text-gray-600 space-x-2 text-sm">
                    <Clock className="w-4 h-4" />
                    <span>
                      Booked on {new Date(booking.createdAt).toLocaleString()}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center gap-3 mt-6">
                    <button
                      onClick={() =>
                        handleCancel(
                          booking._id,
                          isCarBooking(booking) ? 'ride' : 'booking'
                        )
                      }
                      className="flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-lg text-sm hover:bg-red-200 transition"
                    >
                      <XCircle className="w-4 h-4" />
                      {isCarBooking(booking) ? 'Cancel Ride' : 'Cancel Booking'}
                    </button>

                    <button
                      onClick={() =>
                        handleDownload(
                          booking._id,
                          isCarBooking(booking) ? 'ride' : 'booking'
                        )
                      }
                      className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-200 transition"
                    >
                      <Download className="w-4 h-4" />
                      Download Ticket
                    </button>

                    <button
                      onClick={() =>
                        handleReschedule(
                          booking._id,
                          isCarBooking(booking) ? 'ride' : 'booking'
                        )
                      }
                      className="flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-lg text-sm hover:bg-blue-200 transition"
                    >
                      <RotateCcw className="w-4 h-4" />
                      {isCarBooking(booking)
                        ? 'Reschedule Ride'
                        : 'Reschedule Booking'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BookingHistory;
