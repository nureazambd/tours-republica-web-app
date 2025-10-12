// src/components/car/BookingLocationInput.tsx
"use client";
import React, { useState } from "react";

const commonLocations = [
  "Punta Cana Intl Airport",
  "Hotel King",
  "Báyahibe Port",
  "Santo Domingo - Colonial Zone",
  "Puerto Plata Airport",
  "La Romana - Casa de Campo",
];

export default function BookingLocationInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState(value || "");

  const suggestions = commonLocations.filter((l) =>
    l.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <p className="text-sm text-gray-500 mb-1">{label}</p>
      <div className="relative">
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            onChange(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          className="w-full border px-3 py-2 rounded-md outline-none text-sm"
        />
        {open && suggestions.length > 0 && (
          <ul className="absolute left-0 right-0 bg-white border mt-1 rounded-md shadow-md z-30 max-h-44 overflow-auto">
            {suggestions.map((s) => (
              <li
                key={s}
                onClick={() => {
                  setQuery(s);
                  onChange(s);
                  setOpen(false);
                }}
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
              >
                {s}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
