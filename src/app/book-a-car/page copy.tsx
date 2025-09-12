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

      {/* BOOKING FORM */}
      {/* <section className="bg-white shadow-xl rounded-xl -mt-32 max-w-5xl mx-auto px-6 py-8 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium mb-1 block">Pick-up Location</label>
            <div className="flex items-center border rounded-md px-3 py-2">
              <MapPin className="w-4 h-4 text-gray-400 mr-2" />
              <input className="w-full outline-none" placeholder="Airport or Hotel" />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Drop-off Location</label>
            <div className="flex items-center border rounded-md px-3 py-2">
              <MapPin className="w-4 h-4 text-gray-400 mr-2" />
              <input className="w-full outline-none" placeholder="Hotel or Address" />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Passengers</label>
            <div className="flex items-center border rounded-md px-3 py-2">
              <Users className="w-4 h-4 text-gray-400 mr-2" />
              <input type="number" className="w-full outline-none" placeholder="2" />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          <div>
            <label className="text-sm font-medium mb-1 block">Pickup Date</label>
            <div className="flex items-center border rounded-md px-3 py-2">
              <CalendarDays className="w-4 h-4 text-gray-400 mr-2" />
              <input type="date" className="w-full outline-none" />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Pickup Time</label>
            <div className="flex items-center border rounded-md px-3 py-2">
              <Clock className="w-4 h-4 text-gray-400 mr-2" />
              <input type="time" className="w-full outline-none" />
            </div>
          </div>
          <div className="flex items-end">
            <button className="w-full bg-primary-500 hover:bg-primary-600 text-white font-semibold py-3 rounded-md flex items-center justify-center gap-2 transition">
              <Search className="w-4 h-4" />
              Find Cars
            </button>
          </div>
        </div>
      </section> */}

     <BookingForm/>

      {/* WHY BOOK WITH US */}
      <section className="py-16 text-center">
        <h2 className="text-3xl font-bold mb-10">Why Book With Us?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {[
            { icon: '🚖', title: 'Airport Welcome Service' },
            { icon: '💰', title: 'Best Price Guarantee' },
            { icon: '🚗', title: 'Modern Comfortable Vehicles' },
            { icon: '📞', title: '24/7 Customer Support' },
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
              <div className="text-3xl mb-4">{item.icon}</div>
              <h3 className="font-semibold text-lg">{item.title}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* VEHICLE CATEGORIES */}
      <section className="py-16 bg-gray-100 text-center">
        <h2 className="text-3xl font-bold mb-4">Vehicle Categories</h2>
        <p className="text-gray-600 mb-10">Options for couples, families, and executive travel.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            { img: '/images/vehicles/small.png', label: 'Small - For Couples & Small Families' },
            { img: '/images/vehicles/large.png', label: 'Large - For Groups & Big Families' },
            { img: '/images/vehicles/executive.png', label: 'Executive - Luxury Vehicles' },
          ].map((vehicle, idx) => (
            <div key={idx} className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition">
              <img src={vehicle.img} className="w-full h-40 object-contain bg-white p-4" />
              <div className="p-4 font-medium text-gray-700">{vehicle.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* BOOKING STEPS */}
      <section className="py-16 text-center bg-white">
        <h2 className="text-3xl font-bold mb-8">How It Works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {['Choose Route', 'Provide Details', 'Confirm Booking', 'Meet Driver'].map((step, i) => (
            <div key={i} className="p-6 border rounded-lg shadow bg-gray-50">
              <div className="text-3xl font-bold text-primary-500 mb-2">0{i + 1}</div>
              <p className="font-semibold">{step}</p>
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
              <div className="mt-3 font-semibold">Customer {i}</div>
            </div>
          ))}
        </div>
      </section>

    </div>
    </Layout>
  );
}
