// src/models/Car.ts
import mongoose, { Schema, model, models } from "mongoose";

const CarSchema = new Schema(
  {
    name: { type: String, required: true },
    brand: String,
    model: String,
    year: String,
    color: String,
    type: String,
    capacity: String,
    baggage: String,
    luggage: String,
    passengers: String,
    price: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    reviews: { type: Number, default: 0 },
    rides: { type: Number, default: 0 },
    years: { type: Number, default: 0 },
    image: String, // url: e.g. /images/cars/Toyota-Corolla-2023.png
    description: String,
  },
  { timestamps: true }
);

const Car = models.Car || model("Car", CarSchema);
export default Car;
