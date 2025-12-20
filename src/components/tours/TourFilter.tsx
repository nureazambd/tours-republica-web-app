"use client";

import React, { useState } from "react";
import { Search, Star, MapPin, Clock, Filter } from "lucide-react";
import AvailabilityFilter from "./AvailabilityFilter";
import TravelCategoryFilter from "./TravelCategoryFilter";
import PriceFilter from "./PriceFilter";
import UserReviewsFilter from "./UserReviewsFilter";
import TourMapFilter from "./TourMapFilter";

const defaultFilters = {
  searchQuery: "",
  categories: [],
  priceRange: [0, 200],
  rating: 0,
  duration: "",
  location: "",
  sortBy: "popular",
};

const TourFilter = ({ filters = defaultFilters, setFilters = () => {} }: any) => {
  const categories = [
    { id: "nature", name: "Nature & Marine", count: 15 },
    { id: "adventure", name: "Adventure", count: 12 },
    { id: "culture", name: "Culture & History", count: 8 },
    { id: "transport", name: "Transport", count: 6 },
  ];
  const [showMap, setShowMap] = useState(true);

  const locations = [
    "Punta Cana",
    "Santo Domingo",
    "Samaná",
    "Puerto Plata",
    "Bayahibe",
    "La Romana",
  ];

  const durations = [
    "Half Day (400-6 hours)",
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
    <div className=" rounded-2xl  sticky top-24">
      {/* <div className="relative mb-6">
        {showMap && (
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d48276.54692309174!2d-69.9312115!3d18.4860575!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8ea56208e1467d11%3A0x7d8d4d4b6ef62b!2sSanto%20Domingo!5e0!3m2!1sen!2sdo!4v1701234567890!5m2!1sen!2sdo"
            width="100%"
            height="150"
            allowFullScreen
            loading="lazy"
            className="rounded-lg shadow-md"
          ></iframe>
        )}
        <button
          onClick={() => setShowMap(!showMap)}
          className="absolute top-3 right-3 bg-white px-3 py-1 rounded-md shadow-md text-sm font-medium"
        >
          {showMap ? "Hide Map" : "Show Map"}
        </button>
      </div> */}

      <TourMapFilter/>
      {/* Date Filter Section */}
      <div className="mt-[20px] mx-4 lg:mx-4"><AvailabilityFilter/></div>
      <div className="mt-[20px] mx-4 lg:mx-4"><TravelCategoryFilter/></div>
      <div className="mt-[20px] mx-4 lg:mx-4"><PriceFilter prices={[300, 600, 800, 700, 400, 250, 600, 750, 750, 900,
    1050, 860, 750, 600, 900, 800, 10, 300, 100, 250, 250, 400, 400, 500, 650, 300, 300, 1400 ]} /></div>
      <div className="mt-[20px] mx-4 lg:mx-4"><UserReviewsFilter filters={filters} setFilters={setFilters} /></div>
      
    </div>
  );
};

export default TourFilter;
