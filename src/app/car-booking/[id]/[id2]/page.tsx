"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Clock } from "lucide-react";
import Layout from "@/components/layout/Layout";
import AdditionalServices from "./AdditionalServices";
import PaymentSummary from "./PaymentSummary";
import CarDetails from "./CarDetails";

export default function CarBookingPage() {
  const { id, id2 } = useParams();

  const [car, setCar] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ===========================
  // FETCH CAR DATA DYNAMICALLY
  // ===========================
  useEffect(() => {
    if (!id) return;

    const fetchCar = async () => {
      try {
        const res = await fetch(`/api/cars/${id}`);
        const data = await res.json();

        if (!res.ok) throw new Error(data.error || "Failed to load car");

        setCar(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [id]);

  // ---------- Loading ----------
  if (loading) {
    return (
      <Layout>
        <div className="p-10 text-center text-lg text-gray-600">
          Loading vehicle details...
        </div>
      </Layout>
    );
  }

  // ----------- Error -----------
  if (error) {
    return (
      <Layout>
        <div className="p-10 text-center text-red-500 text-lg">
          {error}
        </div>
      </Layout>
    );
  }

  // ----------- No Car Found -----------
  if (!car) {
    return (
      <Layout>
        <div className="p-10 text-center text-gray-600 text-lg">
          Car not found.
        </div>
      </Layout>
    );
  }

  // ------------------------------------------------------------
  // Render UI
  // ------------------------------------------------------------
  return (
    <Layout>
      <div className="flex justify-center py-10">
        <div className="w-full max-w-[1180px]">

          {/* Main Car Section */}
          <div className="bg-[#EFF2F8] border border-[#EEF4FB] rounded-[16px] p-8 flex flex-col gap-12">

            {/* Car Header Section */}
            <div className="flex gap-10 h-[300px]">

              {/* Image Box */}
              <div className="w-[440px] h-full bg-white border border-[#E8E8E8] rounded-[12px] relative">
                <Image
                  src={car.image}
                  alt={car.name}
                  fill
                  className="object-contain"
                />
              </div>

              {/* Car Details */}
              <CarDetails car={car}/>
            </div>
          </div>

          {/* Vehicle + Driver Info */}
          <VehicleDriverInfo car={car} />

          {/* Add-ons */}
          <div className="mt-[30px]">
            <AdditionalServices />
          </div>

          {/* Payment Summary */}
          <div className="mt-[30px]">
            <PaymentSummary car={car} />
          </div>

        </div>
      </div>
    </Layout>
  );
}

// Small reusable option component
const Option = ({ label, value }: any) => (
  <div className="flex flex-col gap-2">
    <div className="flex items-center gap-2">
      <svg width="20" height="20" viewBox="0 0 20 20">
        <rect width="20" height="20" fill="#788393" />
      </svg>
      <span className="text-sm text-[#737D8B]">{value}</span>
    </div>
  </div>
);

// Extract Vehicle/Driver info (optional improvement)
const VehicleDriverInfo = ({ car }: any) => (
  <div className="w-full mt-[30px] bg-[#F4F6FA] rounded-2xl shadow-sm p-6 flex flex-col gap-6">
    {/* 제목 */}
    <div className="flex justify-between items-center">
      <h2 className="text-[20px] font-medium text-[#1A202C]">
        Vehicle & Driver info
      </h2>
    </div>

    {/* Content */}
    <div className="flex justify-between">
      {/* Vehicle Info */}
      <div className="flex gap-[66px]">
        <Column
          labels={["Brand", "Model", "Class", "Passengers"]}
          values={[car.brand, car.model, car.class, car.capacity]}
        />

        <Column
          labels={["Baggage", "Year", "Color"]}
          values={[car.luggage, car.year, car.color]}
        />
      </div>

      {/* Driver Info */}
      <div className="flex flex-col gap-4 w-[434px]">
        {/* <div className="flex gap-10">
          <DriverStat title="Total Ratings" value={car.rating} sub="(260)" />
          <DriverStat title="Total Rides" value="669" />
          <DriverStat title="Years" value="2.8" />
        </div> */}

        <div className="flex gap-10">
          <DriverStat
  title="Total Ratings"
  value={car.rating}
  sub="(260)"
  star={true}
/>

          <DriverStat
  title="Total Rides"
  value="669"
/>

          <DriverStat
  title="Years"
  value="2.8"
/>

        </div>

        <div>
          <p className="text-[#6A7280] mb-2">Languages driver can speak</p>
          <div className="flex gap-3">
          <svg
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <g clipPath="url(#clip0_835_2229)">
    <path d="M24 4.78711H0V19.209H24V4.78711Z" fill="#EEEEEE" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16.0707 10.0014L24.0009 5.42811V4.78711H23.4541L14.4121 10.0014H16.0707Z"
      fill="#CF142B"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M15.6953 14.2871L23.9998 19.0746V18.118L17.3544 14.2871H15.6953Z"
      fill="#CF142B"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0 5.87937L7.10393 9.99581H8.76377L0 4.92188V5.87937Z"
      fill="#CF142B"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.38748 14.2871L0 19.1288V19.2119H1.51528L10.0482 14.2871H8.38748Z"
      fill="#CF142B"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M22.358 4.78711H13.9551V9.63523L22.358 4.78711Z"
      fill="#3A3EE9"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.2444 4.78711H1.875L10.2444 9.63523V4.78711Z"
      fill="#3A3EE9"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M23.9994 10.0018V6.69336L18.2988 10.0018H23.9994Z"
      fill="#3A3EE9"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M23.9994 17.5605V14.2871H18.2988L23.9994 17.5605Z"
      fill="#3A3EE9"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2.34961 19.2098H10.244V14.6523L2.34961 19.2098Z"
      fill="#3A3EE9"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13.9551 19.2098H21.8744L13.9551 14.6523V19.2098Z"
      fill="#3A3EE9"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0 14.2871V17.7079L5.89881 14.2871H0Z"
      fill="#3A3EE9"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0 10.0039H5.89881L0 6.57812V10.0039Z"
      fill="#3A3EE9"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.9866 4.78711V10.8582H0V13.4294H10.9866V19.209H13.2123V13.4294H24V10.8582H13.2123V4.78711H10.9866Z"
      fill="#CF142B"
    />
  </g>
  <defs>
    <clipPath id="clip0_835_2229">
      <rect width="24" height="24" fill="white" />
    </clipPath>
  </defs>
</svg>


            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clipPath="url(#clip0_835_2245)">
<path d="M7.99997 4.78906H0V19.2091H7.99997V4.78906Z" fill="#006211"/>
<path d="M16 4.78906H8V19.2091H16V4.78906Z" fill="#EEEEEE"/>
<path d="M24 4.78906H16V19.2091H24V4.78906Z" fill="#DF0024"/>
</g>
<defs>
<clipPath id="clip0_835_2245">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>
</svg>

           <img src="/icons/spain-flag.svg" className="w-7 h-5 mt-[2.5px] rounded" />

          </div>
        </div>
      </div>
    </div>
  </div>
);

const Column = ({ labels, values }: any) => (
  <div className="flex gap-6">
    <div className="flex flex-col text-[#1A202C] text-sm leading-[28px]">
      {labels.map((l: string, i: number) => (
        <span key={i}>{l}</span>
      ))}
    </div>

    <div className="flex flex-col text-[#878D97] text-sm leading-[28px]">
      {values.map((v: string, i: number) => (
        <span key={i}>{v}</span>
      ))}
    </div>
  </div>
);

// const DriverStat = ({ title, value, sub }: any) => (
//   <div>
//     <p className="text-[#6A7280]">{title}</p>
//     <div className="flex items-center gap-1 mt-1">
//       <span className="text-[#1A202C] font-medium">{value}</span>
//       {sub && <span className="text-[#6A7280]">{sub}</span>}
//     </div>
//   </div>
// );

const DriverStat = ({
  title,
  value,
  sub,
  star = false,
}: {
  title: string;
  value: string | number;
  sub?: string;
  star?: boolean;
}) => {
  return (
    <div className="flex flex-col">
      {/* Title */}
      <p className="text-[#6A7280] text-sm">{title}</p>

      {/* Value Row */}
      <div className="flex flex-row items-end gap-[6px] h-[20px] mt-1">
        
        {/* Star Only If Needed */}
        {star && (
          <div className="w-[20px] h-[20px] relative flex-none">
            <svg
              className="absolute inset-0"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="#FAA523"
            >
              <path d="M10 1.5L12.4721 7.04506L18.5 7.71885L13.75 11.8861L15.0902 17.9312L10 14.75L4.90981 17.9312L6.25 11.8861L1.5 7.71885L7.52786 7.04506L10 1.5Z" />
            </svg>
          </div>
        )}

        {/* Value + Sub */}
        <p className="text-[14px] font-medium leading-[20px] text-[#1A202C] flex items-center">
          {value}
          {sub && <span className="text-[#6A7280] ml-1">{sub}</span>}
        </p>
      </div>
    </div>
  );
};
