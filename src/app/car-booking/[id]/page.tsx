// Your page component file, e.g., src/app/car-booking/[id]/page.tsx

"use client";

import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import CarBookingSummary from "@/components/car/CarBookingSummary";
import FAQSection from "@/components/FAQSection";

export default function CarBookingPageById() {
  const { id } = useParams();
  const router = useRouter();

  const [car, setCar] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [agreed, setAgreed] = useState(false);

  // Form states
  const [traveler, setTraveler] = useState({ firstName: "", lastName: "", email: "", phone: "", country: "" });
  const [flightInfo, setFlightInfo] = useState({ airline: "", flightNumber: "", remarks: "" });
  const [pickupPlace, setPickupPlace] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [user, setUser] = useState<any>(null);

  // Load user from localStorage on component mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      const token = localStorage.getItem("token");
      if (storedUser && token) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (e) {
          console.error("Invalid user JSON in localStorage", e);
        }
      }
    }
  }, []);

  // Fetch car data based on ID from URL
  useEffect(() => {
    if (!id) return;
    const fetchCar = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/cars/${id}`, { cache: "no-store" });
        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          throw new Error(errorData?.error || "Car not found");
        }
        const data = await res.json();
        setCar(data);
      } catch (err: any) {
        console.error("Failed to fetch car:", err);
        setCar(null);
      } finally {
        setLoading(false);
      }
    };
    fetchCar();
  }, [id]);

  // Handle the booking submission
  async function handleCreateBooking({ services, total }: { services: any[]; total: number }) {
    if (!agreed) {
      alert("Please agree to the terms and conditions first.");
      return;
    }
    if (!traveler.firstName || !traveler.lastName || !traveler.email || !traveler.phone) {
      alert("Please fill in all required traveler information fields.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to create a booking. Redirecting to login.");
      router.push("/login");
      return;
    }

    try {
      // The payload does NOT include `userId`. The backend gets it from the token.
      const payload = {
        carId: car._id,
        carSnapshot: { name: car.name, price: car.price, image: car.image, type: car.type },
        traveler,
        flightInfo,
        pickupPlace,
        services,
        paymentMethod,
        total,
        paymentStatus: paymentMethod === "cash" ? "pending" : "unpaid",
      };

      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // The token is sent here
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        // alert("Booking successfully created!");
        // router.push(`/car-booking/${car._id}?booked=true`);
        const { total } = payload;
  router.push(`/payment-success?amount=${total}&orderRef=OIU${Date.now().toString().slice(-6)}&method=${paymentMethod}`);
      } else {
        // Display the specific error from the server
        alert(data?.error || "An unknown error occurred while creating the booking.");
      }
    } catch (err) {
      console.error("Error creating booking:", err);
      alert("An error occurred. Please check the console for details.");
    }
  }

  // UI Rendering
  if (loading) return <div className="p-10 text-center">Loading car details...</div>;
  if (!car) return <div className="p-10 text-center text-red-600">Error: Car not found.</div>;

  return (
    <Layout>
      <div className="container-custom py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column for forms */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm">
          {/* Traveler info form */}
          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <h3 className="font-semibold mb-4">Traveler Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input placeholder="First name" className="border p-3 rounded" value={traveler.firstName} onChange={(e) => setTraveler({ ...traveler, firstName: e.target.value })} />
              <input placeholder="Last name" className="border p-3 rounded" value={traveler.lastName} onChange={(e) => setTraveler({ ...traveler, lastName: e.target.value })} />
              <input type="email" placeholder="Email" className="border p-3 rounded" value={traveler.email} onChange={(e) => setTraveler({ ...traveler, email: e.target.value })} />
              <input placeholder="Phone" className="border p-3 rounded" value={traveler.phone} onChange={(e) => setTraveler({ ...traveler, phone: e.target.value })} />
              <input placeholder="Country" className="border p-3 rounded md:col-span-2" value={traveler.country} onChange={(e) => setTraveler({ ...traveler, country: e.target.value })} />
            </div>
          </div>

          {/* Flight info form */}
          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <h3 className="font-semibold mb-4">Flight Information (Optional)</h3>
            <input placeholder="Airline" className="border p-3 rounded w-full mb-4" value={flightInfo.airline} onChange={(e) => setFlightInfo({ ...flightInfo, airline: e.target.value })} />
            <input placeholder="Flight number" className="border p-3 rounded w-full mb-4" value={flightInfo.flightNumber} onChange={(e) => setFlightInfo({ ...flightInfo, flightNumber: e.target.value })} />
            <textarea placeholder="Remarks" rows={3} className="border p-3 rounded w-full" value={flightInfo.remarks} onChange={(e) => setFlightInfo({ ...flightInfo, remarks: e.target.value })} />
          </div>

          {/* Payment method selection */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="font-semibold mb-4">Payment Details</h3>
            <div className="space-y-3">
              <label className="flex items-center gap-2"><input type="radio" name="pay" value="cash" checked={paymentMethod === "cash"} onChange={() => setPaymentMethod("cash")} /> Cash payment</label>
              <label className="flex items-center gap-2"><input type="radio" name="pay" value="paypal" checked={paymentMethod === "paypal"} onChange={() => setPaymentMethod("paypal")} /> PayPal</label>
              <label className="flex items-center gap-2"><input type="radio" name="pay" value="card" checked={paymentMethod === "card"} onChange={() => setPaymentMethod("card")} /> Card</label>
            </div>
          </div>

          {/* Terms and FAQ */}
          <div className="mt-4"><label className="flex items-center gap-2"><input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} /> By continuing, you agree to the Terms and Conditions</label></div>
          <div className="mt-6"><FAQSection /></div>
        </div>

        {/* Right column for booking summary */}
        <div>
          <CarBookingSummary car={car} onBack={() => router.back()} onBook={handleCreateBooking} />
        </div>
      </div>
    </Layout>
  );
}