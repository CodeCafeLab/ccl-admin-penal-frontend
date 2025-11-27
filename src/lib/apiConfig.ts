/**
 * Centralized API configuration for backend URL
 * Supports both local development and production server domains
 */

/**
 * Get the base URL for the backend API
 * Priority:
 * 1. API_BASE_URL environment variable (server-side only)
 * 2. NEXT_PUBLIC_API_BASE_URL environment variable (client-side accessible)
 * 3. Auto-detect based on NODE_ENV
 * 
 * @returns Base URL without trailing slash (e.g., 'http://localhost:9002' or 'https://admin.codecafelab.in')
 */
export function getBackendBaseUrl(): string {
  // Check for explicit environment variable first
  const envUrl = process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL;
  
  if (envUrl) {
    // Remove trailing slash and /api suffix if present
    return envUrl.replace(/\/+$/, '').replace(/\/api$/, '');
  }
  
  // Auto-detect based on environment
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:9002';
  }
  
  // Production default - can be overridden with environment variable
  return 'https://admin.codecafelab.in';
}

/**
 * Get the full API base URL with /api suffix
 * @returns Full API base URL (e.g., 'http://localhost:9002/api' or 'https://admin.codecafelab.in/api')
 */
export function getApiBaseUrl(): string {
  const baseUrl = getBackendBaseUrl();
  return `${baseUrl}/api`;
}

/**
 * Build a full API endpoint URL
 * @param endpoint - API endpoint path (e.g., '/blogs', '/auth/login')
 * @returns Full URL to the endpoint
 */
export function getApiUrl(endpoint: string): string {
  const apiBase = getApiBaseUrl();
  // Ensure endpoint starts with /
  const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${apiBase}${normalizedEndpoint}`;
}

