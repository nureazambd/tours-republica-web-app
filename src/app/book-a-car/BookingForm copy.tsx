"use client";
import React, { useState } from "react";
import {
  MapPin,
  Users,
  CalendarDays,
  Clock,
  Briefcase,
  ArrowRightLeft,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function BookingForm() {
  const router = useRouter();

  // States
  const [tripType, setTripType] = useState("Round");
  const [pickupLocation, setPickupLocation] = useState("Punta Cana Intl Airport");
  const [dropoffLocation, setDropoffLocation] = useState("Hotel King");
  const [passengers, setPassengers] = useState("4");
  const [pickupDate, setPickupDate] = useState("2025-09-12");
  const [pickupTime, setPickupTime] = useState("12:00");
  const [dropoffDate, setDropoffDate] = useState("2025-09-13");
  const [dropoffTime, setDropoffTime] = useState("14:30");
  const [suitcaseQty, setSuitcaseQty] = useState(2);

  const handleSubmit = () => {
    const query = new URLSearchParams({
      pickupLocation,
      dropoffLocation,
      passengers,
      pickupDate,
      pickupTime,
      dropoffDate,
      dropoffTime,
      tripType,
      suitcaseQty: suitcaseQty.toString(),
    }).toString();

    router.push(`/car-booking?${query}`);
  };

  const locationOptions = [
    "Leonardo London, Punta Cana, Dominican Republic",
    "Amber Residence Hotel, Punta Cana, Dominican Republic",
    "STN - London, UK, Punta Cana, Dominican Republic",
    "Four Seasons Hotel, Punta Cana, Dominican Republic",
    "Punta Cana Intl Airport",
    "Hotel King",
  ];

  return (
    <section className="bg-white shadow-xl rounded-xl -mt-44 max-w-5xl mx-auto px-6 py-8 relative z-20">
      {/* Trip Type Toggle */}
      <div className="flex space-x-4 mb-6">
        {["Oneway", "Round"].map((type) => (
          <button
            key={type}
            onClick={() => setTripType(type)}
            className={`px-4 py-2 rounded-full ${
              tripType === type ? "bg-rose-500 text-white" : "bg-gray-100 text-gray-700"
            } font-medium`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
        <div>
          <p className="text-sm text-gray-500 mb-1">Pick-up location</p>
          <div className="flex items-center border px-3 py-2 rounded-md">
            <MapPin className="w-4 h-4 text-gray-400 mr-2" />
            {/* <input
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
              className="w-full outline-none text-sm"
            /> */}
            <select
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
              className="w-full outline-none text-sm bg-transparent"
            >
              {locationOptions.map((loc, i) => (
                <option key={i} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="hidden md:flex justify-center">
          <ArrowRightLeft className="w-5 h-5 text-yellow-500" />
        </div>

        <div>
          <p className="text-sm text-gray-500 mb-1">Drop-off location</p>
          <div className="flex items-center border px-3 py-2 rounded-md">
            <MapPin className="w-4 h-4 text-gray-400 mr-2" />
            {/* <input
              value={dropoffLocation}
              onChange={(e) => setDropoffLocation(e.target.value)}
              className="w-full outline-none text-sm"
            /> */}
            <select
              value={dropoffLocation}
              onChange={(e) => setDropoffLocation(e.target.value)}
              className="w-full outline-none text-sm bg-transparent"
            >
              {locationOptions.map((loc, i) => (
                <option key={i} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="col-span-2 md:col-span-1">
          <p className="text-sm text-gray-500 mb-1">Passengers</p>
          <div className="flex items-center border px-3 py-2 rounded-md">
            <Users className="w-4 h-4 text-gray-400 mr-2" />
            <input
              type="number"
              value={passengers}
              onChange={(e) => setPassengers(e.target.value)}
              className="w-full outline-none text-sm"
            />
          </div>
        </div>
      </div>

      <hr className="my-6" />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <div className="lg:col-span-2">
          <p className="text-sm text-gray-500 mb-1">Pickup date & time</p>
          <div className="flex gap-2">
            <input
              type="date"
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              className="border px-3 py-2 rounded-md w-full"
            />
            <input
              type="time"
              value={pickupTime}
              onChange={(e) => setPickupTime(e.target.value)}
              className="border px-3 py-2 rounded-md w-full"
            />
          </div>
        </div>

        <div className="lg:col-span-2">
          <p className="text-sm text-gray-500 mb-1">Drop-off date & time</p>
          <div className="flex gap-2">
            <input
              type="date"
              value={dropoffDate}
              onChange={(e) => setDropoffDate(e.target.value)}
              className="border px-3 py-2 rounded-md w-full"
            />
            <input
              type="time"
              value={dropoffTime}
              onChange={(e) => setDropoffTime(e.target.value)}
              className="border px-3 py-2 rounded-md w-full"
            />
          </div>
        </div>

        <div>
          <p className="text-sm text-gray-500 mb-1">Suitcase qty</p>
          <div className="flex gap-2">
            <input
              type="number"
              value={suitcaseQty}
              onChange={(e) => setSuitcaseQty(Number(e.target.value))}
              className="border px-3 py-2 rounded-md w-full"
            />
            <button
              onClick={handleSubmit}
              className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-md font-semibold"
            >
              Find Cars
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
