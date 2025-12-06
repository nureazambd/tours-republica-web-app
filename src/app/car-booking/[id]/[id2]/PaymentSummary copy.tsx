"use client";

interface PaymentSummaryProps {
  car: any; // you can replace `any` with your Car type later
}

export default function PaymentSummary({ car }: PaymentSummaryProps) {
  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-[1180px]">

      {/* ------- Total Payable Section ------- */}
      <div className="flex flex-row justify-between items-center w-full max-w-[1180px] h-[54px]">
        <p className="text-[#1A202C] font-rubik text-[16px]">Total Payable</p>

        <div className="flex flex-col items-end gap-[2px]">
          <p className="text-[#1E2640] font-rubik text-[20px] leading-[32px]">
            US$ {car?.price || 0}
          </p>
          <span className="text-[#737D8B] font-rubik text-[12px] leading-[20px]">
            Includes all taxes
          </span>
        </div>
      </div>

      {/* ------- Book Button Section ------- */}
      <div className="flex flex-col items-center gap-6 w-full max-w-[1180px]">
        <button className="w-full flex justify-center items-center gap-5 bg-[#EE2552] rounded-xl py-4 text-white font-rubik text-[20px] font-medium">
          Book
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <path d="M5 12H19" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
            <path
              d="M13 6L19 12L13 18"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <button className="flex items-center gap-3 text-[#788393] font-rubik text-[14px]">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M19 12H5" stroke="#9BA6B2" strokeWidth="2" strokeLinecap="round" />
            <path
              d="M11 6L5 12L11 18"
              stroke="#9BA6B2"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back
        </button>
      </div>
    </div>
  );
}
