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
      ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-12"
      : "space-y-6"
  }
>
  {filteredTours.map((t) => (
    <div key={t._id} className="group mx-auto">
      <Link href={`/tours/${t._id}`}>
        {/* Card Container */}
        <div
          className={`${
            viewMode === "list"
              ? "flex flex-col md:flex-row w-full"
              : "w-[278px] h-[517px] flex flex-col"
          } items-start p-0 bg-[#EFF2F880] rounded-2xl border border-opacity-25 border-[#BECCE8]
          transition-all duration-300 overflow-hidden hover:shadow-md hover:-translate-y-1`}
          style={{
            backgroundImage:
              "linear-gradient(0deg, rgba(239, 242, 248, 0.5), rgba(239, 242, 248, 0.5)), #FFFFFF",
          }}
        >
          {/* ======= IMAGE SECTION ======= */}
          <div
            className={`relative ${
              viewMode === "list" ? "w-full md:w-1/3 h-[220px]" : "w-full h-[220px]"
            } flex flex-col justify-end items-start p-[12px] md:p-[20px]`}
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 rounded-t-2xl"
              style={{
                backgroundImage: `url('${t.image}')`,
              }}
            />

            {/* Discount + Category */}
            <div className="relative z-10 flex flex-row justify-between items-center w-full h-[32px]">
              {/* Discount Tag */}
              {t.originalPrice && (
                <div className="flex justify-center items-center px-[12px] py-[6px] gap-[8px] bg-[#6FCCDC] rounded-[8px]">
                  <span className="font-['Rubik'] text-[14px] text-[#191919]">
                    {Math.round(((t.originalPrice - t.price) / t.originalPrice) * 100)}% off
                  </span>
                </div>
              )}

              {/* Category Tag */}
              <div className="flex justify-center items-center px-[12px] py-[8px] bg-[#003459]/25 rounded-[8px]">
                <span className="font-['Rubik'] text-[12px] text-white capitalize">
                  {t.category}
                </span>
              </div>
            </div>
          </div>

          {/* ======= CONTENT SECTION ======= */}
          <div
            className={`flex flex-col justify-between p-[20px] px-[16px] pb-[28px] ${
              viewMode === "list" ? "md:w-2/3" : "w-full h-[353px]"
            }`}
          >
            {/* Rating + Title + Description */}
            <div className="flex flex-col items-start gap-[12px]">
              <div className="flex flex-row items-center gap-[6px] text-[#191919] text-[14px]">
                <Star className="w-[18px] h-[18px] text-[#FAA523] fill-current" />
                <span>
                  {t.rating} ({t.reviewCount} Reviews)
                </span>
              </div>

              <div className="flex flex-col gap-[4px]">
                <h3 className="font-['Rubik'] font-medium text-[22px] leading-[28px] text-[#001D22] capitalize line-clamp-1">
                  {t.title}
                </h3>
                <p className="font-['Rubik'] text-[13px] leading-[20px] text-[#878D97] line-clamp-2">
                  {t.description}
                </p>
              </div>
            </div>

            {/* Pickup + Duration */}
            <div className="flex flex-col gap-[12px] mt-4">
              {/* Pickup */}
              <div className="w-full border-t border-[#BECCE8]/25 pt-[12px] flex justify-between items-center">
                <span className="font-['Rubik'] text-[13px] text-[#191919]">
                  Pickup: {t.pickup}
                </span>
                <div className="flex items-center gap-[10px]">
                  <Image
                    src="/images/home/featured/car-man-food.png"
                    width={70}
                    height={40}
                    alt="features"
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Duration */}
              <div className="w-full border-t border-[#BECCE8]/25 pt-[12px] flex items-center gap-[6px]">
                {/* <Clock className="w-[16px] h-[16px] text-[#878D97]" /> */}
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* FIX: Changed fill-rule to fillRule and clip-rule to clipRule */}
        <path fillRule="evenodd" clipRule="evenodd" d="M7.63531 13.9645C7.63531 14.205 7.44033 14.4 7.19983 14.4C5.27702 14.4 3.46901 13.6509 2.10885 12.2907C0.748945 10.9309 0 9.12286 0 7.1998C0 5.27673 0.748945 3.46872 2.10885 2.10882C3.46872 0.748916 5.27687 0 7.2002 0C9.12353 0 10.9317 0.748916 12.2916 2.10882C12.3109 2.12809 12.3298 2.14775 12.3489 2.16726V1.61518C12.3489 1.37468 12.5439 1.1797 12.7844 1.1797C13.0249 1.1797 13.2199 1.37468 13.2199 1.61518V3.2175C13.2199 3.458 13.0249 3.65298 12.7844 3.65298H11.1821C10.9416 3.65298 10.7466 3.458 10.7466 3.2175C10.7466 2.977 10.9416 2.78202 11.1821 2.78202H11.732C11.7133 2.76285 11.6947 2.74361 11.6758 2.72468C9.20799 0.256877 5.19251 0.256877 2.72474 2.72468C0.257168 5.19227 0.257168 9.20732 2.72474 11.6749C3.9204 12.8706 5.50968 13.5291 7.19985 13.5291C7.44036 13.5291 7.63534 13.724 7.63534 13.9645L7.63531 13.9645ZM11.6176 7.1998C11.6176 9.63578 9.63578 11.6176 7.19983 11.6176C4.76387 11.6176 2.78205 9.63575 2.78205 7.1998C2.78205 4.76384 4.76382 2.78202 7.19983 2.78202C9.63584 2.78202 11.6176 4.76384 11.6176 7.1998ZM8.89235 7.67445L7.63528 6.94841V4.90207C7.63528 4.66156 7.4403 4.46658 7.1998 4.46658C6.95929 4.46658 6.76431 4.66156 6.76431 4.90207V7.19977C6.76431 7.35532 6.84729 7.49909 6.982 7.57687L8.45675 8.42862C8.52279 8.46694 8.59779 8.4871 8.67414 8.48706C8.82462 8.48706 8.971 8.40896 9.05165 8.26932C9.17196 8.06104 9.10063 7.7947 8.89235 7.67442V7.67445ZM13.9645 6.76446C13.7242 6.76446 13.5292 6.96031 13.5292 7.1998C13.5292 7.43928 13.7242 7.63514 13.9645 7.63514C14.2048 7.63514 14.3999 7.43928 14.3999 7.1998C14.3999 6.96031 14.204 6.76446 13.9645 6.76446ZM8.83832 13.3127C8.60542 13.3753 8.46798 13.614 8.53052 13.846C8.59224 14.0789 8.83092 14.2163 9.06381 14.1546C9.2959 14.0921 9.43334 13.8534 9.37161 13.6214C9.30908 13.3885 9.07037 13.251 8.83832 13.3127ZM10.3641 12.6807C10.1559 12.8009 10.0851 13.0675 10.2052 13.2757C10.3254 13.4839 10.592 13.5555 10.8003 13.4353C11.0085 13.3152 11.0792 13.0485 10.9591 12.8404C10.8389 12.6321 10.5731 12.5605 10.3641 12.6807ZM11.6751 11.6751C11.5055 11.8454 11.5055 12.1211 11.6751 12.2906C11.8454 12.461 12.1211 12.461 12.2914 12.2906C12.461 12.1211 12.461 11.8454 12.2914 11.6751C12.1211 11.5047 11.8454 11.5047 11.6751 11.6751ZM13.2757 10.2052C13.0675 10.0843 12.8008 10.1559 12.6807 10.3641C12.5605 10.5723 12.6321 10.8389 12.8404 10.9591C13.0485 11.0792 13.3152 11.0076 13.4353 10.7994C13.5555 10.5912 13.4839 10.3254 13.2757 10.2052H13.2757ZM13.8468 8.52971C13.6139 8.46798 13.3753 8.60542 13.3136 8.83751C13.251 9.0704 13.3893 9.30905 13.6214 9.37161C13.8534 9.43333 14.0921 9.2959 14.1546 9.063C14.2172 8.83092 14.0789 8.59227 13.8468 8.52973V8.52971ZM13.8468 5.86992C14.0789 5.80738 14.2172 5.56871 14.1546 5.33665C14.0921 5.10375 13.8534 4.96632 13.6214 5.02804C13.3893 5.09057 13.251 5.32925 13.3136 5.56215C13.3753 5.79423 13.6139 5.93164 13.8468 5.86992Z" fill="#878D97" />
    </svg>
                <span className="font-['Rubik'] text-[14px] text-[#191919]">
                  {t.duration}
                </span>
              </div>
            </div>

            {/* Price + Button */}
            <div className="flex justify-between items-end mt-6">
              <div className="flex flex-col items-start">
                <span className="text-[12px] text-[#878D97]">From</span>
                <div className="flex items-center gap-[4px]">
                  <span className="text-[18px] text-[#FAA523] line-through">
                    ${t.originalPrice}
                  </span>
                  <span className="text-[28px] text-[#003459] font-medium">
                    ${t.price}
                  </span>
                  <span className="text-[13px] text-[#878D97]">pp</span>
                </div>
              </div>

              <button className="bg-[#E9305B] hover:bg-red-700 text-white px-[16px] py-[10px] rounded-[12px] text-[14px] font-normal transition">
                Book Now
              </button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  ))}
</div>

      
      {/* TODO: Add Pagination Controls using the 'pagination' state here */}
    </div>
  );
};

export default TourGrid;