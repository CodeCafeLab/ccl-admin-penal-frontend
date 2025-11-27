"use client";
import React, { useEffect, useState } from "react";
import {
  getClientReviews,
  createClientReview,
  updateClientReview,
  deleteClientReview,
  ClientReview,
} from "@/lib/clientReviewApi";
import AdminLayout from "@/components/AdminLayout";
import Image from "next/image";

export default function ClientReviewsAdmin() {
  const [reviews, setReviews] = useState<ClientReview[]>([]);
  const [form, setForm] = useState<ClientReview>({
    client_name: "",
    review_text: "",
    rating: 5,
    avatar_url: "",
    published: true,
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    setIsLoading(true);
    const res = await getClientReviews();
    setReviews(res.data);
    setIsLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    if (editingId) {
      await updateClientReview(editingId, form);
      setEditingId(null);
    } else {
      await createClientReview(form);
    }
    setForm({
      client_name: "",
      review_text: "",
      rating: 5,
      avatar_url: "",
      published: true,
    });
    await fetchReviews();
    setIsLoading(false);
  };

  const handleEdit = (review: ClientReview) => {
    setForm({
      client_name: review.client_name,
      review_text: review.review_text,
      rating: review.rating,
      avatar_url: review.avatar_url || "",
      published: review.published ?? true,
    });
    setEditingId(review.id!);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Delete this review?")) {
      setIsLoading(true);
      await deleteClientReview(id);
      await fetchReviews();
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setForm({
      client_name: "",
      review_text: "",
      rating: 5,
      avatar_url: "",
      published: true,
    });
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "unsigned_preset"); // Use your Cloudinary unsigned preset

      const res = await fetch("https://api.cloudinary.com/v1_1/dubvzmk7g/image/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setForm((f) => ({ ...f, avatar_url: data.secure_url }));
    }
  };

  return (
    <AdminLayout adminName="Admin">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8 mt-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">Client Reviews</h1>
        <form
          onSubmit={handleSubmit}
          className="space-y-4 mb-8 border-b pb-8"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Client Name
            </label>
            <input
              value={form.client_name}
              onChange={e => setForm(f => ({ ...f, client_name: e.target.value }))}
              placeholder="Client Name"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Review
            </label>
            <textarea
              value={form.review_text}
              onChange={e => setForm(f => ({ ...f, review_text: e.target.value }))}
              placeholder="Review"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rating
              </label>
              <input
                type="number"
                min={1}
                max={5}
                value={form.rating}
                onChange={e => setForm(f => ({ ...f, rating: Number(e.target.value) }))}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Avatar (optional)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarUpload}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
              {form.avatar_url && (
                <div className="mt-2">
                  <Image
                    src={form.avatar_url}
                    alt="Avatar Preview"
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full object-cover border"
                    unoptimized // (optional, for remote images)
                  />
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.published ?? true}
              onChange={e => setForm(f => ({ ...f, published: e.target.checked }))}
              id="published"
              className="h-4 w-4 text-yellow-500 border-gray-300 rounded"
            />
            <label htmlFor="published" className="text-sm text-gray-700">
              Published
            </label>
          </div>
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-yellow-400 text-gray-900 px-6 py-2 rounded font-semibold hover:bg-yellow-500 transition"
            >
              {editingId ? "Update" : "Add"} Review
            </button>
            {editingId && (
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
        <h2 className="text-xl font-semibold mb-4 text-gray-900">All Reviews</h2>
        {isLoading ? (
          <div className="text-center text-gray-400">Loading...</div>
        ) : (
          <ul className="space-y-4">
            {reviews.map(r => (
              <li
                key={r.id}
                className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-yellow-50 transition"
              >
                <div className="flex items-center gap-4">
                  {r.avatar_url && (
                    <Image
                      src={r.avatar_url}
                      alt={r.client_name}
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded-full object-cover border"
                      unoptimized // (optional: remove if you want Next.js to optimize remote images)
                    />
                  )}
                  <div>
                    <div className="font-semibold text-gray-900">{r.client_name}</div>
                    <div className="text-sm text-gray-600">{r.review_text}</div>
                    <div className="text-yellow-500 font-bold">
                      {"★".repeat(r.rating)}{" "}
                      <span className="text-gray-400 font-normal">
                        ({r.rating}/5)
                      </span>
                    </div>
                    <div className="text-xs text-gray-500">
                      {r.published ? "Published" : "Unpublished"}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(r)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(r.id!)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
            {reviews.length === 0 && (
              <li className="text-gray-400 text-center py-8">No reviews found.</li>
            )}
          </ul>
        )}
      </div>
    </AdminLayout>
  );
}
