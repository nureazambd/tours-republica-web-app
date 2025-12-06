import React, { useEffect, useRef, useState, forwardRef } from "react";
import { MapPin, ArrowDownUp } from "lucide-react";
import { useRouter } from "next/navigation";
import TravelerSelector from "./TravelerSelector";

import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";


/* --- Small icons kept inline for consistency --- */
const BriefcaseIcon: React.FC = () => (
    <svg width="32" height="36" viewBox="0 0 32 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0)">
            <path d="M11.5 3H20.5M13 3V12M19 3V12M10.75 30.75V33H11.5V30.75M21.25 30.75V33H20.5V30.75M13 16.5V26.25M19 16.5V26.25M22 12H10C9.20435 12 8.44129 12.3161 7.87868 12.8787C7.31607 13.4413 7 14.2044 7 15V27.75C7 28.5457 7.31607 29.3087 7.87868 29.8713C8.44129 30.4339 9.20435 30.75 10 30.75H22C22.7957 30.75 23.5587 30.4339 24.1213 29.8713C24.6839 29.3087 25 28.5457 25 27.75V15C25 14.2044 24.6839 13.4413 24.1213 12.8787C23.5587 12.3161 22.7957 12 22 12Z" stroke="#003459" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
            <clipPath id="clip0"><rect width="32" height="32" fill="white" transform="translate(0 2)" /></clipPath>
        </defs>
    </svg>
);

const CalendarIcon: React.FC = () => (
    <svg width="32" height="36" viewBox="0 0 32 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4.12 14.54H27.89" stroke="#003459" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M21.39 4.66V9.05" stroke="#003459" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10.62 4.66V9.05" stroke="#003459" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path fillRule="evenodd" clipRule="evenodd" d="M21.65 6.77H10.36C6.45 6.77 4 8.95 4 12.96V25.03C4 29.10 6.45 31.33 10.36 31.33H21.64C25.57 31.33 28 29.14 28 25.13V12.96C28.01 8.95 25.58 6.77 21.65 6.77Z" stroke="#003459" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

/* --- Types --- */
type TripType = "Oneway" | "Round";

interface LocationItem {
    id: string;
    label: string;
    city?: string;
}

/* --- Example location data (add more as needed) --- */
const SAMPLE_LOCATIONS: LocationItem[] = [
    { id: "pc_airport", label: "Punta Cana Intl Airport", city: "Punta Cana" },
    { id: "hotel_king", label: "Hotel King", city: "Punta Cana" },
    { id: "bavaro_beach", label: "Bavaro Beach", city: "Punta Cana" },
    { id: "hard_rock", label: "Hard Rock Hotel", city: "Punta Cana" },
    { id: "sd_airport", label: "Santo Domingo Airport", city: "Santo Domingo" },
];

const formatDisplayDate = (isoDate?: string, time?: string) => {
    if (!isoDate) return "";
    const d = new Date(isoDate + "T00:00:00");
    const dayName = d.toLocaleDateString("en-US", { weekday: "short" });
    const monthName = d.toLocaleDateString("en-US", { month: "long" });
    return `${dayName}, ${monthName} ${d.getDate()}${time ? ` | ${time}` : ""}`;
};

/* --- Hook to close popups on outside click --- */
const useOutsideAlerter = (ref: React.RefObject<HTMLElement>, onOutside: () => void) => {
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                onOutside();
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [ref, onOutside]);
};

/* --- Main component --- */
const RescheduleRideForm: React.FC = () => {
    const router = useRouter();

    // Booking state (driven by controlled sub-states below for clarity)
    const [tripType, setTripType] = useState<TripType>("Round");

    // Locations: searchable dropdowns
    const [pickupQuery, setPickupQuery] = useState("");
    const [dropoffQuery, setDropoffQuery] = useState("");
    const [pickupLoc, setPickupLoc] = useState<LocationItem>(SAMPLE_LOCATIONS[0]);
    const [dropoffLoc, setDropoffLoc] = useState<LocationItem>(SAMPLE_LOCATIONS[1]);
    const pickupRef = useRef<HTMLDivElement | null>(null);
    const dropoffRef = useRef<HTMLDivElement | null>(null);
    const [showPickupList, setShowPickupList] = useState(false);
    const [showDropoffList, setShowDropoffList] = useState(false);
    useOutsideAlerter(pickupRef, () => setShowPickupList(false));
    useOutsideAlerter(dropoffRef, () => setShowDropoffList(false));

    // Passengers dropdown (A: dropdown with +/-)
    const [showPassengers, setShowPassengers] = useState(false);
    const passengersRef = useRef<HTMLDivElement | null>(null);
    useOutsideAlerter(passengersRef, () => setShowPassengers(false));
    const [adults, setAdults] = useState(1);
    const [kids, setKids] = useState(0);

    // Date pickers (calendar popup B)
    const [showPickupCalendar, setShowPickupCalendar] = useState(false);
    const [showDropoffCalendar, setShowDropoffCalendar] = useState(false);
    const pickupCalRef = useRef<HTMLDivElement | null>(null);
    const dropoffCalRef = useRef<HTMLDivElement | null>(null);
    useOutsideAlerter(pickupCalRef, () => setShowPickupCalendar(false));
    useOutsideAlerter(dropoffCalRef, () => setShowDropoffCalendar(false));

    const [pickupDate, setPickupDate] = useState<string>(() => {
        // default today
        const t = new Date();
        return t.toISOString().slice(0, 10);
    });
    const [pickupTime, setPickupTime] = useState<string>("12:00");

    const [dropoffDate, setDropoffDate] = useState<string>(() => {
        const t = new Date();
        return t.toISOString().slice(0, 10);
    });
    const [dropoffTime, setDropoffTime] = useState<string>("12:00");

    // Suitcase qty (A: inline counter)
    // const [suitcases, setSuitcases] = useState<number>(2);

    /* --- Helpers --- */
    const filteredPickup = SAMPLE_LOCATIONS.filter((l) =>
        l.label.toLowerCase().includes(pickupQuery.toLowerCase())
    );
    const filteredDropoff = SAMPLE_LOCATIONS.filter((l) =>
        l.label.toLowerCase().includes(dropoffQuery.toLowerCase())
    );

    const handleSwapLocations = () => {
        setPickupLoc(prev => {
            const old = prev;
            setDropoffLoc(old);
            return dropoffLoc;
        });
    };

    const handleSelectPickup = (loc: LocationItem) => {
        setPickupLoc(loc);
        setPickupQuery("");
        setShowPickupList(false);
    };

    const handleSelectDropoff = (loc: LocationItem) => {
        setDropoffLoc(loc);
        setDropoffQuery("");
        setShowDropoffList(false);
    };

    const handleSubmit = (e?: React.FormEvent) => {
        e?.preventDefault();
        // validation: if Round ensure dropoff date exists
        if (tripType === "Round" && !dropoffDate) {
            alert("Please choose a drop-off date");
            return;
        }

        // build query
        const params = new URLSearchParams({
            tripType,
            pickupLocation: pickupLoc.label,
            dropoffLocation: dropoffLoc.label,
            pickupCity: pickupLoc.city || "",
            dropoffCity: dropoffLoc.city || "",
            pickupDate,
            pickupTime,
            dropoffDate: tripType === "Round" ? dropoffDate : "",
            dropoffTime: tripType === "Round" ? dropoffTime : "",
            adults: adults.toString(),
            kids: kids.toString(),
            suitcases: suitcases.toString(),
        }).toString();

        router.push(`/car-booking?${params}`);
    };

    /* --- Render helpers for existing UI look --- */
    const renderLocationInputBlock = (
        label: string,
        selected: LocationItem,
        query: string,
        setQuery: (v: string) => void,
        showList: boolean,
        setShowList: (v: boolean) => void,
        list: LocationItem[],
        onSelect: (loc: LocationItem) => void,
        containerRef: React.RefObject<HTMLDivElement>
    ) => (
        <div className="flex flex-col gap-2 w-[326px]" ref={containerRef}>
            <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin size={20} className="text-gray-600" />
                <span>{label}</span>
            </div>

            <div className="relative">
                <input
                    type="text"
                    className="w-full text-[28px] font-semibold tracking-[-0.02em] text-[#191919] bg-transparent border-none outline-none"
                    value={query || selected.label}
                    onFocus={() => setShowList(true)}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setShowList(true);
                    }}
                    placeholder={selected.label}
                />

                {/* Location list dropdown */}
                {showList && (
                    <div className="absolute top-[64px] left-0 w-full max-h-[256px] overflow-y-auto bg-white shadow-2xl rounded-lg z-30">
                        {list.length === 0 ? (
                            <div className="p-3 text-sm text-gray-500">No locations</div>
                        ) : (
                            list.map((loc) => (
                                <button
                                    key={loc.id}
                                    type="button"
                                    onClick={() => onSelect(loc)}
                                    className="w-full text-left p-3 hover:bg-gray-100 flex flex-col gap-1"
                                >
                                    <span className="font-normal text-[16px] text-[#191919]">{loc.label}</span>
                                    <span className="text-xs text-[#878D97]">{loc.city}</span>
                                </button>
                            ))
                        )}
                    </div>
                )}
            </div>

            <div className="text-xs text-gray-500 -mt-4 mb-1">{selected.city}</div>
        </div>
    );


    const renderCountInput = (label: string, value: string, iconType: "user" | "suitcase") => {
        return (
            <div className="flex items-center bg-[#F4F7F9] rounded-xl p-4 gap-3 w-[220px] h-[68px]">
                <div className="w-8 h-8 flex items-center justify-center text-blue-900">
                    {iconType === "user" ? (
                        <svg width="32" height="36" viewBox="0 0 32 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21.36 29.43L21.368 25.14C21.368 22.77 19.45 20.857 17.082 20.857H7.486C5.119 20.857 3.201 22.775 3.201 25.142L3.2 29.428" stroke="#003459" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    ) : (
                        <BriefcaseIcon />
                    )}
                </div>
                <div className="flex flex-col">
                    <span className="text-[13px] text-[#878D97] leading-4">{label}</span>
                    <span className="text-sm font-normal text-[#191919] leading-5">{value}</span>
                </div>
            </div>
        );
    };

    // function setInfant(arg0: (i: any) => number): void {
    //   throw new Error("Function not implemented.");
    // }
    const [infant, setInfant] = useState<number>(0);

    const [suitcases, setSuitcases] = useState(0);
    const [carryOn, setCarryOn] = useState(0);

    const [showTraveler, setShowTraveler] = useState(false);



    return (
        <div className="flex flex-col items-center p-0  ">


            {/* <form onSubmit={handleSubmit} className="bg-white rounded-[24px] p-8 w-[1116px] max-w-[1116px] shadow"> */}
            <form onSubmit={handleSubmit} className="bg-white rounded-[24px] w-[1116px] max-w-[1116px]  p-8 ">

                <div className="flex flex-col gap-6 w-full">
                    {/* Trip Type Toggle */}
                    <div className="flex p-1 bg-[#EDF2F9] rounded-full w-[232px]">
                        {(["Oneway", "Round"] as TripType[]).map((type) => (
                            <button
                                key={type}
                                type="button"
                                onClick={() => {
                                    setTripType(type);
                                    if (type === "Oneway") {
                                        // clear dropoff when switching to oneway
                                        setDropoffDate("");
                                        setDropoffTime("");
                                    } else if (!dropoffDate) {
                                        // set default dropoff date equal to pickup if none
                                        setDropoffDate(pickupDate);
                                        setDropoffTime(pickupTime);
                                    }
                                }}
                                className={`px-3 py-2 text-sm leading-6 rounded-full transition-colors w-[112px] h-[40px] ${tripType === type ? "bg-[#EE2552] text-white font-medium" : "text-gray-600 font-normal"}`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>

                    {/* Row 1 */}
                    <div className="flex items-start text-left justify-between">
                        <div className="flex items-center gap-14">
                            {/* Pickup */}
                            {renderLocationInputBlock(
                                "Pick-up location",
                                pickupLoc,
                                pickupQuery,
                                setPickupQuery,
                                showPickupList,
                                setShowPickupList,
                                filteredPickup,
                                handleSelectPickup,
                                pickupRef
                            )}

                            {/* Swap */}
                            <button
                                type="button"
                                onClick={() => {
                                    // swap values
                                    setPickupLoc(prev => {
                                        setDropoffLoc(prevDrop => {
                                            return prev;
                                        });
                                        return dropoffLoc;
                                    });
                                }}
                                className="bg-[#FAA523] p-[10px] rounded-full w-10 h-10 flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity mt-4"
                            >
                                <ArrowDownUp size={20} className="text-white rotate-90" />
                            </button>

                            {/* Dropoff */}
                            {renderLocationInputBlock(
                                "Drop-of location",
                                dropoffLoc,
                                dropoffQuery,
                                setDropoffQuery,
                                showDropoffList,
                                setShowDropoffList,
                                filteredDropoff,
                                handleSelectDropoff,
                                dropoffRef
                            )}
                        </div>

                        {/* Passenger summary + trigger */}
                        <div ref={passengersRef} className="relative">

                            {/* CLICKABLE PASSENGER BOX */}
                            <div
                                onClick={() => setShowPassengers((s) => !s)}
                                className="
      cursor-pointer 
      flex items-start gap-[8px]
      w-[220px] h-[68px]
      bg-[#F4F7F9]
      rounded-[16px]
      px-[20px] py-[16px]
    "
                            >
                                {/* LEFT: ICON BOX */}
                                <div className="relative flex items-center justify-center w-[32px] h-[36px]">
                                    <div className="w-[32px] h-[32px] rounded-md relative">
                                        <svg width="32" height="36" viewBox="0 0 32 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M21.3674 29.4278L21.3678 25.1428C21.368 22.7758 19.4493 20.857 17.0824 20.857H7.48608C5.11951 20.857 3.20094 22.7753 3.20068 25.1419L3.2002 29.4278M28.7998 29.428L28.8002 25.143C28.8004 22.7761 26.8817 20.8572 24.5148 20.8572M20.542 7.41414C21.5944 8.19499 22.2764 9.4468 22.2764 10.8579C22.2764 12.269 21.5944 13.5208 20.542 14.3017M16.6586 10.8577C16.6586 13.2244 14.74 15.1431 12.3732 15.1431C10.0064 15.1431 8.08778 13.2244 8.08778 10.8577C8.08778 8.49091 10.0064 6.57227 12.3732 6.57227C14.74 6.57227 16.6586 8.49091 16.6586 10.8577Z"
                                                stroke="#003459"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>


                                    </div>
                                </div>

                                {/* RIGHT: LABEL + VALUE */}
                                <div className="flex flex-col w-[136px] h-[36px]">
                                    <div className="text-[13px] leading-[16px] font-rubik text-[#878D97]">
                                        Passenger
                                    </div>
                                    <div className="text-[14px] leading-[20px] font-rubik text-[#191919] truncate">
                                        {adults} Adults, {kids} Kids
                                    </div>
                                </div>
                            </div>

                            {/* DROPDOWN MENU */}
                            {showPassengers && (
                                <div
                                    className="
      absolute z-40 bg-white rounded-[16px] shadow-[0px_24px_48px_-12px_rgba(16,24,40,0.18)]
      w-[444px] h-[280px] p-8 flex flex-col gap-[18px]
    "
                                    style={{ top: "100%", right: 0 }}
                                >
                                    {/* Title */}
                                    <div className="flex flex-col gap-[18px] w-[380px] mx-auto">
                                        <div className="flex flex-col gap-6 w-full">

                                            {/* Traveler Header */}
                                            <div className="flex flex-col gap-2 w-full">
                                                <div className="flex items-center justify-between pb-2">
                                                    <p className="text-[16px] font-medium text-[#191919] font-rubik">
                                                        Traveler
                                                    </p>
                                                </div>

                                                {/* COUNTER LIST */}
                                                <div className="flex flex-col gap-5 w-full">

                                                    {/* ADULT */}
                                                    <div className="flex items-center justify-between w-full">
                                                        {/* Label */}
                                                        <div className="flex items-center gap-1">
                                                            <p className="text-[14px] text-[#191919] font-rubik">Adult</p>
                                                            <p className="text-[13px] text-[#878D97] font-rubik">(12–99 years old)</p>
                                                        </div>

                                                        {/* Counter */}
                                                        <div className="flex items-center gap-2">
                                                            <button
                                                                type="button"
                                                                onClick={() => setAdults((a) => Math.max(1, a - 1))}
                                                                className="w-6 h-6 flex items-center justify-center rounded-full border border-[#878D97] text-[#878D97]"
                                                            >
                                                                –
                                                            </button>

                                                            <div className="w-6 text-center text-[16px] text-[#191919]">{adults}</div>

                                                            <button
                                                                type="button"
                                                                onClick={() => setAdults((a) => a + 1)}
                                                                className="w-6 h-6 flex items-center justify-center rounded-full border border-[#EE2552] text-[#EE2552]"
                                                            >
                                                                +
                                                            </button>
                                                        </div>
                                                    </div>

                                                    {/* CHILD */}
                                                    <div className="flex items-center justify-between w-full">
                                                        <div className="flex items-center gap-1">
                                                            <p className="text-[14px] text-[#191919] font-rubik">Child</p>
                                                            <p className="text-[13px] text-[#878D97] font-rubik">(3–11 years old)</p>
                                                        </div>

                                                        <div className="flex items-center gap-2">
                                                            <button
                                                                type="button"
                                                                onClick={() => setKids((k) => Math.max(0, k - 1))}
                                                                className="w-6 h-6 flex items-center justify-center rounded-full border border-[#878D97] text-[#878D97]"
                                                            >
                                                                –
                                                            </button>

                                                            <div className="w-6 text-center text-[16px] text-[#191919]">{kids}</div>

                                                            <button
                                                                type="button"
                                                                onClick={() => setKids((k) => k + 1)}
                                                                className="w-6 h-6 flex items-center justify-center rounded-full border border-[#EE2552] text-[#EE2552]"
                                                            >
                                                                +
                                                            </button>
                                                        </div>
                                                    </div>

                                                    {/* INFANT */}
                                                    <div className="flex items-center justify-between w-full">
                                                        <div className="flex items-center gap-1">
                                                            <p className="text-[14px] text-[#191919] font-rubik">Infant</p>
                                                            <p className="text-[13px] text-[#878D97] font-rubik">(0–2 years old)</p>
                                                        </div>

                                                        <div className="flex items-center gap-2">
                                                            <button
                                                                type="button"
                                                                onClick={() => setInfant((i) => Math.max(0, i - 1))}
                                                                className="w-6 h-6 flex items-center justify-center rounded-full border border-[#878D97] text-[#878D97]"
                                                            >
                                                                –
                                                            </button>

                                                            <div className="w-6 text-center text-[16px] text-[#191919]">{infant}</div>

                                                            <button
                                                                type="button"
                                                                onClick={() => setInfant((i) => i + 1)}
                                                                className="w-6 h-6 flex items-center justify-center rounded-full border border-[#EE2552] text-[#EE2552]"
                                                            >
                                                                +
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* APPLY BUTTON */}
                                            <button
                                                onClick={() => setShowPassengers(false)}
                                                className="
            w-[380px] h-[40px] bg-[#EE2552] text-white rounded-[8px] 
            text-[14px] font-medium font-rubik flex items-center justify-center
          "
                                            >
                                                Apply
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}


                        </div>

                    </div>

                    <div className="border-t border-[#DADFE6] w-full" />

                    {/* Row 2: Dates, Suitcases, Search */}
                    <div className="flex items-center text-left gap-[16px]">
                        {/* Pickup date/time */}
                        <div className="relative" ref={pickupCalRef}>
                            <div className="flex items-center bg-[#F4F7F9] rounded-xl p-4 gap-3 w-[246px] h-[68px] cursor-pointer" onClick={() => setShowPickupCalendar(true)}>
                                <div className="w-8 h-8 flex items-center justify-center">
                                    <CalendarIcon />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[13px] text-[#878D97] leading-4">Pickup date</span>
                                    <span className="text-[14px] font-medium text-[#191919] leading-5">{formatDisplayDate(pickupDate, pickupTime)}</span>
                                </div>
                            </div>

                            {showPickupCalendar && (

                                <div
                                    className="
    absolute left-0 top-[103px]
    w-[444px] 
    bg-white rounded-[16px]
    shadow-[0px_24px_48px_-12px_rgba(16,24,40,0.18)]
    p-6 z-50
    flex flex-col gap-4
  "
                                >
                                    <div className="flex flex-col gap-4 w-full">
                                        {/* Date */}
                                        <div className="flex flex-col gap-1 w-full">
                                            <label className="text-xs text-gray-600">Date</label>
                                            <input
                                                type="date"
                                                value={pickupDate}
                                                onChange={(e) => {
                                                    setPickupDate(e.target.value);
                                                    if (tripType === "Round" && !dropoffDate) {
                                                        setDropoffDate(e.target.value);
                                                    }
                                                }}
                                                className="w-full p-3 border rounded-lg text-gray-800"
                                            />
                                        </div>

                                        {/* Time */}
                                        <div className="flex flex-col gap-1 w-full">
                                            <label className="text-xs text-gray-600">Time</label>
                                            <input
                                                type="time"
                                                value={pickupTime}
                                                onChange={(e) => setPickupTime(e.target.value)}
                                                className="w-full p-3 border rounded-lg text-gray-800"
                                            />
                                        </div>


                                        <div className="flex justify-center w-full mt-2">
                                            <button
                                                type="button"
                                                onClick={() => setShowPickupCalendar(false)}
                                                className="
      flex items-center justify-center
      px-8 py-2 gap-2
      w-[372px] h-10
      bg-[#EE2552] text-white
      rounded-lg
      text-[14px] font-normal leading-[24px] font-[Rubik]
    "
                                            >
                                                Apply
                                            </button>
                                        </div>

                                    </div>
                                </div>

                            )}





                        </div>

                        {/* Drop-off date/time (conditional) */}
                        {tripType === "Round" && (
                            <div className="relative" ref={dropoffCalRef}>
                                <div className="flex items-center bg-[#F4F7F9] rounded-xl p-4 gap-3 w-[246px] h-[68px] cursor-pointer" onClick={() => setShowDropoffCalendar(true)}>
                                    <div className="w-8 h-8 flex items-center justify-center">
                                        <CalendarIcon />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[13px] text-[#878D97] leading-4">Drop of date</span>
                                        <span className="text-[14px] font-medium text-[#191919] leading-5">{formatDisplayDate(dropoffDate, dropoffTime)}</span>
                                    </div>
                                </div>

                                {showDropoffCalendar && (
                                    <div
                                        className="
    absolute left-0 top-[103px]
    w-[444px]
    bg-white rounded-[16px]
    shadow-[0px_24px_48px_-12px_rgba(16,24,40,0.18)]
    p-6 z-50
    flex flex-col gap-4
  "
                                    >
                                        <div className="flex flex-col gap-4 w-full">
                                            {/* DATE */}
                                            <div className="flex flex-col gap-1 w-full">
                                                <label className="text-xs text-gray-600">Date</label>
                                                <input
                                                    type="date"
                                                    value={dropoffDate}
                                                    onChange={(e) => setDropoffDate(e.target.value)}
                                                    min={pickupDate}
                                                    className="w-full p-3 border rounded-lg text-gray-800"
                                                />
                                            </div>

                                            {/* TIME */}
                                            <div className="flex flex-col gap-1 w-full">
                                                <label className="text-xs text-gray-600">Time</label>
                                                <input
                                                    type="time"
                                                    value={dropoffTime}
                                                    onChange={(e) => setDropoffTime(e.target.value)}
                                                    className="w-full p-3 border rounded-lg text-gray-800"
                                                />
                                            </div>

                                            {/* SAVE BUTTON — Figma Style */}
                                            <div className="w-full flex justify-center mt-2">
                                                <button
                                                    type="button"
                                                    onClick={() => setShowDropoffCalendar(false)}
                                                    className="
          w-full max-w-[372px] h-[40px]
          flex items-center justify-center
          px-8 py-2 gap-2
          bg-[#EE2552] text-white
          rounded-lg text-[14px] leading-[24px] font-normal
        "
                                                >
                                                    Apply
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                )}
                            </div>
                        )}



                        <div
                            className="flex items-center bg-[#F4F7F9] rounded-xl p-4 gap-3 w-[246px] h-[68px] cursor-pointer"
                            onClick={() => setShowTraveler((prev) => !prev)}
                        >
                            <div className="w-8 h-8 flex items-center justify-center">
                                <BriefcaseIcon />
                            </div>

                            <div className="flex-1">
                                <div className="text-[13px] text-[#878D97]">Suitcase qty</div>
                                <div className="text-[14px] text-[#191919]">{suitcases} pcs</div>
                            </div>
                        </div>

                        {showTraveler && (
                            <TravelerSelector
                                suitcases={suitcases}
                                setSuitcases={setSuitcases}
                                carryOn={carryOn}
                                setCarryOn={setCarryOn}
                                onClose={() => setShowTraveler(false)}
                            />
                        )}

                        {/* Find Cars Button */}
                        {/* <button
                            onClick={handleSubmit}
                            type="button"
                            className="ml-auto flex items-center justify-center bg-[#EE2552] text-white rounded-[16px] px-[6px] py-[12px] gap-[20px] w-[220px] h-[68px] font-rubik font-medium text-[18px] leading-[24px] transition-colors hover:bg-[#d82047]"
                        >
                            Find cars
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button> */}
                    </div>

                    {/* Find Cars Button */}
                        <button
                            onClick={handleSubmit}
                            type="button"
                            className="ml-auto flex items-center justify-center bg-[#EE2552] text-white rounded-[16px] px-[6px] py-[12px] gap-[20px] w-full h-[68px] font-rubik font-medium text-[18px] leading-[24px] transition-colors hover:bg-[#d82047]"
                        >
                            Find cars
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                </div>
            </form>
        </div>
    );
};

export default RescheduleRideForm;
