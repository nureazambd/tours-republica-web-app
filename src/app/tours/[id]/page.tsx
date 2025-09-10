"use client";

import { useParams } from "next/navigation";
import Layout from "@/components/layout/Layout";
import { useMemo, useState, useEffect } from "react";
import { Star, Clock, Users, Globe, MapPin, Plus, Minus, ShieldCheck, Check, X } from "lucide-react";
import Link from "next/link";

// --- Sample Tours Data (same as TourGrid) ---
const tours = [
  {
    id: 1,
    title: "Aventura En Buggys",
    description:
      "Explore the highlights of Punta Cana in a thrilling half-day off-road dune buggy.",
    price: 50,
    originalPrice: 75,
    rating: 4.8,
    reviewCount: 30,
    duration: "Half Day (4-6 hours)",
    pickup: "Punta Cana",
    category: "adventure",
    image: "/images/tours/Aventura-en-Buggys.png",
    overview:
      "Drive through the countryside, see local villages, and experience adventure in Punta Cana.",
    included: ["Hotel Pickup", "Guide", "Safety Gear"],
    excluded: ["Meals", "Tips"],
    reviews: [
      { name: "John Doe", rating: 5, text: "Amazing buggy ride!" },
      { name: "Jane Smith", rating: 4, text: "Fun but a bit dusty." },
    ],
  },
  {
    id: 2,
    title: "Santo Domingo City Tour",
    description:
      "Explore the highlights of Santo Domingo in a thrilling cultural city trip.",
    price: 120,
    originalPrice: 150,
    rating: 4.6,
    reviewCount: 22,
    duration: "Full Day (8-10 hours)",
    pickup: "Santo Domingo",
    category: "culture",
    image: "/images/tours/Santo-Domingo-City-Tour-cityTour.png",
    overview:
      "Discover the Colonial Zone, local food, and cultural sites in Santo Domingo.",
    included: ["Guide", "Transport", "Entrance Fees"],
    excluded: ["Lunch", "Tips"],
    reviews: [
      { name: "Carlos M.", rating: 5, text: "Beautiful historic city!" },
    ],
  },
  {
    id: 3,
    title: "Saona Island Day Trip",
    description:
      "Explore the highlights of Punta Cana in a thrilling half-day off-road dune buggy..",
    price: 180,
    originalPrice: 200,
    rating: 4.9,
    reviewCount: 45,
    duration: "Full Day (8-10 hours)",
    pickup: "Bayahibe",
    category: "nature",
    image: "/images/tours/Saona-Island-Day-Trip.png",
    overview:
      "Spend a day on Saona Island relaxing and swimming in turquoise waters.",
    included: ["Boat Transfer", "Guide", "Drinks"],
    excluded: ["Extra Drinks", "Personal expenses"],
    reviews: [{ name: "Alice", rating: 5, text: "Paradise on earth!" }],
  },

  {
    id: 4,
    title: "Tapas Tour",
    description:
      "Explore the highlights of Punta Cana in a thrilling half-day off-road dune buggy..",
    price: 50,
    originalPrice: 75,
    rating: 4.8,
    reviewCount: 30,
    duration: "Half Day (4-6 hours)",
    pickup: "Punta Cana",
    category: "adventure",
    image: "/images/tours/Tapas-Tour.png",
    overview:
      "Drive through the countryside, see local villages, and experience adventure in Punta Cana.",
    included: ["Hotel Pickup", "Guide", "Safety Gear"],
    excluded: ["Meals", "Tips"],
    reviews: [
      { name: "John Doe", rating: 5, text: "Amazing buggy ride!" },
      { name: "Jane Smith", rating: 4, text: "Fun but a bit dusty." },
    ],
  },
  {
    id: 5,
    title: "From Santo Domingo...",
    description:
      "Explore the highlights of Punta Cana in a thrilling half-day off-road dune buggy..",
    price: 120,
    originalPrice: 150,
    rating: 4.6,
    reviewCount: 22,
    duration: "Full Day (8-10 hours)",
    pickup: "Santo Domingo",
    category: "culture",
    image: "/images/tours/From-Santo-Domingo.png",
    overview:
      "Discover the Colonial Zone, local food, and cultural sites in Santo Domingo.",
    included: ["Guide", "Transport", "Entrance Fees"],
    excluded: ["Lunch", "Tips"],
    reviews: [
      { name: "Carlos M.", rating: 5, text: "Beautiful historic city!" },
    ],
  },
  {
    id: 6,
    title: "Bike Tour",
    description:
      "Explore the highlights of Punta Cana in a thrilling half-day off-road dune buggy..",
    price: 180,
    originalPrice: 200,
    rating: 4.9,
    reviewCount: 45,
    duration: "Full Day (8-10 hours)",
    pickup: "Bayahibe",
    category: "nature",
    image: "/images/tours/Bike-Tour.png",
    overview:
      "Spend a day on Saona Island relaxing and swimming in turquoise waters.",
    included: ["Boat Transfer", "Guide", "Drinks"],
    excluded: ["Extra Drinks", "Personal expenses"],
    reviews: [{ name: "Alice", rating: 5, text: "Paradise on earth!" }],
  },
];

export default function TourDetailsPage() {
  const params = useParams();
  const id = Number(params.id);

  const tour = useMemo(() => tours.find((t) => t.id === id), [id]);

  // Booking state
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [totalPrice, setTotalPrice] = useState(tour ? tour.price : 0);
  const [today, setToday] = useState("");

  useEffect(() => {
    setToday(new Date().toISOString().split("T")[0]);
  }, []);

  useEffect(() => {
    if (tour) {
      setTotalPrice(adults * tour.price + children * (tour.price * 0.5));
    }
  }, [adults, children, tour]);

  if (!tour) {
    return (
      <Layout>
        <div className="container-custom py-16 text-center">
          <h2 className="text-2xl font-bold">Tour not found</h2>
          <Link href="/tours" className="text-rose-500 underline mt-4 block">
            Back to Tours
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-white text-gray-800">
        <div className="container-custom py-12">
          {/* Image */}
          <div className="mb-8">
            <img
              src={tour.image}
              alt={tour.title}
              className="w-full h-[400px] object-cover rounded-lg"
            />
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* --- LEFT --- */}
            <div className="w-full lg:w-2/3">
              <h1 className="text-3xl font-bold mb-2">{tour.title}</h1>

              {/* Rating */}
              <div className="flex items-center text-sm text-gray-600 mb-4">
                <Star className="w-4 h-4 text-yellow-500 mr-1" />
                <span className="font-medium">{tour.rating}</span>
                <span className="ml-1">({tour.reviewCount} Reviews)</span>
              </div>

              <p className="text-gray-600 mb-6 leading-relaxed">{tour.overview}</p>

              {/* Includes / Excludes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="font-bold text-lg mb-2">Tour Includes</h3>
                  <ul className="space-y-2">
                    {tour.included.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <Check className="w-5 h-5 text-green-500" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Tour Excludes</h3>
                  <ul className="space-y-2">
                    {tour.excluded.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <X className="w-5 h-5 text-red-500" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Reviews */}
              <h2 className="text-2xl font-bold mb-4">Traveler Reviews</h2>
              <div className="space-y-4">
                {tour.reviews.map((r) => (
                  <div key={r.name} className="border p-4 rounded-lg shadow-sm">
                    <p className="font-bold">{r.name}</p>
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <Star className="w-4 h-4 text-yellow-500 mr-1" />
                      {r.rating}
                    </div>
                    <p className="text-gray-600">{r.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* --- RIGHT BOOKING SIDEBAR --- */}
            <div className="w-full lg:w-1/3">
              <div className="sticky top-24 border rounded-lg p-6 shadow-lg">
                <h3 className="text-xl font-bold mb-4">Book Your Tour</h3>
                <label htmlFor="date" className="font-semibold block mb-2">
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  className="w-full border rounded-md p-2 mb-4"
                  value={today}
                  readOnly
                />

                {/* People counters */}
                <div className="mb-4">
                  <p className="font-semibold mb-2">Adults</p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setAdults((p) => Math.max(0, p - 1))}
                      className="w-8 h-8 rounded-full border"
                    >
                      <Minus size={16} />
                    </button>
                    <span>{adults}</span>
                    <button
                      onClick={() => setAdults((p) => p + 1)}
                      className="w-8 h-8 rounded-full border"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="font-semibold mb-2">Children</p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setChildren((p) => Math.max(0, p - 1))}
                      className="w-8 h-8 rounded-full border"
                    >
                      <Minus size={16} />
                    </button>
                    <span>{children}</span>
                    <button
                      onClick={() => setChildren((p) => p + 1)}
                      className="w-8 h-8 rounded-full border"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                {/* Total */}
                <div className="flex justify-between font-bold text-lg mb-4">
                  <span>Total</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>

                <button className="w-full bg-rose-500 text-white font-bold py-3 rounded-lg hover:bg-rose-600">
                  Book Now
                </button>
                <p className="text-center text-sm text-gray-500 mt-4 flex items-center justify-center gap-2">
                  <ShieldCheck size={16} /> Secure payment
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
