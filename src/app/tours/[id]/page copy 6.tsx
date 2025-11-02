// app/tours/[id]/page.tsx
'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import Layout from "@/components/layout/Layout";
import {
  Star,
  Calendar,
  MapPin,
  Users,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  TrendingUp,
  Tag,
  ThumbsUp,
  CreditCard,
  Briefcase,
  Trophy,
  MessageSquare,
  Book, Accessibility, Leaf, ChevronDown,
  Quote, Check, DollarSign, X, Shield
} from 'lucide-react';
import FeaturedTours from '@/components/home/FeaturedTours';

// --- Type Definitions ---

type TourAPI = {
  _id?: string;
  id?: string;
  title?: string;
  image?: string;
  gallery?: string[];
  description?: string;
  duration?: string;
  location?: string;
  pickup?: string;
  price?: number;
  originalPrice?: number;
  discount?: number;
  rating?: number;
  reviewCount?: number;
  included?: string[];
  excluded?: string[];
  itinerary?: { time?: string; text?: string }[];
  overview?: string;
};

const FALLBACK_TOUR: Required<Pick<
  TourAPI,
  | 'id'
  | 'title'
  | 'image'
  | 'gallery'
  | 'description'
  | 'duration'
  | 'location'
  | 'pickup'
  | 'price'
  | 'originalPrice'
  | 'discount'
  | 'rating'
  | 'reviewCount'
  | 'included'
  | 'excluded'
  | 'itinerary'
  | 'overview'
>> = {
  id: 'fallback-1',
  title: 'Santo Domingo City Tour',
  image: '/images/tours/Santo-Domingo-City-Tour-cityTour.png',
  gallery: [
    '/images/tours/Santo-Domingo-City-Tour-cityTour.png',
    '/images/tours/From-Santo-Domingo.png',
    '/images/tours/Tapas-Tour.png',
  ],
  description:
    'Santo Domingo is the capital of the Dominican Republic and a cultural hub — visit the Colonial Zone, museums and local markets in this full-day guided tour.',
  duration: 'Full Day (4-10 hours)',
  location: 'Santo Domingo, Dominican Republic',
  pickup: 'Hotel lobby / Meeting Point',
  price: 89,
  originalPrice: 120,
  discount: 25,
  rating: 4.5,
  reviewCount: 25,
  included: ['Hotel pickup and drop-off', 'Guide', 'All entrance fees'],
  excluded: ['Meals', 'Gratuities', 'Personal expenses'],
  itinerary: [
    { time: '07:30 AM', text: 'Hotel pickup & transfer to Colonial Zone' },
    { time: '08:00 AM', text: 'Guided walking tour: Alcázar, Cathedral' },
    { time: '01:00 PM', text: 'Lunch break (not included)' },
    { time: '04:30 PM', text: 'Return to hotel' },
  ],
  overview:
    'A recommended experience for all travelers — discover the first European settlement in the Americas and UNESCO World Heritage sites.',
};

// --- Helper Components for UI Structure ---

interface HighlightCardProps {
  title: string;
  imageSrc: string;
}

const HighlightCard: React.FC<HighlightCardProps> = ({ title, imageSrc }) => (
  <div className="flex flex-col items-center justify-start text-center p-2 rounded-lg bg-white shadow-sm border border-gray-100 min-w-[120px] max-w-[150px]">
    <Image
      src={imageSrc}
      alt={title}
      width={120}
      height={80}
      className="w-full h-20 object-cover rounded-md mb-2"
    />
    <p className="text-xs font-medium text-gray-700 h-4 line-clamp-2">{title}</p>
  </div>
);

interface ReviewCardProps {
  name: string;
  rating: number;
  review: string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ name, rating, review }) => (
  <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100 min-w-[300px] max-w-sm">
    <div className="flex items-center mb-2">
      <div className="flex text-yellow-500">
        {Array(Math.round(rating)).fill(0).map((_, i) => <Star key={i} className="w-4 h-4 fill-yellow-500" />)}
        {Array(5 - Math.round(rating)).fill(0).map((_, i) => <Star key={i} className="w-4 h-4 text-gray-300" />)}
      </div>
      <span className="ml-2 text-sm font-semibold text-gray-800">{rating.toFixed(1)}</span>
    </div>
    <p className="text-sm text-gray-600 italic leading-relaxed line-clamp-3 mb-3">"{review}"</p>
    <div className="text-xs font-medium text-gray-500">
      — {name}
    </div>
  </div>
);


// --- Main Component ---

export default function TourDetailsPage() {
  const router = useRouter();
  const pathname = usePathname();
  // derive id from path: /tours/[id]
  const id = pathname?.split('/').pop() ?? FALLBACK_TOUR.id;

  const [tour, setTour] = useState<TourAPI | null>(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  // booking state
  const [adults, setAdults] = useState<number>(1);
  const [children, setChildren] = useState<number>(0);
  const [infants, setInfants] = useState<number>(0);

  // date selection
  const todayIso = new Date().toISOString().slice(0, 10);
  const [date, setDate] = useState<string>(todayIso);

  // gallery index. -1 represents the main image (chosenTour.image)
  const [activeIdx, setActiveIdx] = useState(-1);

  // Scroll state for sidebar (optional, but part of the previous code)
  const [isSidebarFixed, setIsSidebarFixed] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarFixed(false);
        return;
      }
      const sidebarTop = 300;
      setIsSidebarFixed(window.scrollY > sidebarTop);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      setFetchError(null);
      try {
        const res = await fetch(`/api/tours/${id}`, { cache: 'no-store' });
        if (!res.ok) {
          throw new Error(`API returned ${res.status}`);
        }
        const data = await res.json();
        if (mounted) {
          setTour({ ...data, id: data.id ?? data._id });
        }
      } catch (err: any) {
        console.warn('Tour fetch failed, using fallback', err);
        setFetchError('Unable to load tour from API — showing default content.');
        setTour(FALLBACK_TOUR);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, [id]);

  const chosenTour = useMemo(() => {
    if (!tour) return FALLBACK_TOUR;
    return {
      id: (tour.id ?? tour._id) ?? FALLBACK_TOUR.id,
      title: tour.title ?? FALLBACK_TOUR.title,
      image: tour.image ?? FALLBACK_TOUR.image,
      // Ensure gallery is an array, falling back if empty/null
      gallery: (tour.gallery && tour.gallery.length > 0 ? tour.gallery : FALLBACK_TOUR.gallery) ?? FALLBACK_TOUR.gallery,
      description: tour.description ?? FALLBACK_TOUR.description,
      duration: tour.duration ?? FALLBACK_TOUR.duration,
      location: tour.location ?? FALLBACK_TOUR.location,
      pickup: tour.pickup ?? FALLBACK_TOUR.pickup,
      price: typeof tour.price === 'number' ? tour.price : FALLBACK_TOUR.price,
      originalPrice: typeof tour.originalPrice === 'number' ? tour.originalPrice : FALLBACK_TOUR.originalPrice,
      discount: typeof tour.discount === 'number' ? tour.discount : FALLBACK_TOUR.discount,
      rating: typeof tour.rating === 'number' ? tour.rating : FALLBACK_TOUR.rating,
      reviewCount: typeof tour.reviewCount === 'number' ? tour.reviewCount : FALLBACK_TOUR.reviewCount,
      included: tour.included ?? FALLBACK_TOUR.included,
      excluded: tour.excluded ?? FALLBACK_TOUR.excluded,
      itinerary: tour.itinerary ?? FALLBACK_TOUR.itinerary,
      overview: tour.overview ?? FALLBACK_TOUR.overview,
    } as Required<TourAPI>;
  }, [tour]);

  // price calc
  const subtotal = useMemo(() => {
    const adultPrice = chosenTour.price * adults;
    const childPrice = (chosenTour.price * 0.5) * children;
    const infantPrice = 0; // free
    return adultPrice + childPrice + infantPrice;
  }, [chosenTour, adults, children, infants]);

  const tax = useMemo(() => subtotal * 0.1, [subtotal]); // 10% tax
  const total = useMemo(() => subtotal + tax, [subtotal, tax]);

  // --- FIX: Moved this useMemo BEFORE the conditional return (if loading) ---
  const galleryThumbs = useMemo(() => {
    // Filter out the main image if it's explicitly the first in the gallery,
    // to ensure we get distinct gallery images for thumbnails.
    // If the gallery already contains unique images, this will just take the first two.
    const uniqueGallery = chosenTour.gallery.filter(g => g !== chosenTour.image);

    // If the main image wasn't in the gallery, just take the first two.
    // Otherwise, try to take the next two distinct images after the main one.
    // This logic ensures we show up to 2 *additional* gallery images.
    const startIndex = chosenTour.gallery.indexOf(chosenTour.image) === 0 ? 1 : 0;
    return chosenTour.gallery.slice(startIndex, startIndex + 1);

  }, [chosenTour.gallery, chosenTour.image]);
  // -------------------------------------------------------------------------


  // booking action
  const handleBookNow = () => {
    const bookingPayload = {
      id: chosenTour.id,
      title: chosenTour.title,
      price: chosenTour.price,
      adults,
      children,
      infants,
      date,
      subtotal,
      tax,
      total,
      pickupPlace: chosenTour.pickup ?? '',
    };
    localStorage.setItem('selectedTour', JSON.stringify(bookingPayload));
    router.push(`/payment/${chosenTour.id}`);
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
          <div className="text-gray-600">Loading tour details…</div>
        </div>
      </Layout>
    );
  }

  // --- Render ---

  // Determine the source for the large image
  const mainImageSrc = activeIdx === -1
    ? chosenTour.image
    : chosenTour.gallery[activeIdx];

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 text-black">
        <div className="container mx-auto px-4 lg:px-4 pt-4">

          {/* Top Section: Header and Gallery */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-6">
              {/* <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 leading-tight">{chosenTour.title}</h1> */}
              {/* <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-5 h-5 text-gray-400" />
                <span className="text-base lg:text-lg font-medium text-gray-700">{chosenTour.location}</span>
              </div> */}
            </div>

            {/* Gallery Section */}
            <div className="rounded-xl overflow-hidden  border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                {/* Left Large Image */}
                <div className="col-span-2 relative h-[400px] md:h-[500px]">
                  <Image
                    src={mainImageSrc}
                    alt={`${chosenTour.title} main image`}
                    fill
                    className="object-cover transition-opacity rounded-xl duration-300"
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 700px"
                  />
                  {/* Rating/Review Badge */}
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg flex items-center gap-2 text-sm font-semibold">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span>{chosenTour.rating?.toFixed(1)}</span>
                    <span className="text-gray-500 font-normal">({chosenTour.reviewCount} Reviews)</span>
                  </div>
                  {/* Discount Badge */}
                  {chosenTour.discount && (
                    <div className="absolute top-4 left-4 bg-rose-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg tracking-wider">
                      SAVE {chosenTour.discount}%
                    </div>
                  )}
                </div>

                {/* Right Vertical Thumbnails */}
                <div className="flex flex-col gap-2 p-2">

                  {/* 1. Main Image Thumbnail (activeIdx = -1) */}
                  <button
                    key="main-image-thumb"
                    onClick={() => { setActiveIdx(-1); }}
                    className={`relative w-full h-[160px] md:h-[244px] overflow-hidden rounded-lg border-2 transition-all duration-200 ${activeIdx === -1 ? 'border-rose-500 shadow-lg ring-2 ring-rose-500' : 'border-gray-200 hover:border-gray-300'}`}
                  >
                    <Image
                      src={chosenTour.image}
                      alt={`${chosenTour.title} thumb 1`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </button>

                  {/* 2 & 3. Gallery Thumbnails (activeIdx = 0, 1) */}
                  {galleryThumbs.map((g, i) => (
                    <button
                      key={g + i}
                      onClick={() => { setActiveIdx(i); }} // activeIdx 0 and 1
                      className={`relative w-full h-[160px] md:h-[244px] overflow-hidden rounded-lg border-2 transition-all duration-200 ${activeIdx === i ? 'border-rose-500 shadow-lg ring-2 ring-rose-500' : 'border-gray-200 hover:border-gray-300'}`}
                    >
                      <Image
                        src={g}
                        alt={`${chosenTour.title} thumb ${i + 2}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-4">

            {/* Left / Main Content Column */}
            <div className="lg:col-span-2 space-y-4">
              {/* <div>Home>Tour>Dominican Repubic>Santo Domingo>Santo Domingo City Tour</div> */}

              <div className=" text-gray-900 px-6 pb-6">

                {/* 1. Breadcrumb Navigation: Home > Tour > ... */}
                <div className="text-[13px] font-[400] text-[#A9B1B7] mb-3">
                  <span className="hover:text-blue-600 cursor-pointer">Home</span>
                  <span className="mx-1">&gt;</span>
                  <span className="hover:text-blue-600 cursor-pointer">Tour</span>
                  <span className="mx-1">&gt;</span>
                  <span className="hover:text-blue-600 cursor-pointer">Dominican Republic</span>
                  {/* <span className="mx-1">&gt;</span>
                  <span className="hover:text-blue-600 cursor-pointer">Santo Domingo</span> */}
                  <span className="mx-1">&gt;</span>
                  <span className="text-gray-900 font-normal">{chosenTour.title}</span>
                </div>

                {/* 2. Main Title */}
                <h1 className="text-[32px] lg:text-[40px] font-[500] text-[#191919] leading-tight">
                  {chosenTour.title}
                </h1>

                {/* 3. Rating Section: 4.5 (25 Reviews) */}
                <div className="flex items-center text-sm mt-2 mb-4">
                  {/* Using a generic Star component for rating */}
                  <Star className="w-4 text-[#FAA523] h-4 fill-[#FAA523]" />
                  <Star className="w-4 h-4 text-[#FAA523] fill-[#FAA523]" />
                  <Star className="w-4 h-4 text-[#FAA523] fill-[#FAA523]" />
                  <Star className="w-4 h-4 text-[#FAA523] fill-[#FAA523]" />
                  <Star className="w-4 h-4 text-[#FAA523] fill-[#FAA523] mr-2" />

                  {/* <span className="text-gray-900 font-semibold mr-1">4.5</span>
                  <span className="text-[#003459] hover:text-blue-700 cursor-pointer text-sm font-normal">
                    (25 Reviews)
                  </span> */}
                  <span className='text-[14px] font-[300]'>{chosenTour.rating?.toFixed(1)} </span>
                  <span className="text-gray-500 text-[14px] font-[300] ml-1"> ({chosenTour.reviewCount} Reviews)</span>
                </div>

                {/* 4. Information Cards (Grid Layout) */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4 -mb-16 relative z-10">

                  {/* Card 1: Duration - uses lucide-react 'Clock' */}
                  <div className="flex flex-col items-center justify-center p-6 bg-[#EFF2F880] rounded-xl text-center shadow">
                    {/* <Clock className="w-4 h-4 text-blue-900 opacity-80 mb-3" /> */}
                    <Image
                      src="/images/tours-id/duration-icon.png"
                      width={50}
                      height={50}
                      alt="Picture of the author"
                      className="w-[32px] h-[32px] text-blue-900 opacity-80 mb-3"
                    />
                    <span className=" text-[#191919] font-[500] text-[15px]">Duration</span>
                    <span className="text-[#878D97] font-[400] text-[13px] mt-1">10 Hours</span>
                  </div>

                  {/* Card 2: Pickup - uses lucide-react 'MapPin' */}
                  <div className="flex flex-col items-center justify-center p-6 bg-[#EFF2F880] rounded-xl text-center shadow">
                    <Image
                      src="/images/tours-id/Pickup.png"
                      width={50}
                      height={50}
                      alt="Picture of the author"
                      className="w-[32px] h-[32px] text-blue-900 opacity-80 mb-3"
                    />
                    <span className="text-[#191919] font-[500] text-[15px]">Pickup</span>
                    <span className="text-[#878D97] font-[400] text-[13px] mt-1">At your hotel lobby</span>
                  </div>

                  {/* Card 3: Availability - uses lucide-react 'Calendar' */}
                  <div className="flex flex-col items-center justify-center p-6 bg-[#EFF2F880] rounded-xl text-center shadow">
                    <Image
                      src="/images/tours-id/Availablilty.png"
                      width={50}
                      height={50}
                      alt="Picture of the author"
                      className="w-[32px] h-[32px] text-blue-900 opacity-80 mb-3"
                    />
                    <span className="text-[#191919] font-[500] text-[15px]">Availability</span>
                    <span className="text-[#878D97] font-[400] text-[13px] mt-1">Everyday</span>
                  </div>

                  {/* Card 4: Guide Language - uses lucide-react 'MessageSquare' for the chat bubble icon */}
                  <div className="flex flex-col items-center justify-center p-6 bg-[#EFF2F880] rounded-xl text-center shadow">
                    <Image
                      src="/images/tours-id/Guide-Language.png"
                      width={50}
                      height={50}
                      alt="Picture of the author"
                      className="w-[32px] h-[32px] text-blue-900 opacity-80 mb-3"
                    />
                    <span className="text-[#191919] font-[500] text-[15px]">Guide Language</span>
                    <span className="text-[#878D97] font-[400] text-[13px] mt-1">Your preferred language</span>
                  </div>
                </div>
              </div>

              {/* Remaining Content */}
              <div className="">
                {/* Content of the next section starts here */}
              </div>

              {/* ------------------+-------------------------+----------------------------------- */}


              {/* Main container for the entire content area, immediately following the header/cards.
    Using a light gray background for the overall page content. */}
              <div className="bg-gray-50 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4">

                  {/* Overview Section */}
                  <section className="mb-12">
                    <h2 className="text-[28px] font-[500] text-[#191919] mb-4">Overview</h2>
                    <p className="text-gray-700 leading-relaxed mb-4 text-[14px] font-[400]">
                      Santo Domingo, the capital city of the Dominican Republic, is the economic, political and cultural center of the country and the Caribbean's most populous city. Located on the Caribbean Sea at the mouth of the Ozama River, the city was founded by Bartholomew Columbus in 1496, making it the first permanent European settlement in the Americas. It is also, incredibly, the first city in the Americas to host a university, hospital, cathedral, and customs house.
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-4 text-[14px] font-[400]">
                      The city is home to the first cathedral, hospital, customs house and university in the Americas. It is a UNESCO World Heritage Site.
                    </p>
                    <button className="text-[#EE2552] text-[16px] font-[500] hover:underline font-semibold">
                      See more
                    </button>
                  </section>
                  {/* Tour Highlights Section */}
                  <section className="mb-12 bg-[#EFF2F880] py-[40px] px-[32px] rounded-2xl">
                    <h2 className="text-[28px] font-[500] text-[#191919] mb-6 text-center">Tour Highlights</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                      {/* Highlight Card 1: 3 Eyes National Park */}
                      <div className="bg-white rounded-xl shadow-md overflow-hidden">
                        <Image
                          src="/images/tours-id/3-Eyes-National-Park.png"
                          width={50}
                          height={50}
                          alt="Picture of the author"
                          className="w-full h-48 object-cover"
                        />

                        <div className="p-4">
                          <h3 className="font-[500] text-[16px] text-[#191919] mb-2">3 Eyes National Park</h3>
                          <p className="text-[#878D97] text-[13px] font-[400] mb-3">Explore the stunning underground caves and lagoons.</p>
                          <button className="text-[#EE2552] text-[13px] border p-2 rounded-lg bg-[#EE25520D] hover:underline font-[400]">
                            View map
                          </button>
                        </div>
                      </div>

                      {/* Highlight Card 2: Columbus Lighthouse */}
                      <div className="bg-white rounded-xl shadow-md overflow-hidden">
                        <Image
                          src="/images/tours-id/Columbus-Lighthouse.png"
                          width={50}
                          height={50}
                          alt="Picture of the author"
                          className="w-full h-48 object-cover"
                        />

                        <div className="p-4">
                          <h3 className="font-[500] text-[16px] text-[#191919] mb-2">Columbus Lighthouse</h3>
                          <p className="text-[#878D97] text-[13px] font-[400] mb-3">A monumental cross-shaped structure dedicated to Christopher Columbus.</p>
                           <button className="text-[#EE2552] text-[13px] border p-2 rounded-lg bg-[#EE25520D] hover:underline font-[400]">
                            View map
                          </button>
                        </div>
                      </div>

                      {/* Highlight Card 3: Alcázar de Colón */}
                      <div className="bg-white rounded-xl shadow-md overflow-hidden">
                        <Image
                          src="/images/tours-id/Alcázar-de-Colón.png"
                          width={50}
                          height={50}
                          alt="Picture of the author"
                          className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                          <h3 className="font-[500] text-[16px] text-[#191919] mb-2">Alcázar de Colón</h3>
                          <p className="text-[#878D97] text-[13px] font-[400] mb-3">The first fortified palace built in the Americas, once home to Diego Columbus.</p>
                           <button className="text-[#EE2552] text-[13px] border p-2 rounded-lg bg-[#EE25520D] hover:underline font-[400]">
                            View map
                          </button>
                        </div>
                      </div>

                    </div>
                  </section>

                  {/* What's Included / Not Included Section */}
                  <section className="mb-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                      {/* What's Included */}
                      <div className="bg-[#EFF2F880] p-6 rounded-xl shadow">
                        <h3 className="text-[20px] font-[500] text-[#28A745] mb-4">What's Included</h3>
                        <ul className="space-y-3">
                          <li className="flex items-center text-[#4B5563] text-[14px] font-[400]">
                            <Image
                          src="/images/tours-id/mdi_ticket.png"
                          width={50}
                          height={50}
                          alt="Hotel pickup and drop-off"
                          className="w-5 h-5 text-green-500 mr-2 flex-shrink-0"
                        />
                            <span>Convenient hotel pick-up</span>
                          </li>
                          <li className="flex items-center text-[#4B5563] text-[14px] font-[400]">
                            <Image
                          src="/images/tours-id/man-icon.png"
                          width={50}
                          height={50}
                          alt="Hotel pickup and drop-off"
                          className="w-4 h-4 text-green-500 mr-2 flex-shrink-0"
                        />
                            <span>Professional certified guide</span>
                          </li>
                          <li className="flex items-center text-[#4B5563] text-[14px] font-[400]">
                           <Image
                          src="/images/tours-id/Buffet.png"
                          width={50}
                          height={50}
                          alt="Hotel pickup and drop-off"
                          className="w-4 h-4 text-green-500 mr-2 flex-shrink-0"
                        />
                            <span>Delicious local lunch</span>
                          </li>
                          <li className="flex items-center text-[#4B5563] text-[14px] font-[400]">
                            <Image
                          src="/images/tours-id/entrance.png"
                          width={50}
                          height={50}
                          alt="Hotel pickup and drop-off"
                          className="w-5 h-5 text-green-500 mr-2 flex-shrink-0"
                        />
                            <span>All entrance fees</span>
                          </li>
                        </ul>
                      </div>

                      {/* What's Not Included */}
                      <div className="bg-[#EFF2F880] p-6 rounded-xl shadow">
                        <h3 className="text-[20] font-[500] text-[#DC3545] mb-4">What's Not Included</h3>
                        <ul className="space-y-3">
                          <li className="flex items-center text-[#191919] text-[14px] font-[400]">
                            {/* <XCircle className="w-5 h-5 text-red-500 mr-2 flex-shrink-0" /> */}
                            <Image
                          src="/images/tours-id/Breakfast.png"
                          width={50}
                          height={50}
                          alt="Hotel pickup and drop-off"
                          className="w-5 h-5 text-red-500 mr-2 flex-shrink-0"
                        />
                            <span>Breakfast and dinner</span>
                          </li>
                          <li className="flex items-center text-[#191919] text-[14px] font-[400]">
                            <Image
                          src="/images/tours-id/bxs_gift.png"
                          width={50}
                          height={50}
                          alt="Hotel pickup and drop-off"
                          className="w-5 h-5 text-red-500 mr-2 flex-shrink-0"
                        />
                            <span>Gratuities</span>
                          </li>
                          <li className="flex items-center text-[#191919] text-[14px] font-[400]">
                            <Image
                          src="/images/tours-id/Personal-expenses.png"
                          width={50}
                          height={50}
                          alt="Hotel pickup and drop-off"
                          className="w-5 h-5 text-red-500 mr-2 flex-shrink-0"
                        />
                            <span>Personal expenses</span>
                          </li>
                          <li className="flex items-center text-[#191919] text-[14px] font-[400]">
                            <Image
                          src="/images/tours-id/mdi_beverages.png"
                          width={50}
                          height={50}
                          alt="Hotel pickup and drop-off"
                          className="w-5 h-5 text-red-500 mr-2 flex-shrink-0"
                        />
                            <span>Alcoholic beverages</span>
                          </li>
                        </ul>
                      </div>

                    </div>

                    <hr className="border-gray-200 mt-10" />
                  </section>

                  {/* Tour Itinerary Section */}
                  <section className="mb-12">
                    <h2 className="text-[28px] font-[500] text-[#191919] mb-4 text-center">Tour Itinerary</h2>

                    <div className="relative space-y-6">
                      {/* Timeline Connector Line */}
                      <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-[#FAA523]"></div>

                      {/* Itinerary Item 1 */}
                      <div className="flex items-start relative bg-[#EFF2F880] p-5 rounded-xl shadow-sm border border-gray-100 ml-10">
                        <div className="absolute -left-10 top-1/2 -translate-y-1/2 w-6 h-6 bg-[#FAA523] rounded-full flex items-center justify-center text-white font-bold text-sm z-10">
                          1
                        </div>
                        <div>
                          <h3 className="font-[500] text-[16px] text-[#191919] mb-1">7:30 AM - Morning Pickup</h3>
                          <p className="text-[#4B5563] text-[14px] font-[400]">Hotel pick-ups and comfortable transfer to the Colonial Zone.</p>
                        </div>
                      </div>

                      {/* Itinerary Item 2 */}
                      <div className="flex items-start relative bg-[#EFF2F880] p-5 rounded-xl shadow-sm border border-gray-100 ml-10">
                        <div className="absolute -left-10 top-1/2 -translate-y-1/2 w-6 h-6 bg-[#FAA523] rounded-full flex items-center justify-center text-white font-bold text-sm z-10">
                          2
                        </div>
                        <div>
                          <h3 className="font-[500] text-[16px] text-[#191919] mb-1">9:00 AM - Colonial Zone Tour</h3>
                          <p className="text-[#4B5563] text-[14px] font-[400]">Visit to Alcazar de Colon and primative hut/colonial.</p>
                        </div>
                      </div>

                      {/* Itinerary Item 3 */}
                      <div className="flex items-start relative bg-[#EFF2F880] p-5 rounded-xl shadow-sm border border-gray-100 ml-10">
                        <div className="absolute -left-10 top-1/2 -translate-y-1/2 w-6 h-6 bg-[#FAA523] rounded-full flex items-center justify-center text-white font-bold text-sm z-10">
                          3
                        </div>
                        <div>
                          <h3 className="font-[500] text-[16px] text-[#191919] mb-1">1:00 PM - Lunch Break</h3>
                          <p className="text-[#4B5563] text-[14px] font-[400]">Traditional food served to flat at a local restaurant</p>
                        </div>
                      </div>

                      {/* Itinerary Item 4 */}
                      <div className="flex items-start relative bg-[#EFF2F880] p-5 rounded-xl shadow-sm border border-gray-100 ml-10">
                        <div className="absolute -left-10 top-1/2 -translate-y-1/2 w-6 h-6 bg-[#FAA523] rounded-full flex items-center justify-center text-white font-bold text-sm z-10">
                          4
                        </div>
                        <div>
                          <h3 className="font-[500] text-[16px] text-[#191919] mb-1">4:30 PM - Return</h3>
                          <p className="text-[#4B5563] text-[14px] font-[400]">Transfer back to your hotel</p>
                        </div>
                      </div>

                    </div>
                  </section>

                  {/* More Information Header (Accordion-like) */}
                  <section className="mb-4 mt-20">
                    <div className="bg-[#003459] p-5 rounded-xl flex items-center justify-between cursor-pointer">
                      <h2 className="text-[28px] font-[500] text-white">More Information</h2>
                      {/* Placeholder for an arrow icon, e.g., <ChevronDown className="w-6 h-6 text-white"/> */}
                    </div>
                    {/* The content for "More Information" would go here, revealed by clicking the header */}
                  </section>

                  {/* Important Information Section */}
                  <section className=" p-6">
                    <h3 className="text-[20px] font-[500] text-[#191919]">Important Information</h3>
                    <div className="py-3 rounded-xl ">
                      <ul className="space-y-4">
                        <li className="flex items-center">
                          
                          <Image
                          src="/images/tours-id/When-to-Book.png"
                          width={50}
                          height={50}
                          alt="Hotel pickup and drop-off"
                          className="w-4 h-4 text-blue-600 mr-3 flex-shrink-0"
                        />
                          <div>
                            <span className="font-[400] text-[16px] text-[#191919]">When to Book</span>
                            <p className="text-[#878D97] text-[14px] font-[400]">It's recommended to book up to 24 hours before the activity.</p>
                          </div>
                        </li>
                        <li className="flex items-center">
                          <Image
                          src="/images/tours-id/Accessibility.png"
                          width={50}
                          height={50}
                          alt="Hotel pickup and drop-off"
                          className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0"
                        />
                          <div>
                            <span className="font-[400] text-[16px] text-[#191919]">Accessibility</span>
                            <p className="text-[#878D97] text-[14px] font-[400]">This tour is accessible with a participating person.</p>
                          </div>
                        </li>
                        <li className="flex items-center">
                          <Image
                          src="/images/tours-id/Sustainability.png"
                          width={50}
                          height={50}
                          alt="Hotel pickup and drop-off"
                          className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0"
                        />
                          <div>
                            <span className="font-[400] text-[16px] text-[#191919]">Sustainability</span>
                            <p className="text-[#878D97] text-[14px] font-[400]">We adhere to responsible tourism guidelines.</p>
                          </div>
                        </li>
                        <li className="flex items-center">
                          <Image
                          src="/images/tours-id/Provider.png"
                          width={50}
                          height={50}
                          alt="Hotel pickup and drop-off"
                          className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0"
                        />
                          <div>
                            <span className="font-[400] text-[16px] text-[#191919]">Provider</span>
                            <p className="text-[#878D97] text-[14px] font-[400]">Dominicana Tour | Our certified guides.</p>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </section>

                  <hr className="border-gray-200" />

                  {/* Cancellation Policy Section */}
                  <section className=" p-6">
                    <h3 className="text-[20px] font-[500] text-[#191919] mb-6">Cancellation Policy</h3>
                    <div className="rounded-xl">
                      <ul className="space-y-3">
                        <li className="flex items-start text-gray-700">
                          
                          <Image
                          src="/images/tours-id/ok-icon.png"
                          width={50}
                          height={50}
                          alt="Hotel pickup and drop-off"
                          className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-1"
                        />
                          <div>
                            <span className="font-[400] text-[14px] text-[#878D97]">Free cancelation up to 24 hours before tour starts</span>
                            {/* <p className="font-[400] text-[14px] text-[#878D97]">You can cancel free of charge up to 24 hours before the activity is scheduled. If you cancel within 24 hours, or if you don't show up, no refund will be issued.</p> */}
                          </div>
                        </li>
                        <li className="flex items-start text-gray-700">
                          <Image
                          src="/images/tours-id/ok-icon.png"
                          width={50}
                          height={50}
                          alt="Hotel pickup and drop-off"
                          className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-1"
                        />
                          <div>
                            <span className="font-[400] text-[14px] text-[#878D97]">For Last-Minute Free Cancellation Policy</span>
                            {/* <p className="font-[400] text-[14px] text-[#878D97]">Proof of emergency is required. Please contact our support team to arrange.</p> */}
                          </div>
                        </li>
                        <li className="flex items-start text-gray-700">
                          <Image
                          src="/images/tours-id/ok-icon.png"
                          width={50}
                          height={50}
                          alt="Hotel pickup and drop-off"
                          className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-1"
                        />
                          <div>
                            <span className="font-[400] text-[14px] text-[#878D97]">We offer free last-minute cancellation in the event of a medical emergency or flight cancellation.</span>
                            <p className="font-[400] text-[14px] text-[#878D97]"> A valid medical certificate must be provided in case of a medical emergency.</p>
                            <p className="font-[400] text-[14px] text-[#878D97]">  A flight cancellation receipt is required in case of a flight disruption.</p>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </section>

                  <hr className="border-gray-200 mb-10 mt-4" />
                  
                  {/* Frequently Asked Questions Section */}
                  <section className="mb-12 px-6">
                    <h3 className="text-[20px] font-[500] text-[#191919] mb-6">Frequently Asked Questions</h3>
                    <div className="bg-[#EFF2F880] rounded-xl border border-gray-100 divide-y divide-gray-100">

                      {/* FAQ Item 1 */}
                      <div className="p-5">
                        <button className="flex justify-between items-center w-full text-left text-[14px] font-[400] text-[#191919]">
                          Where will I be picked up?
                          <ChevronDown className="w-5 h-5 text-gray-500" />
                        </button>
                        {/* Answer content (initially hidden) */}
                        <p className="text-gray-600 text-sm mt-3 hidden">
                          We offer convenient pickup from most hotels and designated meeting points in Santo Domingo. During the booking process, you'll be able to select your preferred pickup location. Please ensure you provide accurate hotel information. If your accommodation is not a central location in the designated pickup zones, alternative arrangements will be communicated to you.
                        </p>
                      </div>

                      {/* FAQ Item 2 */}
                      <div className="p-5">
                        <button className="flex justify-between items-center w-full text-left text-[14px] font-[400] text-[#191919]">
                          What time will I go back?
                          <ChevronDown className="w-5 h-5 text-gray-500" />
                        </button>
                        {/* Answer content (initially hidden) */}
                        <p className="text-gray-600 text-sm mt-3 hidden">
                          The tour typically concludes around 4:30 PM, after which you will be transferred back to your hotel. Exact return times can vary slightly depending on traffic and drop-off locations.
                        </p>
                      </div>

                      {/* FAQ Item 3 */}
                      <div className="p-5">
                        <button className="flex justify-between items-center w-full text-left text-[14px] font-[400] text-[#191919]">
                          What is the lunch and drinks menu?
                          <ChevronDown className="w-5 h-5 text-gray-500" />
                        </button>
                        {/* Answer content (initially hidden) */}
                        <p className="text-gray-600 text-sm mt-3 hidden">
                          Lunch includes traditional Dominican cuisine at a local restaurant. This typically features rice, beans, a meat dish (chicken or pork), and a salad. Drinks usually include water and a soft drink. Alcoholic beverages are not included but can often be purchased separately.
                        </p>
                      </div>

                      {/* FAQ Item 4 */}
                      <div className="p-5">
                        <button className="flex justify-between items-center w-full text-left text-[14px] font-[400] text-[#191919]">
                          Is there an extra charge?
                          <ChevronDown className="w-5 h-5 text-gray-500" />
                        </button>
                        {/* Answer content (initially hidden) */}
                        <p className="text-gray-600 text-sm mt-3 hidden">
                          All entrance fees and lunch are included in the tour price. Personal expenses, souvenirs, and alcoholic beverages are not included and would be an extra charge if desired.
                        </p>
                      </div>

                      {/* FAQ Item 5 */}
                      <div className="p-5">
                        <button className="flex justify-between items-center w-full text-left text-[14px] font-[400] text-[#191919]">
                          What should I pack?
                          <ChevronDown className="w-5 h-5 text-gray-500" />
                        </button>
                        {/* Answer content (initially hidden) */}
                        <p className="text-gray-600 text-sm mt-3 hidden">
                          We recommend comfortable walking shoes, light clothing suitable for warm weather, sunglasses, sunscreen, a hat, and a camera. You might also want to bring a small backpack for personal items.
                        </p>
                      </div>

                      {/* FAQ Item 6 */}
                      <div className="p-5">
                        <button className="flex justify-between items-center w-full text-left text-[14px] font-[400] text-[#191919]">
                          What should I bring?
                          <ChevronDown className="w-5 h-5 text-gray-500" />
                        </button>
                        {/* Answer content (initially hidden) */}
                        <p className="text-gray-600 text-sm mt-3 hidden">
                          Besides the essentials listed above, you may wish to bring some local currency (Dominican Pesos) for any personal purchases or gratuities.
                        </p>
                      </div>

                      {/* FAQ Item 7 */}
                      <div className="p-5">
                        <button className="flex justify-between items-center w-full text-left text-[14px] font-[400] text-[#191919]">
                          What accessibility options do you offer?
                          <ChevronDown className="w-5 h-5 text-gray-500" />
                        </button>
                        {/* Answer content (initially hidden) */}
                        <p className="text-gray-600 text-sm mt-3 hidden">
                          Our tour is generally accessible, but specific needs should be communicated in advance. Some historical sites may have limited accessibility. Please contact our support team for detailed information on accessibility for your specific requirements.
                        </p>
                      </div>
                    </div>
                    {/* The contact support text */}
                    <p className="text-gray-600 text-sm mt-6 text-left">
                      For more questions, <span className="text-[#EE2552] hover:underline cursor-pointer font-semibold">contact</span> our support team.
                    </p>
                  </section>

                </div> {/* End max-w-7xl container */}
              </div> {/* End bg-gray-50 main container */}

              {/* ---------------------------------+------------------------------------+--------------------------------- */}
              {/* ---------------------------------+------------------------------------+--------------------------------- */}

            </div>

            {/* Right / Sticky booking sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-6 lg:top-24 bg-[#EFF2F8] rounded-xl p-6 shadow-2xl border border-gray-100">

                {/* Price Header */}
                <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                  <div>
                    {/* <span className="text-sm text-gray-500">From</span> */}
                    <div className="text-[24px] font-[500] text-[#191919]">
                      {/* ${chosenTour.price.toFixed(2)} */}
                      Book Your Tour
                      {/* <span className="text-sm text-gray-500 font-normal ml-1">pp</span> */}
                    </div>
                    {/* {chosenTour.originalPrice > chosenTour.price && (
                      <div className="text-xs text-gray-400 line-through">${chosenTour.originalPrice.toFixed(2)}</div>
                    )} */}
                  </div>
                  {/* <div className="text-right">
                    <div className="flex items-center text-sm font-semibold text-yellow-500">
                      <Star className="w-4 h-4 fill-yellow-500 mr-1" />
                      {chosenTour.rating?.toFixed(1)}
                    </div>
                    <div className="text-xs text-gray-500">({chosenTour.reviewCount} reviews)</div>
                  </div> */}
                </div>

                {/* Date Selection */}
                <div className="mb-4">
                  <label htmlFor="tour-date" className="block text-gray-700 font-[400] text-[14px] mb-2">Select Date</label>
                  <input
                    id="tour-date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    min={todayIso}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-700 text-base focus:ring-rose-500 focus:border-rose-500 transition duration-150 shadow-sm"
                  />
                </div>

                {/* Guest Selection */}
                <div className="space-y-4 mb-6">
                  {/* Adult Selector */}
                  <div className="flex justify-between items-center text-sm py-2">
                    <div>
                      <div className="font-[400] text-[#191919] text-[14px]">Adults <samp className='w-[400] text-[13px]'>(12-99 years old)</samp></div>
                      <div className="text-xs text-gray-500">(${chosenTour.price.toFixed(2)} per person)</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button onClick={() => setAdults(Math.max(1, adults - 1))} className="w-4 h-4 rounded-full border border-gray-300 text-gray-700 text-lg flex items-center justify-center hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed" disabled={adults <= 1}>-</button>
                      <div className="w-6 text-center font-semibold text-base">{adults}</div>
                      <button onClick={() => setAdults(adults + 1)} className="w-4 h-4 rounded-full border border-rose-500 bg-rose-500 text-white text-lg flex items-center justify-center hover:bg-rose-600 transition">+</button>
                    </div>
                  </div>

                  {/* Children Selector */}
                  <div className="flex justify-between items-center text-sm py-2">
                    <div>
                      <div className="font-[400] text-[#191919] text-[14px]">Children <samp className='w-[400] text-[13px]'>(3-11 years old)</samp></div>
                      <div className="text-xs text-gray-500">(${(chosenTour.price * 0.5).toFixed(2)} per person)</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button onClick={() => setChildren(Math.max(0, children - 1))} className="w-4 h-4 rounded-full border border-gray-300 text-gray-700 text-lg flex items-center justify-center hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed" disabled={children <= 0}>-</button>
                      <div className="w-6 text-center font-semibold text-base">{children}</div>
                      <button onClick={() => setChildren(children + 1)} className="w-4 h-4 rounded-full border border-rose-500 bg-rose-500 text-white text-lg flex items-center justify-center hover:bg-rose-600 transition">+</button>
                    </div>
                  </div>

                  {/* Infants Selector */}
                  <div className="flex justify-between items-center text-sm py-2">
                    <div>
                      <div className="font-[400] text-[#191919] text-[14px]">Infants <samp className='w-[400] text-[13px]'>(0-2 years old)</samp></div>
                      <div className="text-xs text-gray-500">(Free)</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button onClick={() => setInfants(Math.max(0, infants - 1))} className="w-4 h-4 rounded-full border border-gray-300 text-gray-700 text-lg flex items-center justify-center hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed" disabled={infants <= 0}>-</button>
                      <div className="w-6 text-center font-semibold text-base">{infants}</div>
                      <button onClick={() => setInfants(infants + 1)} className="w-4 h-4 rounded-full border border-rose-500 bg-rose-500 text-white text-lg flex items-center justify-center hover:bg-rose-600 transition">+</button>
                    </div>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="mt-4 border-t border-gray-100 pt-5 text-[16px] font-[400] text-[#191919] space-y-3">
                  <div className="flex justify-between"><span>Subtotal</span><span className="font-medium">${subtotal.toFixed(2)}</span></div>
                  <div className="flex justify-between text-gray-500"><span>Tax (10%)</span><span className="font-medium">${tax.toFixed(2)}</span></div>
                  <div className="flex justify-between font-[400] text-[16px] border-t border-gray-100 pt-3 text-[#191919]">
                    <span>Total</span><span>${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Booking Button */}
                <button
                  onClick={handleBookNow}
                  disabled={adults + children + infants === 0}
                  className="w-full mt-7 bg-rose-500 text-white py-3.5 rounded-lg font-[500] text-[16px] hover:bg-rose-600 transition shadow-lg shadow-rose-300/50 disabled:bg-gray-400 disabled:shadow-none"
                >
                  Book →
                </button>

                {/* Payment Icons */}


                <div className='mt-4'>
                  <div className="w-full max-w-lg">
                    <Image
                      src="/images/tours-id/Book-Your-Tour-footer.png"
                      width={500}
                      height={500}
                      alt="Secure Payment Methods"
                    // Optional: Add 'className="h-auto w-full"' if the image needs to be fully responsive
                    />
                  </div>
                </div>
              </div>
            </aside>
          </div>

          {/* What Our Travelers Say (Reviews) */}
          <div className="mt-20 text-center">
            {/* Section 1: What Our Travelers Say */}
            <section className="py-[32px]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4">
                <h2 className="text-[48px] font-[500] text-[#191919] mb-12 text-center">
                  What Our Travelers Say
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                  {/* Review Card 1 */}
                  <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                    <div className="flex justify-between items-start mb-3">
                      <Quote className="w-4 h-4 text-yellow-500 fill-yellow-100 flex-shrink-0" />
                      <div className="flex text-yellow-500">
                        <Star className="w-4 h-4 fill-yellow-500" />
                        <Star className="w-4 h-4 fill-yellow-500" />
                        <Star className="w-4 h-4 fill-yellow-500" />
                        <Star className="w-4 h-4 fill-yellow-500" />
                        <Star className="w-4 h-4 fill-yellow-500" />
                      </div>
                    </div>

                    <p className="text-[#4B5563] leading-relaxed mb-4 text-[14px] font-[400] text-left">
                      "The local guides were incredible! They showed us hidden gems we would have never found on our own. Such an authentic experience."
                    </p>

                    <div className="flex items-center">
                      {/* Placeholder for Profile Picture */}
                      <div className="w-10 h-10 bg-gray-300 rounded-full mr-3 border border-gray-400">
                        <Image
                      src="/images/tours-id/Marcus-R.png"
                      width={50}
                      height={50}
                      alt="Secure Payment Methods"
                      className='w-10 h-10'
                    />
                      </div>
                      <div className='text-left'>
                        <p className="font-[500] text-[#191919] text-[16px]">Marcus R.</p>
                        <p className="text-[#878D97] text-[14px] font-[400]">Canada</p>
                      </div>
                    </div>
                  </div>

                  {/* Review Card 2 */}
                  <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                    <div className="flex justify-between items-start mb-3">
                      <Quote className="w-4 h-4 text-yellow-500 fill-yellow-100 flex-shrink-0" />
                      <div className="flex text-yellow-500">
                        <Star className="w-4 h-4 fill-yellow-500" />
                        <Star className="w-4 h-4 fill-yellow-500" />
                        <Star className="w-4 h-4 fill-yellow-500" />
                        <Star className="w-4 h-4 fill-yellow-500" />
                        <Star className="w-4 h-4 fill-yellow-500" />
                      </div>
                    </div>

                    <p className="text-[#4B5563] leading-relaxed mb-4 text-[14px] font-[400] text-left">
                      "The local guides were incredible! They showed us hidden gems we would have never found on our own. Such an authentic experience."
                    </p>

                    <div className="flex items-center">
                      {/* Placeholder for Profile Picture */}
                      <div className="w-10 h-10 bg-gray-300 rounded-full mr-3 border border-gray-400">
                        <Image
                      src="/images/tours-id/Elena-K.png"
                      width={50}
                      height={50}
                      alt="Secure Payment Methods"
                      className='w-10 h-10'
                    />
                      </div>
                      <div className='text-left'>
                        <p className="font-[500] text-[#191919] text-[16px]">Elena K.</p>
                        <p className="text-[#878D97] text-[14px] font-[400]">UK</p>
                      </div>
                    </div>
                  </div>

                  {/* Review Card 3 */}
                  <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                    <div className="flex justify-between items-start mb-3">
                      <Quote className="w-4 h-4 text-yellow-500 fill-yellow-100 flex-shrink-0" />
                      <div className="flex text-yellow-500">
                        <Star className="w-4 h-4 fill-yellow-500" />
                        <Star className="w-4 h-4 fill-yellow-500" />
                        <Star className="w-4 h-4 fill-yellow-500" />
                        <Star className="w-4 h-4 fill-yellow-500" />
                        <Star className="w-4 h-4 fill-yellow-500" />
                      </div>
                    </div>

                    <p className="text-[#4B5563] leading-relaxed mb-4 text-[14px] font-[400] text-left">
                      "The local guides were incredible! They showed us hidden gems we would have never found on our own. Such an authentic experience."
                    </p>

                    <div className="flex items-center">
                      {/* Placeholder for Profile Picture */}
                      <div className="w-10 h-10 bg-gray-300 rounded-full mr-3 border border-gray-400">
                        <Image
                      src="/images/tours-id/Sophia-M.png"
                      width={50}
                      height={50}
                      alt="Secure Payment Methods"
                      className='w-10 h-10'
                    />
                      </div>
                      <div className='text-left'>
                        <p className="font-[500] text-[#191919] text-[16px]">Sophia M.</p>
                        <p className="text-[#878D97] text-[14px] font-[400]">USA</p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </section>
          </div>

          {/* Discover Additional Options - Placeholder for similar tours */}
          <div className="mt-20 text-center">
            {/* Horizontal Rule to separate sections */}
            <hr className="border-gray-200" />

            {/* Section 2: Discover Additional Options */}
            <section className="py-20 ">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4">
                <h2 className="text-[48px] font-[500] text-[#191919] mb-12 text-center">
                  Discover Additional Options
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                    
                  {/* Tour Card 1: Aventura En Buggys */}
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
                    {/* Image Area */}
                    <div className="relative">
                      <img src="https://oaqvxfczgmjzupugrrzz.supabase.co/storage/v1/object/public/images/buggy-tour.jpg" alt="Aventura En Buggys" className="w-full h-56 object-cover" />
                      {/* Sale Badge */}
                      <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                        30% OFF
                      </span>
                      {/* Category Label */}
                      <span className="absolute bottom-3 right-3 bg-black bg-opacity-50 text-white text-xs font-medium px-2 py-1 rounded-full">
                        Adventure
                      </span>
                    </div>

                    {/* Content Area */}
                    <div className="p-4">
                      <div className="flex items-center text-sm text-gray-600 mb-2">
                        <Star className="w-4 h-4 fill-yellow-500 mr-1" />
                        <span className="font-semibold text-gray-900 mr-1">4.4</span>
                        <span className="text-gray-500">(50 Reviews)</span>
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 mb-2">Aventura En Buggys</h3>

                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        The local guides were incredible! they showed us hidden gems we would never found on our own.
                      </p>

                      <hr className="my-3 border-gray-100" />

                      {/* Details and Price */}
                      <div className="flex justify-between items-center text-sm mb-4">
                        <div className="flex items-center text-gray-600">
                          <MapPin className="w-4 h-4 mr-1 text-gray-500" />
                          <span className="text-xs">Pickup: Punta Cana</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Clock className="w-4 h-4 mr-1 text-gray-500" />
                          <span className="text-xs">Everyday (9am / 11am / 3pm)</span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <div>
                          <span className="text-xs text-gray-500 mr-2">From</span>
                          <span className="text-2xl font-bold text-gray-900 mr-2">$50</span>
                          <span className="text-base line-through text-red-500">$75</span>
                        </div>
                        <button className="bg-pink-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-pink-700 transition duration-150">
                          Book Now
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Tour Card 2: Santo Domingo City Tour */}
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
                    {/* Image Area */}
                    <div className="relative">
                      <img src="https://oaqvxfczgmjzupugrrzz.supabase.co/storage/v1/object/public/images/colonial-tour.jpg" alt="Santo Domingo City Tour" className="w-full h-56 object-cover" />
                      {/* Sale Badge */}
                      <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                        30% OFF
                      </span>
                      {/* Category Label */}
                      <span className="absolute bottom-3 right-3 bg-black bg-opacity-50 text-white text-xs font-medium px-2 py-1 rounded-full">
                        Outdoor Activities
                      </span>
                    </div>

                    {/* Content Area */}
                    <div className="p-4">
                      <div className="flex items-center text-sm text-gray-600 mb-2">
                        <Star className="w-4 h-4 fill-yellow-500 mr-1" />
                        <span className="font-semibold text-gray-900 mr-1">4.4</span>
                        <span className="text-gray-500">(50 Reviews)</span>
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 mb-2">Santo Domingo City Tour</h3>

                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        The local guides were incredible! they showed us hidden gems we would never found on our own.
                      </p>

                      <hr className="my-3 border-gray-100" />

                      {/* Details and Price */}
                      <div className="flex justify-between items-center text-sm mb-4">
                        <div className="flex items-center text-gray-600">
                          <MapPin className="w-4 h-4 mr-1 text-gray-500" />
                          <span className="text-xs">Pickup: Punta Cana</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Clock className="w-4 h-4 mr-1 text-gray-500" />
                          <span className="text-xs">Everyday (8am / 11am / 3pm)</span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <div>
                          <span className="text-xs text-gray-500 mr-2">From</span>
                          <span className="text-2xl font-bold text-gray-900 mr-2">$50</span>
                          <span className="text-base line-through text-red-500">$75</span>
                        </div>
                        <button className="bg-pink-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-pink-700 transition duration-150">
                          Book Now
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Tour Card 3: Saona Island Day Trip Lunch... */}
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
                    {/* Image Area */}
                    <div className="relative">
                      <img src="https://oaqvxfczgmjzupugrrzz.supabase.co/storage/v1/object/public/images/saona-island.jpg" alt="Saona Island" className="w-full h-56 object-cover" />
                      {/* Sale Badge */}
                      <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                        30% OFF
                      </span>
                      {/* Category Label */}
                      <span className="absolute bottom-3 right-3 bg-black bg-opacity-50 text-white text-xs font-medium px-2 py-1 rounded-full">
                        Nature and Boat Trip
                      </span>
                    </div>

                    {/* Content Area */}
                    <div className="p-4">
                      <div className="flex items-center text-sm text-gray-600 mb-2">
                        <Star className="w-4 h-4 fill-yellow-500 mr-1" />
                        <span className="font-semibold text-gray-900 mr-1">4.4</span>
                        <span className="text-gray-500">(50 Reviews)</span>
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 mb-2">Saona Island Day Trip Lunch...</h3>

                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        The local guides were incredible! they showed us hidden gems we would never found on our own.
                      </p>

                      <hr className="my-3 border-gray-100" />

                      {/* Details and Price */}
                      <div className="flex justify-between items-center text-sm mb-4">
                        <div className="flex items-center text-gray-600">
                          <MapPin className="w-4 h-4 mr-1 text-gray-500" />
                          <span className="text-xs">Pickup: Punta Cana</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Clock className="w-4 h-4 mr-1 text-gray-500" />
                          <span className="text-xs">Everyday (9am / 1pm / 5pm)</span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <div>
                          <span className="text-xs text-gray-500 mr-2">From</span>
                          <span className="text-2xl font-bold text-gray-900 mr-2">$50</span>
                          <span className="text-base line-through text-red-500">$75</span>
                        </div>
                        <button className="bg-pink-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-pink-700 transition duration-150">
                          Book Now
                        </button>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </section>

            <hr className="border-gray-200" />
          </div>

          {/* Why Choose Us / Guarantees */}
          <div className=" py-10 ">
            {/* Section 3: Why Choose Us */}

            <section className="py-10 ">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4">
                <h2 className="text-4xl font-semibold text-gray-900 mb-12 text-center">
                  Why Choose Us
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">

                  {/* Feature 1: Instant Confirmation */}
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
                      <Check className="w-4 h-4 text-orange-500 stroke-2" />
                    </div>
                    <h4 className="font-bold text-lg text-gray-900 mb-2">Instant Confirmation</h4>
                    <p className="text-gray-600 text-sm px-2">
                      Our prices are final - no unexpected fees after you checkout.
                    </p>
                  </div>

                  {/* Feature 2: No Hidden Fees */}
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-yellow-100 rounded-xl flex items-center justify-center mb-4">
                      <DollarSign className="w-4 h-4 text-yellow-500 stroke-2" />
                    </div>
                    <h4 className="font-bold text-lg text-gray-900 mb-2">No Hidden Fees</h4>
                    <p className="text-gray-600 text-sm px-2">
                      What you see is what you pay - no surprises!
                    </p>
                  </div>

                  {/* Feature 3: Free Cancellation */}
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                      <X className="w-4 h-4 text-blue-500 stroke-2" />
                    </div>
                    <h4 className="font-bold text-lg text-gray-900 mb-2">Free Cancellation</h4>
                    <p className="text-gray-600 text-sm px-2">
                      Cancel or modify up to 24 hours before travel.
                    </p>
                  </div>

                  {/* Feature 4: Secured Payment */}
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                      <Shield className="w-4 h-4 text-purple-500 stroke-2" />
                    </div>
                    <h4 className="font-bold text-lg text-gray-900 mb-2">Secured Payment</h4>
                    <p className="text-gray-600 text-sm px-2">
                      Your payment details are encrypted for security.
                    </p>
                  </div>

                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Section: Secure Payment Methods Image */}
        <section className="bg-[#EFF2F8] py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4">
            {/* Container to center the content */}
            <div className="flex justify-center">
              {/* NOTE: The Image component uses Next.js-style props (width, height, src, alt).
              The image itself will be centered because of the 'flex justify-center' on the parent div. 
            */}
              <div className="w-full max-w-lg">
                <Image
                  src="/images/tours-id/Secure-Payment-Methods.png"
                  width={720}
                  height={600}
                  alt="Secure Payment Methods"
                // Optional: Add 'className="h-auto w-full"' if the image needs to be fully responsive
                />
              </div>
            </div>
          </div>
        </section>

      </div>
    </Layout>
  );
}