"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import FAQSection from "@/components/FAQSection";
import Link from "next/link";

export default function PaymentPage() {
  const { id } = useParams();
  const [tour, setTour] = useState<any>(null);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    pickupPlace: "",
    remarks: "",
  });

  // ✅ Fetch tour details dynamically
  useEffect(() => {
    async function fetchTour() {
      try {
        setLoading(true);
        const res = await fetch(`/api/tours/${id}`, { cache: "no-store" });
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || "Failed to load tour");
        }
        const data = await res.json();
        setTour(data);
      } catch (err: any) {
        console.error("Error fetching tour:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchTour();
  }, [id]);

  // ✅ Handle booking submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!agreed) {
      alert("Please agree to the Terms and Conditions before continuing.");
      return;
    }

    if (paymentMethod === "paypal") {
      try {
        const res = await fetch("/api/paypal/create-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: tour?.price || 100 }),
        });
        const data = await res.json();
        if (data?.approvalUrl) {
          window.location.href = data.approvalUrl;
        } else {
          alert("Unable to initiate PayPal payment.");
        }
      } catch (err) {
        console.error(err);
        alert("Payment failed. Try again later.");
      }
    } else {
      alert("Booking confirmed successfully!");
    }
  };

  // ✅ UI States
  if (loading) {
    return <div className="p-10 text-center text-gray-600">Loading tour details...</div>;
  }

  if (error) {
    return <div className="p-10 text-center text-red-600">❌ {error}</div>;
  }

  if (!tour) {
    return <div className="p-10 text-center text-gray-600">No tour found.</div>;
  }

  // ✅ Page Content
  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 px-4">
          {/* ================= Left Column ================= */}
          <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Traveler Info */}
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="font-semibold text-lg mb-4 flex items-center gap-2 text-[#191919]">
                  <Image src="/icons/User.png" alt="Traveler" width={20} height={20} />
                  Traveler Information
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {["firstName", "lastName", "email", "phone", "country"].map((key) => (
                    <input
                      key={key}
                      type={key === "email" ? "email" : "text"}
                      placeholder={key.replace(/([A-Z])/g, " $1").trim()}
                      className="border p-3 rounded-lg w-full"
                      required={["firstName", "lastName", "email", "phone"].includes(key)}
                      onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    />
                  ))}
                </div>
              </div>

              {/* Pickup Info */}
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="font-semibold text-lg mb-4 flex items-center gap-2 text-[#191919]">
                  <Image src="/icons/Location.png" alt="Pickup" width={20} height={20} />
                  Pick-up Information
                </div>
                <input
                  type="text"
                  placeholder="Pickup Place"
                  className="border p-3 rounded-lg w-full mb-4"
                  required
                  onChange={(e) => setForm({ ...form, pickupPlace: e.target.value })}
                />
                <textarea
                  placeholder="Remarks (optional)"
                  className="border p-3 rounded-lg w-full"
                  rows={3}
                  onChange={(e) => setForm({ ...form, remarks: e.target.value })}
                ></textarea>
              </div>

              {/* Payment Details */}
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="font-semibold text-lg mb-4 flex items-center gap-2 text-[#191919]">
                  <Image src="/icons/Wallet.png" alt="Payment" width={20} height={20} />
                  Payment Details
                </div>
                <div className="space-y-3">
                  {["cash", "paypal", "card"].map((method) => (
                    <label key={method} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="payment"
                        value={method}
                        checked={paymentMethod === method}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                      <span className="capitalize">{method}</span>
                      {method !== "cash" && (
                        <Image
                          src={`/icons/${method}.png`}
                          alt={method}
                          width={method === "card" ? 100 : 80}
                          height={40}
                        />
                      )}
                    </label>
                  ))}
                </div>
              </div>

              {/* Terms Agreement */}
              <label className="flex items-center text-gray-700 text-sm gap-2">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="w-4 h-4 accent-rose-500 cursor-pointer"
                />
                <span>
                  By continuing, you agree to the{" "}
                  <Link href="/terms-and-conditions" className="text-rose-500 hover:underline font-medium">
                    Terms and Conditions
                  </Link>
                  .
                </span>
              </label>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-rose-500 text-white py-3 rounded-lg font-semibold hover:bg-rose-600 transition-all duration-300"
              >
                Confirm Booking →
              </button>
            </form>

            <div className="mt-10">
              <FAQSection />
            </div>
          </div>

          {/* ================= Right Column ================= */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <Image
              src={tour?.image || "/images/sample.jpg"}
              alt={tour?.title || "Tour image"}
              width={400}
              height={250}
              className="rounded-lg mb-4 object-cover"
            />
            <h2 className="text-lg font-semibold mb-2">{tour?.title}</h2>
            <p className="text-gray-500 mb-4">
              Pickup: {tour?.pickup || "N/A"}
            </p>

            <div className="border-t pt-4 space-y-2">
              <p className="text-sm flex justify-between">
                <span>Total:</span> <span>${tour?.price}</span>
              </p>
              <p className="text-sm flex justify-between text-gray-500">
                <span>Duration:</span> <span>{tour?.duration || "8h"}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
