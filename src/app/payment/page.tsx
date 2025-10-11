"use client";

import { useState } from "react";
import { CreditCard, Wallet, DollarSign } from "lucide-react";

export default function PaymentPage() {
  const [paymentMethod, setPaymentMethod] = useState("paypal");

  const handlePayment = () => {
    alert(`Payment method: ${paymentMethod}`);
    // ✅ Here you can integrate your backend API or redirect to checkout
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-16">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Choose Payment Method
        </h2>

        <div className="space-y-4">
          <label className="flex items-center gap-3 border rounded-xl p-4 cursor-pointer hover:bg-gray-100 transition">
            <input
              type="radio"
              name="payment"
              checked={paymentMethod === "paypal"}
              onChange={() => setPaymentMethod("paypal")}
            />
            <DollarSign className="w-5 h-5 text-blue-500" />
            <span>PayPal</span>
          </label>

          <label className="flex items-center gap-3 border rounded-xl p-4 cursor-pointer hover:bg-gray-100 transition">
            <input
              type="radio"
              name="payment"
              checked={paymentMethod === "card"}
              onChange={() => setPaymentMethod("card")}
            />
            <CreditCard className="w-5 h-5 text-green-500" />
            <span>Credit / Debit Card</span>
          </label>

          <label className="flex items-center gap-3 border rounded-xl p-4 cursor-pointer hover:bg-gray-100 transition">
            <input
              type="radio"
              name="payment"
              checked={paymentMethod === "cash"}
              onChange={() => setPaymentMethod("cash")}
            />
            <Wallet className="w-5 h-5 text-orange-500" />
            <span>Cash on Delivery</span>
          </label>
        </div>

        <button
          onClick={handlePayment}
          className="mt-6 w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
        >
          Proceed to Pay
        </button>
      </div>
    </div>
  );
}
