// src/models/Booking.ts
import mongoose, { Schema, model, models } from "mongoose";

const BookingSchema = new Schema(
  {
    carId: { type: Schema.Types.ObjectId, ref: "Car", required: true },
    carSnapshot: {
      name: String,
      price: Number,
      image: String,
      type: String,
    },
    traveler: {
      firstName: String,
      lastName: String,
      email: String,
      phone: String,
      country: String,
    },
    flightInfo: {
      airline: String,
      flightNumber: String,
      remarks: String,
    },
    pickupPlace: String,
    pickupDateTime: String,
    dropoffDateTime: String,
    services: [
      {
        name: String,
        price: Number,
        qty: Number,
      },
    ],
    paymentMethod: String,
    total: Number,
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

const Booking = models.Booking || model("Booking", BookingSchema);
export default Booking;
