import { z } from "zod";
import { createRouter, publicQuery, adminQuery } from "./middleware";
import { db } from "./queries/connection";
import { products, productImages, productVariants, variantAttributeOptions, categories, bannerSlides } from "@db/schema";
import { eq, asc, desc } from "drizzle-orm";

export const productRouter = createRouter({
  list: publicQuery
    .input(z.object({
      categoryId: z.number().optional(),
      categorySlug: z.string().optional(),
      search: z.string().optional(),
      featured: z.boolean().optional(),
    }).optional())
    .query(async ({ input }) => {
      let categoryId = input?.categoryId;
      if (input?.categorySlug) {
        const catRows = await db.select().from(categories).where(eq(categories.slug, input.categorySlug)).limit(1);
        if (catRows.length > 0) categoryId = catRows[0].id;
      }

      const allProducts = await db.select().from(products).orderBy(asc(products.sortOrder));
      let filtered = allProducts.filter(p => p.isActive !== false);

      if (categoryId) filtered = filtered.filter(p => p.categoryId === categoryId);
      if (input?.search) filtered = filtered.filter(p => p.name.toLowerCase().includes((input.search || '').toLowerCase()));
      if (input?.featured) filtered = filtered.filter(p => p.isFeatured);

      const result = await Promise.all(filtered.map(async (p) => {
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

  create: adminQuery.input(z.object({
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
    isActive: z.boolean().optional(), images: z.array(z.string()).optional(),
  })).mutation(async ({ input }) => {
    const { images, ...productData } = input;
    await db.insert(products).values(productData);
    const rows = await db.select().from(products).where(eq(products.slug, productData.slug)).limit(1);
    const product = rows[0];
    
    if (images && images.length > 0 && product) {
      await db.insert(productImages).values(
        images.map((url, idx) => ({
          productId: product.id,
          url,
          alt: product.name,
          isPrimary: idx === 0,
          sortOrder: idx,
        }))
      );
    }
    
    return product;
  }),

  update: adminQuery.input(z.object({ id: z.number(), data: z.any() })).mutation(async ({ input }) => {
    const { images, ...productData } = input.data || {};
    await db.update(products).set(productData).where(eq(products.id, input.id));
    
    if (images && Array.isArray(images)) {
      await db.delete(productImages).where(eq(productImages.productId, input.id));
      if (images.length > 0) {
        const rows = await db.select().from(products).where(eq(products.id, input.id)).limit(1);
        const product = rows[0];
        if (product) {
          await db.insert(productImages).values(
            images.map((url: string, idx: number) => ({
              productId: input.id,
              url,
              alt: product.name,
              isPrimary: idx === 0,
              sortOrder: idx,
            }))
          );
        }
      }
    }
    
    const rows = await db.select().from(products).where(eq(products.id, input.id)).limit(1);
    return rows[0];
  }),

  delete: adminQuery.input(z.number()).mutation(async ({ input }) => {
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
    const root = allCats.filter(c => c.isActive !== false && !c.parentId);
    const children = allCats.filter(c => c.isActive !== false && c.parentId);
    return root.map(r => ({ ...r, children: children.filter(c => c.parentId === r.id) }));
  }),

  create: adminQuery.input(z.object({ name: z.string(), slug: z.string(), description: z.string().optional(), image: z.string().optional(), parentId: z.number().optional(), sortOrder: z.number().optional() })).mutation(async ({ input }) => {
    await db.insert(categories).values(input);
    const rows = await db.select().from(categories).where(eq(categories.slug, input.slug)).limit(1);
    return rows[0];
  }),

  update: adminQuery.input(z.object({ id: z.number(), data: z.any() })).mutation(async ({ input }) => {
    await db.update(categories).set(input.data).where(eq(categories.id, input.id));
    const rows = await db.select().from(categories).where(eq(categories.id, input.id)).limit(1);
    return rows[0];
  }),

  delete: adminQuery.input(z.number()).mutation(async ({ input }) => {
    await db.delete(categories).where(eq(categories.id, input));
    return { success: true };
  }),
});

export const bannerRouter = createRouter({
  list: publicQuery.query(async () => {
    const rows = await db.select().from(bannerSlides).orderBy(asc(bannerSlides.sortOrder));
    return rows.filter(r => r.isActive !== false).slice(0, 3);
  }),
});
