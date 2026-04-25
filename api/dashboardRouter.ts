import { z } from "zod";
import { createRouter, adminQuery } from "./middleware";
import { db } from "./queries/connection";
import { products, categories, inquiries, bannerSlides, pages } from "@db/schema";
import { eq, desc, and } from "drizzle-orm";

export const dashboardRouter = createRouter({
  stats: adminQuery.query(async () => {
    const allProducts = await db.select().from(products);
    const activeProducts = allProducts.filter(p => p.isActive !== false);
    const inactiveProducts = allProducts.filter(p => p.isActive === false);

    const allCategories = await db.select().from(categories);
    const allInquiries = await db.select().from(inquiries);
    const unreadInquiries = allInquiries.filter(i => !i.isRead);

    const allBanners = await db.select().from(bannerSlides);
    const activeBanners = allBanners.filter(b => b.isActive !== false);

    const allPages = await db.select().from(pages);
    const activePages = allPages.filter(p => p.isActive !== false);

    return {
      products: {
        total: allProducts.length,
        active: activeProducts.length,
        inactive: inactiveProducts.length,
      },
      categories: {
        total: allCategories.length,
      },
      inquiries: {
        total: allInquiries.length,
        unread: unreadInquiries.length,
      },
      banners: {
        total: allBanners.length,
        active: activeBanners.length,
      },
      pages: {
        total: allPages.length,
        active: activePages.length,
      },
    };
  }),

  recentInquiries: adminQuery.query(async () => {
    const rows = await db.select().from(inquiries).orderBy(desc(inquiries.createdAt)).limit(5);
    return rows;
  }),

  recentProducts: adminQuery.query(async () => {
    const rows = await db.select().from(products).orderBy(desc(products.createdAt)).limit(5);
    return rows;
  }),
});
