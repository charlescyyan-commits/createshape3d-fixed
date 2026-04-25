import { z } from "zod";
import { createRouter, publicQuery } from "./middleware";

export const pingRouter = createRouter({
  ping: publicQuery.query(() => ({ ok: true, ts: Date.now() })),
});
