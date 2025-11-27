import apiClient from './axios';

export interface Report {
  id?: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  author: string;
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

export const getReports = () => apiClient.get('/reports');
export const getPublishedReports = () => apiClient.get('/reports/published');
export const getFeaturedReports = () => apiClient.get('/reports/featured');
export const getReport = (id: string) => apiClient.get(`/reports/${id}`);
export const getReportBySlug = (slug: string) => apiClient.get(`/reports/slug/${slug}`);
export const createReport = (data: Report) => apiClient.post('/reports', data);
export const updateReport = (id: string, data: Report) => apiClient.put(`/reports/${id}`, data);
export const deleteReport = (id: string) => apiClient.delete(`/reports/${id}`);
export const downloadReport = (id: string) => apiClient.post(`/reports/${id}/download`);