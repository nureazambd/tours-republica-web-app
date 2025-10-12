import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Car from "@/models/Car";

export async function GET(req: Request) {
  try {
    await connectDB();

    // Optional: handle filters (if provided in query)
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type") || "";
    const passengers = searchParams.get("passengers") || "";

    // Example filter: by type or passengers
    const filter: any = {};
    if (type) filter.type = { $regex: type, $options: "i" };
    if (passengers) filter.passengers = passengers;

    const cars = await Car.find(filter);
    return NextResponse.json(cars);
  } catch (error: any) {
    console.error("Error fetching cars:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
