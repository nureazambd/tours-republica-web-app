'use client';
import Layout from '@/components/layout/Layout';
import { Star } from 'lucide-react';
import BookingForm from './BookingForm';
export default function BookCarPage() {
  return (
    <Layout>
    <div className="font-rubik bg-gray-50 text-gray-800">
      
      {/* HERO SECTION */}
      <section className="relative text-white text-center h-[544px]  pt-[56px] px-4 bg-[#003459]">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-70"
          style={{ backgroundImage: "url('/images/bookacar/full-shot-adults-traveling-with-kid.png')" }}
        />
        
        {/* <div className="relative z-10 w-[991.32px] mx-auto">
          <h1 className="text-4xl font-[Rubik]
    font-medium
    text-[40px] md:text-[64px]
    leading-[44px] md:leading-[68px]
    tracking-[0]
    text-center
    align-middle
    mb-4">
            Reliable Airport Transportation You Can Trust
          </h1>
          <p className="text-[20px] font-[400] opacity-90">
            Enjoy a smooth, private ride to and from the airport without any hassle.
          </p>
        </div> */}

         <div className="relative z-10 lg:w-[991.32px] mx-auto">
          <BookingForm/>
        </div>
      </section>

     {/* <BookingForm/> */}

      {/* WHY BOOK WITH US */}
      {/* <section className="py-16 text-center">
          <div className="relative z-10 max-w-4xl mx-auto mb-[56px] mt-[112px] px-4">
          <h2 className="text-4xl md:text-[48px] font-medium text-[24px] mb-2">
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
            <div key={idx} className="bg-gray-100 h-[256px] px-[24px] py-[32px] text-left w-[280px] rounded-lg shadow hover:shadow-md transition">
              <div className='w-[232px] h-[192px]'>
                <div className="text-[48px] pb-[32px] ">{item.icon}</div>
              <h3 className="font-medium text-[20px]">{item.title}</h3>
              <p className="font-regular text-[14px] my-[16px]">{item.describe}</p>
              </div>
            </div>
          ))}
        </div>
      </section> */}

      <section className="py-16 text-center">
  <div className="relative z-10 max-w-4xl mx-auto mb-14 mt-28 px-4">
    <h2 className="text-4xl md:text-[48px] font-medium text-[24px] mb-2">
      Book now! It's Quick and Simple
    </h2>
    <p className="text-[16px] opacity-90">
      Secure your booking easily with our trusted, hassle-free process.
    </p>
  </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
    {[
      {
        icon: '🚖',
        title: 'Airport Welcome Service',
        describe: 'Friendly representatives greet you on arrival to ensure a smooth start.',
      },
      {
        icon: '💰',
        title: 'Best Price Rate Guaranteed',
        describe: 'Competitive rates with no hidden fees — get the best value.',
      },
      {
        icon: '🚗',
        title: 'Modern, Comfortable Vehicles',
        describe: 'Choose from a fleet of clean, well-maintained, and up-to-date cars.',
      },
      {
        icon: '📞',
        title: '24/7 Customer Support',
        describe: 'We’re here to help anytime, day or night, for a hassle-free experience.',
      },
    ].map((item, idx) => (
      <div
        key={idx}
        className="bg-gray-100 p-6  text-left rounded-lg shadow hover:shadow-md transition duration-300 w-[280px] h-[256px] mx-auto flex flex-col items-start"
      >
        <div className="text-[40px] mb-6">{item.icon}</div>
        <h3 className="font-medium text-[20px] mb-2">{item.title}</h3>
        <p className="font-regular text-[14px] text-gray-700">{item.describe}</p>
      </div>
    ))}
  </div>
</section>


      {/* VEHICLE CATEGORIES */}
      <section className="py-16 bg-gray-100 text-center">
        {/* <h2 className="text-3xl font-bold mb-4">We cover all your transportation needs</h2>
        <p className="text-gray-600 mb-10">Whether you’re traveling as a couple or with a small family, we’ve got you covered.</p> */}

        <div className="relative z-10 max-w-4xl mx-auto mb-[56px] mt-[112px] px-4">
          <h2 className="text-4xl md:text-[48px] font-medium text-[24px] mb-2">
            We cover all your transportation needs
          </h2>
          <p className="text-[16px] opacity-90">
            Whether you’re traveling as a couple or with a small family, we’ve got you covered.
          </p>
        </div>
        <div className="grid grid-cols-1 bg-gray-100 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            { img: '/images/bookacar/vehicles/For-Couples-and-Small-Families.png', label: 'Small - For Couples & Small Families' },
            { img: '/images/bookacar/vehicles/For-Groups-and-Large-Families.png', label: 'Large - For Groups & Big Families' },
            { img: '/images/bookacar/vehicles/Luxury-Executive-Cars.png', label: 'Executive - Luxury Vehicles' },
          ].map((vehicle, idx) => (
            <div key={idx} className="bg-gray-100 rounded-xl overflow-hidden shadow hover:shadow-lg transition w-[380px] h-[280px]">
              <img src={vehicle.img} className="w-full h-40 object-contain bg-gray-100 p-4" />
              <div className="p-4 font-medium text-[20px] text-gray-700">{vehicle.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* BOOKING STEPS */}
      <section className="py-16 text-center bg-white">
        <div className="relative z-10 max-w-4xl mx-auto mb-[56px] mt-[112px] px-4">
          <h2 className="text-4xl md:text-[48px] font-medium text-[24px] mb-2">
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
        {/* <h2 className="text-3xl font-bold mb-6">Happy Customers</h2> */}
        <div className="relative z-10 max-w-4xl mx-auto mb-[56px] mt-[112px] px-4">
          <h2 className="text-4xl md:text-[48px] font-medium text-[24px] mb-2">
           Some of our happy customer
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
            <img
              key={i}
              src={`/images/bookacar/customer/${i}.png`}
              alt={`Customer ${i}`}
              className="rounded-lg object-cover w-full h-32 sm:h-40"
            />
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}


      <section className="py-16 bg-white text-center">
  <div className="relative z-10 max-w-4xl mx-auto mb-14 mt-28 px-4">
    <h2 className="text-4xl md:text-[48px] font-medium text-[24px] mb-2">
      What Our Travelers Say
    </h2>
  </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
    {[
      {
        name: "Marcus R.",
        country: "Canada",
        avatar: "/images/bookacar/travelers/img-1.png", // Replace with actual image path
      },
      {
        name: "Elena K.",
        country: "UK",
        avatar: "/images/bookacar/travelers/img-2.png",
      },
      {
        name: "Sophia M.",
        country: "USA",
        avatar: "/images/bookacar/travelers/img-3.png",
      },
    ].map((person, i) => (
      <div
        key={i}
        className="bg-gray-50 p-6 rounded-lg shadow-md text-left flex flex-col justify-between h-full"
      >
        <div className="text-cyan-500 text-4xl mb-4">“</div>

        <div className="mb-4">
          <div className="flex items-center space-x-1 mb-2">
            {[...Array(5)].map((_, idx) => (
              <svg
                key={idx}
                className="w-5 h-5 text-yellow-400 fill-current"
                viewBox="0 0 20 20"
              >
                <path d="M10 15l-5.878 3.09L5.5 12.18.5 7.91l6.122-.89L10 1.5l3.378 5.52 6.122.89-5 4.27 1.378 5.91z" />
              </svg>
            ))}
          </div>
          <p className="text-sm text-gray-700">
            "The local guides were incredible! They showed us hidden gems we
            would have never found on our own. Truly an authentic experience."
          </p>
        </div>

        <div className="flex items-center space-x-3 mt-4">
          <img
            src={person.avatar}
            alt={person.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <div className="font-semibold text-sm">{person.name}</div>
            <div className="text-gray-500 text-xs">{person.country}</div>
          </div>
        </div>
      </div>
    ))}
  </div>
</section>


    </div>
    </Layout>
  );
}
