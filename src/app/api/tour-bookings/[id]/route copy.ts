import { NextResponse } from 'next/server';
import TourBooking from '@/models/TourBooking';
import { connectDB } from "@/lib/mongodb";

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  await connectDB();
  try {
    await TourBooking.findByIdAndDelete(params.id);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to delete tour booking.' }, { status: 500 });
  }
}
