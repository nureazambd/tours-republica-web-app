"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Star } from "lucide-react";

const carsData = [
  {
    id: 1,
    name: "Toyota Corolla, 2023",
    type: "Economy",
    category: "Private",
    capacity: "Up to 4",
    luggage: "x4",
    price: 152,
    rating: 4.8,
    image: "/cars/corolla-silver.png",
  },
  {
    id: 2,
    name: "Mercedes-Benz E-Class, 2019",
    type: "Economy",
    category: "Private",
    capacity: "Up to 4",
    luggage: "x4",
    price: 120,
    rating: 4.8,
    image: "/cars/mercedes.png",
  },
  {
    id: 3,
    name: "Volkswagen Sharan, 2017",
    type: "Economy",
    category: "Shared",
    capacity: "Up to 6",
    luggage: "x4",
    price: 148,
    rating: 4.8,
    image: "/cars/volkswagen.png",
  },
  {
    id: 4,
    name: "Tesla Model S, 2020",
    type: "Luxury",
    category: "Private",
    capacity: "Up to 3",
    luggage: "x3",
    price: 220,
    rating: 4.9,
    image: "/cars/tesla.png",
  },
];

export default function CarListSection() {
  const [cars, setCars] = useState(carsData);

  return (
    <section className="max-w-7xl mx-auto mt-10 grid grid-cols-1 md:grid-cols-4 gap-6">
      {/* ==== Left Filter Sidebar ==== */}
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
            {[5,4,3].map((star) => (
              <li key={star}>
                <input type="checkbox" />{" "}
                <span className="ml-2 flex items-center">
                  {Array(star).fill(0).map((_, i) => (
                    <Star key={i} className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                  ))}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* ==== Car List ==== */}
      <div className="md:col-span-3">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">{cars.length} cars found</h2>
          <select className="border rounded-lg px-3 py-2 text-sm">
            <option>Sort by</option>
            <option>Lowest Price</option>
            <option>Highest Price</option>
          </select>
        </div>

        <div className="space-y-4">
          {cars.map((car) => (
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
                    {Array(5).fill(0).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.round(car.rating) ? "fill-yellow-400" : "fill-gray-200"
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
                <p className="text-2xl font-bold text-gray-900">${car.price}</p>
                <button className="mt-3 bg-rose-500 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-rose-600">
                  Book →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
