import apiClient from './axios';

export interface Whitepaper {
  id?: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  author: string;
  author_bio: string;
  category: string;
  tags: string[];
  file_url: string;
  cover_image?: string;
  download_count: number;
  featured: boolean;
  status: 'draft' | 'published' | 'archived';
  created_at?: string;
  updated_at?: string;
}

export const getWhitepapers = () => apiClient.get('/whitepapers');
export const getPublishedWhitepapers = () => apiClient.get('/whitepapers/published');
export const getFeaturedWhitepapers = () => apiClient.get('/whitepapers/featured');
export const getWhitepaper = (id: string) => apiClient.get(`/whitepapers/${id}`);
export const getWhitepaperBySlug = (slug: string) => apiClient.get(`/whitepapers/slug/${slug}`);
export const createWhitepaper = (data: Whitepaper) => apiClient.post('/whitepapers', data);
export const updateWhitepaper = (id: string, data: Whitepaper) => apiClient.put(`/whitepapers/${id}`, data);
export const deleteWhitepaper = (id: string) => apiClient.delete(`/whitepapers/${id}`);
export const downloadWhitepaper = (id: string) => apiClient.post(`/whitepapers/${id}/download`); 