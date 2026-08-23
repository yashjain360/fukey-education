import { NextResponse } from "next/server";
import { randomBytes } from "node:crypto";
import { getDatabase } from "@/lib/mongodb";
import { sendWelcomeEmail } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, name, phone } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Email address and password are required." },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, error: "Password must be at least 6 characters long." },
        { status: 400 }
      );
    }

    const cleanEmail = email.toLowerCase().trim();
    const db = await getDatabase();
    const existingUser = await db.collection("users").findOne({ email: cleanEmail });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          error: "An account with this email already exists. Please sign in instead.",
        },
        { status: 409 }
      );
    }

    const token = `fk_sess_${randomBytes(24).toString("hex")}`;
    const newUser = {
      email: cleanEmail,
      name: name?.trim() || cleanEmail.split("@")[0],
      password: password,
      role: "student",
      phone: phone?.trim() || "",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
      createdAt: new Date(),
      lastLogin: new Date(),
      orders: [],
      token,
    };

    const insertResult = await db.collection("users").insertOne(newUser);

    (async () => {
      try {
        await sendWelcomeEmail(cleanEmail, newUser.name);
      } catch (err) {}
    })();

    return NextResponse.json({
      success: true,
      user: {
        id: insertResult.insertedId.toString(),
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        phone: newUser.phone,
        avatar: newUser.avatar,
        token: newUser.token,
      },
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
