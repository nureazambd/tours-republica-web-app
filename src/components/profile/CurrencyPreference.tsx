"use client";
import { useState } from "react";

const currencies = [
  {
    code: "USD",
    name: "Dollar",
    flag: "/flags/us.svg",
  },
  {
    code: "EUR",
    name: "Euro",
    flag: "/flags/eu.svg",
  },
  {
    code: "GBP",
    name: "Pound",
    flag: "/flags/uk.svg",
  },
  {
    code: "SAR",
    name: "Riyal",
    flag: "/flags/sa.svg",
  },
  {
    code: "AED",
    name: "Dirham",
    flag: "/flags/ae.svg",
  },
];

export default function CurrencyPreference() {
  const [selected, setSelected] = useState("USD");

  return (
    <div className="w-full max-w-[876px] bg-[#EFF2F8]/50 rounded-xl shadow-sm p-8 flex flex-col gap-14">
      {/* Top Section */}
      <div className="flex justify-between items-center w-full">
        <h2 className="text-[24px] font-medium text-[#191919]">
          Currency Preference
        </h2>
      </div>

      {/* Currency List */}
      <div className="flex flex-col gap-8">
        {currencies.map((item) => (
          <label
            key={item.code}
            className="flex items-center gap-4 cursor-pointer"
          >
            {/* Radio */}
            <input
              type="radio"
              name="currency"
              value={item.code}
              checked={selected === item.code}
              onChange={() => setSelected(item.code)}
              className="h-5 w-5 accent-[#FAA523]"
            />

            {/* Flag + Text */}
            <div className="flex items-center gap-3">
              <img
                src={item.flag}
                alt={item.code}
                className="w-5 h-5 rounded-sm"
              />

              <div className="flex items-end gap-2">
                <span
                  className={`text-[18px] font-medium ${
                    selected === item.code
                      ? "text-[#191919]"
                      : "text-[#747D8F]"
                  }`}
                >
                  {item.code}
                </span>

                <span className="text-[14px] text-[#747D8F] leading-[24px]">
                  {item.name}
                </span>
              </div>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}
