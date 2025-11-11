import Image from "next/image";
import { Star, MoveRight } from "lucide-react";

interface TourHeaderProps {
  chosenTour: {
    title: string;
    rating: number;
    reviewCount: number;
  };
}

export default function TourHeader({ chosenTour }: TourHeaderProps) {
  return (
    <div className="flex flex-col items-start gap-6  max-w-[1180px] mx-auto  pb-6 text-gray-900 font-[Rubik]">
      {/* 1️⃣ Breadcrumb + View on Map */}
      <div className="flex flex-col w-full  gap-4">
        <div className="flex justify-between items-center w-full">
          {/* Breadcrumb */}
          <div className="flex items-center  text-[13px] text-[#A9B1B7]">
            <span className="hover:text-blue-600 cursor-pointer">Home</span>
            <span className="mx-[6px]"> <svg width="6" height="8" viewBox="0 0 6 8" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.280828 7.85377C0.206162 7.85377 0.140828 7.83044 0.0848281 7.78377C0.0288282 7.73711 0.000828177 7.66711 0.000828177 7.57377V6.95777C0.000828177 6.84577 0.0241615 6.75711 0.0708282 6.69177C0.126828 6.62644 0.210828 6.56111 0.322828 6.49577L4.06083 3.93377L0.322828 1.37177C0.210828 1.29711 0.126828 1.22711 0.0708282 1.16177C0.0241615 1.09644 0.000828177 1.00777 0.000828177 0.895773V0.279773C0.000828177 0.18644 0.0288282 0.11644 0.0848281 0.0697732C0.140828 0.0231066 0.206162 -0.000226736 0.280828 -0.000226736C0.336828 -0.000226736 0.397495 0.01844 0.462828 0.0557734C0.528162 0.083773 0.579495 0.111773 0.616828 0.139773L5.01283 3.16377C5.16216 3.26644 5.26483 3.36444 5.32083 3.45777C5.38616 3.55111 5.41883 3.66777 5.41883 3.80777V4.04577C5.41883 4.17644 5.38616 4.29311 5.32083 4.39577C5.26483 4.48911 5.16216 4.58711 5.01283 4.68977L0.616828 7.71377C0.579495 7.74177 0.528162 7.77444 0.462828 7.81177C0.397495 7.83977 0.336828 7.85377 0.280828 7.85377Z" fill="#A9B1B7"/>
</svg>
 </span>
            <span className="hover:text-blue-600 cursor-pointer">Tour</span>
            <span className="mx-[6px]"><svg width="6" height="8" viewBox="0 0 6 8" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.280828 7.85377C0.206162 7.85377 0.140828 7.83044 0.0848281 7.78377C0.0288282 7.73711 0.000828177 7.66711 0.000828177 7.57377V6.95777C0.000828177 6.84577 0.0241615 6.75711 0.0708282 6.69177C0.126828 6.62644 0.210828 6.56111 0.322828 6.49577L4.06083 3.93377L0.322828 1.37177C0.210828 1.29711 0.126828 1.22711 0.0708282 1.16177C0.0241615 1.09644 0.000828177 1.00777 0.000828177 0.895773V0.279773C0.000828177 0.18644 0.0288282 0.11644 0.0848281 0.0697732C0.140828 0.0231066 0.206162 -0.000226736 0.280828 -0.000226736C0.336828 -0.000226736 0.397495 0.01844 0.462828 0.0557734C0.528162 0.083773 0.579495 0.111773 0.616828 0.139773L5.01283 3.16377C5.16216 3.26644 5.26483 3.36444 5.32083 3.45777C5.38616 3.55111 5.41883 3.66777 5.41883 3.80777V4.04577C5.41883 4.17644 5.38616 4.29311 5.32083 4.39577C5.26483 4.48911 5.16216 4.58711 5.01283 4.68977L0.616828 7.71377C0.579495 7.74177 0.528162 7.77444 0.462828 7.81177C0.397495 7.83977 0.336828 7.85377 0.280828 7.85377Z" fill="#A9B1B7"/>
</svg>
</span>
            <span className="hover:text-blue-600 cursor-pointer">
              Dominican Republic
            </span>
            <span className="mx-[6px]"><svg width="6" height="8" viewBox="0 0 6 8" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.280828 7.85377C0.206162 7.85377 0.140828 7.83044 0.0848281 7.78377C0.0288282 7.73711 0.000828177 7.66711 0.000828177 7.57377V6.95777C0.000828177 6.84577 0.0241615 6.75711 0.0708282 6.69177C0.126828 6.62644 0.210828 6.56111 0.322828 6.49577L4.06083 3.93377L0.322828 1.37177C0.210828 1.29711 0.126828 1.22711 0.0708282 1.16177C0.0241615 1.09644 0.000828177 1.00777 0.000828177 0.895773V0.279773C0.000828177 0.18644 0.0288282 0.11644 0.0848281 0.0697732C0.140828 0.0231066 0.206162 -0.000226736 0.280828 -0.000226736C0.336828 -0.000226736 0.397495 0.01844 0.462828 0.0557734C0.528162 0.083773 0.579495 0.111773 0.616828 0.139773L5.01283 3.16377C5.16216 3.26644 5.26483 3.36444 5.32083 3.45777C5.38616 3.55111 5.41883 3.66777 5.41883 3.80777V4.04577C5.41883 4.17644 5.38616 4.29311 5.32083 4.39577C5.26483 4.48911 5.16216 4.58711 5.01283 4.68977L0.616828 7.71377C0.579495 7.74177 0.528162 7.77444 0.462828 7.81177C0.397495 7.83977 0.336828 7.85377 0.280828 7.85377Z" fill="#A9B1B7"/>
</svg>
</span>
            <span className="hover:text-blue-600 cursor-pointer">
              Santo Domingo
            </span>
            <span className="mx-[6px]"><svg width="6" height="8" viewBox="0 0 6 8" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.280828 7.85377C0.206162 7.85377 0.140828 7.83044 0.0848281 7.78377C0.0288282 7.73711 0.000828177 7.66711 0.000828177 7.57377V6.95777C0.000828177 6.84577 0.0241615 6.75711 0.0708282 6.69177C0.126828 6.62644 0.210828 6.56111 0.322828 6.49577L4.06083 3.93377L0.322828 1.37177C0.210828 1.29711 0.126828 1.22711 0.0708282 1.16177C0.0241615 1.09644 0.000828177 1.00777 0.000828177 0.895773V0.279773C0.000828177 0.18644 0.0288282 0.11644 0.0848281 0.0697732C0.140828 0.0231066 0.206162 -0.000226736 0.280828 -0.000226736C0.336828 -0.000226736 0.397495 0.01844 0.462828 0.0557734C0.528162 0.083773 0.579495 0.111773 0.616828 0.139773L5.01283 3.16377C5.16216 3.26644 5.26483 3.36444 5.32083 3.45777C5.38616 3.55111 5.41883 3.66777 5.41883 3.80777V4.04577C5.41883 4.17644 5.38616 4.29311 5.32083 4.39577C5.26483 4.48911 5.16216 4.58711 5.01283 4.68977L0.616828 7.71377C0.579495 7.74177 0.528162 7.77444 0.462828 7.81177C0.397495 7.83977 0.336828 7.85377 0.280828 7.85377Z" fill="#A9B1B7"/>
</svg>
</span>
            <span className="text-[#4B5563]">{chosenTour.title}</span>
          </div>

          {/* “View on Map” button */}
          <button className="flex items-center justify-center gap-2 px-4 py-2 border border-[#EE2552] rounded-lg bg-[rgba(238,37,82,0.05)] text-[#EE2552] text-[13px] font-[400] hover:bg-[#EE2552]/10 transition">
            <span>View on map</span>
            <MoveRight className="w-4 h-4 text-[#EE2552]" />
          </button>
        </div>
      </div>

      {/* 2️⃣ Title + Rating */}
      <div className="flex flex-col items-start gap-1 ">
        <h1 className="text-[40px] leading-[48px] font-[500] text-[#191919]">
          {chosenTour.title}
        </h1>

        <div className="flex items-center gap-2 text-[14px] font-[500] text-[#191919]">
          <div className="flex items-center gap-[2px]">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="w-5 h-5 fill-[#FACC15] text-[#FACC15]"
              />
            ))}
          </div>
          <span>
            {chosenTour.rating.toFixed(1)} ({chosenTour.reviewCount} Reviews)
          </span>
        </div>
      </div>

      {/* 3️⃣ Info Cards */}
      <div className="flex items-center gap-5 w-[760px]">
        {/* Card 1 */}
        <div className="flex flex-col items-center justify-center p-[20px] pt-[24px] gap-4 w-[175px] h-[130px] bg-[rgba(239,242,248,0.5)] border border-[#BECCE8]/80 rounded-xl">
          <Image
            src="/images/tours-id/duration-icon.png"
            width={32}
            height={32}
            alt="Duration"
          />
          <div className="flex flex-col items-center">
            <span className="text-[15px] font-[500] text-[#191919]">
              Duration
            </span>
            <span className="text-[13px] font-[400] text-[#878D97]">
              10 Hours
            </span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="flex flex-col items-center justify-center p-[20px] pt-[24px] gap-4 w-[175px] h-[130px] bg-[rgba(239,242,248,0.5)] border border-[#BECCE8]/80 rounded-xl">
          <Image
            src="/images/tours-id/Pickup.png"
            width={32}
            height={32}
            alt="Pickup"
          />
          <div className="flex flex-col items-center">
            <span className="text-[15px] font-[500] text-[#191919]">
              Pickup
            </span>
            <span className="text-[13px] font-[400] text-[#878D97] text-center">
              At your hotel lobby
            </span>
          </div>
        </div>

        {/* Card 3 */}
        <div className="flex flex-col items-center justify-center p-[20px] pt-[24px] gap-4 w-[175px] h-[130px] bg-[rgba(239,242,248,0.5)] border border-[#BECCE8]/80 rounded-xl">
          <Image
            src="/images/tours-id/Availablilty.png"
            width={32}
            height={32}
            alt="Availability"
          />
          <div className="flex flex-col items-center">
            <span className="text-[15px] font-[500] text-[#191919]">
              Availability
            </span>
            <span className="text-[13px] font-[400] text-[#878D97]">
              Everyday
            </span>
          </div>
        </div>

        {/* Card 4 */}
        <div className="flex flex-col items-center justify-center p-[20px] pt-[24px] gap-4 w-[175px] h-[130px] bg-[rgba(239,242,248,0.5)] border border-[#BECCE8]/80 rounded-xl">
          <Image
            src="/images/tours-id/Guide-Language.png"
            width={32}
            height={32}
            alt="Guide Language"
          />
          <div className="flex flex-col items-center">
            <span className="text-[15px] font-[500] text-[#191919]">
              Guide Language
            </span>
            <span className="text-[13px] font-[400] text-[#878D97] text-center">
              Your preferred language
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
