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

function stripHtml(input: string) {
  return input.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}

// WooCommerce Store API (public, no auth needed)
export async function getWooProducts(params?: { per_page?: number; category?: string; search?: string; page?: number }) {
  const qs = new URLSearchParams();
  if (params?.per_page) qs.set("per_page", String(params.per_page));
  if (params?.category) qs.set("category", params.category);
  if (params?.search) qs.set("search", params.search);
  if (params?.page) qs.set("page", String(params.page));
  return wpFetch(`/wc/store/products?${qs.toString()}`);
}

export async function getWooProductBySlug(slug: string) {
  const qs = new URLSearchParams();
  qs.set("slug", slug);
  qs.set("_fields", "id,slug");
  const rows = await wpFetch(`/wp/v2/product?${qs.toString()}`);
  if (!Array.isArray(rows) || rows.length === 0) return null;
  const id = rows[0]?.id;
  if (!id) return null;
  return wpFetch(`/wc/store/products/${id}`);
}

export function formatWooPrice(product: { price_html?: string; prices?: { price?: string; regular_price?: string; currency_code?: string; currency_minor_unit?: number } } | null | undefined) {
  const priceHtml = product?.price_html;
  if (typeof priceHtml === "string" && priceHtml.trim()) {
    return { html: priceHtml, text: stripHtml(priceHtml) };
  }

  const prices = product?.prices;
  const raw = prices?.price ?? prices?.regular_price;
  if (!raw) return { html: undefined, text: "" };

  const minor = typeof prices?.currency_minor_unit === "number" ? prices.currency_minor_unit : 2;
  const amount = Number(raw) / Math.pow(10, minor);
  const currency = prices?.currency_code || "USD";
  const text = new Intl.NumberFormat(undefined, { style: "currency", currency }).format(Number.isFinite(amount) ? amount : 0);
  return { html: undefined, text };
}

export async function getWooProductCategories() {
  return wpFetch("/wc/store/products/categories?per_page=100");
}

// WordPress Pages API
export async function getWPPages() {
  return wpFetch("/wp/v2/pages?per_page=100&_fields=id,title,slug,content,excerpt,status");
}

export async function getWPPageBySlug(slug: string) {
  const pages = await wpFetch(`/wp/v2/pages?slug=${slug}&_fields=id,title,slug,content,excerpt,status`);
  return Array.isArray(pages) && pages.length > 0 ? pages[0] : null;
}

export async function getWPPageBySlugWithAcf(slug: string) {
  const pages = await wpFetch(`/wp/v2/pages?slug=${encodeURIComponent(slug)}`);
  return Array.isArray(pages) && pages.length > 0 ? pages[0] : null;
}

// WordPress Posts API (Blog)
export async function getWPPosts(params?: { per_page?: number; category?: string; page?: number }) {
  const qs = new URLSearchParams();
  if (params?.per_page) qs.set("per_page", String(params.per_page));
  if (params?.category) qs.set("categories", params.category);
  if (params?.page) qs.set("page", String(params.page));
  qs.set("_embed", "wp:featuredmedia");
  return wpFetch(`/wp/v2/posts?${qs.toString()}`);
}

// ACF - Native REST API (ACF Pro 5.11+ or ACF free with REST enabled)
// For options pages, endpoint is: /wp-json/acf/v3/options/{option_name}
export async function getACFOption(name: string) {
  try {
    return wpFetch(`/acf/v3/options/${name}`);
  } catch {
    return null;
  }
}

// WordPress Customizer / Site Info
export async function getSiteInfo() {
  return wpFetch("/wp/v2/settings");
}

// Media
export async function getMediaById(id: number) {
  return wpFetch(`/wp/v2/media/${id}?_fields=id,source_url,alt_text`);
}

export interface WooProduct {
  id: number;
  name: string;
  slug: string;
  permalink: string;
  price_html?: string;
  sku?: string;
  short_description?: string;
  description?: string;
  prices?: {
    price?: string;
    regular_price?: string;
    sale_price?: string;
    currency_code?: string;
    currency_minor_unit?: number;
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
