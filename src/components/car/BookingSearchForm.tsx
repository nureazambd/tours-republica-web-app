// src/components/car/BookingSearchForm.tsx
"use client";
import React, { useState } from "react";
import BookingLocationInput from "./BookingLocationInput";

export default function BookingSearchForm({
  onSearch,
  initialQ = "",
}: {
  onSearch: (filters: { q?: string; min?: number; max?: number }) => void;
  initialQ?: string;
}) {
  const [q, setQ] = useState(initialQ);
  const [min, setMin] = useState<number | "">("");
  const [max, setMax] = useState<number | "">("");

  return (
    <div className="bg-white shadow-xl rounded-xl p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        <div className="md:col-span-2">
          <label className="text-sm text-gray-600 mb-1 block">Search (car, brand, location)</label>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="w-full border px-3 py-2 rounded-md"
            placeholder="e.g. Toyota, Punta Cana"
          />
        </div>

        <div className="flex gap-2 items-center">
          <div>
            <label className="text-sm text-gray-600">Min price</label>
            <input
              type="number"
              min={0}
              value={min === "" ? "" : min}
              onChange={(e) => setMin(e.target.value === "" ? "" : Number(e.target.value))}
              className="border px-3 py-2 rounded-md w-28"
            />
          </div>
          <div>
            <label className="text-sm text-gray-600">Max price</label>
            <input
              type="number"
              min={0}
              value={max === "" ? "" : max}
              onChange={(e) => setMax(e.target.value === "" ? "" : Number(e.target.value))}
              className="border px-3 py-2 rounded-md w-28"
            />
          </div>

          <button
            onClick={() =>
              onSearch({
                q: q || undefined,
                min: min === "" ? 0 : Number(min),
                max: max === "" ? 9999999 : Number(max),
              })
            }
            className="bg-rose-500 text-white px-4 py-2 rounded-md"
          >
            Find Cars
          </button>
        </div>
      </div>
    </div>
  );
}
