import React from 'react';

// --- Static Data ---
const travelerData = [
  {
    name: "Marcus R.",
    country: "Canada",
    avatar: "/images/bookacar/travelers/img-1.png", // Use actual path
    review: "The local guides were incredible! They showed us hidden gems we would have never found on our own. Truly an authentic experience.",
    rating: 5,
  },
  {
    name: "Elena K.",
    country: "UK",
    avatar: "/images/bookacar/travelers/img-2.png",
    review: "Absolutely seamless booking process and the transfer car was immaculate. Professional and punctual—exactly what I needed.",
    rating: 5,
  },
  {
    name: "Sophia M.",
    country: "USA",
    avatar: "/images/bookacar/travelers/img-3.png",
    review: "Fantastic service! Our driver was waiting right on time and provided helpful tips for our stay. Highly recommend this service.",
    rating: 5,
  },
];

// --- Star Icon Component (Using the specified color #FAA523) ---
const StarIcon = () => (
    <svg
      className="w-5 h-5 fill-current text-[#FAA523]"
      viewBox="0 0 20 20"
      aria-hidden="true"
    >
      {/* This path roughly matches the provided vector path data/shape */}
      <path d="M10 15l-5.878 3.09L5.5 12.18.5 7.91l6.122-.89L10 1.5l3.378 5.52 6.122.89-5 4.27 1.378 5.91z" />
    </svg>
);

// --- Quote Icon Component (Using the specified color #6FCCDC and size 32px) ---
const QuoteIcon = () => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 13.1437C0 8.40798 3.83571 4.57227 8.57143 4.57227H9.14286C10.4071 4.57227 11.4286 5.59369 11.4286 6.85798C11.4286 8.12227 10.4071 9.14369 9.14286 9.14369H8.57143C6.36429 9.14369 4.57143 10.9366 4.57143 13.1437V13.7151H9.14286C11.6643 13.7151 13.7143 15.7651 13.7143 18.2866V22.858C13.7143 25.3794 11.6643 27.4294 9.14286 27.4294H4.57143C2.05 27.4294 0 25.3794 0 22.858V20.5723V18.2866V13.1437ZM18.2857 13.1437C18.2857 8.40798 22.1214 4.57227 26.8571 4.57227H27.4286C28.6929 4.57227 29.7143 5.59369 29.7143 6.85798C29.7143 8.12227 28.6929 9.14369 27.4286 9.14369H26.8571C24.65 9.14369 22.8571 10.9366 22.8571 13.1437V13.7151H27.4286C29.95 13.7151 32 15.7651 32 18.2866V22.858C32 25.3794 29.95 27.4294 27.4286 27.4294H22.8571C20.3357 27.4294 18.2857 25.3794 18.2857 22.858V20.5723V18.2866V13.1437Z" fill="#6FCCDC"/>
</svg>

);

const TravelersSay: React.FC = () => {
  return (
    <section 
        // Desktop: padding: 144px 130px; Mobile: py-16 px-4
        className="py-16 lg:py-36 text-center px-4 lg:px-0"
    >
      
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-14 mt-0">
        <h2 
            // font-family: 'Rubik'; font-weight: 500; font-size: 48px; line-height: 56px; color: #191919;
            className="text-[32px] md:text-[48px] font-medium leading-[40px] md:leading-[56px] text-[#191919] mb-14"
        >
          What Our Travelers Say
        </h2>
      </div>

      {/* Testimonial Grid */}
      <div 
        // Desktop: width: 1180px; gap: 32px;
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-8 max-w-[1180px] mx-auto"
      >
        {travelerData.map((person, i) => (
          <div
            key={i}
            // Card styling: padding: 32px; border-radius: 16px; background: #FFFFFF; shadow: 0px 1px 2px rgba(0, 0, 0, 0.05); width: 372px; height: 272px (maintained via flex grow)
            className="bg-white p-8 rounded-2xl shadow-sm text-left flex flex-col justify-between w-full lg:w-[372px] h-[272px] border border-gray-100"
            style={{ boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)' }}
          >
            
            {/* Quote and Rating Group */}
            <div 
                // gap: 12px;
                className="flex flex-col gap-3"
            >
                {/* Quote Icon */}
                <div className="w-8 h-8 flex items-center justify-center">
                    <QuoteIcon />
                </div>

                {/* Stars and Review Text Group */}
                <div 
                    // gap: 8px; (adjusted from original 12px card gap)
                    className="flex flex-col gap-2"
                >
                    {/* Stars: gap: 2px; */}
                    <div className="flex items-center space-x-0.5">
                        {[...Array(person.rating)].map((_, idx) => (
                            <StarIcon key={idx} />
                        ))}
                    </div>
                    
                    {/* Review Text */}
                    <p 
                        // font-weight: 400; font-size: 14px; line-height: 24px; color: #4B5563;
                        className="text-sm font-normal text-[#4B5563] leading-6"
                    >
                        "{person.review}"
                    </p>
                </div>
            </div>

            {/* User Info */}
            <div 
                // gap: 16px; height: 48px;
                className="flex items-center gap-4 mt-6"
            >
              {/* Avatar: 48px x 48px, rounded-full */}
              <img
                src={person.avatar}
                alt={person.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              {/* Name and Country */}
              <div 
                // gap: 3px;
                className="flex flex-col gap-0.5"
              >
                {/* Name: font-weight: 500; font-size: 16px; line-height: 16px; color: #191919; */}
                <div className="font-medium text-base leading-4 text-[#191919]">{person.name}</div>
                
                {/* Country: font-weight: 400; font-size: 14px; line-height: 14px; color: #878D97; */}
                <div className="text-[#878D97] text-sm leading-4">{person.country}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TravelersSay;