import { z } from "zod";
import { createRouter, publicQuery } from "./middleware";
import { db } from "./queries/connection";
import { inquiries } from "@db/schema";
import { eq, desc } from "drizzle-orm";

export const inquiryRouter = createRouter({
  list: publicQuery
    .input(z.object({ type: z.string().optional(), isRead: z.boolean().optional() }).optional())
    .query(async ({ input }) => {
      const where = [];
      if (input?.type) where.push(eq(inquiries.type, input.type));
      if (input?.isRead !== undefined) where.push(eq(inquiries.isRead, input.isRead));
      return db.query.inquiries.findMany({
        where: where.length > 0 ? eq(inquiries.id, inquiries.id) : undefined,
        orderBy: [desc(inquiries.createdAt)],
      });
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
      return db.query.inquiries.findFirst({ where: eq(inquiries.id, id) });
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
