import apiClient from './axios';

export interface News {
  id?: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  author: string;
  category: string;
  tags: string[];
  image_url?: string;
  featured: boolean;
  status: 'draft' | 'published' | 'archived';
  views: number;
  created_at?: string;
  updated_at?: string;
}

export const getNews = () => apiClient.get('/news');
export const getPublishedNews = () => apiClient.get('/news/published');
export const getFeaturedNews = () => apiClient.get('/news/featured');
export const getNewsById = (id: string) => apiClient.get(`/news/${id}`);
export const getNewsBySlug = (slug: string) => apiClient.get(`/news/slug/${slug}`);
export const createNews = (data: News) => apiClient.post('/news', data);
export const updateNews = (id: string, data: News) => apiClient.put(`/news/${id}`, data);
export const deleteNews = (id: string) => apiClient.delete(`/news/${id}`);