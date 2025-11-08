'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface PriceGraphProps {
  prices: number[];
  maxPrice?: number;
  minPrice?: number;
}

const PriceFilter: React.FC<PriceGraphProps> = ({
  prices,
  maxPrice = 20000,
  minPrice = 0,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const normalizedPrices = prices.map(
    (price) => ((price - minPrice) / (maxPrice - minPrice)) * 100
  );

  return (
    <div className="w-72 bg-[#F9FAFB] border border-[#BECCE8] rounded-lg p-5 flex flex-col gap-2">
      {/* Header with toggle */}
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <span className="text-[#1A202C] font-medium text-lg">Price Filter</span>
        {isCollapsed ? (
          <ChevronDown size={20} className="text-gray-500" />
        ) : (
          <ChevronUp size={20} className="text-gray-500" />
        )}
      </div>

      {/* Collapsible content */}
      {!isCollapsed && (
        <>
          {/* Graph bars */}
          <div className="relative w-full h-40 bg-[#BECCE8] bg-opacity-50 flex items-end gap-2 p-1 rounded">
            {normalizedPrices.map((price, index) => (
              <div
                key={index}
                className="bg-[#22228B] rounded-sm"
                style={{
                  width: `${100 / prices.length - 4}%`,
                  height: `${price}%`,
                }}
              ></div>
            ))}
          </div>

          {/* Min-Max Labels */}
          <div className="flex justify-between text-sm text-[#878D97] mt-2">
            <span>${minPrice.toLocaleString()}</span>
            <span>${maxPrice.toLocaleString()}</span>
          </div>

          {/* Dots / Range Indicators */}
          <div className="flex justify-between items-center mt-3 w-full">
            <div className="w-4 h-4 rounded-full border-2 border-[#6FCCDC] bg-[#F3F6FB]"></div>
            <div className="w-4 h-4 rounded-full border-2 border-[#6FCCDC] bg-[#F3F6FB]"></div>
          </div>
        </>
      )}
    </div>
  );
};

export default PriceFilter;
