'use client'; // This component uses client hooks (useSearchParams)

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import CarList from "@/components/car/CarList";
import CarFilters from "@/components/car/CarFilters";

export default function CarBookingContent() {
  const [cars, setCars] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams(); // <-- The problematic hook

  async function handleSearch(filters: { q?: string; min?: number; max?: number }) {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filters.q) params.set("q", filters.q);
      if (typeof filters.min === "number") params.set("min", String(filters.min));
      if (typeof filters.max === "number") params.set("max", String(filters.max));

      const res = await fetch(`/api/cars?${params.toString()}`, { cache: "no-store" });
      const data = await res.json();
      setCars(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // Run automatically on first load, dependent on searchParams
    const q = searchParams.get("pickupLocation") || "";
    handleSearch({ q });
  }, [searchParams]);

  return (
    // <div className="container-custom py-12">
    //   <div className="mt-6">
    //     {loading ? <div className="p-6">Loading car list...</div> : <CarList cars={cars} />}
    //   </div>
    // </div>
    <div className=" py-12 flex gap-6 max-w-[1180px] mx-auto">
  <CarFilters />   {/* LEFT SIDEBAR */}
  
  <div className="flex-1">
    {loading ? <div className="p-6">Loading car list...</div> : <CarList cars={cars} />}
  </div>
</div>

  );
}