"use client";

import Layout from "@/components/layout/Layout";
import TourFilter from "@/components/tours/TourFilter";
import TourGrid from "@/components/tours/TourGrid";
import React, { useState } from "react";

export default function ToursPage() {
  // All filters lifted here
  const [filters, setFilters] = useState({
    searchQuery: "",
    categories: [] as string[],
    priceRange: [0, 200],
    rating: 0,
    duration: "",
    location: "",
    sortBy: "popular",
  });

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Page Header */}
        <section className="bg-gradient-to-r from-secondary-800 to-secondary-700 text-white py-16">
          <div className="container-custom text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Discover Amazing Tours
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Explore our handpicked collection of unforgettable experiences in
              the Dominican Republic
            </p>
          </div>
        </section>

        {/* Tours Content */}
        <section className="py-12">
          <div className="container-custom flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filter */}
            <div className="lg:w-1/4">
              <TourFilter filters={filters} setFilters={setFilters} />
            </div>

            {/* Tours Grid */}
            <div className="lg:w-3/4">
              <TourGrid filters={filters} setFilters={setFilters} />
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
