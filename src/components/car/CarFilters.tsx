"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import PriceFilter from "../tours/PriceFilter";
const StarIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="relative"
  >
    <path
      d="M10 1.5L12.4721 7.1459L18.4853 7.8541L13.7426 12.1041L15.0902 18.1459L10 14.9L4.90983 18.1459L6.25736 12.1041L1.51472 7.8541L7.52786 7.1459L10 1.5Z"
      fill="#FAA523"
      stroke="#FAA523"
      strokeWidth="1"
    />
  </svg>
);
export default function CarFilters() {
  const [openStops, setOpenStops] = useState(true);
  const [openTransmission, setOpenTransmission] = useState(true);
  const [openPrice, setOpenPrice] = useState(true);
   const [openRating, setOpenRating] = useState(true);

  const ratingOptions = [
    { stars: 5 },
    { stars: 4 },
    { stars: 3 },
    { stars: 2 },
    { stars: 1 },
  ];

  return (
    <div className="w-full lg:w-[280px] flex flex-col gap-4 mb-6 lg:mb-0">
      {/* ----------- FILTER: STOPS ----------- */}
      <div className="bg-[#EFF2F8]/50 mx-4 lg:mx-0  border border-[#BECCE833] rounded-xl p-6 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h3 className="text-[18px] font-medium text-[#191919]">Passengers</h3>
          <button onClick={() => setOpenStops(!openStops)}>
            <ChevronDown
              className={`w-5 h-5 text-[#878D97] transition-transform ${
                openStops ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>

        {openStops && (
          <div className="flex flex-col gap-3 mt-2">
            {/* Option 1 */}
            <label className="flex items-center gap-3 cursor-pointer">
              <div className="w-6 h-6 rounded border border-[#BECCE8]"></div>
              <span className="text-sm text-[#191919]">From 1 - 4</span>
            </label>

            {/* Option 2 */}
            <label className="flex items-center gap-3 cursor-pointer">
              <div className="w-6 h-6 rounded border border-[#BECCE8]"></div>
              <span className="text-sm text-[#191919]">From 4 - 6</span>
            </label>

            {/* Option 3 */}
            <label className="flex items-center gap-3 cursor-pointer">
              <div className="w-6 h-6 rounded border border-[#BECCE8]"></div>
              <span className="text-sm text-[#191919]">More than 7</span>
            </label>
          </div>
        )}
      </div>

      {/* ----------- FILTER: TRANSMISSION ----------- */}
      <div className="bg-[#EFF2F8]/50 mx-4 lg:mx-0  border border-[#BECCE833] rounded-xl p-6 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h3 className="text-[18px] font-medium text-[#191919]">Transition</h3>
          <button onClick={() => setOpenTransmission(!openTransmission)}>
            <ChevronDown
              className={`w-5 h-5 text-[#878D97] transition-transform ${
                openTransmission ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>

        {openTransmission && (
          <div className="flex flex-col gap-3 mt-2">
            <label className="flex items-center gap-3 cursor-pointer">
              <div className="w-6 h-6 rounded border border-[#BECCE8]"></div>
              <span className="text-sm text-[#191919]">Manual</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <div className="w-6 h-6 rounded border border-[#BECCE8]"></div>
              <span className="text-sm text-[#191919]">Automatic</span>
            </label>
          </div>
        )}
      </div>

      {/* ----------- FILTER: PRICE RANGE ----------- */}
      {/* <div className="bg-[#EFF2F8]/50 border border-[#BECCE833] rounded-xl p-6 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h3 className="text-[18px] font-medium text-[#191919]">Price Range</h3>
          <button onClick={() => setOpenPrice(!openPrice)}>
            <ChevronDown
              className={`w-5 h-5 text-[#878D97] transition-transform ${
                openPrice ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>

        {openPrice && (
          <div className="flex flex-col gap-3 mt-2">
            <div className="flex justify-between text-xs text-[#191919]">
              <span>$3.54</span>
              <span>$19,544</span>
            </div>

            
            <div className="relative w-full h-4 bg-[#BECCE8]/50 rounded overflow-hidden">
              
              <div className="absolute left-[5%] w-[10%] h-full bg-[#22228B]" />
              <div className="absolute left-[25%] w-[10%] h-full bg-[#22228B]" />
              <div className="absolute left-[40%] w-[10%] h-full bg-[#22228B]" />
              <div className="absolute left-[55%] w-[10%] h-full bg-[#E6E6E9]" />
              <div className="absolute left-[70%] w-[10%] h-full bg-[#22228B]" />
              <div className="absolute left-[85%] w-[10%] h-full bg-[#E6E6E9]" />
            </div>
          </div>
        )}
      </div> */}

      <div className=" mx-4 lg:mx-0 "><PriceFilter prices={[300, 600, 800, 700, 400, 250, 600, 750, 750, 900,
    1050, 860, 750, 600, 900, 800, 10, 300, 100, 250, 250, 400, 400, 500, 650, 300, 300, 1400 ]} /></div>

      {/* ----------- FILTER: RATING ----------- */}
<div className="bg-[#EFF2F8]/50  border border-[#BECCE833] rounded-xl p-6 flex flex-col gap-4 w-full lg:w-[280px]">
    
      {/* Header */}
      <div className="flex justify-between items-center w-full">
        <h3 className="text-[18px] font-medium text-[#191919]">User Reviews</h3>

        <button onClick={() => setOpenRating(!openRating)}>
          <ChevronDown
            className={`w-5 h-5 text-[#878D97] transition-transform ${
              openRating ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      {/* List */}
      {openRating && (
        <div className="flex flex-col gap-4 mt-2">

          {ratingOptions.map(({ stars }) => (
            <label
              key={stars}
              className="flex items-center gap-3 cursor-pointer"
            >
              {/* Custom Checkbox */}
              <div className="w-6 h-6 rounded border border-[#BECCE8]" />

              {/* Star Icons */}
              <div className="flex gap-1">
                {Array(stars)
                  .fill(0)
                  .map((_, i) => (
                    <StarIcon key={i} />
                  ))}
              </div>
            </label>
          ))}

        </div>
      )}
      

    </div>

    </div>
  );
}
