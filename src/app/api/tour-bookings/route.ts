// app/api/your-route/route.ts (or similar path)

import { NextResponse } from "next/server";
// 👇 CHANGED: Import the correct function from the correct file
import { connectDB } from "@/lib/mongodb"; 
import TourBooking from "@/models/TourBooking";

export async function POST(req: Request) {
  try {
    // 👇 CHANGED: Call the correct async function to ensure connection
    await connectDB(); 

    const data = await req.json();
    const newBooking = await TourBooking.create(data);
    
    return NextResponse.json(newBooking, { status: 201 });
  } catch (err: any) {
    console.error("Booking Save Error:", err);
    return NextResponse.json({ error: "Failed to save booking" }, { status: 500 });
  }
}