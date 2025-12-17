import React from "react";

type TravelerSelectorProps = {
  suitcases: number;
  setSuitcases: (value: (prev: number) => number) => void;
  carryOn: number;
  setCarryOn: (value: (prev: number) => number) => void;
  onClose: () => void;
};

export default function TravelerSelector({
  suitcases,
  setSuitcases,
  carryOn,
  setCarryOn,
  onClose,
}: TravelerSelectorProps) {
  return (
    <div
      className="
        absolute left-[490px] top-[590px]
        w-[444px] h-[236px]
        bg-white rounded-[16px]
        shadow-[0px_24px_48px_-12px_rgba(16,24,40,0.18)]
        flex flex-col items-center p-8 gap-[18px] z-50
      "
    >
      <div className="flex flex-col items-center w-[420px] gap-[18px]">
        {/* Suitcase Section */}
        <div className="flex flex-col items-start w-full gap-2">
          <p className="text-[#191919] font-rubik font-medium text-[16px]">
            Suitcase Qty
          </p>

          <div className="flex justify-between items-center w-full">
            <p className="text-[#191919] text-[14px] font-rubik">Suitcase</p>

            <div className="flex items-center gap-2">
              {/* Minus */}
              <button
                type="button"
                onClick={() => setSuitcases((s) => Math.max(0, s - 1))}
                className="w-6 h-6 rounded-full border border-[#878D97] flex items-center justify-center relative"
              >
                <span className="absolute w-[70%] border border-[#878D97]" />
              </button>

              {/* Number */}
              <div className="w-6 h-6 flex items-center justify-center text-[16px] text-[#191919] font-rubik">
                {suitcases}
              </div>

              {/* Plus */}
              <button
                type="button"
                onClick={() => setSuitcases((s) => s + 1)}
                className="w-6 h-6 rounded-full border border-[#EE2552] flex items-center justify-center relative"
              >
                <span className="absolute w-[70%] border border-[#EE2552]" />
                <span className="absolute h-[70%] border border-[#EE2552]" />
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-[#E6E6E6]" />

        {/* Carry-on Section */}
        <div className="flex flex-col items-start w-full gap-2">
          {/* <p className="text-[#191919] text-[14px] font-rubik">Carry-on Bag</p> */}

          <div className="flex justify-between items-center w-full">
            <p className="text-[#191919] text-[14px] font-rubik">Carryon Bag</p>

            <div className="flex items-center gap-2">
              {/* Minus */}
              <button
                type="button"
                onClick={() => setCarryOn((c) => Math.max(0, c - 1))}
                className="w-6 h-6 rounded-full border border-[#878D97] flex items-center justify-center relative"
              >
                <span className="absolute w-[70%] border border-[#878D97]" />
              </button>

              {/* Number */}
              <div className="w-6 h-6 flex items-center justify-center text-[16px] text-[#191919] font-rubik">
                {carryOn}
              </div>

              {/* Plus */}
              <button
                type="button"
                onClick={() => setCarryOn((c) => c + 1)}
                className="w-6 h-6 rounded-full border border-[#EE2552] flex items-center justify-center relative"
              >
                <span className="absolute w-[70%] border border-[#EE2552]" />
                <span className="absolute h-[70%] border border-[#EE2552]" />
              </button>
            </div>
          </div>
        </div>
        

        {/* Apply Button */}
        <button
          type="button"
          className="
            w-[420px] h-[40px]
            bg-[#EE2552]
            text-white font-rubik font-medium text-[14px]
            rounded-[8px] flex items-center justify-center
          "
          onClick={onClose}
        >
          Apply
        </button>
      </div>
    </div>
  );
}
