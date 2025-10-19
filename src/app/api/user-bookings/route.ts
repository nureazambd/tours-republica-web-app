import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Booking from "@/models/Booking";
import TourBooking from "@/models/TourBooking";
import jwt from "jsonwebtoken";

const getUserIdFromToken = (req: NextRequest): string | null => {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) return null;

    const token = authHeader.split(" ")[1];
    const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET!);
    return decodedToken.userId || null;
  } catch {
    return null;
  }
};

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const userId = getUserIdFromToken(req);

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch both bookings
    const carBookings = await Booking.find({ userId }).lean();
    const tourBookings = await TourBooking.find({ userId }).lean();

    return NextResponse.json({ carBookings, tourBookings }, { status: 200 });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json({ error: "Failed to load bookings" }, { status: 500 });
  }
}
