"use client"; // ✅ client component for hooks like useState

import Layout from "@/components/layout/Layout";
import { useState, useEffect } from "react";
import {
  Star,
  Clock,
  Users,
  Globe,
  MapPin,
  Plus,
  Minus,
  Check,
  X,
  ShieldCheck,
} from "lucide-react";
import type { Metadata } from "next";

// ✅ Metadata generator (SEO per tour)
export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  // In real app, fetch tour by ID here
  const tourName = "Santo Domingo City Tour";

  return {
    title: `${tourName} | Tours Republica`,
    description: `Book ${tourName} and explore Dominican Republic with Tours Republica.`,
  };
}

// ✅ Static demo tour data
const tourData = {
  title: "Santo Domingo City Tour",
  images: [
    "/images/tours/Santo-Domingo-City-Tour.png",
    "/images/tours/Santo-Domingo-City-Tour-1.png",
    "/images/tours/Santo-Domingo-City-Tour-2.png",
  ],
  tags: ["New York", "City tour", "Cultural", "New"],
  duration: "8 hours",
  tourType: "Daily Tour",
  groupSize: "30 people",
  language: "English",
  overview:
    "Discover the magic of Santo Domingo on this immersive city tour...",
  highlights: [
    { img: "/highlight-1.jpg", title: "Catedral Primada de América" },
    { img: "/highlight-2.jpg", title: "Alcázar de Colón" },
    { img: "/highlight-3.jpg", title: "Calle Las Damas" },
  ],
  included: ["Professional guide", "Transportation", "Entrance fees", "Snacks"],
  excluded: ["Lunch", "Gratuities", "Personal expenses"],
  whatToExpect: [
    {
      time: "09:00 AM",
      title: "Hotel Pickup",
      description: "We start the day by picking you up from your hotel.",
    },
    {
      time: "10:00 AM",
      title: "Colonial Zone",
      description: "Begin our walking tour through the historic heart of the city.",
    },
    {
      time: "01:00 PM",
      title: "Lunch Break",
      description: "Enjoy authentic Dominican cuisine at a local restaurant.",
    },
    {
      time: "03:00 PM",
      title: "Market Visit",
      description: "Explore a bustling local market and shop for souvenirs.",
    },
    {
      time: "05:00 PM",
      title: "Return to Hotel",
      description: "Conclude the tour and drop you off at your hotel.",
    },
  ],
  reviews: [
    {
      name: "John Doe",
      rating: 5,
      text: "An unforgettable experience! Highly recommended.",
    },
    {
      name: "Jane Smith",
      rating: 4,
      text: "Great tour with a lot of history. The pace was a bit fast.",
    },
  ],
  additionalOptions: [
    { title: "Saona Island Paradise", rating: 4.8, reviews: 120, price: 99 },
    { title: "Monkeyland & Plantation", rating: 4.9, reviews: 250, price: 89 },
    { title: "27 Waterfalls of Damajagua", rating: 4.7, reviews: 95, price: 119 },
  ],
};

// ✅ Star rating component
function StarRating({ rating, reviewCount }: { rating: number; reviewCount?: number }) {
  return (
    <div className="flex items-center">
      <div className="flex text-yellow-400">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            strokeWidth={1}
            fill={i < Math.floor(rating) ? "currentColor" : "none"}
          />
        ))}
      </div>
      {reviewCount && (
        <span className="ml-2 text-sm text-gray-500">({reviewCount} reviews)</span>
      )}
    </div>
  );
}

// ✅ Main Tour Page
export default function TourDetailsPage({ params }: { params: { id: string } }) {
  const [adults, setAdults] = useState(1);
  const [youths, setYouths] = useState(0);
  const [children, setChildren] = useState(0);
  const [totalPrice, setTotalPrice] = useState(50);
  const [today, setToday] = useState("");

  useEffect(() => {
    setToday(new Date().toISOString().split("T")[0]);
  }, []);

  const prices = { adult: 50, youth: 40, child: 30 };

  useEffect(() => {
    setTotalPrice(adults * prices.adult + youths * prices.youth + children * prices.child);
  }, [adults, youths, children]);

  const handlePersonChange = (
    setter: React.Dispatch<React.SetStateAction<number>>,
    amount: number
  ) => setter((prev) => Math.max(0, prev + amount));

  return (
    <Layout>
      <div className="bg-white text-gray-800">
        <div className="container mx-auto px-4 py-8">
          {/* ✅ Gallery */}
          <div className="grid grid-cols-3 grid-rows-2 gap-2 mb-8 h-[450px]">
            <div className="col-span-2 row-span-2">
              <img src={tourData.images[0]} alt={tourData.title} className="w-full h-full object-cover rounded-lg" />
            </div>
            <img src={tourData.images[1]} alt="" className="w-full h-full object-cover rounded-lg" />
            <img src={tourData.images[2]} alt="" className="w-full h-full object-cover rounded-lg" />
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* LEFT CONTENT */}
            <div className="w-full lg:w-2/3">
              <h1 className="text-3xl font-bold mb-2">{tourData.title}</h1>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {tourData.tags.map((tag) => (
                  <span key={tag} className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Overview */}
              <h2 className="text-2xl font-bold mb-4">Overview</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">{tourData.overview}</p>
            </div>

            {/* RIGHT BOOKING SIDEBAR */}
            <div className="w-full lg:w-1/3">
              <div className="sticky top-24 border rounded-lg p-6 shadow-lg">
                <h3 className="text-xl font-bold mb-4">Book Your Tour</h3>

                <label htmlFor="date" className="font-semibold block mb-2">Date</label>
                <input type="date" id="date" className="w-full border rounded-md p-2 mb-4" value={today} readOnly />

                {/* People counters */}
                {/* ... (same as your original counters code) ... */}

                <div className="flex justify-between font-bold text-lg mb-4">
                  <span>Total</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>

                <button className="w-full bg-red-500 text-white font-bold py-3 rounded-lg hover:bg-red-600 transition-colors">
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
