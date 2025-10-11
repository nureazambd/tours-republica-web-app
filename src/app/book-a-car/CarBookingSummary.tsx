"use client";
import { useState } from "react";
import Image from "next/image";
import { Star, ChevronLeft, Plus, Minus } from "lucide-react";

interface CarBookingSummaryProps {
  car: {
    id: number;
    name: string;
    image: string;
    brand: string;
    model: string;
    class: string;
    year: string;
    color: string;
    baggage: string;
    passengers: string;
    rating: number;
    reviews: number;
    rides: number;
    years: number;
  };
  onBack: () => void;
}

export default function CarBookingSummary({ car, onBack }: CarBookingSummaryProps) {
  const [services, setServices] = useState([
    { name: "Child seat for 9–18kg toddler", price: 15, qty: 1 },
    { name: "Booster seat for 15–30 kg child", price: 15, qty: 0 },
    { name: "GPS navigation system", price: 15, qty: 0 },
  ]);

  const handleQtyChange = (index: number, delta: number) => {
    setServices((prev) =>
      prev.map((s, i) =>
        i === index ? { ...s, qty: Math.max(0, s.qty + delta) } : s
      )
    );
  };

  const totalPrice =
    50 + services.reduce((acc, s) => acc + s.qty * s.price, 0);

  return (
    <div className="max-w-4xl mx-auto my-10 space-y-8">
      {/* Top Car Card */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="flex flex-col md:flex-row gap-6">
          <Image
            src={car.image}
            alt={car.name}
            width={300}
            height={200}
            className="rounded-xl object-cover"
          />
          <div className="flex-1">
            <div className="flex justify-between items-center">
              <span className="text-xs bg-sky-100 text-sky-700 px-3 py-1 rounded-full font-medium">
                Private
              </span>
              <p className="text-gray-600 text-sm">3h 30m</p>
            </div>

            <div className="mt-4 text-gray-800 space-y-1">
              <p className="font-semibold">Fri, Jan 24, 12:30 PM</p>
              <p>Hotel Saint, Punta Cana</p>
              <p className="mt-2 font-semibold">Mon, Jan 24, 04:00 PM</p>
              <p>Hotel King, Punta Cana</p>
            </div>

            <div className="flex flex-wrap gap-3 mt-5 text-sm text-gray-600">
              <span className="flex items-center gap-2">⚙️ Manual</span>
              <span className="flex items-center gap-2">🔌 Charger</span>
              <span className="flex items-center gap-2">📍 Driver Location</span>
              <span className="flex items-center gap-2">❄️ AC</span>
              <span className="flex items-center gap-2">💧 Free Water</span>
            </div>
          </div>
        </div>
      </div>

      {/* Vehicle & Driver Info */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="font-semibold text-lg mb-4">Vehicle & Driver info</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-3 text-sm text-gray-700">
          <div><strong>Brand:</strong> {car.brand}</div>
          <div><strong>Baggage:</strong> {car.baggage}</div>
          <div><strong>Model:</strong> {car.model}</div>
          <div><strong>Year:</strong> {car.year}</div>
          <div><strong>Class:</strong> {car.class}</div>
          <div><strong>Color:</strong> {car.color}</div>
          <div><strong>Passengers:</strong> {car.passengers}</div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-gray-700">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span>{car.rating} ({car.reviews})</span>
          </div>
          <div>Total Rides: {car.rides}</div>
          <div>Years: {car.years}</div>
          <div className="flex items-center gap-1">
            <span>Languages:</span>
            <span>🇬🇧 🇮🇹 🇪🇸</span>
          </div>
        </div>
      </div>

      {/* Additional Service */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="font-semibold text-lg mb-4">Additional service</h3>
        <div className="space-y-4 text-sm">
          {services.map((s, i) => (
            <div
              key={i}
              className="flex justify-between items-center border-b pb-2 last:border-none"
            >
              <div>
                <p>{s.name}</p>
                <p className="text-gray-500">US +${s.price}</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleQtyChange(i, -1)}
                  className="border rounded-full w-6 h-6 flex items-center justify-center hover:bg-gray-100"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span>{s.qty}</span>
                <button
                  onClick={() => handleQtyChange(i, 1)}
                  className="border rounded-full w-6 h-6 flex items-center justify-center hover:bg-gray-100"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="flex flex-col md:flex-row justify-between items-center mt-8">
        <div className="text-gray-700 text-lg">
          <p className="text-sm">Total Payable</p>
          <p className="font-bold text-2xl text-gray-900">US$ {totalPrice}</p>
          <p className="text-xs text-gray-500">Includes all taxes</p>
        </div>

        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
          >
            <ChevronLeft className="w-4 h-4" /> Back
          </button>
          <button className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-3 rounded-full font-semibold transition">
            Book →
          </button>
        </div>
      </div>
    </div>
  );
}
