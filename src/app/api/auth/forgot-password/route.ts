// app/api/auth/forgot-password/route.ts
import { NextResponse } from "next/server";
import crypto from "crypto";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { sendEmail } from "@/utils/sendEmail";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    await connectDB();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "No user found with this email" }, { status: 404 });
    }

    // RAW token (send this to frontend)
    const rawToken = crypto.randomBytes(32).toString("hex");

    // HASHED token (save this)
    const hashedToken = crypto.createHash("sha256").update(rawToken).digest("hex");

    user.resetToken = hashedToken;
    user.resetTokenExpire = new Date(Date.now() + 20 * 60 * 1000);
    await user.save();

    // Send RAW token in email link
    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${rawToken}&email=${encodeURIComponent(email)}`;

    const html = `
      <p>You requested a password reset. Click below:</p>
      <a href="${resetUrl}">${resetUrl}</a>
      <p>This link expires in 20 minutes.</p>
    `;

    await sendEmail(email, "Password Reset - ToursRepublica", html);

    return NextResponse.json({ message: "Reset link sent successfully" });
  } catch (err) {
    console.error("Forgot password error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
