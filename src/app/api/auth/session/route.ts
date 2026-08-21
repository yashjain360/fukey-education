import { NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name, role, phone, avatar } = body;

    if (!email) {
      return NextResponse.json({ success: false, error: "Email is required" }, { status: 400 });
    }

    const db = await getDatabase();
    const token = `fk_sess_${Math.random().toString(36).substring(2)}_${Date.now()}`;

    const userRecord = {
      email,
      name: name || email.split("@")[0],
      role: role || "student",
      phone: phone || "+91 88718 35015",
      avatar: avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
      lastLogin: new Date(),
      token,
    };

    await db.collection("users").updateOne(
      { email },
      {
        $set: userRecord,
        $setOnInsert: { createdAt: new Date(), orders: [] },
      },
      { upsert: true }
    );

    const savedUser = await db.collection("users").findOne({ email });

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
