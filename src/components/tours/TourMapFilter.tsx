'use client';

import { useState } from 'react';
import { MapPin } from 'lucide-react';

const TourMapFilter: React.FC = () => {
  const [showFullMap, setShowFullMap] = useState(false);

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      {/* Map Preview */}
      <div className="relative w-[280px] h-[180px] rounded-[16px] flex flex-col justify-center items-center cursor-pointer overflow-hidden">
        {/* World map background */}
        <div
          className="absolute top-0 left-0 w-full h-full rounded-[16px] bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(0deg, rgba(2, 14, 86, 0.2), rgba(2, 14, 86, 0.2)),
                              linear-gradient(0deg, rgba(1, 4, 108, 0.05), rgba(1, 4, 108, 0.05)),
                              linear-gradient(180deg, rgba(0, 62, 98, 0.05) 0%, rgba(6, 66, 101, 0.1) 100%),
                              url('/images/tours/Figmap.svg')`,
          }}
        />

        {/* "Show on Map" button */}
        <button
          onClick={() => setShowFullMap(true)}
          className="flex items-center justify-center gap-2 px-5 py-2 bg-white rounded-[12px] shadow-md z-10 w-[152px] h-[40px]"
        >
          <MapPin className="w-4 h-4 text-[#EE2552]" />
          <span className="text-[#EE2552] font-normal text-sm leading-[24px]">
            Show on Map
          </span>
        </button>
      </div>

      {/* Full Map Section (Middle of Page) */}
      {showFullMap && (
        <div className="w-full max-w-[800px] h-[400px] rounded-[16px] overflow-hidden border border-gray-200 mt-4">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d48276.54692309174!2d-69.9312115!3d18.4860575!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8ea56208e1467d11%3A0x7d8d4d4b6ef62b!2sSanto%20Domingo!5e0!3m2!1sen!2sdo!4v1701234567890!5m2!1sen!2sdo"
            width="100%"
            height="100%"
            allowFullScreen
            loading="lazy"
            className="w-full h-full"
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default TourMapFilter;
