// This is a Server Component (No "use client" directive!)

import { Suspense } from 'react';
import Layout from "@/components/layout/Layout";
import ToursClientContent from "./ToursClientContent"; // Import the client logic

export default function ToursPage() {
  return (
    <Layout>
      {/* CRUCIAL FIX: The Suspense boundary allows Next.js to skip 
         prerendering of the client component below, resolving the 
         'useSearchParams()' error during the build. */}
      <Suspense fallback={<div>Loading Tours and Filters...</div>}>
        <ToursClientContent />
      </Suspense>
    </Layout>
  );
}