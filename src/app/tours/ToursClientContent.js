"use client"; // Keep this directive!

import AirportTransferBanner from "@/components/home/AirportTransferBanner";
import TourHeroSection from "@/components/home/TourHeroSection";
// NOTE: Layout component is removed here
import TourFilter from "@/components/tours/TourFilter";
import TourGrid from "@/components/tours/TourGrid";
import React, { useState } from "react";
import CategoryLinks from "@/components/tours/CategoryLinks";

// Rename function to reflect its role as client content
export default function ToursClientContent() {
    // 🟢 CRITICAL FIX: Add the 'page: 1' property to the initial state
    const [filters, setFilters] = useState({
        searchQuery: "",
        categories: [],
        priceRange: [0, 200],
        rating: 0,
        duration: "",
        location: "",
        sortBy: "popular",
        page: 1, // <--- SOLUTION: Initialize the missing 'page' property
    });

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <TourHeroSection />

            {/* Tours Content */}
            <section className="py-12">
                <div className="max-w-[1180px] mx-auto flex flex-col lg:flex-row gap-8">
                    {/* Sidebar Filter */}
                    <div className="lg:w-1/4">
                        <TourFilter filters={filters} setFilters={setFilters} />
                    </div>

                    {/* Tours Grid & Banner */}
                    <div className="lg:w-3/4 space-y-12">
                    <CategoryLinks />
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