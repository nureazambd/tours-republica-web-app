"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Layout from "@/components/layout/Layout";

interface Tour {
  id: string;
  title: string;
  image: string;
  description: string;
  duration: string;
  location: string;
  price: number;
  discount?: number;
  pickup?: string;
}

export default function TourDetailsPage() {
  const { id } = useParams();
  const router = useRouter();

  const [tour, setTour] = useState<Tour | null>(null);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);

  // ✅ Fetch Tour Details
  useEffect(() => {
    async function fetchTour() {
      try {
        setLoading(true);
        const res = await fetch(`/api/tours/${id}`, { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to load tour");
        const data = await res.json();
        setTour(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchTour();
  }, [id]);

  // ✅ Calculate Totals
  useEffect(() => {
    if (tour) {
      const adultCost = tour.price * adults;
      const childCost = (tour.price * 0.5) * children; // 50% discount for children
      const subtotalValue = adultCost + childCost;
      const taxValue = subtotalValue * 0.1; // 10% tax
      const totalValue = subtotalValue + taxValue;

      setSubtotal(subtotalValue);
      setTax(taxValue);
      setTotal(totalValue);
    }
  }, [adults, children, tour]);

  // ✅ Handle Booking
  const handleBookNow = () => {

    if (!tour) return;
    localStorage.setItem(
      "selectedTour",
      JSON.stringify({
        ...tour,
        adults,
        children,
        subtotal,
        tax,
        total,
      })
    );
    router.push(`/payment/${tour.id}`);
  };

  if (loading) return <div className="text-center p-10">Loading tour details...</div>;
  if (error) return <div className="text-center text-red-600 p-10">{error}</div>;
  if (!tour) return <div className="text-center p-10">No tour found.</div>;

  return (
    <Layout>
      <div className="min-h-screen bg-white text-black py-12">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 px-4">

          {/* ================= Left Section ================= */}
          <div>
            <Image
              src={tour.image || "/images/sample.jpg"}
              alt={tour.title}
              width={800}
              height={500}
              className="rounded-xl shadow-md object-cover"
            />
            <h1 className="text-3xl font-bold mt-6">{tour.title}</h1>
            <p className="text-gray-700 mt-4 leading-relaxed">{tour.description}</p>

            <div className="mt-6 text-sm text-gray-600">
              <p><strong>Location:</strong> {tour.location}</p>
              <p><strong>Duration:</strong> {tour.duration}</p>
              <p><strong>Pickup:</strong> {tour.pickup || "Available upon request"}</p>
            </div>
          </div>

          {/* ================= Right Booking Section ================= */}
          <div className="bg-gray-50 rounded-xl p-6 shadow-sm border">
            <h2 className="text-xl font-semibold mb-4">Booking Details</h2>

            {/* Select Passengers */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Adults</span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setAdults(Math.max(1, adults - 1))}
                    className="border rounded-full w-8 h-8 flex items-center justify-center"
                  >
                    -
                  </button>
                  <span>{adults}</span>
                  <button
                    onClick={() => setAdults(adults + 1)}
                    className="border rounded-full w-8 h-8 flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span>Children</span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setChildren(Math.max(0, children - 1))}
                    className="border rounded-full w-8 h-8 flex items-center justify-center"
                  >
                    -
                  </button>
                  <span>{children}</span>
                  <button
                    onClick={() => setChildren(children + 1)}
                    className="border rounded-full w-8 h-8 flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Price Summary */}
            <div className="mt-6 border-t pt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax (10%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg border-t pt-3">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Book Button */}
            <button
              onClick={handleBookNow}
              className="w-full bg-rose-500 text-white py-3 rounded-lg mt-6 hover:bg-rose-600 transition-all duration-300"
            >
              Proceed to Payment →
            </button>

            <p className="text-xs text-gray-500 mt-3 text-center">
              You’ll review all booking details before final confirmation.
            </p>

            {/* Back Link */}
            <div className="text-center mt-4">
              <Link href="/tours" className="text-rose-500 hover:underline">
                ← Back to Tours
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
