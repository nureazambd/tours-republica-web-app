"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown, ChevronUp } from "lucide-react";

const activities = [
  {
    title: "Zip lining",
    content1:
      "Glide above it all. Feel the wind in your face as you speed across treetops, valleys, and rivers, suspended high in the air. Soar like a bird and see the world from a breathtaking new perspective.",
    content2:
      "Expert staff and clear safety instructions. Strong, secure cables and harness systems. Exciting lines of varying heights and lengths. Incredible views of forests, mountains, and skies.",
    image: "/images/about/activities.png",
    icon: "/images/about/activitiesIcon.png",
  },
  {
    title: "Bungee Jumping",
    content1:
      "Experience the ultimate adrenaline rush as you leap from great heights with only a bungee cord to catch you.",
    content2:
      "Professionally maintained gear, breathtaking drop points, and certified instructors to ensure your safety.",
    image: "/images/about/BungeeJumping.png",
    icon: "/images/about/activitiesIcon.png",
  },
  {
    title: "Rafting",
    content1:
      "Ride the rapids and embrace the thrill of conquering rushing waters with your team.",
    content2:
      "High-quality safety gear, expert guides, and scenic river routes for every skill level.",
    image: "/images/about/Rafting.png",
    icon: "/images/about/activitiesIcon.png",
  },
];

export default function ActivitiesSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const handleAccordionClick = (i: number) => {
    setOpenIndex(i === openIndex ? -1 : i);
  };

  const handleCheckAvailability = (activity: any) => {
    alert(`Check availability for ${activity.title}`);
    // Here you can open a modal, redirect, or show more info for that activity
  };

  const selectedActivity = activities[openIndex] || activities[0];

  return (
    <section className="flex flex-col items-start px-[130px] py-[104px] gap-[120px] bg-[#EFF2F8]/50">
      <div className="flex flex-col md:flex-row items-start gap-[120px] w-full max-w-[1180px] mx-auto">
        {/* Left Column (Accordion) */}
        <div className="flex flex-col items-start gap-[40px] w-full md:w-[580px]">
          {/* Heading */}
          <div className="flex flex-col justify-center items-start gap-[8px]">
            <p className="text-[#6FCCDC] font-rubik font-medium text-[18px] leading-[24px]">
              What We Do
            </p>
            <h2 className="text-[#0A0322] font-rubik font-medium text-[48px] leading-[56px] tracking-[-0.5px] capitalize">
              Our Particular Activities
            </h2>
          </div>

          {/* Accordion Section */}
          <div className="flex flex-col items-start gap-[24px] w-full">
            {activities.map((activity, i) => (
              <div key={i} className="w-full">
                {/* Accordion Header */}
                <button
                  onClick={() => handleAccordionClick(i)}
                  className="flex items-center justify-between w-full gap-[16px] pb-[12px]"
                >
                  <span className="text-[#0A0322] text-[20px] font-rubik font-medium leading-[28px]">
                    {activity.title}
                  </span>
                  {i === openIndex ? (
                    <ChevronUp className="w-[24px] h-[24px] text-[#EE2552]" />
                  ) : (
                    <ChevronDown className="w-[24px] h-[24px] text-[#EE2552]" />
                  )}
                </button>

                {/* Accordion Body */}
                {i === openIndex && (
                  <div className="flex flex-col gap-[24px] pl-[12px] mt-[12px]">
                    <p className="text-[#4B5563] text-[14px] leading-[22px] font-rubik">
                      {activity.content1}
                    </p>
                    <p className="text-[#4B5563] text-[14px] leading-[22px] font-rubik">
                      {activity.content2}
                    </p>
                    {/* Button */}
                    <div className="flex items-center gap-[24px] mt-[12px]">
                      <button
                        onClick={() => handleCheckAvailability(activity)}
                        className="border border-[#E9305B] text-[#EE2552] text-[14px] font-rubik rounded-[12px] py-[14px] px-[24px] flex items-center justify-center gap-[8px] hover:bg-[#EE2552]/10 transition"
                      >
                        Check Availability
                      </button>
                    </div>
                  </div>
                )}

                {/* Divider */}
                <div className="w-full h-[0.5px] opacity-20 border border-[#BECCE8] mt-[24px]" />
              </div>
            ))}
          </div>
        </div>

        {/* Right Column (Image) */}
        <div className="relative flex flex-col items-end isolate w-full md:w-[480px] h-[520px]">
          {/* Background Image */}
          <div className="relative w-full h-full rounded-[64px] overflow-hidden">
            <div className="absolute inset-0 from-transparent to-[rgba(0,52,89,0.5)] z-10 rounded-[64px]" />
            <Image
              src={selectedActivity.image}
              alt={selectedActivity.title}
              fill
              className="object-cover rounded-[64px]"
            />
          </div>

          {/* Floating Play Card */}
          <div
            className="absolute left-[-56px] top-[376px] w-[200px] h-[200px] overflow-hidden isolate flex items-center justify-center z-10"
            style={{
              backgroundImage: `url('${selectedActivity.icon}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="flex items-center justify-center w-[64px] h-[64px] rounded-full absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <svg
                width="64"
                height="64"
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16 15.3267C16 12.162 19.501 10.2506 22.163 11.9619L48.0993 28.6353C50.5486 30.2098 50.5486 33.7902 48.0993 35.3647L22.163 52.0381C19.501 53.7494 16 51.838 16 48.6733V15.3267Z"
                  stroke="white"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
