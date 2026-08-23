import { NextResponse } from "next/server";
import { randomBytes } from "node:crypto";
import { getDatabase } from "@/lib/mongodb";
import { sendPasswordResetEmail } from "@/lib/email";
import { ALL_SEED_ACCOUNTS } from "@/data/seedAccounts";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ success: false, error: "Email is required." }, { status: 400 });
    }

    const cleanEmail = email.toLowerCase().trim();
    const db = await getDatabase();
    const existingUser = await db.collection("users").findOne({ email: cleanEmail });

    // If not found in DB, check if it's a seed account
    if (!existingUser) {
      const seedAccount = ALL_SEED_ACCOUNTS.find(
        (acc) => acc.email.toLowerCase().trim() === cleanEmail
      );
      if (!seedAccount) {
        return NextResponse.json(
          {
            success: false,
            error: "No account found with this email address. Please verify or register.",
          },
          { status: 404 }
        );
      }
    }

    const resetToken = randomBytes(24).toString("hex");
    const resetExpiry = new Date(Date.now() + 3600 * 1000); // 1 hour

    await db.collection("users").updateOne(
      { email: cleanEmail },
      {
        $set: {
          resetPasswordToken: resetToken,
          resetPasswordExpires: resetExpiry,
        },
      },
      { upsert: true }
    );

    // Send Password Reset Email
    try {
      await sendPasswordResetEmail(cleanEmail, resetToken);
    } catch (err) {
      console.error("Password reset email dispatch error:", err);
    }

    return NextResponse.json({
      success: true,
      message: `Password reset instructions sent to ${cleanEmail}`,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
