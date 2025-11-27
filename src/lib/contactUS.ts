// In contactController.js
import apiClient from "./axios";

export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at?: string;
}

export const sendContactMessage = (data: ContactMessage) =>
  apiClient.post("/contact", data);

export const getContactMessages = () =>
  apiClient.get("/contact");
