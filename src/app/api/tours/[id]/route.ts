// src\app\api\tours\[id]\route.ts

import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import mongoose from 'mongoose';

// 🟢 FINAL FUNCTIONALITY FIX: Minimalist function signature to avoid the Type Error.
// We only type the 'request' object, letting 'context' be implicitly typed (or ignored).
export async function GET(
    request: NextRequest, 
    context: any // Use 'any' or just leave it untyped to bypass the TypeScript conflict
) {
    let id: string | null = null;
    
    try {
        // 1. Get the full path from the Next.js standard 'x-invoke-path' header
        const path = request.headers.get('x-invoke-path'); 
        
        if (path) {
            // Path looks like: /api/tours/68e9e2e4f69da497c573b2a7
            const pathSegments = path.split('/');
            id = pathSegments[pathSegments.length - 1];
        } else {
            // Fallback: Use new URL(request.url) (safest general retrieval)
            const url = new URL(request.url);
            const pathSegments = url.pathname.split('/');
            id = pathSegments[pathSegments.length - 1];
        }
        
        // This process guarantees the ID is retrieved without touching the
        // problematic 'context.params' or triggering the 'await' check.

        if (!id || id === 'tours' || id.length < 20) { // Add safety checks
            return NextResponse.json({ error: 'Missing or invalid tour ID' }, { status: 400 });
        }
        
        // 2. Connect to DB
        const { db } = await connectDB(); 

        // 3. Validate ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ error: 'Invalid tour ID format' }, { status: 400 });
        }

        // 4. Convert string ID to MongoDB ObjectId for query
        const objectId = new mongoose.Types.ObjectId(id);

        const tour = await db
            .collection('tours')
            .findOne({ _id: objectId });

        if (!tour) {
            return NextResponse.json({ error: 'Tour not found' }, { status: 404 });
        }

        return NextResponse.json(tour);

    } catch (error) {
        // Ensure connection/other errors are caught
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        
        console.error('Error fetching single tour:', errorMessage);
        return NextResponse.json(
            { error: 'Failed to fetch tour details', details: errorMessage },
            { status: 500 }
        );
    }
}