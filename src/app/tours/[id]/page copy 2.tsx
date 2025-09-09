'use client'; // This directive is necessary for using React hooks like useState and useEffect

import { useState, useEffect } from 'react';
import { Star, Clock, Users, Globe, MapPin, Calendar, Plus, Minus, Check, X, ShieldCheck, Phone, Mail } from 'lucide-react';
import type { Metadata } from 'next';

// In a real app, this metadata would be generated dynamically.
// For client components, you'd handle this differently, perhaps in a parent layout or page.
// export const metadata: Metadata = {
//  title: `Tour Details | Tours`,
// };

// You can fetch this data from your API in a real application
const tourData = {
  title: "Santo Domingo City Tour",
  images: [
    "/placeholder-1.jpg",
    "/placeholder-2.jpg",
    "/placeholder-3.jpg",
  ],
  tags: ["New York", "City tour", "Cultural", "New"],
  duration: "8 hours",
  tourType: "Daily Tour",
  groupSize: "30 people",
  language: "English",
  overview: "Discover the magic of Santo Domingo on this immersive city tour. We'll take you through the historic Colonial Zone, a UNESCO World Heritage site, where you'll walk along cobblestone streets and marvel at centuries-old architecture. From the first cathedral of the Americas to the bustling local markets, this tour offers a deep dive into the vibrant culture and rich history of the Dominican Republic's capital.",
  highlights: [
    { img: "/highlight-1.jpg", title: "Catedral Primada de América" },
    { img: "/highlight-2.jpg", title: "Alcázar de Colón" },
    { img: "/highlight-3.jpg", title: "Calle Las Damas" },
  ],
  included: ["Professional guide", "Transportation", "Entrance fees", "Local snacks"],
  excluded: ["Lunch", "Gratuities", "Personal expenses"],
  whatToExpect: [
    { time: "09:00 AM", title: "Hotel Pickup", description: "We start the day by picking you up from your hotel." },
    { time: "10:00 AM", title: "Colonial Zone", description: "Begin our walking tour through the historic heart of the city." },
    { time: "01:00 PM", title: "Lunch Break", description: "Enjoy authentic Dominican cuisine at a local restaurant (lunch not included)." },
    { time: "03:00 PM", title: "Market Visit", description: "Explore a bustling local market and shop for souvenirs." },
    { time: "05:00 PM", title: "Return to Hotel", description: "Conclude the tour and drop you off at your hotel." },
  ],
  reviews: [
    { name: "John Doe", rating: 5, text: "An unforgettable experience! Our guide was knowledgeable and friendly. Highly recommended.", avatar: "/avatar-1.jpg" },
    { name: "Jane Smith", rating: 4, text: "Great tour with a lot of history. The city is beautiful. The pace was a bit fast at times, but overall very good.", avatar: "/avatar-2.jpg" },
    { name: "Sam Wilson", rating: 5, text: "Loved every minute of it. The architecture is stunning and the local food was a highlight. A must-do in Santo Domingo.", avatar: "/avatar-3.jpg" },
  ],
  additionalOptions: [
    { title: "Saona Island Paradise", rating: 4.8, reviews: 120, price: 99, img: "/option-1.jpg" },
    { title: "Monkeyland & Plantation", rating: 4.9, reviews: 250, price: 89, img: "/option-2.jpg" },
    { title: "27 Waterfalls of Damajagua", rating: 4.7, reviews: 95, price: 119, img: "/option-3.jpg" },
  ]
};

// Helper component for Star Rating
const StarRating = ({ rating, reviewCount }: { rating: number; reviewCount?: number }) => (
  <div className="flex items-center">
    <div className="flex text-yellow-400">
      {[...Array(5)].map((_, i) => (
        <Star key={i} size={16} strokeWidth={1} fill={i < Math.floor(rating) ? 'currentColor' : 'none'} />
      ))}
    </div>
    {reviewCount && <span className="ml-2 text-sm text-gray-500">({reviewCount} reviews)</span>}
  </div>
);


// Main Page Component
export default function TourDetailsPage({ params }: { params: { id: string } }) {
  // In a real app, you would use params.id to fetch data for the specific tour
  
  const [adults, setAdults] = useState(1);
  const [youths, setYouths] = useState(0);
  const [children, setChildren] = useState(0);
  const [totalPrice, setTotalPrice] = useState(50);

  const prices = {
      adult: 50,
      youth: 40,
      child: 30
  };

  useEffect(() => {
      const total = (adults * prices.adult) + (youths * prices.youth) + (children * prices.child);
      setTotalPrice(total);
  }, [adults, youths, children]);

  const handlePersonChange = (setter: React.Dispatch<React.SetStateAction<number>>, amount: number) => {
      setter(prev => Math.max(0, prev + amount));
  };
  
  return (
    <div className="bg-white text-gray-800">
      <div className="container mx-auto px-4 py-8">
        
        {/* --- IMAGE GALLERY (Corrected Layout) --- */}
        <div className="grid grid-cols-3 grid-rows-2 gap-2 mb-8 h-[450px]">
            <div className="col-span-2 row-span-2">
                <img src={`https://placehold.co/800x600/a29bfe/ffffff?text=Tour+Image+1`} alt={tourData.title} className="w-full h-full object-cover rounded-lg"/>
            </div>
            <div className="col-span-1 row-span-1">
                 <img src={`https://placehold.co/400x300/74b9ff/ffffff?text=Tour+Image+2`} alt={`${tourData.title} 2`} className="w-full h-full object-cover rounded-lg"/>
            </div>
             <div className="col-span-1 row-span-1">
                 <img src={`https://placehold.co/400x300/ffeaa7/ffffff?text=Tour+Image+3`} alt={`${tourData.title} 3`} className="w-full h-full object-cover rounded-lg"/>
            </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* --- LEFT CONTENT COLUMN --- */}
          <div className="w-full lg:w-2/3">
            <h1 className="text-3xl font-bold mb-2">{tourData.title}</h1>
            <div className="flex flex-wrap gap-2 mb-4">
              {tourData.tags.map(tag => (
                <span key={tag} className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">{tag}</span>
              ))}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-b py-4 mb-6">
              <div className="flex items-center gap-2">
                <Clock className="text-red-500" />
                <div><p className="font-semibold">Duration</p><p className="text-sm text-gray-600">{tourData.duration}</p></div>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="text-red-500" />
                <div><p className="font-semibold">Tour Type</p><p className="text-sm text-gray-600">{tourData.tourType}</p></div>
              </div>
              <div className="flex items-center gap-2">
                <Users className="text-red-500" />
                <div><p className="font-semibold">Group Size</p><p className="text-sm text-gray-600">{tourData.groupSize}</p></div>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="text-red-500" />
                <div><p className="font-semibold">Language</p><p className="text-sm text-gray-600">{tourData.language}</p></div>
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-4">Tour To Highlights</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                {tourData.highlights.map(h =>(
                     <div key={h.title} className="relative rounded-lg overflow-hidden group">
                        <img src={`https://placehold.co/400x300/dfe6e9/2d3436?text=${h.title.replace(/\s/g,'+')}`} alt={h.title} className="w-full h-32 object-cover"/>
                        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-2">
                             <h3 className="text-white font-semibold text-sm">{h.title}</h3>
                        </div>
                     </div>
                ))}
            </div>

            <h2 className="text-2xl font-bold mb-4">Overview</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">{tourData.overview}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                    <h3 className="font-bold text-lg mb-2">Tour Includes</h3>
                    <ul className="space-y-2">
                        {tourData.included.map(item => (
                            <li key={item} className="flex items-center gap-2">
                                <Check className="w-5 h-5 text-green-500 bg-green-100 rounded-full p-1" /> {item}
                            </li>
                        ))}
                    </ul>
                </div>
                 <div>
                    <h3 className="font-bold text-lg mb-2">Tour Excludes</h3>
                    <ul className="space-y-2">
                        {tourData.excluded.map(item => (
                            <li key={item} className="flex items-center gap-2">
                                <X className="w-5 h-5 text-red-500 bg-red-100 rounded-full p-1" /> {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <h2 className="text-2xl font-bold mb-4">What to Expect</h2>
            <div className="relative border-l-2 border-red-500 pl-6 space-y-8 mb-6">
                {tourData.whatToExpect.map(item => (
                     <div key={item.title}>
                        <div className="absolute -left-3 w-5 h-5 bg-red-500 rounded-full border-4 border-white"></div>
                        <p className="font-semibold text-red-500">{item.time}</p>
                        <h3 className="font-bold">{item.title}</h3>
                        <p className="text-sm text-gray-600">{item.description}</p>
                     </div>
                ))}
            </div>
          </div>

          {/* --- RIGHT BOOKING COLUMN (Interactive) --- */}
          <div className="w-full lg:w-1/3">
            <div className="sticky top-24 border rounded-lg p-6 shadow-lg">
                <h3 className="text-xl font-bold mb-4">Book Your Tour</h3>
                <div>
                    <label htmlFor="date" className="font-semibold block mb-2">Date</label>
                    <input type="date" id="date" className="w-full border rounded-md p-2 mb-4" defaultValue={new Date().toISOString().split('T')[0]}/>
                </div>
                <div>
                    <p className="font-semibold mb-2">Number of people</p>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <div>
                                <p>Adults</p>
                                <p className="text-sm text-gray-500">${prices.adult} / per person</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <button onClick={() => handlePersonChange(setAdults, -1)} className="w-8 h-8 rounded-full border bg-gray-100 hover:bg-gray-200 transition-colors disabled:opacity-50" disabled={adults === 0}><Minus size={16}/></button>
                                <span className="w-6 text-center">{adults}</span>
                                <button onClick={() => handlePersonChange(setAdults, 1)} className="w-8 h-8 rounded-full border bg-gray-100 hover:bg-gray-200 transition-colors"><Plus size={16}/></button>
                            </div>
                        </div>
                         <div className="flex justify-between items-center">
                            <div>
                                <p>Youths</p>
                                <p className="text-sm text-gray-500">${prices.youth} / per person</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <button onClick={() => handlePersonChange(setYouths, -1)} className="w-8 h-8 rounded-full border bg-gray-100 hover:bg-gray-200 transition-colors disabled:opacity-50" disabled={youths === 0}><Minus size={16}/></button>
                                <span className="w-6 text-center">{youths}</span>
                                <button onClick={() => handlePersonChange(setYouths, 1)} className="w-8 h-8 rounded-full border bg-gray-100 hover:bg-gray-200 transition-colors"><Plus size={16}/></button>
                            </div>
                        </div>
                         <div className="flex justify-between items-center">
                            <div>
                                <p>Children</p>
                                <p className="text-sm text-gray-500">${prices.child} / per person</p>
                            </div>
                             <div className="flex items-center gap-2">
                                <button onClick={() => handlePersonChange(setChildren, -1)} className="w-8 h-8 rounded-full border bg-gray-100 hover:bg-gray-200 transition-colors disabled:opacity-50" disabled={children === 0}><Minus size={16}/></button>
                                <span className="w-6 text-center">{children}</span>
                                <button onClick={() => handlePersonChange(setChildren, 1)} className="w-8 h-8 rounded-full border bg-gray-100 hover:bg-gray-200 transition-colors"><Plus size={16}/></button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="border-t my-4"></div>
                <div className="flex justify-between font-bold text-lg mb-4">
                    <span>Total</span>
                    <span>${totalPrice.toFixed(2)}</span>
                </div>
                <button className="w-full bg-red-500 text-white font-bold py-3 rounded-lg hover:bg-red-600 transition-colors">Book Now</button>
                <p className="text-center text-sm text-gray-500 mt-4 flex items-center justify-center gap-2">
                    <ShieldCheck size={16}/> Secure payment
                </p>
            </div>
          </div>
        </div>

        {/* --- TRAVELER REVIEWS SECTION --- */}
        <div className="mt-16">
            <h2 className="text-3xl font-bold text-center mb-8">What Our Travelers Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {tourData.reviews.map(review => (
                    <div key={review.name} className="border p-6 rounded-lg shadow-sm">
                        <div className="flex items-center mb-4">
                            <img src={`https://placehold.co/50x50/ced6e0/2f3542?text=${review.name.charAt(0)}`} alt={review.name} className="w-12 h-12 rounded-full mr-4"/>
                            <div>
                                <h4 className="font-bold">{review.name}</h4>
                                <StarRating rating={review.rating} />
                            </div>
                        </div>
                        <p className="text-gray-600">"{review.text}"</p>
                    </div>
                ))}
            </div>
        </div>

        {/* --- ADDITIONAL OPTIONS SECTION --- */}
        <div className="mt-16">
            <h2 className="text-3xl font-bold text-center mb-8">Discover Additional Options</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {tourData.additionalOptions.map(option => (
                    <div key={option.title} className="border rounded-lg overflow-hidden group shadow-sm transition-shadow hover:shadow-lg">
                        <img src={`https://placehold.co/400x300/a29bfe/ffffff?text=${option.title.replace(/\s/g,'+')}`} alt={option.title} className="w-full h-48 object-cover"/>
                        <div className="p-4">
                            <h3 className="font-bold text-lg mb-2">{option.title}</h3>
                            <div className="flex justify-between items-center">
                                 <StarRating rating={option.rating} reviewCount={option.reviews}/>
                                 <p className="text-lg font-bold text-red-500">${option.price}</p>
                            </div>
                             <button className="w-full mt-4 bg-white text-red-500 border border-red-500 font-bold py-2 rounded-lg hover:bg-red-500 hover:text-white transition-colors">View Details</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
}

