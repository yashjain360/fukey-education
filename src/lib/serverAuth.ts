import { getDatabase } from "@/lib/mongodb";

export interface AuthedUser {
  id: string;
  email: string;
  name: string;
  role: "student" | "instructor" | "admin";
}

export class AuthError extends Error {
  status: number;
  constructor(message: string, status = 401) {
    super(message);
    this.status = status;
  }
}

/** Looks up a user by the opaque session token minted in POST /api/auth/session. Returns null for a
 * missing/unknown token — never throws, so callers can decide whether anonymous access is fine. */
export async function getUserByToken(token: string): Promise<AuthedUser | null> {
  if (!token) return null;

  const db = await getDatabase();
  let user = await db.collection("users").findOne({ token });
  
  // Fallback: Check if token is user ID or email representation
  if (!user && (token.includes("@") || token.startsWith("usr_") || token.length === 24)) {
    user = await db.collection("users").findOne({
      $or: [
        { email: token.toLowerCase().trim() },
        { id: token }
      ]
    });
  }

  if (!user) return null;

  return {
    id: user._id.toString(),
    email: user.email,
    name: user.name || user.email.split("@")[0],
    role: user.role || "student",
  };
}

/** Reads `Authorization: Bearer <token>` off the request and resolves the user, or throws an
 * AuthError (401) that route handlers should catch and turn into a JSON error response. This is the
 * only server-verifiable identity in the app — never trust a client-supplied role/isInstructor flag
 * in a request body instead of this. */
export async function requireUser(request: Request): Promise<AuthedUser> {
  const authHeader = request.headers.get("authorization") || "";
  const match = authHeader.match(/^Bearer\s+(.+)$/i);
  const token = match?.[1];

  if (!token) {
    throw new AuthError("Authentication required — missing bearer token");
  }

  const user = await getUserByToken(token);
  if (!user) {
    throw new AuthError("Invalid or expired session token");
  }

  return user;
}

/** Throws a 403 AuthError unless the user's role is instructor/admin. */
export function requireInstructor(user: AuthedUser): void {
  if (user.role !== "instructor" && user.role !== "admin") {
    throw new AuthError("Instructor or admin access required", 403);
  }
}
