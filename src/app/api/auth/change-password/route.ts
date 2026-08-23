import { NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";
import { ALL_SEED_ACCOUNTS } from "@/data/seedAccounts";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, currentPassword, newPassword } = body;

    if (!email || !currentPassword || !newPassword) {
      return NextResponse.json(
        { success: false, error: "All password fields are required." },
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
    const user = await db.collection("users").findOne({ email: cleanEmail });

    if (!user) {
      return NextResponse.json(
        { success: false, error: "User account not found." },
        { status: 404 }
      );
    }

    // Verify current password
    let isCurrentValid = false;
    if (user.password) {
      isCurrentValid = user.password === currentPassword;
    } else {
      const seedAccount = ALL_SEED_ACCOUNTS.find(
        (acc) => acc.email.toLowerCase().trim() === cleanEmail
      );
      if (seedAccount) {
        isCurrentValid = seedAccount.password === currentPassword;
      }
    }

    if (!isCurrentValid) {
      return NextResponse.json(
        { success: false, error: "Current password is incorrect." },
        { status: 401 }
      );
    }

    // Update password in MongoDB
    await db.collection("users").updateOne(
      { email: cleanEmail },
      {
        $set: {
          password: newPassword,
          updatedAt: new Date(),
        },
      }
    );

    return NextResponse.json({
      success: true,
      message: "Password changed successfully.",
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
