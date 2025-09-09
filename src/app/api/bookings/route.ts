import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function GET(request: NextRequest) {
  try {
    const { db } = await connectToDatabase();
    const { searchParams } = new URL(request.url);
    
    const userId = searchParams.get('userId');
    const status = searchParams.get('status');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    
    // Build filter object
    const filter: any = {};
    
    if (userId) {
      filter.userId = userId;
    }
    
    if (status && status !== 'all') {
      filter.status = status;
    }
    
    // Calculate skip for pagination
    const skip = (page - 1) * limit;
    
    // Get bookings with pagination
    const bookings = await db
      .collection('bookings')
      .find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();
    
    // Get total count for pagination
    const totalCount = await db.collection('bookings').countDocuments(filter);
    const totalPages = Math.ceil(totalCount / limit);
    
    return NextResponse.json({
      bookings,
      pagination: {
        currentPage: page,
        totalPages,
        totalCount,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bookings' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { db } = await connectToDatabase();
    const bookingData = await request.json();
    
    // Generate booking reference
    const bookingRef = 'TR' + Date.now().toString().slice(-8);
    
    // Add booking metadata
    const newBooking = {
      ...bookingData,
      bookingReference: bookingRef,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const result = await db.collection('bookings').insertOne(newBooking);
    
    return NextResponse.json({
      success: true,
      bookingId: result.insertedId,
      bookingReference: bookingRef
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    );
  }
}

