// --- IN YOUR MONGODB MODEL FILE (e.g., src/models/Booking.ts) ---

import mongoose, { Schema, models } from "mongoose";

const CarSnapshotSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    type: { type: String, required: true },
}, { _id: false }); // Prevents an unnecessary _id field on the subdocument

const BookingSchema = new Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        carId: { type: mongoose.Schema.Types.ObjectId, ref: "Car", required: true },
        // 💡 FIX APPLIED HERE: Reference the dedicated sub-schema
        carSnapshot: { type: CarSnapshotSchema, required: true },
        
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
        services: [{ name: String, price: Number, qty: Number }],
        paymentMethod: { type: String, enum: ["cash", "paypal", "card"], default: "cash" },
        paymentStatus: { type: String, enum: ["pending", "paid", "unpaid"], default: "pending" },
        total: Number,
    },
    { timestamps: true }
);

const Booking = models.Booking || mongoose.model("Booking", BookingSchema);
export default Booking;