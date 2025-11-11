"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

interface Highlight {
  id: number;
  title: string;
  desc: string;
  image: string;
  mapUrl?: string;
}

const highlights: Highlight[] = [
  {
    id: 1,
    title: "3 Eyes National Park",
    desc: "Explore stunning crystal clear lagoons.",
    image: "/images/tours-id/3-Eyes-National-Park.png",
  },
  {
    id: 2,
    title: "Columbus Lighthouse",
    desc: "Visit the iconic cross-shaped monument and museum.",
    image: "/images/tours-id/Columbus-Lighthouse.png",
  },
  {
    id: 3,
    title: "Alcázar de Colón",
    desc: "Step into the oldest viceregal residence in America.",
    image: "/images/tours-id/Alcázar-de-Colón.png",
  },
  {
    id: 4,
    title: "Zona Colonial",
    desc: "Wander the cobblestone of the historic old town.",
    image: "/images/tours-id/Zona-Colonial.jpg",
  },
  {
    id: 5,
    title: "Malecon Waterfront",
    desc: "Enjoy local cuisine along the promenade.",
    image: "/images/tours-id/Malecon.jpg",
  },
];

export default function TourHighlights() {
  const [index, setIndex] = useState(0);

  // show 3 cards at once
  const visible = highlights.slice(index, index + 3).length === 3
    ? highlights.slice(index, index + 3)
    : [...highlights.slice(index), ...highlights.slice(0, 3 - (highlights.length - index))];

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % highlights.length);
  };

  return (
    <section className="relative flex flex-col items-start p-[40px_32px] gap-2 w-[760px] bg-[rgba(239,242,248,0.5)] rounded-[24px]">
      {/* Section Title */}
      <h2 className="text-[28px] font-[500] leading-[40px] text-[#191919] text-center w-full">
        Tour Highlights
      </h2>

      {/* Highlights Row */}
      <div className="relative flex justify-between items-center gap-5 w-[696px] mx-auto">
        {visible.map((h) => (
          <div
            key={h.id}
            className="flex flex-col items-start w-[218px]  bg-white rounded-[12px] shadow-sm overflow-hidden"
          >
            <Image
              src={h.image}
              alt={h.title}
              width={218}
              height={144}
              className="w-[218px] h-[144px] object-cover rounded-t-[12px]"
            />
            <div className="flex flex-col items-start p-[20px] gap-3 w-full ">
              <div className="flex flex-col items-start gap-2">
                <h3 className="text-[16px] font-[500] text-[#191919]">{h.title}</h3>
                <p className="text-[13px] font-[400] leading-[20px] text-[#878D97]">
                  {h.desc}
                </p>
              </div>
              <button className="flex items-center justify-center gap-2 px-4 py-2 border border-[#EE2552] rounded-lg bg-[rgba(238,37,82,0.05)] text-[#EE2552] text-[13px] font-[400] hover:bg-[#EE2552]/10 transition">
                View map
              </button>
            </div>
          </div>
        ))}

        {/* Next button (infinite loop) */}
        <button
          onClick={handleNext}
          className="absolute right-[-28px] top-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-8 p-[6px] rounded-full bg-[rgba(233,48,91,0.2)] hover:bg-[rgba(233,48,91,0.3)] transition"
        >
          <ChevronRight className="w-5 h-5 text-[#EE2552]" strokeWidth={1.5} />
        </button>
      </div>
    </section>
  );
}
