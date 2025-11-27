import apiClient from './axios';

export interface Newsletter {
  id?: string;
  title: string;
  slug: string;
  content: string;
  subject_line: string;
  author: string;
  category: string;
  tags: string[];
  featured: boolean;
  status: 'draft' | 'scheduled' | 'sent' | 'archived';
  scheduled_at?: string;
  sent_at?: string;
  recipient_count: number;
  open_rate?: number;
  click_rate?: number;
  created_at?: string;
  updated_at?: string;
}

export const getNewsletters = () => apiClient.get('/newsletters');
export const getScheduledNewsletters = () => apiClient.get('/newsletters/scheduled');
export const getSentNewsletters = () => apiClient.get('/newsletters/sent');
export const getFeaturedNewsletters = () => apiClient.get('/newsletters/featured');
export const getNewsletter = (id: string) => apiClient.get(`/newsletters/${id}`);
export const getNewsletterBySlug = (slug: string) => apiClient.get(`/newsletters/slug/${slug}`);
export const createNewsletter = (data: Newsletter) => apiClient.post('/newsletters', data);
export const updateNewsletter = (id: string, data: Newsletter) => apiClient.put(`/newsletters/${id}`, data);
export const deleteNewsletter = (id: string) => apiClient.delete(`/newsletters/${id}`);
export const updateNewsletterStatus = (id: string, status: string, sentAt?: string) => apiClient.put(`/newsletters/${id}/status`, { status, sent_at: sentAt });
export const updateNewsletterMetrics = (id: string, openRate: number, clickRate: number) => apiClient.put(`/newsletters/${id}/metrics`, { open_rate: openRate, click_rate: clickRate }); 