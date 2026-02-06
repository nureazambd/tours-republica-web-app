'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Star, Clock, Users, ArrowRight, MapPin } from 'lucide-react';
// Note: Removed the Image import if it's not being used, but keeping imports consistent
// for a running Next.js environment.

// --- Icon Components (Matching Tour Card Icons) ---

const IconBase = ({ children }: any) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    {children}
  </svg>
);

const CarIcon = () => (
  <IconBase>
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14.9165 16.46C14.759 16.46 14.6807 16.46 14.6323 16.5083C14.584 16.5566 14.5832 16.6358 14.5832 16.7933V17.195C14.5832 17.51 14.7832 17.7991 15.1015 17.94L15.139 17.9566C15.3315 18.0425 15.519 18.1266 15.7423 18.1266H17.174C17.3973 18.1266 17.5848 18.0433 17.7773 17.9566L17.8148 17.94C18.1323 17.7983 18.3332 17.51 18.3332 17.195V16.4533C18.3332 16.2408 18.3332 16.1341 18.2748 16.085C18.2157 16.035 18.0973 16.0541 17.8598 16.0933L17.789 16.1033L15.1915 16.4466C15.1282 16.4555 15.0643 16.46 14.9998 16.46H14.9165ZM5.08317 16.46C5.24067 16.46 5.319 16.46 5.36734 16.5091C5.41567 16.5583 5.4165 16.6358 5.4165 16.7925V17.195C5.4165 17.5108 5.2165 17.7991 4.89817 17.94L4.86067 17.9566C4.66817 18.0433 4.48067 18.1266 4.25734 18.1266H2.82567C2.60234 18.1266 2.41484 18.0433 2.22234 17.9566L2.18484 17.94C1.86734 17.7983 1.6665 17.5108 1.6665 17.195V16.4541C1.6665 16.2408 1.6665 16.135 1.72484 16.085C1.78317 16.035 1.90234 16.0541 2.13984 16.0933L2.2115 16.1033L4.80817 16.4475C4.87206 16.4558 4.93595 16.46 4.99984 16.46H5.08317Z" fill="#FAA523" />
      <path fillRule="evenodd" clipRule="evenodd" d="M1.75512 6.29419C1.854 6.09668 2.02724 5.9465 2.23678 5.87665C2.44632 5.8068 2.67502 5.823 2.87262 5.92169L3.70596 6.33835C3.80472 6.38675 3.89293 6.45421 3.96549 6.53686C4.03805 6.61951 4.09354 6.7157 4.12875 6.81989C4.16395 6.92409 4.17819 7.03422 4.17063 7.14394C4.16307 7.25366 4.13387 7.3608 4.08471 7.45918C4.03554 7.55756 3.96739 7.64524 3.88418 7.71716C3.80097 7.78907 3.70435 7.84381 3.59989 7.8782C3.49542 7.9126 3.38518 7.92598 3.27552 7.91756C3.16586 7.90915 3.05895 7.87911 2.96096 7.82919L2.12762 7.41252C2.02972 7.36356 1.94242 7.2958 1.87071 7.2131C1.799 7.13039 1.74429 7.03437 1.7097 6.93052C1.67511 6.82667 1.66131 6.71702 1.66911 6.60783C1.6769 6.49865 1.70613 6.39207 1.75512 6.29419ZM18.246 6.29419C18.2949 6.39212 18.3241 6.49875 18.3318 6.60797C18.3396 6.71719 18.3257 6.82686 18.291 6.93072C18.2564 7.03458 18.2016 7.13059 18.1298 7.21326C18.058 7.29593 17.9706 7.36364 17.8726 7.41252L17.0393 7.82919C16.8415 7.92798 16.6125 7.94415 16.4028 7.87413C16.1931 7.80412 16.0198 7.65366 15.921 7.45585C15.8222 7.25804 15.806 7.02909 15.876 6.81937C15.946 6.60964 16.0965 6.43631 16.2943 6.33752L17.1276 5.92085C17.2256 5.87189 17.3322 5.8427 17.4414 5.83497C17.5506 5.82723 17.6603 5.8411 17.7642 5.87577C17.868 5.91044 17.964 5.96524 18.0467 6.03703C18.1294 6.10883 18.1971 6.19621 18.246 6.29419Z" fill="#FAA523" />
      <path fillRule="evenodd" clipRule="evenodd" d="M16.9523 7.33C17.3023 7.69083 17.7332 8.1375 18.0915 8.6175C18.5415 9.22 18.9582 9.97583 18.9582 10.8333V13.725C18.9582 14.4567 18.464 15.1717 17.679 15.2758L15.0815 15.62C15.0544 15.623 15.0271 15.6247 14.9998 15.625H4.99984C4.97255 15.6247 4.94529 15.623 4.91817 15.62L2.32067 15.2758C1.53567 15.1717 1.0415 14.4567 1.0415 13.7258V10.8333C1.0415 9.97583 1.45817 9.22 1.90817 8.61667C2.2665 8.1375 2.69817 7.69167 3.04734 7.33C3.11817 7.25667 3.13317 7.1925 3.1665 7.09667L4.05984 4.50667C4.2265 4.025 4.37234 3.60167 4.53484 3.26667C4.709 2.90417 4.934 2.57167 5.299 2.31667C5.66317 2.06333 6.0615 1.9625 6.47234 1.91667C6.85317 1.875 7.314 1.875 7.84067 1.875H12.159C12.6857 1.875 13.1465 1.875 13.5273 1.91667C13.939 1.9625 14.3357 2.06333 14.7015 2.31667C15.0657 2.57167 15.2907 2.90417 15.4657 3.26667C15.6273 3.60167 15.7732 4.025 15.9398 4.50667L16.8332 7.09667C16.864 7.18667 16.8857 7.26083 16.9523 7.33ZM5.64984 6.875C5.32984 6.875 5.16984 6.875 5.09567 6.77C5.0215 6.665 5.07234 6.51417 5.17734 6.21167L5.5815 5.04C5.76484 4.50667 5.88234 4.17 6.00067 3.92583C6.15067 3.61417 6.314 3.50667 6.65567 3.46917C6.934 3.43833 7.3015 3.4375 7.88317 3.4375H12.1165C12.6982 3.4375 13.0665 3.43833 13.344 3.46917C13.6857 3.50667 13.849 3.61417 13.999 3.92583C14.1173 4.17 14.2348 4.5075 14.4182 5.04L14.8232 6.21167C14.9273 6.51417 14.979 6.665 14.9048 6.77C14.8298 6.875 14.6698 6.875 14.3498 6.875H5.64984ZM2.77984 9.65C2.63226 9.58083 2.4635 9.57204 2.30953 9.62551C2.15557 9.67898 2.02858 9.79048 1.95565 9.93624C1.88271 10.082 1.8696 10.2505 1.91911 10.4058C1.96862 10.5611 2.07683 10.6909 2.22067 10.7675L3.47067 11.3925C3.54418 11.4299 3.62437 11.4524 3.70662 11.4587C3.78886 11.465 3.87154 11.4549 3.94987 11.4291C4.02821 11.4033 4.10066 11.3622 4.16305 11.3082C4.22544 11.2543 4.27652 11.1885 4.31337 11.1147C4.35021 11.0409 4.37208 10.9605 4.37772 10.8782C4.38336 10.7959 4.37265 10.7133 4.34622 10.6352C4.31978 10.5571 4.27815 10.4849 4.2237 10.423C4.16926 10.361 4.10309 10.3104 4.029 10.2742L2.77984 9.65ZM17.7798 10.7675C17.9281 10.6933 18.0409 10.5633 18.0933 10.406C18.1458 10.2487 18.1336 10.0771 18.0594 9.92875C17.9853 9.78045 17.8552 9.66768 17.698 9.61525C17.5407 9.56282 17.369 9.57502 17.2207 9.64917L15.9707 10.2742C15.8237 10.349 15.7122 10.4788 15.6606 10.6355C15.609 10.7921 15.6213 10.9628 15.695 11.1103C15.7687 11.2579 15.8977 11.3703 16.0539 11.4232C16.2101 11.4761 16.3809 11.465 16.529 11.3925L17.7798 10.7675ZM10.8073 12.5H9.19234C8.37317 12.5 7.96317 12.5 7.64567 12.7283C7.399 12.905 7.25234 13.1875 7.0565 13.6825C6.97067 13.9 6.92734 14.0092 6.97734 14.0875C7.02734 14.1667 7.139 14.1667 7.364 14.1667H12.6365C12.8615 14.1667 12.974 14.1667 13.0232 14.0875C13.0732 14.0092 13.0298 13.9 12.944 13.6825C12.7482 13.1875 12.6007 12.905 12.3548 12.7275C12.0373 12.5 11.6273 12.5 10.8073 12.5Z" fill="#FAA523" />
    </svg>
  </IconBase>
);

const LunchIcon = () => (
  <IconBase>
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.0017 12.9616C11.6374 12.9616 12.9634 11.6357 12.9634 9.99999C12.9634 8.36431 11.6374 7.03833 10.0017 7.03833C8.36602 7.03833 7.04004 8.36431 7.04004 9.99999C7.04004 11.6357 8.36602 12.9616 10.0017 12.9616Z" fill="#FAA523" />
      <path d="M19.9973 5.62783C20.0159 6.11276 19.9296 6.59599 19.7444 7.04451C19.5591 7.49304 19.2791 7.89628 18.9237 8.22668C18.7891 8.33711 18.6827 8.47794 18.6132 8.63756C18.5436 8.79718 18.513 8.97103 18.5239 9.1448C18.7349 12.8506 18.8015 16.3342 18.8015 16.3342C18.8244 16.9006 18.3839 17.3783 17.8175 17.4011C17.2511 17.424 16.7734 16.9834 16.7506 16.4171C16.7495 16.3895 16.7495 16.3618 16.7506 16.3342C16.7506 16.3342 16.7728 15.2828 16.8283 13.7169C16.8691 12.4396 16.9357 10.8181 17.0282 9.1448C17.039 8.97141 17.0087 8.79793 16.9399 8.63842C16.871 8.47891 16.7656 8.33785 16.6321 8.22668C15.672 7.44212 15.3634 5.8935 15.6659 4.6838C15.9546 3.47322 16.7913 2.59583 17.7761 2.59583C19.0014 2.59583 19.9973 3.95449 19.9973 5.62783Z" fill="#FAA523" />
      <path d="M16.1585 8.80049C14.8696 7.73304 14.5185 5.68621 15.059 4.10255C12.2429 1.67732 8.10132 1.59343 5.18926 3.90264C5.18926 6.80664 5.26492 7.05945 4.87829 7.7454C4.66485 8.12461 4.35436 8.44021 3.97868 8.65981C3.92602 8.69257 3.87533 8.72842 3.8269 8.76717C3.65137 9.29374 3.97693 11.0447 4.07864 15.0237C6.84326 18.2959 11.7371 18.7074 15.0093 15.9428C15.3886 15.6223 15.7363 15.2662 16.0475 14.8793C16.0882 13.5132 16.1659 11.3438 16.2918 9.10036C16.295 9.04337 16.2846 8.98644 16.2615 8.93429C16.2383 8.88213 16.203 8.83626 16.1585 8.80049ZM10.002 13.702C7.95735 13.702 6.29989 12.0446 6.29989 9.99996C6.29989 7.95535 7.95735 6.29788 10.002 6.29788C12.0466 6.29788 13.704 7.95535 13.704 9.99996C13.7007 12.0431 12.0452 13.6987 10.002 13.702Z" fill="#FAA523" />
      <path d="M4.23406 7.38263C3.80092 8.14525 3.2345 7.98236 3.09382 8.64133C3.04493 8.91115 3.02507 9.18544 3.03459 9.45949C3.08272 10.1777 3.21969 12.2212 3.29744 13.9242C3.33904 13.9242 3.33668 16.2255 3.33076 16.2898C3.19748 17.7299 1.30572 17.8447 1.10951 16.2898C1.00955 15.5235 1.13172 12.9431 1.42048 9.46319C1.44046 9.19272 1.4205 8.92079 1.36125 8.65614C1.22057 8.00457 0.654155 8.15636 0.221012 7.40114C-0.0574766 6.90251 0.0062917 6.89474 0.0062917 3.28073C-0.0223068 2.97405 0.20315 2.70223 0.509866 2.67368C0.816537 2.64508 1.08836 2.87054 1.11691 3.17725C1.12011 3.21168 1.12011 3.24634 1.11691 3.28077V5.49832C1.11539 5.53573 1.12144 5.57307 1.1347 5.60809C1.14797 5.64311 1.16817 5.67508 1.19411 5.7021C1.22004 5.72911 1.25116 5.75061 1.28561 5.76529C1.32006 5.77997 1.35712 5.78754 1.39457 5.78754C1.43202 5.78754 1.46908 5.77997 1.50353 5.76529C1.53798 5.75061 1.5691 5.72911 1.59503 5.7021C1.62097 5.67508 1.64117 5.64311 1.65444 5.60809C1.6677 5.57307 1.67375 5.53573 1.67223 5.49832V3.28077C1.64363 2.9741 1.86908 2.70228 2.1758 2.67372C2.48252 2.64517 2.7543 2.87058 2.78285 3.1773C2.78604 3.21173 2.78604 3.24639 2.78285 3.28082V5.49836C2.78132 5.53578 2.78737 5.57312 2.80064 5.60813C2.8139 5.64315 2.83411 5.67513 2.86004 5.70214C2.88597 5.72916 2.9171 5.75065 2.95155 5.76533C2.986 5.78002 3.02306 5.78759 3.0605 5.78759C3.09795 5.78759 3.13501 5.78002 3.16946 5.76533C3.20391 5.75065 3.23503 5.72916 3.26097 5.70214C3.2869 5.67513 3.30711 5.64315 3.32037 5.60813C3.33364 5.57312 3.33969 5.53578 3.33816 5.49836V3.28082C3.30776 2.97591 3.53025 2.70408 3.83516 2.67368C4.14008 2.64327 4.4119 2.86577 4.4423 3.17068C4.44412 3.18885 4.44503 3.20705 4.44503 3.22529V3.22899C4.44809 3.24607 4.44934 3.26346 4.44874 3.28082C4.44878 6.87447 4.51292 6.88784 4.23406 7.38263Z" fill="#FAA523" />
    </svg>

  </IconBase>
);

const GuideIcon = () => (
  <IconBase>
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.0415 5.83333C6.0415 4.78352 6.45854 3.7767 7.20087 3.03437C7.94321 2.29204 8.95002 1.875 9.99984 1.875C11.0497 1.875 12.0565 2.29204 12.7988 3.03437C13.5411 3.7767 13.9582 4.78352 13.9582 5.83333C13.9582 6.88315 13.5411 7.88997 12.7988 8.6323C12.0565 9.37463 11.0497 9.79167 9.99984 9.79167C8.95002 9.79167 7.94321 9.37463 7.20087 8.6323C6.45854 7.88997 6.0415 6.88315 6.0415 5.83333ZM3.5415 15.8333C3.5415 14.5625 4.04634 13.3437 4.94495 12.4451C5.84356 11.5465 7.06234 11.0417 8.33317 11.0417H11.6665C12.9373 11.0417 14.1561 11.5465 15.0547 12.4451C15.9533 13.3437 16.4582 14.5625 16.4582 15.8333C16.4582 16.4411 16.2167 17.024 15.787 17.4538C15.3572 17.8836 14.7743 18.125 14.1665 18.125H5.83317C5.22538 18.125 4.64249 17.8836 4.21272 17.4538C3.78295 17.024 3.5415 16.4411 3.5415 15.8333Z" fill="#FAA523" />
    </svg>
  </IconBase>
);

// --- Component ---

const FeaturedTours = () => {
  // State for carousel navigation
  const [currentIndex, setCurrentIndex] = useState(0);

  const tours = [
    {
      id: '6907b35cfaf60167825d5a1e',
      title: 'Aventura En Buggys',
      description: 'Explore the highlights of Punta Cana in a thrilling half-day off-road dune buggy..',
      price: 50,
      originalPrice: 75,
      discount: 30,
      rating: 4.8,
      reviewCount: 30,
      duration: '4 Hours',
      pickup: 'Punta Cana',
      image: '/images/destinations/Aventura-En-Buggys.png',
      category: 'Adventure',
      schedule: 'Everyday (8am /11am /1pm)',
      features: [CarIcon, LunchIcon, GuideIcon]
    },
    {
      id: '6907b35cfaf60167825d5a21',
      title: 'Santo Domingo City Tour',
      description: 'Explore the highlights of Punta Cana in a thrilling half-day off-road dune buggy..',
      price: 50,
      originalPrice: 75,
      discount: 30,
      rating: 4.8,
      reviewCount: 15,
      duration: '10 Hours',
      pickup: 'Punta Cana',
      image: '/images/destinations/Santo-Domingo-City-Tour.png',
      category: 'Cultural City trips',
      schedule: 'Everyday (8am /11am /1pm)',
      features: [CarIcon, LunchIcon, GuideIcon]
    },
    {
      id: '6907b35cfaf60167825d5a23',
      title: 'Saona Island Day Trip Lunch',
      description: 'Explore the highlights of Punta Cana in a thrilling half-day off-road dune buggy..',
      price: 50,
      originalPrice: 75,
      discount: 30,
      rating: 4.9,
      reviewCount: 32,
      duration: '10 Hours',
      pickup: 'Punta Cana',
      image: '/images/destinations/Saona-Island-Day-Trip-Lunch.png',
      category: 'Nature and Boat Trip',
      schedule: 'Everyday (8am /11am /1pm)',
      features: [CarIcon, LunchIcon, GuideIcon]
    },
    // Adding more tours to ensure the loop is visible (must have more than CARDS_PER_PAGE)
    {
      id: '6907b35cfaf60167825d5a1e1',
      title: 'Aventura En Buggys',
      description: 'Explore the highlights of Punta Cana in a thrilling half-day off-road dune buggy..',
      price: 50,
      originalPrice: 75,
      discount: 30,
      rating: 4.8,
      reviewCount: 30,
      duration: '4 Hours',
      pickup: 'Punta Cana',
      image: '/images/destinations/Aventura-En-Buggys.png',
      category: 'Adventure',
      schedule: 'Everyday (8am /11am /1pm)',
      features: [CarIcon, LunchIcon, GuideIcon]
    },
    {
      id: '6907b35cfaf60167825d5a232',
      title: 'Saona Island Day Trip Lunch',
      description: 'Explore the highlights of Punta Cana in a thrilling half-day off-road dune buggy..',
      price: 50,
      originalPrice: 75,
      discount: 30,
      rating: 4.9,
      reviewCount: 32,
      duration: '10 Hours',
      pickup: 'Punta Cana',
      image: '/images/destinations/Saona-Island-Day-Trip-Lunch.png',
      category: 'Nature and Boat Trip',
      schedule: 'Everyday (8am /11am /1pm)',
      features: [CarIcon, LunchIcon, GuideIcon]
    }
  ];

  const CARDS_PER_PAGE = 3;
  const TOTAL_TOURS = tours.length;
  // MAX_INDEX is the index where the last visible card starts.
  const MAX_INDEX = TOTAL_TOURS - CARDS_PER_PAGE;

  const formatPrice = (price: number) => `$${price}`;

  // --- Infinite Loop Navigation Handlers ---
  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      // If we are at the first index (0), wrap around to the MAX_INDEX.
      prevIndex === 0 ? MAX_INDEX : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      // If we are at the MAX_INDEX, wrap around to the first index (0).
      prevIndex >= MAX_INDEX ? 0 : prevIndex + 1
    );
  };

  // Slice the tours array to show only the currently visible set of cards
  // NOTE: This slicing works well for a fixed-size loop (e.g., 5 cards total, showing 3). 
  // For a seamless infinite loop where the list length is variable, you might need a more complex
  // approach like duplicating the array content or using CSS/JS translation for smooth transitions,
  // but the index wrapping handles the "infinity" logic.
  const visibleTours = tours.slice(currentIndex, currentIndex + CARDS_PER_PAGE);

  return (
    <section className="py-16 lg:py-24 bg-white ">
      <div className="max-w-[1180px] mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-[32px] lg:text-[40px] font-[500] text-[#191919] ">
              Featured Tours
            </h2>
          </div>
          {/* Navigation Buttons (Infinite Carousel) */}
          <div className="hidden lg:flex space-x-2">

            {/* Previous Button - Always active */}
            <button
              onClick={handlePrev}
              className=""
            >
              {/* <ArrowRight className="w-5 h-5 rotate-180" /> */}
              <svg
                width="64"
                height="48"
                viewBox="0 0 64 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-16 h-12 rounded-[24px] transition-all duration-300 
             fill-white stroke-[#003459] hover:fill-[#6FCCDC] hover:stroke-white"
              >
                <rect width="64" height="48" rx="24" />
                <path
                  d="M31 29L26 24L31 19M38 29L33 24L38 19"

                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* Next Button - Always active */}
            <button
              onClick={handleNext}
              className=""
            >
              {/* <ArrowRight className="w-5 h-5" /> */}
              {/* <svg
  width="64"
  height="48"
  viewBox="0 0 64 48"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <rect width="64" height="48" rx="24" fill="#6FCCDC" />
  <path
    d="M26 29L31 24L26 19M33 29L38 24L33 19"
    stroke="white"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
</svg> */}

              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 64 48"
                className="w-16 h-12 rounded-[24px] transition-all duration-300 
             fill-white stroke-[#003459] hover:fill-[#6FCCDC] hover:stroke-white"
              >
                <rect width="64" height="48" rx="24" />
                <path
                  d="M26 29L31 24L26 19M33 29L38 24L33 19"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>



            </button>

          </div>
        </div>

        {/* Tours Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {visibleTours.map((tour) => (
            <div key={tour.id} className="group mx-auto">
              <Link href={`/tours/${tour.id}`}>
                {/* Tour Card Container: Pixel-perfect structure */}
                <div
                  className="w-[375px] h-[573px] flex flex-col items-start p-0 
                             bg-[#EFF2F880] rounded-2xl border border-opacity-25 border-[#BECCE8] 
                             transition-all duration-300 overflow-hidden"
                  style={{ backgroundImage: 'linear-gradient(0deg, rgba(239, 242, 248, 0.5), rgba(239, 242, 248, 0.5)), #FFFFFF' }}
                >

                  {/* Tour Image Block */}
                  <div className="relative w-full h-[220px] flex flex-col justify-end items-start p-[12px] md:p-[20px] gap-[8px] rounded-t-2xl">
                    <div
                      className="absolute hover:scale-105 transition-transform duration-300 inset-0 bg-cover bg-center transition-transform duration-500 rounded-t-2xl"
                      style={{
                        backgroundImage: `url('${tour.image}')`,
                        // maskImage: 'linear-gradient(180deg, rgba(0, 52, 89, 0) 10.1%, rgba(0, 52, 89, 0.5) 100%)',
                        // WebkitMaskImage: 'linear-gradient(180deg, rgba(0, 52, 89, 0) 10.1%, rgba(0, 52, 89, 0.5) 100%)'
                      }}
                    />

                    {/* Discount & Category */}
                    <div className="relative z-10 flex flex-row justify-between items-center p-0 gap-[8px] w-full h-[32px]">

                      {/* Discount Tag */}
                      {tour.discount && (
                        <div className="flex flex-row justify-center items-center p-[6px] px-[12px] gap-[8px] w-[74px] h-[32px] bg-[#6FCCDC] rounded-[8px]">
                          <span className="font-['Rubik'] font-normal text-[14px] leading-[20px] text-[#191919]">
                            {tour.discount}% off
                          </span>
                        </div>
                      )}

                      {/* Category Tag */}
                      {/* <div className="flex flex-row justify-center items-center p-[8px] px-[12px] gap-[8px] w-[84px] h-[32px] bg-[#003459] bg-opacity-25 rounded-[8px]">
                        <span className="font-['Rubik'] font-normal text-[12px] leading-[16px] text-white">
                          {tour.category.split(' ')[0]}
                        </span>
                      </div> */}
                      <div className="flex flex-row justify-center items-center p-[8px] px-[12px] gap-[8px] **w-fit** h-[32px] bg-[#003459] bg-opacity-25 rounded-[8px]">
                        <span className="font-['Rubik'] font-normal text-[12px] leading-[16px] text-white">
                          {tour.category.split(' ')}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Tour Content Block */}
                  <div className="w-full h-[353px] flex flex-col items-start p-[20px] px-[24px] pb-[28px] gap-[24px]">
                    {/* <div className="w-full flex-grow flex flex-col items-start justify-between p-[20px] px-[24px] pb-[28px]"> */}
                    {/* Title and Rating */}
                    <div className="flex flex-col items-start p-0 gap-[12px] w-full">

                      {/* Rating */}
                      <div className="flex flex-row items-center p-0 gap-[8px] h-[20px]">

                        {/* Star Block */}
                        <div className="flex items-center p-0 gap-[6px] h-[20px]">
                          <Star className={`w-[20px] h-[20px] text-[#FAA523] fill-current`} />
                          <span className="font-['Rubik'] font-normal text-[14px] leading-[20px] text-[#191919]">
                            {tour.rating} ({tour.reviewCount} Reviews)
                          </span>
                        </div>
                      </div>

                      {/* Title & Description */}
                      <div className="flex flex-col items-start p-0 gap-[4px] w-full">
                        <h3 className="w-full font-['Rubik'] font-medium text-[24px] leading-[32px] tracking-[-0.48px] text-[#001D22] capitalize line-clamp-1">
                          {tour.title}
                        </h3>
                        <p className="w-full h-[40px] font-['Rubik'] font-normal text-[13px] leading-[20px] text-[#878D97] line-clamp-2">
                          {tour.description}
                        </p>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="flex flex-col items-start p-0 gap-[12px] w-full">

                      {/* Pickup Row */}
                      <div className="w-full border-t border-opacity-25 border-[#BECCE8] pt-[12px] flex flex-row justify-between items-center p-0 gap-[4px]">
                        <span className="font-['Rubik'] font-normal text-[13px] leading-[24px] text-[#191919]">
                          {/* <MapPin className="w-4 h-4 inline mr-1 text-[#878D97]" />  */}
                          Pickup: {tour.pickup}
                        </span>

                        {/* Feature Icons */}
                        <div className="flex flex-row items-center p-0 gap-[12px] h-[20px]">
                          {tour.features.map((Icon, i) => (
                            <Icon key={i} />
                          ))}
                        </div>
                      </div>

                      {/* Schedule Row */}
                      <div className="w-full border-t border-opacity-25 border-[#BECCE8] pt-[12px] flex flex-row items-center p-0 gap-[6px]">
                        {/* The Users icon is for the 'Schedule Row' so I'll assume you intended to replace the Lucide icon with this SVG */}
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                          {/* FIX: Changed fill-rule to fillRule and clip-rule to clipRule */}
                          <path fillRule="evenodd" clipRule="evenodd" d="M7.63531 13.9645C7.63531 14.205 7.44033 14.4 7.19983 14.4C5.27702 14.4 3.46901 13.6509 2.10885 12.2907C0.748945 10.9309 0 9.12286 0 7.1998C0 5.27673 0.748945 3.46872 2.10885 2.10882C3.46872 0.748916 5.27687 0 7.2002 0C9.12353 0 10.9317 0.748916 12.2916 2.10882C12.3109 2.12809 12.3298 2.14775 12.3489 2.16726V1.61518C12.3489 1.37468 12.5439 1.1797 12.7844 1.1797C13.0249 1.1797 13.2199 1.37468 13.2199 1.61518V3.2175C13.2199 3.458 13.0249 3.65298 12.7844 3.65298H11.1821C10.9416 3.65298 10.7466 3.458 10.7466 3.2175C10.7466 2.977 10.9416 2.78202 11.1821 2.78202H11.732C11.7133 2.76285 11.6947 2.74361 11.6758 2.72468C9.20799 0.256877 5.19251 0.256877 2.72474 2.72468C0.257168 5.19227 0.257168 9.20732 2.72474 11.6749C3.9204 12.8706 5.50968 13.5291 7.19985 13.5291C7.44036 13.5291 7.63534 13.724 7.63534 13.9645L7.63531 13.9645ZM11.6176 7.1998C11.6176 9.63578 9.63578 11.6176 7.19983 11.6176C4.76387 11.6176 2.78205 9.63575 2.78205 7.1998C2.78205 4.76384 4.76382 2.78202 7.19983 2.78202C9.63584 2.78202 11.6176 4.76384 11.6176 7.1998ZM8.89235 7.67445L7.63528 6.94841V4.90207C7.63528 4.66156 7.4403 4.46658 7.1998 4.46658C6.95929 4.46658 6.76431 4.66156 6.76431 4.90207V7.19977C6.76431 7.35532 6.84729 7.49909 6.982 7.57687L8.45675 8.42862C8.52279 8.46694 8.59779 8.4871 8.67414 8.48706C8.82462 8.48706 8.971 8.40896 9.05165 8.26932C9.17196 8.06104 9.10063 7.7947 8.89235 7.67442V7.67445ZM13.9645 6.76446C13.7242 6.76446 13.5292 6.96031 13.5292 7.1998C13.5292 7.43928 13.7242 7.63514 13.9645 7.63514C14.2048 7.63514 14.3999 7.43928 14.3999 7.1998C14.3999 6.96031 14.204 6.76446 13.9645 6.76446ZM8.83832 13.3127C8.60542 13.3753 8.46798 13.614 8.53052 13.846C8.59224 14.0789 8.83092 14.2163 9.06381 14.1546C9.2959 14.0921 9.43334 13.8534 9.37161 13.6214C9.30908 13.3885 9.07037 13.251 8.83832 13.3127ZM10.3641 12.6807C10.1559 12.8009 10.0851 13.0675 10.2052 13.2757C10.3254 13.4839 10.592 13.5555 10.8003 13.4353C11.0085 13.3152 11.0792 13.0485 10.9591 12.8404C10.8389 12.6321 10.5731 12.5605 10.3641 12.6807ZM11.6751 11.6751C11.5055 11.8454 11.5055 12.1211 11.6751 12.2906C11.8454 12.461 12.1211 12.461 12.2914 12.2906C12.461 12.1211 12.461 11.8454 12.2914 11.6751C12.1211 11.5047 11.8454 11.5047 11.6751 11.6751ZM13.2757 10.2052C13.0675 10.0843 12.8008 10.1559 12.6807 10.3641C12.5605 10.5723 12.6321 10.8389 12.8404 10.9591C13.0485 11.0792 13.3152 11.0076 13.4353 10.7994C13.5555 10.5912 13.4839 10.3254 13.2757 10.2052H13.2757ZM13.8468 8.52971C13.6139 8.46798 13.3753 8.60542 13.3136 8.83751C13.251 9.0704 13.3893 9.30905 13.6214 9.37161C13.8534 9.43333 14.0921 9.2959 14.1546 9.063C14.2172 8.83092 14.0789 8.59227 13.8468 8.52973V8.52971ZM13.8468 5.86992C14.0789 5.80738 14.2172 5.56871 14.1546 5.33665C14.0921 5.10375 13.8534 4.96632 13.6214 5.02804C13.3893 5.09057 13.251 5.32925 13.3136 5.56215C13.3753 5.79423 13.6139 5.93164 13.8468 5.86992Z" fill="#878D97" />
                        </svg>

                        <span className="font-['Rubik'] font-normal text-[14px] leading-[20px] text-[#191919]">
                          {tour.schedule}
                        </span>
                      </div>

                      {/* Duration Row */}
                      <div className="w-full border-t border-opacity-25 border-[#BECCE8]  border-opacity-25 border-[#BECCE8]  flex flex-row items-center p-0 gap-[6px]">
                        {/* <Clock className="w-[16px] h-[16px] text-[#878D97]" />
                        <span className="font-['Rubik'] font-normal text-[14px] leading-[20px] text-[#191919]">
                          {tour.duration}
                        </span> */}
                      </div>

                    </div>

                    {/* Price and Book Button */}
                    <div className="flex items-end justify-between w-full h-[54px]">

                      {/* Price Details */}
                      <div className="flex flex-col justify-center items-start p-0 gap-[2px] h-[54px]">
                        <span className="font-['Rubik'] font-normal text-[12px] leading-[16px] text-[#878D97]">From</span>

                        {/* Price Numbers */}
                        <div className="flex flex-row items-center p-0 gap-[2px] h-[36px]">

                          {/* Original Price */}
                          {tour.originalPrice && (
                            <span className="font-['Rubik'] font-medium text-[18px] leading-[24px] text-[#FAA523] line-through">
                              {formatPrice(tour.originalPrice)}
                            </span>
                          )}

                          {/* Discounted Price */}
                          <span className="font-['Rubik'] font-medium text-[28px] leading-[36px] text-[#003459]">
                            {formatPrice(tour.price)}
                          </span>

                          {/* pp label */}
                          <span className="font-['Rubik'] font-normal text-[13px] leading-[24px] text-[#878D97]">pp</span>
                        </div>
                      </div>

                      {/* Book Now Button */}
                      <button className="flex justify-center items-center p-[8px] px-[4px] gap-[8px] w-[114px] h-[48px] bg-[#E9305B] border-[0.5px] border-opacity-50 border-[#E9305B] rounded-[12px] hover:bg-red-700 transition-colors duration-200">
                        <span className="font-['Rubik'] font-normal text-[14px] leading-[24px] text-white text-center">
                          Book Now
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* View All Tours Button */}
        <div className="text-center pt-2">
          <Link href="/tours">
            <button className=" hover:bg-[#EE2552] bg-[#EE2552] text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200 flex items-center space-x-2 mx-auto shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              <span>All Tours</span>
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedTours;