import Layout from '@/components/layout/Layout';
import CarBookingForm from '@/components/car-booking/CarBookingForm';
import CarFleet from '@/components/car-booking/CarFleet';
import { Car, Shield, Clock, MapPin, Users, Star } from 'lucide-react';

export default function CarBookingPage() {
  const features = [
    {
      icon: Shield,
      title: 'Fully Insured',
      description: 'All vehicles come with comprehensive insurance coverage'
    },
    {
      icon: Clock,
      title: '24/7 Support',
      description: 'Round-the-clock assistance for any issues or emergencies'
    },
    {
      icon: MapPin,
      title: 'Free Delivery',
      description: 'Complimentary vehicle delivery to your hotel or location'
    },
    {
      icon: Users,
      title: 'Professional Drivers',
      description: 'Experienced local drivers available upon request'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      rating: 5,
      comment: 'Excellent service! The car was clean, reliable, and delivered right to our hotel. Made exploring the island so much easier.',
      location: 'United States'
    },
    {
      name: 'Marco Rodriguez',
      rating: 5,
      comment: 'Great experience with Tours Republica. The driver was professional and knew all the best spots. Highly recommend!',
      location: 'Spain'
    },
    {
      name: 'Emma Thompson',
      rating: 4,
      comment: 'Good value for money. The booking process was smooth and the car was exactly as described. Will use again!',
      location: 'United Kingdom'
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-secondary-800 to-secondary-700 text-white py-20">
          <div className="container-custom">
            <div className="text-center">
              <div className="bg-white/20 backdrop-blur-sm w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Car className="w-10 h-10" />
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                Book Your Perfect Ride
              </h1>
              <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                Explore the Dominican Republic at your own pace with our premium vehicle rental service. 
                From economy cars to luxury SUVs, we have the perfect vehicle for your adventure.
              </p>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose Our Car Rental?</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We provide reliable, safe, and comfortable transportation solutions for all your Dominican Republic adventures.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-primary-500" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Car Fleet */}
        <section className="py-16">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Vehicle Fleet</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Choose from our diverse selection of well-maintained vehicles, perfect for any type of Dominican Republic adventure.
              </p>
            </div>
            <CarFleet />
          </div>
        </section>

        {/* Booking Form */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Book Your Vehicle</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Fill out the form below to reserve your perfect vehicle. We'll confirm your booking within 2 hours.
              </p>
            </div>
            <div className="max-w-4xl mx-auto">
              <CarBookingForm />
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">What Our Customers Say</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Don't just take our word for it. Here's what our satisfied customers have to say about our car rental service.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 leading-relaxed">"{testimonial.comment}"</p>
                  <div className="border-t pt-4">
                    <div className="font-semibold text-gray-800">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.location}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Info */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Transparent Pricing</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                No hidden fees, no surprises. Our pricing includes everything you need for a worry-free rental experience.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">What's Included</h3>
                <ul className="space-y-2 text-gray-600">
                  {[
                    'Comprehensive insurance',
                    'Free hotel delivery',
                    '24/7 roadside assistance',
                    'GPS navigation system',
                    'Full tank of gas',
                    'Emergency contact support'
                  ].map((item, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Additional Services</h3>
                <ul className="space-y-2 text-gray-600">
                  {[
                    'Professional driver (+$50/day)',
                    'Child safety seats (+$10/day)',
                    'Additional driver (+$15/day)',
                    'Airport pickup (+$25)',
                    'Extended coverage (+$20/day)',
                    'Fuel service (+$30)'
                  ].map((item, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Requirements</h3>
                <ul className="space-y-2 text-gray-600">
                  {[
                    'Valid driver\'s license',
                    'International driving permit',
                    'Credit card for deposit',
                    'Minimum age: 25 years',
                    'Passport or ID',
                    'Proof of insurance (optional)'
                  ].map((item, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-gradient-to-r from-primary-500 to-secondary-500 text-white">
          <div className="container-custom text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Hit the Road?</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Book your vehicle today and start exploring the beautiful Dominican Republic at your own pace.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-primary-500 hover:bg-gray-100 font-semibold px-8 py-3 rounded-lg transition-colors duration-200">
                Book Now
              </button>
              <button className="border border-white text-white hover:bg-white hover:text-primary-500 font-semibold px-8 py-3 rounded-lg transition-colors duration-200">
                Contact Us
              </button>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}

