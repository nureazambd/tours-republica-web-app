"use client";

import React from "react";
import Link from "next/link";

const categoryData = [
  {
    name: "Nature and boat trip",
    imageUrl: "/images/categories/Nature-and-boat-trip-1.jpg",
    href: "/tours?category=nature",
  },
  {
    name: "Adventures",
    imageUrl: "/images/categories/Adventures-2.jpg",
    href: "/tours?category=adventure",
  },
  {
    name: "Cultures",
    imageUrl: "/images/categories/Cultures-3.jpg",
    href: "/tours?category=culture",
  },
];

const CategoryLinks = () => {
  return (
    // <div className="flex justify-center items-center gap-[21px] flex-wrap md:flex-nowrap w-full max-w-[876px] mx-auto">
    //   {categoryData.map((category) => (
    //     <Link
    //       href={category.href}
    //       key={category.name}
    //       className="relative w-[278px] h-[72px] rounded-[12px] overflow-hidden group flex justify-center items-center"
    //     >
    //       {/* Background Image + Gradient Overlay */}
    //       <div
    //         className="absolute inset-0 bg-center bg-cover transition-transform duration-500 group-hover:scale-110"
    //         style={{
    //           backgroundImage: `linear-gradient(180deg, rgba(0,52,89,0.25) 0%, rgba(0,52,89,0.5) 81.25%), url(${category.imageUrl})`,
    //         }}
    //       />

    //       {/* Category Name */}
    //       <span className="relative z-10 text-white font-rubik font-medium text-[16px] leading-[24px] text-center">
    //         {category.name}
    //       </span>
    //     </Link>
    //   ))}
    // </div>

    <div className="flex justify-center items-center gap-[21px] flex-wrap md:flex-nowrap w-full max-w-[876px] mx-auto">
  {categoryData.map((category) => (
    <Link
      href={category.href}
      key={category.name}
      className="relative w-[278px] h-[72px] rounded-[12px] overflow-hidden group flex justify-center items-center"
    >
      {/* ✅ Background Image + Default Gradient */}
      <div
        className="absolute inset-0 bg-center bg-cover transition-all duration-500 group-hover:scale-110"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(0,52,89,0.25) 0%, rgba(0,52,89,0.5) 81.25%), url(${category.imageUrl})`,
        }}
      />

      {/* ✅ Hover Overlay (deep blue tone) */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[12px]"
        style={{
          background: "linear-gradient(180deg, rgba(0,52,89,0.9) 0%, rgba(0,52,89,0.9) 81.25%)",
        }}
      />

      {/* ✅ Category Name */}
      <span className="relative z-10 text-white font-rubik font-medium text-[16px] leading-[24px] text-center transition-all duration-300">
        {category.name}
      </span>
    </Link>
  ))}
</div>

  );
};

export default CategoryLinks;
