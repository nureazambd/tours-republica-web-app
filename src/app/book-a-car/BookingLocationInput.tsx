"use client";
import React, { useState } from "react";
import { Building2 } from "lucide-react";

interface Location {
  id: number;
  name: string;
  city: string;
  country: string;
}

interface Props {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const LOCATIONS: Location[] = [
  { id: 1, name: "Leonardo London", city: "Punta Cana", country: "Dominican Republic" },
  { id: 2, name: "Amber Residence Hotel", city: "Punta Cana", country: "Dominican Republic" },
  { id: 3, name: "STN - London, UK", city: "Punta Cana", country: "Dominican Republic" },
  { id: 4, name: "Four Seasons Hotel", city: "Punta Cana", country: "Dominican Republic" },
  { id: 5, name: "Hard Rock Hotel", city: "Punta Cana", country: "Dominican Republic" },
];

export default function BookingLocationInput({ label, value, onChange }: Props) {
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const filtered = LOCATIONS.filter((loc) =>
    loc.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (loc: Location) => {
    onChange(loc.name);
    setQuery("");
    setShowDropdown(false);
  };

  return (
    <div className="relative">
      <p className="text-sm text-gray-500 mb-1">{label}</p>
      <input
        value={query || value}
        onChange={(e) => {
          setQuery(e.target.value);
          setShowDropdown(true);
        }}
        onFocus={() => setShowDropdown(true)}
        onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
        placeholder="Search location..."
        className="w-full border px-3 py-2 rounded-md text-sm outline-none focus:ring-2 focus:ring-rose-400"
      />

      {showDropdown && filtered.length > 0 && (
        <div className="absolute z-10 w-full bg-white border rounded-lg mt-2 shadow-lg max-h-64 overflow-auto">
          {filtered.map((loc) => (
            <div
              key={loc.id}
              onClick={() => handleSelect(loc)}
              className={`flex items-start gap-3 p-3 hover:bg-gray-100 cursor-pointer ${
                value === loc.name ? "bg-gray-100" : ""
              }`}
            >
              <Building2 className="w-5 h-5 text-gray-600 mt-1" />
              <div>
                <p className="font-medium text-gray-800 text-sm">{loc.name}</p>
                <p className="text-xs text-gray-500">
                  {loc.city}, {loc.country}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
