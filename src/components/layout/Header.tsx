"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
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
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/images/logo.png"
              alt="Tours Republica"
              width={160}
              height={40}
              className="h-8 lg:h-10 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-primary-500 font-medium text-sm transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Auth */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="btn-primary flex items-center space-x-2"
              >
                <span>{user ? user.firstName : "Sign In"}</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  {!user ? (
                    <>
                      <Link
                        href="/login"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Sign In
                      </Link>
                      <Link
                        href="/signup"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Create Account
                      </Link>
                    </>
                  ) : (
                    // <>
                    //   <Link
                    //     href="/profile"
                    //     className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    //     onClick={() => setIsUserMenuOpen(false)}
                    //   >
                    //     Profile
                    //   </Link>
                    //   <Link
                    //     href="/profile/bookings"
                    //     className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    //     onClick={() => setIsUserMenuOpen(false)}
                    //   >
                    //     Booking History
                    //   </Link>
                    //   <button
                    //     onClick={() => {
                    //       logout();
                    //       setIsUserMenuOpen(false);
                    //     }}
                    //     className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center gap-2"
                    //   >
                    //     <LogOut className="w-4 h-4" /> Logout
                    //   </button>
                    // </>

                    <>
                      <Link
                        href="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2" // <-- Add flex classes
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        {/* <User className="w-4 h-4" /> <-- Add User icon */}
                        <Image
                          src="/images/header/profile-settings.png"
                          alt="profie settings"
                          width={50}
                          height={50}
                          className="w-4 h-4"
                        />
                        Profile Settings
                      </Link>
                      <Link
                        href="/profile/bookings"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2" // <-- Add flex classes
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        {/* <ScrollText className="w-4 h-4" /> <-- Add Booking icon */}
                        <Image
                          src="/images/header/booking-history.svg"
                          alt="profie settings"
                          width={50}
                          height={50}
                          className="w-4 h-4"
                        />
                        Booking History
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center gap-2"
                      >
                        <Image
                          src="/images/header/logout.png"
                          alt="profie settings"
                          width={50}
                          height={50}
                          className="w-4 h-4"
                        />
                        Logout
                      </button>
                    </>

                  )}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-primary-500 p-2"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* ✅ Mobile Menu Content */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 shadow-sm">
          <nav className="flex flex-col space-y-2 px-4 py-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-primary-500 font-medium text-sm"
                onClick={() => setIsMenuOpen(false)} // Close menu on click
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="border-t border-gray-200 px-4 py-4">
            {!user ? (
              <div className="flex flex-col space-y-2">
                <Link
                  href="/login"
                  className="text-sm text-gray-700 hover:text-primary-500"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="text-sm text-gray-700 hover:text-primary-500"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Create Account
                </Link>
              </div>
            ) : (
              <div className="flex flex-col space-y-2">
                <Link
                  href="/profile"
                  className="text-sm text-gray-700 hover:text-primary-500"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
                <Link
                  href="/profile/bookings"
                  className="text-sm text-gray-700 hover:text-primary-500"
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
