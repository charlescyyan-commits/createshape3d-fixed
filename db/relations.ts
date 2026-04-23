import { relations } from "drizzle-orm";
import { products, productImages, productVariants, variantAttributeOptions, categories, bannerSlides } from "./schema";

export const categoriesRelations = relations(categories, ({ one, many }) => ({
  parent: one(categories, { fields: [categories.parentId], references: [categories.id] }),
  children: many(categories),
  products: many(products),
}));

export const productsRelations = relations(products, ({ one, many }) => ({
  category: one(categories, { fields: [products.categoryId], references: [categories.id] }),
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

export const bannerSlidesRelations = relations(bannerSlides, ({}) => ({}));
