"use client";

import { useState } from "react";
// import { X, CreditCard, Paypal, Wallet } from "lucide-react";
import { X, CreditCard, Wallet, DollarSign } from "lucide-react";


interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  tour: any;
  adults: number;
  children: number;
  total: number;
}

export default function BookingModal({
  isOpen,
  onClose,
  tour,
  adults,
  children,
  total,
}: BookingModalProps) {
  const [pickupPlace, setPickupPlace] = useState("");
  const [remarks, setRemarks] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [agree, setAgree] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl mx-4 my-10">
        {/* Header */}
        <div className="flex justify-between items-center border-b px-6 py-4">
          <h2 className="text-xl font-bold">Complete Your Booking</h2>
          <button onClick={onClose}>
            <X className="w-6 h-6 text-gray-600 hover:text-rose-500" />
          </button>
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-3 gap-6 p-6">
          {/* Left form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Traveler Info */}
            <div className="border rounded-xl p-5 bg-gray-50">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                Traveler Information
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <input type="text" placeholder="First name" className="input" />
                <input type="text" placeholder="Last name" className="input" />
                <input type="email" placeholder="Email" className="input" />
                <input type="text" placeholder="Phone number" className="input" />
              </div>
              <select className="input mt-4">
                <option value="">Country</option>
                <option>USA</option>
                <option>UK</option>
                <option>Bangladesh</option>
              </select>
            </div>

            {/* Pickup info */}
            <div className="border rounded-xl p-5 bg-gray-50">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                Pick-up Information
              </h3>
              <input
                type="text"
                placeholder="Pickup place"
                value={pickupPlace}
                onChange={(e) => setPickupPlace(e.target.value)}
                className="input mb-4"
              />
              <textarea
                placeholder="Remarks"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                className="input"
                rows={3}
              ></textarea>
            </div>

            {/* Payment */}
            <div className="border rounded-xl p-5 bg-gray-50">
              <h3 className="text-lg font-semibold mb-4">Payment Details</h3>
              <div className="space-y-3">
                <label className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === "cash"}
                    onChange={() => setPaymentMethod("cash")}
                  />
                  <Wallet className="w-5 h-5" /> Cash Payment
                </label>

                {/* <label className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === "paypal"}
                    onChange={() => setPaymentMethod("paypal")}
                  />
                  <Paypal className="w-5 h-5" /> PayPal
                </label> */}

                <label className="flex items-center gap-3">
  <input
    type="radio"
    name="payment"
    checked={paymentMethod === "paypal"}
    onChange={() => setPaymentMethod("paypal")}
  />
  <DollarSign className="w-5 h-5" /> PayPal
</label>


                <label className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === "card"}
                    onChange={() => setPaymentMethod("card")}
                  />
                  <CreditCard className="w-5 h-5" /> Credit / Debit Card
                </label>
              </div>
            </div>

            {/* Confirm button */}
            <div className="mt-6">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={agree}
                  onChange={() => setAgree(!agree)}
                />
                I agree to the{" "}
                <span className="text-rose-500 underline cursor-pointer">
                  Terms and Conditions
                </span>
              </label>
              <button
                className={`mt-4 w-full py-3 rounded-lg font-semibold transition ${
                  agree
                    ? "bg-rose-500 hover:bg-rose-600 text-white"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
                disabled={!agree}
              >
                Confirm Booking →
              </button>
            </div>
          </div>

          {/* Right summary */}
          <div className="border rounded-xl p-5 bg-gray-50">
            <img
              src={tour.image}
              alt={tour.title}
              className="rounded-lg w-full h-40 object-cover mb-4"
            />
            <h3 className="font-semibold text-lg">{tour.title}</h3>
            <p className="text-sm text-gray-500 mb-2">Pickup: {tour.pickup}</p>
            <hr className="my-3" />
            <p className="flex justify-between text-sm">
              <span>Adults ({adults})</span> <span>${tour.price * adults}</span>
            </p>
            <p className="flex justify-between text-sm">
              <span>Children ({children})</span>{" "}
              <span>${(tour.price * 0.5 * children).toFixed(2)}</span>
            </p>
            <hr className="my-3" />
            <p className="flex justify-between font-bold text-lg">
              <span>Total</span> <span>${total.toFixed(2)}</span>
            </p>
            <div className="mt-6 text-center text-sm">
              <p className="text-gray-500">Need help?</p>
              <p className="font-semibold text-rose-500">
                +1 (829) 618 5692 <br />
                reservas@toursrepublica.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
