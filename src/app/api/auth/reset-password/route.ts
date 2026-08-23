import { NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, token, newPassword } = body;

    if (!email || !token || !newPassword) {
      return NextResponse.json(
        { success: false, error: "Email, reset token, and new password are required." },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { success: false, error: "New password must be at least 6 characters long." },
        { status: 400 }
      );
    }

    const cleanEmail = email.toLowerCase().trim();
    const db = await getDatabase();
    const user = await db.collection("users").findOne({
      email: cleanEmail,
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: new Date() },
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid or expired password reset link. Please request a new one.",
        },
        { status: 400 }
      );
    }

    await db.collection("users").updateOne(
      { email: cleanEmail },
      {
        $set: { password: newPassword, updatedAt: new Date() },
        $unset: { resetPasswordToken: "", resetPasswordExpires: "" },
      }
    );

    return NextResponse.json({
      success: true,
      message: "Password has been successfully reset. You can now sign in.",
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
