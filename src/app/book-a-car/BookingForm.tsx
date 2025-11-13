import React, { useState } from 'react';
import {
  MapPin,
  Calendar,
  ArrowRight,
  ArrowDownUp,
  Users,
  Briefcase,
} from 'lucide-react';


const BriefcaseIcon: React.FC = () => (
  <svg
    width="32"
    height="36"
    viewBox="0 0 32 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_829_2792)">
      <path
        d="M11.5 3H20.5M13 3V12M19 3V12M10.75 30.75V33H11.5V30.75M21.25 30.75V33H20.5V30.75M13 16.5V26.25M19 16.5V26.25M22 12H10C9.20435 12 8.44129 12.3161 7.87868 12.8787C7.31607 13.4413 7 14.2044 7 15V27.75C7 28.5457 7.31607 29.3087 7.87868 29.8713C8.44129 30.4339 9.20435 30.75 10 30.75H22C22.7957 30.75 23.5587 30.4339 24.1213 29.8713C24.6839 29.3087 25 28.5457 25 27.75V15C25 14.2044 24.6839 13.4413 24.1213 12.8787C23.5587 12.3161 22.7957 12 22 12Z"
        stroke="#003459"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_829_2792">
        <rect width="32" height="32" fill="white" transform="translate(0 2)" />
      </clipPath>
    </defs>
  </svg>
);

const CalendarIcon: React.FC = () => (
  <svg
    width="32"
    height="36"
    viewBox="0 0 32 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4.12354 14.5386H27.8888"
      stroke="#003459"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M21.9229 19.7457H21.9353"
      stroke="#003459"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16.006 19.7457H16.0183"
      stroke="#003459"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10.0772 19.7457H10.0896"
      stroke="#003459"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M21.9229 24.9292H21.9353"
      stroke="#003459"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16.006 24.9292H16.0183"
      stroke="#003459"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10.0772 24.9292H10.0896"
      stroke="#003459"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M21.3915 4.66602V9.05372"
      stroke="#003459"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10.6205 4.66602V9.05372"
      stroke="#003459"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M21.651 6.77148H10.3613C6.4457 6.77148 4 8.95273 4 12.9622V25.0284C4 29.1009 6.4457 31.3326 10.3613 31.3326H21.6387C25.5666 31.3326 28 29.1387 28 25.1292V12.9622C28.0123 8.95273 25.579 6.77148 21.651 6.77148Z"
      stroke="#003459"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);


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
        {iconType === 'user' ? <svg
          width="32"
          height="36"
          viewBox="0 0 32 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21.3674 29.4278L21.3678 25.1428C21.368 22.7758 19.4493 20.857 17.0824 20.857H7.48608C5.11951 20.857 3.20094 22.7753 3.20068 25.1419L3.2002 29.4278M28.7998 29.428L28.8002 25.143C28.8004 22.7761 26.8817 20.8572 24.5148 20.8572M20.542 7.41414C21.5944 8.19499 22.2764 9.4468 22.2764 10.8579C22.2764 12.269 21.5944 13.5208 20.542 14.3017M16.6586 10.8577C16.6586 13.2244 14.74 15.1431 12.3732 15.1431C10.0064 15.1431 8.08778 13.2244 8.08778 10.8577C8.08778 8.49091 10.0064 6.57227 12.3732 6.57227C14.74 6.57227 16.6586 8.49091 16.6586 10.8577Z"
            stroke="#003459"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
          : <BriefcaseIcon />}
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
          {/* <Calendar size={32} /> */}
          <CalendarIcon />

        </div>
        <div className="flex flex-col">
          <span className="text-[13px] text-[#878D97] leading-4">{label}</span>
          <span className="text-sm font-medium text-[#191919] leading-5">{value}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center p-0 gap-14 min-h-screen ">
      {/* Header Section */}
      <div className="flex flex-col items-center gap-3 w-[991px] text-center text-white">
        <h1 className="text-4xl font-[Rubik]
    font-medium
    text-[40px] md:text-[64px]
    leading-[44px] md:leading-[68px]
    tracking-[0]
    text-center
    align-middle
    mb-4">
          Reliable Airport Transportation <br /> You Can Trust
        </h1>
        <p className="text-[20px] font-[400] opacity-90">
          Enjoy a smooth, private ride to and from the airport without any hassle.
        </p>
      </div>

      {/* Form Card */}
      <form onSubmit={handleSubmit} className="bg-white rounded-[24px] p-8 w-[1116px] max-w-[1116px] shadow">
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
          <div className="flex items-start text-left justify-between">
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
          <div className="flex items-center text-left gap-7">

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
            {/* <button
              type="submit"
              className="flex items-center justify-center bg-[#EE2552] text-white rounded-xl px-14 py-5 font-medium text-lg leading-6 whitespace-nowrap h-[68px] w-[220px] hover:bg-red-600 transition-colors"
            >
              Find cars
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

            </button> */}
            <button
              type="submit"
              className="
    flex items-center justify-center 
    bg-[#EE2552] text-white 
    rounded-[16px] 
    px-[6px] py-[12px]
    gap-[20px]
    w-[220px] h-[68px]
    font-rubik font-medium text-[18px] leading-[24px]
    transition-colors hover:bg-[#d82047]
  "
            >
              Find cars
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 12H19M19 12L12 5M19 12L12 19"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

          </div>
        </div>
      </form>
    </div>
  );
};

export default AirportTransportationForm;