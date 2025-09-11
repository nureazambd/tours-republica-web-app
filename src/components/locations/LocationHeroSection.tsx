import React from 'react'

export default function LocationHeroSection() {
  return (
    <div>
        <section className="relative h-[248px] bg-gradient-to-br from-blue-200 via-blue-200 to-blue-200 text-white flex items-center justify-center overflow-hidden">
      {/* Background Image Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-100"
        style={{
          backgroundImage: `url('/images/top-hero-image1.png')`
        }}
      />
      
      <div className="relative z-10 container-custom py-20 lg:py-32 ">
  <div className="container-custom text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4 tracking-[1.44px]">
            Incredible Journeys Await
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Find your dream getaway with ToursRepublica — where handpicked tours and personalized experiences turn your journey into a story worth telling.
            </p>
          </div>
    </div>
    </section>
    </div>
  )
}
