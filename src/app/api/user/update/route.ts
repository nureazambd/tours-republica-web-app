import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

interface DecodedToken {
  userId?: string;
  email?: string;
}

export async function PUT(req: Request) {
  try {
    await connectDB();

    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "You must be logged in" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    let decoded: DecodedToken;

    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;
    } catch (err) {
      console.error("JWT verification failed:", err);
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    if (!decoded?.userId) {
      console.error("Decoded token missing userId:", decoded);
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const userId = decoded.userId;
    const body = await req.json();

    const allowedFields = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "country",
      "city",
      "address",
      "gender",
      "dateOfBirth",
      "passportNumber",
      "passportExpiry",
      "passportCountry",
      "nationality",
    ];

    const updateData: any = {};
    for (const key of allowedFields) {
      if (body[key] !== undefined) updateData[key] = body[key];
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    }).select("-password");

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Update Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
