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

// WooCommerce Store API
export async function getWooProducts(params?: { per_page?: number; category?: string; search?: string; page?: number }) {
  const qs = new URLSearchParams();
  if (params?.per_page) qs.set("per_page", String(params.per_page));
  if (params?.category) qs.set("category", params.category);
  if (params?.search) qs.set("search", params.search);
  if (params?.page) qs.set("page", String(params.page));
  qs.set("_fields", "id,name,slug,price,prices,images,categories,short_description,description,sku,stock_status,permalink");
  return wpFetch(`/wc/store/products?${qs.toString()}`);
}

export async function getWooProductBySlug(slug: string) {
  const products = await wpFetch(`/wc/store/products?slug=${slug}&_fields=id,name,slug,price,prices,images,categories,short_description,description,sku,stock_status,permalink,attributes,variations`);
  return Array.isArray(products) && products.length > 0 ? products[0] : null;
}

export async function getWooProductCategories() {
  return wpFetch("/wc/store/products/categories?per_page=100&_fields=id,name,slug,parent,image");
}

// WordPress Pages API
export async function getWPPages() {
  return wpFetch("/wp/v2/pages?per_page=100&_fields=id,title,slug,content,excerpt,status");
}

export async function getWPPageBySlug(slug: string) {
  const pages = await wpFetch(`/wp/v2/pages?slug=${slug}&_fields=id,title,slug,content,excerpt,status`);
  return Array.isArray(pages) && pages.length > 0 ? pages[0] : null;
}

// WordPress Posts API (Blog)
export async function getWPPosts(params?: { per_page?: number; category?: string; page?: number }) {
  const qs = new URLSearchParams();
  if (params?.per_page) qs.set("per_page", String(params.per_page));
  if (params?.category) qs.set("categories", params.category);
  if (params?.page) qs.set("page", String(params.page));
  qs.set("_fields", "id,title,slug,excerpt,date,featured_media,_links");
  return wpFetch(`/wp/v2/posts?${qs.toString()}`);
}

// ACF Options API (requires ACF to REST API plugin)
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
  sku?: string;
  short_description?: string;
  description?: string;
  prices?: {
    price?: string;
    regular_price?: string;
    sale_price?: string;
    currency_code?: string;
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
