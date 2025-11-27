"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "@/components/AdminLayout";
import { FaSave, FaTimes, FaUpload, FaEye, FaEyeSlash } from "react-icons/fa";
import { createQuickBite } from "@/lib/quickBiteApi";
import ProtectedRoute from "@/components/ProtectedRoute";

interface FormData {
  title: string;
  description: string;
  video_url: string;
  duration: string;
  category: string;
  tags: string;
  status: "draft" | "published";
  featured: boolean;
}

const CreateQuickBitePage: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    video_url: "",
    duration: "",
    category: "",
    tags: "",
    status: "draft",
    featured: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "unsigned_preset"); // Set this in your Cloudinary dashboard

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dubvzmk7g/video/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      // Use data.secure_url as your video_url
      setFormData((prev) => ({
        ...prev,
        video_url: data.secure_url,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const payload = {
        ...formData,
        tags: formData.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
      };

      await createQuickBite(payload);
      setIsLoading(false);
      router.push("/quick-bites");
    } catch (err: unknown) {
      setIsLoading(false);
      if (err && typeof err === "object" && "response" in err) {
        const error = err as {
          response?: { data?: unknown; status?: number };
          request?: unknown;
          message?: string;
        };
        let errorMessage: string | undefined;
        if (
          error.response &&
          error.response.data &&
          typeof error.response.data === "object"
        ) {
          if ("error" in error.response.data) {
            errorMessage = (error.response.data as { error?: string }).error;
          } else if ("message" in error.response.data) {
            errorMessage = (error.response.data as { message?: string })
              .message;
          }
        }
        alert(
          errorMessage ||
            `Failed to create quick bite (status ${error.response?.status})`
        );
      } else {
        alert("An unknown error occurred.");
      }
    }
  };

  const handleCancel = () => {
    router.push("/quick-bites");
  };

  return (
    <ProtectedRoute>
      <AdminLayout adminName="John Doe">
        <div className="p-6 md:p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Create New Quick Bite
              </h1>
              <p className="text-gray-600">
                Upload and manage your reel-style video content
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                {showPreview ? <FaEyeSlash /> : <FaEye />}
                <span>{showPreview ? "Hide Preview" : "Show Preview"}</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your quick bite title..."
                  />
                </div>

                {/* Description */}
                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={3}
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Brief description of your quick bite..."
                  />
                </div>

                {/* Video Upload */}
                <div>
                  <label
                    htmlFor="video"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Video File *
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <FaUpload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <input
                      type="file"
                      id="video"
                      accept="video/*"
                      onChange={handleVideoUpload}
                      className="hidden"
                    />
                    <label
                      htmlFor="video"
                      className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Choose Video File
                    </label>
                    <p className="text-sm text-gray-500 mt-2">
                      MP4, MOV, or AVI files up to 100MB
                    </p>
                  </div>
                  {formData.video_url && (
                    <div className="mt-3">
                      <video
                        src={formData.video_url}
                        controls
                        className="w-full max-w-md rounded-lg"
                      />
                    </div>
                  )}
                </div>

                {/* Video URL (Alternative) */}
                <div>
                  <label
                    htmlFor="video_url"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Video URL (Alternative)
                  </label>
                  <input
                    type="url"
                    id="video_url"
                    name="video_url"
                    value={formData.video_url}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="https://example.com/video.mp4"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Use this if you have a direct video URL
                  </p>
                </div>

                {/* Duration */}
                <div>
                  <label
                    htmlFor="duration"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Duration
                  </label>
                  <input
                    type="text"
                    id="duration"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., 2:30"
                  />
                </div>

                {/* Category */}
                <div>
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select a category</option>
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                    <option value="Mobile">Mobile</option>
                    <option value="DevOps">DevOps</option>
                    <option value="AI/ML">AI/ML</option>
                    <option value="Design">Design</option>
                    <option value="Tutorial">Tutorial</option>
                    <option value="Tips">Tips</option>
                  </select>
                </div>

                {/* Tags */}
                <div>
                  <label
                    htmlFor="tags"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Tags
                  </label>
                  <input
                    type="text"
                    id="tags"
                    name="tags"
                    value={formData.tags}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="react, typescript, hooks (comma-separated)"
                  />
                </div>

                {/* Status and Featured */}
                <div className="flex items-center space-x-6">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="featured"
                      checked={formData.featured}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      Featured quick bite
                    </span>
                  </label>
                  <div>
                    <label
                      htmlFor="status"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Status
                    </label>
                    <select
                      id="status"
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className="px-4 py-2 border border-gray-300 rounded-lg"
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                    </select>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-4 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="flex items-center space-x-2 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <FaTimes />
                    <span>Cancel</span>
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <FaSave />
                    <span>{isLoading ? "Creating..." : "Create Quick Bite"}</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Preview */}
            {showPreview && (
              <div className="lg:col-span-1">
                <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Preview
                  </h3>
                  <div className="space-y-4">
                    {/* {formData.thumbnail_url && (
                      <Image
                        src={formData.thumbnail_url}
                        alt="Thumbnail"
                        width={300}
                        height={400}
                        className="w-full aspect-[9/16] object-cover rounded-lg"
                      />
                    )} */}
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {formData.title || "Untitled Quick Bite"}
                      </h4>
                      {formData.description && (
                        <p className="text-sm text-gray-600 mt-1">
                          {formData.description}
                        </p>
                      )}
                    </div>
                    {formData.category && (
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-1">
                          Category:
                        </p>
                        <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                          {formData.category}
                        </span>
                      </div>
                    )}
                    {formData.tags && (
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-1">
                          Tags:
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {formData.tags.split(",").map((tag) => (
                            <span
                              key={tag.trim()}
                              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                            >
                              {tag.trim()}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {formData.duration && (
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-1">
                          Duration: {formData.duration}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
};

export default CreateQuickBitePage;
