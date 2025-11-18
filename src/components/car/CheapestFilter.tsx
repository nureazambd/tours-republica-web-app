import { useState } from "react";

export default function Filter() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      {/* BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center px-5 py-2 gap-[10px] w-[109px] h-[36px]
        border border-[#878D97] rounded-lg text-[#4B5563] text-[14px] font-normal 
        leading-[20px] font-[Rubik]"
      >
        <span>Sort by</span>

        {/* CUSTOM DOUBLE ARROW ICON */}
        <span className="relative w-[10px] h-[10px] flex flex-col justify-between">
        <svg
  width="10"
  height="10"
  viewBox="0 0 10 10"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <g clipPath="url(#clip0_756_8743)">
    <path
      d="M5.00011 9.99949L1.80566 5.74023H8.19455L5.00011 9.99949Z"
      fill="#4B5563"
    />
    <path
      d="M5.00011 0.416016L8.19455 4.67528H1.80566L5.00011 0.416016Z"
      fill="#4B5563"
    />
  </g>
  <defs>
    <clipPath id="clip0_756_8743">
      <rect width="10" height="10" fill="white" />
    </clipPath>
  </defs>
</svg>


        </span>
      </button>

      {/* DROPDOWN */}
      {open && (
        <div className="absolute mt-2 w-[150px] bg-white border border-gray-300 rounded-lg shadow-lg py-2 z-50">
          <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm">
             Cheapest
          </button>
          <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm">
            Highest Rated
          </button>
          <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm">
            Most Popular
          </button>
        </div>
      )}
    </div>
  );
}
