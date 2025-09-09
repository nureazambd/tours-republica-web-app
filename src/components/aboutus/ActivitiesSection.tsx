"use client"

import { useState } from "react";
import Image from "next/image";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const activities = [
  {
    title: "Zip lining",
    content: `Glide above it all...` // Simplified for brevity
  },
  { title: "Bungee Jumping", content: "..." },
  { title: "Rafting", content: "..." },
];

export default function ActivitiesSection() {
  const [openIndex, setOpenIndex] = useState(0);
  return (
    <section className="bg-gray-100 text-gray-800 py-16">
      <div className="max-w-7xl mx-auto md:flex items-start gap-12">
        <div className="md:w-1/2 space-y-4">
          <p className="text-teal-400 font-semibold">What We Do</p>
          <h2 className="text-3xl font-bold">Our Particular Activities</h2>
          {activities.map((a, i) => (
            <div key={i} className="border-b border-gray-300 py-2">
              <button
                onClick={() => setOpenIndex(i === openIndex ? -1 : i)}
                className="w-full text-left flex justify-between items-center"
              >
                {a.title}
                {i === openIndex ? <FaChevronUp /> : <FaChevronDown />}
              </button>
              {i === openIndex && (
                <p className="mt-2 text-gray-600">{a.content}</p>
              )}
            </div>
          ))}
          <button className="mt-4 bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 px-5 rounded-full">
            Check Availability
          </button>
        </div>
        <div className="md:w-1/2 relative">
          <div className="rounded-2xl overflow-hidden ">
            <Image
              src="/images/about/activities-1.png"
              alt="Activities"
              width={600}
              height={400}
              className="object-cover"
            />
          </div>
          {/* <div className="absolute bottom-5 right-5 bg-white rounded-full p-3 shadow-lg">
            <button>
              ▶
            </button>
          </div> */}
        </div>
      </div>
    </section>
  );
}
