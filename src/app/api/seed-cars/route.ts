import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Car from "@/models/Car";

const cars = [
  {
    name: "Toyota Corolla, 2023",
    brand: "Toyota",
    model: "Corolla",
    year: "2023",
    color: "Silver",
    type: "Economy",
    capacity: "Up to 4",
    luggage: "x4",
    baggage: "2 suitcases",
    passengers: "4",
    price: 152,
    rating: 4.8,
    reviews: 260,
    rides: 669,
    years: 2.8,
    transmission: "Automatic",
    image: "/images/cars/Toyota-Corolla-2023.png",
    description: "Reliable economy car, ideal for couples and small families.",
    options: { manual: false, charger: true, wifi: true, water: true, ac: true, driverLocation: true },
  },
  {
    name: "Mercedes-Benz E-Class, 2019",
    brand: "Mercedes",
    model: "E-Class",
    year: "2019",
    color: "Black",
    type: "Comfort",
    capacity: "Up to 4",
    luggage: "x4",
    baggage: "2 suitcases",
    passengers: "4",
    price: 120,
    rating: 4.8,
    reviews: 195,
    rides: 350,
    years: 5,
    transmission: "Automatic",
    image: "/images/cars/Mercedes-E-Class-2019.png",
    description: "Comfortable ride with a luxurious interior.",
    options: { manual: false, charger: true, wifi: true, water: true, ac: true, driverLocation: true },
  },
  {
    name: "Volkswagen Sharan, 2017",
    brand: "Volkswagen",
    model: "Sharan",
    year: "2017",
    color: "Black",
    type: "Van",
    capacity: "Up to 6",
    luggage: "x5",
    baggage: "3 suitcases",
    passengers: "6",
    price: 148,
    rating: 4.8,
    reviews: 260,
    rides: 669,
    years: 2.8,
    transmission: "Manual",
    image: "/images/cars/Volkswagen-Sharan-2017.png",
    description: "Spacious van suitable for large families or groups.",
    options: { manual: true, charger: true, wifi: true, water: true, ac: true, driverLocation: true },
  },
  {
    name: "Tesla Model S, 2020",
    brand: "Tesla",
    model: "Model S",
    year: "2020",
    color: "Black",
    type: "Luxury",
    capacity: "Up to 3",
    luggage: "x3",
    baggage: "1 suitcase",
    passengers: "3",
    price: 220,
    rating: 4.9,
    reviews: 320,
    rides: 440,
    years: 3,
    transmission: "Automatic",
    image: "/images/cars/Tesla-Model-S-2020.png",
    description: "Premium electric car with cutting-edge technology.",
    options: { manual: false, charger: true, wifi: true, water: true, ac: true, driverLocation: true },
  },
];

export async function POST() {
  try {
    await connectDB();
    const count = await Car.countDocuments();
    if (count > 0) {
      return NextResponse.json({ message: "Cars already seeded" });
    }
    const created = await Car.insertMany(cars);
    return NextResponse.json({ created, message: "Cars seeded successfully" });
  } catch (error: any) {
    console.error("Error seeding cars:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
