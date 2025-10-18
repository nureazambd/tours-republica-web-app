"use client";

import { useParams, useRouter } from "next/navigation";
import Layout from "@/components/layout/Layout";
import { useState, useEffect } from "react";
import { Star, Clock, Users, Globe, MapPin, Plus, Minus, ShieldCheck, Check, X } from "lucide-react";
import Link from "next/link";
// import BookingModal from "@/components/BookingModal"; // (Optional: Keep or remove based on your actual usage)

// Define a type for your tour data to improve type safety
interface Tour {
  _id: string; // The ID will now be a string (MongoDB ObjectId)
  title: string;
  description: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewCount: number;
  duration: string;
  pickup: string;
  category: string;
  image: string;
  overview: string;
  included: string[];
  excluded: string[];
  reviews: { name: string; rating: number; text: string }[];
}

export default function TourDetailsPage() {
  const params = useParams();
  // The ID from useParams will be a string (the MongoDB ObjectId)
  // We need to ensure it's treated as a string for the API call.
  const id = params.id as string; 
  const router = useRouter();

  // 1. New State Variables for fetching
  const [tour, setTour] = useState<Tour | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Booking state (remains the same)
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  // Initialize totalPrice to 0, it will be calculated in the useEffect below
  const [totalPrice, setTotalPrice] = useState(0); 
  const [today, setToday] = useState("");
  // const [isBookingOpen, setIsBookingOpen] = useState(false); // (Optional)

  useEffect(() => {
    setToday(new Date().toISOString().split("T")[0]);
  }, []);

  // 2. Data Fetching Effect (The required section)
  useEffect(() => {
    async function fetchTour() {
      if (!id) return; // Guard clause if ID is not available yet

      try {
        setLoading(true);
        setError(null); // Clear previous errors
        
        // Use the API route to fetch the tour by ID
        const res = await fetch(`/api/tours/${id}`, { cache: "no-store" });
        
        if (!res.ok) {
          const data = await res.json();
          // The backend sends 'data.error' (e.g., "Invalid tour ID" or "Tour not found")
          throw new Error(data.error || `Failed to load tour (Status: ${res.status})`);
        }
        
        const data: Tour = await res.json();
        setTour(data);
        
      } catch (err: any) {
        console.error("Error fetching tour:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchTour();
  }, [id]); // Reruns when the route ID changes

  // Recalculate total price when adults/children/tour changes
  useEffect(() => {
    if (tour) {
      // Assuming children price is 50% of the adult price
      const calculatedPrice = adults * tour.price + children * (tour.price * 0.5);
      setTotalPrice(calculatedPrice);
    }
  }, [adults, children, tour]);


  // 3. UI States: Loading, Error, Not Found
  if (loading) {
    return (
      <Layout>
        <div className="container-custom py-16 text-center text-xl text-gray-600">
          <Globe className="animate-spin inline-block mr-2" /> Loading tour details...
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="container-custom py-16 text-center text-xl text-red-600">
          ❌ Error loading tour: {error}
          <Link href="/tours" className="text-rose-500 underline mt-4 block">
            Back to Tours
          </Link>
        </div>
      </Layout>
    );
  }
  
  // If not loading and tour is null (e.g., if the ID was valid but not found in DB)
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

  // 4. Main Page Content (remains largely the same, but now uses 'tour' from state)
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
                    {/* Ensure included/excluded exist before mapping */}
                    {tour.included?.map((item) => ( 
                      <li key={item} className="flex items-center gap-2">
                        <Check className="w-5 h-5 text-green-500" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Tour Excludes</h3>
                  <ul className="space-y-2">
                    {tour.excluded?.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <X className="w-5 h-5 text-red-500" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Reviews */}
              {/* <h2 className="text-2xl font-bold mb-4">Traveler Reviews</h2>
              <div className="space-y-4">
                {tour.reviews?.map((r) => (
                  <div key={r.name} className="border p-4 rounded-lg shadow-sm">
                    <p className="font-bold">{r.name}</p>
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <Star className="w-4 h-4 text-yellow-500 mr-1" />
                      {r.rating}
                    </div>
                    <p className="text-gray-600">{r.text}</p>
                  </div>
                ))}
              </div> */}

               <h2 className="text-2xl font-bold mb-4">Traveler Reviews</h2>
              <div className="space-y-4">
                {tour.reviews?.map((r, index) => (
                  <div 
                    // 🟢 FIX: Use the array index (index) as the key
                    // If reviews were stored in a separate collection, you would use r._id
                    key={index} 
                    className="border p-4 rounded-lg shadow-sm"
                  >
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

                {/* People counters (remain the same) */}
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

                <button
                  onClick={() => router.push(`/payment/${tour._id}`)} // Use the MongoDB '_id' string
                  className="w-full bg-rose-500 text-white font-bold py-3 rounded-lg hover:bg-rose-600 transition-all duration-300"
                >
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
      {/* <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        tour={tour}
        adults={adults}
        children={children}
        total={totalPrice}
      /> */}
    </Layout>
  );
}