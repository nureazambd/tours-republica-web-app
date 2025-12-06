// BookingSummary.tsx
import React from "react";
import FlightTimeline from "./FlightTimeline";

interface FlightInfo {
  type?: string;
  date?: string;
  time?: string;
  airport?: string;
  duration?: string;
}

interface BookingDetails {
  date?: string;
  carType?: string;
  traveler?: number;
  baggage?: string;
}

interface PaymentDetails {
  total?: string;
  promoText?: string;
}

interface ContactInfo {
  phone?: string;
  email?: string;
}

// interface BookingSummaryProps {
//   flightInfo?: FlightInfo;
//   bookingDetails?: BookingDetails;
//   paymentDetails?: PaymentDetails;
//   contactInfo?: ContactInfo;
// }

interface Car {
  pickupTime?: string;
  pickupLocation?: string;
  dropoffTime?: string;
  dropoffLocation?: string;
  duration?: string;
  // add more fields if needed
}


interface BookingSummaryProps {
  flightInfo?: FlightInfo;
  bookingDetails?: BookingDetails;
  paymentDetails?: PaymentDetails;
  contactInfo?: ContactInfo;
  car?: Car; // <-- add this
  onBack?: () => void; // if you want a callback
  onBook?: (data: { services: any[]; total: number }) => Promise<void>; // optional callback
}


const BookingSummary: React.FC<BookingSummaryProps> = ({
  flightInfo = {
    type: "Private",
    date: "Fri, Jan 24, 12:30 PM",
    airport: "Samaná Airport",
    duration: "3h 30m",
  },
  bookingDetails = {
    date: "02/25/2024",
    carType: "Toyota Corolla, 2023",
    traveler: 3,
    baggage: "5pcs",
  },
  paymentDetails = {
    total: "$138",
    promoText: "Have a promo code?",
  },
  contactInfo = {
    phone: "+1 (829) 618 5692",
    email: "reservas@toursrepublica.com",
  },
  car,       // <-- add this
  onBack,    // <-- add this
  onBook,    // <-- add this
}) => {
  return (
    <div className="flex flex-col items-start gap-6 w-[380px] h-[1016px]">
      {/* Main Card */}
      <div className="flex flex-col items-start p-8 gap-6 w-[380px] h-[904px] bg-[#EFF2F8] shadow-sm rounded-[16px]">
        {/* Flight Info */}
        <div className="flex flex-col items-start gap-8 w-[316px] h-[840px]">
          {/* Flight Card */}
          <div className="flex flex-col items-start gap-6 w-[316px] h-[392px] relative">
            <div className="absolute w-[338px] h-[167px] left-[50%] translate-x-[-50%] top-[12.5px] bg-white border border-[#E8E8E8] rounded-[12px]">
              <img
                src="/pngegg.png"
                alt="Flight"
                className="absolute inset-0 w-full h-full object-cover rounded-[12px]"
              />
            </div>

            {/* Flight Details */}
            <div className="flex flex-col items-start gap-4 w-[235px] h-[188px] mt-[200px]">
              <div className="flex flex-row justify-center items-center gap-2 w-[72px] h-[28px] bg-[#6FCCDC] rounded-[6px]">
                <span className="text-[12px] font-normal text-[#191919]">
                  {flightInfo.type}
                </span>
              </div>

              {/* <div className="flex flex-col gap-4 w-[235px] h-[144px]">
                <div className="flex flex-row items-center gap-5 w-[173px] h-[44px]">
                  <div className="w-4 h-4 bg-[#FAA523] rounded-full"></div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[13px] font-normal text-[#4B5563]">
                      {flightInfo.date}
                    </span>
                    <span className="text-[18px] font-medium text-[#191919]">
                      {flightInfo.airport}
                    </span>
                  </div>
                </div>
                <div className="text-[14px] font-normal text-[#4B5563]">
                  {flightInfo.duration}
                </div>
              </div> */}
              <FlightTimeline/>
            </div>
          </div>

          {/* Separator */}
          <div className="w-[316px] h-[1px] bg-[#E3E8EB]" />

          {/* Booking Details */}
          <div className="flex flex-col gap-5 w-[316px] h-[384px]">
            <span className="text-[18px] font-medium text-[#1A202C]">
              Booking details
            </span>
            <div className="flex flex-col gap-3">
              <div className="flex flex-row justify-between">
                <span className="text-[16px] font-normal text-[#191919]">
                  Select Date
                </span>
                <span className="text-[16px] font-medium text-[#191919]">
                  {bookingDetails.date}
                </span>
              </div>
              <div className="flex flex-row justify-between">
                <span className="text-[16px] font-normal text-[#191919]">
                  Car type
                </span>
                <span className="text-[16px] font-medium text-[#191919]">
                  {bookingDetails.carType}
                </span>
              </div>
              <div className="flex flex-row justify-between">
                <span className="text-[16px] font-normal text-[#191919]">
                  Traveler
                </span>
                <span className="text-[16px] font-medium text-[#191919]">
                  {bookingDetails.traveler}
                </span>
              </div>
              <div className="flex flex-row justify-between">
                <span className="text-[16px] font-normal text-[#191919]">
                  Baggage
                </span>
                <span className="text-[16px] font-medium text-[#191919]">
                  {bookingDetails.baggage}
                </span>
              </div>
            </div>
            <span className="text-[14px] font-normal text-[#33A853]">
              Free cancellation up to 48 hours before
            </span>
          </div>

          {/* Payment Info */}
          <div className="flex flex-col gap-4 w-[316px] h-[112px]">
            <span className="text-[18px] font-medium text-[#1A202C]">
              Payment details
            </span>
            <div className="flex flex-col gap-6">
              <div className="flex flex-row justify-between">
                <span className="text-[16px] font-normal text-[#191919]">
                  Total
                </span>
                <span className="text-[16px] font-medium text-[#191919]">
                  {paymentDetails.total}
                </span>
              </div>
              <span className="text-[14px] font-normal text-[#191919]">
                {paymentDetails.promoText}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="flex flex-col items-start p-[20px_32px] gap-3 w-[380px] h-[88px] bg-[#F9FAFB] shadow-sm rounded-[16px]">
        <div className="flex flex-row items-center gap-3">
          <div className="flex justify-center items-center w-[48px] h-[48px] bg-[#FEEDE9] rounded-[12px] relative">
            {/* Placeholder SVG */}
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M27.2 18.1327C27.2 14.3013 24.096 11.1992 20.2665 11.1992C16.4374 11.1992 13.3344 14.3013 13.3344 18.1327C12.4512 18.1327 11.7344 18.8491 11.7344 19.7327V25.0658C11.7344 25.9493 12.4512 26.6658 13.3344 26.6658H16.5344C16.8281 26.6658 17.0665 26.4274 17.0665 26.1327V22.3992C17.0665 21.8127 16.8531 20.9032 16.5907 20.3784L15.4678 18.1327C15.4678 15.4805 17.6147 13.3327 20.2669 13.3327C22.9168 13.3327 25.0669 15.4805 25.0669 18.1327L23.944 20.3784C23.6816 20.9035 23.4669 21.8127 23.4669 22.3992V26.2555C22.5134 26.8721 21.402 27.1998 20.2665 27.1992H19.2V28.7992H20.2665C22.3094 28.7992 24.1584 27.9835 25.5165 26.6658H27.2C27.6243 26.6658 28.0313 26.4972 28.3313 26.1971C28.6314 25.8971 28.8 25.4901 28.8 25.0658V19.7327C28.8 19.3083 28.6314 18.9013 28.3313 18.6013C28.0313 18.3012 27.6243 18.1327 27.2 18.1327Z" fill="#EE2552"/>
<path d="M20.2658 9.59922C20.6283 9.59922 20.9826 9.6293 21.3327 9.67314V5.33266C21.3327 4.15954 20.372 3.19922 19.1992 3.19922H5.33266C4.15922 3.19922 3.19922 4.15954 3.19922 5.33266V11.7327C3.19922 12.9058 4.15922 13.8661 5.33266 13.8661V17.0661L10.6661 13.8661H12.8885C14.3663 11.3199 17.1157 9.59922 20.2658 9.59922ZM15.9992 7.46578C16.1393 7.46565 16.2781 7.49315 16.4075 7.54671C16.537 7.60026 16.6546 7.67882 16.7537 7.77788C16.8527 7.87695 16.9313 7.99458 16.9848 8.12403C17.0384 8.25349 17.0659 8.39224 17.0658 8.53234C17.0658 8.74328 17.0032 8.94949 16.886 9.12489C16.7688 9.30028 16.6023 9.43699 16.4074 9.51771C16.2125 9.59844 15.998 9.61956 15.7911 9.5784C15.5843 9.53725 15.3942 9.43567 15.245 9.28651C15.0959 9.13735 14.9943 8.94731 14.9532 8.74041C14.912 8.53352 14.9331 8.31907 15.0138 8.12418C15.0946 7.9293 15.2313 7.76272 15.4067 7.64553C15.5821 7.52833 15.7883 7.46578 15.9992 7.46578ZM8.53266 9.59922C8.24975 9.59922 7.97842 9.48683 7.77837 9.28678C7.57833 9.08673 7.46594 8.81541 7.46594 8.5325C7.46594 8.24959 7.57833 7.97826 7.77837 7.77821C7.97842 7.57816 8.24975 7.46578 8.53266 7.46578C8.81557 7.46578 9.08689 7.57816 9.28694 7.77821C9.48699 7.97826 9.59938 8.24959 9.59938 8.5325C9.59938 8.81541 9.48699 9.08673 9.28694 9.28678C9.08689 9.48683 8.81557 9.59922 8.53266 9.59922ZM11.1992 8.53266C11.1992 8.24975 11.3116 7.97842 11.5117 7.77837C11.7117 7.57833 11.983 7.46594 12.2659 7.46594C12.5489 7.46594 12.8202 7.57833 13.0202 7.77837C13.2203 7.97842 13.3327 8.24975 13.3327 8.53266C13.3327 8.81557 13.2203 9.08689 13.0202 9.28694C12.8202 9.48699 12.5489 9.59938 12.2659 9.59938C11.983 9.59938 11.7117 9.48699 11.5117 9.28694C11.3116 9.08689 11.1992 8.81557 11.1992 8.53266Z" fill="#EE2552"/>
</svg>

          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[18px] font-medium text-[#4B5563]">
              {contactInfo.phone}
            </span>
            <span className="text-[13px] font-normal text-[#4B5563]">
              {contactInfo.email}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSummary;
