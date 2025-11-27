import apiClient from './axios';

export interface WhyChooseUs {
  id?: string;
  title: string;
  description: string;
  icon?: string;
  image_url?: string;
  order_index: number;
  status: 'active' | 'inactive';
  created_at?: string;
  updated_at?: string;
}

export const getWhyChooseUs = () => apiClient.get('/why-choose-us');
export const getActiveWhyChooseUs = () => apiClient.get('/why-choose-us/active');
export const getWhyChooseUsById = (id: string) => apiClient.get(`/why-choose-us/${id}`);
export const createWhyChooseUs = (data: WhyChooseUs) => apiClient.post('/why-choose-us', data);
export const updateWhyChooseUs = (id: string, data: WhyChooseUs) => apiClient.put(`/why-choose-us/${id}`, data);
export const deleteWhyChooseUs = (id: string) => apiClient.delete(`/why-choose-us/${id}`);
export const updateWhyChooseUsOrder = (id: string, orderIndex: number) => apiClient.put(`/why-choose-us/${id}/order`, { order_index: orderIndex }); 