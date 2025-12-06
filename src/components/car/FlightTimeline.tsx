import React from "react";

// interface FlightInfo {
//   date?: string;
//   airport?: string;
//   duration?: string;
// }

interface FlightInfo {
  date?: string;          // departure date
  airport?: string;       // departure airport
  duration?: string;
  arrivalDate?: string;   // arrival date
  arrivalAirport?: string; // arrival airport
}


interface FlightTimelineProps {
  flightInfo?: FlightInfo;
}

const FlightTimeline: React.FC<FlightTimelineProps> = ({ flightInfo }) => {
  return (
    <div className="flex flex-col gap-6 relative w-[235px]">
      {/* Vertical timeline line */}
      <span className="absolute left-[7px] top-[10px] h-[107px] border-l-2 border-[#FAA523]"></span>

      {/* Departure */}
      <div className="flex items-start gap-5 relative z-10">
        <div className="w-4 h-4 bg-[#FAA523] rounded-full" />

        <div className="flex flex-col gap-3">
          <span className="text-sm text-[#4B5563]">
            {flightInfo?.date || "Fri, Jan 24, 12:30 PM"}
          </span>

          <h3 className="text-[18px] font-medium text-[#191919] capitalize leading-[1px]">
            {flightInfo?.airport || "Samaná Airport"}
          </h3>

          {/* Duration */}
          <div className="flex items-center gap-2 pl-9 mt-4">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.666 7.7673H13.9517C13.8535 7.7673 13.7732 7.84766 13.7732 7.94587V9.0173C13.7732 9.11551 13.8535 9.19587 13.9517 9.19587H19.666C19.7642 9.19587 19.8446 9.11551 19.8446 9.0173V7.94587C19.8446 7.84766 19.7642 7.7673 19.666 7.7673ZM16.6749 10.803H13.9517C13.8535 10.803 13.7732 10.8834 13.7732 10.9816V12.053C13.7732 12.1512 13.8535 12.2316 13.9517 12.2316H16.6749C16.7732 12.2316 16.8535 12.1512 16.8535 12.053V10.9816C16.8535 10.8834 16.7732 10.803 16.6749 10.803ZM9.22628 5.76953H8.25977C8.12137 5.76953 8.00977 5.88114 8.00977 6.01953V11.5552C8.00977 11.6356 8.04771 11.7093 8.11244 11.7561L11.4361 14.1802C11.5477 14.2606 11.704 14.2383 11.7843 14.1267L12.358 13.3432V13.341C12.4383 13.2294 12.4138 13.0731 12.3022 12.9927L9.47405 10.9481V6.01953C9.47628 5.88114 9.36244 5.76953 9.22628 5.76953Z"
                fill="#4B5563"
              />
              <path
                d="M16.5349 13.6134H15.2447C15.1197 13.6134 15.0014 13.6781 14.9344 13.7853C14.6505 14.2353 14.3174 14.6523 13.9411 15.0286C13.2933 15.6785 12.5254 16.1963 11.68 16.5531C10.8028 16.9237 9.87195 17.1112 8.91212 17.1112C7.95007 17.1112 7.01927 16.9237 6.14427 16.5531C5.29829 16.196 4.53713 15.6826 3.88311 15.0286C3.22909 14.3746 2.7157 13.6134 2.35855 12.7674C1.98802 11.8924 1.80052 10.9616 1.80052 9.99957C1.80052 9.03751 1.98802 8.10894 2.35855 7.23171C2.7157 6.38573 3.22909 5.62457 3.88311 4.97055C4.53713 4.31653 5.29829 3.80314 6.14427 3.44599C7.01927 3.07546 7.9523 2.88796 8.91212 2.88796C9.87418 2.88796 10.805 3.07546 11.68 3.44599C12.526 3.80314 13.2871 4.31653 13.9411 4.97055C14.3174 5.34681 14.6505 5.76382 14.9344 6.21385C15.0014 6.32099 15.1197 6.38573 15.2447 6.38573H16.5349C16.6889 6.38573 16.7871 6.22501 16.7179 6.08885C15.2626 3.19376 12.3117 1.31206 9.01704 1.27412C4.19337 1.21385 0.186678 5.16251 0.17775 9.98171C0.168821 14.8098 4.08177 18.7272 8.90989 18.7272C12.2469 18.7272 15.2469 16.8389 16.7179 13.9103C16.7336 13.879 16.7411 13.8443 16.7395 13.8094C16.738 13.7745 16.7276 13.7405 16.7092 13.7108C16.6909 13.681 16.6652 13.6565 16.6347 13.6394C16.6042 13.6224 16.5698 13.6134 16.5349 13.6134Z"
                fill="#4B5563"
              />
            </svg>

            <span className="text-[14px] text-[#4B5563]">
              {flightInfo?.duration || "3h 30m"}
            </span>
          </div>
        </div>
      </div>

      {/* Arrival */}
      <div className="flex items-start gap-5 relative z-10">
        <div className="w-4 h-4 bg-[#FAA523] rounded-full" />

        <div className="flex flex-col gap-3">
          <span className="text-sm text-[#4B5563]">
            {flightInfo?.arrivalDate || "Mon, Jan 24, 04:00 PM"}
          </span>

          <h3 className="text-[18px] font-medium text-[#191919] capitalize leading-[1px]">
            {flightInfo?.arrivalAirport || "Hotel King, punta cana"}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default FlightTimeline;
