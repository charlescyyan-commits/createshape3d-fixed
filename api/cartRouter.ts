import { z } from "zod";
import { createRouter, publicQuery } from "./middleware";

// Cart is handled client-side via localStorage
// This router provides a placeholder API for future server-side cart
export const cartRouter = createRouter({
  get: publicQuery.input(z.string()).query(() => []),
  add: publicQuery.input(z.any()).mutation(() => ({ success: true })),
  remove: publicQuery.input(z.number()).mutation(() => ({ success: true })),
  clear: publicQuery.input(z.string()).mutation(() => ({ success: true })),
});
