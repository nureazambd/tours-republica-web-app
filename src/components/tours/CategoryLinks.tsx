import React from 'react';
import Link from 'next/link';

// 1. Define your category data
const categoryData = [
  {
    name: 'Nature & Marine',
    // IMPORTANT: You must replace this with your actual image path
    imageUrl: '/images/categories/Nature-and-boat-trip.png', 
    href: '/tours?category=nature' // Link to filter
  },
  {
    name: 'Adventure',
    // IMPORTANT: You must replace this with your actual image path
    imageUrl: '/images/categories/Adventures.png',
    href: '/tours?category=adventure' // Link to filter
  },
  {
    name: 'Culture & History',
    // IMPORTANT: You must replace this with your actual image path
    imageUrl: '/images/categories/Cultures.png',
    href: '/tours?category=culture' // Link to filter
  }
];

const CategoryLinks = () => {
  return (
    // 2. This grid creates the 3-column layout
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {categoryData.map((category) => (
        <Link href={category.href} key={category.name}>
          <div className="relative h-20 rounded-xl overflow-hidden group cursor-pointer shadow-lg">
            
            {/* Background Image - uses style attribute for dynamic URL */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
              style={{ backgroundImage: `url('${category.imageUrl}')` }}
            />
            
            {/* Dark Overlay - makes text readable */}
            <div className="absolute inset-0 bg-black/0" />
            
            {/* Centered Text */}
            <div className="relative z-10 h-full flex items-center justify-center p-4">
              <h3 className="text-white text-2xl font-bold text-center">
                {/* {category.name} */}
              </h3>
            </div>
            
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CategoryLinks;