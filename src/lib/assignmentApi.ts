import apiClient from './axios';

export interface Assignment {
  id?: string;
  title: string;
  slug: string;
  description: string;
  requirements: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  tags: string[];
  estimated_time: string;
  file_url?: string;
  solution_url?: string;
  featured: boolean;
  status: 'draft' | 'published' | 'archived';
  created_at?: string;
  updated_at?: string;
}

export const getAssignments = () => apiClient.get('/assignments');
export const getPublishedAssignments = () => apiClient.get('/assignments/published');
export const getFeaturedAssignments = () => apiClient.get('/assignments/featured');
export const getAssignmentsByDifficulty = (difficulty: string) => apiClient.get(`/assignments/difficulty/${difficulty}`);
export const getAssignment = (id: string) => apiClient.get(`/assignments/${id}`);
export const getAssignmentBySlug = (slug: string) => apiClient.get(`/assignments/slug/${slug}`);
export const createAssignment = (data: Assignment) => apiClient.post('/assignments', data);
export const updateAssignment = (id: string, data: Assignment) => apiClient.put(`/assignments/${id}`, data);
export const deleteAssignment = (id: string) => apiClient.delete(`/assignments/${id}`);