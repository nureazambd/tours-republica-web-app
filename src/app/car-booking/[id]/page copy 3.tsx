// src/app/car-booking/[id]/page.tsx
"use client";

import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import Image from "next/image";
import CarBookingSummary from "@/components/car/CarBookingSummary";
import FAQSection from "@/components/FAQSection";

export default function CarBookingPageById() {
  const { id } = useParams();
  const router = useRouter();
  const [car, setCar] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [agreed, setAgreed] = useState(false);

  // traveler form
  const [traveler, setTraveler] = useState({ firstName: "", lastName: "", email: "", phone: "", country: "" });
  const [flightInfo, setFlightInfo] = useState({ airline: "", flightNumber: "", remarks: "" });
  const [pickupPlace, setPickupPlace] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/cars/${id}`, { cache: "no-store" });
        if (!res.ok) {
          const json = await res.json().catch(()=>({}));
          throw new Error(json?.error || "Car not found");
        }
        const data = await res.json();
        setCar(data);
      } catch (err: any) {
        console.error(err);
        setCar(null);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  // async function handleCreateBooking({ services, total }: { services: any[]; total: number }) {
  //   if (!agreed) {
  //     alert("Please agree to terms first.");
  //     return;
  //   }
  //   if (!traveler.firstName || !traveler.lastName || !traveler.email || !traveler.phone) {
  //     alert("Please fill traveler required fields.");
  //     return;
  //   }
  //   try {
  //     const payload = {
  //       carId: car._id,
  //       carSnapshot: { name: car.name, price: car.price, image: car.image, type: car.type },
  //       traveler,
  //       flightInfo,
  //       pickupPlace,
  //       services,
  //       paymentMethod,
  //       total,
  //     };
  //     const res = await fetch("/api/bookings", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(payload),
  //     });
  //     const data = await res.json();
  //     if (res.ok) {
  //       // redirect to a thank you / booking details page or show success
  //       alert("Booking created!");
  //       router.push(`/car-booking/${car._id}?booked=true`);
  //     } else {
  //       alert(data?.error || "Failed to create booking");
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     alert("Error creating booking");
  //   }
  // }

  async function handleCreateBooking({ services, total }: { services: any[]; total: number }) {
  if (!agreed) {
    alert("Please agree to terms first.");
    return;
  }

  if (!traveler.firstName || !traveler.lastName || !traveler.email || !traveler.phone) {
    alert("Please fill traveler required fields.");
    return;
  }

  try {
    // ✅ Check user session
    const sessionRes = await fetch("/api/auth/session");
    const session = await sessionRes.json();

    if (!session?.user) {
      // Not logged in → redirect to login
      alert("Please log in to complete your booking.");
      router.push("/login");
      return;
    }

    // ✅ Create booking payload
    const payload = {
      userId: session.user._id, // assuming _id is returned from session
      carId: car._id,
      carSnapshot: {
        name: car.name,
        price: car.price,
        image: car.image,
        type: car.type,
      },
      traveler,
      flightInfo,
      pickupPlace,
      services,
      paymentMethod,
      total,
      paymentStatus: paymentMethod === "cash" ? "pending" : "unpaid",
    };

    // ✅ Save booking
    const res = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Booking successfully created!");
      router.push(`/car-booking/${car._id}?booked=true`);
    } else {
      alert(data?.error || "Failed to create booking");
    }
  } catch (err) {
    console.error(err);
    alert("Error creating booking");
  }
}


  if (loading) return <div className="p-10 text-center">Loading car...</div>;
  if (!car) return <div className="p-10 text-center text-red-600">Car not found.</div>;

  return (
    <Layout>
      <div className="container-custom py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm">
          {/* Traveler form */}
          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <h3 className="font-semibold mb-4">Traveler information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input required placeholder="First name" className="border p-3 rounded" value={traveler.firstName} onChange={(e)=>setTraveler({...traveler, firstName:e.target.value})} />
              <input required placeholder="Last name" className="border p-3 rounded" value={traveler.lastName} onChange={(e)=>setTraveler({...traveler, lastName:e.target.value})} />
              <input required type="email" placeholder="Email" className="border p-3 rounded" value={traveler.email} onChange={(e)=>setTraveler({...traveler, email:e.target.value})} />
              <input required placeholder="Phone" className="border p-3 rounded" value={traveler.phone} onChange={(e)=>setTraveler({...traveler, phone:e.target.value})} />
              <input placeholder="Country" className="border p-3 rounded md:col-span-2" value={traveler.country} onChange={(e)=>setTraveler({...traveler, country:e.target.value})} />
            </div>
          </div>

          {/* Flight info */}
          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <h3 className="font-semibold mb-4">Flight information</h3>
            <input placeholder="Airline and flight number" className="border p-3 rounded w-full mb-4" value={flightInfo.airline} onChange={(e)=>setFlightInfo({...flightInfo, airline:e.target.value})} />
            <input placeholder="Flight number" className="border p-3 rounded w-full mb-4" value={flightInfo.flightNumber} onChange={(e)=>setFlightInfo({...flightInfo, flightNumber:e.target.value})} />
            <textarea placeholder="Remarks" rows={3} className="border p-3 rounded w-full" value={flightInfo.remarks} onChange={(e)=>setFlightInfo({...flightInfo, remarks:e.target.value})} />
          </div>

          {/* Payment details */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="font-semibold mb-4">Payment details</h3>
            <div className="space-y-3">
              <label className="flex items-center gap-2"><input type="radio" name="pay" value="cash" checked={paymentMethod==="cash"} onChange={()=>setPaymentMethod("cash")} /> Cash payment</label>
              <label className="flex items-center gap-2"><input type="radio" name="pay" value="paypal" checked={paymentMethod==="paypal"} onChange={()=>setPaymentMethod("paypal")} /> PayPal</label>
              <label className="flex items-center gap-2"><input type="radio" name="pay" value="card" checked={paymentMethod==="card"} onChange={()=>setPaymentMethod("card")} /> Card</label>
            </div>
          </div>

          <div className="mt-4">
            <label className="flex items-center gap-2"><input type="checkbox" checked={agreed} onChange={(e)=>setAgreed(e.target.checked)} /> By continuing, you agree to the Terms and Conditions</label>
          </div>
          <div className="mt-6">
            <FAQSection />
          </div>

        </div>

        {/* Right summary column */}
        <div>
          <CarBookingSummary
            car={car}
            onBack={() => history.back()}
            onBook={({ services, total }) => handleCreateBooking({ services, total })}
          />
          
        </div>
      </div>
    </Layout>
  );
}
