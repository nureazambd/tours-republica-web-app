// app/api/tour-bookings/route.ts

import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/mongodb";
import TourBooking from "@/models/TourBooking";

// Define a type for the decoded token payload to ensure type safety
interface DecodedToken {
  id: string;
  // Add any other properties you have in your JWT payload
}

export async function POST(req: Request) {
  try {
    // Ensure database is connected
    await connectDB();

    // --- Token Verification ---
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Authorization token is missing or invalid" },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];
    let userId;

    try {
      // Verify the token using your secret key
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as DecodedToken;

      // Extract userId from the decoded token
      userId = decoded.id;
    } catch (error) {
      // This block catches errors like expired or malformed tokens
      console.error("JWT Verification Error:", error);
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
    }

    // --- Booking Creation ---
    const data = await req.json();

    // Add the authenticated user's ID to the booking data before saving
    const bookingData = {
      ...data,
      userId: userId, // Associate the booking with the logged-in user
    };

    const newBooking = await TourBooking.create(bookingData);

    return NextResponse.json(newBooking, { status: 201 });
  } catch (err: any) {
    console.error("Booking Save Error:", err);
    return NextResponse.json(
      { error: "An internal error occurred while saving the booking" },
      { status: 500 }
    );
  }
}
