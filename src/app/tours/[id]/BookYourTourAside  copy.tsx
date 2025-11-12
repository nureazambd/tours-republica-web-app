import Image from "next/image";
import { useState } from "react";
import { ArrowRight } from "lucide-react";

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
      <div className="sticky top-24 flex flex-col items-start p-8 gap-6 w-[380px] h-[664px] bg-[#EFF2F8] shadow-sm rounded-[16px] border border-[#F3F4F6]">

        {/* Header */}
        <h2 className="text-[24px] font-[500] text-[#191919] leading-[32px]">
          Book Your Tour
        </h2>

        <div className="flex flex-col items-start gap-5 w-[316px]">
          {/* Date Selection */}
          <div className="flex flex-col items-start gap-3 w-full">
            <label
              htmlFor="tour-date"
              className="text-[14px] font-[400] text-[#191919]"
            >
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
          <div className="flex flex-col gap-3 w-full">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1 text-[14px] text-[#191919] font-[400]">
                Adults <span className="text-[13px] text-gray-500">(12-99 years old)</span>
              </div>
              <span className="text-[16px] text-gray-600">${adultPrice}/person</span>
            </div>

            <div className="flex items-center justify-between bg-white border border-[#BECCE8] rounded-[8px] px-5 py-[14px]">
              <div className="text-[18px] text-[#191919]">{adults}</div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setAdults(Math.max(1, adults - 1))}
                  disabled={adults <= 1}
                  className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded-full hover:bg-gray-100 disabled:opacity-40"
                >
                  -
                </button>
                <button
                  onClick={() => setAdults(adults + 1)}
                  className="w-6 h-6 flex items-center justify-center bg-[#EE2552] text-white rounded-full hover:bg-[#d92048]"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Children */}
          <div className="flex flex-col gap-3 w-full">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1 text-[14px] text-[#191919] font-[400]">
                Children <span className="text-[13px] text-gray-500">(3-11 years old)</span>
              </div>
              <span className="text-[16px] text-gray-600">${childPrice}/person</span>
            </div>

            <div className="flex items-center justify-between bg-white border border-[#BECCE8] rounded-[8px] px-5 py-[14px]">
              <div className="text-[18px] text-[#191919]">{children}</div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setChildren(Math.max(0, children - 1))}
                  disabled={children <= 0}
                  className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded-full hover:bg-gray-100 disabled:opacity-40"
                >
                  -
                </button>
                <button
                  onClick={() => setChildren(children + 1)}
                  className="w-6 h-6 flex items-center justify-center bg-[#EE2552] text-white rounded-full hover:bg-[#d92048]"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Infants */}
          <div className="flex flex-col gap-3 w-full">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1 text-[14px] text-[#191919] font-[400]">
                Infants <span className="text-[13px] text-gray-500">(0-2 years old)</span>
              </div>
              <span className="text-[16px] text-gray-600">Free</span>
            </div>

            <div className="flex items-center justify-between bg-white border border-[#BECCE8] rounded-[8px] px-5 py-[14px]">
              <div className="text-[18px] text-[#191919]">{infants}</div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setInfants(Math.max(0, infants - 1))}
                  disabled={infants <= 0}
                  className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded-full hover:bg-gray-100 disabled:opacity-40"
                >
                  -
                </button>
                <button
                  onClick={() => setInfants(infants + 1)}
                  className="w-6 h-6 flex items-center justify-center bg-[#EE2552] text-white rounded-full hover:bg-[#d92048]"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Total + Book Button */}
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

        {/* Footer Image */}
        <div className="w-full pt-3">
          <Image
            src="/images/tours-id/Book-Your-Tour-footer.png"
            width={316}
            height={60}
            alt="Payment Methods"
            className="rounded-md object-contain"
          />
        </div>
      </div>
    </aside>
  );
};

export default BookYourTourAside;
