import type { TrpcContext } from "./context";
import { verifySessionToken } from "./kimi/session";
import { findUserByUnionId } from "./queries/users";
import * as cookie from "cookie";
import { Session } from "@contracts/constants";

export const createContext = async (opts: { req: Request; resHeaders: Headers }): Promise<TrpcContext> => {
  try {
    const cookies = cookie.parse(opts.req.headers.get("cookie") || "");
    const token = cookies[Session.cookieName];
    if (token) {
      const claim = await verifySessionToken(token);
      if (claim) {
        const user = await findUserByUnionId(claim.unionId);
        if (user) {
          return { req: opts.req, resHeaders: opts.resHeaders, user };
        }
      }
    }
  } catch (e) {
    // Silently ignore auth errors for public routes
  }
  return { req: opts.req, resHeaders: opts.resHeaders };
};
