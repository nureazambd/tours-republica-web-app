import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import Script from 'next/script';
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { BookingProvider } from "@/context/BookingContext";
import { TourProvider } from "@/context/TourContext";
import { ModalProvider } from "@/context/ModalContext";
import { Toaster } from 'react-hot-toast'

const rubik = Rubik({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-rubik',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Tours Republica - Explore the Heart of Santo Domingo",
  description:
    "Discover unforgettable experiences in the Dominican Republic with Tours Republica. Book tours, explore destinations, and create memories that last a lifetime.",
  keywords:
    "tours, Dominican Republic, Santo Domingo, Punta Cana, travel, vacation, excursions",
  authors: [{ name: "Tours Republica" }],
  openGraph: {
    title: "Tours Republica - Explore the Heart of Santo Domingo",
    description:
      "Discover unforgettable experiences in the Dominican Republic with Tours Republica.",
    url: "https://toursrepublica.com",
    siteName: "Tours Republica",
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: "Tours Republica",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tours Republica - Explore the Heart of Santo Domingo",
    description:
      "Discover unforgettable experiences in the Dominican Republic with Tours Republica.",
    images: ["/images/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={rubik.variable}>
      <head>
        {/* Google Translate script */}
        <Script
          id="google-translate-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              function googleTranslateElementInit() {
                new google.translate.TranslateElement(
                  { pageLanguage: 'en', includedLanguages: 'en,ar,es,fr,de', autoDisplay: false },
                  'google_translate_element'
                );
              }
            `,
          }}
        />
        <Script
          src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          strategy="afterInteractive"
        />
      </head>
      {/* 👇 suppressHydrationWarning prevents extension-injected attrs from breaking hydration */}
      <body className="font-sans" suppressHydrationWarning>
        <AuthProvider>
          <BookingProvider>
            <ModalProvider>
            <TourProvider>
          {/* ✅ Header available on all pages */}
          <main className="min-h-screen">{children}</main>
          <div id="google_translate_element" style={{ display: 'none' }}></div>
          <Toaster position="top-right" reverseOrder={false} />
          </TourProvider>
          </ModalProvider>
          </BookingProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
