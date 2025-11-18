"use client";
import React from "react";
import Image from "next/image";
import { Star, Users, Luggage, ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import CheapestFilter from "./CheapestFilter";

export default function CarList({ cars }: { cars: any[] }) {
  const router = useRouter();

  if (!cars || cars.length === 0) {
    return (
      <div className="text-gray-500 p-6">No cars found — try different filters.</div>
    );
  }

  return (
    <div className="space-y-6 pb-20">
      
      {/* ---------------- TOP SECTION ---------------- */}
      <div className="flex justify-between items-center w-full">
        
        {/* LEFT TITLE */}
        <h2 className="text-[40px] font-medium leading-[48px] text-[#191919]">
          {cars.length} cars found
        </h2>

        {/* RIGHT CONTROLS */}
        <div className="flex items-center gap-6">

          
          {/* Cheapest Filter */}
          {/* <button className="flex items-center justify-between px-5 py-2 gap-2 w-[107px] h-[36px] border border-[#878D97] rounded-lg text-[#4B5563] text-sm">
            Cheapest
            <span className="w-[10px] h-[10px] bg-[#4B5563] inline-block rotate-90 clip-path-polygon" />
          </button> */}
          <CheapestFilter/>

        </div>
      </div>

      {/* ---------------- CARS LIST ---------------- */}
      {cars.map((car) => (
        <div
          key={car._id}
          className="w-full flex justify-between items-center p-6 gap-[74px] bg-[#EFF2F8]/50 border border-[#BECCE8]/50 rounded-2xl"
        >
          {/* LEFT SECTION */}
          <div className="flex items-center gap-4">
            {/* IMAGE */}
            <div className="relative w-[200px] h-[120px] bg-white rounded-lg overflow-hidden">
              <Image
                src={car.image || "/images/cars/placeholder.png"}
                alt={car.name}
                fill
                className="object-contain"
              />
            </div>

            {/* DETAILS */}
            <div className="flex flex-col gap-[12px] ">
              <div className="flex items-center gap-4">
                <h3 className="text-[20px] font-medium text-[#1A202C]">{car.name}</h3>
                <span className="bg-[#6FCCDC] text-[#191919] px-4 py-1 rounded-md text-xs">
                  Private
                </span>
              </div>

              <div className=" items-center gap-4 text-sm">
                <span className="text-[#747D8F]">{car.type}</span>
                
                <div className="flex mt-2">
                  <div className="flex items-center gap-1">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.3206 12.1113C14.4084 12.1629 14.5134 12.2229 14.6354 12.2913C15.166 12.5905 15.9675 13.043 16.5175 13.581C16.8605 13.9174 17.1872 14.3602 17.2468 14.9034C17.3093 15.4809 17.0577 16.0227 16.5524 16.5034C15.6802 17.3347 14.6347 18 13.281 18H6.71876C5.36583 18 4.3195 17.3347 3.44806 16.5042C2.94202 16.0227 2.69048 15.4809 2.75374 14.9034C2.81327 14.3602 3.13922 13.9174 3.48304 13.581C4.03225 13.043 4.83448 12.5913 5.36434 12.2913C5.48564 12.2236 5.59281 12.1626 5.67913 12.1113C6.98766 11.3378 8.47984 10.9297 9.99988 10.9297C11.5199 10.9297 13.0121 11.3378 14.3206 12.1113ZM6.0929 5.90698C6.0929 4.87078 6.50453 3.87703 7.23723 3.14433C7.96993 2.41163 8.96368 2 9.99988 2C11.0361 2 12.0298 2.41163 12.7625 3.14433C13.4952 3.87703 13.9069 4.87078 13.9069 5.90698C13.9069 6.94317 13.4952 7.93693 12.7625 8.66963C12.0298 9.40233 11.0361 9.81395 9.99988 9.81395C8.96368 9.81395 7.96993 9.40233 7.23723 8.66963C6.50453 7.93693 6.0929 6.94317 6.0929 5.90698Z" fill="#1A202C"/>
</svg>

                  <span className="text-[#1A202C]"> {car.capacity || 4}</span>
                </div>

                <div className="flex items-center gap-1 ml-2">
                  <Luggage size={16} className="text-[#1A202C]" />
                  <span className="text-[#1A202C]">{car.luggage || "x4"}</span>
                </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map((i) => (
                    <Star key={i} size={18} className="text-[#FAA523] fill-[#FAA523]" />
                  ))}
                </div>
                <span className="text-[#747D8F] text-sm">
                  {car.rating} Ratings
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT SECTION */}
          <div className="flex flex-col items-end gap-4 w-[106px]">
            <div className="text-right">
              <div className="text-[20px] font-medium text-[#1A202C]">US$ {car.price}</div>
            </div>

            <button
              onClick={() => router.push(`/car-booking/${car._id}`)}
              className="bg-[#EE2552] text-white px-5 py-2 rounded-lg flex items-center gap-2 text-[16px]"
            >
              Book
              <ChevronRight size={16} />
            </button>
          </div>

        </div>
      ))}
    </div>
  );
}
