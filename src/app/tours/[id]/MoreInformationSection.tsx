"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import FAQSection from "./FAQSection";

export default function MoreInformationSection() {
  const [open, setOpen] = useState(true);

  return (
    <section className="flex flex-col">
      {/* Header */}
      <div
        className="flex justify-between items-center bg-[#003459] rounded-[12px] px-8 py-3 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <h2 className="text-white text-[28px] font-[500] leading-[40px] font-[Rubik]">
          More Information
        </h2>
        <div className="w-6 h-6 flex justify-center items-center transform transition-transform duration-300"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        >
          <ChevronDown className="w-6 h-6 text-white" />
        </div>
      </div>

      {/* Content */}
      {open && (
        <div className="flex flex-col px-8 py-12 gap-12">
          {/* Important Information */}
          <div className="flex flex-col gap-5 w-full">
            <h3 className="text-[#191919] text-[20px] font-[500] leading-[20px]">
              Important Information
            </h3>

            <div className="flex flex-col gap-5">
              {[
                {
                  icon: "/images/tours-id/When-to-Book.png",
                  title: "When to Book",
                  desc: "Reservations accepted up to 24 hours before the activity",
                },
                {
                  icon: "/images/tours-id/Accessibility.png",
                  title: "Accessibility",
                  desc: "Wheelchair accessible with accompanying person",
                },
                {
                  icon: "/images/tours-id/Sustainability.png",
                  title: "Sustainability",
                  desc: "Eco-friendly and responsible tourism guidelines",
                },
                {
                  icon: "/images/tours-id/Provider.png",
                  title: "Provider",
                  desc: "Tours Republica | Local Certified Guides",
                },
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col gap-1">
                  <div className="flex items-center gap-3">
                    <Image
                      src={item.icon}
                      width={20}
                      height={20}
                      alt={item.title}
                      className="w-5 h-5"
                    />
                    <span className="text-[#191919] text-[16px] font-[400] leading-[24px]">
                      {item.title}
                    </span>
                  </div>
                  <p className="text-[#878D97] text-[14px] leading-[20px] pl-8">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-[#BECCE880]" />

          {/* Cancellation Policy */}
          <div className="flex flex-col gap-4">
            <h3 className="text-[#191919] text-[20px] font-[500] leading-[20px]">
              Cancellation Policy
            </h3>

            <ul className="flex flex-col gap-3">
              {[
                "Free cancellation up to 24 hours before tour starts",
                "For last-minute cancellations, proof of emergency required",
                "Free last-minute cancellation in case of medical emergency or flight disruption (proof required)",
              ].map((text, i) => (
                <li key={i} className="flex items-center gap-2">
                  <Image
                    src="/images/tours-id/ok-icon.png"
                    width={16}
                    height={16}
                    alt="ok"
                    className="w-4 h-4"
                  />
                  <span className="text-[#878D97] text-[14px] leading-[16px]">
                    {text}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <FAQSection/>


        </div>
      )}
    </section>
  );
}
