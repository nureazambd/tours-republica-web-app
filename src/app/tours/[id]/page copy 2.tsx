// app/tours/[id]/page.tsx
'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import Layout from "@/components/layout/Layout";
import {
  Star,
  Calendar,
  MapPin,
  Users,
  Clock,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

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

  // gallery index
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      setFetchError(null);
      try {
        const res = await fetch(`/api/tours/${id}`, { cache: 'no-store' });
        if (!res.ok) {
          // fallback gracefully
          throw new Error(`API returned ${res.status}`);
        }
        const data = await res.json();
        if (mounted) {
          // normalize id
          setTour({ ...data, id: data.id ?? data._id });
        }
      } catch (err: any) {
        // use fallback tour if API fails
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
    // merge with fallback for any missing fields
    return {
      id: (tour.id ?? tour._id) ?? FALLBACK_TOUR.id,
      title: tour.title ?? FALLBACK_TOUR.title,
      image: tour.image ?? FALLBACK_TOUR.image,
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
    // route to payment
    router.push(`/payment/${chosenTour.id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="text-gray-600">Loading tour details…</div>
      </div>
    );
  }

  return (
    <Layout>
    <div className="min-h-screen bg-white text-black py-8">
      <div className="container mx-auto px-4">
        <div className="rounded-xl overflow-hidden shadow-md bg-white">
              <div className="grid grid-cols-3 gap-2">
                {/* left large image */}
                <div className="col-span-2 relative">
                  <Image
                    src={chosenTour.gallery[activeIdx] || chosenTour.image}
                    alt={`${chosenTour.title} image ${activeIdx + 1}`}
                    width={1200}
                    height={700}
                    className="w-full h-96 object-cover"
                    priority
                  />
                </div>

                {/* right vertical thumbnails */}
                <div className="flex flex-col gap-2 p-2">
                  {chosenTour.gallery.slice(0, 2).map((g, i) => (
                    <button
                      key={g + i}
                      onClick={() => { setActiveIdx(i); }}
                      className={`relative w-full h-44 overflow-hidden rounded-md border ${activeIdx === i ? 'border-rose-500' : 'border-gray-200'}`}
                    >
                      <Image
                        src={g}
                        alt={`${chosenTour.title} thumb ${i + 1}`}
                        width={400}
                        height={240}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
        {/* Breadcrumbs */}
        <div className="text-sm text-gray-500 mb-4">
          <a href="/" className="text-rose-500 hover:underline">Home</a> &gt; <a href="/tours" className="hover:underline">Tours</a> &gt; <span className="text-gray-700">{chosenTour.location}</span> &gt; <span className="font-semibold text-gray-900">{chosenTour.title}</span>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left / Main */}
          <div className="lg:col-span-2 space-y-6">
            {/* Top gallery */}
            

            {/* Title and summary */}
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{chosenTour.title}</h1>
                  <div className="flex items-center gap-3 mt-2 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400" />
                      <span className="font-medium">{chosenTour.rating?.toFixed(1)}</span>
                      <span className="text-gray-500">({chosenTour.reviewCount} Reviews)</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span>{chosenTour.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span>{chosenTour.location}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-sm text-gray-500">From</div>
                  <div className="text-2xl font-bold text-rose-600">${chosenTour.price.toFixed(2)} <span className="text-sm text-gray-500 font-normal">pp</span></div>
                  {chosenTour.discount && (
                    <div className="text-sm text-green-600 mt-1">{chosenTour.discount}% off</div>
                  )}
                </div>
              </div>

              <p className="mt-4 text-gray-700 leading-relaxed">{chosenTour.overview}</p>

              {/* details grid */}
              <div className="grid sm:grid-cols-3 gap-4 mt-6 text-sm text-gray-700">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <div>
                    <div className="text-xs text-gray-500">Select Date</div>
                    <div className="font-medium">{date}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <div>
                    <div className="text-xs text-gray-500">Pickup</div>
                    <div className="font-medium">{chosenTour.pickup}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-gray-400" />
                  <div>
                    <div className="text-xs text-gray-500">Availability</div>
                    <div className="font-medium">Everyday</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tour Highlights / Included / Not Included / Itinerary */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">What's Included</h3>
                <ul className="text-sm text-gray-700 space-y-2">
                  {chosenTour.included.map((inc) => (
                    <li key={inc} className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-rose-500 rounded-full mt-2 flex-shrink-0" />
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">What's Not Included</h3>
                <ul className="text-sm text-gray-700 space-y-2">
                  {chosenTour.excluded.map((exc) => (
                    <li key={exc} className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-gray-300 rounded-full mt-2 flex-shrink-0" />
                      <span>{exc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border md:col-span-2">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Itinerary</h3>
                <div className="space-y-3 text-sm text-gray-700">
                  {chosenTour.itinerary.map((row, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-20 text-sm text-gray-500">{row.time}</div>
                      <div>{row.text}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Additional Info / FAQ placeholder */}
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Important Information</h3>
              <div className="text-sm text-gray-700 space-y-2">
                <p>Reservations accepted up to 24 hours before the activity. Free cancellation up to 24 hours before departure.</p>
                <p>Accessibility: Wheelchair accessible with accompanying person.</p>
                <p>Provider: Tours Republica | Local Certified Guides</p>
              </div>
            </div>
          </div>

          {/* Right / Sticky booking sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-xl p-6 shadow-md border">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-500">From</div>
                  <div className="text-2xl font-bold text-rose-600">${chosenTour.price.toFixed(2)}</div>
                  <div className="text-xs text-gray-500">per person</div>
                </div>
                <div className="text-right text-sm">
                  <div className="font-medium">{chosenTour.rating?.toFixed(1)}</div>
                  <div className="text-gray-500 text-xs">({chosenTour.reviewCount} reviews)</div>
                </div>
              </div>

              <div className="mt-4 text-sm">
                <label className="block text-gray-600 mb-1">Select date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full border rounded-md px-3 py-2"
                />
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2 text-sm text-center">
                <div>
                  <div className="text-xs text-gray-500">Adults</div>
                  <div className="mt-2 flex items-center justify-center gap-2">
                    <button onClick={() => setAdults(Math.max(1, adults - 1))} className="w-7 h-7 rounded-full border">-</button>
                    <div className="w-9">{adults}</div>
                    <button onClick={() => setAdults(adults + 1)} className="w-7 h-7 rounded-full border">+</button>
                  </div>
                </div>

                <div>
                  <div className="text-xs text-gray-500">Children</div>
                  <div className="mt-2 flex items-center justify-center gap-2">
                    <button onClick={() => setChildren(Math.max(0, children - 1))} className="w-7 h-7 rounded-full border">-</button>
                    <div className="w-9">{children}</div>
                    <button onClick={() => setChildren(children + 1)} className="w-7 h-7 rounded-full border">+</button>
                  </div>
                </div>

                <div>
                  <div className="text-xs text-gray-500">Infants</div>
                  <div className="mt-2 flex items-center justify-center gap-2">
                    <button onClick={() => setInfants(Math.max(0, infants - 1))} className="w-7 h-7 rounded-full border">-</button>
                    <div className="w-9">{infants}</div>
                    <button onClick={() => setInfants(infants + 1)} className="w-7 h-7 rounded-full border">+</button>
                  </div>
                </div>
              </div>

              <div className="mt-4 border-t pt-4 text-sm text-gray-700 space-y-2">
                <div className="flex justify-between"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between text-gray-500"><span>Tax (10%)</span><span>${tax.toFixed(2)}</span></div>
                <div className="flex justify-between font-semibold text-lg border-t pt-3"><span>Total</span><span>${total.toFixed(2)}</span></div>
              </div>

              <button
                onClick={handleBookNow}
                className="w-full mt-4 bg-rose-500 text-white py-3 rounded-lg font-semibold hover:bg-rose-600 transition"
              >
                Book Now → 
              </button>

              <div className="mt-4 text-center text-xs text-gray-500">
                SSL Secure Payment • Money-back Guarantee
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
    </Layout>
  );
}
