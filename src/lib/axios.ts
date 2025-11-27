import axios from "axios";
import { getApiBaseUrl } from "./apiConfig";

// Call backend directly on port 9002 (or production URL)
// This bypasses Next.js API routes and goes straight to the backend
const apiClient = axios.create({
  baseURL: getApiBaseUrl(), // Direct backend URL: http://localhost:9002/api in dev
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to automatically include auth token
apiClient.interceptors.request.use(
  (config) => {
    // Only access localStorage on client-side (browser)
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle 401 errors (unauthorized)
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // If we get a 401, the token might be invalid or expired
    if (error.response?.status === 401) {
      // Only handle logout on client-side
      if (typeof window !== 'undefined') {
        const currentPath = window.location.pathname;
        const isLoginPage = currentPath === '/login' || currentPath === '/auth';
        
        // Clear auth data
        localStorage.removeItem('token');
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('user');
        
        // Only redirect if not already on login page and not making a login request
        const isLoginRequest = error.config?.url?.includes('/auth/login');
        if (!isLoginPage && !isLoginRequest) {
          // Use router if available, otherwise use window.location
          window.location.href = '/login';
        }
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
