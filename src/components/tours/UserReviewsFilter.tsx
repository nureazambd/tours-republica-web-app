'use client';

import { useState } from 'react';
import { Star, ChevronDown, ChevronUp } from 'lucide-react';

interface UserReviewsProps {
  filters: { rating: number };
  setFilters: (filters: { rating: number }) => void;
}

const ratings = [5, 4, 3, 2, 1];

const UserReviewsFilter: React.FC<UserReviewsProps> = ({ filters, setFilters }) => {
  const [open, setOpen] = useState(true);

  return (
    <div className="bg-[#F9FAFB] border border-[#BECCE8] rounded-lg p-5 w-72">
      {/* Header with toggle */}
      <div
        className="flex justify-between items-center cursor-pointer mb-4"
        onClick={() => setOpen(!open)}
      >
        <p className="text-[#1A202C] font-medium text-[18px] leading-[24px]">
          User Reviews
        </p>
        {open ? (
          <ChevronUp className="w-6 h-6 text-gray-600" />
        ) : (
          <ChevronDown className="w-6 h-6 text-gray-600" />
        )}
      </div>

      {/* Collapsible content */}
      {open && (
        <div className="flex flex-col gap-3">
          {ratings.map((rating) => (
            <label
              key={rating}
              className="flex items-center cursor-pointer gap-3"
            >
              <input
                type="radio"
                name="rating"
                checked={filters.rating === rating}
                onChange={() => setFilters({ ...filters, rating })}
                className="w-5 h-5 text-primary-500 border-gray-300"
              />
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < rating ? 'text-[#FAA523] fill-current' : 'text-gray-300'
                    }`}
                  />
                ))}
                <span className="text-gray-700 text-sm">& up</span>
              </div>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserReviewsFilter;
