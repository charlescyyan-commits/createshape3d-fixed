import { createRouter, publicQuery } from "./middleware";
import { productRouter, categoryRouter } from "./productRouter";
import { inquiryRouter } from "./inquiryRouter";
import { settingRouter } from "./settingRouter";
import { cartRouter } from "./cartRouter";
import { authRouter } from "./auth-router";

export const appRouter = createRouter({
  ping: publicQuery.query(() => ({ ok: true, ts: Date.now() })),
  product: productRouter,
  category: categoryRouter,
  inquiry: inquiryRouter,
  setting: settingRouter,
  cart: cartRouter,
  auth: authRouter,
});

export type AppRouter = typeof appRouter;
