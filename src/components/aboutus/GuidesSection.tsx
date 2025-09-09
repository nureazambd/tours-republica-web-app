// components/GuidesSection.tsx
import Image from "next/image";
import { FaTwitter, FaInstagram, FaYoutube, FaLinkedin } from "react-icons/fa";

const guides = [
  { name: "Damien Frederick", img: "/images/about/guide1.png" },
  { name: "Drew J. Bridges", img: "/images/about/guide2.png" },
  { name: "Vasili Ilmaz", img: "/images/about/guide3.png" },
  { name: "Vasili Ilmaz", img: "/images/about/guide3.png" },
];

export default function GuidesSection() {
  return (
    <section className="bg-gray-100 text-gray-800 py-16">
      <div className="max-w-7xl mx-auto text-center space-y-6">
        <p className="text-teal-400 font-semibold">Tour Guide</p>
        <h2 className="text-3xl font-bold">Our Travel Guide</h2>
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6 justify-items-center">
          {guides.map((g, i) => (
            <div key={i} className="space-y-4">
              <div className="relative w-32 h-32 rounded-full overflow-hidden mx-auto">
                <Image src={g.img} alt={g.name} fill className="object-cover" />
              </div>
              <div className="font-semibold">{g.name}</div>
              <div className="flex justify-center gap-3 text-gray-500">
                <FaTwitter /><FaInstagram /><FaYoutube /><FaLinkedin />
              </div>
            </div>
          ))}
        </div>
        <button className="mt-8 bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 px-8 rounded-full">
          Load more
        </button>
      </div>
    </section>
  );
}
