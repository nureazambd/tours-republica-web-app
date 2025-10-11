import React from 'react';
import Head from 'next/head';
import Layout from "@/components/layout/Layout";
const CancellationsPolicy = () => {
  return (
    <>
    <Layout>
      <Head>
        <title>Cancellation Policy | Tours República</title>
      </Head>
      <main className="bg-white text-gray-800 font-sans">
        <section className="max-w-3xl mx-auto px-6 py-16">
          <h1 className="text-4xl font-bold mb-2">Cancellation Policy</h1>
          <p className="text-sm text-gray-500 mb-6">
            Effective Date: July 23, 2025 <br />
            Last Updated: July 23, 2025
          </p>
          <p className="mb-8">
            We understand that travel plans may change. Our cancellation policy ensures fairness while protecting operational needs.
          </p>

          <div className="space-y-10">
            <section>
              <h2 className="text-xl font-semibold mb-2">1. Customer Cancellations</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>48+ hours before tour: Full refund (minus processing fees)</li>
                <li>24–48 hours before tour: 50% refund</li>
                <li>Less than 24 hours or no-show: No refund</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2">2. Emergency Exceptions (Medical or Flight Cancellations)</h2>
              <p>We allow last-minute cancellations for emergencies under the following conditions:</p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li>
                  <strong>Medical Emergency:</strong> A valid medical certificate from a licensed healthcare provider must be submitted.
                </li>
                <li>
                  <strong>Flight Cancellation or Delay:</strong> Proof of flight cancellation or delay from the airline is required.
                </li>
              </ul>
              <p className="mt-2">
                All emergency claims must be sent promptly to our customer support email with the relevant documentation.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2">3. Booking Modifications</h2>
              <p>
                Modifications are permitted up to 24 hours before departure and subject to availability. Change fees may apply.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2">4. Cancellations by ToursRepublica</h2>
              <p>
                If a tour is cancelled due to weather, safety concerns, or minimum participant requirements, you’ll receive a full refund or be offered an alternative.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2">5. Refund Process</h2>
              <p>
                Refunds will be processed within 7–10 business days to your original payment method.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2">6. Contact for Changes or Cancellations</h2>
              <p>Reach us anytime to modify or cancel:</p>
              <p className="mt-2">
                Email: <a href="mailto:reservas@toursrepublica.com" className="text-blue-600 underline">reservas@toursrepublica.com</a><br />
                Phone: <a href="tel:+18296185692" className="text-blue-600 underline">+1 (829) 618-5692</a> (WhatsApp preferred)
              </p>
            </section>
          </div>
        </section>
      </main>
    </Layout>
    </>
  );
};

export default CancellationsPolicy;
