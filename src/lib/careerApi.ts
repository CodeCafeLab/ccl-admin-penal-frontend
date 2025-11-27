import apiClient from './axios';

export interface Career {
  id?: string;
  title: string;
  slug: string;
  description: string;
  requirements: string;
  responsibilities: string;
  benefits: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'internship';
  experience_level: 'entry' | 'mid' | 'senior' | 'lead';
  salary_min?: number;
  salary_max?: number;
  department: string;
  tags?: string[];
  status: 'active' | 'inactive' | 'draft';
  featured: boolean;
  views: number;
  applications_count: number;
  created_at?: string;
  updated_at?: string;
}

export interface JobApplication {
  id?: string;
  job_id: string;
  applicant_name: string;
  applicant_email: string;
  applicant_phone?: string;
  resume_url?: string;
  cover_letter?: string;
  portfolio_url?: string;
  linkedin_url?: string;
  github_url?: string;
  experience_years?: number;
  current_company?: string;
  current_position?: string;
  expected_salary?: number;
  notice_period?: string;
  status: 'pending' | 'reviewed' | 'shortlisted' | 'rejected' | 'hired';
  notes?: string;
  job_title?: string;
  created_at?: string;
  updated_at?: string;
}

// Career APIs
export const getCareers = () => apiClient.get('/careers');
export const getActiveCareers = () => apiClient.get('/careers/active');
export const getFeaturedCareers = () => apiClient.get('/careers/featured');
export const getCareer = (id: string) => apiClient.get(`/careers/${id}`);
export const getCareerBySlug = (slug: string) => apiClient.get(`/careers/slug/${slug}`);
export const createCareer = (data: Career) => apiClient.post('/careers', data);
export const updateCareer = (id: string, data: Career) => apiClient.put(`/careers/${id}`, data);
export const deleteCareer = (id: string) => apiClient.delete(`/careers/${id}`);

// Job Application APIs
export const getJobApplications = () => apiClient.get('/job-applications');
export const getApplicationsByJobId = (jobId: string) => apiClient.get(`/job-applications/job/${jobId}`);
export const getJobApplication = (id: string) => apiClient.get(`/job-applications/${id}`);
export const submitApplication = (data: JobApplication) => apiClient.post('/job-applications', data);
export const updateApplication = (id: string, data: Partial<JobApplication>) => apiClient.put(`/job-applications/${id}`, data);
export const deleteApplication = (id: string) => apiClient.delete(`/job-applications/${id}`);
export const getApplicationStats = () => apiClient.get('/job-applications/stats'); 