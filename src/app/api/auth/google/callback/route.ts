import { NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";
import { sendWelcomeEmail, sendLoginAlertEmail } from "@/lib/email";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get("code");
    const stateParam = searchParams.get("state");

    let role = "student";
    if (stateParam) {
      try {
        const parsed = JSON.parse(Buffer.from(stateParam, "base64").toString("utf8"));
        if (parsed.role) role = parsed.role;
      } catch (e) {}
    }

    const host = request.headers.get("host") || "localhost:3000";
    const protocol = host.includes("localhost") ? "http" : "https";
    const redirectUri = `${protocol}://${host}/api/auth/google/callback`;

    const clientId = process.env.GOOGLE_CLIENT_ID || "";
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET || "";

    if (!code) {
      return NextResponse.redirect(`${protocol}://${host}/login?error=no_code`);
    }

    // Exchange authorization code for tokens
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
    });

    const tokenData = await tokenResponse.json();

    if (!tokenData.access_token) {
      console.error("Google token exchange failed:", tokenData);
      return NextResponse.redirect(`${protocol}://${host}/login?error=token_failed`);
    }

    // Fetch Google User Profile
    const userinfoResponse = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });

    const profile = await userinfoResponse.json();

    if (!profile.email) {
      return NextResponse.redirect(`${protocol}://${host}/login?error=no_email`);
    }

    const db = await getDatabase();
    const token = `fk_sess_${Math.random().toString(36).substring(2)}_${Date.now()}`;

    const userRecord = {
      email: profile.email,
      name: profile.name || profile.email.split("@")[0],
      role: role,
      avatar: profile.picture || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
      phone: "+91 88718 35015",
      lastLogin: new Date(),
      googleId: profile.sub,
      token,
    };

    const existingUser = await db.collection("users").findOne({ email: profile.email });

    await db.collection("users").updateOne(
      { email: profile.email },
      {
        $set: userRecord,
        $setOnInsert: { createdAt: new Date(), orders: [] },
      },
      { upsert: true }
    );

    // Send email notification in background
    (async () => {
      try {
        if (!existingUser) {
          await sendWelcomeEmail(profile.email, userRecord.name);
        } else {
          await sendLoginAlertEmail(profile.email, userRecord.name, userRecord.role);
        }
      } catch (err) {
        console.error("Auth callback email failed:", err);
      }
    })();

    // Set cookie and redirect to respective portal
    const targetPath = role === "admin" ? "/admin" : role === "instructor" ? "/instructor/dashboard" : "/dashboard";
    const response = NextResponse.redirect(`${protocol}://${host}${targetPath}`);

    response.cookies.set("fukey_session", JSON.stringify({
      id: userRecord.token,
      name: userRecord.name,
      email: userRecord.email,
      role: userRecord.role,
      avatar: userRecord.avatar,
    }), {
      path: "/",
      maxAge: 30 * 24 * 60 * 60,
      sameSite: "lax",
    });

    return response;
  } catch (error) {
    console.error("Google OAuth error:", error);
    const host = request.headers.get("host") || "localhost:3000";
    const protocol = host.includes("localhost") ? "http" : "https";
    return NextResponse.redirect(`${protocol}://${host}/login?error=auth_exception`);
  }
}
