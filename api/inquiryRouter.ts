import { z } from "zod";
import { createRouter, publicQuery } from "./middleware";
import { db } from "./queries/connection";
import { inquiries } from "@db/schema";
import { eq, desc } from "drizzle-orm";

export const inquiryRouter = createRouter({
  list: publicQuery
    .input(z.object({ type: z.string().optional(), isRead: z.boolean().optional() }).optional())
    .query(async ({ input }) => {
      let all = await db.select().from(inquiries).orderBy(desc(inquiries.createdAt));
      if (input?.type) all = all.filter(i => i.type === input.type);
      if (input?.isRead !== undefined) all = all.filter(i => !!i.isRead === input.isRead);
      return all;
    }),

  create: publicQuery
    .input(z.object({
      type: z.string(), name: z.string(), email: z.string(),
      company: z.string().optional(), phone: z.string().optional(),
      orderType: z.string().optional(), message: z.string().optional(),
      productIds: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      const [{ id }] = await db.insert(inquiries).values(input).$returningId();
      const rows = await db.select().from(inquiries).where(eq(inquiries.id, id)).limit(1);
      return rows[0];
    }),

  markRead: publicQuery
    .input(z.number())
    .mutation(async ({ input }) => {
      await db.update(inquiries).set({ isRead: true }).where(eq(inquiries.id, input));
      return { success: true };
    }),

  delete: publicQuery
    .input(z.number())
    .mutation(async ({ input }) => {
      await db.delete(inquiries).where(eq(inquiries.id, input));
      return { success: true };
    }),
});
