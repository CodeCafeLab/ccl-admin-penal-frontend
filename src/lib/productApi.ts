import apiClient from './axios';

export interface Product {
  id?: string;
  name: string;
  slug: string;
  short_description?: string;
  description?: string;
  price: number;
  discount_price?: number;
  image_url?: string;
  gallery?: string[]; // Array of image URLs
  stock?: number;
  sku?: string;
  brand?: string;
  category?: string;
  tags?: string[];
  status?: "active" | "inactive" | "draft";
  is_featured?: boolean;
  weight?: number;
  dimensions?: { width: number; height: number; depth: number };
  meta_title?: string;
  meta_description?: string;
  created_at?: string;
  updated_at?: string;
}

export const getProducts = () => apiClient.get('/products');
export const getProduct = (id: string) => apiClient.get(`/products/${id}`);
export const createProduct = (data: Product) => apiClient.post('/products', data);
export const updateProduct = (id: string, data: Product) => apiClient.put(`/products/${id}`, data);
export const deleteProduct = (id: string) => apiClient.delete(`/products/${id}`);
