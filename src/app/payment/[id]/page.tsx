"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Layout from "@/components/layout/Layout";
import Link from "next/link";
import FAQSection from "@/components/FAQSection";

interface TourBooking {
  id: string;
  title: string;
  image: string;
  price: number;
  duration: string;
  location: string;
  pickup?: string;
  adults: number;
  children: number;
  subtotal: number;
  tax: number;
  total: number;
}

export default function PaymentPage() {
  const { id } = useParams();
  const router = useRouter();
  const [tour, setTour] = useState<TourBooking | null>(null);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    pickupPlace: "",
    remarks: "",
  });

  // ✅ Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("selectedTour");
    if (stored) {
      const parsed = JSON.parse(stored);
      setTour({
        ...parsed,
        id: parsed.id || id, // fallback
      });
    }
    setLoading(false);
  }, [id]);

  // ✅ Handle Form Submission
  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   if (!agreed) return alert("Please agree to the Terms and Conditions.");
  //   if (!tour) return alert("Booking data missing. Try again.");

  //   if (paymentMethod === "paypal") {
  //     try {
  //       const res = await fetch("/api/paypal/create-order", {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({ amount: tour.total }),
  //       });
  //       const data = await res.json();
  //       if (data.approvalUrl) {
  //         window.location.href = data.approvalUrl;
  //       } else {
  //         alert("Unable to start PayPal payment.");
  //       }
  //     } catch (err) {
  //       console.error(err);
  //       alert("Payment failed.");
  //     }
  //   } else {
  //     alert(`✅ Booking confirmed via ${paymentMethod.toUpperCase()}!`);
  //     localStorage.removeItem("selectedTour");
  //     router.push("/thank-you");
  //   }
  // };

  // ✅ Handle Form Submission
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!agreed) {
    alert("Please agree to the Terms and Conditions.");
    return;
  }

  if (!tour) {
    alert("Booking data missing. Try again.");
    return;
  }

  try {
    // ✅ Save booking in MongoDB
    const res = await fetch("/api/tour-bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tourId: id,
        title: tour.title,
        location: tour.location,
        adults: tour.adults,
        children: tour.children,
        subtotal: tour.subtotal,
        tax: tour.tax,
        total: tour.total,
        paymentMethod,
        ...form,
      }),
    });

    if (!res.ok) throw new Error("Failed to save booking");

    const saved = await res.json();
    console.log("✅ Booking Saved:", saved);

    // ✅ Redirect after success
    if (paymentMethod === "paypal") {
      // Optional future PayPal integration
    } else {
      localStorage.removeItem("selectedTour");
      router.push(`/booking-success?amount=${tour.total}`);
    }
  } catch (error) {
    console.error(error);
    alert("Booking failed. Please try again.");
  }
};


  if (loading) return <div className="text-center p-10">Loading booking...</div>;
  if (!tour) return <div className="text-center text-red-600 p-10">No booking found.</div>;

  return (
    <Layout>
      <div className="min-h-screen bg-white text-black py-12">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 px-4">
          {/* ========== LEFT SECTION ========== */}
          <div className="lg:col-span-2 bg-gray-50 rounded-xl p-6 shadow-sm border">
            <form onSubmit={handleSubmit} className="space-y-6">
              <h2 className="font-semibold text-lg mb-4">Traveler Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {["firstName", "lastName", "email", "phone", "country"].map((key) => (
                  <input
                    key={key}
                    type={key === "email" ? "email" : "text"}
                    placeholder={key.replace(/([A-Z])/g, " $1").trim()}
                    className="border border-gray-300 p-3 rounded-lg w-full"
                    required
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  />
                ))}
              </div>

              <h2 className="font-semibold text-lg mt-6 mb-4">Pickup Information</h2>
              <input
                type="text"
                placeholder="Pickup Place"
                className="border border-gray-300 p-3 rounded-lg w-full mb-4"
                required
                onChange={(e) => setForm({ ...form, pickupPlace: e.target.value })}
              />
              <textarea
                placeholder="Remarks (optional)"
                className="border border-gray-300 p-3 rounded-lg w-full"
                rows={3}
                onChange={(e) => setForm({ ...form, remarks: e.target.value })}
              ></textarea>

              <h2 className="font-semibold text-lg mt-6 mb-4">Payment Method</h2>
              <div className="space-y-3">
                {["cash", "paypal", "card"].map((method) => (
                  <label key={method} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      value={method}
                      checked={paymentMethod === method}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <span className="capitalize">{method}</span>
                  </label>
                ))}
              </div>

              <label className="flex items-center gap-2 text-sm mt-6">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="accent-rose-500 w-4 h-4"
                />
                <span>
                  I agree to the{" "}
                  <Link href="/terms-and-conditions" className="text-rose-500 hover:underline">
                    Terms and Conditions
                  </Link>.
                </span>
              </label>

              <button
                type="submit"
                className="w-full bg-rose-500 text-white py-3 rounded-lg font-semibold hover:bg-rose-600 transition-all duration-300 mt-4"
              >
                Confirm Booking →
              </button>
            </form>

            <div className="mt-10">
              <FAQSection />
            </div>
          </div>

          {/* ========== RIGHT SUMMARY ========== */}
          <div className="bg-gray-50 rounded-xl p-6 shadow-sm border">
            <Image
              src={tour.image || "/images/sample.jpg"}
              alt={tour.title}
              width={400}
              height={250}
              className="rounded-lg mb-4 object-cover"
            />
            <h2 className="text-lg font-semibold mb-2">{tour.title}</h2>
            <p className="text-gray-600 text-sm mb-4">{tour.location}</p>

            <div className="border-t pt-4 space-y-2 text-sm">
              <p className="flex justify-between">
                <span>Adults ({tour.adults})</span>
                <span>${(tour.adults * tour.price).toFixed(2)}</span>
              </p>
              <p className="flex justify-between">
                <span>Children ({tour.children})</span>
                <span>${(tour.children * tour.price * 0.5).toFixed(2)}</span>
              </p>
              <p className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>${tour.subtotal.toFixed(2)}</span>
              </p>
              <p className="flex justify-between text-gray-600">
                <span>Tax (10%)</span>
                <span>${tour.tax.toFixed(2)}</span>
              </p>
              <p className="flex justify-between font-semibold text-lg border-t pt-3">
                <span>Total</span>
                <span>${tour.total.toFixed(2)}</span>
              </p>
            </div>

            <div className="text-center mt-4">
              <Link href={`/tours/${tour.id}`} className="text-rose-500 hover:underline text-sm">
                ← Modify booking
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
