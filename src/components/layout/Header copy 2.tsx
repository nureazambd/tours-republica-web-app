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
    <header className="bg-white border-b border-gray-100 flex flex-col items-start px-[130px] py-[12px] gap-[8px] w-full max-w-[1440px] mx-auto h-[96px]">
      <div className="flex flex-row justify-between items-center w-[1180px] h-[72px] mx-auto gap-[408px]">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/images/logo.png"
            alt="Tours Republica"
            width={127}
            height={72}
            className="object-contain w-[127px] h-[72px]"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-[24px]">
          {/* Menu List */}
          <nav className="flex flex-row items-center gap-0 h-[44px]">
            {navigation.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex flex-col items-center justify-start px-4 ${
                    isActive
                      ? "text-[#191919]"
                      : "text-[#4B5563] hover:text-[#191919]"
                  }`}
                >
                  <span className="font-rubik font-medium text-[13px] leading-[20px] uppercase flex items-center h-[20px] whitespace-nowrap">
  {item.name}
</span>


                  {/* Active underline */}
                  {isActive && (
                    <span className="w-[38px] border-b-[2px] border-[#FAA523] mt-[2px]"></span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Auth Buttons */}
          <div className="flex flex-row items-center gap-[16px]">
            {!user ? (
              <>
                <Link
  href="/login"
  className="flex flex-row items-center justify-center px-[24px] py-[12px] gap-[16px] w-[100px] h-[44px] bg-[#EE2552] border border-[#EE2552] rounded-[12px] box-border text-white font-rubik font-normal text-[14px] leading-[20px] text-center hover:bg-[#d91f46] transition-colors"
>
  Sign in
</Link>

                {/* <Link
                  href="/signup"
                  className="hidden lg:flex items-center justify-center px-[24px] py-[12px] border border-[#EE2552] rounded-[12px] text-[#EE2552] text-[14px] font-rubik font-normal w-[103px] h-[44px]"
                >
                  Sign up
                </Link> */}
              </>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 px-[24px] py-[12px] bg-[#EE2552] text-white text-[14px] font-rubik rounded-[12px] border border-[#EE2552]"
                >
                  {user.firstName}
                  <ChevronDown className="w-4 h-4" />
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-md py-2 z-50">
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Profile Settings
                    </Link>
                    <Link
                      href="/profile?section=booking-history"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
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
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center gap-2"
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
        <div className="lg:hidden bg-white border-t border-gray-200 shadow-sm">
          <nav className="flex flex-col space-y-2 px-4 py-4">
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

          <div className="border-t border-gray-200 px-4 py-4">
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
