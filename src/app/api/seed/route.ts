import { NextRequest, NextResponse } from 'next/server';
import { seedDatabase } from '@/lib/seed-data';

export async function POST(request: NextRequest) {
  try {
    // In production, you might want to add authentication here
    const result = await seedDatabase();
    
    if (result.success) {
      return NextResponse.json({
        success: true,
        message: 'Database seeded successfully with sample data'
      });
    } else {
      return NextResponse.json({
        success: false,
        error: 'Failed to seed database'
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Error in seed API:', error);
    return NextResponse.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 });
  }
}

