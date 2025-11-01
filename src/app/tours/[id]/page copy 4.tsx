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
} from 'lucide-react';

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
  duration: 'Full Day (8-10 hours)',
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
    <p className="text-xs font-medium text-gray-700 h-8 line-clamp-2">{title}</p>
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
        <div className="min-h-screen flex items-center justify-center p-8 bg-gray-50">
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
        <div className="container mx-auto px-4 lg:px-8 pt-8">
          
          {/* Top Section: Header and Gallery */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 leading-tight">{chosenTour.title}</h1>
                <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <span className="text-base lg:text-lg font-medium text-gray-700">{chosenTour.location}</span>
                </div>
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
                    className="object-cover transition-opacity duration-300"
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
          <div className="grid lg:grid-cols-3 gap-8 mt-12">
            
            {/* Left / Main Content Column */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Tour Overview and Stats (Match the UI's top banner) */}
              <div className="bg-white rounded-xl p-6 lg:p-8 shadow-md border border-gray-100">
                <h2 className="text-xl lg:text-2xl font-bold text-gray-800 mb-4">Tour Overview</h2>
                <p className="text-gray-700 leading-relaxed text-base mb-6">{chosenTour.overview}</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center border-t border-gray-100 pt-6">
                  <div className="flex flex-col items-center gap-1">
                    <Clock className="w-6 h-6 text-rose-500" />
                    <span className="font-semibold text-gray-800 text-sm mt-1">{chosenTour.duration}</span>
                    <span className="text-xs text-gray-500">Duration</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <Calendar className="w-6 h-6 text-rose-500" />
                    <span className="font-semibold text-gray-800 text-sm mt-1">Daily</span>
                    <span className="text-xs text-gray-500">Availability</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <MapPin className="w-6 h-6 text-rose-500" />
                    <span className="font-semibold text-gray-800 text-sm mt-1">{chosenTour.pickup}</span>
                    <span className="text-xs text-gray-500">Pickup</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <Users className="w-6 h-6 text-rose-500" />
                    <span className="font-semibold text-gray-800 text-sm mt-1">Group Tour</span>
                    <span className="text-xs text-gray-500">Type</span>
                  </div>
                </div>
              </div>

              {/* Tour Highlights */}
              <div className="space-y-4">
                  <h2 className="text-xl lg:text-2xl font-bold text-gray-800 ml-2">Tour Highlights</h2>
                  <div className="flex overflow-x-auto gap-4 py-2 px-2 scrollbar-hide">
                      <HighlightCard title="Colonial Zone Old Town" imageSrc="/images/highlights/colonial-zone.jpg" />
                      <HighlightCard title="Visit Alcázar de Colón" imageSrc="/images/highlights/alcazar.jpg" />
                      <HighlightCard title="First Cathedral of America" imageSrc="/images/highlights/cathedral.jpg" />
                      <HighlightCard title="Local Market Experience" imageSrc="/images/highlights/market.jpg" />
                      <HighlightCard title="Lunch Break (Optional)" imageSrc="/images/highlights/lunch.jpg" />
                      <HighlightCard title="Souvenir Shopping" imageSrc="/images/highlights/souvenir.jpg" />
                  </div>
              </div>

              {/* Inclusions / Exclusions */}
              <div className="grid md:grid-cols-2 gap-6 bg-white rounded-xl p-6 lg:p-8 shadow-md border border-gray-100">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" /> What's Included
                  </h3>
                  <ul className="text-base text-gray-700 space-y-3">
                    {chosenTour.included.map((inc) => (
                      <li key={inc} className="flex items-start gap-3">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <XCircle className="w-5 h-5 text-red-500" /> What's Not Included
                  </h3>
                  <ul className="text-base text-gray-700 space-y-3">
                    {chosenTour.excluded.map((exc) => (
                      <li key={exc} className="flex items-start gap-3 text-gray-500">
                        <XCircle className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                        <span>{exc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Tour Itinerary */}
              <div className="bg-white rounded-xl p-6 lg:p-8 shadow-md border border-gray-100">
                <h2 className="text-xl lg:text-2xl font-bold text-gray-800 mb-6">Tour Itinerary</h2>
                <div className="space-y-6">
                  {chosenTour.itinerary.map((row, i) => (
                    <div key={i} className="flex items-start gap-4 relative">
                      {/* Timeline Dot and Line */}
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full bg-rose-500 text-white flex items-center justify-center font-bold text-sm flex-shrink-0 shadow-md z-10">
                          {i + 1}
                        </div>
                        {i < chosenTour.itinerary.length - 1 && (
                          <div className="w-0.5 h-full bg-gray-200 mt-1 -mb-6" /> 
                        )}
                      </div>
                      
                      {/* Content */}
                      <div className="pt-1 pb-4 flex-grow">
                        <div className="text-sm text-gray-500 font-medium">{row.time}</div>
                        <h4 className="text-lg font-semibold text-gray-900 mt-1">{row.text}</h4>
                        <p className="text-sm text-gray-700 mt-1 leading-relaxed">Detailed description for {row.text}.</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* More Information / FAQ Placeholder */}
              <div className="bg-white rounded-xl p-6 lg:p-8 shadow-md border border-gray-100">
                <h2 className="text-xl lg:text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <AlertCircle className="w-6 h-6 text-blue-500" /> Important Information
                </h2>
                <div className="space-y-4">
                    <details className="border-b border-gray-100 pb-2">
                        <summary className="font-semibold text-gray-800 cursor-pointer flex justify-between items-center py-2 text-base">
                            Cancellation Policy
                            <svg className="w-5 h-5 transform transition-transform duration-200 group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </summary>
                        <p className="text-sm text-gray-600 pt-2 leading-relaxed">Free cancellation up to 24 hours before the activity. No refund for cancellations made within 24 hours of the scheduled departure time.</p>
                    </details>
                    <details className="border-b border-gray-100 pb-2">
                        <summary className="font-semibold text-gray-800 cursor-pointer flex justify-between items-center py-2 text-base">
                            What to bring
                            <svg className="w-5 h-5 transform transition-transform duration-200 group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </summary>
                        <p className="text-sm text-gray-600 pt-2 leading-relaxed">Comfortable shoes, sunscreen, sunglasses, a hat, and cash for optional purchases or personal expenses (e.g., lunch, souvenirs).</p>
                    </details>
                    <div className="text-base text-gray-700 pt-4 space-y-2">
                        <p><span className="font-semibold">Provider:</span> Tours Republica | Local Certified Guides</p>
                        <p><span className="font-semibold">Accessibility:</span> Wheelchair accessible with accompanying person. Please inform us in advance for arrangements.</p>
                    </div>
                </div>
              </div>

            </div>

            {/* Right / Sticky booking sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-6 lg:top-24 bg-white rounded-xl p-6 shadow-2xl border border-gray-100">
                
                {/* Price Header */}
                <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-100">
                  <div>
                    <span className="text-sm text-gray-500">From</span>
                    <div className="text-3xl font-extrabold text-rose-600">
                      ${chosenTour.price.toFixed(2)}
                      <span className="text-sm text-gray-500 font-normal ml-1">pp</span>
                    </div>
                    {chosenTour.originalPrice > chosenTour.price && (
                        <div className="text-xs text-gray-400 line-through">${chosenTour.originalPrice.toFixed(2)}</div>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="flex items-center text-sm font-semibold text-yellow-500">
                        <Star className="w-4 h-4 fill-yellow-500 mr-1" />
                        {chosenTour.rating?.toFixed(1)}
                    </div>
                    <div className="text-xs text-gray-500">({chosenTour.reviewCount} reviews)</div>
                  </div>
                </div>

                {/* Date Selection */}
                <div className="mb-4">
                  <label htmlFor="tour-date" className="block text-gray-700 font-semibold text-sm mb-2">Select Date</label>
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
                  <div className="flex justify-between items-center text-sm">
                    <div>
                      <div className="font-medium text-gray-800 text-base">Adults</div>
                      <div className="text-xs text-gray-500">(${chosenTour.price.toFixed(2)} per person)</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button onClick={() => setAdults(Math.max(1, adults - 1))} className="w-8 h-8 rounded-full border border-gray-300 text-gray-700 text-lg flex items-center justify-center hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed" disabled={adults <= 1}>-</button>
                      <div className="w-6 text-center font-semibold text-base">{adults}</div>
                      <button onClick={() => setAdults(adults + 1)} className="w-8 h-8 rounded-full border border-rose-500 bg-rose-500 text-white text-lg flex items-center justify-center hover:bg-rose-600 transition">+</button>
                    </div>
                  </div>

                  {/* Children Selector */}
                  <div className="flex justify-between items-center text-sm">
                    <div>
                      <div className="font-medium text-gray-800 text-base">Children</div>
                      <div className="text-xs text-gray-500">(${(chosenTour.price * 0.5).toFixed(2)} per person)</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button onClick={() => setChildren(Math.max(0, children - 1))} className="w-8 h-8 rounded-full border border-gray-300 text-gray-700 text-lg flex items-center justify-center hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed" disabled={children <= 0}>-</button>
                      <div className="w-6 text-center font-semibold text-base">{children}</div>
                      <button onClick={() => setChildren(children + 1)} className="w-8 h-8 rounded-full border border-rose-500 bg-rose-500 text-white text-lg flex items-center justify-center hover:bg-rose-600 transition">+</button>
                    </div>
                  </div>

                  {/* Infants Selector */}
                  <div className="flex justify-between items-center text-sm">
                    <div>
                      <div className="font-medium text-gray-800 text-base">Infants</div>
                      <div className="text-xs text-gray-500">(Free)</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button onClick={() => setInfants(Math.max(0, infants - 1))} className="w-8 h-8 rounded-full border border-gray-300 text-gray-700 text-lg flex items-center justify-center hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed" disabled={infants <= 0}>-</button>
                      <div className="w-6 text-center font-semibold text-base">{infants}</div>
                      <button onClick={() => setInfants(infants + 1)} className="w-8 h-8 rounded-full border border-rose-500 bg-rose-500 text-white text-lg flex items-center justify-center hover:bg-rose-600 transition">+</button>
                    </div>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="mt-4 border-t border-gray-100 pt-5 text-base text-gray-700 space-y-3">
                  <div className="flex justify-between"><span>Subtotal</span><span className="font-medium">${subtotal.toFixed(2)}</span></div>
                  <div className="flex justify-between text-gray-500"><span>Tax (10%)</span><span className="font-medium">${tax.toFixed(2)}</span></div>
                  <div className="flex justify-between font-extrabold text-xl border-t border-gray-100 pt-3 text-gray-900">
                    <span>Total</span><span>${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Booking Button */}
                <button
                  onClick={handleBookNow}
                  disabled={adults + children + infants === 0}
                  className="w-full mt-7 bg-rose-500 text-white py-3.5 rounded-lg font-bold text-lg hover:bg-rose-600 transition shadow-lg shadow-rose-300/50 disabled:bg-gray-400 disabled:shadow-none"
                >
                  Book Now →
                </button>

                {/* Payment Icons */}
                <div className="mt-5 text-center text-xs text-gray-500 space-y-2">
                  <p>SSL Secure Payment • Free Cancellation • Money-back Guarantee</p>
                  <div className="flex justify-center mt-2 space-x-1">
                    {/* These are placeholder icons. Replace with actual payment method SVGs/Images for real project. */}
                    <CreditCard className="w-5 h-5 text-gray-400" />
                    <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 7.5L12 12l9.5-4.5M2.5 12.5L12 17l9.5-4.5M2.5 17.5L12 22l9.5-4.5"></path></svg> {/* Generic card icon */}
                    <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 2c-5.523 0-10 4.477-10 10s4.477 10 10 10 10-4.477 10-10-4.477-10-10-10zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm-1-13h2v7h-2z"></path></svg> {/* Lock icon */}
                  </div>
                </div>
              </div>
            </aside>
          </div>
          
          {/* What Our Travelers Say (Reviews) */}
          <div className="mt-20 text-center">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-800 mb-8">What Our Travelers Say</h2>
            <div className="flex overflow-x-auto gap-6 py-4 px-2 justify-center scrollbar-hide">
              <ReviewCard name="Ana G." rating={5.0} review="Absolutely fantastic experience! The guide was knowledgeable, and the city tour covered all the major sites with fascinating historical insights." />
              <ReviewCard name="Mark S." rating={4.5} review="A great day out. The colonial zone is stunning. Only issue was a slight delay in the morning pickup, but otherwise perfect and well-organized." />
              <ReviewCard name="Pilar C." rating={5.0} review="Highly recommended tour. The history brought to life, and the pace was relaxed, allowing us to truly absorb the culture. Very professional service." />
              {/* <ReviewCard name="David L." rating={4.0} review="Enjoyed the tour. Lots to see and learn. The lunch stop was a bit rushed, but overall a positive and enriching experience." /> */}
            </div>
          </div>

          {/* Discover Additional Options - Placeholder for similar tours */}
          <div className="mt-20 text-center">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-800 mb-8">Discover Additional Options</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-2">
                {/* Example Tour Card 1 */}
                <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
                    <div className="relative h-48 w-full">
                        <Image src="/images/tours/From-Santo-Domingo.png" alt="Another Tour" fill className="object-cover" />
                        <div className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md">❤️</div> {/* Heart icon */}
                    </div>
                    <div className="p-4 text-left">
                        <h3 className="text-lg font-bold text-gray-900 mb-1">Punta Cana Excursion</h3>
                        <div className="flex items-center text-sm text-gray-600 mb-2">
                            <MapPin className="w-4 h-4 mr-1 text-gray-400" /> Punta Cana, DR
                        </div>
                        <div className="flex items-center text-sm font-semibold text-yellow-500 mb-3">
                            <Star className="w-4 h-4 fill-yellow-500 mr-1" /> 4.8 (15 Reviews)
                        </div>
                        <div className="flex justify-between items-center border-t border-gray-100 pt-3">
                            <div>
                                <span className="text-sm text-gray-500 line-through mr-1">$150.00</span>
                                <span className="text-xl font-bold text-rose-600">$119.00</span>
                            </div>
                            <button className="bg-rose-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-rose-600 transition">View Details</button>
                        </div>
                    </div>
                </div>
                {/* Example Tour Card 2 */}
                <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
                    <div className="relative h-48 w-full">
                        <Image src="/images/tours/Tapas-Tour.png" alt="Another Tour" fill className="object-cover" />
                        <div className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md">❤️</div>
                    </div>
                    <div className="p-4 text-left">
                        <h3 className="text-lg font-bold text-gray-900 mb-1">Samana Island Escape</h3>
                        <div className="flex items-center text-sm text-gray-600 mb-2">
                            <MapPin className="w-4 h-4 mr-1 text-gray-400" /> Samana, DR
                        </div>
                        <div className="flex items-center text-sm font-semibold text-yellow-500 mb-3">
                            <Star className="w-4 h-4 fill-yellow-500 mr-1" /> 4.7 (30 Reviews)
                        </div>
                        <div className="flex justify-between items-center border-t border-gray-100 pt-3">
                            <div>
                                <span className="text-sm text-gray-500 line-through mr-1">$200.00</span>
                                <span className="text-xl font-bold text-rose-600">$160.00</span>
                            </div>
                            <button className="bg-rose-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-rose-600 transition">View Details</button>
                        </div>
                    </div>
                </div>
                {/* Example Tour Card 3 */}
                <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
                    <div className="relative h-48 w-full">
                        <Image src="/images/tours/Santo-Domingo-City-Tour-cityTour.png" alt="Another Tour" fill className="object-cover" />
                        <div className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md">❤️</div>
                    </div>
                    <div className="p-4 text-left">
                        <h3 className="text-lg font-bold text-gray-900 mb-1">Los Haitises National Park</h3>
                        <div className="flex items-center text-sm text-gray-600 mb-2">
                            <MapPin className="w-4 h-4 mr-1 text-gray-400" /> Hato Mayor, DR
                        </div>
                        <div className="flex items-center text-sm font-semibold text-yellow-500 mb-3">
                            <Star className="w-4 h-4 fill-yellow-500 mr-1" /> 4.9 (45 Reviews)
                        </div>
                        <div className="flex justify-between items-center border-t border-gray-100 pt-3">
                            <div>
                                <span className="text-sm text-gray-500 line-through mr-1">$100.00</span>
                                <span className="text-xl font-bold text-rose-600">$75.00</span>
                            </div>
                            <button className="bg-rose-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-rose-600 transition">View Details</button>
                        </div>
                    </div>
                </div>
            </div>
          </div>


          {/* Why Choose Us / Guarantees */}
          <div className="mt-20 py-10 bg-white rounded-xl shadow-lg border border-gray-100">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-800 text-center mb-10">Why Choose Us</h2>
            <div className="flex justify-around flex-wrap gap-8 px-4">
                <div className="text-center w-40">
                    <Trophy className="w-10 h-10 text-rose-500 mx-auto mb-3" />
                    <h4 className="font-semibold text-lg text-gray-800">Best Price Guarantee</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">Find a better price, we&apos;ll match it or beat it.</p>
                </div>
                <div className="text-center w-40">
                    <Briefcase className="w-10 h-10 text-rose-500 mx-auto mb-3" />
                    <h4 className="font-semibold text-lg text-gray-800">Local Experts</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">Guided by certified, local experts with deep knowledge.</p>
                </div>
                <div className="text-center w-40">
                    <CreditCard className="w-10 h-10 text-rose-500 mx-auto mb-3" />
                    <h4 className="font-semibold text-lg text-gray-800">Secure Booking</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">Your payments are safe with our SSL encrypted system.</p>
                </div>
                <div className="text-center w-40">
                    <TrendingUp className="w-10 h-10 text-rose-500 mx-auto mb-3" />
                    <h4 className="font-semibold text-lg text-gray-800">Top Rated</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">Consistently five-star rated by thousands of travelers.</p>
                </div>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
}