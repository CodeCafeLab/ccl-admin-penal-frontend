import apiClient from './axios';

export interface CaseStudy {
  id?: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  client_name: string;
  industry: string;
  duration: string;
  budget: string;
  technologies: string[];
  results: string;
  image_url?: string;
  featured: boolean;
  status: 'draft' | 'published' | 'archived';
  views: number;
  created_at?: string;
  updated_at?: string;
}

export const getCaseStudies = () => apiClient.get('/case-studies');
export const getPublishedCaseStudies = () => apiClient.get('/case-studies/published');
export const getFeaturedCaseStudies = () => apiClient.get('/case-studies/featured');
export const getCaseStudy = (id: string) => apiClient.get(`/case-studies/${id}`);
export const getCaseStudyBySlug = (slug: string) => apiClient.get(`/case-studies/slug/${slug}`);
export const createCaseStudy = (data: CaseStudy) => apiClient.post('/case-studies', data);
export const updateCaseStudy = (id: string, data: CaseStudy) => apiClient.put(`/case-studies/${id}`, data);
export const deleteCaseStudy = (id: string) => apiClient.delete(`/case-studies/${id}`); 