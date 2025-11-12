'use client';

import Image from 'next/image';
import { useState } from 'react';
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

  return (
    <section className="flex flex-col md:flex-row items-center justify-center gap-5 w-full max-w-[1180px] h-auto md:h-[448px] mx-auto mb-10">
      {/* Left Large Image */}
      <div className="relative w-full md:w-[780px] h-[300px] md:h-[448px] rounded-2xl overflow-hidden">
        <Image
          src={mainImageSrc}
          alt={`${chosenTour.title || 'Tour'} main image`}
          fill
          priority
          className="object-cover rounded-2xl transition-opacity duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/60" />

        {chosenTour.discount && (
          <div className="absolute top-5 left-5 bg-rose-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg tracking-wider">
            SAVE {chosenTour.discount}%
          </div>
        )}

        {/* Pagination dots */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2">
          {[0, 1, 2].map((dot) => (
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
        <div className="absolute top-0 left-0 right-0 h-[214px] overflow-hidden rounded-2xl border-2 border-gray-200">
          <Image
            src={safeImage(galleryThumbs[0])}
            alt={`${chosenTour.title || 'Tour'} thumbnail 1`}
            fill
            className="object-cover rounded-2xl"
          />
        </div>

        {/* Bottom Image */}
        <div className="absolute left-0 right-0 top-[234px] h-[214px] overflow-hidden rounded-2xl border-2 border-gray-200">
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
              <svg width="18" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.87517 8.53748C7.87517 8.53748 7.9619 8.45074 8.13538 8.27727C8.30885 8.1038 8.63621 8.01706 9.11745 8.01706C9.5987 8.01706 10.0128 8.19054 10.3597 8.53748C10.7067 8.88443 10.8802 9.29852 10.8802 9.77977C10.8802 10.261 10.7067 10.6695 10.3597 11.0053C10.0128 11.341 9.5987 11.5089 9.11745 11.5089C8.63621 11.5089 8.22211 11.341 7.87517 11.0053C7.52822 10.6695 7.35475 10.261 7.35475 9.77977C7.35475 9.29852 7.52822 8.88443 7.87517 8.53748ZM8.46274 10.4345C8.46274 10.4345 8.5075 10.4793 8.59704 10.5688C8.68657 10.6583 8.86004 10.7031 9.11745 10.7031C9.37487 10.7031 9.59311 10.6136 9.77217 10.4345C9.95124 10.2554 10.0408 10.0372 10.0408 9.77977C10.0408 9.52236 9.95124 9.30412 9.77217 9.12505C9.59311 8.94598 9.37487 8.85645 9.11745 8.85645C8.86004 8.85645 8.6418 8.94598 8.46274 9.12505C8.28367 9.30412 8.19413 9.52236 8.19413 9.77977C8.19413 10.0372 8.28367 10.2554 8.46274 10.4345ZM16.1179 4.0216C16.4089 4.04398 16.6719 4.14471 16.9069 4.32378C17.142 4.50285 17.321 4.72668 17.4441 4.99529C17.5672 5.26389 17.6176 5.55487 17.5952 5.86824L16.6215 14.3292C16.5768 14.7993 16.3753 15.1798 16.0172 15.4708C15.771 15.6275 15.5024 15.7394 15.2114 15.8065V16.1423C15.2114 16.4333 15.133 16.7075 14.9763 16.9649C14.8197 17.2223 14.607 17.4182 14.3384 17.5525C14.0698 17.6868 13.7788 17.7539 13.4655 17.7539H2.01627C1.99389 17.7539 1.97151 17.7539 1.94912 17.7539C1.50145 17.7539 1.12653 17.5916 0.824351 17.2671C0.522173 16.9425 0.382276 16.5676 0.404659 16.1423V7.61416C0.404659 7.14411 0.561344 6.73561 0.874714 6.38866C1.18808 6.04172 1.5686 5.86824 2.01627 5.86824H2.65421L2.85566 4.1559C2.92281 3.70823 3.12426 3.35009 3.46001 3.08149C3.81815 2.76812 4.23225 2.64501 4.7023 2.71216L16.1179 4.0216ZM14.4056 16.1423V12.0797L10.2758 14.4635C9.96243 14.6426 9.62668 14.7321 9.26854 14.7321C8.79849 14.7321 8.39559 14.5866 8.05983 14.2956L5.77671 12.2811C5.59764 12.1021 5.385 12.0069 5.13878 11.9957C4.89256 11.9845 4.66872 12.0573 4.46727 12.214L1.24404 14.5978V16.1423C1.24404 16.1647 1.24404 16.1871 1.24404 16.2094C1.24404 16.4109 1.32238 16.5844 1.47907 16.7299C1.63575 16.8754 1.81482 16.9369 2.01627 16.9145H13.4655C13.7117 16.9145 13.9299 16.8418 14.1202 16.6963C14.3104 16.5508 14.4056 16.3661 14.4056 16.1423ZM14.4056 11.106V7.61416C14.3832 7.36794 14.2825 7.1553 14.1034 6.97623C13.9243 6.79716 13.7117 6.70763 13.4655 6.70763H2.01627C1.79244 6.70763 1.60777 6.79716 1.46228 6.97623C1.31679 7.1553 1.24404 7.36794 1.24404 7.61416V13.557L3.99722 11.5425C4.35536 11.2963 4.74707 11.1787 5.17235 11.1899C5.59764 11.2011 5.97816 11.3522 6.31392 11.6432L8.59704 13.6577C8.99994 13.9935 9.41404 14.027 9.83932 13.7584L14.4056 11.106ZM16.7558 5.76752C16.7782 5.5213 16.7167 5.30865 16.5712 5.12959C16.4257 4.95052 16.2298 4.86098 15.9836 4.86098L4.63515 3.51797C4.38893 3.49559 4.17629 3.55155 3.99722 3.68585C3.84053 3.84253 3.73981 4.0216 3.69504 4.22305L3.49359 5.86824H13.4655C13.9355 5.86824 14.344 6.03612 14.691 6.37187C15.0379 6.70763 15.2114 7.12172 15.2114 7.61416V14.9672C15.2114 14.9448 15.245 14.9224 15.3121 14.9C15.4016 14.8552 15.4688 14.8217 15.5136 14.7993C15.6926 14.665 15.7822 14.4747 15.7822 14.2285L16.7558 5.76752Z" fill="#191919"/>
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
