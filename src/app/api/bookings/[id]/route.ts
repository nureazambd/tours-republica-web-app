import { NextRequest, NextResponse } from "next/server";
import Booking from "@/models/Booking";
import { connectDB } from "@/lib/mongodb";

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> } // ✅ updated type
) {
  const { id } = await context.params; // ✅ await the Promise

  await connectDB();

  try {
    const deletedBooking = await Booking.findByIdAndDelete(id);
    if (!deletedBooking) {
      return NextResponse.json(
        { success: false, message: "Booking not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: "Booking deleted" });
  } catch (err) {
    console.error("Error deleting booking:", err);
    return NextResponse.json(
      { success: false, message: "Failed to delete booking." },
      { status: 500 }
    );
  }
}
