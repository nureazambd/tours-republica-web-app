// src/app/api/bookings/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Booking from "@/models/Booking";

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    // minimal validation
    if (!body.carId || !body.traveler || !body.total) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const created = await Booking.create(body);
    return NextResponse.json({ booking: created }, { status: 201 });
  } catch (err: any) {
    console.error("Booking create error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
