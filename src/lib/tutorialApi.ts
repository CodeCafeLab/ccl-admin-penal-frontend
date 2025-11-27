import apiClient from './axios';

export interface Tutorial {
  id?: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  author: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  tags: string[];
  video_url?: string;
  thumbnail_url?: string;
  duration: string;
  featured: boolean;
  status: 'draft' | 'published' | 'archived';
  views: number;
  created_at?: string;
  updated_at?: string;
}

export const getTutorials = () => apiClient.get('/tutorials');
export const getPublishedTutorials = () => apiClient.get('/tutorials/published');
export const getFeaturedTutorials = () => apiClient.get('/tutorials/featured');
export const getTutorialsByDifficulty = (difficulty: string) => apiClient.get(`/tutorials/difficulty/${difficulty}`);
export const getTutorial = (id: string) => apiClient.get(`/tutorials/${id}`);
export const getTutorialBySlug = (slug: string) => apiClient.get(`/tutorials/slug/${slug}`);
export const createTutorial = (data: Tutorial) => apiClient.post('/tutorials', data);
export const updateTutorial = (id: string, data: Tutorial) => apiClient.put(`/tutorials/${id}`, data);
export const deleteTutorial = (id: string) => apiClient.delete(`/tutorials/${id}`);