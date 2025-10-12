// src/components/car/CarBookingSummary.tsx
"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Star, ChevronLeft, Plus, Minus } from "lucide-react";

export default function CarBookingSummary({
  car,
  onBack,
}: {
  car: any;
  onBack?: () => void;
}) {
  const [services, setServices] = useState([
    { name: "Child seat for 9–18kg toddler", price: 15, qty: 1 },
    { name: "Booster seat for 15–30 kg child", price: 15, qty: 0 },
    { name: "GPS navigation system", price: 15, qty: 0 },
  ]);

  const handleQtyChange = (index: number, delta: number) =>
    setServices((prev) => prev.map((s, i) => (i === index ? { ...s, qty: Math.max(0, s.qty + delta) } : s)));

  const totalPrice =
    (car?.price || 0) + services.reduce((acc, s) => acc + s.qty * s.price, 0);

  return (
    <div className="max-w-4xl mx-auto my-10 space-y-8">
      <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="flex flex-col md:flex-row gap-6">
          <Image src={car?.image || "/images/cars/placeholder.png"} alt={car?.name || "Car"} width={300} height={200} className="rounded-xl object-cover" />
          <div className="flex-1">
            <div className="flex justify-between items-center">
              <span className="text-xs bg-sky-100 text-sky-700 px-3 py-1 rounded-full font-medium">
                Private
              </span>
              <p className="text-gray-600 text-sm">—</p>
            </div>

            <div className="mt-4 text-gray-800 space-y-1">
              <p className="font-semibold">{car?.name}</p>
              <p className="text-sm">{car?.description}</p>
              <p className="mt-2 font-semibold">US$ {car?.price}</p>
            </div>

            <div className="flex flex-wrap gap-3 mt-5 text-sm text-gray-600">
              <span>⚙️ {car?.type}</span>
              <span>🧳 {car?.luggage}</span>
              <span>👥 {car?.capacity}</span>
              <span>⭐ {car?.rating}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="font-semibold text-lg mb-4">Additional service</h3>
        <div className="space-y-4 text-sm">
          {services.map((s, i) => (
            <div key={i} className="flex justify-between items-center border-b pb-2 last:border-none">
              <div>
                <p>{s.name}</p>
                <p className="text-gray-500">US ${s.price}</p>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={() => handleQtyChange(i, -1)} className="border rounded-full w-6 h-6 flex items-center justify-center"> <Minus className="w-3 h-3" /> </button>
                <span>{s.qty}</span>
                <button onClick={() => handleQtyChange(i, 1)} className="border rounded-full w-6 h-6 flex items-center justify-center"> <Plus className="w-3 h-3" /> </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center mt-8">
        <div className="text-gray-700 text-lg">
          <p className="text-sm">Total Payable</p>
          <p className="font-bold text-2xl text-gray-900">US$ {totalPrice}</p>
          <p className="text-xs text-gray-500">Includes taxes</p>
        </div>

        <div className="flex items-center gap-4 mt-4 md:mt-0">
          {onBack && <button onClick={onBack} className="flex items-center gap-2 text-gray-600 hover:text-gray-800"> <ChevronLeft /> Back </button>}
          <button className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-3 rounded-full font-semibold">Book →</button>
        </div>
      </div>
    </div>
  );
}
