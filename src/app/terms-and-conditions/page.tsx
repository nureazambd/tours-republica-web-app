import React from 'react';
import Head from 'next/head';
import Layout from "@/components/layout/Layout";

const TermsAndConditions = () => {
  return (
    <>
    <Layout>
      <Head>
        <title>Terms & Conditions | Tours República</title>
      </Head>
      <main className="bg-white text-gray-800 font-sans">
        <section className="max-w-3xl mx-auto px-6 py-16">
          <h1 className="text-4xl font-bold mb-2">Terms & Conditions</h1>
          <p className="text-sm text-gray-500 mb-6">
            Effective Date: July 23, 2025 <br />
            Last Updated: July 23, 2025
          </p>
          <p className="mb-8">
            By using ToursRepublica.com or booking our services, you agree to the following terms in accordance with Dominican Republic law.
          </p>

          <div className="space-y-10">
            <section>
              <h2 className="text-xl font-semibold mb-2">1. Bookings & Payments</h2>
              <p>
                All bookings are subject to availability. Payments must be made in full or as specified during checkout. Accepted methods include credit cards, bank transfers, and PayPal.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2">2. Modifications & Cancellations</h2>
              <p>
                Any changes must be requested at least 24 hours prior to the scheduled tour. Cancellations are subject to our{' '}
                <a href="/cancellations-policy" className="text-red-600 underline">Cancellation Policy</a>.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2">3. Traveler Responsibility</h2>
              <p>
                You are solely responsible for ensuring that all travel documents (passports, visas) are valid and up to date.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2">4. Limitation of Liability</h2>
              <p>
                ToursRepublica is not liable for losses, delays, or cancellations due to third-party service providers, weather, or other force majeure events.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2">5. Intellectual Property</h2>
              <p>
                All content on this website is owned or licensed by ToursRepublica. Unauthorized use is strictly prohibited.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2">6. Jurisdiction</h2>
              <p>
                These Terms are governed by the laws of the Dominican Republic. Legal disputes will be handled in the courts of Santo Domingo.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2">7. Contact</h2>
              <p>
                For questions or support, contact our 24/7 team:
              </p>
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

export default TermsAndConditions;
