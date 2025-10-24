import { NextResponse } from 'next/server';
import Booking from '@/models/Booking';
import { connectDB } from "@/lib/mongodb";

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  await connectDB();
  try {
    await Booking.findByIdAndDelete(params.id);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to delete booking.' }, { status: 500 });
  }
}
