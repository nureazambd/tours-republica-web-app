'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface PriceFilterProps {
  prices?: number[];
  minPrice?: number;
  maxPrice?: number;
}

const PriceFilter: React.FC<PriceFilterProps> = ({
  prices = [350, 1800, 2400, 9000, 4500, 12000, 16000, 19544],
  minPrice = 50,
  maxPrice = 1400,
}) => {
  const [open, setOpen] = useState(true);

  const normalized = prices.map(
    (p) => ((p - minPrice) / (maxPrice - minPrice)) * 100
  );

  return (
    <div
      className="
        w-full lg:w-[280px] bg-[#F9FAFB]
        border border-[#BECCE8] rounded-[12px]
        px-[24px] pt-[20px] pb-[24px]
        flex flex-col gap-2
      "
    >
      {/* HEADER */}
      <div
        className="flex items-center justify-between cursor-pointer w-full"
        onClick={() => setOpen(!open)}
      >
        <p className="text-[18px] font-medium text-[#1A202C] font-rubik">
          Price Filter
        </p>

        {open ? (
          <ChevronUp size={20} className="text-[#747D8F]" />
        ) : (
          <ChevronDown size={20} className="text-[#747D8F]" />
        )}
      </div>

      {/* CONTENT */}
      {open && (
        <div className="flex flex-col w-full mt-2">
          {/* PRICE LABELS */}
          <div className="flex justify-between text-[12px] text-[#878D97] font-rubik">
            <span>${minPrice.toLocaleString()}</span>
            <span>${maxPrice.toLocaleString()}</span>
          </div>

          {/* GRAPH */}
          <div className="relative w-full h-[88px]  rounded-[6px] flex items-end gap-[0px] px-1">
            {normalized.map((value, i) => (
              <div
                key={i}
                // className={`
                //   w-full rounded-[2px]
                //   ${i % 3 === 0 ? 'bg-[#22228B]' : 'bg-[#E6E6E9]'}
                // `}
                className={`
                  w-full rounded-[2px]
                  ${i % 3 === 0 ? 'bg-[#BECCE8]' : 'bg-[#BECCE8]'}
                `}
                style={{ height: `${value}%` }}
              />
            ))}
          </div>

          {/* RANGE SLIDER */}
          <div className="relative w-full h-4 flex items-center justify-center -mt-2">
            {/* Line */}
            <div className="absolute w-[111px] h-[3px] bg-[#6FCCDC] rounded" />

            {/* Dots */}
            <div className="flex justify-between w-[128px] z-10">
              <div className="w-4 h-4 rounded-full bg-[#F3F6FB] border-[3px] border-[#6FCCDC]" />
              <div className="w-4 h-4 rounded-full bg-[#F3F6FB] border-[3px] border-[#6FCCDC]" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PriceFilter;
