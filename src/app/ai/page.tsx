"use client";
import AdminLayout from "@/components/AdminLayout";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaExternalLinkAlt,
} from "react-icons/fa";
import Image from "next/image";
import api from "@/lib/axios"; // <-- Add this import
interface AiFeature {
  id: number;
  title: string;
  description: string;
  image_url?: string;
  category: string;
  tags?: string;
  link?: string;
}

// const emptyForm = {
//   title: "",
//   description: "",
//   image_url: "",
//   category: "",
//   tags: "",
//   link: "",
// };

export default function AiToolsGridPage() {
  const router = useRouter();
  const [features, setFeatures] = useState<AiFeature[]>([]);
  // Remove form, mode, editingId, modalOpen, and related state
  const [loading, setLoading] = useState(false);

  // Remove all modal and form logic

  // Remove openModal, closeModal, handleSubmit, handleChange, handleImageUpload, etc.

  // Delete function handleAdd and modal code

  // Fetch features
  const fetchFeatures = async () => {
    try {
      const res = await api.get("/ai"); // <-- Use api client
      setFeatures(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.log(err);
      setFeatures([]);
    }
  };

  useEffect(() => {
    fetchFeatures();
  }, []);

  // Delete
  const handleDelete = async (id: number) => {
    if (!confirm("Delete this feature?")) return;
    setLoading(true);
    try {
      await api.delete(`/ai/${id}`); // <-- Use api client
      fetchFeatures();
    } catch (err) {
      console.log(err);
      alert("Error deleting feature");
    }
    setLoading(false);
  };

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">AI Features</h1>
          <button
            onClick={() => router.push("/ai/create")}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow transition"
          >
            <FaPlus /> Add Feature
          </button>
        </div>

        {/* Empty State */}
        {features.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <FaPlus size={48} />
            <p className="mt-4 text-lg">
              No AI features found. Click Add Feature to create one!
            </p>
          </div>
        )}

        {/* Grid of Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.id}
              className="bg-white rounded-xl shadow p-4 flex flex-col justify-between hover:shadow-lg transition"
            >
              {f.image_url && (
                <Image
                  src={f.image_url}
                  alt={f.title}
                  width={400}
                  height={200}
                  className="rounded-lg object-cover w-full h-32 mb-3"
                  unoptimized
                />
              )}
              <div className="flex-1">
                <div className="font-bold text-lg mb-1">{f.title}</div>
                <div className="text-gray-600 text-sm mb-2 line-clamp-2">
                  {f.description}
                </div>
                <div className="text-xs text-gray-400 mb-1">{f.category}</div>
                {f.tags && (
                  <div className="text-xs text-gray-500 mb-1">
                    Tags: {Array.isArray(f.tags) ? f.tags.join(", ") : f.tags}
                  </div>
                )}
                {f.link && (
                  <a
                    href={f.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 hover:underline text-xs"
                  >
                    Visit <FaExternalLinkAlt className="ml-1" size={12} />
                  </a>
                )}
              </div>
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => router.push(`/ai/${f.id}`)}
                  className="flex-1 flex items-center justify-center gap-1 bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                >
                  <FaEdit /> Edit
                </button>
                <button
                  onClick={() => handleDelete(f.id)}
                  className="flex-1 flex items-center justify-center gap-1 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                  disabled={loading}
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
