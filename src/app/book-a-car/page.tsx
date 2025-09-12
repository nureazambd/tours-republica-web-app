'use client';
import Layout from '@/components/layout/Layout';
import { Star } from 'lucide-react';
import BookingForm from './BookingForm';
export default function BookCarPage() {
  return (
    <Layout>
    <div className="font-rubik bg-gray-50 text-gray-800">
      
      {/* HERO SECTION */}
      <section className="relative text-white text-center h-[544px] pt-32 px-4 bg-blue-900">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-70"
          style={{ backgroundImage: "url('/images/bookacar/full-shot-adults-traveling-with-kid.png')" }}
        />
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Reliable Airport Transportation You Can Trust
          </h1>
          <p className="text-lg opacity-90">
            Enjoy a smooth, private ride to and from the airport without any hassle.
          </p>
        </div>
      </section>

     <BookingForm/>

      {/* WHY BOOK WITH US */}
      <section className="py-16 text-center">
          <div className="relative z-10 max-w-4xl mx-auto mb-[56px] mt-[112px] px-4">
          <h2 className="text-4xl md:text-[48px] font- text-[24px] mb-2">
            Book now ! It's Quick and Simple
          </h2>
          <p className="text-[16px] opacity-90">
            Secure your booking easily with our trusted, hassle-free process.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {[
            { icon: '🚖', title: 'Airport Welcome Service', describe: 'Friendly representatives greet you on arrival to ensure a smooth start.' },
            { icon: '💰', title: 'Best Price Rate Guaranteed', describe: 'Competitive rates with no hidden fees — get the best value.' },
            { icon: '🚗', title: 'Modern, Comfortable Vehicles', describe: 'Choose from a fleet of clean, well-maintained, and up-to-date cars.' },
            { icon: '📞', title: '24/7 Customer Support', describe: 'We’re here to help anytime, day or night, for a hassle-free experience.' },
          ].map((item, idx) => (
            <div key={idx} className="bg-[#DADFE6] p-6 h-[280px] text-left w-[280px] rounded-lg shadow hover:shadow-md transition">
              <div className='w-[232px] h-[192px]'>
                <div className="text-[48px] mb-[32px]">{item.icon}</div>
              <h3 className="font- text-[24px] text-[20px]">{item.title}</h3>
              <p className="font-regular text-[14px] my-[16px]">{item.describe}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* VEHICLE CATEGORIES */}
      <section className="py-16 bg-gray-100 text-center">
        {/* <h2 className="text-3xl font-bold mb-4">We cover all your transportation needs</h2>
        <p className="text-gray-600 mb-10">Whether you’re traveling as a couple or with a small family, we’ve got you covered.</p> */}

        <div className="relative z-10 max-w-4xl mx-auto mb-[56px] mt-[112px] px-4">
          <h2 className="text-4xl md:text-[48px] font- text-[24px] mb-2">
            We cover all your transportation needs
          </h2>
          <p className="text-[16px] opacity-90">
            Whether you’re traveling as a couple or with a small family, we’ve got you covered.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            { img: '/images/bookacar/vehicles/For-Couples-and-Small-Families.png', label: 'Small - For Couples & Small Families' },
            { img: '/images/bookacar/vehicles/For-Groups-and-Large-Families.png', label: 'Large - For Groups & Big Families' },
            { img: '/images/bookacar/vehicles/Luxury-Executive-Cars.png', label: 'Executive - Luxury Vehicles' },
          ].map((vehicle, idx) => (
            <div key={idx} className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition w-[380px] h-[280px]">
              <img src={vehicle.img} className="w-full h-40 object-contain bg-white p-4" />
              <div className="p-4 font-medium text-gray-700">{vehicle.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* BOOKING STEPS */}
      <section className="py-16 text-center bg-white">
        <div className="relative z-10 max-w-4xl mx-auto mb-[56px] mt-[112px] px-4">
          <h2 className="text-4xl md:text-[48px] font- text-[24px] mb-2">
           Book now ! It's Quick and Simple
          </h2>
          <p className="text-[16px] opacity-90">
            Secure your ride in just a few easy steps — fast, hassle-free, and ready when you are.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {[
          {title:'Choose Route', description:'Select your route and preferred vehicle to confirm and prepare your smooth journey ahead.'},
          {title:'Provide Your Details', description:'Share your personal and contact information to confirm and secure your booking smoothly.'},
          {title:'Payment Details', description:'Complete your secure and easy payment online to confirm and finalize your booking today.'},
          {title:'Meet Your Driver', description:'Meet your professional and friendly driver on time to begin and enjoy your booked ride.'}, 
          // '', 
          // 'Confirm Booking', 
          // 'Meet Driver'
        ].map((step, i) => (
            <div key={i} className="p-4 text-left border rounded-lg shadow bg-gray-50 w-[280px] h-[287px] mx-auto">
              <div className="text-[96px] font-bold text-[#6FCCDC]">0{i + 1}</div>
              <h3 className="font-medium text-[24px]">{step.title}</h3>
              <p className="text-[14px] mt-2 text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HAPPY CUSTOMERS */}
      <section className="py-16 bg-gray-100 text-center">
        <h2 className="text-3xl font-bold mb-6">Happy Customers</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
            <img
              key={i}
              src={`/images/gallery/${i}.jpg`}
              alt={`Customer ${i}`}
              className="rounded-lg object-cover w-full h-32 sm:h-40"
            />
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-16 bg-white text-center">
        <h2 className="text-3xl font-bold mb-10">What Our Clients Say</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="bg-gray-50 p-6 rounded-lg shadow">
              <div className="flex justify-center mb-3">
                {[...Array(5)].map((_, idx) => (
                  <Star key={idx} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-sm">
                "Outstanding service and very professional drivers. Will book again!"
              </p>
              <div className="mt-3 font- text-[24px]">Customer {i}</div>
            </div>
          ))}
        </div>
      </section>

    </div>
    </Layout>
  );
}
