// components/WhySection.tsx
import Image from "next/image";
import { FaGlobe, FaTags, FaBolt, FaSyncAlt } from "react-icons/fa";

const benefits = [
  { icon: <FaGlobe className="text-yellow-400" />, title: "Worldwide Coverage", desc: "Wherever you’re headed, we’ve got your back with service you can count on worldwide!" },
  { icon: <FaTags className="text-yellow-400" />, title: "Competitive Pricing", desc: "We keep our tours affordable without cutting corners, so you get the best value every time!" },
  { icon: <FaBolt className="text-yellow-400" />, title: "Fast Booking", desc: "Booking your dream trip is quick and easy, so you can focus on the adventure ahead!" },
  { icon: <FaSyncAlt className="text-yellow-400" />, title: "Ultimate Flexibility", desc: "Change your plans anytime — we’re here to make your trip fit your life perfectly!" }
];

export default function WhySection() {
  return (
    <section className=" py-16">
      <div className="max-w-7xl mx-auto space-y-8">

        <div  className="rounded-lg p-6 text-center w-full md:w-3/4 mx-auto space-y-4">
              <h1 className="text-3xl font-bold mr-4">Why Tours Republica  Is Best?</h1>
              <p className="text-gray-500">We turn every trip into a seamless, extraordinary adventure you’ll cherish forever, with authentic tours, local insights, and stress-free service from start to finish.</p>
        </div>

        <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden">
          <Image
            src="/images/about/why-video.png"
            alt="Why Tours"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 flex justify-center items-center">
            <button className="bg-white bg-opacity-75 rounded-full p-4 text-gray-900 text-2xl">
              ▶
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {benefits.map((b, i) => (
            <div key={i} className=" flex rounded-lg p-6 text-left">
              <div className="text-3xl mr-4">{b.icon}</div>
              <div>
                <h3 className="font-semibold text-xl">{b.title}</h3>
              <p className="text-gray-500">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
