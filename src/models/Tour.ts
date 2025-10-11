// models/Tour.ts
import mongoose, { Schema, model, models } from "mongoose";

const TourSchema = new Schema(
  {
    title: { type: String, required: true },
    description: String,
    price: Number,
    originalPrice: Number,
    rating: Number,
    reviewCount: Number,
    duration: String,
    pickup: String,
    category: String,
    image: String,
    overview: String,
    included: [String],
    excluded: [String],
    reviews: [
      {
        user: String,
        rating: Number,
        comment: String,
      },
    ],
  },
  { timestamps: true }
);

const Tour = models.Tour || model("Tour", TourSchema);
export default Tour;
