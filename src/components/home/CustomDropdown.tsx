'use client';

import { useState } from 'react';

export default function CustomDropdown() {
  const [selectedLocation, setSelectedLocation] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const locations = [
    'Santo Domingo',
    'Punta Cana',
    'Samaná',
    'Puerto Plata',
    'Bayahibe',
  ];

  const handleSelect = (location: string) => {
    setSelectedLocation(location);
    setIsOpen(false);
  };

  return (
    <div className="relative w-40">
      {/* Selected item */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="
          text-[12px] leading-[18px] font-normal rounded-lg text-gray-400 bg-transparent focus:outline-none appearance-none
        "
      >
        {selectedLocation || 'Select destinations'}
        {/* <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg> */}
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div
          className="
            absolute mt-1 w-full
            bg-white
            border border-gray-300
            rounded-lg
            shadow-lg
            flex flex-col
            p-2
            z-50
          "
        >
          {locations.map((location, idx) => (
            <div key={location} className="flex flex-col">
              <div
                onClick={() => handleSelect(location)}
                className="
                  w-full
                  h-6
                  flex items-center
                  text-gray-900
                  px-2
                  cursor-pointer
                  hover:bg-gray-100
                  rounded
                  font-[400]
                  text-[16px] leading-[24px] font-rubik
                "
              >
                {location}
              </div>
              {/* Divider */}
              {idx < locations.length - 1 && (
                <div className="w-full h-px bg-gray-300 opacity-10 my-1" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
