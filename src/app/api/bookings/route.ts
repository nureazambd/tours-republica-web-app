// src/app/api/bookings/route.ts

import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Booking from "@/models/Booking";
import jwt from "jsonwebtoken";

const getUserIdFromToken = (req: NextRequest): string | null => {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return null;
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
      return null;
    }
    const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET!);

    // --- THIS IS THE FIX ---
    // The token payload from your login API uses the key `userId`.
    // We now correctly access `decodedToken.userId`.
    if (!decodedToken.userId) {
      console.log("Token payload does not contain 'userId'.");
      return null;
    }

    return decodedToken.userId;

  } catch (error) {
    console.error("Token verification failed:", error);
    return null;
  }
};

export async function POST(req: NextRequest) {
  try {
    const userId = getUserIdFromToken(req);

    if (!userId) {
      return NextResponse.json(
        { error: "Authentication failed. Please log in." },
        { status: 401 }
      );
    }

    await connectDB();
    const body = await req.json();

    const newBooking = await Booking.create({
      userId: userId,
      carId: body.carId,
      carSnapshot: body.carSnapshot,
      traveler: body.traveler,
      flightInfo: body.flightInfo,
      pickupPlace: body.pickupPlace,
      services: body.services,
      paymentMethod: body.paymentMethod,
      paymentStatus: body.paymentStatus,
      total: body.total,
    });

    return NextResponse.json(newBooking, { status: 201 });
  } catch (error: any) {
    console.error("Booking creation error:", error);
    return NextResponse.json(
      { error: "Failed to create booking" },
      { status: 500 }
    );
  }
}