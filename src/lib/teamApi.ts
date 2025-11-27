import apiClient from './axios';

export interface TeamMember {
  id?: string;
  name: string;
  position: string;
  department?: string;
  bio?: string;
  avatar_url?: string;
  email?: string;
  phone?: string;
  linkedin_url?: string;
  twitter_url?: string;
  github_url?: string;
  portfolio_url?: string;
  skills?: string[];
  experience_years?: number;
  education?: string;
  certifications?: string[];
  status: 'active' | 'inactive';
  featured: boolean;
  sort_order?: number;
  created_at?: string;
  updated_at?: string;
}

// API functions
export const getTeamMembers = () => apiClient.get('/teams');
export const getActiveTeamMembers = () => apiClient.get('/teams/active');
export const getFeaturedTeamMembers = () => apiClient.get('/teams/featured');
export const getTeamMember = (id: string) => apiClient.get(`/teams/${id}`);
export const createTeamMember = (data: TeamMember) => apiClient.post('/teams', data);
export const updateTeamMember = (id: string, data: TeamMember) => apiClient.put(`/teams/${id}`, data);
export const deleteTeamMember = (id: string) => apiClient.delete(`/teams/${id}`);
export const updateSortOrder = (id: string, sortOrder: number) => apiClient.put(`/teams/${id}/sort`, { sort_order: sortOrder }); 