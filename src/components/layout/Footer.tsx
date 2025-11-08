'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Subscribe:', email);
    setEmail('');
  };

  return (
    <footer className="bg-[#003459] text-white font-['Rubik'] py-10">
      {/* --- Top Contact Section --- */}
      <div className="border-b border-white/10">
        <div className="max-w-[1180px] mx-auto flex flex-wrap justify-center lg:justify-between items-center gap-6 sm:1 md:gap-10 py-8 px-4">
          {/* Phone */}
          <div className="flex items-center gap-4 sm:gap-5 h-14 w-full sm:w-auto justify-start sm:justify-center">
            <div className="bg-white/10 p-3 sm:p-4 rounded-xl flex items-center justify-center">
              <Image src="/images/footer/phone-call.png" alt="Call" width={30} height={30} />
            </div>
            <div className="flex flex-col">
              <span className="text-white text-sm sm:text-base">Call us on</span>
              <span className="text-[#AFC0CD] text-xs sm:text-sm">+1 (829) 618 5692</span>
            </div>
          </div>

          {/* WhatsApp */}
          <div className="flex items-center gap-4 sm:gap-5 h-14 w-full sm:w-auto justify-start sm:justify-center">
            <div className="bg-white/10 p-3 sm:p-4 rounded-xl flex items-center justify-center">
              <Image src="/images/footer/whatsapp.png" alt="WhatsApp" width={30} height={30} />
            </div>
            <div className="flex flex-col">
              <span className="text-white text-sm sm:text-base">Book on WhatsApp</span>
              <span className="text-[#AFC0CD] text-xs sm:text-sm">+1 (829) 618 5692</span>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-center gap-4 sm:gap-5 h-14 w-full sm:w-auto justify-start sm:justify-center">
            <div className="bg-white/10 p-3 sm:p-4 rounded-xl flex items-center justify-center">
              <Image src="/images/footer/mailuson.png" alt="Mail" width={30} height={30} />
            </div>
            <div className="flex flex-col">
              <span className="text-white text-sm sm:text-base">Mail us on</span>
              <span className="text-[#AFC0CD] text-xs sm:text-sm">reservas@toursrepublica.com</span>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center gap-4 sm:gap-5 h-14 w-full sm:w-auto justify-start sm:justify-center">
            <div className="bg-white/10 p-3 sm:p-4 rounded-xl flex items-center justify-center">
              <Image src="/images/footer/location.png" alt="Location" width={30} height={30} />
            </div>
            <div className="flex flex-col">
              <span className="text-white text-xs sm:text-sm">
                Local M-4, Plaza Rique Bávaro
              </span>
              <span className="text-[#AFC0CD] text-xs sm:text-sm">
                23301, Dominican Republic
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* --- Main Footer --- */}
      <div className="max-w-[1180px] mx-auto py-12 px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1">
        {/* Company Info */}
        <div className='pr-4'>
          <Link href="/" className="inline-block mb-6">
            <Image src="/images/logo.png" alt="Tours República" width={150} height={70} />
          </Link>
          <p className="text-white mb-2 leading-relaxed text-sm">
            Your Gateway to Unforgettable Experiences in Punta Cana
          </p>
          <div className="flex space-x-0">
            {[
              { src: '/images/footer/facebook.png', alt: 'Facebook' },
              { src: '/images/footer/instagram.png', alt: 'Instagram' },
              { src: '/images/footer/youtube.png', alt: 'YouTube' },
            ].map((icon, i) => (
              <a
                key={i}
                href="#"
                className="hover:bg-white/20 p-2 rounded-lg transition-colors duration-200"
              >
                <Image
                  src={icon.src}
                  alt={icon.alt}
                  width={25}
                  height={25}
                  className="w-6 h-6"
                />
              </a>
            ))}
          </div>
        </div>

        {/* Important Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Important links</h3>
          <ul className="space-y-3">
            {[
              { href: '/manage-booking', label: 'Manage booking' },
              { href: '/support', label: 'Support' },
              { href: '/privacy-policy', label: 'Privacy Policy' },
              { href: '/cancellations-policy', label: 'Cancellations Policy' },
              { href: '/terms-and-conditions', label: 'General Terms and Conditions' },
            ].map((item, i) => (
              <li key={i}>
                <Link
                  href={item.href}
                  className="text-[#AFC0CD] hover:text-white text-sm transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Work with us */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Work with us</h3>
          <ul className="space-y-3">
            <li>
              <Link href="/travel-agencies" className="text-[#AFC0CD] hover:text-white text-sm">
                Travel Agencies
              </Link>
            </li>
            <li>
              <Link href="/providers" className="text-[#AFC0CD] hover:text-white text-sm">
                Providers
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-[18px] font-[500] mb-4">Descubre República Dominicana</h3>
          <p className="text-[#AFC0CD] mb-6 text-sm">
            Suscríbete a nuestra newsletter y descubre las mejores experiencias de viajes!
          </p>
          <form onSubmit={handleSubscribe} className="flex">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your Email"
              className="flex-1 p-3 text-xs font-xs bg-white border border-white/20 rounded-l-lg focus:ring-2 focus:ring-[#FBBF24] focus:border-transparent outline-none text-white placeholder-gray-400"
              required
            />
            <button
              type="submit"
              className="bg-[#EE2552] hover:bg-[#EE2552] text-white  p-3 rounded-r-lg text-xs font-xs transition-colors duration-200"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* --- Bottom Copyright --- */}
      <div className="border-t border-white/10 mt-6">
        <div className="max-w-[1180px] mx-auto py-6 px-4">
          <p className="text-center text-[#AFC0CD] text-sm">
            © 2024 Tours República. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
