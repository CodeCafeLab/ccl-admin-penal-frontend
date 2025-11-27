import apiClient from "./axios";

export interface ClientReview {
  id?: string;
  client_name: string;
  review_text: string;
  rating: number;
  avatar_url?: string;
  created_at?: string;
  published?: boolean; // Optional: for moderation
}

export const getClientReviews = () => apiClient.get('/client-reviews');
export const createClientReview = (data: ClientReview) => apiClient.post('/client-reviews', data);
export const updateClientReview = (id: string, data: ClientReview) => apiClient.put('/client-reviews', { id, ...data });
export const deleteClientReview = (id: string) => apiClient.delete('/client-reviews', { data: { id } });
