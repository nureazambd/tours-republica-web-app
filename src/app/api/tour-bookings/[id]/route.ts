import { NextRequest, NextResponse } from "next/server";
import TourBooking from "@/models/TourBooking";
import { connectDB } from "@/lib/mongodb";

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> } // ✅ params is now a Promise
) {
  // ✅ Await params before using it
  const { id } = await context.params;

  await connectDB();

  try {
    const deleted = await TourBooking.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, message: "Tour booking not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Tour booking deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting tour booking:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete tour booking." },
      { status: 500 }
    );
  }
}
