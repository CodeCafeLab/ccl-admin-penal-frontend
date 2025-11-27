"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import AdminLayout from "@/components/AdminLayout";
import apiClient from "@/lib/axios";

interface AiTool {
  id: number;
  title: string;
  description: string;
  category: string;
  tags?: string | string[]; // allow string, array, or undefined
  image_url?: string;
  link?: string;
}

export default function EditAiToolPage() {
  const { id } = useParams();
  const router = useRouter();
  const [form, setForm] = useState<Partial<AiTool>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Fetch AI tool data
  useEffect(() => {
    if (!id) return;
    setLoading(true);
    apiClient
      .get(`/ai/${id}`)
      .then((res) => setForm(res.data))
      .catch(() => alert("Failed to fetch AI tool"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await apiClient.put(`/ai/${id}`, form);
      router.push("/ai");
    } catch (err) {
        console.log(err)
      alert("Failed to update AI tool.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout adminName="John Doe">
        <div className="p-8 text-center">Loading...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout adminName="John Doe">
      <div className="p-6 md:p-8 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
        <div className="max-w-xl mx-auto bg-white rounded-xl shadow-md border border-gray-200 p-8">
          <h1 className="text-2xl font-bold mb-6">Edit AI Tool</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
              <input
                type="text"
                name="title"
                value={form.title || ""}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                name="description"
                value={form.description || ""}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <input
                type="text"
                name="category"
                value={form.category || ""}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tags (comma separated)</label>
              <input
                type="text"
                name="tags"
                value={typeof form.tags === "string" ? form.tags : Array.isArray(form.tags) ? form.tags.join(", ") : ""}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            {/* Add more fields as needed */}
            <div className="flex items-center space-x-4">
              <button
                type="button"
                onClick={() => router.push("/ai")}
                className="flex items-center space-x-2 bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
} 