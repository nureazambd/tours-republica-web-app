// app/api/tours/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Collection } from 'mongodb';

// Define types for consistency
interface Tour {
    _id: string; // MongoDB ObjectId
    title: string;
    price: number;
    rating: number;
    category: string;
    pickup: string; // Use 'pickup' for location filtering
    duration: string; // Use string matching for duration
    reviewCount: number;
    createdAt: Date;
    updatedAt: Date;
}

export async function GET(request: NextRequest) {
    try {
        // Assume connectDB returns an object containing the MongoDB 'db' instance
        const { db } = await connectDB(); 
        const toursCollection: Collection<Tour> = db.collection('tours');
        const { searchParams } = new URL(request.url);

        // Get query parameters
        const category = searchParams.get('category');
        const location = searchParams.get('location');
        const minPrice = searchParams.get('minPrice');
        const maxPrice = searchParams.get('maxPrice');
        const rating = searchParams.get('rating');
        const duration = searchParams.get('duration');
        const sortBy = searchParams.get('sortBy');
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '12');

        // Build filter object
        const filter: any = {};
        const sort: any = {};

        if (category && category !== 'all') {
            filter.category = category;
        }

        // 🟢 CRITICAL FIX 1: Filter by 'pickup' field, not 'location'
        if (location && location !== 'all') {
            filter.pickup = location;
        }

        if (minPrice || maxPrice) {
            filter.price = {};
            // Ensure values are numbers for MongoDB
            if (minPrice) filter.price.$gte = parseInt(minPrice);
            if (maxPrice) filter.price.$lte = parseInt(maxPrice);
        }

        if (rating) {
            // Filter by rating (e.g., find all tours >= specified rating)
            filter.rating = { $gte: parseFloat(rating) };
        }

        // 🟢 CRITICAL FIX 2: Use regex for string duration matching
        if (duration && duration !== 'all') {
            // Match case-insensitively using part of the duration string
            if (duration === 'half-day') {
                filter.duration = { $regex: /half day/i }; 
            } else if (duration === 'full-day') {
                filter.duration = { $regex: /full day/i };
            } 
        }

        // --- Sorting Logic ---
        switch (sortBy) {
            case 'price-low':
                sort.price = 1;
                break;
            case 'price-high':
                sort.price = -1;
                break;
            case 'rating':
                sort.rating = -1;
                break;
            case 'popular':
            default:
                sort.reviewCount = -1; // Default to popular/highest reviewed
                break;
        }
        
        // Calculate skip for pagination
        const skip = (page - 1) * limit;
        
        // Get tours with pagination and sorting
        const tours = await toursCollection
            .find(filter)
            .sort(sort)
            .skip(skip)
            .limit(limit)
            .toArray();
        
        // Get total count for pagination
        const totalCount = await toursCollection.countDocuments(filter);
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
        // 🔴 CHECK YOUR SERVER CONSOLE FOR THIS ERROR LOG
        console.error('Error fetching tours:', error);
        return NextResponse.json(
            { error: 'Failed to fetch tours' },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const { db } = await connectDB();
        const toursCollection: Collection<Tour> = db.collection('tours');
        const tourData = await request.json();
        
        // Add timestamps
        const newTour = {
            ...tourData,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        
        const result = await toursCollection.insertOne(newTour);
        
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