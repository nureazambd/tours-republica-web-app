import Layout from '@/components/layout/Layout';
import { Users, Award, Globe, Heart, Star, CheckCircle } from 'lucide-react';

export default function AboutPage() {
  const stats = [
    { icon: Users, label: 'Happy Travelers', value: '100,000+' },
    { icon: Award, label: 'Years Experience', value: '7+' },
    { icon: Globe, label: 'Destinations', value: '50+' },
    { icon: Heart, label: 'Customer Rating', value: '4.9/5' },
  ];

  const team = [
    {
      name: 'Carlos Rodriguez',
      role: 'Founder & CEO',
      image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><defs><linearGradient id="person1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%234F46E5;stop-opacity:1" /><stop offset="100%" style="stop-color:%237C3AED;stop-opacity:1" /></linearGradient></defs><rect width="200" height="200" fill="url(%23person1)"/><circle cx="100" cy="80" r="30" fill="white" opacity="0.9"/><ellipse cx="100" cy="160" rx="40" ry="30" fill="white" opacity="0.9"/><text x="100" y="190" text-anchor="middle" fill="white" font-size="12" font-weight="bold">CEO</text></svg>',
      description: 'Passionate about showcasing the beauty of Dominican Republic with over 10 years in tourism.'
    },
    {
      name: 'Maria Santos',
      role: 'Operations Manager',
      image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><defs><linearGradient id="person2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%23EC4899;stop-opacity:1" /><stop offset="100%" style="stop-color:%23BE185D;stop-opacity:1" /></linearGradient></defs><rect width="200" height="200" fill="url(%23person2)"/><circle cx="100" cy="80" r="30" fill="white" opacity="0.9"/><ellipse cx="100" cy="160" rx="40" ry="30" fill="white" opacity="0.9"/><text x="100" y="190" text-anchor="middle" fill="white" font-size="12" font-weight="bold">Operations</text></svg>',
      description: 'Ensures every tour runs smoothly and exceeds customer expectations with attention to detail.'
    },
    {
      name: 'Juan Martinez',
      role: 'Head Guide',
      image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><defs><linearGradient id="person3" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%2306B6D4;stop-opacity:1" /><stop offset="100%" style="stop-color:%230284C7;stop-opacity:1" /></linearGradient></defs><rect width="200" height="200" fill="url(%23person3)"/><circle cx="100" cy="80" r="30" fill="white" opacity="0.9"/><ellipse cx="100" cy="160" rx="40" ry="30" fill="white" opacity="0.9"/><text x="100" y="190" text-anchor="middle" fill="white" font-size="12" font-weight="bold">Guide</text></svg>',
      description: 'Expert local guide with deep knowledge of Dominican culture, history, and hidden gems.'
    },
    {
      name: 'Ana Perez',
      role: 'Customer Success',
      image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><defs><linearGradient id="person4" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%2310B981;stop-opacity:1" /><stop offset="100%" style="stop-color:%23059669;stop-opacity:1" /></linearGradient></defs><rect width="200" height="200" fill="url(%23person4)"/><circle cx="100" cy="80" r="30" fill="white" opacity="0.9"/><ellipse cx="100" cy="160" rx="40" ry="30" fill="white" opacity="0.9"/><text x="100" y="190" text-anchor="middle" fill="white" font-size="12" font-weight="bold">Support</text></svg>',
      description: 'Dedicated to providing exceptional customer service and creating memorable experiences.'
    }
  ];

  const values = [
    {
      icon: Heart,
      title: 'Passion for Excellence',
      description: 'We are passionate about delivering exceptional experiences that exceed expectations and create lasting memories.'
    },
    {
      icon: Users,
      title: 'Local Expertise',
      description: 'Our team of local experts provides authentic insights and access to hidden gems that only locals know.'
    },
    {
      icon: Award,
      title: 'Safety First',
      description: 'Your safety is our top priority. All our tours follow strict safety protocols and are fully insured.'
    },
    {
      icon: Globe,
      title: 'Sustainable Tourism',
      description: 'We are committed to responsible tourism that benefits local communities and preserves our natural heritage.'
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-secondary-800 to-secondary-700 text-white py-20">
          <div className="container-custom">
            <div className="text-center">
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                About Tours Republica
              </h1>
              <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                Your gateway to unforgettable experiences in the heart of the Dominican Republic. 
                We are passionate about showcasing the natural beauty, rich culture, and warm hospitality 
                that makes our country truly special.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-primary-500" />
                    </div>
                    <div className="text-3xl font-bold text-gray-800 mb-2">{stat.value}</div>
                    <div className="text-gray-600">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-16">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Story</h2>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    Founded in 2017, Tours Republica began as a small family business with a simple mission: 
                    to share the incredible beauty and culture of the Dominican Republic with travelers from around the world.
                  </p>
                  <p>
                    What started as weekend tours for friends and family has grown into one of the most trusted 
                    tour operators in the country, serving over 100,000 happy travelers and counting.
                  </p>
                  <p>
                    Our success comes from our commitment to authentic experiences, exceptional service, 
                    and our deep love for this beautiful island we call home.
                  </p>
                </div>
                <div className="mt-8 flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <span className="text-gray-700 font-medium">4.9/5 from 1,200+ reviews</span>
                </div>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl p-8 text-white">
                  <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                  <p className="text-white/90 leading-relaxed">
                    To create unforgettable experiences that connect travelers with the authentic spirit 
                    of the Dominican Republic while supporting local communities and preserving our natural heritage.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Values</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                These core values guide everything we do and shape every experience we create for our guests.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-primary-500" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">{value.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{value.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Meet Our Team</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our passionate team of local experts is dedicated to making your Dominican Republic experience extraordinary.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="relative h-48">
                    <div 
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url('${member.image}')` }}
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-1">{member.name}</h3>
                    <p className="text-primary-500 font-medium mb-3">{member.role}</p>
                    <p className="text-gray-600 text-sm leading-relaxed">{member.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose Tours Republica?</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Here's what sets us apart and makes us the preferred choice for thousands of travelers.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: 'Local Expertise',
                  description: 'Born and raised in the Dominican Republic, we know the best spots and hidden gems.',
                  icon: '🏝️'
                },
                {
                  title: 'Small Groups',
                  description: 'Intimate group sizes ensure personalized attention and authentic experiences.',
                  icon: '👥'
                },
                {
                  title: 'Safety First',
                  description: 'All tours are fully insured with professional guides and safety equipment.',
                  icon: '🛡️'
                },
                {
                  title: 'Best Price Guarantee',
                  description: 'We offer competitive prices with no hidden fees and transparent pricing.',
                  icon: '💰'
                },
                {
                  title: '24/7 Support',
                  description: 'Our customer support team is available around the clock to assist you.',
                  icon: '📞'
                },
                {
                  title: 'Eco-Friendly',
                  description: 'Committed to sustainable tourism that protects our natural environment.',
                  icon: '🌱'
                }
              ].map((feature, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors duration-200">
                  <div className="text-3xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-gradient-to-r from-primary-500 to-secondary-500 text-white">
          <div className="container-custom text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Explore?</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied travelers who have discovered the magic of the Dominican Republic with us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-primary-500 hover:bg-gray-100 font-semibold px-8 py-3 rounded-lg transition-colors duration-200">
                Browse Tours
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

