import React from 'react';
import Head from 'next/head';
import Layout from "@/components/layout/Layout";

const PrivacyPolicy = () => {
  return (
    <>
    <Layout>
      <Head>
        <title>Privacy Policy | Tours República</title>
      </Head>
      <main className="bg-white text-gray-800 font-sans">
        <section className="max-w-3xl mx-auto px-6 py-16">
          <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
          <p className="text-sm text-gray-500 mb-6">
            Effective Date: July 23, 2025 <br />
            Last Updated: July 23, 2025
          </p>
          <p className="mb-8">
            ToursRepública respects your privacy and is committed to protecting your personal information in compliance with Law No. 172-13 on the Protection of Personal Data in the Dominican Republic.
          </p>

          <div className="space-y-10">
            <section>
              <h2 className="text-xl font-semibold mb-2">1. Information We Collect</h2>
              <p>We collect personal information such as your name, email address, phone number, billing details, and travel preferences when you make a booking or use our services.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2">2. How We Use Your Information</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>Process your bookings and payments</li>
                <li>Communicate confirmations or travel changes</li>
                <li>Improve your user experience</li>
                <li>Provide 24/7 customer support</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2">3. Data Sharing</h2>
              <p>Your personal data may be shared with service providers and transportation partners only when necessary to fulfill your booking. We do not sell or rent your data.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2">4. Data Security</h2>
              <p>We implement appropriate technical and organizational safeguards to protect your information from loss, misuse, or unauthorized access.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2">6. Use of Cookies</h2>
              <p>
                Under Dominican law, you have the right to access, modify, delete, or object to the processing of your personal data at any time.
              </p>
              <p className="mt-2">
                To exercise your rights or raise a concern, contact us at: <br />
                Email: <a href="mailto:reservas@toursrepublica.com" className="text-blue-600 underline">reservas@toursrepublica.com</a><br />
                Phone: <a href="tel:+18296185692" className="text-blue-600 underline">+1 (829) 618-5692</a> (WhatsApp preferred)
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2">7. Policy Updates</h2>
              <p>We reserve the right to amend this Privacy Policy. Updates will be published on this page with the revised date.</p>
            </section>
          </div>
        </section>
      </main>
    </Layout>
    </>
  );
};

export default PrivacyPolicy;
