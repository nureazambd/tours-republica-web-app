import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
import jwt from "jsonwebtoken";
import User from "@/models/User";
import { connectDB } from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    await connectDB();

    // Read Bearer token from headers
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json({ error: "No token" }, { status: 401 });
    }

    const token = authHeader.replace("Bearer ", "").trim();

    // Verify token
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

    if (!decoded || !decoded.userId) {
      return NextResponse.json({ error: "Invalid Token" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("profileImage") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = `${Date.now()}-${file.name}`;
    const uploadDir = path.join(process.cwd(), "public/profile");

    await fs.mkdir(uploadDir, { recursive: true });

    const filePath = path.join(uploadDir, fileName);
    await fs.writeFile(filePath, buffer);

    const imageUrl = `/profile/${fileName}`;

    // Update MongoDB user profile
    await User.findByIdAndUpdate(decoded.userId, { profileImage: imageUrl });

    return NextResponse.json({ imageUrl }, { status: 200 });

  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Upload failed", details: (err as any).message },
      { status: 500 }
    );
  }
}
