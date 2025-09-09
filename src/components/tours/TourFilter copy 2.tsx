"use client";

import React from "react";
import { Search, Star, MapPin, Clock, Filter } from "lucide-react";

const TourFilter = ({ filters, setFilters }: any) => {
  const categories = [
    { id: "nature", name: "Nature & Marine", count: 15 },
    { id: "adventure", name: "Adventure", count: 12 },
    { id: "culture", name: "Culture & History", count: 8 },
    { id: "transport", name: "Transport", count: 6 },
  ];

  const locations = [
    "Punta Cana",
    "Santo Domingo",
    "Samaná",
    "Puerto Plata",
    "Bayahibe",
    "La Romana",
  ];

  const durations = [
    "Half Day (4-6 hours)",
    "Full Day (8-10 hours)",
    "Multi-day (2+ days)",
  ];

  const handleCategoryChange = (categoryId: string) => {
    setFilters({
      ...filters,
      categories: filters.categories.includes(categoryId)
        ? filters.categories.filter((id: string) => id !== categoryId)
        : [...filters.categories, categoryId],
    });
  };

  const clearFilters = () => {
    setFilters({
      searchQuery: "",
      categories: [],
      priceRange: [0, 200],
      rating: 0,
      duration: "",
      location: "",
      sortBy: "popular",
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-800 flex items-center">
          <Filter className="w-5 h-5 mr-2" />
          Filters
        </h3>
        <button
          onClick={clearFilters}
          className="text-primary-500 hover:text-primary-600 text-sm font-medium"
        >
          Clear All
        </button>
      </div>

      {/* Search */}
      <div className="mb-6 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          value={filters.searchQuery}
          onChange={(e) =>
            setFilters({ ...filters, searchQuery: e.target.value })
          }
          placeholder="Search by name or keyword..."
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
        />
      </div>

      {/* Categories */}
      <div className="mb-6">
        <p className="text-sm font-medium text-gray-700 mb-3">Categories</p>
        {categories.map((c) => (
          <label key={c.id} className="flex items-center cursor-pointer mb-2">
            <input
              type="checkbox"
              checked={filters.categories.includes(c.id)}
              onChange={() => handleCategoryChange(c.id)}
              className="w-4 h-4 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
            />
            <span className="ml-3 text-gray-700 flex-1">{c.name}</span>
            <span className="text-gray-400 text-sm">({c.count})</span>
          </label>
        ))}
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <p className="text-sm font-medium text-gray-700 mb-3">Price Range</p>
        <input
          type="range"
          min="0"
          max="200"
          value={filters.priceRange[1]}
          onChange={(e) =>
            setFilters({ ...filters, priceRange: [0, +e.target.value] })
          }
          className="w-full"
        />
        <div className="flex justify-between text-sm text-gray-600 mt-2">
          <span>$0</span>
          <span>${filters.priceRange[1]}</span>
        </div>
      </div>

      {/* Rating */}
      <div className="mb-6">
        <p className="text-sm font-medium text-gray-700 mb-3">User Reviews</p>
        {[5, 4, 3, 2, 1].map((rating) => (
          <label key={rating} className="flex items-center cursor-pointer mb-2">
            <input
              type="radio"
              name="rating"
              checked={filters.rating === rating}
              onChange={() => setFilters({ ...filters, rating })}
              className="w-4 h-4 text-primary-500 border-gray-300"
            />
            <div className="ml-3 flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
                  }`}
                />
              ))}
              <span className="ml-2 text-gray-700 text-sm">& up</span>
            </div>
          </label>
        ))}
      </div>

      {/* Location */}
      <div className="mb-6">
        <p className="text-sm font-medium text-gray-700 mb-2">Location</p>
        <select
          value={filters.location}
          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg"
        >
          <option value="">All Locations</option>
          {locations.map((l) => (
            <option key={l}>{l}</option>
          ))}
        </select>
      </div>

      {/* Duration */}
      <div className="mb-6">
        <p className="text-sm font-medium text-gray-700 mb-2">Duration</p>
        <select
          value={filters.duration}
          onChange={(e) => setFilters({ ...filters, duration: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg"
        >
          <option value="">Any Duration</option>
          {durations.map((d) => (
            <option key={d}>{d}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default TourFilter;
