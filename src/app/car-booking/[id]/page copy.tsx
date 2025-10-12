// src/app/car-booking/[id]/page.tsx
"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Layout from "@/components/layout/Layout";
import CarBookingSummary from "@/components/car/CarBookingSummary";

export default function CarDetailsPage() {
  const { id } = useParams();
  const [car, setCar] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (!id) return;
      try {
        setLoading(true);
        const res = await fetch(`/api/cars/${id}`, { cache: "no-store" });
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err?.error || "Failed to load car");
        }
        const data = await res.json();
        setCar(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (!car) return <div className="p-8 text-center">Car not found</div>;

  return (
    <Layout>
      <div className="container-custom py-12">
        <CarBookingSummary car={car} />
      </div>
    </Layout>
  );
}
