import { z } from "zod";
import { createRouter, publicQuery, adminQuery } from "./middleware";
import { db } from "./queries/connection";
import { siteSettings } from "@db/schema";
import { eq, asc } from "drizzle-orm";

export const settingRouter = createRouter({
  list: publicQuery.query(async () => {
    return db.select().from(siteSettings).orderBy(asc(siteSettings.key));
  }),

  byKey: publicQuery
    .input(z.string())
    .query(async ({ input }) => {
      const rows = await db.select().from(siteSettings).where(eq(siteSettings.key, input)).limit(1);
      return rows[0] || null;
    }),

  set: adminQuery
    .input(z.object({ key: z.string(), value: z.string().optional(), label: z.string().optional(), groupName: z.string().optional() }))
    .mutation(async ({ input }) => {
      const rows = await db.select().from(siteSettings).where(eq(siteSettings.key, input.key)).limit(1);
      if (rows.length > 0) {
        await db.update(siteSettings).set({ value: input.value, label: input.label, groupName: input.groupName }).where(eq(siteSettings.key, input.key));
      } else {
        await db.insert(siteSettings).values(input);
      }
      return { success: true };
    }),

  delete: adminQuery
    .input(z.number())
    .mutation(async ({ input }) => {
      await db.delete(siteSettings).where(eq(siteSettings.id, input));
      return { success: true };
    }),
});
