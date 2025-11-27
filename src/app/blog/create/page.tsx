"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "@/components/AdminLayout";
import { FaSave, FaTimes, FaEye, FaEyeSlash } from "react-icons/fa";
import apiClient from "@/lib/axios";
import Image from "next/image";
import ReactQuillEditor from "@/app/blog/ReactQuillEditor/ReactQuillEditor";
import { getCategories } from "@/lib/categoryApi";
import { slugify } from "@/lib/slugify";

interface FormData {
  title: string;
  slug: string;
  summary: string;
  coverImage: string;
  content: string;
  categories: string[];
  tags: string;
  published: boolean;
  featured: boolean;
  read_time: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

const CreateBlogPage: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    title: "",
    slug: "",
    summary: "",
    coverImage: "",
    content: "",
    categories: [],
    tags: "",
    published: false,
    featured: false,
    read_time: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    getCategories().then(res => setCategories(res.data));
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleCategoryChange = (category: string) => {
    setFormData((prev) => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category],
    }));
  };

  const handleCoverImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      // 1. Prepare form data for upload
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "unsigned_preset"); // Use your actual unsigned preset name

      // 2. Upload to Cloudinary
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dubvzmk7g/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();

      // 3. Set the short URL
      setFormData((prev) => ({
        ...prev,
        coverImage: typeof data.secure_url === "string" ? data.secure_url : "",
      }));
    }
  };

  // Auto-generate slug from title
  useEffect(() => {
    if (formData.title) {
      setFormData((prev) => ({ ...prev, slug: slugify(formData.title) }));
    }
  }, [formData.title]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const user = localStorage.getItem("user");
      const { coverImage, ...rest } = formData;
      const payload = {
        ...rest,
        cover_image: coverImage, // This is the direct image URL
        author: JSON.parse(user || "{}").name,
        author_id: JSON.parse(user || "{}").id,
        status: formData.published ? "published" : "draft",
        categories: formData.categories,
        tags: formData.tags.split(",").map((t) => t.trim()),
      };

      await apiClient.post("/blogs", payload);

      setIsLoading(false);
      router.push("/blog");
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
            `Failed to create blog (status ${error.response?.status})`
        );
      } else {
        alert("An unknown error occurred.");
      }
    }
  };

  const handleCancel = () => {
    router.push("/blog");
  };

  return (
    <AdminLayout adminName="John Doe">
      <div className="p-6 md:p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Create New Blog Post
            </h1>
            <p className="text-gray-600">Write and publish your next article</p>
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
                  placeholder="Enter your blog post title..."
                />
              </div>

              {/* Slug */}
              <div>
                <label
                  htmlFor="slug"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Slug
                </label>
                <input
                  type="text"
                  id="slug"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="auto-generated-slug"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Auto-generated from title. You can customize it.
                </p>
              </div>

              {/* Summary */}
              <div>
                <label
                  htmlFor="summary"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Summary *
                </label>
                <textarea
                  id="summary"
                  name="summary"
                  required
                  rows={3}
                  value={formData.summary}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Brief summary of your blog post..."
                />
              </div>

              {/* Cover Image */}
              <div>
                <label
                  htmlFor="coverImage"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Cover Image URL
                </label>
                <input
                  type="url"
                  id="coverImage"
                  name="coverImage"
                  value={formData.coverImage || ""}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="https://example.com/image.jpg"
                />
                <div className="mt-2">
                  <span className="block text-sm text-gray-500 mb-1">
                    Or upload an image:
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleCoverImageUpload}
                  />
                </div>
                {formData.coverImage &&
                  typeof formData.coverImage === "string" && (
                    <Image
                      src={formData.coverImage}
                      alt="Cover preview"
                      width={600}
                      height={200}
                      className="mt-3 h-32 w-full object-cover rounded-lg border"
                    />
                  )}
              </div>

              {/* Content */}
              <div>
                <label
                  htmlFor="content"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Content *
                </label>
                <ReactQuillEditor
                  value={formData.content}
                  onChange={(value) =>
                    setFormData((prev) => ({ ...prev, content: value }))
                  }
                />
              </div>

              {/* Categories */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Categories
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {categories.map((category) => (
                    <label
                      key={category.id}
                      className="flex items-center space-x-2"
                    >
                      <input
                        type="checkbox"
                        checked={formData.categories.includes(category.slug)}
                        onChange={() => handleCategoryChange(category.slug)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-700">{category.name}</span>
                    </label>
                  ))}
                </div>
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
                  placeholder="react, typescript, web-development (comma-separated)"
                />
              </div>

              {/* Read Time */}
              <div>
                <label
                  htmlFor="read_time"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Estimated Read Time
                </label>
                <input
                  type="text"
                  id="read_time"
                  name="read_time"
                  value={formData.read_time}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., 5 min read"
                />
              </div>

              {/* Toggles */}
              <div className="flex items-center space-x-6">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="published"
                    checked={formData.published}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Publish immediately
                  </span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Featured post
                  </span>
                </label>
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
                  <span>{isLoading ? "Saving..." : "Save Blog Post"}</span>
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
                  {formData.coverImage && (
                    <Image
                      src={formData.coverImage}
                      alt="Cover"
                      width={600}
                      height={200}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  )}
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {formData.title || "Untitled"}
                    </h4>
                    {formData.summary && (
                      <p className="text-sm text-gray-600 mt-1">
                        {formData.summary}
                      </p>
                    )}
                  </div>
                  {formData.categories.length > 0 && (
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-1">
                        Categories:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {formData.categories.map((category) => (
                          <span
                            key={category}
                            className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                          >
                            {category}
                          </span>
                        ))}
                      </div>
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
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default CreateBlogPage;
