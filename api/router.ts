import { createRouter, publicQuery } from "./middleware";
import { authRouter } from "./auth-router";
import { inquiryRouter } from "./inquiryRouter";
import { uploadRouter } from "./uploadRouter";
import { pingRouter } from "./pingRouter";

export const appRouter = createRouter({
  ping: pingRouter,
  auth: authRouter,
  inquiry: inquiryRouter,
  upload: uploadRouter,
});
