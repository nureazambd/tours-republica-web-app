"use client";

import { useSearchParams, useParams } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";
import { FaCcVisa, FaCcMastercard, FaCcAmex } from "react-icons/fa";
import { SiPaypal } from "react-icons/si";
import Layout from "@/components/layout/Layout";
import FAQSection from "@/components/FAQSection";
import Link from "next/link";

export default function PaymentPage() {
  const { id } = useParams();
  const [tour, setTour] = useState<any>(null);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    pickupPlace: "",
    remarks: "",
  });

  const [agreed, setAgreed] = useState(false);

  // Fetch tour details dynamically
  useEffect(() => {
    async function fetchTour() {
      const res = await fetch(`/api/tours/${id}`);
      const data = await res.json();
      setTour(data);
    }
    fetchTour();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (paymentMethod === "paypal") {
      // Redirect to PayPal route
      const res = await fetch("/api/paypal/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: tour?.price || 100 }),
      });
      const data = await res.json();
      window.location.href = data.approvalUrl;
    } else {
      alert("Booking confirmed successfully!");
    }
  };

  if (!tour) return <div className="p-10 text-center">Loading...</div>;

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 px-4">
          {/* Left Side - Traveler Info */}

          <div className="lg:col-span-2  bg-white rounded-xl p-6 shadow-sm">
            <form
              onSubmit={handleSubmit}
              className="lg:col-span-2 space-y-6 bg-white rounded-xl p-6 shadow-sm"
            >
              {/* Traveler Info */}
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="font-semibold text-lg mb-4 flex items-center gap-2 text-[#191919]">
                  <Image
                    src={"/icons/User.png"}
                    alt={"Traveler information icon"}
                    width={40}
                    height={40}
                    className="w-5 h-5 text-gray-600"
                  />
                  Traveler Information
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="border p-3 rounded-lg w-full"
                    onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="border p-3 rounded-lg w-full"
                    onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className="border p-3 rounded-lg w-full"
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder="Phone Number"
                    className="border p-3 rounded-lg w-full"
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder="Country"
                    className="border p-3 rounded-lg w-full md:col-span-2"
                    onChange={(e) => setForm({ ...form, country: e.target.value })}
                  />
                </div>
              </div>

              {/* Pickup Info */}
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="font-semibold text-lg mb-4 flex items-center gap-2 text-[#191919]">
                  <Image
                    src={"/icons/Location.png"}
                    alt={"Traveler information icon"}
                    width={40}
                    height={40}
                    className="w-5 h-5 text-gray-600"
                  />
                  Pick-up Information</div>
                <input
                  type="text"
                  placeholder="Pickup Place"
                  className="border p-3 rounded-lg w-full mb-4"
                  onChange={(e) => setForm({ ...form, pickupPlace: e.target.value })}
                />
                <textarea
                  placeholder="Remarks"
                  className="border p-3 rounded-lg w-full"
                  rows={3}
                  onChange={(e) => setForm({ ...form, remarks: e.target.value })}
                ></textarea>
              </div>

              {/* Payment Details */}
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="font-semibold text-lg mb-4 flex items-center gap-2 text-[#191919]">
                  <Image
                    src={"/icons/Wallet.png"}
                    alt={"Traveler information icon"}
                    width={40}
                    height={40}
                    className="w-5 h-5 text-gray-600"
                  />
                  Payment Details</div>
                <div className="space-y-3">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="payment"
                      value="cash"
                      checked={paymentMethod === "cash"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    Cash Payment
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="payment"
                      value="paypal"
                      checked={paymentMethod === "paypal"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    {/* <SiPaypal className="text-blue-500 text-xl" /> PayPal */}
                    <Image
                      src={"/icons/paypal.png"}
                      alt={"Traveler information icon"}
                      width={80}
                      height={50}
                      className="text-blue-500 text-xl"
                    />
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={paymentMethod === "card"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />

                    {/* <SiPaypal className="text-blue-500 text-xl" />  */}
                    <Image
                      src={"/icons/card.png"}
                      alt={"Traveler information icon"}
                      width={140}
                      height={60}
                      className="text-blue-500 text-xl"
                    />
                  </label>
                  {/* <div className="flex items-center gap-2">
                  <FaCcVisa className="text-blue-600 text-2xl" />
                  <FaCcMastercard className="text-red-500 text-2xl" />
                  <FaCcAmex className="text-blue-400 text-2xl" />
                </div> */}
                </div>
              </div>

              <label className="flex items-center text-gray-700 text-sm gap-2">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="w-4 h-4 accent-rose-500 cursor-pointer"
        />
        <span>
          By continuing, you agree to the{" "}
          <Link
            href="/terms-and-conditions"
            className="text-rose-500 hover:underline font-medium"
          >
            Terms and Conditions
          </Link>
          .
        </span>
      </label>

              <button
                type="submit"
                className="w-full bg-rose-500 text-white py-3 rounded-lg font-semibold hover:bg-rose-600 transition-all duration-300"
              >
                Confirm Booking →
              </button>
            </form>
            {/* other tour details content */}

            <FAQSection />
          </div>

          {/* Right Side - Tour Summary */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            {/* <Image
            src={tour.image || "/images/sample.jpg"}
            alt={tour.title}
            width={400}
            height={250}
            className="rounded-lg mb-4"
          /> */}
            <Image
              src={tour.image || "/images/sample.jpg"}
              alt={tour?.title || "Tour image"}
              width={400}
              height={250}
              className="rounded-lg mb-4"
            />

            <h2 className="text-lg font-semibold mb-2">{tour.title}</h2>
            <p className="text-gray-500 mb-4">Pickup: Punta Cana</p>

            <div className="border-t pt-4 space-y-2">
              <p className="text-sm flex justify-between">
                <span>Total:</span> <span>${tour.price}</span>
              </p>
              <p className="text-sm flex justify-between text-gray-500">
                <span>Duration:</span> <span>{tour.duration || "8h"}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

    </Layout>
  );
}
