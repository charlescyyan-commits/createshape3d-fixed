import { useQuery } from '@tanstack/react-query';
import {
  getWooProducts,
  getWooProductCategories,
  getWooProductBySlug,
  getWPPosts,
  getWPPageBySlug,
  getWPPageBySlugWithAcf,
} from '@/lib/wp-client';

export function useWooProductsQuery(params?: { per_page?: number; category?: string; search?: string; page?: number }) {
  return useQuery({
    queryKey: ['woo', 'products', params ?? {}],
    queryFn: () => getWooProducts(params),
  });
}

export function useWooProductCategoriesQuery() {
  return useQuery({
    queryKey: ['woo', 'productCategories'],
    queryFn: () => getWooProductCategories(),
  });
}

export function useWooProductBySlugQuery(slug: string | undefined) {
  return useQuery({
    queryKey: ['woo', 'productBySlug', slug],
    enabled: Boolean(slug),
    queryFn: () => getWooProductBySlug(slug as string),
  });
}

export function useWPPostsQuery(params?: { per_page?: number; category?: string; page?: number }) {
  return useQuery({
    queryKey: ['wp', 'posts', params ?? {}],
    queryFn: () => getWPPosts(params),
  });
}

export function useWPPageBySlugQuery(slug: string | undefined) {
  return useQuery({
    queryKey: ['wp', 'pageBySlug', slug],
    enabled: Boolean(slug),
    queryFn: () => getWPPageBySlug(slug as string),
  });
}

export function useWPPageBySlugWithAcfQuery(slug: string) {
  return useQuery({
    queryKey: ['wp', 'pageBySlugWithAcf', slug],
    queryFn: () => getWPPageBySlugWithAcf(slug),
  });
}

