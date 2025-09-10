import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    const { db } = await connectDB();
    const { action, ...userData } = await request.json();
    
    if (action === 'register') {
      // Check if user already exists
      const existingUser = await db.collection('users').findOne({
        email: userData.email
      });
      
      if (existingUser) {
        return NextResponse.json(
          { error: 'User already exists with this email' },
          { status: 400 }
        );
      }
      
      // Hash password
      const hashedPassword = await bcrypt.hash(userData.password, 12);
      
      // Create new user
      const newUser = {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        phone: userData.phone,
        country: userData.country,
        password: hashedPassword,
        subscribeNewsletter: userData.subscribeNewsletter || false,
        isVerified: false,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      const result = await db.collection('users').insertOne(newUser);
      
      // Remove password from response
      const { password, ...userResponse } = newUser;
      
      return NextResponse.json({
        success: true,
        user: { ...userResponse, _id: result.insertedId }
      }, { status: 201 });
      
    } else if (action === 'login') {
      // Find user by email
      const user = await db.collection('users').findOne({
        email: userData.email
      });
      
      if (!user) {
        return NextResponse.json(
          { error: 'Invalid email or password' },
          { status: 401 }
        );
      }
      
      // Check password
      const isPasswordValid = await bcrypt.compare(userData.password, user.password);
      
      if (!isPasswordValid) {
        return NextResponse.json(
          { error: 'Invalid email or password' },
          { status: 401 }
        );
      }
      
      // Update last login
      await db.collection('users').updateOne(
        { _id: user._id },
        { $set: { lastLogin: new Date() } }
      );
      
      // Remove password from response
      const { password, ...userResponse } = user;
      
      return NextResponse.json({
        success: true,
        user: userResponse
      });
      
    } else {
      return NextResponse.json(
        { error: 'Invalid action' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Error in users API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

