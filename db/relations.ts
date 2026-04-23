import { relations } from "drizzle-orm";
import { products, productImages, productVariants, variantAttributeOptions } from "./schema";

// NOTE: Self-referencing relations on categories removed due to Drizzle ORM 
// "multiple relations" error with TiDB. Categories fetched via simple queries instead.

export const productsRelations = relations(products, ({ many }) => ({
  images: many(productImages),
  variants: many(productVariants),
  attributeOptions: many(variantAttributeOptions),
}));

export const productImagesRelations = relations(productImages, ({ one }) => ({
  product: one(products, { fields: [productImages.productId], references: [products.id] }),
}));

export const variantOptionsRelations = relations(variantAttributeOptions, ({ one }) => ({
  product: one(products, { fields: [variantAttributeOptions.productId], references: [products.id] }),
}));

export const productVariantsRelations = relations(productVariants, ({ one }) => ({
  product: one(products, { fields: [productVariants.productId], references: [products.id] }),
}));
