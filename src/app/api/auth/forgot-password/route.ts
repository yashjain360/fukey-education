import { NextResponse } from "next/server";
import { sendPasswordResetEmail } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ success: false, error: "Email is required" }, { status: 400 });
    }

    const resetToken = `rst_${Math.random().toString(36).substring(2)}_${Date.now()}`;

    // Send Password Reset Email in Background
    (async () => {
      try {
        await sendPasswordResetEmail(email, resetToken);
      } catch (err) {
        console.error("Password reset email dispatch error:", err);
      }
    })();

    return NextResponse.json({
      success: true,
      message: `Password reset instructions sent to ${email}`,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
