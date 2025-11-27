import apiClient from './axios';

export interface HelpArticle {
  id?: string;
  title: string;
  slug: string;
  content: string;
  category: string;
  tags: string[];
  author: string;
  featured: boolean;
  status: 'draft' | 'published' | 'archived';
  views: number;
  helpful_votes: number;
  created_at?: string;
  updated_at?: string;
}

export const getHelpArticles = () => apiClient.get('/help');
export const getPublishedHelpArticles = () => apiClient.get('/help/published');
export const getFeaturedHelpArticles = () => apiClient.get('/help/featured');
export const getHelpArticlesByCategory = (category: string) => apiClient.get(`/help/category/${category}`);
export const getHelpArticle = (id: string) => apiClient.get(`/help/${id}`);
export const getHelpArticleBySlug = (slug: string) => apiClient.get(`/help/slug/${slug}`);
export const createHelpArticle = (data: HelpArticle) => apiClient.post('/help', data);
export const updateHelpArticle = (id: string, data: HelpArticle) => apiClient.put(`/help/${id}`, data);
export const deleteHelpArticle = (id: string) => apiClient.delete(`/help/${id}`);
export const incrementHelpfulVotes = (id: string) => apiClient.post(`/help/${id}/helpful`); 