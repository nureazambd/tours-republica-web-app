import { useState } from "react";

export default function VehiclesSection() {
  const vehicles = [
    {
      img: "/images/bookacar/vehicles/For-Couples-and-Small-Families.png",
      label: "For Couples and Small Families",
    },
    {
      img: "/images/bookacar/vehicles/For-Groups-and-Large-Families.png",
      label: "For Groups and Large Families",
    },
    {
      img: "/images/bookacar/vehicles/Luxury-Executive-Cars.png",
      label: "Luxury & Executive Cars",
    },
    {
      img: "/images/bookacar/vehicles/For-Couples-and-Small-Families.png",
      label: "Business Class Cars",
    },
    {
      img: "/images/bookacar/vehicles/For-Groups-and-Large-Families.png",
      label: "Offroad & SUVs",
    },
  ];

  const [startIndex, setStartIndex] = useState(0);

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1) % vehicles.length);
  };

  const getVisibleVehicles = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      visible.push(vehicles[(startIndex + i) % vehicles.length]);
    }
    return visible;
  };

  const visibleVehicles = getVisibleVehicles();

  return (
    <section className="flex flex-col items-center px-[130px] pt-[104px] pb-[128px] gap-[56px] w-full bg-[rgba(239,242,248,0.5)]">
      
      {/* Header */}
      <div className="flex flex-col items-center gap-[8px] w-[1170px] text-center">
        <h2 className="font-rubik font-medium text-[48px] leading-[56px] text-[#191919] w-[732px]">
          We cover all your transportation needs
        </h2>
        <p className="font-rubik font-normal text-[16px] leading-[26px] text-[#878D97] w-[1170px]">
          Whether you’re traveling as a couple or with a small family, we’ve got you covered.
        </p>
      </div>

      {/* Vehicle Cards */}
      <div className="relative w-[1180px] flex justify-center">
        <div className="flex gap-[20px]">
          {visibleVehicles.map((vehicle, idx) => (
            <div key={idx} className="flex flex-col items-center w-[380px]">
              <div className="flex flex-col items-center gap-[24px] p-[16px] w-[380px] h-[232px] bg-[#EFF2F8] border border-[#BECCE8] rounded-[24px]">
                <div className="w-[316px] h-[200px] relative">
                  <img
                    src={vehicle.img}
                    alt={vehicle.label}
                    className="absolute inset-0 m-auto object-contain"
                  />
                </div>
              </div>

              <div className="font-rubik font-medium mt-[24px] text-[20px] leading-[24px] text-[#191919] text-center w-full">
                {vehicle.label}
              </div>
            </div>
          ))}
        </div>

        {/* Chevron Right Button */}
        <button
          onClick={handleNext}
          className="
            absolute right-[30px] top-[40%] -translate-y-1/2
            w-[32px] h-[32px]
            
            rounded-full
            flex items-center justify-center
          "
        >
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="48" height="48" rx="24" fill="#FAA523" />
  <path
    d="M20 32L28 24L20 16"
    stroke="#191919"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
</svg>


        </button>
      </div>
    </section>
  );
}
