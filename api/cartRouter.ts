import { z } from "zod";
import { createRouter, publicQuery } from "./middleware";
import { db } from "./queries/connection";
import { cartItems, products, productVariants } from "@db/schema";
import { eq } from "drizzle-orm";

export const cartRouter = createRouter({
  get: publicQuery
    .input(z.string())
    .query(async ({ input }) => {
      const items = await db.query.cartItems.findMany({
        where: eq(cartItems.sessionId, input),
      });
      const enriched = await Promise.all(
        items.map(async (item) => {
          const product = await db.query.products.findFirst({
            where: eq(products.id, item.productId),
            with: { images: true },
          });
          const variant = item.variantId
            ? await db.query.productVariants.findFirst({ where: eq(productVariants.id, item.variantId) })
            : null;
          return { ...item, product, variant };
        })
      );
      return enriched;
    }),

  add: publicQuery
    .input(z.object({
      sessionId: z.string(),
      productId: z.number(),
      variantId: z.number().optional(),
      quantity: z.number().default(1),
    }))
    .mutation(async ({ input }) => {
      const existing = await db.query.cartItems.findFirst({
        where: eq(cartItems.sessionId, input.sessionId),
      });
      if (existing && existing.productId === input.productId && existing.variantId === input.variantId) {
        await db.update(cartItems).set({ quantity: existing.quantity + input.quantity }).where(eq(cartItems.id, existing.id));
      } else {
        await db.insert(cartItems).values(input);
      }
      return { success: true };
    }),

  updateQuantity: publicQuery
    .input(z.object({ id: z.number(), quantity: z.number() }))
    .mutation(async ({ input }) => {
      await db.update(cartItems).set({ quantity: input.quantity }).where(eq(cartItems.id, input.id));
      return { success: true };
    }),

  remove: publicQuery
    .input(z.number())
    .mutation(async ({ input }) => {
      await db.delete(cartItems).where(eq(cartItems.id, input));
      return { success: true };
    }),

  clear: publicQuery
    .input(z.string())
    .mutation(async ({ input }) => {
      await db.delete(cartItems).where(eq(cartItems.sessionId, input));
      return { success: true };
    }),
});
