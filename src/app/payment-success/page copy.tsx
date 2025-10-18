"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle } from "lucide-react";
import Layout from '@/components/layout/Layout';

export default function PaymentSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Dynamic data (can be passed via query params or fetched)
  const amount = searchParams.get("amount") || "305.00";
  const orderRef = searchParams.get("orderRef") || "OIU6580MN";
  const paymentDate =
    searchParams.get("date") ||
    new Date().toLocaleString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  const method = searchParams.get("method") || "Credit Card";

  // ✅ Redirect to booking confirmation after delay
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/booking-confirmation"); // change to your actual route
    }, 5000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <Layout>
    <div className="min-h-screen flex items-center justify-center bg-white text-black px-4">
      <div className="max-w-lg text-center space-y-8">
        {/* Success Icon */}
        <div className="flex justify-center">
          <div className="bg-yellow-500 rounded-full p-5">
            <CheckCircle className="w-14 h-14 text-white" />
          </div>
        </div>

        {/* Payment Info */}
        <div>
          <h1 className="text-3xl font-bold mb-2">
            US$ <span className="text-yellow-400">{amount}</span>
          </h1>
          <h2 className="text-xl font-semibold mb-1">Thank you for your Payment!</h2>
          <p className="text-gray-400">
            Your transaction has been successfully processed
          </p>
        </div>

        {/* Details */}
        <div className="border-t border-gray-700 pt-6 text-left space-y-3 text-gray-300">
          <div className="flex justify-between">
            <span>Order Ref No</span>
            <span className="text-blue-400">{orderRef}</span>
          </div>
          <div className="flex justify-between">
            <span>Payment Date</span>
            <span>{paymentDate}</span>
          </div>
          <div className="flex justify-between">
            <span>Payment Method</span>
            <span>{method}</span>
          </div>
        </div>

        {/* Download Receipt */}
        <div>
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="text-rose-500 hover:underline font-semibold"
          >
            Download Receipt
          </a>
        </div>

        {/* Redirect note */}
        <p className="text-sm text-gray-500">
          You will be redirected to the booking confirmation page automatically
        </p>
      </div>
    </div>
    </Layout>
  );
}
