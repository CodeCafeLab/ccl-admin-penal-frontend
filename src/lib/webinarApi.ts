import apiClient from './axios';

export interface Webinar {
  id?: string;
  title: string;
  slug: string;
  description: string;
  speaker: string;
  speaker_bio: string;
  date_time: string;
  duration: string;
  category: string;
  tags: string[];
  registration_url: string;
  recording_url?: string;
  thumbnail_url?: string;
  max_participants: number;
  registered_participants: number;
  featured: boolean;
  status: 'upcoming' | 'live' | 'completed' | 'cancelled';
  created_at?: string;
  updated_at?: string;
}

export const getWebinars = () => apiClient.get('/webinars');
export const getUpcomingWebinars = () => apiClient.get('/webinars/upcoming');
export const getFeaturedWebinars = () => apiClient.get('/webinars/featured');
export const getCompletedWebinars = () => apiClient.get('/webinars/completed');
export const getWebinar = (id: string) => apiClient.get(`/webinars/${id}`);
export const getWebinarBySlug = (slug: string) => apiClient.get(`/webinars/slug/${slug}`);
export const createWebinar = (data: Webinar) => apiClient.post('/webinars', data);
export const updateWebinar = (id: string, data: Webinar) => apiClient.put(`/webinars/${id}`, data);
export const deleteWebinar = (id: string) => apiClient.delete(`/webinars/${id}`);
export const updateWebinarStatus = (id: string, status: string) => apiClient.put(`/webinars/${id}/status`, { status });
export const registerForWebinar = (id: string) => apiClient.post(`/webinars/${id}/register`);