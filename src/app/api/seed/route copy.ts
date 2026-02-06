import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Tour from "@/models/Tour";

export async function POST() {
  await connectDB();

  const tours = [
    {
      title: "Aventura En Buggys",
      description:
        "Explore the highlights of Punta Cana in a thrilling half-day off-road dune buggy.",
      price: 50,
      originalPrice: 75,
      rating: 4.8,
      reviewCount: 30,
      duration: "Half Day (4-6 hours)",
      pickup: "Punta Cana",
      category: "adventure",
      image: "/images/tours/Aventura-en-Buggys.png",
      overview:
        "Drive through the countryside, see local villages, and experience adventure in Punta Cana.",
      included: ["Hotel Pickup", "Guide", "Safety Gear"],
      excluded: ["Meals", "Tips"],
      reviews: [
        { name: "John Doe", rating: 5, text: "Amazing buggy ride!" },
        { name: "Jane Smith", rating: 4, text: "Fun but a bit dusty." },
      ],
    },
    {
      title: "Santo Domingo City Tour",
      description:
        "Explore the highlights of Santo Domingo in a thrilling cultural city trip.",
      price: 120,
      originalPrice: 150,
      rating: 4.6,
      reviewCount: 22,
      duration: "Full Day (8-10 hours)",
      pickup: "Santo Domingo",
      category: "culture",
      image: "/images/tours/Santo-Domingo-City-Tour-cityTour.png",
      overview:
        "Discover the Colonial Zone, local food, and cultural sites in Santo Domingo.",
      included: ["Guide", "Transport", "Entrance Fees"],
      excluded: ["Lunch", "Tips"],
      reviews: [{ name: "Carlos M.", rating: 5, text: "Beautiful historic city!" }],
    },
    {
      title: "Saona Island Catamaran Tour",
      description:
        "Saona Island, a paradise in the center of the Caribbean, its turquoise...",
      price: 65,
      originalPrice: 80,
      rating: 4,
      reviewCount: 4,
      duration: "Full Day (10 hours)",
      pickup: "At your hotel lobby",
      category: "nature",
      image: "/images/tours/DJI_0659.jpg.jpeg",
      overview:
        "Saona Island, a paradise in the center of the Caribbean, its turquoise blue waters and fine white sands confirm why it is the most popular excursion in Punta Cana.",
      included: ["Boat Transfer", "Guide", "Drinks"],
      excluded: ["Extra Drinks", "Personal expenses"],
      reviews: [{ name: "Alice", rating: 5, text: "Paradise on earth!" }],
    },
    {
      title: "Tapas Tour",
      description:
        "Enjoy local Dominican flavors and tapas while exploring the culture and nightlife.",
      price: 70,
      originalPrice: 100,
      rating: 4.7,
      reviewCount: 20,
      duration: "Evening (3-4 hours)",
      pickup: "Santo Domingo",
      category: "food",
      image: "/images/tours/Tapas-Tour.png",
      overview:
        "A perfect blend of food, culture, and nightlife exploration in the heart of Santo Domingo.",
      included: ["Food Tasting", "Guide", "Drinks"],
      excluded: ["Extra Drinks", "Personal expenses"],
      reviews: [{ name: "Michael B.", rating: 5, text: "Delicious and fun!" }],
    },
    {
      title: "From Santo Domingo to Punta Cana",
      description:
        "A full-day journey from Santo Domingo to Punta Cana with sightseeing and local experiences.",
      price: 120,
      originalPrice: 150,
      rating: 4.6,
      reviewCount: 22,
      duration: "Full Day (8-10 hours)",
      pickup: "Santo Domingo",
      category: "culture",
      image: "/images/tours/From-Santo-Domingo.png",
      overview:
        "Travel across the Dominican Republic with scenic views and guided cultural stops.",
      included: ["Guide", "Transport", "Entrance Fees"],
      excluded: ["Lunch", "Tips"],
      reviews: [{ name: "Carlos M.", rating: 5, text: "Great cultural experience!" }],
    },
    {
      title: "Bike Tour",
      description:
        "Cycle through beautiful landscapes and beaches with a local guide.",
      price: 90,
      originalPrice: 120,
      rating: 4.9,
      reviewCount: 45,
      duration: "Half Day (4-6 hours)",
      pickup: "Bayahibe",
      category: "nature",
      image: "/images/tours/Bike-Tour.png",
      overview:
        "Enjoy a scenic bike ride through stunning Dominican countryside and coastal paths.",
      included: ["Bike", "Guide", "Safety Gear"],
      excluded: ["Meals", "Tips"],
      reviews: [{ name: "Alice", rating: 5, text: "Fun and refreshing!" }],
    },
  ];

  try {
    await Tour.deleteMany();
    await Tour.insertMany(tours);
    return NextResponse.json({
      success: true,
      message: "✅ All tours seeded successfully!",
      count: tours.length,
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Unknown error occurred.";
    console.error("❌ Seeding error:", message);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
