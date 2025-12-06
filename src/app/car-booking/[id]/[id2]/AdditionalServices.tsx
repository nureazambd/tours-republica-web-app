"use client";
import { useState } from "react";

export default function AdditionalServices() {
  const [childSeat, setChildSeat] = useState(1);
  const [boosterSeat, setBoosterSeat] = useState(0);
  const [gps, setGps] = useState(0);

  const items = [
    {
      title: "Child seat for 9-18kg toddler",
      price: "US +15",
      value: childSeat,
      setValue: setChildSeat,
    },
    {
      title: "Booster seat for 15-30 kg child",
      price: "US +15",
      value: boosterSeat,
      setValue: setBoosterSeat,
    },
    {
      title: "GPS navigation system",
      price: "US +15",
      value: gps,
      setValue: setGps,
    },
  ];

  return (
    <div className="w-full max-w-[1180px] h-[246px] bg-[rgba(239,242,248,0.3)] shadow-sm border border-[#EFF2F8] rounded-[16px] p-8 flex flex-col gap-2">

      {/* INNER */}
      <div className="max-w-[1180px] h-[182px] flex flex-col gap-5">

        {/* TITLE */}
        <div className="flex items-center gap-4">
          <h3 className="text-[18px] font-medium text-[#1A202C]">
            Additional service
          </h3>
        </div>

        {/* LIST */}
        <div className="flex flex-col gap-4 max-w-[1180px]">

          {items.map((item, idx) => (
            <div key={idx} className="flex flex-row justify-between items-center w-full">

              {/* TITLE + PRICE */}
              <div className="flex flex-col justify-center items-start w-[200px]">
                <span className="text-[14px] text-[#1A202C]">{item.title}</span>
                <span className="text-[12px] text-[#878D97]">{item.price}</span>
              </div>

              {/* COUNTER */}
              <div className="flex flex-row items-center gap-2 w-[88px]">

                {/* MINUS */}
                <button
                  onClick={() => item.setValue(Math.max(0, item.value - 1))}
                  className="relative w-6 h-6 flex items-center justify-center rounded-full border border-[#878D97]"
                >
                  <span className="absolute w-[12px] h-[1.2px] bg-[#878D97]"></span>
                </button>

                {/* VALUE */}
                <span className="w-6 h-6 flex items-center justify-center text-[16px] text-[#1A202C]">
                  {item.value}
                </span>

                {/* PLUS */}
                <button
                  onClick={() => item.setValue(item.value + 1)}
                  className="relative w-6 h-6 flex items-center justify-center rounded-full border border-[#EE2552]"
                >
                  <span className="absolute w-[12px] h-[1.2px] bg-[#EE2552]"></span>
                  <span className="absolute h-[12px] w-[1.2px] bg-[#EE2552]"></span>
                </button>

              </div>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}
