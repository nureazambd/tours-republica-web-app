'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { Star, Clock, MapPin } from "lucide-react";

/* ---------------- ICONS (UNCHANGED UI) ---------------- */

const CarIcon = () => <span>🚗</span>;
const LunchIcon = () => <span>🍽️</span>;
const GuideIcon = () => <span>🧑‍🏫</span>;

/* ---------------- TYPES ---------------- */

interface Tour {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewCount: number;
  duration: string;
  pickup: string;
  image: string;
  category: string;
  features: any[];
}

/* ---------------- COMPONENT ---------------- */

export default function FeaturedTours() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/tours");

        const data = await res.json();

        /* ✅ FIX: access data.tours */
        const mappedTours: Tour[] = data.tours.map((tour: any) => ({
          id: tour._id,
          title: tour.title,
          description: tour.description,
          price: tour.price,
          originalPrice: tour.originalPrice,
          rating: tour.rating,
          reviewCount: tour.reviewCount,
          duration: tour.duration,
          pickup: tour.pickup,
          image: tour.image,
          category: tour.category,
          features: [CarIcon, LunchIcon, GuideIcon],
        }));

        setTours(mappedTours);
      } catch (error) {
        console.error("Failed to fetch tours:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  if (loading) {
    return <p className="text-center py-10">Loading tours...</p>;
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">

        {/* Section Header */}
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold">Featured Tours</h2>

          <Link
            href="/tours"
            className="text-orange-500 font-semibold hover:underline"
          >
            View All
          </Link>
        </div>

        {/* Tours Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {tours.map((tour) => (
            <div
              key={tour.id}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition"
            >

              {/* Image */}
              <div className="h-56 w-full overflow-hidden">
                <img
                  src={tour.image}
                  alt={tour.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-5">

                {/* Category */}
                <p className="text-sm text-orange-500 font-semibold mb-2">
                  {tour.category}
                </p>

                {/* Title */}
                <h3 className="text-lg font-bold mb-2">
                  {tour.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {tour.description}
                </p>

                {/* Info Row */}
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">

                  <div className="flex items-center gap-1">
                    <Clock size={16} />
                    {tour.duration}
                  </div>

                  <div className="flex items-center gap-1">
                    <MapPin size={16} />
                    {tour.pickup}
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <Star size={16} className="text-yellow-400 fill-yellow-400" />
                  <span className="font-semibold">{tour.rating}</span>
                  <span className="text-gray-500">
                    ({tour.reviewCount})
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between">

                  <div>
                    <span className="text-xl font-bold text-orange-500">
                      ${tour.price}
                    </span>

                    {tour.originalPrice && (
                      <span className="text-gray-400 line-through ml-2">
                        ${tour.originalPrice}
                      </span>
                    )}
                  </div>

                  <Link
                    href={`/tours/${tour.id}`}
                    className="text-sm font-semibold text-orange-500 hover:underline"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
