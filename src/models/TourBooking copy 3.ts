import mongoose, { Schema, model, models } from "mongoose";

const TourBookingSchema = new Schema(
  {
    // --- CRITICAL FIX: Added userId to link booking to a user ---
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // This should match the name of your User model
      required: true,
    },
    tourId: { type: String, required: true },
    title: String,
    location: String,
    adults: Number,
    children: Number,
    subtotal: Number,
    tax: Number,
    total: Number,
    paymentMethod: { type: String, enum: ["cash", "paypal", "card"], required: true },
    paymentStatus: { // Added for consistency
      type: String, 
      enum: ["pending", "paid", "unpaid"], 
      default: "pending" 
    },
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

