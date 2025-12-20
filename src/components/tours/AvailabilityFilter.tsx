"use client";

import React, { useState } from "react";

const availabilityOptions = ["Today", "Tomorrow", "Select a date"];

export default function AvailabilityFilter() {
  const [selected, setSelected] = useState<string[]>([]);
  const [collapsed, setCollapsed] = useState(false);

  const toggleOption = (option: string) => {
    setSelected((prev) =>
      prev.includes(option)
        ? prev.filter((o) => o !== option)
        : [...prev, option]
    );
  };

  return (
    <div className="w-full lg:w-72 bg-[#F9FAFB] border border-[#BECCE8]/50 rounded-xl p-5 flex flex-col gap-2">
      {/* Header */}
      <div className="flex justify-between items-center w-full cursor-pointer" onClick={() => setCollapsed(!collapsed)}>
        <p className="text-[18px] font-medium text-[#1A202C]">Availability</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`w-4 h-4 text-[#747D8F] transition-transform duration-200 ${collapsed ? "rotate-0" : "rotate-180"}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* Checkbox Options */}
      <div className={`flex flex-col gap-2 mt-2 transition-all duration-200 ${collapsed ? "max-h-0 overflow-hidden" : "max-h-96"}`}>
        {availabilityOptions.map((option) => (
          <label key={option} className="flex items-center gap-3 py-1 cursor-pointer">
            <input
              type="checkbox"
              checked={selected.includes(option)}
              onChange={() => toggleOption(option)}
              className="w-5 h-5 border border-[#BECCE8] rounded focus:ring-0"
            />
            <span className="text-sm text-[#4B5563]">{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
