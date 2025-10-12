// src/app/car-booking/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import CarList from "@/components/car/CarList";
import Layout from "@/components/layout/Layout";

export default function CarBookingPage() {
  const [cars, setCars] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();

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
    // Run automatically on first load
    const q = searchParams.get("pickupLocation") || "";
    handleSearch({ q });
  }, [searchParams]);

  return (
    <Layout>
      <div className="container-custom py-12">
        <div className="mt-6">
          {loading ? <div className="p-6">Loading...</div> : <CarList cars={cars} />}
        </div>
      </div>
    </Layout>
  );
}
