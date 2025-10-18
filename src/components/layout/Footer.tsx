'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Youtube,
} from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Subscribe:', email);
    setEmail('');
  };

  return (
    <footer className="bg-[#003459] text-white font-['Rubik']">
      {/* Contact Info Section */}
      <div className="border-b border-white/10">
        <div className="max-w-[1180px] mx-auto flex flex-wrap justify-between items-center gap-10 py-8">
          {/* Phone */}
          <div className="flex items-center gap-5 w-[190px] h-14">
            <div className="bg-white/10 p-4 rounded-xl flex items-center justify-center">
              {/* <Phone className="w-6 h-6 text-white" /> */}


              <Image
                className="w-6 h-6 text-white"
                src="/images/footer/phone-call.png"
                alt="Picture of the author"
                width={50}
                height={50}
              />
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-white font-medium text-base">Call us on</span>
              <span className="text-[#AFC0CD] text-sm">+1 (829) 618 5692</span>
            </div>
          </div>

          {/* WhatsApp */}
          <div className="flex items-center gap-5 w-[220px] h-14">
            <div className="bg-white/10 p-4 rounded-xl flex items-center justify-center">
              {/* <MessageCircle className="w-6 h-6 text-white" /> */}
              <Image
                className="w-6 h-6 text-white"
                src="/images/footer/whatsapp.png"
                alt="Picture of the author"
                width={50}
                height={50}
              />
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-white font-medium text-base">Book on WhatsApp</span>
              <span className="text-[#AFC0CD] text-sm">+1 (829) 618 5692</span>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-center gap-5 w-[270px] h-14">
            <div className="bg-white/10 p-4 rounded-xl flex items-center justify-center">
              {/* <Mail className="w-6 h-6 text-white" /> */}
              <Image
                className="w-6 h-6 text-white"
                src="/images/footer/mailuson.png"
                alt="Picture of the author"
                width={50}
                height={50}
              />
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-white font-medium text-base">Mail us on</span>
              <span className="text-[#AFC0CD] text-sm">reservas@toursrepublica.com</span>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center gap-5 w-[284px] h-14">
            <div className="bg-white/10 p-4 rounded-xl flex items-center justify-center">
              {/* <MapPin className="w-6 h-6 text-white" /> */}
              <Image
                className="w-6 h-6 text-white"
                src="/images/footer/location.png"
                alt="Picture of the author"
                width={50}
                height={50}
              />
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-white font-medium text-base">
                Local M-4, Plaza Rique Bávaro
              </span>
              <span className="text-[#AFC0CD] text-sm">23301, Dominican Republic</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-[1180px] mx-auto py-12 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Company Info */}
        <div>
          <Link href="/" className="inline-block mb-6">
            <Image
              src="/images/logo.png"
              alt="Tours República"
              width={180}
              height={50}
              className="h-12 w-auto"
            />
          </Link>
          <p className="text-[#AFC0CD] mb-6 leading-relaxed">
            Your Gateway to Unforgettable Experiences in Punta Cana
          </p>
          <div className="flex space-x-4">
            <a
              href="#"
              className=" hover:bg-white/20 p-2 rounded-lg transition-colors duration-200"
            >
              {/* <Facebook className="w-5 h-5 text-white" /> */}
              <Image
                src="/images/footer/facebook.png"
                alt="Tours República"
                width={50}
                height={50}
                className="w-8 h-8 text-white"
              />
            </a>
            <a
              href="#"
              className=" hover:bg-white/20 p-2 rounded-lg transition-colors duration-200"
            >
              {/* <Instagram className="w-5 h-5 text-white" /> */}
              <Image
                src="/images/footer/instagram.png"
                alt="Tours República"
                width={50}
                height={50}
                className="w-8 h-8 text-white"
              />
            </a>
            <a
              href="#"
              className=" hover:bg-white/20 p-2 rounded-lg transition-colors duration-200"
            >
              {/* <Youtube className="w-5 h-5 text-white" /> */}
              <Image
                src="/images/footer/youtube.png"
                alt="Tours República"
                width={50}
                height={50}
                className="w-8 h-8 text-white"
              />
            </a>
          </div>
        </div>

        {/* Important Links */}
        <div>
          <h3 className="font-semibold text-white mb-6">Important links</h3>
          <ul className="space-y-3">
            <li>
              <Link href="/manage-booking" className="text-[#AFC0CD] hover:text-white">
                Manage booking
              </Link>
            </li>
            <li>
              <Link href="/support" className="text-[#AFC0CD] hover:text-white">
                Support
              </Link>
            </li>
            <li>
              <Link href="/privacy-policy" className="text-[#AFC0CD] hover:text-white">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/cancellations-policy" className="text-[#AFC0CD] hover:text-white">
                Cancellations Policy
              </Link>
            </li>
            <li>
              <Link href="/terms-and-conditions" className="text-[#AFC0CD] hover:text-white">
                General Terms and Conditions
              </Link>
            </li>
          </ul>
        </div>

        {/* Work with us */}
        <div>
          <h3 className="font-semibold text-white mb-6">Work with us</h3>
          <ul className="space-y-3">
            <li>
              <Link href="/travel-agencies" className="text-[#AFC0CD] hover:text-white">
                Travel Agencies
              </Link>
            </li>
            <li>
              <Link href="/providers" className="text-[#AFC0CD] hover:text-white">
                Providers
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="font-semibold text-white mb-6">Descubre República Dominicana</h3>
          <p className="text-[#AFC0CD] mb-6">
            Suscríbete a nuestra newsletter y descubre las mejores experiencias de viajes!
          </p>
          <form onSubmit={handleSubscribe} className="flex">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your Email"
              className="flex-1 px-4 py-3 bg-white border border-white/20 rounded-l-lg focus:ring-2 focus:ring-[#FBBF24] focus:border-transparent outline-none text-white placeholder-gray-400"
              required
            />
            <button
              type="submit"
              className="bg-[#EE2552] hover:bg-[#EE2552] text-white px-6 py-3 rounded-r-lg font-semibold transition-colors duration-200"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10">
        <div className="max-w-[1180px] mx-auto py-6">
          <p className="text-center text-[#AFC0CD] text-sm">
            © 2024 Tours República. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
