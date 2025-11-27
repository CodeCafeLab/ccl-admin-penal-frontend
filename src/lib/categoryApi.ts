import apiClient from './axios';
import {  Category } from './constent';

export const getCategories = () => apiClient.get('/categories');
export const getCategory = (id: string) => apiClient.get(`/categories/${id}`);
export const createCategory = (data: Category) => apiClient.post('/categories', data);
export const updateCategory = (id: string, data: Category) => apiClient.put(`/categories/${id}`, data);
export const deleteCategory = (id: string) => apiClient.delete(`/categories/${id}`);
