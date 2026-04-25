import { useQuery } from '@tanstack/react-query';
import {
  getWooProducts,
  getWooProductBySlug,
  getWooProductCategories,
  getWPPageBySlug,
  getWPPosts,
} from '@/lib/wp-client';

export const wooKeys = {
  products: (params?: any) => ['products', params] as const,
  product: (slug: string) => ['product', slug] as const,
  categories: () => ['categories'] as const,
};

export const wpKeys = {
  page: (slug: string) => ['page', slug] as const,
  posts: (params?: any) => ['posts', params] as const,
};

export function useProducts(params?: Parameters<typeof getWooProducts>[0]) {
  return useQuery({
    queryKey: wooKeys.products(params),
    queryFn: () => getWooProducts(params),
  });
}

export function useProduct(slug: string) {
  return useQuery({
    queryKey: wooKeys.product(slug),
    queryFn: () => getWooProductBySlug(slug),
    enabled: !!slug,
  });
}

export function useCategories() {
  return useQuery({
    queryKey: wooKeys.categories(),
    queryFn: getWooProductCategories,
  });
}

export function usePage(slug: string) {
  return useQuery({
    queryKey: wpKeys.page(slug),
    queryFn: () => getWPPageBySlug(slug),
    enabled: !!slug,
  });
}

export function usePosts(params?: Parameters<typeof getWPPosts>[0]) {
  return useQuery({
    queryKey: wpKeys.posts(params),
    queryFn: () => getWPPosts(params),
  });
}
