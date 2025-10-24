'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image'; // Import Next.js Image component
import { ArrowRight } from 'lucide-react';

const TransportSection = () => {
  return (
    <section className="py-16 lg:py-24 bg-gray-100"> {/* Changed background to gray-100 to match image */}
      <div className="container-custom mx-auto px-4"> {/* Added mx-auto px-4 for better container handling */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="order-2 lg:order-1"> {/* Reordered content to appear first on small screens, second on large */}
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-800 mb-6 leading-tight"> {/* Adjusted font size and line height */}
              Need transport? We handle airport transfers.
            </h2>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed max-w-lg"> {/* Added max-w-lg for text width */}
              Arrive and depart in comfort with our reliable, hassle-free private airport transfers.
            </p>

            {/* Removed the features section as it's not in the design image */}

            <Link href="/contact"> {/* Changed link to '/contact-us' to match button text */}
              <button className="bg-pink-600 hover:bg-pink-700 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"> {/* Updated button color and roundedness */}
                <span>Contact us</span>
                <ArrowRight className="w-5 h-5 ml-2" /> {/* Added ml-2 for spacing */}
              </button>
            </Link>
          </div>

          {/* Image/Visual Section */}
          <div className="order-1 lg:order-2 flex gap-4 relative justify-center lg:justify-end"> {/* Reordered for responsiveness, added flex and gap */}
            {/* Left Stacked Images */}
            <div className="flex flex-col gap-4">
              <div className="relative w-[230px] h-[200px] rounded-xl overflow-hidden shadow-lg"> {/* Specific dimensions matching your visual */}
                <Image
                  src="/images/destinations/transport-2.png" // **UPDATE THIS PATH TO YOUR IMAGE**
                  alt="People with airport transfer car"
                  layout="fill"
                  objectFit="cover"
                  className="hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="relative w-[230px] h-[200px] rounded-xl overflow-hidden shadow-lg"> {/* Specific dimensions matching your visual */}
                <Image
                  src="/images/destinations/transport-3.png" // **UPDATE THIS PATH TO YOUR IMAGE**
                  alt="Couple with airport transfer car"
                  layout="fill"
                  objectFit="cover"
                  className="hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>

            {/* Right Large Image */}
            <div className="relative w-[280px] h-[420px] rounded-xl overflow-hidden shadow-lg"> {/* Specific dimensions matching your visual */}
              <Image
                src="/images/destinations/transport-1.png" // **UPDATE THIS PATH TO YOUR IMAGE**
                alt="Luxury SUV for airport transfers"
                layout="fill"
                objectFit="cover"
                className="hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Removed the floating badge as it's not in the design image */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TransportSection;