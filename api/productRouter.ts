import { z } from "zod";
import { createRouter, publicQuery } from "./middleware";
import { db } from "./queries/connection";
import { products, productImages, productVariants, variantAttributeOptions, categories } from "@db/schema";
import { eq, and, asc, like } from "drizzle-orm";

export const productRouter = createRouter({
  list: publicQuery
    .input(z.object({
      categoryId: z.number().optional(),
      categorySlug: z.string().optional(),
      search: z.string().optional(),
    }).optional())
    .query(async ({ input }) => {
      const where = [];
      if (input?.categoryId) where.push(eq(products.categoryId, input.categoryId));
      if (input?.categorySlug) {
        const cat = await db.query.categories.findFirst({
          where: eq(categories.slug, input.categorySlug),
        });
        if (cat) where.push(eq(products.categoryId, cat.id));
      }
      if (input?.search) where.push(like(products.name, `%${input.search}%`));
      
      return db.query.products.findMany({
        where: where.length > 0 ? and(...where) : undefined,
        orderBy: [asc(products.sortOrder)],
        with: {
          images: true,
          category: true,
        },
      });
    }),

  bySlug: publicQuery
    .input(z.string())
    .query(async ({ input }) => {
      const product = await db.query.products.findFirst({
        where: eq(products.slug, input),
        with: {
          images: true,
          category: true,
        },
      });
      if (!product) return null;
      
      const variants = await db.query.productVariants.findMany({
        where: eq(productVariants.productId, product.id),
      });
      
      const attrOpts = await db.query.variantAttributeOptions.findMany({
        where: eq(variantAttributeOptions.productId, product.id),
      });
      
      return { ...product, variants, attributeOptions: attrOpts };
    }),

  getVariant: publicQuery
    .input(z.object({ productId: z.number(), sizeOptionId: z.number().optional(), colorOptionId: z.number().optional() }))
    .query(async ({ input }) => {
      const conditions = [eq(productVariants.productId, input.productId)];
      if (input.sizeOptionId) conditions.push(eq(productVariants.sizeOptionId, input.sizeOptionId));
      if (input.colorOptionId) conditions.push(eq(productVariants.colorOptionId, input.colorOptionId));
      
      return db.query.productVariants.findFirst({
        where: and(...conditions),
      });
    }),

  create: publicQuery
    .input(z.object({
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
      sortOrder: z.number().optional(), isActive: z.boolean().optional(),
    }))
    .mutation(async ({ input }) => {
      const [{ id }] = await db.insert(products).values(input).$returningId();
      return db.query.products.findFirst({ where: eq(products.id, id) });
    }),

  update: publicQuery
    .input(z.object({ id: z.number(), data: z.any() }))
    .mutation(async ({ input }) => {
      await db.update(products).set(input.data).where(eq(products.id, input.id));
      return db.query.products.findFirst({ where: eq(products.id, input.id) });
    }),

  delete: publicQuery
    .input(z.number())
    .mutation(async ({ input }) => {
      await db.delete(productVariants).where(eq(productVariants.productId, input));
      await db.delete(variantAttributeOptions).where(eq(variantAttributeOptions.productId, input));
      await db.delete(productImages).where(eq(productImages.productId, input));
      await db.delete(products).where(eq(products.id, input));
      return { success: true };
    }),
});

export const categoryRouter = createRouter({
  list: publicQuery.query(async () => {
    return db.query.categories.findMany({
      orderBy: [asc(categories.sortOrder)],
    });
  }),

  create: publicQuery
    .input(z.object({ name: z.string(), slug: z.string(), description: z.string().optional(), image: z.string().optional(), sortOrder: z.number().optional() }))
    .mutation(async ({ input }) => {
      const [{ id }] = await db.insert(categories).values(input).$returningId();
      return db.query.categories.findFirst({ where: eq(categories.id, id) });
    }),

  update: publicQuery
    .input(z.object({ id: z.number(), data: z.any() }))
    .mutation(async ({ input }) => {
      await db.update(categories).set(input.data).where(eq(categories.id, input.id));
      return db.query.categories.findFirst({ where: eq(categories.id, input.id) });
    }),

  delete: publicQuery
    .input(z.number())
    .mutation(async ({ input }) => {
      await db.delete(categories).where(eq(categories.id, input));
      return { success: true };
    }),
});
