// src/components/car/CarList.tsx
"use client";
import React from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CarList({ cars }: { cars: any[] }) {
  const router = useRouter();
  if (!cars || cars.length === 0) {
    return <div className="text-gray-500 p-6">No cars found — try different filters.</div>;
  }
  return (
    <div className="space-y-4">
      {cars.map((car) => (
        <div key={car._id} className="bg-white p-4 rounded-xl shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Image src={car.image || "/images/cars/placeholder.png"} alt={car.name} width={110} height={70} className="rounded-lg object-cover" />
            <div>
              <h3 className="font-semibold">{car.name}</h3>
              <p className="text-sm text-gray-500">{car.type} • {car.capacity}</p>
              <div className="flex items-center mt-2 text-yellow-500">
                <Star className="w-4 h-4" /> <span className="ml-1 text-sm text-gray-700">{car.rating}</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">US$</div>
            <div className="text-2xl font-bold">${car.price}</div>
            <button
              onClick={() => router.push(`/car-booking/${car._id}`)}
              className="mt-2 bg-rose-500 text-white px-4 py-2 rounded-md"
            >
              Book →
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
