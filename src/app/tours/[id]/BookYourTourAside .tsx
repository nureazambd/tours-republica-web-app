import Image from "next/image";
import { useState } from "react";
import { ArrowRight, Info } from "lucide-react";
import { Mail, Phone } from "lucide-react";
import PaymentSupportSection from "./PaymentSupportSection";

const BookYourTourAside = ({ chosenTour }: any) => {
  const [date, setDate] = useState("");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);

  const adultPrice = chosenTour?.price || 89;
  const childPrice = adultPrice * 0.5;
  const subtotal = adults * adultPrice + children * childPrice;
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  const todayIso = new Date().toISOString().split("T")[0];

  return (
    <aside className="lg:col-span-1">
      <div className="sticky top-24 flex flex-col items-start  gap-6 w-[380px]  rounded-[16px] ">
        <div className=" top-24 flex flex-col  p-8 gap-6  bg-[#EFF2F8]  rounded-[16px] border border-[#F3F4F6]">
        {/* Header */}
        <h2 className="text-[24px] font-[500] text-[#191919] leading-[32px]">
          Book Your Tour
        </h2>

        {/* Date & Passenger Inputs */}
        <div className="flex flex-col items-start gap-5 w-[316px]">
          {/* Date */}
          <div className="flex flex-col items-start gap-3 w-full">
            <label htmlFor="tour-date" className="text-[14px] font-[400] text-[#191919]">
              Select Date
            </label>
            <div className="flex items-center justify-between w-full bg-white border border-[#BECCE8] rounded-[8px] px-5 py-[14px]">
              <input
                id="tour-date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={todayIso}
                className="w-full bg-transparent text-[18px] text-[#191919] font-[400] focus:outline-none"
              />
            </div>
          </div>

          {/* Adults */}
          <CounterRow
            label="Adults"
            sub="(12–99 years old)"
            price={adultPrice}
            value={adults}
            setValue={setAdults}
            min={1}
          />

          {/* Children */}
          <CounterRow
            label="Children"
            sub="(3–11 years old)"
            price={childPrice}
            value={children}
            setValue={setChildren}
          />

          {/* Infants */}
          <CounterRow
            label="Infants"
            sub="(0–2 years old)"
            price="Free"
            value={infants}
            setValue={setInfants}
          />

          {/* Total */}
          <div className="flex flex-col gap-6 w-full pt-4">
            <div className="flex justify-between items-center text-[16px] text-[#191919] font-[400]">
              <span>Total</span>
              <span className="text-[24px] font-[500] text-[#191919]">${total.toFixed(2)}</span>
            </div>

            <button
              onClick={() => alert("Booked!")}
              className="flex justify-center items-center gap-2 w-full bg-[#EE2552] hover:bg-[#d92048] text-white font-[500] text-[16px] rounded-[8px] py-4 transition"
            >
              Book <ArrowRight className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
        </div>
        {/* ====================== FOOTER SECTION ====================== */}
        <PaymentSupportSection/>
      </div>
    </aside>
  );
};

// ====================== SUB COMPONENT ====================== //
const CounterRow = ({
  label,
  sub,
  price,
  value,
  setValue,
  min = 0,
}: any) => (
  <div className="flex flex-col gap-3 w-full">
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-1 text-[14px] text-[#191919] font-[400]">
        {label}{" "}
        {sub && <span className="text-[13px] text-gray-500">{sub}</span>}
      </div>
      {typeof price === "number" ? (
        <span className="text-[16px] text-gray-600">${price}/person</span>
      ) : (
        <span className="text-[16px] text-gray-600">{price}</span>
      )}
    </div>

    <div className="flex items-center justify-between bg-white border border-[#BECCE8] rounded-[8px] px-5 py-[14px]">
      <div className="text-[18px] text-[#191919]">{value}</div>
      <div className="flex items-center gap-3">
        <button
          onClick={() => setValue(Math.max(min, value - 1))}
          disabled={value <= min}
          className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded-full hover:bg-gray-100 disabled:opacity-40"
        >
          -
        </button>
        <button
          onClick={() => setValue(value + 1)}
          className="w-6 h-6 flex items-center justify-center bg-[#EE2552] text-white rounded-full hover:bg-[#d92048]"
        >
          +
        </button>
      </div>
    </div>
  </div>
);

export default BookYourTourAside;
