"use client";

import Image from "next/image";
import Link from "next/link";

export default function AirportTransferBanner() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="">
        <div className="bg-white rounded-2xl shadow-md flex flex-col lg:flex-row items-center justify-between gap-8 p-8">
          {/* --- Left Text Section --- */}
          <div className="flex-1">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Need transport? We handle airport transfers.
            </h2>
            <p className="text-gray-600 text-lg mb-6 max-w-xl">
              Arrive and depart in comfort with our reliable, hassle-free private
              airport transfers.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-rose-500 hover:bg-rose-600 text-white font-semibold px-6 py-3 rounded-lg transition"
            >
              Contact us →
            </Link>
          </div>

          {/* --- Right Image --- */}
          <div className="flex-1">
            <Image
              src="/images/tours/airport-transport.png" // ✅ add your car image here
              alt="Airport Transfer"
              width={500}
              height={300}
              className="rounded-xl object-cover w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
