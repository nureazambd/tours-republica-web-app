"use client";

import { useEffect, useState, Suspense } from "react";
import Layout from "@/components/layout/Layout";
import ProfileSettings from "@/components/profile/ProfileSettings";
import BookingHistory from "@/components/profile/BookingHistory";
import NotificationSettings from "@/components/profile/NotificationSettings";
import LanguageSelector from "@/components/profile/LanguageSelector";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { User, LogOut } from "lucide-react";

// ✅ Disable static prerendering (so it's built dynamically)
export const dynamic = "force-dynamic";

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  verified?: boolean;
}

/**
 * Wrapper component to use useSearchParams() safely inside Suspense.
 */
function ProfilePageContent() {
  const [activeSection, setActiveSection] = useState("Account Settings");
  const [user, setUser] = useState<UserData | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUser({
            firstName: parsedUser.firstName || "User",
            lastName: parsedUser.lastName || "Name",
            email: parsedUser.email || "No email",
            verified: true,
          });
        } catch (error) {
          console.error("Error parsing user data:", error);
        }
      }

      const section = searchParams.get("section");
      if (section === "booking-history") {
        setActiveSection("Booking History");
      } else if (section === "notifications") {
        setActiveSection("Notifications");
      } else if (section === "language") {
        setActiveSection("Language");
      }
    }
  }, [searchParams]);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
  };

  const menuItems = [
    {
      icon: <Image src="/icons/profile-menu/view-profile2.png" width={24} height={24} alt="profile" />,
      label: "Account Settings",
      title: "View & Edit profile",
    },
    {
      icon: <Image src="/icons/profile-menu/booking-history.png" width={24} height={24} alt="history" />,
      label: "Booking History",
      title: "Booking History",
    },
    {
      icon: <Image src="/icons/profile-menu/notification.png" width={24} height={24} alt="notification" />,
      label: "Notifications",
      title: "Notifications",
    },
    {
      icon: <Image src="/icons/profile-menu/language.png" width={24} height={24} alt="language" />,
      label: "Language",
      title: "Language",
    },
    {
      icon: <Image src="/icons/profile-menu/currency.png" width={24} height={24} alt="currency" />,
      label: "Currency",
      title: "Currency",
    },
  ];

  const renderSection = () => {
    switch (activeSection) {
      case "Account Settings":
        return <ProfileSettings />;
      case "Booking History":
        return <BookingHistory />;
      case "Notifications":
        return (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <NotificationSettings />
          </div>
        );
      case "Language":
        return (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <LanguageSelector />
          </div>
        );
      case "Currency":
        return (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Currency</h2>
            <select className="border border-gray-300 rounded-lg p-3">
              <option>USD (Dollar)</option>
              <option>EUR (Euro)</option>
              <option>GBP (Pound)</option>
              <option>SAR (Riyal)</option>
              <option>AED (Dirham)</option>
              <option>INR (Rupee)</option>
            </select>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* === HEADER === */}
        <section className="bg-gradient-to-r from-secondary-800 to-secondary-700 text-white py-12">
          <div className="container-custom">
            <div className="flex items-center space-x-4">
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full">
                <User className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">My Profile</h1>
                <p className="text-white/90">
                  Manage your account and view your booking history
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* === MAIN CONTENT === */}
        <section className="py-12">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* === SIDEBAR === */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                  <div className="text-center mb-6">
                    <div className="bg-gradient-to-br from-primary-500 to-secondary-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <User className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">
                      {user ? `${user.firstName} ${user.lastName}` : "Guest User"}
                    </h3>
                    <p className="text-gray-600">{user?.email || "No email available"}</p>
                  </div>

                  <nav className="space-y-2">
                    {menuItems.map((item, index) => {
                      const active = activeSection === item.label;
                      return (
                        <button
                          key={index}
                          onClick={() => setActiveSection(item.label)}
                          className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors duration-200 ${
                            active
                              ? "bg-[#EE2552] text-white border border-primary-200"
                              : "text-gray-600 hover:bg-gray-50"
                          }`}
                        >
                          <span className="w-5 h-5 flex items-center justify-center">{item.icon}</span>
                          <span className="font-medium">{item.title}</span>
                        </button>
                      );
                    })}
                  </nav>

                  <div className="mt-8 pt-6 border-t">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center justify-center gap-2 text-red-600 hover:text-red-700 font-medium py-2 transition-colors duration-200"
                    >
                      <LogOut className="w-5 h-5" />
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>

              {/* === MAIN SECTION === */}
              <div className="lg:col-span-3 space-y-8">{renderSection()}</div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}

/**
 * ✅ Page Component wrapped in Suspense for safe useSearchParams()
 */
export default function ProfilePage() {
  return (
    <Suspense fallback={<div className="p-10 text-center text-gray-500">Loading profile...</div>}>
      <ProfilePageContent />
    </Suspense>
  );
}
