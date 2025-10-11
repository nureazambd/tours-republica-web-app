// src\app\api\tours\[id]\route.ts

import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import mongoose from 'mongoose';

// Define the type for the full context argument (kept for function signature compatibility)
interface ParamsContainer {
    params: {
        id: string;
    };
}

// 🟢 FINAL FIX: Extract the ID directly from the URL path
export async function GET(request: NextRequest, context: ParamsContainer) {
    try {
        // Use request.url to extract the ID from the path (e.g., /api/tours/68e...2ad)
        const pathSegments = request.url.split('/');
        // The ID is the last segment in the path array: pathSegments[pathSegments.length - 1]
        const id = pathSegments[pathSegments.length - 1]; 

        if (!id) {
            // This case should be rare since the dynamic route should catch it
            return NextResponse.json({ error: 'Missing tour ID' }, { status: 400 });
        }
        
        // 2. Perform async operation (connectDB)
        const { db } = await connectDB(); 

        // Validate ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ error: 'Invalid tour ID format' }, { status: 400 });
        }

        // Convert string ID to MongoDB ObjectId for query
        const objectId = new mongoose.Types.ObjectId(id);

        const tour = await db
            .collection('tours')
            .findOne({ _id: objectId });

        if (!tour) {
            return NextResponse.json({ error: 'Tour not found' }, { status: 404 });
        }

        return NextResponse.json(tour);

    } catch (error) {
        console.error('Error fetching single tour:', error);
        return NextResponse.json(
            { error: 'Failed to fetch tour details' },
            { status: 500 }
        );
    }
}