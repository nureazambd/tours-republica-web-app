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
import FeaturedTours from '@/components/home/FeaturedTours-id';
import TourGallerySection from './TourGallerySection';
import TourHeader from './TourHeader';
import TourHighlights from './TourHighlights';
import MoreInformationSection from './MoreInformationSection';
import TravelersSay from './TravelersSay';
import TourGrid from './TourGrid';
import SecurePaymentSection from './SecurePaymentSection';
import BookYourTourAside from './BookYourTourAside ';

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
  const [showMore, setShowMore] = useState(false);
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
        <div className="max-w-[1180px] mx-auto px-4 lg:px-0 pt-4">

          {/* Top Section: Header and Gallery */}
          <TourGallerySection chosenTour={{
            title: '',
            image: '',
            rating: undefined,
            reviewCount: undefined,
            discount: undefined
          }} galleryThumbs={[mainImageSrc]} />

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 mx-auto gap-4">

            {/* Left / Main Content Column */}
            <div className="lg:col-span-2  space-y-4">
              {/* <div>Home>Tour>Dominican Repubic>Santo Domingo>Santo Domingo City Tour</div> */}

              <TourHeader chosenTour={{
                title: chosenTour.title,
                rating: chosenTour.rating,
                reviewCount: chosenTour.reviewCount
              }} />

              {/* Remaining Content */}
              <div className="">
                {/* Content of the next section starts here */}
              </div>

              {/* ------------------+-------------------------+----------------------------------- */}


              {/* Main container for the entire content area, immediately following the header/cards.
    Using a light gray background for the overall page content. */}
              <div className="bg-gray-50 pb-16">
                <div className=" mx-auto px-4 sm:px-6 lg:px-0">

                  {/* Overview Section */}
                  {/* <section className="mb-12">
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
                  </section> */}

                  <section className="mb-12">
      <h2 className="text-[28px] font-[500] text-[#191919] mb-4">Overview</h2>

      {/* <p className="text-gray-700 leading-relaxed mb-4 text-[14px] font-[400]">
        Santo Domingo, the capital city of the Dominican Republic, is the economic, political and cultural center of the country and the Caribbean's most populous city. Located on the Caribbean Sea at the mouth of the Ozama River, the city was founded by Bartholomew Columbus in 1496, making it the first permanent European settlement in the Americas. It is also, incredibly, the first city in the Americas to host a university, hospital, cathedral, and customs house.
      </p> */}

      {showMore && (
        <p className="text-gray-700 leading-relaxed mb-4 text-[14px] font-[400]">
          The city is home to the first cathedral, hospital, customs house and university in the Americas. It is a UNESCO World Heritage Site.
        </p>
      )}

      <button
        onClick={() => setShowMore(!showMore)}
        className="text-[#EE2552] text-[16px] font-[500] hover:underline font-semibold"
      >
        {showMore ? 'See less' : 'See more'}
      </button>
    </section>

                  {/* Tour Highlights Section */}
                  <TourHighlights />

                  {/* What's Included / Not Included Section */}
                  <section className="mb-12 mt-[56px]">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                      {/* What's Included */}
                      <div className="bg-[#EFF2F880] p-6 rounded-xl shadow">
                        <h3 className="text-[20px] font-[500] text-[#28A745] mb-4">What's Included</h3>
                        <ul className="space-y-3">
                          <li className="flex items-center text-[#4B5563] text-[14px] font-[400]">
                            {/* <Image
                          src="/images/tours-id/mdi_ticket.png"
                          width={50}
                          height={50}
                          alt="Hotel pickup and drop-off"
                          className="w-5 h-5 text-green-500 mr-2 flex-shrink-0"
                        /> */}
                            <svg width="20" height="20" className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <g clipPath="url(#clip0_916_11875)">
                                <path d="M2 3C2 2.44687 2.44687 2 3 2H17C17.5531 2 18 2.44687 18 3C18 3.55313 17.5531 4 17 4V16C17.5531 16 18 16.4469 18 17C18 17.5531 17.5531 18 17 18H11.5V16.5C11.5 15.6719 10.8281 15 10 15C9.17188 15 8.5 15.6719 8.5 16.5V18H3C2.44687 18 2 17.5531 2 17C2 16.4469 2.44687 16 3 16V4C2.44687 4 2 3.55313 2 3ZM5 5.5V6.5C5 6.775 5.225 7 5.5 7H6.5C6.775 7 7 6.775 7 6.5V5.5C7 5.225 6.775 5 6.5 5H5.5C5.225 5 5 5.225 5 5.5ZM9.5 5C9.225 5 9 5.225 9 5.5V6.5C9 6.775 9.225 7 9.5 7H10.5C10.775 7 11 6.775 11 6.5V5.5C11 5.225 10.775 5 10.5 5H9.5ZM13 5.5V6.5C13 6.775 13.225 7 13.5 7H14.5C14.775 7 15 6.775 15 6.5V5.5C15 5.225 14.775 5 14.5 5H13.5C13.225 5 13 5.225 13 5.5ZM5.5 8C5.225 8 5 8.225 5 8.5V9.5C5 9.775 5.225 10 5.5 10H6.5C6.775 10 7 9.775 7 9.5V8.5C7 8.225 6.775 8 6.5 8H5.5ZM9 8.5V9.5C9 9.775 9.225 10 9.5 10H10.5C10.775 10 11 9.775 11 9.5V8.5C11 8.225 10.775 8 10.5 8H9.5C9.225 8 9 8.225 9 8.5ZM13.5 8C13.225 8 13 8.225 13 8.5V9.5C13 9.775 13.225 10 13.5 10H14.5C14.775 10 15 9.775 15 9.5V8.5C15 8.225 14.775 8 14.5 8H13.5ZM12.25 14C12.6656 14 13.0094 13.6594 12.9062 13.2563C12.575 11.9594 11.4 11 10 11C8.6 11 7.42188 11.9594 7.09375 13.2563C6.99063 13.6563 7.3375 14 7.75 14H12.25Z" fill="#28A745" />
                              </g>
                              <defs>
                                <clipPath id="clip0_916_11875">
                                  <rect width="16" height="16" fill="white" transform="translate(2 2)" />
                                </clipPath>
                              </defs>
                            </svg>

                            <span>Convenient hotel pick-up</span>
                          </li>
                          <li className="flex items-center text-[#4B5563] text-[14px] font-[400]">

                            <svg
                              width="20"
                              height="20"
                              className="w-5 h-5 text-green-500 mr-2 flex-shrink-0"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g clipPath="url(#clip0_916_11880)">
                                <path
                                  d="M10 8C11.0609 8 12.0783 7.57857 12.8284 6.82843C13.5786 6.07828 14 5.06087 14 4C14 2.93913 13.5786 1.92172 12.8284 1.17157C12.0783 0.421427 11.0609 0 10 0C8.93913 0 7.92172 0.421427 7.17157 1.17157C6.42143 1.92172 6 2.93913 6 4C6 5.06087 6.42143 6.07828 7.17157 6.82843C7.92172 7.57857 8.93913 8 10 8ZM8.57188 9.5C5.49375 9.5 3 11.9937 3 15.0719C3 15.5844 3.41563 16 3.92813 16H16.0719C16.5844 16 17 15.5844 17 15.0719C17 11.9937 14.5063 9.5 11.4281 9.5H8.57188Z"
                                  fill="#28A745"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_916_11880">
                                  <rect width="14" height="16" fill="white" transform="translate(3)" />
                                </clipPath>
                              </defs>
                            </svg>


                            <span>Professional certified guide</span>
                          </li>
                          <li className="flex items-center text-[#4B5563] text-[14px] font-[400]">
                            <svg
                              width="20"
                              height="20"
                              className="w-5 h-5 text-green-500 mr-2 flex-shrink-0"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g clipPath="url(#clip0_916_11885)">
                                <path
                                  d="M16 2C15.5 2 12 3 12 7.5V11C12 12.1031 12.8969 13 14 13H15V17C15 17.5531 15.4469 18 16 18C16.5531 18 17 17.5531 17 17V13V9.5V3C17 2.44687 16.5531 2 16 2ZM5 2.5C5 2.24375 4.80938 2.03125 4.55313 2.00313C4.29688 1.975 4.06875 2.14375 4.0125 2.39062L3.06562 6.65C3.02187 6.84688 3 7.04688 3 7.24687C3 8.68125 4.09687 9.85938 5.5 9.9875V17C5.5 17.5531 5.94688 18 6.5 18C7.05312 18 7.5 17.5531 7.5 17V9.9875C8.90312 9.85938 10 8.68125 10 7.24687C10 7.04688 9.97812 6.84688 9.93437 6.65L8.9875 2.39062C8.93125 2.14062 8.69688 1.975 8.44375 2.00313C8.19062 2.03125 8 2.24375 8 2.5V6.69375C8 6.8625 7.8625 7 7.69375 7C7.53437 7 7.40312 6.87813 7.3875 6.71875L6.99688 2.45625C6.975 2.19688 6.75938 2 6.5 2C6.24062 2 6.025 2.19688 6.00312 2.45625L5.61562 6.71875C5.6 6.87813 5.46875 7 5.30938 7C5.14062 7 5.00312 6.8625 5.00312 6.69375V2.5H5ZM6.50938 7.25H6.5H6.49062L6.5 7.22813L6.50938 7.25Z"
                                  fill="#28A745"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_916_11885">
                                  <rect width="14" height="16" fill="white" transform="translate(3 2)" />
                                </clipPath>
                              </defs>
                            </svg>


                            <span>Delicious local lunch</span>
                          </li>
                          <li className="flex items-center text-[#4B5563] text-[14px] font-[400]">

                            <svg width="20" height="20" className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M12.9827 14.0002L9.99935 12.0835L7.01602 14.0002L7.91602 10.5668L5.17435 8.3335L8.71602 8.11683L9.99935 4.8335L11.2827 8.11683L14.8243 8.3335L12.0827 10.5668M16.666 10.0002C16.666 9.55814 16.8416 9.13421 17.1542 8.82165C17.4667 8.50909 17.8907 8.3335 18.3327 8.3335V5.00016C18.3327 4.55814 18.1571 4.13421 17.8445 3.82165C17.532 3.50909 17.108 3.3335 16.666 3.3335H3.33268C2.89065 3.3335 2.46673 3.50909 2.15417 3.82165C1.84161 4.13421 1.66602 4.55814 1.66602 5.00016V8.3335C2.10804 8.3335 2.53197 8.50909 2.84453 8.82165C3.15709 9.13421 3.33268 9.55814 3.33268 10.0002C3.33268 10.4422 3.15709 10.8661 2.84453 11.1787C2.53197 11.4912 2.10804 11.6668 1.66602 11.6668V15.0002C1.66602 15.4422 1.84161 15.8661 2.15417 16.1787C2.46673 16.4912 2.89065 16.6668 3.33268 16.6668H16.666C17.108 16.6668 17.532 16.4912 17.8445 16.1787C18.1571 15.8661 18.3327 15.4422 18.3327 15.0002V11.6668C17.8907 11.6668 17.4667 11.4912 17.1542 11.1787C16.8416 10.8661 16.666 10.4422 16.666 10.0002Z" fill="#28A745" />
                            </svg>

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
                      <div className="absolute left-3 top-2 bottom-20 w-0.5 bg-[#FAA523]"></div>

                      {/* Itinerary Item 1 */}
                      <div className="flex items-start relative bg-[#EFF2F880] p-5 rounded-xl shadow-sm border border-gray-100 ml-10">
                        <div className="absolute -left-12 top-4 -translate-y-1/2 w-[40px] h-[32px]  bg-[#FAA523] rounded-full flex items-center justify-center text-white font-bold text-sm z-10">
                          1
                        </div>
                        <div>
                          <h3 className="font-[500] text-[16px] text-[#191919] mb-1">7:30 AM - Morning Pickup</h3>
                          <p className="text-[#4B5563] text-[14px] font-[400]">Hotel pick-ups and comfortable transfer to the Colonial Zone.</p>
                        </div>
                      </div>

                      {/* Itinerary Item 2 */}
                      <div className="flex items-start relative bg-[#EFF2F880] p-5 rounded-xl shadow-sm border border-gray-100 ml-10">
                        <div className="absolute -left-12 top-4 -translate-y-1/2 w-[40px] h-[32px] bg-[#FAA523] rounded-full flex items-center justify-center text-white font-bold text-sm z-10">
                          2
                        </div>
                        <div>
                          <h3 className="font-[500] text-[16px] text-[#191919] mb-1">9:00 AM - Colonial Zone Tour</h3>
                          <p className="text-[#4B5563] text-[14px] font-[400]">Visit to Alcazar de Colon and primative hut/colonial.</p>
                        </div>
                      </div>

                      {/* Itinerary Item 3 */}
                      <div className="flex items-start relative bg-[#EFF2F880] p-5 rounded-xl shadow-sm border border-gray-100 ml-10">
                        <div className="absolute -left-12 top-4 -translate-y-1/2 w-[40px] h-[32px] bg-[#FAA523] rounded-full flex items-center justify-center text-white font-bold text-sm z-10">
                          3
                        </div>
                        <div>
                          <h3 className="font-[500] text-[16px] text-[#191919] mb-1">1:00 PM - Lunch Break</h3>
                          <p className="text-[#4B5563] text-[14px] font-[400]">Traditional food served to flat at a local restaurant</p>
                        </div>
                      </div>

                      {/* Itinerary Item 4 */}
                      <div className="flex items-start relative bg-[#EFF2F880] p-5 rounded-xl shadow-sm border border-gray-100 ml-10">
                        <div className="absolute -left-12 top-4 -translate-y-1/2 w-[40px] h-[32px] bg-[#FAA523] rounded-full flex items-center justify-center text-white font-bold text-sm z-10">
                          4
                        </div>
                        <div>
                          <h3 className="font-[500] text-[16px] text-[#191919] mb-1">4:30 PM - Return</h3>
                          <p className="text-[#4B5563] text-[14px] font-[400]">Transfer back to your hotel</p>
                        </div>
                      </div>

                    </div>
                  </section>

                  <MoreInformationSection />
                </div> {/* End max-w-7xl container */}
              </div> {/* End bg-gray-50 main container */}

              {/* ---------------------------------+------------------------------------+--------------------------------- */}
              {/* ---------------------------------+------------------------------------+--------------------------------- */}

            </div>
            {/* Right / Sticky booking sidebar */}
            <BookYourTourAside />
          </div>

          {/* What Our Travelers Say (Reviews) */}
          <TravelersSay />

          {/* Discover Additional Options - Placeholder for similar tours */}
          <div className=" text-center">
            {/* Horizontal Rule to separate sections */}
            {/* <hr className="border-gray-200" /> */}

            {/* Section 2: Discover Additional Options */}
            <section className="pb-6 ">
              <div className=" ">
                <h2 className="text-[48px] font-[500] text-[#191919] text-center">
                  Discover Additional Options
                </h2>

                <div className="grid  gap-4">


                  {/* <FeaturedTours/> */}
                  <TourGrid />

                </div>
              </div>
            </section>

            <hr className="border-gray-200" />
          </div>

          {/* Why Choose Us / Guarantees */}
          <div className=" pt-10 mb-28 ">
            {/* Section 3: Why Choose Us */}

            <section className="pb-10 ">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4">
                <h2 className="text-[48px] font-[500] text-[#191919] mb-12 text-center">
                  Why Choose Us
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">

                  {/* Feature 1: Instant Confirmation */}
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 flex items-center justify-center mb-4">
                      <Image
                        src="/images/tours-id/Instant-Confirmation.png"
                        width={50}
                        height={50}
                        alt="Secure Payment Methods"
                        className="w-16 h-16 text-orange-500 stroke-2"
                      />
                    </div>
                    <h4 className="font-[500] text-[20px] text-[#191919] mb-2">Instant Confirmation</h4>
                    <p className="text-[#4B5563] text-[14px] font-[400] px-2">
                      Our prices are final - no unexpected fees after you checkout.
                    </p>
                  </div>

                  {/* Feature 2: No Hidden Fees */}
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 flex items-center justify-center mb-4">
                      <Image
                        src="/images/tours-id/No-Hidden-Fees.png"
                        width={50}
                        height={50}
                        alt="Secure Payment Methods"
                        className="w-16 h-16 text-orange-500 stroke-2"
                      />
                    </div>
                    <h4 className="font-[500] text-[20px] text-[#191919] mb-2">No Hidden Fees</h4>
                    <p className="text-[#4B5563] text-[14px] font-[400] px-2">
                      What you see is what you pay - no surprises!
                    </p>
                  </div>

                  {/* Feature 3: Free Cancellation */}
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 flex items-center justify-center mb-4">
                      <Image
                        src="/images/tours-id/Free-Cancellation.png"
                        width={50}
                        height={50}
                        alt="Secure Payment Methods"
                        className="w-16 h-16 text-orange-500 stroke-2"
                      />
                    </div>
                    <h4 className="font-[500] text-[20px] text-[#191919] mb-2">Free Cancellation</h4>
                    <p className="text-[#4B5563] text-[14px] font-[400] px-2">
                      Cancel or modify up to 24 hours before travel.
                    </p>
                  </div>

                  {/* Feature 4: Secured Payment */}
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 flex items-center justify-center mb-4">
                      <Image
                        src="/images/tours-id/Secured-Payment.png"
                        width={50}
                        height={50}
                        alt="Secure Payment Methods"
                        className="w-16 h-16 text-orange-500 stroke-2"
                      />
                    </div>
                    <h4 className="font-[500] text-[20px] text-[#191919] mb-2">Secured Payment</h4>
                    <p className="text-[#4B5563] text-[14px] font-[400] px-2">
                      Your payment details are encrypted for security.
                    </p>
                  </div>

                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Section: Secure Payment Methods Image */}
        <SecurePaymentSection />

      </div>
    </Layout>
  );
}