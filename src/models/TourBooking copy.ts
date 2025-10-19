import mongoose, { Schema, model, models } from "mongoose";

const TourBookingSchema = new Schema(
  {
    tourId: { type: String, required: true },
    title: String,
    location: String,
    adults: Number,
    children: Number,
    subtotal: Number,
    tax: Number,
    total: Number,
    paymentMethod: { type: String, enum: ["cash", "paypal", "card"], required: true },
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    country: String,
    pickupPlace: String,
    remarks: String,
  },
  { timestamps: true }
);

export default models.TourBooking || model("TourBooking", TourBookingSchema);
