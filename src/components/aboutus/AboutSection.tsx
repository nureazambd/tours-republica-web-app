// components/AboutSection.tsx
import Image from "next/image";
import { FaCheckCircle, FaUserTie, FaStar, FaClock } from "react-icons/fa";

export default function AboutSection() {
  return (
    <section className="dark:bg-gray-900 text-black px-6 py-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-24">
        {/* Images */}
        <div className="relative">
          <div className="rounded-3xl overflow-hidden shadow-lg w-64 h-80 md:w-80 md:h-96">
            <Image
              src="/images/about/about-main.png"
              alt="Main"
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute bottom-7 right-10 transform translate-x-1/2 translate-y-1/3 rounded-2xl overflow-hidden w-40 h-52 ">
            <Image
              src="/images/about/about-overlay.png"
              alt="Overlay"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Text */}
        <div className="md:w-1/2 space-y-4">
          <p className="text-teal-400 font-semibold">About Us</p>
          <h2 className="text-3xl md:text-4xl font-bold">
            We Provide The Best Tour Facilities.
          </h2>
          <p className="text-gray-400">
            Our tours come with the finest facilities to ensure your experience is hassle‑free and truly memorable, with thoughtful touches that make a real difference along the way.
          </p>
          <ul className="space-y-2 text-gray-600">
            {[
              { icon: <FaCheckCircle className="text-yellow-400" />, text: "Safety First Always" },
              { icon: <FaUserTie className="text-yellow-400" />, text: "Trusted Travel Guide" },
              { icon: <FaStar className="text-yellow-400" />, text: "Expertise And Experience" },
              { icon: <FaClock className="text-yellow-400" />, text: "Time and Stress Savings" },
            ].map(({ icon, text }, i) => (
              <li key={i} className="flex items-center gap-2">
                {icon} {text}
              </li>
            ))}
          </ul>
          <div className="flex gap-4">
            <button className="bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 px-6 rounded-full">
              Our Packages
            </button>
            <button className="border border-pink-600 text-pink-600 hover:bg-pink-700/10 font-semibold py-2 px-6 rounded-full">
              Watch Tour
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
