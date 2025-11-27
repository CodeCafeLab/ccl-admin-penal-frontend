"use client";
import React, { useEffect, useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { sendContactMessage, getContactMessages } from "@/lib/contactUS";

interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at?: string;
}

export default function ContactUsPage() {
  // Form state
  const [form, setForm] = useState<ContactMessage>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  // Messages state
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [fetching, setFetching] = useState(false);

  // Fetch all messages on mount
  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    setFetching(true);
    try {
      const res = await getContactMessages();
      setMessages(res.data);
    } catch {
      setMessages([]);
    }
    setFetching(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await sendContactMessage(form);
      setSuccess("Message sent!");
      setForm({ name: "", email: "", subject: "", message: "" });
      fetchMessages();
    } catch {
      setSuccess("Failed to send.");
    }
    setLoading(false);
  };

  return (
    <AdminLayout adminName="Admin">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8 mt-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">Contact Us</h1>
        <form onSubmit={handleSubmit} className="space-y-4 mb-8">
          <div className="flex gap-4">
            <input
              name="name"
              required
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
            />
            <input
              name="email"
              type="email"
              required
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <input
            name="subject"
            required
            placeholder="Subject"
            value={form.subject}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
          <textarea
            name="message"
            required
            placeholder="Message"
            value={form.message}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            {loading ? "Sending..." : "Send"}
          </button>
          {success && <div className="text-green-600">{success}</div>}
        </form>

        <h2 className="text-xl font-semibold mb-4 text-gray-900">All Messages</h2>
        {fetching ? (
          <div className="text-center text-gray-400">Loading...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-lg">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Email</th>
                  <th className="px-4 py-2 text-left">Subject</th>
                  <th className="px-4 py-2 text-left">Message</th>
                  <th className="px-4 py-2 text-left">Date</th>
                  {/* <th className="px-4 py-2"></th> */}
                </tr>
              </thead>
              <tbody>
                {messages.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center text-gray-400 py-8">
                      No messages found.
                    </td>
                  </tr>
                ) : (
                  messages.map((msg) => (
                    <tr key={msg.id} className="border-t">
                      <td className="px-4 py-2">{msg.name}</td>
                      <td className="px-4 py-2">{msg.email}</td>
                      <td className="px-4 py-2">{msg.subject}</td>
                      <td className="px-4 py-2">{msg.message}</td>
                      <td className="px-4 py-2 text-xs text-gray-500">
                        {msg.created_at
                          ? new Date(msg.created_at).toLocaleString()
                          : ""}
                      </td>
                      {/* <td>
                        <button
                          onClick={() => handleDelete(msg.id!)}
                          className="text-red-500 hover:underline"
                        >
                          Delete
                        </button>
                      </td> */}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}