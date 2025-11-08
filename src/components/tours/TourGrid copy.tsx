// src/components/tours/TourGrid.tsx

"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Star, MapPin, Clock, Grid, List, Globe } from "lucide-react";
import Image from 'next/image'

// Define the structure of a Tour object expected from the API
interface Tour {
  _id: string; // Must be '_id'
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
}

const TourGrid = ({ filters, setFilters }: any) => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const searchParams = useSearchParams();

  // --- State for API Data and Status ---
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<any>(null); // State for pagination info

  // 🔍 Get location from URL query
  const locationFromURL = searchParams.get("location");
  
  // Convert filters object to URL query string
  const buildQueryString = () => {
    const params = new URLSearchParams();
    
    // Iterate over filters and append to params
    if (filters.searchQuery) params.append('search', filters.searchQuery); // Assuming backend supports 'search'
    if (filters.categories.length > 0) params.append('category', filters.categories[0]); // Simple filter for one category
    
    // Convert price range to min/max
    params.append('minPrice', filters.priceRange[0].toString());
    params.append('maxPrice', filters.priceRange[1].toString());
    
    if (filters.rating > 0) params.append('rating', filters.rating.toString());
    
    // Use 'location' to match the filter state name
    if (filters.location && filters.location !== 'all') params.append('location', filters.location); 
    
    if (filters.duration && filters.duration !== 'all') params.append('duration', filters.duration);

    params.append('sortBy', filters.sortBy);
    params.append('page', filters.page.toString()); // Assuming 'filters' holds current page
    
    return params.toString();
  };


  // --- Data Fetching Effect (Triggers on filter change) ---
  useEffect(() => {
    async function fetchTours() {
      try {
        setLoading(true);
        setError(null);

        const queryString = buildQueryString();
        
        // Fetch tours using the API route with query parameters
        const res = await fetch(`/api/tours?${queryString}`, { cache: "no-store" }); 

        if (!res.ok) {
          const data = await res.json();
          // This line shows the error from the backend ⬇️
          throw new Error(data.error || "Failed to load tours."); 
        }

        const data: { tours: Tour[], pagination: any } = await res.json();
        
        // 🟢 FIX: Set the tours from the nested 'tours' array
        setTours(data.tours); 
        setPagination(data.pagination);

      } catch (err: any) {
        console.error("Error fetching tours:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchTours();
    
  // Rerun whenever the filters object changes
  }, [filters]); 


  // 🧠 Set location from URL into filters (runs once on locationFromURL change)
  useEffect(() => {
    if (locationFromURL && filters.location !== locationFromURL) {
      setFilters((prev: any) => ({
        ...prev,
        location: locationFromURL,
      }));
    }
  }, [locationFromURL, setFilters]);


  // --- Filtering Logic (Simplified since the API does most of the work) ---
  const filteredTours = useMemo(() => {
    // We now mostly rely on the backend API to filter. 
    // This frontend filter only performs the search query if the backend doesn't,
    // but typically the backend should handle all filtering.
    // For now, we'll return the tours directly as they are already filtered by the API query string.
    
    // We can still do client-side filtering if necessary, but this version uses the API results directly:
    return tours;
    
  }, [tours]);

  
  // --- Loading/Error/No Tours UI ---
  if (loading) {
    return (
      <div className="text-center py-10 text-gray-600 text-lg">
        <Globe className="animate-spin inline-block mr-2" /> Loading amazing tours...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-600 text-lg border p-6 rounded-lg bg-red-50">
        🚨 Error loading tours: {error}
      </div>
    );
  }

  if (filteredTours.length === 0) {
    return (
        <div className="text-center py-10 text-gray-600 text-lg">
            No tours found matching your current filters.
        </div>
    );
  }


  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            {pagination?.totalCount || filteredTours.length} tours found 
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

      {/* Tours Grid/List */}
      <div
        className={
          viewMode === "grid"
            ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
            : "space-y-6"
        }
      >
        {filteredTours.map((t) => (
          <div
            key={t._id} 
            className={`bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition ${
              viewMode === "list" ? "flex gap-4" : ""
            }`}
          >
            <div className={viewMode === "list" ? "w-1/3" : "w-full"}>
              <div className="relative h-full">
                <img
                  src={t.image}
                  alt={t.title}
                  className={`object-cover ${
                    viewMode === "list" ? "h-full w-full" : "w-full h-48"
                  }`}
                />
                <div className="absolute top-3 left-3 bg-teal-500 text-white text-sm font-semibold px-3 py-1 rounded-lg">
                  {Math.round(((t.originalPrice - t.price) / t.originalPrice) * 100)}
                  % off
                </div>
                <div className="absolute bottom-3 left-3 bg-black/60 text-white text-xs px-3 py-1 rounded-lg">
                  {t.category}
                </div>
              </div>
            </div>

            <div className={viewMode === "list" ? "p-5 flex-1" : "p-5"}>
              <div className="flex items-center text-sm text-gray-600 mb-2">
                <Star className="w-4 h-4 text-yellow-500 mr-1" />
                <span className="font-medium">{t.rating}</span>
                <span className="ml-1">({t.reviewCount} Reviews)</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800">{t.title}</h3>
              <p className="text-gray-500 text-sm mt-1 line-clamp-2">
                {t.description}
              </p>
              {/* <div className="border-t-2 my-4">
              <div className="flex items-center text-sm  text-gray-600 mt-3 space-x-2">
                <MapPin className="w-4 h-4" />
                <span>Pickup: {t.pickup}</span>
                <div>hello</div>
              </div>
              </div> */}

              <div className="flex items-center justify-between border-t-2 my-4 text-[13px] font-[400] text-gray-500">
                
                <div className="flex items-center pt-4 space-x-1">
                  <MapPin className="w-4 h-4" />
                  <span>Pickup: {t.pickup}</span>
                </div>
                
                <div className=''> {/* No changes needed here */}
                  <Image
                    src={'/images/home/featured/car-man-food.png'}
                    width={70}
                    height={50}
                    alt="Picture of the author"
                    className="w-full h-4 mt-4"
                  />
                </div>
              
              </div>

              <div className="border-t-2 my-4">
              <div className="flex items-center text-[13px] font-[400] text-gray-600 mt-2">
                <Clock className="w-4 h-4 mr-2" />
                <span>{t.duration}</span>
              </div>
              </div>
              <div className="border-t-2 my-4">
              <div className="flex justify-between items-center  mt-6">
                <div className="">
                  <p className="text-[#FAA523] text-[18px] font-[500] line-through">${t.originalPrice}</p>
                  <p className="text-[28px] font-[500] text-[#003459]">
                    ${t.price} <span className="text-sm text-gray-500">pp</span>
                  </p>
                </div>
                <Link
                  // 🟢 FIX: Use t._id for the link
                  href={`/tours/${t._id}`} 
                  className="bg-rose-500 hover:bg-rose-600 text-white font-semibold px-4 py-2 rounded-lg"
                >
                  Book Now
                </Link>
              </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* TODO: Add Pagination Controls using the 'pagination' state here */}
    </div>
  );
};

export default TourGrid;