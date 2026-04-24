import { createRouter, publicQuery } from "./middleware";
import { productRouter, categoryRouter, bannerRouter } from "./productRouter";
import { inquiryRouter } from "./inquiryRouter";
import { settingRouter } from "./settingRouter";
import { cartRouter } from "./cartRouter";
import { authRouter } from "./auth-router";
import { pageRouter } from "./pageRouter";

export const appRouter = createRouter({
  ping: publicQuery.query(() => ({ ok: true, ts: Date.now() })),
  product: productRouter,
  category: categoryRouter,
  banner: bannerRouter,
  inquiry: inquiryRouter,
  setting: settingRouter,
  cart: cartRouter,
  auth: authRouter,
  page: pageRouter,
});
