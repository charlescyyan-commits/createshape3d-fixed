const WP_URL = import.meta.env.VITE_WP_URL || "https://createshape3d.com";

async function wpFetch(endpoint: string, options?: RequestInit) {
  const url = `${WP_URL}/wp-json${endpoint}`;
  const res = await fetch(url, { ...options, headers: { "Content-Type": "application/json", ...options?.headers } });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`WP API error ${res.status}: ${text}`);
  }
  return res.json();
}

// === WooCommerce Store API (public, no auth) ===

export async function getWooProducts(params?: { per_page?: number; category?: string; search?: string; page?: number; orderby?: string; order?: string }) {
  const qs = new URLSearchParams();
  if (params?.per_page) qs.set("per_page", String(params.per_page));
  if (params?.category) qs.set("category", params.category);
  if (params?.search) qs.set("search", params.search);
  if (params?.page) qs.set("page", String(params.page));
  if (params?.orderby) qs.set("orderby", params.orderby);
  if (params?.order) qs.set("order", params.order);
  return wpFetch(`/wc/store/products?${qs.toString()}`);
}

export async function getWooProductBySlug(slug: string) {
  // Step 1: get product ID from WordPress REST API by slug
  const wpProducts = await wpFetch(`/wp/v2/product?slug=${encodeURIComponent(slug)}&_fields=id,slug`);
  if (!Array.isArray(wpProducts) || wpProducts.length === 0) return null;
  const id = wpProducts[0].id;
  // Step 2: get full product data from Store API by ID
  return wpFetch(`/wc/store/products/${id}`);
}

export async function getWooProductCategories() {
  return wpFetch("/wc/store/products/categories?per_page=100");
}

// === WordPress Pages API ===

export async function getWPPages() {
  return wpFetch("/wp/v2/pages?per_page=100&_fields=id,title,slug,content,excerpt,status,acf");
}

export async function getWPPageBySlug(slug: string) {
  const pages = await wpFetch(`/wp/v2/pages?slug=${encodeURIComponent(slug)}&_fields=id,title,slug,content,excerpt,status,acf`);
  return Array.isArray(pages) && pages.length > 0 ? pages[0] : null;
}

// === WordPress Posts API (Blog) ===
// _embed includes featured media URLs directly
export async function getWPPosts(params?: { per_page?: number; category?: string; page?: number }) {
  const qs = new URLSearchParams();
  if (params?.per_page) qs.set("per_page", String(params.per_page));
  if (params?.category) qs.set("categories", params.category);
  if (params?.page) qs.set("page", String(params.page));
  qs.set("_embed", "wp:featuredmedia");
  return wpFetch(`/wp/v2/posts?${qs.toString()}`);
}

// === Price formatting ===
export function formatWooPrice(product: any): { price: string; regularPrice: string | null; salePrice: string | null; currencySymbol: string } {
  const prices = product?.prices || {};
  const minorUnit = prices.currency_minor_unit ?? 2;
  const divisor = Math.pow(10, minorUnit);

  const fmt = (val: string | number | undefined) => {
    if (!val) return "";
    const num = Number(val) / divisor;
    return num.toFixed(minorUnit);
  };

  return {
    price: fmt(prices.price),
    regularPrice: prices.regular_price && prices.regular_price !== prices.price ? fmt(prices.regular_price) : null,
    salePrice: prices.sale_price ? fmt(prices.sale_price) : null,
    currencySymbol: prices.currency_symbol || "$",
  };
}

// === Types ===
export interface WooProduct {
  id: number;
  name: string;
  slug: string;
  permalink: string;
  sku?: string;
  short_description?: string;
  description?: string;
  prices?: {
    price?: string;
    regular_price?: string;
    sale_price?: string;
    currency_code?: string;
    currency_symbol?: string;
    currency_minor_unit?: number;
    price_html?: string;
  };
  images?: Array<{ id: number; src: string; alt: string }>;
  categories?: Array<{ id: number; name: string; slug: string }>;
  stock_status?: string;
  attributes?: Array<{ id: number; name: string; options: string[] }>;
  variations?: number[];
}

export interface WPCategory {
  id: number;
  name: string;
  slug: string;
  parent?: number;
  image?: { src: string };
}
