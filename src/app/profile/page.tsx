"use client";

import { useState } from "react";
import Layout from "@/components/layout/Layout";
import ProfileSettings from "@/components/profile/ProfileSettings";
import BookingHistory from "@/components/profile/BookingHistory";
import {
  User,
  Settings,
  Calendar,
  Heart,
  CreditCard,
  Bell,
  LogOut,
} from "lucide-react";

export default function ProfilePage() {
  // === Active section state ===
  const [activeSection, setActiveSection] = useState("Account Settings");

  // === Handle Logout ===
  const handleLogout = () => {
    localStorage.removeItem("authToken"); // or however you store your user token
    localStorage.removeItem("user");
    window.location.href = "/login"; // redirect to login page
  };

  // === Navigation items ===
  const menuItems = [
    { icon: Settings, label: "Account Settings" },
    { icon: Calendar, label: "Booking History" },
    { icon: Heart, label: "Notifications" },
    { icon: CreditCard, label: "Language" },
    { icon: Bell, label: "Currency" },
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
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Notifications
            </h2>
            <p className="text-gray-600">
              You have no new notifications at this time.
            </p>
          </div>
        );
      case "Language":
        return (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Language</h2>
            <select className="border border-gray-300 rounded-lg p-3">
              <option>English (Default)</option>
              <option>Spanish</option>
              <option>French</option>
              <option>German</option>
            </select>
          </div>
        );
      case "Currency":
        return (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Currency</h2>
            <select className="border border-gray-300 rounded-lg p-3">
              <option>USD ($)</option>
              <option>EUR (€)</option>
              <option>BDT (৳)</option>
              <option>GBP (£)</option>
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
                    <h3 className="text-xl font-bold text-gray-800">
                      John Doe
                    </h3>
                    <p className="text-gray-600">john.doe@example.com</p>
                    <div className="mt-3 inline-flex items-center px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                      ✓ Verified Account
                    </div>
                  </div>

                  {/* Sidebar Nav */}
                  <nav className="space-y-2">
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
                          <span className="font-medium">{item.label}</span>
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
