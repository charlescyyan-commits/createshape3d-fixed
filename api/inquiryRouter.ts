import { z } from "zod";
import { createRouter, publicQuery } from "./middleware";

// Store inquiries in memory (will reset on restart, but acceptable for demo)
const inquiriesStore: any[] = [];

export const inquiryRouter = createRouter({
  list: publicQuery
    .input(z.object({ type: z.string().optional(), isRead: z.boolean().optional() }).optional())
    .query(async ({ input }) => {
      let all = [...inquiriesStore].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
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
      const item = { id: Date.now(), ...input, isRead: false, createdAt: new Date().toISOString() };
      inquiriesStore.push(item);
      return item;
    }),

  markRead: publicQuery
    .input(z.number())
    .mutation(async ({ input }) => {
      const item = inquiriesStore.find(i => i.id === input);
      if (item) item.isRead = true;
      return { success: true };
    }),

  delete: publicQuery
    .input(z.number())
    .mutation(async ({ input }) => {
      const idx = inquiriesStore.findIndex(i => i.id === input);
      if (idx >= 0) inquiriesStore.splice(idx, 1);
      return { success: true };
    }),
});
