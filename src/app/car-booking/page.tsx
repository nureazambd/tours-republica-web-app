import React, { Suspense } from "react"; // Import Suspense
import Layout from "@/components/layout/Layout";
import CarBookingContent from "./CarBookingContent"; // Import the new client component

// Define a minimal component for the fallback state
function LoadingFallback() {
  return (
    <div className="container-custom py-12">
      <div className="mt-6 p-6">Loading content...</div>
    </div>
  );
}

// NOTE: This file is now a Server Component (no "use client" directive)
export default function CarBookingPage() {
  return (
    <Layout>
      {/* 🟢 THE FIX: Wrap the client component in Suspense. */}
      {/* This tells the Next.js prerenderer to skip rendering the client hook 
          until the browser takes over, resolving the build error. */}
      <Suspense fallback={<LoadingFallback />}>
        <CarBookingContent />
      </Suspense>
    </Layout>
  );
}