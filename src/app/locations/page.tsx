import Layout from '@/components/layout/Layout';
import { Search, MapPin, Star } from 'lucide-react';

export default function LocationsPage() {
  const destinations = [
    {
      id: 1,
      name: 'Santo Domingo',
      description: 'Historic capital city with colonial architecture and rich cultural heritage',
      image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><defs><linearGradient id="santo" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%23D4A574;stop-opacity:1" /><stop offset="100%" style="stop-color:%238B4513;stop-opacity:1" /></linearGradient></defs><rect width="400" height="300" fill="url(%23santo)"/><rect x="50" y="100" width="300" height="150" fill="%23CD853F" opacity="0.8"/><rect x="80" y="120" width="60" height="80" fill="%23A0522D"/><rect x="160" y="110" width="80" height="90" fill="%23A0522D"/><rect x="260" y="130" width="70" height="70" fill="%23A0522D"/><text x="200" y="280" text-anchor="middle" fill="white" font-size="24" font-weight="bold">Santo Domingo</text></svg>',
      tourCount: 12,
      rating: 4.8,
      featured: true,
      highlights: ['UNESCO World Heritage', 'Colonial Zone', 'Museums', 'Local Cuisine']
    },
    {
      id: 2,
      name: 'Punta Cana',
      description: 'Paradise beaches with crystal clear waters and luxury resorts',
      image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><defs><linearGradient id="punta" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%2306B6D4;stop-opacity:1" /><stop offset="100%" style="stop-color:%230284C7;stop-opacity:1" /></linearGradient></defs><rect width="400" height="300" fill="url(%23punta)"/><ellipse cx="200" cy="250" rx="180" ry="40" fill="%23F3F4F6" opacity="0.9"/><circle cx="100" cy="100" r="15" fill="%2322C55E" opacity="0.8"/><circle cx="300" cy="120" r="20" fill="%2322C55E" opacity="0.8"/><circle cx="200" cy="80" r="12" fill="%2322C55E" opacity="0.8"/><text x="200" y="280" text-anchor="middle" fill="white" font-size="24" font-weight="bold">Punta Cana</text></svg>',
      tourCount: 18,
      rating: 4.9,
      featured: true,
      highlights: ['White Sand Beaches', 'Water Sports', 'Golf Courses', 'Nightlife']
    },
    {
      id: 3,
      name: 'Samaná',
      description: 'Natural paradise with whale watching and pristine landscapes',
      image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><defs><linearGradient id="samana" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%2314B8A6;stop-opacity:1" /><stop offset="100%" style="stop-color:%230891B2;stop-opacity:1" /></linearGradient></defs><rect width="400" height="300" fill="url(%23samana)"/><ellipse cx="200" cy="200" rx="150" ry="80" fill="%23065F46" opacity="0.6"/><circle cx="120" cy="150" r="30" fill="%23047857" opacity="0.8"/><circle cx="280" cy="180" r="25" fill="%23047857" opacity="0.8"/><text x="200" y="280" text-anchor="middle" fill="white" font-size="24" font-weight="bold">Samaná</text></svg>',
      tourCount: 8,
      rating: 4.7,
      featured: false,
      highlights: ['Whale Watching', 'El Limón Waterfall', 'Cayo Levantado', 'Nature Trails']
    },
    {
      id: 4,
      name: 'Puerto Plata',
      description: 'Mountain meets ocean with cable car rides and historic charm',
      image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><defs><linearGradient id="puerto" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%236B7280;stop-opacity:1" /><stop offset="100%" style="stop-color:%23374151;stop-opacity:1" /></linearGradient></defs><rect width="400" height="300" fill="url(%23puerto)"/><polygon points="200,50 150,150 250,150" fill="%234B5563" opacity="0.8"/><rect x="80" y="180" width="240" height="80" fill="%23D1D5DB" opacity="0.7"/><circle cx="320" cy="100" r="25" fill="%23FCD34D" opacity="0.8"/><text x="200" y="280" text-anchor="middle" fill="white" font-size="24" font-weight="bold">Puerto Plata</text></svg>',
      tourCount: 10,
      rating: 4.6,
      featured: false,
      highlights: ['Cable Car', 'Fort San Felipe', 'Amber Cove', 'Historic Center']
    },
    {
      id: 5,
      name: 'Bayahibe',
      description: 'Fishing village gateway to Saona Island and underwater wonders',
      image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><defs><linearGradient id="baya" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%2310B981;stop-opacity:1" /><stop offset="100%" style="stop-color:%23059669;stop-opacity:1" /></linearGradient></defs><rect width="400" height="300" fill="url(%23baya)"/><ellipse cx="200" cy="200" rx="120" ry="60" fill="%23065F46" opacity="0.7"/><circle cx="150" cy="120" r="20" fill="%23047857" opacity="0.9"/><circle cx="250" cy="140" r="15" fill="%23047857" opacity="0.9"/><text x="200" y="280" text-anchor="middle" fill="white" font-size="24" font-weight="bold">Bayahibe</text></svg>',
      tourCount: 6,
      rating: 4.8,
      featured: false,
      highlights: ['Saona Island', 'Scuba Diving', 'Fishing Tours', 'Beach Relaxation']
    },
    {
      id: 6,
      name: 'La Romana',
      description: 'Luxury destination with world-class golf and marina',
      image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><defs><linearGradient id="romana" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%23A855F7;stop-opacity:1" /><stop offset="100%" style="stop-color:%237C3AED;stop-opacity:1" /></linearGradient></defs><rect width="400" height="300" fill="url(%23romana)"/><ellipse cx="200" cy="180" rx="100" ry="50" fill="%235B21B6" opacity="0.7"/><rect x="150" y="140" width="100" height="60" fill="%236D28D9" opacity="0.8"/><circle cx="200" cy="100" r="20" fill="%23FCD34D" opacity="0.8"/><text x="200" y="280" text-anchor="middle" fill="white" font-size="24" font-weight="bold">La Romana</text></svg>',
      tourCount: 5,
      rating: 4.5,
      featured: false,
      highlights: ['Casa de Campo', 'Altos de Chavón', 'Golf Courses', 'Marina']
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-secondary-800 to-secondary-700 text-white py-20">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                Explore Amazing Destinations
              </h1>
              <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
                Discover the most beautiful places in the Dominican Republic
              </p>

              {/* Search Bar */}
              <div className="bg-white rounded-2xl p-6 max-w-2xl mx-auto shadow-lg">
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search destinations..."
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none text-gray-800"
                    />
                  </div>
                  <button className="bg-primary-500 hover:bg-primary-600 text-white font-semibold px-8 py-3 rounded-xl transition-colors duration-200">
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Destinations Grid */}
        <section className="py-16">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {destinations.map((destination) => (
                <div key={destination.id} className="group">
                  <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
                    {/* Destination Image */}
                    <div className="relative h-64 overflow-hidden">
                      <div 
                        className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                        style={{ backgroundImage: `url('${destination.image}')` }}
                      />
                      {destination.featured && (
                        <div className="absolute top-4 left-4 bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                          Featured
                        </div>
                      )}
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium text-gray-700">{destination.rating}</span>
                      </div>
                    </div>

                    {/* Destination Content */}
                    <div className="p-6">
                      {/* Title and Tour Count */}
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-2xl font-bold text-gray-800 group-hover:text-primary-500 transition-colors duration-200">
                          {destination.name}
                        </h3>
                        <span className="text-sm text-gray-500">
                          {destination.tourCount} tours
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {destination.description}
                      </p>

                      {/* Highlights */}
                      <div className="mb-6">
                        <div className="flex flex-wrap gap-2">
                          {destination.highlights.map((highlight, index) => (
                            <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                              {highlight}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex space-x-3">
                        <button className="flex-1 bg-primary-500 hover:bg-primary-600 text-white font-semibold py-3 rounded-lg transition-colors duration-200">
                          View Tours
                        </button>
                        <button className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                          <MapPin className="w-5 h-5 text-gray-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-white">
          <div className="container-custom text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Can't find what you're looking for?
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Our travel experts can help you plan the perfect Dominican Republic experience tailored to your preferences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-primary-500 hover:bg-primary-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-200">
                Contact Us
              </button>
              <button className="border border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-200">
                View All Tours
              </button>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}

