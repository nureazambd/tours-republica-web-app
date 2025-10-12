// app/car-booking-payment/[id]/page.tsx
"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { ChevronDown, MapPin, Clock } from 'lucide-react';

// --- MOCK DATA ---
// In a real app, you would fetch this from your API using the `id`.
// Make sure the image path '/images/car-booking.png' exists in your /public folder.
const MOCK_CAR_DATABASE: { [key: string]: any } = {
  '1': {
    id: '1',
    name: 'Toyota Corolla, 2023',
    image: '/images/car-booking.png',
    traveler: '03',
    baggage: '5pcs',
    price: 138, // The base price of the car rental
    pickupLocation: 'Samaná Airport',
    dropoffLocation: 'Hotel King, Punta Cana',
    pickupDate: 'Mon, Jan 24, 04:00PM',
    pickupTime: '02:30 PM',
    duration: '3h 30m',
  },
  // Add other mock cars here as needed
};

// --- Reusable FAQ Item Component ---
const FaqItem = ({ question, children }: { question: string; children: React.ReactNode }) => (
  <details className="group border-b last:border-b-0">
    <summary className="flex justify-between items-center font-medium cursor-pointer list-none py-4">
      <span>{question}</span>
      <span className="transition group-open:rotate-180">
        <ChevronDown className="w-5 h-5" />
      </span>
    </summary>
    <div className="text-neutral-600 pb-4 text-sm">{children}</div>
  </details>
);

// --- Main Page Component ---
export default function CarBookingPaymentPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [car, setCar] = useState<any>(null);
  const [bookingDetails, setBookingDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // State for the form fields
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', countryCode: 'US',
    phoneNumber: '', airline: '', flightNumber: '', remarks: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('visa');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  useEffect(() => {
    // 1. Retrieve dynamic booking details from sessionStorage
    const storedDetails = sessionStorage.getItem('bookingDetails');
    if (storedDetails) {
      setBookingDetails(JSON.parse(storedDetails));
    } else {
      console.error("Booking details not found in session storage.");
      // Optional: Redirect if data is missing, to prevent errors
      // router.push('/'); 
    }

    // 2. Fetch static car data (mocked here)
    if (id && MOCK_CAR_DATABASE[id]) {
      setCar(MOCK_CAR_DATABASE[id]);
    }
    
    setLoading(false);
  }, [id, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedToTerms) {
      alert("Please agree to the Terms and Conditions to proceed.");
      return;
    }
    // Combine all data into a final payload for your API
    const finalPayload = {
      carId: id,
      carDetails: car,
      travelerInfo: formData,
      paymentMethod,
      bookingSummary: bookingDetails,
    };

    console.log("Submitting Booking Payload:", finalPayload);
    alert("Booking Confirmed! (Check the browser console for the data payload).");
    
    // In a real app, you would send this to your backend:
    // await fetch('/api/bookings', { method: 'POST', body: JSON.stringify(finalPayload) });
    
    // Then redirect to a confirmation page
    router.push('/booking-confirmation'); 
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }
  
  if (!car || !bookingDetails) {
     return <div className="flex justify-center items-center h-screen text-red-500">Could not load booking information. Please try again.</div>;
  }

  return (
    <div className="bg-gray-50/50 min-h-screen py-8 md:py-12">
      <div className="container mx-auto px-4">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Left Column: Forms */}
          <div className="lg:col-span-2 space-y-8">
            {/* Traveler Information */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h2 className="text-xl font-bold mb-5">Traveler information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input name="firstName" onChange={handleInputChange} placeholder="First name" className="w-full p-3 border rounded-md" required/>
                <input name="lastName" onChange={handleInputChange} placeholder="Last name" className="w-full p-3 border rounded-md" required/>
                <input name="email" type="email" onChange={handleInputChange} placeholder="you@company.com" className="w-full p-3 border rounded-md" required/>
                <div className="flex">
                  <select name="countryCode" onChange={handleInputChange} className="border-r-0 border rounded-l-md bg-gray-100 p-3">
                    <option>US</option><option>CA</option><option>UK</option>
                  </select>
                  <input name="phoneNumber" type="tel" onChange={handleInputChange} placeholder="+1 (555) 000-0000" className="w-full p-3 border rounded-r-md" required/>
                </div>
              </div>
            </div>

            {/* Flight Information */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h2 className="text-xl font-bold mb-5">Flight information</h2>
              <div className="grid grid-cols-1 gap-4">
                <input name="airline" onChange={handleInputChange} placeholder="Airline and flight number" className="w-full p-3 border rounded-md" />
                <textarea name="remarks" onChange={handleInputChange} placeholder="Write here...." rows={4} className="w-full p-3 border rounded-md"></textarea>
              </div>
            </div>

            {/* Payment Details */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h2 className="text-xl font-bold mb-5">Payment details</h2>
              <div className="space-y-3">
                <label className="flex items-center p-4 border rounded-md cursor-pointer has-[:checked]:bg-blue-50 has-[:checked]:border-blue-500">
                    <input type="radio" name="payment" value="cash" checked={paymentMethod === 'cash'} onChange={() => setPaymentMethod('cash')} className="mr-3" /> Cash payment</label>
                <label className="flex items-center p-4 border rounded-md cursor-pointer has-[:checked]:bg-blue-50 has-[:checked]:border-blue-500">
                    <input type="radio" name="payment" value="paypal" checked={paymentMethod === 'paypal'} onChange={() => setPaymentMethod('paypal')} className="mr-3" /> PayPal</label>
                <label className="flex items-center p-4 border rounded-md cursor-pointer has-[:checked]:bg-blue-50 has-[:checked]:border-blue-500">
                    <input type="radio" name="payment" value="visa" checked={paymentMethod === 'visa'} onChange={() => setPaymentMethod('visa')} className="mr-3" /> 
                    <Image src="/images/payment-methods.png" alt="Credit Cards" width={120} height={24} />
                </label>
              </div>
            </div>
            
            <div className="mt-6 flex items-start">
              <input type="checkbox" id="terms" checked={agreedToTerms} onChange={(e) => setAgreedToTerms(e.target.checked)} className="mr-3 mt-1 h-4 w-4" />
              <label htmlFor="terms" className="text-sm text-gray-600">By continuing, you agree to the <a href="#" className="underline text-blue-600">Terms and Conditions</a></label>
            </div>

            <button type="submit" disabled={!agreedToTerms} className="w-full bg-rose-500 text-white font-bold py-3 rounded-lg mt-2 text-lg hover:bg-rose-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed">
              Confirm booking →
            </button>
          </div>

          {/* Right Column: Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-4">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <Image src={car.image} alt={car.name} width={400} height={240} className="rounded-lg object-cover mb-4 w-full" />
                
                <div className="space-y-3 text-sm text-gray-800">
                    <div className="flex items-start"><MapPin className="w-4 h-4 mr-3 mt-1 text-gray-400 flex-shrink-0" /><div><strong className="block">{car.pickupLocation}</strong><span className="text-gray-500">{car.pickupTime}</span></div></div>
                    <div className="flex items-start"><Clock className="w-4 h-4 mr-3 mt-1 text-gray-400 flex-shrink-0" /><div>{car.duration}</div></div>
                    <div className="flex items-start"><MapPin className="w-4 h-4 mr-3 mt-1 text-gray-400 flex-shrink-0" /><div><strong className="block">{car.dropoffLocation}</strong><span className="text-gray-500">{car.pickupDate}</span></div></div>
                </div>

                <div className="border-t my-4"></div>

                <h3 className="font-semibold mb-2">Booking details</h3>
                <div className="space-y-1 text-sm text-gray-700">
                    <div className="flex justify-between"><span>Select Date</span><span>02/25/2024</span></div>
                    <div className="flex justify-between"><span>Car Type</span><span>{car.name}</span></div>
                    <div className="flex justify-between"><span>Traveler</span><span>{car.traveler}</span></div>
                    <div className="flex justify-between"><span>Baggage</span><span>{car.baggage}</span></div>
                    <div className="text-green-600 text-xs mt-2 font-medium">Free cancellation up to 48 hours before</div>
                </div>

                <div className="border-t my-4"></div>
                
                <h3 className="font-semibold mb-2">Payment details</h3>
                 <div className="space-y-2 text-sm text-gray-700">
                    <div className="flex justify-between items-baseline"><span>Total</span><span className="font-bold text-xl text-black">${bookingDetails.total.toFixed(2)}</span></div>
                    <input type="text" placeholder="Have a promo code?" className="w-full p-2 border rounded-md mt-2 text-sm" />
                </div>
              </div>

              <div className="bg-red-50 text-red-800 p-4 rounded-lg mt-4 text-center font-semibold">
                <a href="tel:+18296185692">+1 (829) 618 5692</a>
                <div className="text-sm font-normal">reserves@toursrepublica.com</div>
              </div>
            </div>
          </div>

          {/* FAQs below the form on the left */}
          <div className="lg:col-span-2 mt-8">
            <h2 className="text-xl font-bold mb-4">Frequently Asked Questions</h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
                <FaqItem question="How do I book a tour with ToursRepublica?">We pick up from most hotels and central locations. During booking, you can choose your preferred pickup point. Exact details will be in your confirmation email.</FaqItem>
                <FaqItem question="Do you offer private or customized tours?">Yes, we offer both. Please contact our support team to discuss your specific needs and we will create a personalized itinerary for you.</FaqItem>
                <FaqItem question="Is transportation included in the tours?">Transportation is included in most of our tours. Please check the 'Inclusions' section on the specific tour page for detailed information.</FaqItem>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}