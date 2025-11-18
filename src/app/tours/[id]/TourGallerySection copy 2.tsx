'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { ChevronRight, X } from 'lucide-react';

interface Props {
  chosenTour: {
    title: string;
    image?: string;
    rating?: number;
    reviewCount?: number;
    discount?: number;
  };
  galleryThumbs: string[];
}

export default function TourGallerySection({ chosenTour, galleryThumbs }: Props) {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [showGallery, setShowGallery] = useState<boolean>(false);
  const [modalImageIdx, setModalImageIdx] = useState<number>(0);

  const safeImage = (src?: string) =>
    src && src.trim() !== '' ? src : '/images/placeholder.jpg';

  const mainImageSrc = safeImage(galleryThumbs[activeIdx] || chosenTour.image);

  const handleNext = () => {
    setModalImageIdx((prev) => (prev + 1) % galleryThumbs.length);
  };

  const handlePrev = () => {
    setModalImageIdx((prev) =>
      prev === 0 ? galleryThumbs.length - 1 : prev - 1
    );
  };

  // -------------------------
  // Auto-change main image
  // -------------------------
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % galleryThumbs.length);
    }, 3000); // change every 3 seconds

    return () => clearInterval(interval);
  }, [galleryThumbs.length]);

  return (
    <section className="flex flex-col md:flex-row items-center justify-center gap-5 w-full max-w-[1180px] h-auto md:h-[448px] mx-auto mb-10">
      {/* Left Large Image */}
      <div className="relative w-full md:w-[780px] h-[300px] md:h-[448px] rounded-2xl overflow-hidden">
        <Image
          src={mainImageSrc}
          alt={`${chosenTour.title || 'Tour'} main image`}
          fill
          priority
          className="object-cover rounded-2xl transition-opacity duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/60" />

        {chosenTour.discount && (
          <div className="absolute top-5 left-5 bg-rose-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg tracking-wider">
            SAVE {chosenTour.discount}%
          </div>
        )}

        {/* Pagination dots */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2">
          {galleryThumbs.map((_, dot) => (
            <div
              key={dot}
              className={`w-2 h-2 rounded-full cursor-pointer transition-all duration-300 ${
                activeIdx === dot
                  ? 'bg-[#EE2552]'
                  : 'bg-gray-300/40 hover:bg-gray-400/60'
              }`}
              onClick={() => setActiveIdx(dot)}
            />
          ))}
        </div>
      </div>

      {/* Right: Two stacked images */}
      <div className="relative w-full md:w-[380px] h-[448px]">
        {/* Top Image */}
        <div className="absolute top-0 left-0 right-0 h-[214px] overflow-hidden rounded-2xl">
          <Image
            src={safeImage(galleryThumbs[0])}
            alt={`${chosenTour.title || 'Tour'} thumbnail 1`}
            fill
            className="object-cover rounded-2xl"
          />
        </div>

        {/* Bottom Image */}
        <div className="absolute left-0 right-0 top-[234px] h-[214px] overflow-hidden rounded-2xl">
          <Image
            src={safeImage(galleryThumbs[0])}
            alt={`${chosenTour.title || 'Tour'} thumbnail 2`}
            fill
            className="object-cover rounded-2xl"
          />

          {/* “Gallery” Button */}
          <div
            onClick={() => setShowGallery(true)}
            className="absolute flex flex-row items-start gap-2 px-5 py-3 top-[148px] left-[249px] w-[111px] h-[46px] bg-[#6FCCDC] rounded-lg cursor-pointer hover:opacity-90 transition"
          >
            {/* Icon */}
            <div className="flex justify-center items-start w-[18px] h-[21.5px]">
              {/* SVG Icon */}
              <svg width="18" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* SVG Path here */}
              </svg>
            </div>

            <span className="text-[#191919] text-[14px] font-[Rubik] leading-[24px] flex items-center">
              Gallery
            </span>
          </div>
        </div>
      </div>

      {/* Gallery Modal */}
      {showGallery && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="relative flex flex-row items-center gap-8 w-[960px] h-[600px]">
            {/* Left Arrow */}
            <button
              onClick={handlePrev}
              className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-full transform rotate-180 hover:bg-white/30 transition"
            >
              <ChevronRight className="w-8 h-8 text-white" />
            </button>

            {/* Image */}
            <div className="relative w-[800px] h-[600px] rounded-lg overflow-hidden bg-[#C4CAD4]">
              <Image
                src={safeImage(galleryThumbs[modalImageIdx])}
                alt="Gallery Image"
                fill
                className="object-cover"
              />
            </div>

            {/* Right Arrow */}
            <button
              onClick={handleNext}
              className="flex items-center justify-center w-12 h-12 bg-white rounded-full hover:bg-gray-100 transition"
            >
              <ChevronRight className="w-8 h-8 text-[#1A202C]" />
            </button>

            {/* Close Button */}
            <button
              onClick={() => setShowGallery(false)}
              className="absolute top-[-25px] right-[50px] p-2 text-white hover:opacity-80 transition"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
