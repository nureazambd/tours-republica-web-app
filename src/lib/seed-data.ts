import { connectToDatabase } from './mongodb';

export const sampleTours = [
  {
    title: 'Santo Domingo City Tour',
    description: 'Explore the historic capital of the Dominican Republic, including the Colonial Zone, Cathedral, and Alcázar de Colón.',
    category: 'cultural',
    location: 'Santo Domingo',
    duration: 8,
    price: 89,
    originalPrice: 120,
    rating: 4.8,
    reviewCount: 245,
    maxGroupSize: 15,
    images: [
      '/images/tours/santo-domingo-1.jpg',
      '/images/tours/santo-domingo-2.jpg',
      '/images/tours/santo-domingo-3.jpg'
    ],
    highlights: [
      'Visit the first cathedral in the Americas',
      'Explore the Colonial Zone UNESCO World Heritage Site',
      'See Christopher Columbus\'s tomb',
      'Walk through historic cobblestone streets'
    ],
    included: [
      'Professional tour guide',
      'Transportation',
      'Entrance fees',
      'Lunch at local restaurant'
    ],
    notIncluded: [
      'Personal expenses',
      'Tips for guide',
      'Alcoholic beverages'
    ],
    itinerary: [
      {
        time: '8:00 AM',
        activity: 'Hotel pickup',
        description: 'Pickup from your hotel in Punta Cana or Santo Domingo'
      },
      {
        time: '10:00 AM',
        activity: 'Colonial Zone Tour',
        description: 'Guided walking tour of the historic Colonial Zone'
      },
      {
        time: '12:30 PM',
        activity: 'Lunch Break',
        description: 'Traditional Dominican lunch at a local restaurant'
      },
      {
        time: '2:00 PM',
        activity: 'Cathedral and Museums',
        description: 'Visit the Cathedral and local museums'
      },
      {
        time: '4:00 PM',
        activity: 'Return Journey',
        description: 'Return to your hotel'
      }
    ],
    availability: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: true,
      sunday: false
    },
    featured: true,
    popular: true
  },
  {
    title: 'Saona Island Paradise',
    description: 'Discover the pristine beaches and crystal-clear waters of Saona Island, a tropical paradise in the Caribbean.',
    category: 'beach',
    location: 'Samaná',
    duration: 10,
    price: 125,
    originalPrice: 160,
    rating: 4.9,
    reviewCount: 389,
    maxGroupSize: 25,
    images: [
      '/images/tours/saona-island-1.jpg',
      '/images/tours/saona-island-2.jpg',
      '/images/tours/saona-island-3.jpg'
    ],
    highlights: [
      'Pristine white sand beaches',
      'Crystal-clear turquoise waters',
      'Snorkeling in coral reefs',
      'Traditional Dominican lunch on the beach'
    ],
    included: [
      'Boat transportation',
      'Snorkeling equipment',
      'Beach lunch',
      'Open bar (rum, beer, soft drinks)',
      'Professional guide'
    ],
    notIncluded: [
      'Hotel pickup (available for extra cost)',
      'Personal expenses',
      'Tips'
    ],
    featured: true,
    popular: true
  },
  {
    title: 'Punta Cana Adventure',
    description: 'Experience the best of Punta Cana with zip-lining, cenote swimming, and beach relaxation.',
    category: 'adventure',
    location: 'Punta Cana',
    duration: 6,
    price: 95,
    originalPrice: 130,
    rating: 4.7,
    reviewCount: 156,
    maxGroupSize: 12,
    images: [
      '/images/tours/punta-cana-adventure-1.jpg',
      '/images/tours/punta-cana-adventure-2.jpg',
      '/images/tours/punta-cana-adventure-3.jpg'
    ],
    highlights: [
      'Zip-line through tropical forest',
      'Swim in natural cenotes',
      'Visit local Dominican village',
      'Beach time at Macao Beach'
    ],
    included: [
      'All activities',
      'Safety equipment',
      'Transportation',
      'Lunch and drinks'
    ],
    notIncluded: [
      'Photos and videos',
      'Tips',
      'Personal expenses'
    ],
    featured: false,
    popular: true
  }
];

export const sampleLocations = [
  {
    name: 'Santo Domingo',
    description: 'The historic capital city with colonial architecture and rich cultural heritage.',
    image: '/images/locations/santo-domingo.jpg',
    tourCount: 15,
    rating: 4.8,
    highlights: ['Colonial Zone', 'Cathedral', 'Museums', 'Historic Streets'],
    featured: true
  },
  {
    name: 'Punta Cana',
    description: 'Famous for its pristine beaches, luxury resorts, and water activities.',
    image: '/images/locations/punta-cana.jpg',
    tourCount: 25,
    rating: 4.9,
    highlights: ['Beautiful Beaches', 'Water Sports', 'Nightlife', 'Golf Courses'],
    featured: true
  },
  {
    name: 'Samaná',
    description: 'A tropical paradise known for whale watching and stunning natural beauty.',
    image: '/images/locations/samana.jpg',
    tourCount: 12,
    rating: 4.7,
    highlights: ['Whale Watching', 'Waterfalls', 'Beaches', 'Nature'],
    featured: true
  },
  {
    name: 'Puerto Plata',
    description: 'Historic port city with cable car rides and beautiful beaches.',
    image: '/images/locations/puerto-plata.jpg',
    tourCount: 18,
    rating: 4.6,
    highlights: ['Cable Car', 'Historic Fort', 'Beaches', 'Culture'],
    featured: true
  },
  {
    name: 'Bayahibe',
    description: 'Gateway to Saona Island with excellent diving and snorkeling.',
    image: '/images/locations/bayahibe.jpg',
    tourCount: 8,
    rating: 4.8,
    highlights: ['Saona Island', 'Diving', 'Fishing', 'Beaches'],
    featured: true
  },
  {
    name: 'La Romana',
    description: 'Luxury destination with world-class golf courses and resorts.',
    image: '/images/locations/la-romana.jpg',
    tourCount: 10,
    rating: 4.7,
    highlights: ['Golf Courses', 'Luxury Resorts', 'Casa de Campo', 'Marina'],
    featured: true
  }
];

export async function seedDatabase() {
  try {
    const { db } = await connectToDatabase();
    
    // Clear existing data
    await db.collection('tours').deleteMany({});
    await db.collection('locations').deleteMany({});
    
    // Insert sample tours
    await db.collection('tours').insertMany(sampleTours.map(tour => ({
      ...tour,
      createdAt: new Date(),
      updatedAt: new Date()
    })));
    
    // Insert sample locations
    await db.collection('locations').insertMany(sampleLocations.map(location => ({
      ...location,
      createdAt: new Date(),
      updatedAt: new Date()
    })));
    
    console.log('Database seeded successfully!');
    return { success: true };
  } catch (error) {
    console.error('Error seeding database:', error);
    return { success: false, error };
  }
}

