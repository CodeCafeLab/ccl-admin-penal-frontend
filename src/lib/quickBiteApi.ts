import apiClient from './axios';

export interface QuickBite {
  id: string;
  title: string;
  description: string;
  video_url: string;
  thumbnail_url?: string;
  duration: string;
  category: string;
  tags: string[];
  author: string;
  author_id: number;
  status: 'draft' | 'published';
  featured: boolean;
  views: number;
  likes: number;
  created_at: string;
  updated_at: string;
}

export const getQuickBites = () => apiClient.get('quick-bites');
export const getFeaturedQuickBites = () => apiClient.get('quick-bites/featured');
export const getQuickBite = (id: string) => apiClient.get(`quick-bites/${id}`);
export const createQuickBite = (data: Partial<QuickBite>) => apiClient.post('quick-bites', data);
export const updateQuickBite = (id: string, data: Partial<QuickBite>) => apiClient.put(`quick-bites/${id}`, data);
export const deleteQuickBite = (id: string) => apiClient.delete(`quick-bites/${id}`);
export const likeQuickBite = (id: string) => apiClient.post(`quick-bites/${id}/like`); 