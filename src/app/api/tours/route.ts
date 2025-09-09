import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function GET(request: NextRequest) {
  try {
    const { db } = await connectToDatabase();
    const { searchParams } = new URL(request.url);
    
    // Get query parameters
    const category = searchParams.get('category');
    const location = searchParams.get('location');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const rating = searchParams.get('rating');
    const duration = searchParams.get('duration');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    
    // Build filter object
    const filter: any = {};
    
    if (category && category !== 'all') {
      filter.category = category;
    }
    
    if (location && location !== 'all') {
      filter.location = location;
    }
    
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseInt(minPrice);
      if (maxPrice) filter.price.$lte = parseInt(maxPrice);
    }
    
    if (rating) {
      filter.rating = { $gte: parseFloat(rating) };
    }
    
    if (duration && duration !== 'all') {
      if (duration === 'half-day') {
        filter.duration = { $lte: 4 };
      } else if (duration === 'full-day') {
        filter.duration = { $gte: 5, $lte: 8 };
      } else if (duration === 'multi-day') {
        filter.duration = { $gt: 8 };
      }
    }
    
    // Calculate skip for pagination
    const skip = (page - 1) * limit;
    
    // Get tours with pagination
    const tours = await db
      .collection('tours')
      .find(filter)
      .skip(skip)
      .limit(limit)
      .toArray();
    
    // Get total count for pagination
    const totalCount = await db.collection('tours').countDocuments(filter);
    const totalPages = Math.ceil(totalCount / limit);
    
    return NextResponse.json({
      tours,
      pagination: {
        currentPage: page,
        totalPages,
        totalCount,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    });
  } catch (error) {
    console.error('Error fetching tours:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tours' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { db } = await connectToDatabase();
    const tourData = await request.json();
    
    // Add timestamps
    const newTour = {
      ...tourData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const result = await db.collection('tours').insertOne(newTour);
    
    return NextResponse.json({
      success: true,
      tourId: result.insertedId
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating tour:', error);
    return NextResponse.json(
      { error: 'Failed to create tour' },
      { status: 500 }
    );
  }
}

