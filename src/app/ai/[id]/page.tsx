"use client";
import AdminLayout from "@/components/AdminLayout";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  FaExternalLinkAlt,
  FaEdit,
  FaArrowLeft,
  FaSave,
  FaTimes,
} from "react-icons/fa";
import { useRouter } from "next/navigation";
import apiClient from "@/lib/axios"; // <-- Add this import

interface AiFeature {
  id: number;
  title: string;
  description: string;
  image_url?: string;
  category: string;
  tags?: string[] | string;
  link?: string;
}
 
export default function AiDetailPage() {
  const router = useRouter();
  const { id } = useParams();
  const [feature, setFeature] = useState<AiFeature | null>(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    image_url: "",
    category: "",
    tags: "",
    link: "",
  });

  useEffect(() => {
    async function fetchFeature() {
      setLoading(true);
      // Replace fetch with apiClient
      const res = await apiClient.get(`/ai/${id}`);
      const data = res.data;
      setFeature(data);
      setForm({
        title: data.title,
        description: data.description,
        image_url: data.image_url || "",
        category: data.category,
        tags: Array.isArray(data.tags) ? data.tags.join(", ") : data.tags || "",
        link: data.link || "",
      });
      setLoading(false);
    }
    fetchFeature();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEdit = () => setEditMode(true);
  const handleCancel = () => setEditMode(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...form,
      tags: form.tags
        ? form.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean)
        : [],
    };
    // Replace fetch with apiClient
    const res = await apiClient.put(`/ai/${id}`, payload);
    if (res.status === 200) {
      setEditMode(false);
      const updated = res.data;
      setFeature(updated);
    } else {
      alert("Failed to update feature");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <span className="text-gray-400 text-lg">Loading...</span>
      </div>
    );
  }
          
  if (!feature) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <span className="text-gray-400 text-lg">AI Feature not found.</span>
        <button
          onClick={() => router.push("/ai")}
          className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 hover:bg-blue-700"
        >
          <FaArrowLeft /> Back to AI Features
        </button>
      </div>
    );
  }
              
  return (
    <AdminLayout adminName="John Doe">
      <div className="mx-auto py-10 px-4">
        {/* Back Button */}
        <button
          onClick={() => router.push("/ai")}
          className="mb-6 px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 hover:bg-blue-700"
        >
          <FaArrowLeft /> Back to AI Features
        </button>

        {/* Card Container */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Image */}
          {feature.image_url && (
            <div className="flex justify-center mb-6">
              <Image
                src={feature.image_url}
                alt={feature.title}
                width={320}
                height={180}
                className="rounded-lg object-cover w-80 h-40"
                unoptimized
              />
            </div>
          )}

          {/* Title and Edit */}
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-3xl font-bold">
              {editMode ? (
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  className="w-full px-2 py-1 border rounded"
                  required
                />
              ) : (
                feature.title
              )}
            </h1>
            {!editMode && (
              <button
                onClick={handleEdit}
                className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
              >
                <FaEdit /> Edit
              </button>
            )}
          </div>

          {/* Category */}
          <div className="text-sm text-gray-500 mb-4">
            Category:{" "}
            {editMode ? (
              <input
                type="text"
                name="category"
                value={form.category}
                onChange={handleChange}
                className="px-2 py-1 border rounded"
              />
            ) : (
              <span className="font-medium">{feature.category}</span>
            )}
          </div>

          {/* Description */}
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-1">Description</h2>
            {editMode ? (
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                className="w-full px-2 py-1 border rounded"
                rows={3}
                required
              />
            ) : (
              <p className="text-gray-700">{feature.description}</p>
            )}
          </div>

          {/* Tags */}
          <div className="mb-4">
            <span className="text-sm text-gray-600">
              Tags:{" "}
              {editMode ? (
                <input
                  type="text"
                  name="tags"
                  value={form.tags}
                  onChange={handleChange}
                  className="px-2 py-1 border rounded"
                  placeholder="Comma separated"
                />
              ) : (
                <span className="font-medium">
                  {Array.isArray(feature.tags)
                    ? feature.tags.join(", ")
                    : feature.tags}
                </span>
              )}
            </span>
          </div>

          {/* Link */}
          <div className="mb-4">
            {editMode ? (
              <>
                <label className="block text-sm font-medium mb-1">Link</label>
                <input
                  type="url"
                  name="link"
                  value={form.link}
                  onChange={handleChange}
                  className="w-full px-2 py-1 border rounded"
                  placeholder="https://example.com"
                />
              </>
            ) : (
              feature.link && (
                <a
                  href={feature.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-600 hover:underline text-sm"
                >
                  Visit Tool <FaExternalLinkAlt className="ml-1" size={14} />
                </a>
              )
            )}
          </div>

          {/* Edit Mode Buttons */}
          {editMode && (
            <form onSubmit={handleSave} className="flex gap-2 justify-end mt-6">
              <button
                type="button"
                onClick={handleCancel}
                className="flex items-center gap-2 bg-gray-500 text-white px-5 py-2 rounded-lg hover:bg-gray-600"
              >
                <FaTimes /> Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
              >
                <FaSave /> Save
              </button>
            </form>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
