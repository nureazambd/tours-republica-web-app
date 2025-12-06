"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Plus, Minus, ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CarBookingSummary({
  car,
  onBack,
  onBook,
}: {
  car: any;
  onBack?: () => void;
  onBook?: (payload: any) => void;
}) {
  const router = useRouter();
  const [services, setServices] = useState([
    { name: "Child seat (9–18kg)", price: 15, qty: 0 },
    { name: "Booster seat (15–30 kg)", price: 15, qty: 0 },
    { name: "GPS navigation", price: 15, qty: 0 },
  ]);

  const changeQty = (i: number, d: number) =>
    setServices((prev) =>
      prev.map((s, idx) =>
        idx === i ? { ...s, qty: Math.max(0, s.qty + d) } : s
      )
    );

  const extrasTotal = services.reduce((acc, s) => acc + s.qty * s.price, 0);
  const total = (car?.price || 0) + extrasTotal;

  // 🔹 Handle booking click
  const handleBook = () => {
    // Example: check if user is logged in (you can replace this logic with real auth)
    const isLoggedIn =
      typeof window !== "undefined" && localStorage.getItem("user");

    if (!isLoggedIn) {
      // redirect to login page if not logged in
      router.push("/login?redirect=/car-booking");
      return;
    }

    // Proceed with booking if logged in
    onBook?.({ services, total });
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm space-y-6">
      <div>
        <Image
          src={car?.image || "/images/cars/placeholder.png"}
          alt={car?.name || "car"}
          width={400}
          height={240}
          className="rounded-lg object-cover mb-4"
        />
        <h3 className="text-lg font-semibold">{car?.name}</h3>
        <p className="text-sm text-gray-600">{car?.description}</p>
      </div>

      <div className="border-t pt-4">
        <h4 className="font-semibold mb-2">Booking details</h4>
        <div className="text-sm text-gray-700">
          <div className="flex justify-between">
            <span>Car</span>
            <span>{car?.name}</span>
          </div>
          <div className="flex justify-between">
            <span>Traveler</span>
            <span>-</span>
          </div>
          <div className="flex justify-between">
            <span>Baggage</span>
            <span>{car?.baggage || "-"}</span>
          </div>
          <div className="flex justify-between">
            <span>Total</span>
            <span className="font-bold">US$ {total}</span>
          </div>
        </div>
      </div>

      <div>
        <h4 className="font-semibold mb-2">Additional services</h4>
        <div className="space-y-3">
          {services.map((s, i) => (
            <div key={s.name} className="flex items-center justify-between">
              <div>
                <div className="font-medium">{s.name}</div>
                <div className="text-xs text-gray-500">US$ {s.price}</div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => changeQty(i, -1)}
                  className="w-8 h-8 border rounded-full flex items-center justify-center"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <div>{s.qty}</div>
                <button
                  onClick={() => changeQty(i, 1)}
                  className="w-8 h-8 border rounded-full flex items-center justify-center"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div>
          {onBack && (
            <button
              onClick={onBack}
              className="text-gray-600 flex items-center gap-2"
            >
              <ChevronLeft /> Back
            </button>
          )}
        </div>
        <div className="text-right">
          <div className="text-xs text-gray-500">Total payable</div>
          <div className="text-2xl font-bold">US$ {total}</div>
        </div>
      </div>

      {/* ✅ Booking Button */}
      <button
        onClick={handleBook}
        className="mt-3 w-full bg-rose-500 text-white py-2 rounded-lg hover:bg-rose-600"
      >
        Book →
      </button>
    </div>
  );
}
