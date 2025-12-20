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


const IconBase = ({ children }: any) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    {children}
  </svg>
);

const CarIcon = () => (
  <IconBase>
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14.9165 16.46C14.759 16.46 14.6807 16.46 14.6323 16.5083C14.584 16.5566 14.5832 16.6358 14.5832 16.7933V17.195C14.5832 17.51 14.7832 17.7991 15.1015 17.94L15.139 17.9566C15.3315 18.0425 15.519 18.1266 15.7423 18.1266H17.174C17.3973 18.1266 17.5848 18.0433 17.7773 17.9566L17.8148 17.94C18.1323 17.7983 18.3332 17.51 18.3332 17.195V16.4533C18.3332 16.2408 18.3332 16.1341 18.2748 16.085C18.2157 16.035 18.0973 16.0541 17.8598 16.0933L17.789 16.1033L15.1915 16.4466C15.1282 16.4555 15.0643 16.46 14.9998 16.46H14.9165ZM5.08317 16.46C5.24067 16.46 5.319 16.46 5.36734 16.5091C5.41567 16.5583 5.4165 16.6358 5.4165 16.7925V17.195C5.4165 17.5108 5.2165 17.7991 4.89817 17.94L4.86067 17.9566C4.66817 18.0433 4.48067 18.1266 4.25734 18.1266H2.82567C2.60234 18.1266 2.41484 18.0433 2.22234 17.9566L2.18484 17.94C1.86734 17.7983 1.6665 17.5108 1.6665 17.195V16.4541C1.6665 16.2408 1.6665 16.135 1.72484 16.085C1.78317 16.035 1.90234 16.0541 2.13984 16.0933L2.2115 16.1033L4.80817 16.4475C4.87206 16.4558 4.93595 16.46 4.99984 16.46H5.08317Z" fill="#FAA523" />
      <path fillRule="evenodd" clipRule="evenodd" d="M1.75512 6.29419C1.854 6.09668 2.02724 5.9465 2.23678 5.87665C2.44632 5.8068 2.67502 5.823 2.87262 5.92169L3.70596 6.33835C3.80472 6.38675 3.89293 6.45421 3.96549 6.53686C4.03805 6.61951 4.09354 6.7157 4.12875 6.81989C4.16395 6.92409 4.17819 7.03422 4.17063 7.14394C4.16307 7.25366 4.13387 7.3608 4.08471 7.45918C4.03554 7.55756 3.96739 7.64524 3.88418 7.71716C3.80097 7.78907 3.70435 7.84381 3.59989 7.8782C3.49542 7.9126 3.38518 7.92598 3.27552 7.91756C3.16586 7.90915 3.05895 7.87911 2.96096 7.82919L2.12762 7.41252C2.02972 7.36356 1.94242 7.2958 1.87071 7.2131C1.799 7.13039 1.74429 7.03437 1.7097 6.93052C1.67511 6.82667 1.66131 6.71702 1.66911 6.60783C1.6769 6.49865 1.70613 6.39207 1.75512 6.29419ZM18.246 6.29419C18.2949 6.39212 18.3241 6.49875 18.3318 6.60797C18.3396 6.71719 18.3257 6.82686 18.291 6.93072C18.2564 7.03458 18.2016 7.13059 18.1298 7.21326C18.058 7.29593 17.9706 7.36364 17.8726 7.41252L17.0393 7.82919C16.8415 7.92798 16.6125 7.94415 16.4028 7.87413C16.1931 7.80412 16.0198 7.65366 15.921 7.45585C15.8222 7.25804 15.806 7.02909 15.876 6.81937C15.946 6.60964 16.0965 6.43631 16.2943 6.33752L17.1276 5.92085C17.2256 5.87189 17.3322 5.8427 17.4414 5.83497C17.5506 5.82723 17.6603 5.8411 17.7642 5.87577C17.868 5.91044 17.964 5.96524 18.0467 6.03703C18.1294 6.10883 18.1971 6.19621 18.246 6.29419Z" fill="#FAA523" />
      <path fillRule="evenodd" clipRule="evenodd" d="M16.9523 7.33C17.3023 7.69083 17.7332 8.1375 18.0915 8.6175C18.5415 9.22 18.9582 9.97583 18.9582 10.8333V13.725C18.9582 14.4567 18.464 15.1717 17.679 15.2758L15.0815 15.62C15.0544 15.623 15.0271 15.6247 14.9998 15.625H4.99984C4.97255 15.6247 4.94529 15.623 4.91817 15.62L2.32067 15.2758C1.53567 15.1717 1.0415 14.4567 1.0415 13.7258V10.8333C1.0415 9.97583 1.45817 9.22 1.90817 8.61667C2.2665 8.1375 2.69817 7.69167 3.04734 7.33C3.11817 7.25667 3.13317 7.1925 3.1665 7.09667L4.05984 4.50667C4.2265 4.025 4.37234 3.60167 4.53484 3.26667C4.709 2.90417 4.934 2.57167 5.299 2.31667C5.66317 2.06333 6.0615 1.9625 6.47234 1.91667C6.85317 1.875 7.314 1.875 7.84067 1.875H12.159C12.6857 1.875 13.1465 1.875 13.5273 1.91667C13.939 1.9625 14.3357 2.06333 14.7015 2.31667C15.0657 2.57167 15.2907 2.90417 15.4657 3.26667C15.6273 3.60167 15.7732 4.025 15.9398 4.50667L16.8332 7.09667C16.864 7.18667 16.8857 7.26083 16.9523 7.33ZM5.64984 6.875C5.32984 6.875 5.16984 6.875 5.09567 6.77C5.0215 6.665 5.07234 6.51417 5.17734 6.21167L5.5815 5.04C5.76484 4.50667 5.88234 4.17 6.00067 3.92583C6.15067 3.61417 6.314 3.50667 6.65567 3.46917C6.934 3.43833 7.3015 3.4375 7.88317 3.4375H12.1165C12.6982 3.4375 13.0665 3.43833 13.344 3.46917C13.6857 3.50667 13.849 3.61417 13.999 3.92583C14.1173 4.17 14.2348 4.5075 14.4182 5.04L14.8232 6.21167C14.9273 6.51417 14.979 6.665 14.9048 6.77C14.8298 6.875 14.6698 6.875 14.3498 6.875H5.64984ZM2.77984 9.65C2.63226 9.58083 2.4635 9.57204 2.30953 9.62551C2.15557 9.67898 2.02858 9.79048 1.95565 9.93624C1.88271 10.082 1.8696 10.2505 1.91911 10.4058C1.96862 10.5611 2.07683 10.6909 2.22067 10.7675L3.47067 11.3925C3.54418 11.4299 3.62437 11.4524 3.70662 11.4587C3.78886 11.465 3.87154 11.4549 3.94987 11.4291C4.02821 11.4033 4.10066 11.3622 4.16305 11.3082C4.22544 11.2543 4.27652 11.1885 4.31337 11.1147C4.35021 11.0409 4.37208 10.9605 4.37772 10.8782C4.38336 10.7959 4.37265 10.7133 4.34622 10.6352C4.31978 10.5571 4.27815 10.4849 4.2237 10.423C4.16926 10.361 4.10309 10.3104 4.029 10.2742L2.77984 9.65ZM17.7798 10.7675C17.9281 10.6933 18.0409 10.5633 18.0933 10.406C18.1458 10.2487 18.1336 10.0771 18.0594 9.92875C17.9853 9.78045 17.8552 9.66768 17.698 9.61525C17.5407 9.56282 17.369 9.57502 17.2207 9.64917L15.9707 10.2742C15.8237 10.349 15.7122 10.4788 15.6606 10.6355C15.609 10.7921 15.6213 10.9628 15.695 11.1103C15.7687 11.2579 15.8977 11.3703 16.0539 11.4232C16.2101 11.4761 16.3809 11.465 16.529 11.3925L17.7798 10.7675ZM10.8073 12.5H9.19234C8.37317 12.5 7.96317 12.5 7.64567 12.7283C7.399 12.905 7.25234 13.1875 7.0565 13.6825C6.97067 13.9 6.92734 14.0092 6.97734 14.0875C7.02734 14.1667 7.139 14.1667 7.364 14.1667H12.6365C12.8615 14.1667 12.974 14.1667 13.0232 14.0875C13.0732 14.0092 13.0298 13.9 12.944 13.6825C12.7482 13.1875 12.6007 12.905 12.3548 12.7275C12.0373 12.5 11.6273 12.5 10.8073 12.5Z" fill="#FAA523" />
    </svg>
  </IconBase>
);

const LunchIcon = () => (
  <IconBase>
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.0017 12.9616C11.6374 12.9616 12.9634 11.6357 12.9634 9.99999C12.9634 8.36431 11.6374 7.03833 10.0017 7.03833C8.36602 7.03833 7.04004 8.36431 7.04004 9.99999C7.04004 11.6357 8.36602 12.9616 10.0017 12.9616Z" fill="#FAA523" />
      <path d="M19.9973 5.62783C20.0159 6.11276 19.9296 6.59599 19.7444 7.04451C19.5591 7.49304 19.2791 7.89628 18.9237 8.22668C18.7891 8.33711 18.6827 8.47794 18.6132 8.63756C18.5436 8.79718 18.513 8.97103 18.5239 9.1448C18.7349 12.8506 18.8015 16.3342 18.8015 16.3342C18.8244 16.9006 18.3839 17.3783 17.8175 17.4011C17.2511 17.424 16.7734 16.9834 16.7506 16.4171C16.7495 16.3895 16.7495 16.3618 16.7506 16.3342C16.7506 16.3342 16.7728 15.2828 16.8283 13.7169C16.8691 12.4396 16.9357 10.8181 17.0282 9.1448C17.039 8.97141 17.0087 8.79793 16.9399 8.63842C16.871 8.47891 16.7656 8.33785 16.6321 8.22668C15.672 7.44212 15.3634 5.8935 15.6659 4.6838C15.9546 3.47322 16.7913 2.59583 17.7761 2.59583C19.0014 2.59583 19.9973 3.95449 19.9973 5.62783Z" fill="#FAA523" />
      <path d="M16.1585 8.80049C14.8696 7.73304 14.5185 5.68621 15.059 4.10255C12.2429 1.67732 8.10132 1.59343 5.18926 3.90264C5.18926 6.80664 5.26492 7.05945 4.87829 7.7454C4.66485 8.12461 4.35436 8.44021 3.97868 8.65981C3.92602 8.69257 3.87533 8.72842 3.8269 8.76717C3.65137 9.29374 3.97693 11.0447 4.07864 15.0237C6.84326 18.2959 11.7371 18.7074 15.0093 15.9428C15.3886 15.6223 15.7363 15.2662 16.0475 14.8793C16.0882 13.5132 16.1659 11.3438 16.2918 9.10036C16.295 9.04337 16.2846 8.98644 16.2615 8.93429C16.2383 8.88213 16.203 8.83626 16.1585 8.80049ZM10.002 13.702C7.95735 13.702 6.29989 12.0446 6.29989 9.99996C6.29989 7.95535 7.95735 6.29788 10.002 6.29788C12.0466 6.29788 13.704 7.95535 13.704 9.99996C13.7007 12.0431 12.0452 13.6987 10.002 13.702Z" fill="#FAA523" />
      <path d="M4.23406 7.38263C3.80092 8.14525 3.2345 7.98236 3.09382 8.64133C3.04493 8.91115 3.02507 9.18544 3.03459 9.45949C3.08272 10.1777 3.21969 12.2212 3.29744 13.9242C3.33904 13.9242 3.33668 16.2255 3.33076 16.2898C3.19748 17.7299 1.30572 17.8447 1.10951 16.2898C1.00955 15.5235 1.13172 12.9431 1.42048 9.46319C1.44046 9.19272 1.4205 8.92079 1.36125 8.65614C1.22057 8.00457 0.654155 8.15636 0.221012 7.40114C-0.0574766 6.90251 0.0062917 6.89474 0.0062917 3.28073C-0.0223068 2.97405 0.20315 2.70223 0.509866 2.67368C0.816537 2.64508 1.08836 2.87054 1.11691 3.17725C1.12011 3.21168 1.12011 3.24634 1.11691 3.28077V5.49832C1.11539 5.53573 1.12144 5.57307 1.1347 5.60809C1.14797 5.64311 1.16817 5.67508 1.19411 5.7021C1.22004 5.72911 1.25116 5.75061 1.28561 5.76529C1.32006 5.77997 1.35712 5.78754 1.39457 5.78754C1.43202 5.78754 1.46908 5.77997 1.50353 5.76529C1.53798 5.75061 1.5691 5.72911 1.59503 5.7021C1.62097 5.67508 1.64117 5.64311 1.65444 5.60809C1.6677 5.57307 1.67375 5.53573 1.67223 5.49832V3.28077C1.64363 2.9741 1.86908 2.70228 2.1758 2.67372C2.48252 2.64517 2.7543 2.87058 2.78285 3.1773C2.78604 3.21173 2.78604 3.24639 2.78285 3.28082V5.49836C2.78132 5.53578 2.78737 5.57312 2.80064 5.60813C2.8139 5.64315 2.83411 5.67513 2.86004 5.70214C2.88597 5.72916 2.9171 5.75065 2.95155 5.76533C2.986 5.78002 3.02306 5.78759 3.0605 5.78759C3.09795 5.78759 3.13501 5.78002 3.16946 5.76533C3.20391 5.75065 3.23503 5.72916 3.26097 5.70214C3.2869 5.67513 3.30711 5.64315 3.32037 5.60813C3.33364 5.57312 3.33969 5.53578 3.33816 5.49836V3.28082C3.30776 2.97591 3.53025 2.70408 3.83516 2.67368C4.14008 2.64327 4.4119 2.86577 4.4423 3.17068C4.44412 3.18885 4.44503 3.20705 4.44503 3.22529V3.22899C4.44809 3.24607 4.44934 3.26346 4.44874 3.28082C4.44878 6.87447 4.51292 6.88784 4.23406 7.38263Z" fill="#FAA523" />
    </svg>

  </IconBase>
);

const GuideIcon = () => (
  <IconBase>
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.0415 5.83333C6.0415 4.78352 6.45854 3.7767 7.20087 3.03437C7.94321 2.29204 8.95002 1.875 9.99984 1.875C11.0497 1.875 12.0565 2.29204 12.7988 3.03437C13.5411 3.7767 13.9582 4.78352 13.9582 5.83333C13.9582 6.88315 13.5411 7.88997 12.7988 8.6323C12.0565 9.37463 11.0497 9.79167 9.99984 9.79167C8.95002 9.79167 7.94321 9.37463 7.20087 8.6323C6.45854 7.88997 6.0415 6.88315 6.0415 5.83333ZM3.5415 15.8333C3.5415 14.5625 4.04634 13.3437 4.94495 12.4451C5.84356 11.5465 7.06234 11.0417 8.33317 11.0417H11.6665C12.9373 11.0417 14.1561 11.5465 15.0547 12.4451C15.9533 13.3437 16.4582 14.5625 16.4582 15.8333C16.4582 16.4411 16.2167 17.024 15.787 17.4538C15.3572 17.8836 14.7743 18.125 14.1665 18.125H5.83317C5.22538 18.125 4.64249 17.8836 4.21272 17.4538C3.78295 17.024 3.5415 16.4411 3.5415 15.8333Z" fill="#FAA523" />
    </svg>
  </IconBase>
);

const features = [
  { id: 1, icon: <CarIcon />, label: 'Car' },
  { id: 2, icon: <LunchIcon />, label: 'Lunch' },
  { id: 3, icon: <GuideIcon />, label: 'Guide' },
];


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
    <div className="mx-4">
      {/* Header */}
      <div className="flex mx-4 lg:mx-0 flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div className="">
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
              className={`p-2 rounded-md ${viewMode === "grid" ? "bg-white shadow-sm" : ""
                }`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-md ${viewMode === "list" ? "bg-white shadow-sm" : ""
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
                className={`${viewMode === "list"
                    ? "flex flex-col md:flex-row w-full"
                    : "w-full lg:w-[278px] h-[517px] flex flex-col"
                  } items-start p-0 bg-[#EFF2F880] rounded-2xl border border-opacity-25 border-[#BECCE8]
          transition-all duration-300 overflow-hidden hover:shadow-md hover:-translate-y-1`}
                style={{
                  backgroundImage:
                    "linear-gradient(0deg, rgba(239, 242, 248, 0.5), rgba(239, 242, 248, 0.5)), #FFFFFF",
                }}
              >
                {/* ======= IMAGE SECTION ======= */}
                <div
                  className={`relative ${viewMode === "list" ? "w-full md:w-1/3 h-[220px]" : "w-full h-[220px]"
                    } flex flex-col justify-end items-start p-[12px] md:p-[20px]`}
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center hover:scale-105 transition-transform duration-300 rounded-t-2xl"
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
                  className={`flex flex-col justify-between p-[20px] px-[16px] pb-[28px] ${viewMode === "list" ? "md:w-2/3" : "w-full h-[353px]"
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
                      {/* <div className="flex items-center gap-[10px]">
                  <Image
                    src="/images/home/featured/car-man-food.png"
                    width={70}
                    height={40}
                    alt="features"
                    className="object-contain"
                  />
                </div> */}
                      <div className="flex items-center gap-[10px]">
                        {features.map((item) => (
                          <div key={item.id} title={item.label}>
                            {item.icon}
                          </div>
                        ))}
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