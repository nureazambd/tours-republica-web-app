"use client"; // Keep this directive!

import AirportTransferBanner from "@/components/home/AirportTransferBanner";
import TourHeroSection from "@/components/home/TourHeroSection";
// NOTE: Layout component is removed here
import TourFilter from "@/components/tours/TourFilter";
import TourGrid from "@/components/tours/TourGrid";
import React, { useState } from "react";

// Rename function to reflect its role as client content
export default function ToursClientContent() {
  const [filters, setFilters] = useState({
    searchQuery: "",
    categories: [],
    priceRange: [0, 200],
    rating: 0,
    duration: "",
    location: "",
    sortBy: "popular",
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <TourHeroSection />

      {/* Tours Content */}
      <section className="py-12">
        <div className="container-custom flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filter */}
          <div className="lg:w-1/4">
            <TourFilter filters={filters} setFilters={setFilters} />
          </div>

          {/* Tours Grid & Banner */}
          <div className="lg:w-3/4 space-y-12">
            {/* Tours Grid */}
            <TourGrid filters={filters} setFilters={setFilters} />

            {/* Airport Transfer Banner */}
            <AirportTransferBanner />
          </div>
        </div>
      </section>
    </div>
  );
}