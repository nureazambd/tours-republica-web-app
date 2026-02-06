'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ChevronRight, X } from 'lucide-react';

interface Props {
  chosenTour: any;
}

export default function TourGallerySection({ chosenTour }: Props) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [showGallery, setShowGallery] = useState(false);
  const [modalIdx, setModalIdx] = useState(0);

  const safeImage = (src?: string) =>
    src && src !== '' ? src : '/images/placeholder.jpg';

  const images =
    chosenTour?.gallery?.length > 0
      ? chosenTour.gallery
      : [chosenTour.image];

  const handleNext = () => {
    setModalIdx((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const handlePrev = () => {
    setModalIdx((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  return (
    <>
      <section className="flex gap-5 max-w-[1180px] mx-auto">

        {/* LEFT */}
        <div className="relative w-[780px] h-[448px]">
          <Image
            src={safeImage(images[activeIdx])}
            alt="main"
            fill
            className="object-cover rounded-2xl"
          />
        </div>

        {/* RIGHT */}
        <div className="relative w-[380px] h-[448px]">

          <div className="relative h-[214px] mb-5">
            <Image
              src={safeImage(images[1])}
              alt=""
              fill
              className="object-cover rounded-2xl"
            />
          </div>

          <div className="relative h-[214px]">
            <Image
              src={safeImage(images[2])}
              alt=""
              fill
              className="object-cover rounded-2xl"
            />

            <button
              onClick={() => {
                setShowGallery(true);
                setModalIdx(activeIdx);
              }}
              className="absolute bottom-4 right-4 bg-white px-4 py-2 rounded"
            >
              Gallery
            </button>
          </div>
        </div>
      </section>

      {/* MODAL */}
      {showGallery && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">

          <button onClick={handlePrev} className="text-white text-4xl px-4">
            ‹
          </button>

          <div className="relative w-[800px] h-[600px]">
            <Image
              src={safeImage(images[modalIdx])}
              alt=""
              fill
              className="object-cover rounded-lg"
            />
          </div>

          <button onClick={handleNext} className="text-white text-4xl px-4">
            ›
          </button>

          <button
            onClick={() => setShowGallery(false)}
            className="absolute top-10 right-10 text-white"
          >
            <X size={32} />
          </button>
        </div>
      )}
    </>
  );
}
