import type { TrpcContext } from "./context";
import { verifySessionToken } from "./kimi/session";
import { findUserByUnionId } from "./queries/users";
import { verifyEmailToken } from "./auth-router";
import * as cookie from "cookie";
import { Session } from "@contracts/constants";
import { db } from "./queries/connection";
import { users } from "@db/schema";
import { eq } from "drizzle-orm";

export const createContext = async (opts: { req: Request; resHeaders: Headers }): Promise<TrpcContext> => {
  try {
    const cookies = cookie.parse(opts.req.headers.get("cookie") || "");
    
    // 1. Try Kimi OAuth session
    const sessionToken = cookies[Session.cookieName];
    if (sessionToken) {
      const claim = await verifySessionToken(sessionToken);
      if (claim) {
        const user = await findUserByUnionId(claim.unionId);
        if (user) {
          return { req: opts.req, resHeaders: opts.resHeaders, user };
        }
      }
    }

    // 2. Try email/password token
    const emailToken = cookies["email_token"];
    if (emailToken) {
      const claim = await verifyEmailToken(emailToken);
      if (claim) {
        const rows = await db.select().from(users).where(eq(users.id, claim.userId)).limit(1);
        if (rows.length > 0) {
          const u = rows[0];
          return { req: opts.req, resHeaders: opts.resHeaders, user: { id: u.id, name: u.name || u.email, email: u.email, role: u.role } };
        }
      }
    }
  } catch (e) {
    // Silently ignore auth errors for public routes
  }
  return { req: opts.req, resHeaders: opts.resHeaders };
};
