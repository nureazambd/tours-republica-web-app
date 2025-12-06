"use client";

import { useModal } from "@/context/ModalContext";
import { X, ArrowRight } from "lucide-react";

export default function ManageBookingModal() {
  const {
    isManageBookingOpen,
    closeManageBooking,
    openSuccess,
  } = useModal();

  if (!isManageBookingOpen) return null;

  const handleContinue = () => {
    closeManageBooking(); // close current modal
    openSuccess();        // open success modal
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white rounded-3xl w-[576px] p-8 flex flex-col gap-8 animate-fadeIn">

        {/* Header */}
        <div className="w-full flex justify-between items-center">
          <h2 className="text-[24px] font-medium text-[#1A202C]">Manage Booking</h2>
          <button
            onClick={closeManageBooking}
            className="w-6 h-6 flex items-center justify-center rounded-full border border-[#1A202C]"
          >
            <X className="w-4 h-4 text-[#1A202C]" />
          </button>
        </div>

        {/* Description */}
        <p className="text-[#878D97] text-[14px] leading-[20px]">
          To view, print, amend, and cancel your reservation, please fill the following fields:
        </p>

        {/* Inputs */}
        <div className="flex flex-col gap-6 w-full">

          <div className="flex flex-col gap-2">
            <label className="text-[16px] text-[#191919]">Given name</label>
            <input
              type="text"
              placeholder="Your given name"
              className="border border-[#D9D4D4CC] rounded px-5 py-3 text-[14px] w-full"
            />
          </div>

          {/* Continue Button */}
          <button
            onClick={handleContinue}
            className="bg-[#EE2552] text-white rounded-2xl py-4 flex items-center justify-center gap-4"
          >
            <span className="text-[16px]">Continue</span>
            <ArrowRight className="w-5 h-5" />
          </button>

        </div>

      </div>
    </div>
  );
}
