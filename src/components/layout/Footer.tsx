'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, MessageCircle, Mail, MapPin, Facebook, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Subscribe:', email);
    setEmail('');
  };

  return (
    <footer className="bg-secondary-800 text-white">
      {/* Contact Info Section */}
      <div className="border-b border-secondary-700">
        <div className="container-custom py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Call us */}
            <div className="flex items-center space-x-4">
              <div className="bg-secondary-700 p-3 rounded-lg">
                <Phone className="w-6 h-6 text-accent-500" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Call us on</h3>
                <p className="text-gray-300">+1 (829) 618 5692</p>
              </div>
            </div>

            {/* WhatsApp */}
            <div className="flex items-center space-x-4">
              <div className="bg-secondary-700 p-3 rounded-lg">
                <MessageCircle className="w-6 h-6 text-accent-500" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Book On Whatsapp</h3>
                <p className="text-gray-300">+1 (829) 618 5692</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center space-x-4">
              <div className="bg-secondary-700 p-3 rounded-lg">
                <Mail className="w-6 h-6 text-accent-500" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Mail us on</h3>
                <p className="text-gray-300">reservas@toursrepublica.com</p>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center space-x-4">
              <div className="bg-secondary-700 p-3 rounded-lg">
                <MapPin className="w-6 h-6 text-accent-500" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Local 14-B, Plaza Roque Bávaro</h3>
                <p className="text-gray-300">23301, Dominican Republic</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <Image
                src="/images/logo.png"
                alt="Tours Republica"
                width={160}
                height={40}
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Your Gateway to Unforgettable Experiences in Punta Cana
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="bg-secondary-700 hover:bg-secondary-600 p-2 rounded-lg transition-colors duration-200"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="bg-secondary-700 hover:bg-secondary-600 p-2 rounded-lg transition-colors duration-200"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="bg-secondary-700 hover:bg-secondary-600 p-2 rounded-lg transition-colors duration-200"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Important Links */}
          <div>
            <h3 className="font-semibold text-white mb-6">Important links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/manage-booking" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Manage booking
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Support
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/cancellations" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Cancellations Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-300 hover:text-white transition-colors duration-200">
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
                <Link href="/travel-agencies" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Travel Agencies
                </Link>
              </li>
              <li>
                <Link href="/providers" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Providers
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-white mb-6">Descubre República Dominicana</h3>
            <p className="text-gray-300 mb-6">
              Suscríbete a nuestra newsletter y descubre las mejores experiencias de viajes!
            </p>
            <form onSubmit={handleSubscribe} className="flex">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your Email"
                className="flex-1 px-4 py-3 bg-secondary-700 border border-secondary-600 rounded-l-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none text-white placeholder-gray-400"
                required
              />
              <button
                type="submit"
                className="bg-primary-500 hover:bg-primary-600 px-6 py-3 rounded-r-lg font-medium transition-colors duration-200"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-secondary-700">
        <div className="container-custom py-6">
          <p className="text-center text-gray-400">
            Copyright © 2024 Tours Republica. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

