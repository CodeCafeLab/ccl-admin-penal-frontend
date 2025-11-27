import axios from "axios";

// Use Next.js API routes (relative URLs) to avoid CORS issues
// The Next.js API routes will proxy requests to the backend server
// This way, all requests go through the Next.js server, avoiding CORS
const apiClient = axios.create({
  baseURL: '/api', // Use Next.js API routes
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to handle errors
apiClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Removed token interceptor - APIs now work without authentication tokens

export default apiClient;
