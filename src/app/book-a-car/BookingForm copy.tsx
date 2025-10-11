import React, { useState } from "react";
import {
  MapPin,
  Users,
  CalendarDays,
  Clock,
  Briefcase,
  ArrowRightLeft,
} from "lucide-react";

export default function BookingForm() {
  // States
  const [tripType, setTripType] = useState("Round");
  const [pickupLocation, setPickupLocation] = useState("Punta Cana Intl Airport");
  const [dropoffLocation, setDropoffLocation] = useState("Hotel King");
  const [passengers, setPassengers] = useState("1 Adults, 2 Kids");

  const [pickupDate, setPickupDate] = useState("2025-09-12");
  const [pickupTime, setPickupTime] = useState("12:00");
  const [dropoffDate, setDropoffDate] = useState("2025-09-13");
  const [dropoffTime, setDropoffTime] = useState("14:30");

  const [suitcaseQty, setSuitcaseQty] = useState(2);

  const handleSubmit = () => {
    const data = {
      tripType,
      pickupLocation,
      dropoffLocation,
      passengers,
      pickupDateTime: `${pickupDate} ${pickupTime}`,
      dropoffDateTime: `${dropoffDate} ${dropoffTime}`,
      suitcaseQty,
    };
    console.log("🚗 Booking submitted:", data);
    alert("Booking data submitted!");
  };

  return (
    <section className="bg-white shadow-xl rounded-xl -mt-44 max-w-5xl mx-auto px-6 py-8 relative z-20">
      {/* Trip Type Toggle */}
      <div className="flex space-x-4 mb-6">
        {["Oneway", "Round"].map((type) => (
          <button
            key={type}
            onClick={() => setTripType(type)}
            className={`px-4 py-2 rounded-full ${
              tripType === type
                ? "bg-rose-500 text-white"
                : "bg-gray-100 text-gray-700"
            } font-medium`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Pickup, Dropoff, Passengers */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
        {/* Pickup Location */}
        <div>
          <p className="text-sm text-gray-500 mb-1">Pick-up location</p>
          <div className="flex items-center border px-3 py-2 rounded-md">
            <MapPin className="w-4 h-4 text-gray-400 mr-2" />
            <input
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
              className="w-full outline-none text-sm"
            />
          </div>
        </div>

        {/* Swap Arrow */}
        <div className="hidden md:flex justify-center">
          <ArrowRightLeft className="w-5 h-5 text-yellow-500" />
        </div>

        {/* Drop-off Location */}
        <div>
          <p className="text-sm text-gray-500 mb-1">Drop-off location</p>
          <div className="flex items-center border px-3 py-2 rounded-md">
            <MapPin className="w-4 h-4 text-gray-400 mr-2" />
            <input
              value={dropoffLocation}
              onChange={(e) => setDropoffLocation(e.target.value)}
              className="w-full outline-none text-sm"
            />
          </div>
        </div>

        {/* Passengers */}
        <div className="col-span-2 md:col-span-1">
          <p className="text-sm text-gray-500 mb-1">Passengers</p>
          <div className="flex items-center border px-3 py-2 rounded-md">
            <Users className="w-4 h-4 text-gray-400 mr-2" />
            <input
              value={passengers}
              onChange={(e) => setPassengers(e.target.value)}
              className="w-full outline-none text-sm"
            />
          </div>
        </div>
      </div>

      <hr className="my-6" />

      {/* Pickup & Dropoff Date/Time + Suitcase + Submit */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Pickup Date & Time */}
        <div className="lg:col-span-2">
          <p className="text-sm text-gray-500 mb-1">Pickup date & time</p>
          <div className="flex flex-col sm:flex-row gap-2">
            {/* Date */}
            <div className="flex items-center border px-3 py-2 rounded-md w-full">
              <CalendarDays className="w-4 h-4 text-gray-400 mr-2" />
              <input
                type="date"
                className="w-full outline-none text-sm text-gray-700"
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
              />
            </div>

            {/* Time */}
            <div className="flex items-center border px-3 py-2 rounded-md w-full min-w-[150px]">
              <Clock className="w-4 h-4 text-gray-400 mr-2" />
              <input
                type="time"
                className="w-full outline-none text-sm text-gray-700"
                value={pickupTime}
                onChange={(e) => setPickupTime(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Dropoff Date & Time */}
        <div className="lg:col-span-2">
          <p className="text-sm text-gray-500 mb-1">Drop-off date & time</p>
          <div className="flex flex-col sm:flex-row gap-2">
            {/* Date */}
            <div className="flex items-center border px-3 py-2 rounded-md w-full">
              <CalendarDays className="w-4 h-4 text-gray-400 mr-2" />
              <input
                type="date"
                className="w-full outline-none text-sm text-gray-700"
                value={dropoffDate}
                onChange={(e) => setDropoffDate(e.target.value)}
              />
            </div>

            {/* Time */}
            <div className="flex items-center border px-3 py-2 rounded-md w-full min-w-[150px]">
              <Clock className="w-4 h-4 text-gray-400 mr-2" />
              <input
                type="time"
                className="w-full outline-none text-sm text-gray-700"
                value={dropoffTime}
                onChange={(e) => setDropoffTime(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Suitcase & Button */}
        {/* <div className="flex flex-col justify-between"> */}
          {/* Suitcase Qty */}
          <div className="flex flex-col sm:flex-row gap-2">
          <div>
            <p className="text-sm text-gray-500 mb-1">Suitcase qty</p>
             <div className="flex flex-col sm:flex-row gap-2">
            <div className="flex items-center border px-3 py-2 rounded-md">
              <Briefcase className="w-4 h-4 text-gray-400 mr-2" />
              <input
                type="number"
                min="0"
                className="w-full min-w-[30px] outline-none text-sm"
                value={suitcaseQty}
                onChange={(e) => setSuitcaseQty(Number(e.target.value))}
              />
            </div>
            {/* Submit */}
          <div className="mt-4 lg:mt-0">
            <button
              onClick={handleSubmit}
              className="w-full min-w-[100px] bg-rose-500 hover:bg-rose-600 text-white font-semibold py-2 rounded-md transition"
            >
              Find Cars
            </button>
          </div>
          </div>
          </div>

          
        </div>
      </div>
    </section>
  );
}
