"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Star, MapPin, Clock, Grid, List } from "lucide-react";

const TourGrid = ({ filters, setFilters }: any) => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // --- Sample Data (replace with API later) ---
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
      image: "/buggy.jpg",
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
      image: "/images/tours/Saona-Island-Day-Trip.png",
    },
    {
      id: 3,
      title: "Saona Island Day Trip",
      description:
        "Escape to a tropical paradise with crystal-clear waters and white sand beaches.",
      price: 180,
      originalPrice: 200,
      rating: 4.9,
      reviewCount: 45,
      duration: "Full Day (8-10 hours)",
      pickup: "Bayahibe",
      category: "nature",
      image: "/saona.jpg",
    },


    {
      id: 4,
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
      image: "/buggy.jpg",
    },
    {
      id: 5,
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
      image: "/santo.jpg",
    },
    {
      id: 6,
      title: "Saona Island Day Trip",
      description:
        "Escape to a tropical paradise with crystal-clear waters and white sand beaches.",
      price: 180,
      originalPrice: 200,
      rating: 4.9,
      reviewCount: 45,
      duration: "Full Day (8-10 hours)",
      pickup: "Bayahibe",
      category: "transport",
      image: "/saona.jpg",
    },
  ];

  // --- Filtering Logic ---
  const filteredTours = useMemo(() => {
    return tours
      .filter((t) =>
        filters.searchQuery
          ? t.title.toLowerCase().includes(filters.searchQuery.toLowerCase())
          : true
      )
      .filter((t) =>
        filters.categories.length > 0
          ? filters.categories.includes(t.category.toLowerCase())
          : true
      )
      .filter((t) => t.price <= filters.priceRange[1]) // Price range
      .filter((t) =>
        filters.rating > 0 ? Math.floor(t.rating) >= filters.rating : true
      )
      .filter((t) =>
        filters.location
          ? t.pickup.toLowerCase() === filters.location.toLowerCase()
          : true
      )
      .filter((t) =>
        filters.duration
          ? t.duration.toLowerCase().includes(filters.duration.toLowerCase())
          : true
      )
      .sort((a, b) => {
        switch (filters.sortBy) {
          case "price-low":
            return a.price - b.price;
          case "price-high":
            return b.price - a.price;
          case "rating":
            return b.rating - a.rating;
          default:
            return 0; // "popular"
        }
      });
  }, [filters, tours]);

  return (
    <div>
      {/* Header with Sort + View */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Tours ({filteredTours.length})
          </h2>
          <p className="text-gray-600">Discover amazing experiences</p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={filters.sortBy}
            onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
            className="px-4 py-2 border rounded-lg"
          >
            <option value="popular">Most Popular</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-md ${
                viewMode === "grid" ? "bg-white shadow-sm" : ""
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-md ${
                viewMode === "list" ? "bg-white shadow-sm" : ""
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Tours */}
      <div
        className={
          viewMode === "grid"
            ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
            : "space-y-6"
        }
      >
        {filteredTours.map((t) => (
          <div
            key={t.id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
          >
            {/* Image + Badge */}
            <div className="relative">
              <img
                src={t.image}
                alt={t.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-3 left-3 bg-teal-500 text-white text-sm font-semibold px-3 py-1 rounded-lg">
                {Math.round(
                  ((t.originalPrice - t.price) / t.originalPrice) * 100
                )}
                % off
              </div>
              <div className="absolute bottom-3 left-3 bg-black/60 text-white text-xs px-3 py-1 rounded-lg">
                {t.category}
              </div>
            </div>

            {/* Content */}
            <div className="p-5">
              {/* Rating */}
              <div className="flex items-center text-sm text-gray-600 mb-2">
                <Star className="w-4 h-4 text-yellow-500 mr-1" />
                <span className="font-medium">{t.rating}</span>
                <span className="ml-1">({t.reviewCount} Reviews)</span>
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-gray-800">{t.title}</h3>
              <p className="text-gray-500 text-sm mt-1 line-clamp-2">
                {t.description}
              </p>

              {/* Pickup */}
              <div className="flex items-center text-sm text-gray-600 mt-3 space-x-2">
                <MapPin className="w-4 h-4" />
                <span>Pickup: {t.pickup}</span>
              </div>

              {/* Duration */}
              <div className="flex items-center text-sm text-gray-600 mt-2">
                <Clock className="w-4 h-4 mr-2" />
                <span>{t.duration}</span>
              </div>

              {/* Price + Button */}
              <div className="flex justify-between items-center mt-4">
                <div>
                  <p className="text-gray-500 text-sm line-through">
                    ${t.originalPrice}
                  </p>
                  <p className="text-xl font-bold text-gray-800">
                    ${t.price}{" "}
                    <span className="text-sm text-gray-500">pp</span>
                  </p>
                </div>
                <Link
                  href={`/tours/${t.id}`}
                  className="bg-rose-500 hover:bg-rose-600 text-white font-semibold px-4 py-2 rounded-lg"
                >
                  Book Now
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TourGrid;
