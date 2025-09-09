import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function POST(request: NextRequest) {
  try {
    const { db } = await connectToDatabase();
    const contactData = await request.json();
    
    // Validate required fields
    const { name, email, subject, message } = contactData;
    
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }
    
    // Create contact submission
    const newContact = {
      name,
      email,
      phone: contactData.phone || '',
      subject,
      message,
      status: 'new',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const result = await db.collection('contacts').insertOne(newContact);
    
    // In a real application, you would also send an email notification here
    
    return NextResponse.json({
      success: true,
      contactId: result.insertedId,
      message: 'Your message has been sent successfully. We will get back to you within 24 hours.'
    }, { status: 201 });
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return NextResponse.json(
      { error: 'Failed to submit contact form' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { db } = await connectToDatabase();
    const { searchParams } = new URL(request.url);
    
    const status = searchParams.get('status');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    
    // Build filter object
    const filter: any = {};
    
    if (status && status !== 'all') {
      filter.status = status;
    }
    
    // Calculate skip for pagination
    const skip = (page - 1) * limit;
    
    // Get contact submissions with pagination
    const contacts = await db
      .collection('contacts')
      .find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();
    
    // Get total count for pagination
    const totalCount = await db.collection('contacts').countDocuments(filter);
    const totalPages = Math.ceil(totalCount / limit);
    
    return NextResponse.json({
      contacts,
      pagination: {
        currentPage: page,
        totalPages,
        totalCount,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch contacts' },
      { status: 500 }
    );
  }
}

