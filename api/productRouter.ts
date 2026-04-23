import { z } from "zod";
import { createRouter, publicQuery } from "./middleware";
import { db } from "./queries/connection";
import { products, productImages, productVariants, variantAttributeOptions, categories, bannerSlides } from "@db/schema";
import { eq, and, asc, like, sql } from "drizzle-orm";

const isFeaturedProducts = () => sql`${products.isFeatured} = 1`;
const isActiveBanners = () => sql`${bannerSlides.isActive} = 1`;

export const productRouter = createRouter({
  list: publicQuery
    .input(z.object({
      categoryId: z.number().optional(),
      categorySlug: z.string().optional(),
      search: z.string().optional(),
      featured: z.boolean().optional(),
    }).optional())
    .query(async ({ input }) => {
      const conditions: any[] = [];
      let categoryId = input?.categoryId;

      if (input?.categorySlug) {
        const catRows = await db.select().from(categories).where(eq(categories.slug, input.categorySlug)).limit(1);
        if (catRows.length > 0) categoryId = catRows[0].id;
      }
      if (categoryId) conditions.push(eq(products.categoryId, categoryId));
      if (input?.search) conditions.push(like(products.name, `%${input.search}%`));
      if (input?.featured) conditions.push(isFeaturedProducts());

      const where = conditions.length > 0 ? and(...conditions) : undefined;
      const productRows = await db.select().from(products).where(where).orderBy(asc(products.sortOrder));

      const result = await Promise.all(productRows.map(async (p) => {
        const imgs = await db.select().from(productImages).where(eq(productImages.productId, p.id)).orderBy(asc(productImages.sortOrder));
        let cat = null;
        if (p.categoryId) {
          const cats = await db.select().from(categories).where(eq(categories.id, p.categoryId)).limit(1);
          cat = cats[0] || null;
        }
        return { ...p, images: imgs, category: cat };
      }));

      return result;
    }),

  bySlug: publicQuery.input(z.string()).query(async ({ input }) => {
    const prodRows = await db.select().from(products).where(eq(products.slug, input)).limit(1);
    if (prodRows.length === 0) return null;
    const product = prodRows[0];

    const imgs = await db.select().from(productImages).where(eq(productImages.productId, product.id)).orderBy(asc(productImages.sortOrder));
    const variants = await db.select().from(productVariants).where(eq(productVariants.productId, product.id));
    const attrOpts = await db.select().from(variantAttributeOptions).where(eq(variantAttributeOptions.productId, product.id));
    let cat = null;
    if (product.categoryId) {
      const cats = await db.select().from(categories).where(eq(categories.id, product.categoryId)).limit(1);
      cat = cats[0] || null;
    }

    return { ...product, images: imgs, variants, attributeOptions: attrOpts, category: cat };
  }),

  create: publicQuery.input(z.object({
    name: z.string(), slug: z.string(), subtitle: z.string().optional(),
    description: z.string().optional(), shortDesc: z.string().optional(),
    tagline: z.string().optional(), categoryId: z.number().optional(),
    badge: z.string().optional(), brand: z.string().optional(),
    sku: z.string().optional(), basePrice: z.string().optional(),
    compareAtPrice: z.string().optional(), currency: z.string().optional(),
    mainImage: z.string().optional(), highlightsJson: z.string().optional(),
    featuresJson: z.string().optional(), statsJson: z.string().optional(),
    specsJson: z.string().optional(), applicationsJson: z.string().optional(),
    faqsJson: z.string().optional(), compatTagsJson: z.string().optional(),
    oemTitle: z.string().optional(), oemDesc: z.string().optional(),
    oemPerksJson: z.string().optional(), ctaTitle: z.string().optional(),
    ctaDesc: z.string().optional(), ctaBtn: z.string().optional(),
    sortOrder: z.number().optional(), isFeatured: z.boolean().optional(),
    isActive: z.boolean().optional(),
  })).mutation(async ({ input }) => {
    const [{ id }] = await db.insert(products).values(input).$returningId();
    const rows = await db.select().from(products).where(eq(products.id, id)).limit(1);
    return rows[0];
  }),

  update: publicQuery.input(z.object({ id: z.number(), data: z.any() })).mutation(async ({ input }) => {
    await db.update(products).set(input.data).where(eq(products.id, input.id));
    const rows = await db.select().from(products).where(eq(products.id, input.id)).limit(1);
    return rows[0];
  }),

  delete: publicQuery.input(z.number()).mutation(async ({ input }) => {
    await db.delete(productVariants).where(eq(productVariants.productId, input));
    await db.delete(variantAttributeOptions).where(eq(variantAttributeOptions.productId, input));
    await db.delete(productImages).where(eq(productImages.productId, input));
    await db.delete(products).where(eq(products.id, input));
    return { success: true };
  }),
});

export const categoryRouter = createRouter({
  list: publicQuery.query(async () => {
    const allCats = await db.select().from(categories).orderBy(asc(categories.sortOrder));
    const root = allCats.filter(c => !c.parentId);
    const child = allCats.filter(c => c.parentId);
    return root.map(r => ({ ...r, children: child.filter(c => c.parentId === r.id) }));
  }),

  create: publicQuery.input(z.object({ name: z.string(), slug: z.string(), description: z.string().optional(), image: z.string().optional(), parentId: z.number().optional(), sortOrder: z.number().optional() })).mutation(async ({ input }) => {
    const [{ id }] = await db.insert(categories).values(input).$returningId();
    const rows = await db.select().from(categories).where(eq(categories.id, id)).limit(1);
    return rows[0];
  }),

  update: publicQuery.input(z.object({ id: z.number(), data: z.any() })).mutation(async ({ input }) => {
    await db.update(categories).set(input.data).where(eq(categories.id, input.id));
    const rows = await db.select().from(categories).where(eq(categories.id, input.id)).limit(1);
    return rows[0];
  }),

  delete: publicQuery.input(z.number()).mutation(async ({ input }) => {
    await db.delete(categories).where(eq(categories.id, input));
    return { success: true };
  }),
});

export const bannerRouter = createRouter({
  list: publicQuery.query(async () => {
    const rows = await db.select().from(bannerSlides)
      .where(isActiveBanners())
      .orderBy(asc(bannerSlides.sortOrder));
    return rows.slice(0, 3);
  }),
});
