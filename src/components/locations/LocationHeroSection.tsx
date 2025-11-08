import React from 'react'

export default function LocationHeroSection() {
  return (
   <section
      className="relative flex flex-col items-center justify-center h-[248px] w-full overflow-hidden"
      style={{
        backgroundImage: `
          linear-gradient(0deg, rgba(0, 52, 89, 0.2), rgba(0, 52, 89, 0.2)),
          linear-gradient(180deg, rgba(0, 52, 89, 0) 0%, #003459 100%),
          url('/images/top-hero-image1.png')
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-col items-center justify-center text-center gap-4 px-6">
        <h1 className="text-white font-rubik font-medium text-[48px] leading-[56px] tracking-[-1.44px] max-w-[608px]">
           Incredible Journeys Await
        </h1>
        <p className="text-white font-rubik font-normal text-[16px] leading-[24px] tracking-[-0.48px] max-w-[568px]">
          Find your dream getaway with ToursRepublica — where handpicked tours and personalized experiences turn your journey into a story worth telling.
        </p>
      </div>
    </section>
  )
}
