'use client';

import Image from "next/image";
import { FaTwitter, FaInstagram, FaYoutube, FaLinkedin } from "react-icons/fa";
import { useState } from "react";

const allGuides = [
  { name: "Damien Frederick", img: "/images/about/guide1.png" },
  { name: "Drew J. Bridges", img: "/images/about/guide2.png" },
  { name: "Vasili Ilmaz", img: "/images/about/guide3.png" },
  { name: "Liam Patterson", img: "/images/about/guide3.png" },
  { name: "Sophia Lee", img: "/images/about/guide1.png" },
  { name: "Ethan Brown", img: "/images/about/guide2.png" },
  { name: "Olivia White", img: "/images/about/guide3.png" },
  { name: "Noah Smith", img: "/images/about/guide3.png" },
];

export default function GuidesSection() {
  const [visibleGuides, setVisibleGuides] = useState(allGuides.slice(0, 4)); // show first 4 initially

  const handleLoadMore = () => {
    setVisibleGuides(allGuides); // show all guides on click
  };

  return (
    <section className="relative flex flex-col items-center justify-center py-[120px] px-4 lg:px-[130px] gap-[96px] bg-[#F9FAFB] overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-[url('/images/about/guides-bg.png')] bg-cover bg-center opacity-10"
        aria-hidden="true"
      />

      <div className="relative flex flex-col items-center gap-[64px] max-w-[1180px]">
        {/* Heading */}
        <div className="flex flex-col items-center gap-[10px] text-center">
          <p className="text-[#6FCCDC] font-medium text-[18px] leading-[23px] tracking-wide">
            Tour Guide
          </p>
          <h2 className="text-[#0A0322] font-medium text-[48px] leading-[56px] capitalize tracking-[-0.5px]">
            Our Travel Guide
          </h2>
        </div>

        {/* Guides Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[20px] justify-items-center">
          {visibleGuides.map((guide, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-[32px] w-[280px] h-[386px]"
            >
              {/* Profile image */}
              <div className="w-[240px] h-[240px] rounded-full overflow-hidden relative">
                <Image
                  src={guide.img}
                  alt={guide.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Name + Title + Social */}
              <div className="flex flex-col items-center gap-[16px] w-full">
                <div className="flex flex-col items-center gap-[2px]">
                  <h3 className="text-[#191919] text-[24px] font-medium leading-[32px] text-center">
                    {guide.name}
                  </h3>
                  <p className="text-[#878D97] text-[16px] leading-[24px] text-center">
                    Travel guide
                  </p>
                </div>

                {/* Social icons */}
                <div className="flex items-center justify-center gap-[12px]">
                  {[FaTwitter, FaInstagram, FaYoutube, FaLinkedin].map(
                    (Icon, index) => (
                      <div
                        key={index}
                        className="w-[40px] h-[40px] flex items-center justify-center border border-[rgba(190,204,232,0.5)] bg-[#F9FAFB] rounded-full hover:bg-[#EFF3F8] transition"
                      >
                        <Icon className="text-[#878D97] w-[18px] h-[18px]" />
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {visibleGuides.length < allGuides.length && (
          <button
            onClick={handleLoadMore}
            className="flex flex-row items-center justify-center gap-[8px] px-[32px] py-[14px] bg-[#EE2552] rounded-[12px] font-[Rubik] font-semibold text-[14px] leading-[20px] text-white"
          >
            Load More
          </button>
        )}
      </div>
    </section>
  );
}
