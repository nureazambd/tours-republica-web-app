'use client';
import Layout from '@/components/layout/Layout';
import { Star } from 'lucide-react';
import BookingForm from './BookingForm';
import TravelerTestimonials from './Testimonials';
import BookingFeaturesSection from './BookingFeaturesSection';
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

     <BookingFeaturesSection/>

      {/* VEHICLE CATEGORIES */}
      <section className="flex flex-col items-center px-[130px] pt-[104px] pb-[128px] gap-[56px] w-full bg-[rgba(239,242,248,0.5)]">
  {/* Header */}
  <div className="flex flex-col items-center gap-[8px] w-[1170px] text-center">
    <h2 className="font-rubik font-medium text-[48px] leading-[56px] text-[#191919] w-[732px]">
      We cover all your transportation needs
    </h2>
    <p className="font-rubik font-normal text-[16px] leading-[26px] text-[#878D97] w-[1170px]">
      Whether you’re traveling as a couple or with a small family, we’ve got you covered.
    </p>
  </div>

  {/* Vehicles Cards */}
  <div className="flex flex-wrap justify-center gap-[20px] w-[1180px]">
    {[
      {
        img: '/images/bookacar/vehicles/For-Couples-and-Small-Families.png',
        label: 'For Couples and Small Families',
      },
      {
        img: '/images/bookacar/vehicles/For-Groups-and-Large-Families.png',
        label: 'For Groups and Large Families',
      },
      {
        img: '/images/bookacar/vehicles/Luxury-Executive-Cars.png',
        label: 'Luxury & Executive Cars',
      },
    ].map((vehicle, idx) => (
      <div key={idx}>
      <div
        key={idx}
        className="flex flex-col items-center gap-[24px] p-[16px] w-[380px] h-[232px] bg-[#EFF2F8] border border-[#BECCE8] rounded-[24px] hover:shadow-lg transition-shadow"
      >
        {/* Image */}
        <div className="w-[316px] h-[200px] relative ">
          <img
            src={vehicle.img}
            alt={vehicle.label}
            className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-full object-contain"
          />
        </div>

        
      </div>
      
        <div className="font-rubik font-medium mt-[24px] text-[20px] leading-[24px] text-[#191919] text-center w-full">
          {vehicle.label}
        </div>
      </div>
    ))}
  </div>
</section>


      {/* BOOKING STEPS */}
      <section className="flex flex-col items-center py-[112px] px-[130px] gap-[56px] bg-white text-center">
  {/* Header */}
  <div className="flex flex-col items-center gap-[8px] w-[1170px]">
    <h2 className="w-[1170px] text-[48px] leading-[56px] font-medium font-rubik text-[#191919]">
      Book now ! It's Quick and Simple
    </h2>
    <p className="w-[1170px] text-[16px] leading-[26px] font-normal font-rubik text-[#878D97]">
      Secure your ride in just a few easy steps — fast, hassle-free, and ready when you are.
    </p>
  </div>

  {/* Steps */}
  <div className="flex flex-row flex-wrap justify-between gap-[24px] w-[1180px]">
    {[
      {
        title: 'Choose Route',
        description:
          'Select your route and preferred vehicle to confirm and prepare your smooth journey ahead.',
      },
      {
        title: 'Provide Your Details',
        description:
          'Share your personal and contact information to confirm and secure your booking smoothly.',
      },
      {
        title: 'Payment Details',
        description:
          'Complete your secure and easy payment online to confirm and finalize your booking today.',
      },
      {
        title: 'Meet Your Driver',
        description:
          'Meet your professional and friendly driver on time to begin and enjoy your booked ride.',
      },
    ].map((step, i) => (
      <div
        key={i}
        className="flex flex-col items-start p-[32px_24px] gap-[8px] w-[277px] h-[287px] mx-auto bg-[#F9FAFB] border border-[#BECCE8] rounded-[24px] box-border"
      >
        {/* Step Number */}
        <div className="w-[232px] h-[96px] text-[96px] leading-[96px] font-bold font-rubik text-[#6FCCDC] flex items-center">
          0{i + 1}
        </div>

        {/* Title and Description */}
        <div className="flex flex-col text-left items-start gap-[16px] w-[232px]">
          <h3 className="w-[232px] h-[28px] text-[24px] leading-[28px] font-medium font-rubik text-[#191919]">
            {step.title}
          </h3>
          <p className="w-[232px] h-[75px] text-[14px] leading-[25px] font-normal font-rubik text-[#878D97]">
            {step.description}
          </p>
        </div>
      </div>
    ))}
  </div>
</section>


      {/* HAPPY CUSTOMERS */}
      <section className="relative py-[144px] bg-[rgba(239,242,248,0.5)] overflow-hidden">
  {/* Title */}
  <div className="relative z-10 max-w-6xl mx-auto mb-[72px] px-4 text-center">
    <h2 className="text-[48px] font-medium font-rubik text-[#191919] leading-[56px]">
      Some of our happy customer
    </h2>
  </div>

  {/* Auto-scrolling images */}
  <div className="w-full overflow-hidden">
    {/* First row */}
    <div className="w-full overflow-hidden">
  <div className="flex justify-center items-end gap-[12px] animate-marquee whitespace-nowrap">
    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
      <img
        key={`row1-${i}`}
        src={`/images/bookacar/customer/${i}.png`}
        alt={`Customer ${i}`}
        className={`rounded-[8px] object-cover inline-block w-[318px] ${
          i % 2 === 0 ? 'h-[220px]' : 'h-[252px]'
        }`}
      />
    ))}
    {/* Duplicate images for seamless loop */}
    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
      <img
        key={`row1-dup-${i}`}
        src={`/images/bookacar/customer/${i}.png`}
        alt={`Customer ${i}`}
        className={`rounded-[8px] object-cover inline-block w-[318px] ${
          i % 2 === 0 ? 'h-[220px]' : 'h-[252px]'
        }`}
      />
    ))}
  </div>
</div>


    {/* Second row */}
    <div className="flex gap-[12px] mt-[12px] animate-marquee-reverse whitespace-nowrap">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <img
          key={`row2-${i}`}
          src={`/images/bookacar/customer/${i}.png`}
          alt={`Customer ${i}`}
          className={`rounded-lg object-cover inline-block ${
            i % 2 === 0 ? 'h-[252px]' : 'h-[220px]'
          } w-[318px]`}
        />
      ))}
      {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <img
          key={`row2-dup-${i}`}
          src={`/images/bookacar/customer/${i}.png`}
          alt={`Customer ${i}`}
          className={`rounded-lg object-cover inline-block ${
            i % 2 === 0 ? 'h-[252px]' : 'h-[220px]'
          } w-[318px]`}
        />
      ))}
    </div>
  </div>
</section>


      {/* TESTIMONIALS */}


      {/* <section className="py-16 bg-white text-center">
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
</section> */}
<TravelerTestimonials/>


    </div>
    </Layout>
  );
}
