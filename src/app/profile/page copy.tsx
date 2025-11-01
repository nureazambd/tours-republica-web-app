"use client";

import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import ProfileSettings from "@/components/profile/ProfileSettings";
import BookingHistory from "@/components/profile/BookingHistory";
import Image from 'next/image'
import { useSearchParams } from "next/navigation";

import {
  User,
  Settings,
  Calendar,
  Heart,
  CreditCard,
  Bell,
  LogOut,
} from "lucide-react";
import NotificationSettings from "@/components/profile/NotificationSettings";
import LanguageSelector from "@/components/profile/LanguageSelector";

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  verified?: boolean;
}

export default function ProfilePage() {
  // === States ===
  const [activeSection, setActiveSection] = useState("Account Settings");
  const [user, setUser] = useState<UserData | null>(null);

  const searchParams = useSearchParams();


  // === Fetch user info from localStorage (after login) ===
  // useEffect(() => {
  //   const storedUser = localStorage.getItem("user");
  //   if (storedUser) {
  //     try {
  //       const parsedUser = JSON.parse(storedUser);
  //       setUser({
  //         firstName: parsedUser.firstName || "User Name",
  //         lastName: parsedUser.lastName || "User Name",
  //         email: parsedUser.email || "No email",
  //         verified: true,
  //       });
  //     } catch (error) {
  //       console.error("Error parsing user data:", error);
  //     }
  //   }
  // }, []);

  useEffect(() => {
  // Load user info
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    try {
      const parsedUser = JSON.parse(storedUser);
      setUser({
        firstName: parsedUser.firstName || "User Name",
        lastName: parsedUser.lastName || "User Name",
        email: parsedUser.email || "No email",
        verified: true,
      });
    } catch (error) {
      console.error("Error parsing user data:", error);
    }
  }

  // ✅ Handle section from URL
  const section = searchParams.get("section");
  if (section === "booking-history") {
    setActiveSection("Booking History");
  } else if (section === "notifications") {
    setActiveSection("Notifications");
  } else if (section === "language") {
    setActiveSection("Language");
  }
}, [searchParams]);


  // === Handle Logout ===
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  // === Navigation items ===
  const menuItems = [
    { icon: <Image src="/icons/profile-menu/view-profile2.png" width={100} height={100} alt="" />, label: "Account Settings", title: "View & Edit profile" },
    { icon: <Image src="/icons/profile-menu/booking-history.png" width={50} height={50} alt="" />, label: "Booking History", title: "Booking History" },
    { icon: <Image src="/icons/profile-menu/notification.png" width={50} height={50} alt="" />, label: "Notifications", title: "Notification" },
    { icon: <Image src="/icons/profile-menu/language.png" width={50} height={50} alt="" />, label: "Language", title: "Language" },
    { icon: <Image src="/icons/profile-menu/currency.png" width={50} height={50} alt="" />, label: "Currency", title: "Currency" },
  ];

  // === Section Rendering ===
  const renderSection = () => {
    switch (activeSection) {
      case "Account Settings":
        return <ProfileSettings />;
      case "Booking History":
        return <BookingHistory />;
      case "Notifications":
        return (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            {/* <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Notifications
            </h2>
            <p className="text-gray-600">
              You have no new notifications at this time.
            </p> */}
            <NotificationSettings/>
          </div>
        );
      case "Language":
        return (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            {/* <h2 className="text-2xl font-bold text-gray-800 mb-4">Language</h2>
            <select className="border border-gray-300 rounded-lg p-3">
              <option>English (Default)</option>
              <option>Arabic</option>
              
            </select> */}
            <LanguageSelector/>
          </div>
        );
      case "Currency":
        return (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Currency</h2>
            <select className="border border-gray-300 rounded-lg p-3">
              {/* <option>USD ($)</option>
              <option>EUR (€)</option>
              <option>GBP (£)</option> */}
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
                  {/* User Info */}
                  <div className="text-center mb-6">
                    <div className="bg-gradient-to-br from-primary-500 to-secondary-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <User className="w-10 h-10 text-white" />
                    </div>

                    {/* Dynamic User Data */}
                    <h3 className="text-xl font-bold text-gray-800">
                      {user?.firstName +' '+ user?.lastName || "Guest User"}
                    </h3>
                    <p className="text-gray-600">
                      {user?.email || "No email available"}
                    </p>

                    {/* {user?.verified && (
                      <div className="mt-3 inline-flex items-center px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                        ✓ Verified Account
                      </div>
                    )} */}
                  </div>

                  {/* Sidebar Nav */}
                  {/* <nav className="space-y-2">
                    {menuItems.map((item, index) => {
                      const Icon = item.icon;
                      const active = activeSection === item.label;
                      return (
                        <button
                          key={index}
                          onClick={() => setActiveSection(item.label)}
                          className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors duration-200 ${
                            active
                              ? "bg-primary-50 text-primary-600 border border-primary-200"
                              : "text-gray-600 hover:bg-gray-50"
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                          <span className="font-medium">{item.title}</span>
                        </button>
                      );
                    })}
                  </nav> */}
                  <nav className="space-y-2">
  {menuItems.map((item, index) => {
    // ❌ REMOVE THIS: const Icon = item.icon; // This is the core issue
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
        {/* ✅ FIX: Render the element (item.icon) directly. */}
        {/* Apply styling to the surrounding element/container if needed,
            but not to the element itself unless you can pass props to it. */}
        <span className="w-5 h-5 flex items-center justify-center">
            {item.icon}
        </span>
        <span className="font-medium">{item.title}</span>
      </button>
    );
  })}
</nav>

                  {/* Logout */}
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

              {/* === DYNAMIC MAIN SECTION === */}
              <div className="lg:col-span-3 space-y-8">{renderSection()}</div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
