"use client";
import AdminLayout from "@/components/AdminLayout";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaSave, FaTimes, FaArrowLeft } from "react-icons/fa";
import Image from "next/image";
import apiclint from "@/lib/axios"; // <-- Add this import

export default function CreateAiPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    description: "",
    image_url: "",
    category: "",
    tags: "",
    link: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "unsigned_preset");
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dubvzmk7g/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      setForm((f) => ({ ...f, image_url: data.secure_url }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const payload = {
      ...form,
      tags: form.tags
        ? form.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean)
        : [],
    };
    try {
      // Use apiclint instead of fetch
      const res = await apiclint.post("/ai", payload);
      setLoading(false);
      if (res.status === 200 || res.status === 201) {
        router.push("/ai");
      } else {
        alert("Failed to create AI feature");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      alert("Failed to create AI feature");
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-xl mx-auto py-10 px-4">
        <button
          onClick={() => router.push("/ai")}
          className="mb-6 px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 hover:bg-blue-700"
        >
          <FaArrowLeft /> Back to AI Features
        </button>
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-2xl font-bold mb-6">Add AI Feature</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title *</label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Description *
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full px-3 py-2 border rounded"
              />
              {form.image_url && (
                <div className="mt-2">
                  <Image
                    src={form.image_url}
                    alt="Preview"
                    width={96}
                    height={96}
                    className="w-24 h-24 object-cover rounded border"
                    unoptimized
                  />
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <input
                type="text"
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Tags</label>
              <input
                type="text"
                name="tags"
                value={form.tags}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
                placeholder="Comma separated"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Link</label>
              <input
                type="url"
                name="link"
                value={form.link}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
                placeholder="https://example.com"
              />
            </div>
            <div className="flex gap-2 justify-end mt-6">
              <button
                type="button"
                onClick={() => router.push("/ai")}
                className="flex items-center gap-2 bg-gray-500 text-white px-5 py-2 rounded-lg hover:bg-gray-600"
              >
                <FaTimes /> Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
              >
                <FaSave /> {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}
