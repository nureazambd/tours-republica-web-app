"use client";

import React, { Suspense, useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";

// This component contains the original logic and uses standard browser APIs.
function PaymentSuccessContent() {
  // State to hold dynamic data. Initialize with default values.
  const [amount, setAmount] = useState("305.00");
  const [orderRef, setOrderRef] = useState("OIU6580MN");
  const [paymentDate, setPaymentDate] = useState(
    new Date().toLocaleString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  );
  const [method, setMethod] = useState("Credit Card");

  // This useEffect runs only on the client-side after the component mounts.
  useEffect(() => {
    // Use standard browser APIs to get URL search parameters
    const searchParams = new URLSearchParams(window.location.search);

    // Update state with data from URL params if they exist
    setAmount(searchParams.get("amount") || "305.00");
    setOrderRef(searchParams.get("orderRef") || "OIU6580MN");
    setPaymentDate(
      searchParams.get("date") ||
        new Date().toLocaleString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
    );
    setMethod(searchParams.get("method") || "Credit Card");

    // Redirect to booking confirmation after delay using standard browser API
    const timer = setTimeout(() => {
      // Use window.location.href for redirection instead of Next.js router
      window.location.href = "/booking-confirmation"; // change to your actual route
    }, 5000);

    // Cleanup the timer on component unmount
    return () => clearTimeout(timer);
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-black px-4">
      <div className="max-w-lg w-full text-center space-y-8 p-6 shadow-lg rounded-lg bg-gray-50">
        {/* Success Icon */}
        <div className="flex justify-center">
          <div className="bg-yellow-500 rounded-full p-5">
            <CheckCircle className="w-14 h-14 text-white" />
          </div>
        </div>

        {/* Payment Info */}
        <div>
          <h1 className="text-3xl font-bold mb-2">
            US$ <span className="text-yellow-500">{amount}</span>
          </h1>
          <h2 className="text-xl font-semibold mb-1">Thank you for your Payment!</h2>
          <p className="text-gray-500">
            Your transaction has been successfully processed
          </p>
        </div>

        {/* Details */}
        <div className="border-t border-gray-200 pt-6 text-left space-y-3 text-gray-700">
          <div className="flex justify-between">
            <span className="font-medium">Order Ref No</span>
            <span className="text-blue-600 font-semibold">{orderRef}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Payment Date</span>
            <span className="font-semibold">{paymentDate}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Payment Method</span>
            <span className="font-semibold">{method}</span>
          </div>
        </div>

        {/* Download Receipt */}
        <div>
          <button
            onClick={(e) => {
              e.preventDefault();
              // Add print/download functionality here
              window.print();
            }}
            className="text-white bg-rose-500 hover:bg-rose-600 font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
          >
            Download Receipt
          </button>
        </div>

        {/* Redirect note */}
        <p className="text-sm text-gray-500">
          You will be redirected to the booking confirmation page automatically.
        </p>
      </div>
    </div>
  );
}


// This is the main page component.
// The Layout component import has been removed to avoid resolution errors.
// You may need to replace the parent div with your actual Layout component
// and provide the correct relative path to it.
export default function PaymentSuccessPage() {
  return (
    // The Layout component has been replaced with a simple div.
    // Adjust this as needed for your project structure.
    <div>
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center bg-white text-black">
          <p className="text-lg font-semibold">Loading payment details...</p>
        </div>
      }>
        <PaymentSuccessContent />
      </Suspense>
    </div>
  );
}

