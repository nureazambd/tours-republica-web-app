// app/api/auth/forgot-password/route.ts
import { NextResponse } from "next/server";
import crypto from "crypto";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { sendEmail } from "@/utils/sendEmail";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email } = body;
    if (!email) return NextResponse.json({ error: "Email is required" }, { status: 400 });

    await connectDB();

    const user = await User.findOne({ email });
    if (!user) return NextResponse.json({ error: "No user found with that email" }, { status: 404 });

    // create a token (use random bytes)
    const resetToken = crypto.randomBytes(32).toString("hex");
    const expire = Date.now() + 1000 * 60 * 20; // 20 minutes

    user.resetToken = resetToken;
    user.resetTokenExpire = new Date(expire);
    await user.save();

    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${resetToken}&email=${encodeURIComponent(email)}`;

    const html = `
      <p>You requested a password reset. Click the link below to reset your password (valid for 20 minutes):</p>
      <p><a href="${resetUrl}">${resetUrl}</a></p>
      <p>If you didn't request this, ignore this email.</p>
    `;

    await sendEmail(email, "Password Reset - ToursRepublica", html);

    return NextResponse.json({ message: "Reset link sent (check console or email)" });
  } catch (error: any) {
    console.error("Forgot password error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
