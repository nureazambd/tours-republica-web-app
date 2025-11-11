"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const navigation = [
    { name: "HOME", href: "/" },
    { name: "TOURS", href: "/tours" },
    { name: "LOCATIONS", href: "/locations" },
    { name: "BOOK A CAR", href: "/book-a-car" },
    { name: "ABOUT US", href: "/about" },
    { name: "CONTACT", href: "/contact" },
  ];

  return (
    <header className="bg-white border-b border-gray-100 w-full">
      <div className="max-w-[1180px] mx-auto  p-4 md:p-0  flex items-center justify-between h-[96px]">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/images/logo.png"
            alt="Tours Republica"
            width={127}
            height={72}
            className="object-contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-6">
          <nav className="flex gap-4 h-[44px]">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex flex-col items-center justify-center px-3 ${
                    isActive
                      ? "text-[#191919]"
                      : "text-gray-600 hover:text-[#191919]"
                  }`}
                >
                  <span className="font-rubik font-medium text-[13px] uppercase">
                    {item.name}
                  </span>
                  {isActive && (
                    <span className="w-full border-b-2 border-[#FAA523] mt-1"></span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Auth / User Menu */}
          <div className="flex items-center gap-4">
            {!user ? (
              <Link
                href="/login"
                className="px-[16px] py-2 bg-[#EE2552] text-white rounded-lg font-rubik text-[14px] hover:bg-[#d91f46] transition-colors"
              >
                Sign In
              </Link>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 px-[16px] py-2 bg-[#EE2552] text-white rounded-lg font-rubik"
                >
                  {user.firstName} <ChevronDown className="w-4 h-4" />
                </button>
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-md py-2 z-50">
                    <Link
                      href="/profile"
                      className="block px-[16px] py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Profile Settings
                    </Link>
                    <Link
                      href="/profile?section=booking-history"
                      className="block px-[16px] py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Booking History
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setIsUserMenuOpen(false);
                        window.location.href = "/login";
                      }}
                      className="w-full text-left px-[16px] py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" /> Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-700 p-2"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 shadow-md">
          <nav className="flex flex-col space-y-2 px-[16px] py-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium uppercase ${
                  pathname === item.href
                    ? "text-[#EE2552]"
                    : "text-gray-700 hover:text-[#EE2552]"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="border-t border-gray-200 px-[16px] py-4">
            {!user ? (
              <div className="flex flex-col space-y-2">
                <Link
                  href="/login"
                  className="text-sm text-[#EE2552] hover:underline"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="text-sm text-[#EE2552] hover:underline"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Create Account
                </Link>
              </div>
            ) : (
              <div className="flex flex-col space-y-2">
                <Link
                  href="/profile"
                  className="text-sm text-gray-700 hover:text-[#EE2552]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
                <Link
                  href="/profile?section=booking-history"
                  className="text-sm text-gray-700 hover:text-[#EE2552]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Booking History
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                  className="text-left text-sm text-red-600 hover:text-red-700"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
