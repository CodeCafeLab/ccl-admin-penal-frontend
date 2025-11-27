import apiClient from "./axios";

export const getBlogs = () => apiClient.get("/blogs");
export const getBlog = (id: string) => apiClient.get(`/blogs/${id}`);
export const getBlogBySlug = (slug: string) =>
  apiClient.get(`/blogs/slug/${slug}`);
export const getBlogsByCategory = (category: string) =>
  apiClient.get(`/blogs?category=${category}`);
