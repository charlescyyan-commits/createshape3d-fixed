import { z } from "zod";
import { createRouter, publicQuery, adminQuery } from "./middleware";
import { db } from "./queries/connection";
import { pages } from "@db/schema";
import { eq, asc } from "drizzle-orm";

export const pageRouter = createRouter({
  list: publicQuery.query(async () => {
    const all = await db.select().from(pages).orderBy(asc(pages.sortOrder));
    return all.filter(p => p.isActive !== false);
  }),

  bySlug: publicQuery
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      const all = await db.select().from(pages);
      return all.find(p => p.slug === input.slug && p.isActive !== false) ?? null;
    }),

  adminList: adminQuery.query(async () => {
    return db.select().from(pages).orderBy(asc(pages.sortOrder));
  }),

  create: adminQuery
    .input(z.object({
      title: z.string().min(1),
      slug: z.string().min(1),
      content: z.string().optional(),
      metaDescription: z.string().optional(),
      isActive: z.boolean().default(true),
      sortOrder: z.number().default(0),
    }))
    .mutation(async ({ input }) => {
      await db.insert(pages).values({
        title: input.title,
        slug: input.slug,
        content: input.content ?? '',
        metaDescription: input.metaDescription ?? '',
        isActive: input.isActive,
        sortOrder: input.sortOrder,
      });
      return { success: true };
    }),

  update: adminQuery
    .input(z.object({
      id: z.number(),
      title: z.string().min(1),
      slug: z.string().min(1),
      content: z.string().optional(),
      metaDescription: z.string().optional(),
      isActive: z.boolean(),
      sortOrder: z.number(),
    }))
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      await db.update(pages).set(data).where(eq(pages.id, id));
      return { success: true };
    }),

  delete: adminQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      await db.delete(pages).where(eq(pages.id, input.id));
      return { success: true };
    }),
});
