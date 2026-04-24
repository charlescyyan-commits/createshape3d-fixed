import { z } from "zod";
import bcryptjs from "bcryptjs";
import * as jose from "jose";
import * as cookie from "cookie";
import { Session } from "@contracts/constants";
import { getSessionCookieOptions } from "./lib/cookies";
import { createRouter, publicQuery, authedQuery } from "./middleware";
import { db } from "./queries/connection";
import { users } from "@db/schema";
import { eq } from "drizzle-orm";

const JWT_ALG = "HS256";

async function signEmailToken(payload: { userId: number; email: string }): Promise<string> {
  const { env } = await import("./lib/env");
  const secret = new TextEncoder().encode(env.appSecret);
  return new jose.SignJWT(payload as unknown as jose.JWTPayload)
    .setProtectedHeader({ alg: JWT_ALG })
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(secret);
}

async function verifyEmailToken(token: string): Promise<{ userId: number; email: string } | null> {
  try {
    const { env } = await import("./lib/env");
    const secret = new TextEncoder().encode(env.appSecret);
    const { payload } = await jose.jwtVerify(token, secret, { algorithms: [JWT_ALG], clockTolerance: 60 });
    if (!payload.userId || !payload.email) return null;
    return { userId: payload.userId as number, email: payload.email as string };
  } catch {
    return null;
  }
}

export const authRouter = createRouter({
  me: authedQuery.query((opts) => opts.ctx.user),

  logout: authedQuery.mutation(async ({ ctx }) => {
    const opts = getSessionCookieOptions(ctx.req.headers);
    ctx.resHeaders.append(
      "set-cookie",
      cookie.serialize(Session.cookieName, "", {
        httpOnly: opts.httpOnly,
        path: opts.path,
        sameSite: opts.sameSite?.toLowerCase() as "lax" | "none",
        secure: opts.secure,
        maxAge: 0,
      }),
    );
    ctx.resHeaders.append(
      "set-cookie",
      cookie.serialize("email_token", "", {
        httpOnly: true,
        path: "/",
        sameSite: opts.sameSite?.toLowerCase() as "lax" | "none",
        secure: opts.secure,
        maxAge: 0,
      }),
    );
    return { success: true };
  }),

  register: publicQuery
    .input(z.object({ email: z.string().email(), password: z.string().min(6), name: z.string().optional() }))
    .mutation(async ({ input, ctx }) => {
      const existing = await db.select().from(users).where(eq(users.email, input.email)).limit(1);
      if (existing.length > 0) {
        throw new Error("Email already registered");
      }
      const hashed = await bcryptjs.hash(input.password, 10);
      await db.insert(users).values({ email: input.email, password: hashed, name: input.name || input.email.split("@")[0] });
      const rows = await db.select().from(users).where(eq(users.email, input.email)).limit(1);
      const user = rows[0];
      const token = await signEmailToken({ userId: user.id, email: user.email });
      const opts = getSessionCookieOptions(ctx.req.headers);
      ctx.resHeaders.append(
        "set-cookie",
        cookie.serialize("email_token", token, {
          httpOnly: true,
          path: "/",
          sameSite: opts.sameSite?.toLowerCase() as "lax" | "none",
          secure: opts.secure,
          maxAge: 30 * 24 * 60 * 60,
        }),
      );
      return { id: user.id, email: user.email, name: user.name, role: user.role };
    }),

  login: publicQuery
    .input(z.object({ email: z.string().email(), password: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const rows = await db.select().from(users).where(eq(users.email, input.email)).limit(1);
      if (rows.length === 0) {
        throw new Error("Invalid email or password");
      }
      const user = rows[0];
      const valid = await bcryptjs.compare(input.password, user.password);
      if (!valid) {
        throw new Error("Invalid email or password");
      }
      const token = await signEmailToken({ userId: user.id, email: user.email });
      const opts = getSessionCookieOptions(ctx.req.headers);
      ctx.resHeaders.append(
        "set-cookie",
        cookie.serialize("email_token", token, {
          httpOnly: true,
          path: "/",
          sameSite: opts.sameSite?.toLowerCase() as "lax" | "none",
          secure: opts.secure,
          maxAge: 30 * 24 * 60 * 60,
        }),
      );
      return { id: user.id, email: user.email, name: user.name, role: user.role };
    }),
});

export { verifyEmailToken };
