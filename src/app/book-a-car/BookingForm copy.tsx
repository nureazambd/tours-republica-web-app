"use client";

import React, { useState } from "react";
import BookingLocationInput from "./BookingLocationInput";
import CarBookingSummary from "./CarBookingSummary";

import {
  Users,
  CalendarDays,
  Clock,
  Briefcase,
  ArrowRightLeft,
  Star,
} from "lucide-react";
import Image from "next/image";

// Mock Car Data
const carsData = [
  {
    id: 1,
    name: "Toyota Corolla, 2023",
    type: "Economy",
    capacity: "Up to 4",
    luggage: "x4",
    price: 152,
    rating: 4.8,
    image: "/cars/corolla-silver.png",
  },
  {
    id: 2,
    name: "Mercedes-Benz E-Class, 2019",
    type: "Comfort",
    capacity: "Up to 4",
    luggage: "x4",
    price: 120,
    rating: 4.9,
    image: "/cars/mercedes.png",
  },
  {
    id: 3,
    name: "Volkswagen Sharan, 2017",
    type: "Van",
    capacity: "Up to 6",
    luggage: "x5",
    price: 148,
    rating: 4.7,
    image: "/cars/volkswagen.png",
  },
  {
    id: 4,
    name: "Tesla Model S, 2020",
    type: "Luxury",
    capacity: "Up to 3",
    luggage: "x3",
    price: 220,
    rating: 4.9,
    image: "/cars/tesla.png",
  },
];

export default function BookingForm() {
  const [tripType, setTripType] = useState("Round");
  const [pickupLocation, setPickupLocation] = useState("Punta Cana Intl Airport");
  const [dropoffLocation, setDropoffLocation] = useState("Hotel King");
  const [passengers, setPassengers] = useState("1 Adults, 2 Kids");
  const [pickupDate, setPickupDate] = useState("2025-09-12");
  const [pickupTime, setPickupTime] = useState("12:00");
  const [dropoffDate, setDropoffDate] = useState("2025-09-13");
  const [dropoffTime, setDropoffTime] = useState("14:30");
  const [suitcaseQty, setSuitcaseQty] = useState(2);
  const [showCars, setShowCars] = useState(false);

  const [selectedCar, setSelectedCar] = useState<any>(null);

  const handleSubmit = () => {
    const bookingData = {
      tripType,
      pickupLocation,
      dropoffLocation,
      passengers,
      pickupDateTime: `${pickupDate} ${pickupTime}`,
      dropoffDateTime: `${dropoffDate} ${dropoffTime}`,
      suitcaseQty,
    };
    console.log("🚗 Booking Submitted:", bookingData);
    setShowCars(true);
  };

  return (
    <div className="pb-20">
      {/* ========== Booking Form ========== */}
      <section className="bg-white shadow-xl rounded-xl -mt-44 max-w-5xl mx-auto px-6 py-8 relative z-20">
        {/* Trip Type */}
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

        {/* Locations & Passengers */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
          <BookingLocationInput
            label="Pick-up location"
            value={pickupLocation}
            onChange={setPickupLocation}
          />

          <div className="hidden md:flex justify-center">
            <ArrowRightLeft className="w-5 h-5 text-yellow-500" />
          </div>

          <BookingLocationInput
            label="Drop-off location"
            value={dropoffLocation}
            onChange={setDropoffLocation}
          />

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

        {/* Dates & Times */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          <div className="lg:col-span-2">
            <p className="text-sm text-gray-500 mb-1">Pickup date & time</p>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="flex items-center border px-3 py-2 rounded-md w-full">
                <CalendarDays className="w-4 h-4 text-gray-400 mr-2" />
                <input
                  type="date"
                  className="w-full outline-none text-sm text-gray-700"
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                />
              </div>

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

          <div className="lg:col-span-2">
            <p className="text-sm text-gray-500 mb-1">Drop-off date & time</p>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="flex items-center border px-3 py-2 rounded-md w-full">
                <CalendarDays className="w-4 h-4 text-gray-400 mr-2" />
                <input
                  type="date"
                  className="w-full outline-none text-sm text-gray-700"
                  value={dropoffDate}
                  onChange={(e) => setDropoffDate(e.target.value)}
                />
              </div>

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

          <div>
            <p className="text-sm text-gray-500 mb-1">Suitcase qty</p>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="flex items-center border px-3 py-2 rounded-md">
                <Briefcase className="w-4 h-4 text-gray-400 mr-2" />
                <input
                  type="number"
                  min="0"
                  className="w-full outline-none text-sm"
                  value={suitcaseQty}
                  onChange={(e) => setSuitcaseQty(Number(e.target.value))}
                />
              </div>

              <button
                onClick={handleSubmit}
                className="w-full min-w-[100px] bg-rose-500 hover:bg-rose-600 text-white font-semibold py-2 rounded-md transition"
              >
                Find Cars
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========== Car List ========== */}
      {showCars && (
        <section className="max-w-7xl mx-auto mt-10 grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Filters */}
          <aside className="bg-white p-5 rounded-xl shadow-sm space-y-6 md:col-span-1 h-fit">
            <div>
              <h3 className="font-semibold mb-2">Passengers</h3>
              <ul className="space-y-1 text-sm">
                <li><input type="checkbox" /> <span className="ml-2">1–4</span></li>
                <li><input type="checkbox" /> <span className="ml-2">4–6</span></li>
                <li><input type="checkbox" /> <span className="ml-2">More than 7</span></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Transmission</h3>
              <ul className="space-y-1 text-sm">
                <li><input type="checkbox" /> <span className="ml-2">Manual</span></li>
                <li><input type="checkbox" /> <span className="ml-2">Automatic</span></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">User Reviews</h3>
              <ul className="space-y-1 text-sm">
                {[5, 4, 3].map((star) => (
                  <li key={star} className="flex items-center gap-1">
                    <input type="checkbox" />
                    <span className="flex items-center">
                      {Array(star)
                        .fill(0)
                        .map((_, i) => (
                          <Star
                            key={i}
                            className="w-3 h-3 text-yellow-400 fill-yellow-400"
                          />
                        ))}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Car List */}
          <div className="md:col-span-3">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">{carsData.length} cars found</h2>
              <select className="border rounded-lg px-3 py-2 text-sm">
                <option>Sort by</option>
                <option>Lowest Price</option>
                <option>Highest Price</option>
              </select>
            </div>

            <div className="space-y-4">
              {carsData.map((car) => (
                <div
                  key={car.id}
                  className="bg-white p-4 rounded-xl shadow-sm flex flex-col md:flex-row items-center justify-between border border-gray-100 hover:shadow-md transition"
                >
                  <div className="flex items-center gap-4">
                    <Image
                      src={car.image}
                      alt={car.name}
                      width={120}
                      height={80}
                      className="rounded-lg"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900">{car.name}</h3>
                      <p className="text-sm text-gray-500">{car.type}</p>
                      <div className="flex items-center gap-3 mt-1 text-gray-600 text-xs">
                        <span>👥 {car.capacity}</span>
                        <span>🧳 {car.luggage}</span>
                      </div>
                      <div className="flex items-center mt-2 text-yellow-400">
                        {Array(5)
                          .fill(0)
                          .map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.round(car.rating)
                                  ? "fill-yellow-400"
                                  : "fill-gray-200"
                              }`}
                            />
                          ))}
                        <span className="ml-1 text-gray-600 text-sm">
                          {car.rating} Ratings
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right mt-3 md:mt-0">
                    <p className="text-gray-700 text-sm">US$</p>
                    <p className="text-2xl font-bold text-gray-900">
                      ${car.price}
                    </p>
                    {/* <button className="mt-3 bg-rose-500 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-rose-600">
                      Book →
                    </button> */}
                    <button
  onClick={() => setSelectedCar(car)}
  className="mt-3 bg-rose-500 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-rose-600"
>
  Book →
</button>

                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {selectedCar && (
  <CarBookingSummary
    car={selectedCar}
    onBack={() => setSelectedCar(null)}
  />
)}

    </div>
  );
}
