import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import Header from "@/components/layout/Header";

const inter = Inter({ subsets: ["latin"] });

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
    <html lang="en">
      {/* 👇 suppressHydrationWarning prevents extension-injected attrs from breaking hydration */}
      <body className={inter.className} suppressHydrationWarning>
        <AuthProvider>
          {/* ✅ Header available on all pages */}
          <main className="min-h-screen">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
