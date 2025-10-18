"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";

// The Layout component is simplified here to avoid path alias errors.
// In your actual app, you would import this from its real location.
function Layout({ children }: { children: React.ReactNode }) {
  return <main>{children}</main>;
}

// This component uses the hook and is wrapped in Suspense.
function SuccessContent() {
  const params = useSearchParams();
  const amount = params.get("amount");

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center text-center p-8">
      {/* Replaced Next.js Image with a standard img tag to resolve build error */}
      <img src="/images/Congratulations/Congratulations.png" alt="Success" width={350} height={350} />
      
      <h1 className="text-3xl font-bold mt-4">🎉 Congratulations!</h1>
      <p className="text-lg text-gray-700 mt-2">Your booking is confirmed!</p>

      <p className="mt-4 text-gray-600">
        Thank you for choosing <b>ToursRepublica</b>.
        {amount && (
          <>
            <br />
            Your payment of <b>${amount}</b> has been successfully processed.
          </>
        )}
      </p>

      <div className="flex gap-4 mt-8">
        <button className="border border-rose-500 text-rose-500 px-5 py-2 rounded-lg hover:bg-rose-50">
          Print Ticket
        </button>
        <button className="bg-rose-500 text-white px-5 py-2 rounded-lg hover:bg-rose-600">
          Download Ticket
        </button>
      </div>

      <p className="mt-8 text-gray-500 text-sm">
        ← <a href="/" className="text-rose-500 hover:underline">Back to Homepage</a>
      </p>
    </div>
  );
}

// The main page component now correctly uses Suspense.
export default function BookingSuccess() {
  return (
    <Layout>
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading booking details...</div>}>
        <SuccessContent />
      </Suspense>
    </Layout>
  );
}

