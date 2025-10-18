"use client";

import Image from "next/image";
import Link from "next/link";
import { Download, ArrowLeft } from "lucide-react";
import Layout from '@/components/layout/Layout';

export default function BookingConfirmationPage() {
  const suggestedTours = [
    {
      id: 1,
      title: "Aventura En Buggys",
      discount: "30% off",
      rating: 4.8,
      reviews: 30,
      category: "Adventure",
      location: "Punta Cana",
      times: ["8am", "11am", "1pm"],
      price: 50,
      oldPrice: 75,
      image: "/images/buggy.jpg",
    },
    {
      id: 2,
      title: "Santo Domingo City Tour",
      discount: "30% off",
      rating: 4.8,
      reviews: 30,
      category: "Cultural City trips",
      location: "Punta Cana",
      times: ["8am", "11am", "1pm"],
      price: 50,
      oldPrice: 75,
      image: "/images/santo.jpg",
    },
    {
      id: 3,
      title: "Saona Island Day Trip Lunch Included",
      discount: "30% off",
      rating: 4.8,
      reviews: 30,
      category: "Nature and Boat Trip",
      location: "Punta Cana",
      times: ["8am", "11am", "1pm"],
      price: 50,
      oldPrice: 75,
      image: "/images/saona.jpg",
    },
  ];

  return (
    <Layout>
    <div className="min-h-screen bg-white text-black">
      {/* ✅ Top Confirmation Section */}
      <section className="flex flex-col items-center justify-center text-center py-20 px-4">
        {/* Illustration */}
        <Image
          src="/images/Congratulations/Congratulations.png"
          alt="Booking Confirmed"
          width={300}
          height={300}
          className="mb-6"
        />

        {/* Confirmation Text */}
        <h1 className="text-3xl md:text-3xl font-medium mb-2">
          Congratulations!
        </h1>
        <h2 className="text-2xl text-gray-700 mb-6">
          Your rescheduling is Confirmed!
        </h2>

        {/* Message */}
        <div className=" text-gray-600 text-sm md:text-base space-y-2">
          <p>Thank you for choosing <span className="text-white font-medium">ToursRepublica!</span></p>
          <p>Your itinerary will be sent to your email shortly. Please review your journey details carefully.</p>
          <p>
            If you need assistance, feel free to contact us via our Contact
            Centre, live chat, or email at{" "}
            <a
              href="mailto:support@toursrepublica.com"
              className="text-red-400 hover:underline"
            >
              support@toursrepublica.com
            </a>.
          </p>
          <p className="pt-2 text-gray-500 text-xs">
            Please note that ToursRepublica’s fare rules apply to this booking.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <button
            className="bg-[#FF1E56] text-white px-6 py-3 rounded-full hover:bg-[#e01747] flex items-center gap-2"
          >
            <Download size={18} />
            Download Ticket
          </button>

          <Link
            href="/"
            className="text-gray-400 hover:text-white flex items-center gap-2"
          >
            <ArrowLeft size={16} /> Back to Homepage
          </Link>
        </div>
      </section>

      {/* ✅ Suggested Tours Section */}
      <section className="bg-white text-black py-16 px-6 md:px-16 rounded-t-3xl">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-2xl font-semibold">
            You may also be interested in
          </h2>
          <Link
            href="/tours"
            className="text-[#FF1E56] font-medium hover:underline"
          >
            See All →
          </Link>
        </div>

        {/* Tour Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {suggestedTours.map((tour) => (
            <div
              key={tour.id}
              className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition"
            >
              <div className="relative">
                <Image
                  src={tour.image}
                  alt={tour.title}
                  width={400}
                  height={250}
                  className="w-full h-56 object-cover"
                />
                <span className="absolute top-4 left-4 bg-[#00C9A7] text-white text-xs font-medium px-3 py-1 rounded-full">
                  {tour.discount}
                </span>
              </div>
              <div className="p-5 space-y-2">
                <div className="flex items-center text-yellow-500 text-sm">
                  ⭐ {tour.rating}{" "}
                  <span className="text-gray-500 ml-1">
                    ({tour.reviews} Reviews)
                  </span>
                </div>
                <h3 className="font-semibold text-lg">{tour.title}</h3>
                <p className="text-gray-500 text-sm">
                  Explore the highlights of {tour.location} in a thrilling
                  half-day off-road dune buggy adventure.
                </p>

                <p className="text-gray-600 text-sm mt-3">
                  Pickup: <span className="font-medium">{tour.location}</span>
                </p>

                <p className="text-gray-600 text-sm">
                  ⏰ Everyday ({tour.times.join(" / ")})
                </p>

                <div className="flex justify-between items-center mt-4">
                  <div className="text-sm">
                    <span className="text-gray-400 line-through mr-2">
                      ${tour.oldPrice}
                    </span>
                    <span className="text-[#FF1E56] font-semibold text-lg">
                      ${tour.price}
                    </span>
                    <span className="text-gray-500 text-sm"> pp</span>
                  </div>
                  <button className="bg-[#FF1E56] text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-[#e01747]">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
    </Layout>
  );
}
