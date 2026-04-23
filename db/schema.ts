import {
  mysqlTable,
  serial,
  varchar,
  text,
  int,
  boolean,
  timestamp,
  decimal,
} from "drizzle-orm/mysql-core";

export const categories = mysqlTable("categories", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  description: text("description"),
  image: varchar("image", { length: 500 }),
  sortOrder: int("sort_order").default(0),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const products = mysqlTable("products", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  subtitle: varchar("subtitle", { length: 500 }),
  description: text("description"),
  shortDesc: text("short_desc"),
  tagline: varchar("tagline", { length: 255 }),
  categoryId: int("category_id"),
  badge: varchar("badge", { length: 100 }),
  brand: varchar("brand", { length: 255 }).default("CreateShape3D"),
  sku: varchar("sku", { length: 100 }),
  basePrice: decimal("base_price", { precision: 10, scale: 2 }),
  compareAtPrice: decimal("compare_at_price", { precision: 10, scale: 2 }),
  currency: varchar("currency", { length: 10 }).default("USD"),
  mainImage: varchar("main_image", { length: 500 }),
  highlightsJson: text("highlights_json"), // [{icon, text}, ...]
  featuresJson: text("features_json"), // [{icon, title, desc}, ...]
  statsJson: text("stats_json"), // [{value, label}, ...]
  specsJson: text("specs_json"), // [{title, rows: [[k,v],...]}, ...]
  applicationsJson: text("applications_json"), // [{title, desc, gradient}, ...]
  faqsJson: text("faqs_json"), // [{q, a}, ...]
  compatTagsJson: text("compat_tags_json"), // [string, ...]
  oemTitle: varchar("oem_title", { length: 255 }),
  oemDesc: text("oem_desc"),
  oemPerksJson: text("oem_perks_json"), // [string, ...]
  ctaTitle: varchar("cta_title", { length: 255 }),
  ctaDesc: text("cta_desc"),
  ctaBtn: varchar("cta_btn", { length: 255 }),
  sortOrder: int("sort_order").default(0),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const productImages = mysqlTable("product_images", {
  id: serial("id").primaryKey(),
  productId: int("product_id").notNull(),
  url: varchar("url", { length: 500 }).notNull(),
  alt: varchar("alt", { length: 255 }),
  isPrimary: boolean("is_primary").default(false),
  sortOrder: int("sort_order").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const variantAttributeOptions = mysqlTable("variant_attribute_options", {
  id: serial("id").primaryKey(),
  productId: int("product_id").notNull(),
  attributeType: varchar("attribute_type", { length: 50 }).notNull(), // 'size' | 'color'
  value: varchar("value", { length: 255 }).notNull(),
  displayName: varchar("display_name", { length: 255 }),
  hexCode: varchar("hex_code", { length: 50 }), // for colors
  sortOrder: int("sort_order").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const productVariants = mysqlTable("product_variants", {
  id: serial("id").primaryKey(),
  productId: int("product_id").notNull(),
  sku: varchar("sku", { length: 100 }),
  sizeOptionId: int("size_option_id"),
  colorOptionId: int("color_option_id"),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  compareAtPrice: decimal("compare_at_price", { precision: 10, scale: 2 }),
  weight: varchar("weight", { length: 50 }),
  stockQuantity: int("stock_quantity").default(0),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const inquiries = mysqlTable("inquiries", {
  id: serial("id").primaryKey(),
  type: varchar("type", { length: 50 }).notNull(), // 'oem' | 'contact' | 'bulk'
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  company: varchar("company", { length: 255 }),
  phone: varchar("phone", { length: 50 }),
  orderType: varchar("order_type", { length: 50 }),
  message: text("message"),
  productIds: text("product_ids"),
  isRead: boolean("is_read").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const siteSettings = mysqlTable("site_settings", {
  id: serial("id").primaryKey(),
  key: varchar("key", { length: 255 }).notNull().unique(),
  value: text("value"),
  label: varchar("label", { length: 255 }),
  groupName: varchar("group_name", { length: 100 }).default("general"),
});

export const cartItems = mysqlTable("cart_items", {
  id: serial("id").primaryKey(),
  sessionId: varchar("session_id", { length: 255 }).notNull(),
  productId: int("product_id").notNull(),
  variantId: int("variant_id"),
  quantity: int("quantity").default(1).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Category = typeof categories.$inferSelect;
export type Product = typeof products.$inferSelect;
export type ProductImage = typeof productImages.$inferSelect;
export type ProductVariant = typeof productVariants.$inferSelect;
export type VariantAttributeOption = typeof variantAttributeOptions.$inferSelect;
export type Inquiry = typeof inquiries.$inferSelect;
export type SiteSetting = typeof siteSettings.$inferSelect;
export type CartItem = typeof cartItems.$inferSelect;
