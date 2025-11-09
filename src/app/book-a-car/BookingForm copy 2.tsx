import React, { useState } from 'react';
import {
  MapPin,
  Calendar,
  ArrowRight,
  ArrowDownUp,
  Users,
  Briefcase,
} from 'lucide-react';

// --- Type Definitions ---
interface BookingState {
  tripType: 'Oneway' | 'Round';
  pickupLocation: string;
  dropoffLocation: string;
  pickupCity: string;
  dropoffCity: string;
  pickupDate: Date;
  dropoffDate: Date | null;
  pickupTime: string;
  dropoffTime: string | null;
  adults: number;
  kids: number;
  suitcases: number;
}

// --- Helper Functions ---

/**
 * Formats date and time for display: e.g., "Sat, June 20 | 12:00"
 */
const formatDateForDisplay = (date: Date | null, time: string | null): string => {
  if (!date || !time) return '';
  const dayName = date.toLocaleDateString('en-US', { weekday: 'short' }); // Sat
  const monthName = date.toLocaleDateString('en-US', { month: 'long' }); // June
  const dayOfMonth = date.getDate(); // 20
  return `${dayName}, ${monthName} ${dayOfMonth} | ${time}`;
};

// --- Main Component ---

const AirportTransportationForm: React.FC = () => {
  const [bookingData, setBookingData] = useState<BookingState>({
    tripType: 'Round',
    pickupLocation: 'Punta Cana Intl Air..',
    dropoffLocation: 'Hotel King',
    pickupCity: 'Punta cana',
    dropoffCity: 'Punta cana',
    pickupDate: new Date(2025, 5, 20), // June 20th (month 5 is June)
    dropoffDate: new Date(2025, 5, 20),
    pickupTime: '12:00',
    dropoffTime: '12:00',
    adults: 1,
    kids: 2,
    suitcases: 2,
  });

  const handleTripTypeChange = (type: 'Oneway' | 'Round') => {
    setBookingData(prev => ({
      ...prev,
      tripType: type,
      // Clear dropoff fields if switching to Oneway
      dropoffDate: type === 'Round' ? prev.dropoffDate : null,
      dropoffTime: type === 'Round' ? prev.dropoffTime : null,
    }));
  };

  const handleSwapLocations = () => {
    setBookingData(prev => ({
      ...prev,
      pickupLocation: prev.dropoffLocation,
      dropoffLocation: prev.pickupLocation,
      pickupCity: prev.dropoffCity,
      dropoffCity: prev.pickupCity,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for cars with:', bookingData);
    // Add navigation or API call logic here
  };

  // --- Render Functions for Reusable Input Blocks ---

  /** Renders the location input block (e.g., Pick-up/Drop-off) */
  const renderLocationInput = (label: string, locationName: string, city: string, isPickup: boolean) => (
    <div className="flex flex-col gap-2 w-[326px]">
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <MapPin size={20} className="text-gray-600" />
        <span>{label}</span>
      </div>
      <div className="flex items-end gap-2">
        <h3 className="text-[28px] font-semibold tracking-[-0.02em] text-[#191919] truncate">
          {locationName}
        </h3>
        <span className="text-xs text-gray-500 mb-[2px]">{city}</span>
      </div>
    </div>
  );

  /** Renders the passenger/suitcase count block */
  const renderCountInput = (label: string, value: string, iconType: 'user' | 'suitcase') => (
    <div className="flex items-center bg-[#F4F7F9] rounded-xl p-4 gap-3 w-[220px] h-[68px]">
      <div className="w-8 h-8 flex items-center justify-center text-blue-900">
        {iconType === 'user' ? <Users size={32} /> : <Briefcase size={32} />}
      </div>
      <div className="flex flex-col">
        <span className="text-[13px] text-[#878D97] leading-4">{label}</span>
        <span className="text-sm font-normal text-[#191919] leading-5">{value}</span>
      </div>
    </div>
  );

  /** Renders the date/time input block */
  const renderDateTimeInput = (label: string, date: Date | null, time: string | null) => {
    const value = formatDateForDisplay(date, time);
    return (
      <div className="flex items-center bg-[#F4F7F9] rounded-xl p-4 gap-3 w-[236px] h-[68px]">
        <div className="w-8 h-8 flex items-center justify-center text-blue-900">
          <Calendar size={32} />
        </div>
        <div className="flex flex-col">
          <span className="text-[13px] text-[#878D97] leading-4">{label}</span>
          <span className="text-sm font-medium text-[#191919] leading-5">{value}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center p-0 gap-14 min-h-screen bg-black pt-20">
      {/* Header Section */}
      <div className="flex flex-col items-center gap-3 w-[991px] text-center text-white">
        <h1 className="text-7xl font-semibold leading-[68px]">
          Reliable Airport Transportation <br /> You Can Trust
        </h1>
        <p className="text-xl font-normal leading-6">
          Enjoy a smooth, private ride to and from the airport without any hassle.
        </p>
      </div>
      
      {/* Form Card */}
      <form onSubmit={handleSubmit} className="bg-white rounded-[24px] p-8 w-[1116px] max-w-[1116px] shadow-2xl">
        <div className="flex flex-col gap-6 w-full">
          
          {/* Trip Type Selection */}
          <div className="flex p-1 bg-[#EDF2F9] rounded-full w-[232px]">
            {['Oneway', 'Round'].map(type => (
              <button
                key={type}
                type="button"
                onClick={() => handleTripTypeChange(type as 'Oneway' | 'Round')}
                className={`px-3 py-2 text-sm leading-6 rounded-full transition-colors w-[112px] h-[40px]
                  ${bookingData.tripType === type
                    ? 'bg-[#EE2552] text-white font-medium'
                    : 'text-gray-600 font-normal'
                  }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Row 1: Locations and Passengers (separated by a horizontal rule) */}
          <div className="flex items-start justify-between">
            {/* Locations Group */}
            <div className="flex items-center gap-14">
              {renderLocationInput(
                "Pick-up location",
                bookingData.pickupLocation,
                bookingData.pickupCity,
                true
              )}

              {/* Swap Icon */}
              <button
                type="button"
                onClick={handleSwapLocations}
                className="bg-[#FAA523] p-[10px] rounded-full w-10 h-10 flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity mt-4"
              >
                <ArrowDownUp size={20} className="text-white rotate-90" />
              </button>

              {renderLocationInput(
                "Drop-of location",
                bookingData.dropoffLocation,
                bookingData.dropoffCity,
                false
              )}
            </div>

            {/* Passenger Input */}
            {renderCountInput(
              "Passenger",
              `${bookingData.adults} Adults, ${bookingData.kids} Kids`,
              'user'
            )}
          </div>
          
          <div className="border-t border-[#DADFE6] w-full" />

          {/* Row 2: Dates, Suitcases, and Search Button */}
          <div className="flex items-center gap-7">
            
            {/* Pickup Date/Time */}
            {renderDateTimeInput(
              "Pickup date",
              bookingData.pickupDate,
              bookingData.pickupTime
            )}

            {/* Drop-off Date/Time (Conditional for Round Trip) */}
            {bookingData.tripType === 'Round' && (
              renderDateTimeInput(
                "Drop of date",
                bookingData.dropoffDate,
                bookingData.dropoffTime
              )
            )}
            
            {/* Suitcase Quantity */}
            {renderCountInput(
              "Suitcase qty",
              `${bookingData.suitcases} pcs`,
              'suitcase'
            )}

            {/* Find Cars Button */}
            <button
              type="submit"
              className="flex items-center justify-center bg-[#EE2552] text-white rounded-xl px-14 py-5 font-medium text-lg leading-6 whitespace-nowrap h-[68px] w-[220px] hover:bg-red-600 transition-colors"
            >
              Find cars
              <ArrowRight size={24} className="ml-5" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AirportTransportationForm;