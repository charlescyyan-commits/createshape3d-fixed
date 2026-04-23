import { z } from "zod";
import { createRouter, publicQuery } from "./middleware";
import { db } from "./queries/connection";
import { siteSettings } from "@db/schema";
import { eq } from "drizzle-orm";

export const settingRouter = createRouter({
  list: publicQuery.query(async () => {
    return db.query.siteSettings.findMany();
  }),

  byKey: publicQuery
    .input(z.string())
    .query(async ({ input }) => {
      return db.query.siteSettings.findFirst({ where: eq(siteSettings.key, input) });
    }),

  set: publicQuery
    .input(z.object({ key: z.string(), value: z.string().optional(), label: z.string().optional(), groupName: z.string().optional() }))
    .mutation(async ({ input }) => {
      const existing = await db.query.siteSettings.findFirst({ where: eq(siteSettings.key, input.key) });
      if (existing) {
        await db.update(siteSettings).set({ value: input.value, label: input.label, groupName: input.groupName }).where(eq(siteSettings.key, input.key));
      } else {
        await db.insert(siteSettings).values(input);
      }
      return { success: true };
    }),

  delete: publicQuery
    .input(z.number())
    .mutation(async ({ input }) => {
      await db.delete(siteSettings).where(eq(siteSettings.id, input));
      return { success: true };
    }),
});
