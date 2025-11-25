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
        <div className="max-w-[1180px] mx-auto flex flex-wrap justify-center lg:justify-between items-center gap-6 sm:1 md:gap-10 pb-12 pt-8 px-4 lg:px-0">
          {/* Phone */}
          <div className="flex items-center gap-4 sm:gap-5 h-14 w-full sm:w-auto justify-start sm:justify-center">
            {/* <div className="bg-white/10 p-3 sm:p-4 rounded-xl flex items-center justify-center">
              <Image src="/images/footer/phone-call.png" alt="Call" width={30} height={30} />
            </div> */}
            <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="56" height="56" rx="16" fill="white" fillOpacity="0.1" />
  <g clipPath="url(#clip0_29321_721)">
    <path
      d="M38.9998 27.0001C38.7346 27.0001 38.4802 26.8947 38.2927 26.7072C38.1052 26.5196 37.9998 26.2653 37.9998 26.0001C37.9977 23.879 37.1542 21.8454 35.6543 20.3455C34.1545 18.8457 32.1209 18.0022 29.9998 18.0001C29.7346 18.0001 29.4802 17.8947 29.2927 17.7072C29.1052 17.5196 28.9998 17.2653 28.9998 17.0001C28.9998 16.7348 29.1052 16.4805 29.2927 16.2929C29.4802 16.1054 29.7346 16.0001 29.9998 16.0001C32.6511 16.003 35.1929 17.0575 37.0677 18.9322C38.9424 20.8069 39.9969 23.3488 39.9998 26.0001C39.9998 26.2653 39.8945 26.5196 39.7069 26.7072C39.5194 26.8947 39.265 27.0001 38.9998 27.0001ZM35.9998 26.0001C35.9998 24.4088 35.3677 22.8826 34.2424 21.7574C33.1172 20.6322 31.5911 20.0001 29.9998 20.0001C29.7346 20.0001 29.4802 20.1054 29.2927 20.2929C29.1052 20.4805 28.9998 20.7348 28.9998 21.0001C28.9998 21.2653 29.1052 21.5196 29.2927 21.7072C29.4802 21.8947 29.7346 22.0001 29.9998 22.0001C31.0607 22.0001 32.0781 22.4215 32.8282 23.1716C33.5784 23.9218 33.9998 24.9392 33.9998 26.0001C33.9998 26.2653 34.1052 26.5196 34.2927 26.7072C34.4802 26.8947 34.7346 27.0001 34.9998 27.0001C35.265 27.0001 35.5194 26.8947 35.7069 26.7072C35.8945 26.5196 35.9998 26.2653 35.9998 26.0001ZM38.1828 38.1641L39.0928 37.1151C39.672 36.534 39.9973 35.747 39.9973 34.9266C39.9973 34.1061 39.672 33.3191 39.0928 32.7381C39.0618 32.7071 36.6558 30.8561 36.6558 30.8561C36.0784 30.3064 35.3113 30.0003 34.5141 30.0014C33.7169 30.0025 32.9507 30.3108 32.3748 30.8621L30.4688 32.4681C28.913 31.8241 27.4997 30.8792 26.3101 29.6876C25.1205 28.4959 24.178 27.081 23.5368 25.5241L25.1368 23.6241C25.6885 23.0482 25.9971 22.2819 25.9984 21.4845C25.9997 20.687 25.6936 19.9197 25.1438 19.3421C25.1438 19.3421 23.2908 16.9391 23.2598 16.9081C22.6893 16.3338 21.9157 16.0071 21.1062 15.9985C20.2968 15.9899 19.5164 16.3001 18.9338 16.8621L17.7838 17.8621C10.9898 25.7441 25.6198 40.2611 33.7618 40.0001C34.584 40.0048 35.3988 39.8448 36.1581 39.5295C36.9174 39.2141 37.6059 38.7499 38.1828 38.1641Z"
      fill="white"
    />
  </g>
  <defs>
    <clipPath id="clip0_29321_721">
      <rect width="24" height="24" fill="white" transform="translate(16 16)" />
    </clipPath>
  </defs>
</svg>


            <div className="flex flex-col">
              <span className="text-white text-sm sm:text-base">Call us on</span>
              <span className="text-[#AFC0CD] text-xs sm:text-sm">+1 (829) 618 5692</span>
            </div>
          </div>

          {/* WhatsApp */}
          <div className="flex items-center gap-4 sm:gap-5 h-14 w-full sm:w-auto justify-start sm:justify-center">
            {/* <div className="bg-white/10 p-3 sm:p-4 rounded-xl flex items-center justify-center">
              <Image src="/images/footer/whatsapp.png" alt="WhatsApp" width={30} height={30} />
            </div> */}
            <svg
  width="56"
  height="56"
  viewBox="0 0 56 56"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <rect
    width="56"
    height="56"
    rx="16"
    fill="white"
    fillOpacity="0.1"
  />
  <path
    d="M28 16.75C21.7968 16.75 16.75 21.7968 16.75 28C16.75 30.1825 17.3755 32.287 18.5635 34.114L16.8107 38.2045C16.7517 38.3423 16.7353 38.4946 16.7637 38.6417C16.792 38.7889 16.8638 38.9242 16.9698 39.0302C17.0758 39.1362 17.2111 39.208 17.3583 39.2363C17.5054 39.2647 17.6577 39.2483 17.7955 39.1893L21.886 37.4357C23.7045 38.6215 25.829 39.252 28 39.25C34.2033 39.25 39.25 34.2033 39.25 28C39.25 21.7968 34.2033 16.75 28 16.75ZM33.775 32.0275C33.775 32.0275 32.839 33.2267 32.1625 33.5072C30.445 34.2183 28.0188 33.5072 25.255 30.7443C22.4928 27.9813 21.781 25.555 22.4927 23.8368C22.7732 23.1603 23.9732 22.2257 23.9732 22.2257C24.1386 22.1035 24.3417 22.0435 24.547 22.0562C24.7522 22.069 24.9463 22.1537 25.0953 22.2955L26.4528 23.653C26.5926 23.7939 26.671 23.9844 26.671 24.1829C26.671 24.3814 26.5926 24.5718 26.4528 24.7127L25.6 25.564C25.6 25.564 25.255 26.599 27.3272 28.672C29.3988 30.7443 30.4352 30.3993 30.4352 30.3993L31.2865 29.5472C31.4274 29.4072 31.6181 29.3286 31.8168 29.3286C32.0154 29.3286 32.2061 29.4072 32.347 29.5472L33.7045 30.9047C33.9955 31.1965 34.027 31.7013 33.7735 32.0267L33.775 32.0275Z"
    fill="white"
  />
</svg>


            <div className="flex flex-col">
              <span className="text-white text-sm sm:text-base">Book on WhatsApp</span>
              <span className="text-[#AFC0CD] text-xs sm:text-sm">+1 (829) 618 5692</span>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-center gap-4 sm:gap-5 h-14 w-full sm:w-auto justify-start sm:justify-center">
            {/* <div className="bg-white/10 p-3 sm:p-4 rounded-xl flex items-center justify-center">
              <Image src="/images/footer/mailuson.png" alt="Mail" width={30} height={30} />
            </div> */}
            <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="56" height="56" rx="16" fill="white" fillOpacity="0.1" />
  <g clipPath="url(#clip0_29321_735)">
    <path
      d="M39.954 21.542L31.536 29.96C30.5974 30.8962 29.3257 31.422 28 31.422C26.6743 31.422 25.4026 30.8962 24.464 29.96L16.046 21.542C16.032 21.7 16 21.843 16 22V34C16.0016 35.3256 16.5289 36.5964 17.4662 37.5338C18.4036 38.4711 19.6744 38.9984 21 39H35C36.3256 38.9984 37.5964 38.4711 38.5338 37.5338C39.4711 36.5964 39.9984 35.3256 40 34V22C40 21.843 39.968 21.7 39.954 21.542Z"
      fill="white"
    />
    <path
      d="M30.1221 28.546L39.2561 19.411C38.8137 18.6773 38.1896 18.07 37.4441 17.6477C36.6986 17.2254 35.8569 17.0023 35.0001 17H21.0001C20.1434 17.0023 19.3016 17.2254 18.5562 17.6477C17.8107 18.07 17.1866 18.6773 16.7441 19.411L25.8781 28.546C26.4417 29.1073 27.2047 29.4225 28.0001 29.4225C28.7956 29.4225 29.5586 29.1073 30.1221 28.546Z"
      fill="white"
    />
  </g>

  <defs>
    <clipPath id="clip0_29321_735">
      <rect width="24" height="24" fill="white" transform="translate(16 16)" />
    </clipPath>
  </defs>
</svg>


            <div className="flex flex-col">
              <span className="text-white text-sm sm:text-base">Mail us on</span>
              <span className="text-[#AFC0CD] text-xs sm:text-sm">reservas@toursrepublica.com</span>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center gap-4 sm:gap-5 h-14 w-full sm:w-auto justify-start sm:justify-center">
            <svg
  width="56"
  height="56"
  viewBox="0 0 56 56"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <rect width="56" height="56" rx="16" fill="white" fillOpacity="0.1" />
  <g clipPath="url(#clip0_29321_743)">
    <path
      d="M28 16.042C25.354 16.0449 22.8171 17.0973 20.946 18.9682C19.0748 20.8392 18.0222 23.3759 18.019 26.022C18.019 28.592 20.009 32.614 23.934 37.976C24.4013 38.6161 25.0131 39.1369 25.7196 39.4959C26.4262 39.8549 27.2075 40.042 28 40.042C28.7926 40.042 29.5739 39.8549 30.2804 39.4959C30.987 39.1369 31.5988 38.6161 32.066 37.976C35.991 32.614 37.981 28.592 37.981 26.022C37.9779 23.3759 36.9252 20.8392 35.0541 18.9682C33.183 17.0973 30.6461 16.0449 28 16.042ZM28 30C27.2089 30 26.4356 29.7654 25.7778 29.3259C25.12 28.8863 24.6073 28.2616 24.3045 27.5307C24.0018 26.7998 23.9226 25.9956 24.0769 25.2196C24.2312 24.4437 24.6122 23.731 25.1716 23.1716C25.731 22.6122 26.4438 22.2312 27.2197 22.0769C27.9956 21.9225 28.7999 22.0017 29.5308 22.3045C30.2617 22.6072 30.8864 23.1199 31.3259 23.7777C31.7654 24.4355 32 25.2089 32 26C32 27.0609 31.5786 28.0783 30.8285 28.8284C30.0783 29.5786 29.0609 30 28 30Z"
      fill="white"
    />
  </g>

  <defs>
    <clipPath id="clip0_29321_743">
      <rect width="24" height="24" fill="white" transform="translate(16 16)" />
    </clipPath>
  </defs>
</svg>


            <div className="flex flex-col">
              <span className="text-[#AFC0CD] text-xs sm:text-sm">
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
      <div className="max-w-[1180px] mx-auto py-12 px-4 lg:px-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1">
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
