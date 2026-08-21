import { NextResponse } from "next/server";
import { randomBytes } from "node:crypto";
import { getDatabase } from "@/lib/mongodb";
import { sendWelcomeEmail, sendLoginAlertEmail } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name, phone, avatar, isNewRegistration } = body;

    if (!email) {
      return NextResponse.json({ success: false, error: "Email is required" }, { status: 400 });
    }

    const db = await getDatabase();
    const token = `fk_sess_${randomBytes(24).toString("hex")}`;

    const existingUser = await db.collection("users").findOne({ email: email.toLowerCase().trim() });
    // Role is never taken from the client: an existing user keeps whatever role is already in the
    // DB, and a brand-new signup always starts as "student". Promoting someone to instructor/admin
    // is a deliberate DB update, not something a signup request body can request for itself — this
    // used to let any visitor POST {role:"admin"} and get it.
    const userRole = existingUser?.role || "student";

    const userRecord = {
      email: email.toLowerCase().trim(),
      name: name || existingUser?.name || email.split("@")[0],
      role: userRole,
      phone: phone || existingUser?.phone || "+91 88718 35015",
      avatar: avatar || existingUser?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
      lastLogin: new Date(),
      token,
    };

    await db.collection("users").updateOne(
      { email: email.toLowerCase().trim() },
      {
        $set: userRecord,
        $setOnInsert: { createdAt: new Date(), orders: [] },
      },
      { upsert: true }
    );

    const savedUser = await db.collection("users").findOne({ email });

    // Automated Email Notification in Background
    (async () => {
      try {
        if (!existingUser || isNewRegistration) {
          await sendWelcomeEmail(email, userRecord.name);
        } else {
          await sendLoginAlertEmail(email, userRecord.name, userRecord.role);
        }
      } catch (emailErr) {
        console.error("Automated auth email failed:", emailErr);
      }
    })();

    return NextResponse.json({
      success: true,
      user: {
        id: savedUser?._id?.toString() || `usr_${Date.now()}`,
        name: savedUser?.name || userRecord.name,
        email: savedUser?.email || userRecord.email,
        role: savedUser?.role || userRecord.role,
        phone: savedUser?.phone || userRecord.phone,
        avatar: savedUser?.avatar || userRecord.avatar,
        token: userRecord.token,
      },
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ success: false, error: "Email parameter missing" }, { status: 400 });
    }

    const db = await getDatabase();
    const user = await db.collection("users").findOne({ email });

    if (!user) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role || "student",
        phone: user.phone,
        avatar: user.avatar,
        enrolledCoursesCount: user.orders?.length || 2,
      },
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
