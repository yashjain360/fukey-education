import { NextResponse } from "next/server";
import { randomBytes } from "node:crypto";
import { getDatabase } from "@/lib/mongodb";
import { sendLoginAlertEmail } from "@/lib/email";
import { ALL_SEED_ACCOUNTS } from "@/data/seedAccounts";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Email address and password are required." },
        { status: 400 }
      );
    }

    const cleanEmail = email.toLowerCase().trim();
    const db = await getDatabase();
    const existingUser = await db.collection("users").findOne({ email: cleanEmail });

    // 1. If not found in MongoDB, check if it is one of the designated seed accounts
    if (!existingUser) {
      const seedAccount = ALL_SEED_ACCOUNTS.find(
        (acc) => acc.email.toLowerCase().trim() === cleanEmail
      );

      if (!seedAccount) {
        return NextResponse.json(
          {
            success: false,
            error: "No account found with this email address. Please register first.",
          },
          { status: 404 }
        );
      }

      // Check seed account password
      if (password !== seedAccount.password) {
        return NextResponse.json(
          {
            success: false,
            error: "Incorrect password. Please verify your credentials.",
          },
          { status: 401 }
        );
      }

      // Provision seed account into DB
      const token = `fk_sess_${randomBytes(24).toString("hex")}`;
      const newSeedUser = {
        email: cleanEmail,
        name: seedAccount.name,
        role: seedAccount.role,
        password: seedAccount.password,
        phone: "",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
        createdAt: new Date(),
        lastLogin: new Date(),
        orders: [],
        token,
      };

      const insertResult = await db.collection("users").insertOne(newSeedUser);

      (async () => {
        try {
          await sendLoginAlertEmail(cleanEmail, newSeedUser.name, newSeedUser.role);
        } catch (err) {}
      })();

      return NextResponse.json({
        success: true,
        user: {
          id: insertResult.insertedId.toString(),
          name: newSeedUser.name,
          email: newSeedUser.email,
          role: newSeedUser.role,
          phone: newSeedUser.phone,
          avatar: newSeedUser.avatar,
          token: newSeedUser.token,
        },
      });
    }

    // 2. User exists in MongoDB: verify password
    let isPasswordValid = false;

    if (existingUser.password) {
      isPasswordValid = existingUser.password === password;
    } else {
      // Check if matching seed account password
      const seedAccount = ALL_SEED_ACCOUNTS.find(
        (acc) => acc.email.toLowerCase().trim() === cleanEmail
      );
      if (seedAccount) {
        isPasswordValid = password === seedAccount.password;
        if (isPasswordValid) {
          // Backfill password to DB
          await db.collection("users").updateOne(
            { email: cleanEmail },
            { $set: { password: seedAccount.password } }
          );
        }
      } else {
        return NextResponse.json(
          {
            success: false,
            error: "This account was signed up via Google OAuth. Please sign in with Google.",
          },
          { status: 400 }
        );
      }
    }

    if (!isPasswordValid) {
      return NextResponse.json(
        {
          success: false,
          error: "Incorrect password. Please verify your credentials or use Forgot Password.",
        },
        { status: 401 }
      );
    }

    // Mint new session token
    const token = `fk_sess_${randomBytes(24).toString("hex")}`;
    await db.collection("users").updateOne(
      { email: cleanEmail },
      {
        $set: {
          lastLogin: new Date(),
          token,
        },
      }
    );

    (async () => {
      try {
        await sendLoginAlertEmail(cleanEmail, existingUser.name, existingUser.role || "student");
      } catch (err) {}
    })();

    return NextResponse.json({
      success: true,
      user: {
        id: existingUser._id.toString(),
        name: existingUser.name,
        email: existingUser.email,
        role: existingUser.role || "student",
        phone: existingUser.phone || "",
        avatar: existingUser.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
        token,
      },
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
