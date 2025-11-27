"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

interface BlogFormProps {
  initialData?: {
    id?: string;
    title: string;
    slug: string;
    summary: string;
    coverImage?: string;
    content: string;
    categories: string[];
    tags: string;
    published: boolean;
    read_time?: string;
    views?: number;
    featured?: boolean;
  };
}

const BlogForm: React.FC<BlogFormProps> = ({ initialData }) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    summary: initialData?.summary || "",
    coverImage: initialData?.coverImage || "",
    content: initialData?.content || "",
    categories: initialData?.categories || [],
    tags: initialData?.tags || "",
    published: initialData?.published || false,
    read_time: initialData?.read_time || "",
    views: initialData?.views ?? 0,
    featured: initialData?.featured || false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = Array.from(e.target.selectedOptions).map(
      (option) => option.value
    );
    setFormData((prev) => ({ ...prev, categories: selected }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // console.log("Submitted Data:", formData);
    // TODO: Firebase save logic
  };

  const handleCancel = () => {
    // console.log("Form cancelled");
    // TODO: navigate back
  };

  useEffect(() => {
    if (!initialData?.slug && formData.title) {
      const generatedSlug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
      setFormData((prev) => ({ ...prev, slug: generatedSlug }));
    }
  }, [formData.title, initialData?.slug]);

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">
        {initialData ? "Edit Blog Post" : "Create New Blog Post"}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            required
            value={formData.title}
            onChange={handleChange}
            className="mt-1 w-full border border-gray-300 rounded-md p-2 shadow-sm"
          />
        </div>

        {/* Slug */}
        <div>
          <label
            htmlFor="slug"
            className="block text-sm font-medium text-gray-700"
          >
            Slug
          </label>
          <input
            type="text"
            name="slug"
            id="slug"
            readOnly
            value={formData.slug}
            className="mt-1 w-full bg-gray-100 border border-gray-300 rounded-md p-2 shadow-sm"
          />
          <p className="text-sm text-gray-500 mt-1">
            Auto-generated from title.
          </p>
        </div>

        {/* Summary */}
        <div>
          <label
            htmlFor="summary"
            className="block text-sm font-medium text-gray-700"
          >
            Summary
          </label>
          <textarea
            name="summary"
            id="summary"
            rows={3}
            required
            value={formData.summary}
            onChange={handleChange}
            className="mt-1 w-full border border-gray-300 rounded-md p-2 shadow-sm"
          ></textarea>
        </div>

        {/* Cover Image */}
        <div>
          <label
            htmlFor="coverImage"
            className="block text-sm font-medium text-gray-700"
          >
            Cover Image URL
          </label>
          <input
            type="text"
            name="coverImage"
            id="coverImage"
            value={formData.coverImage}
            onChange={handleChange}
            className="mt-1 w-full border border-gray-300 rounded-md p-2 shadow-sm"
            placeholder="https://..."
          />
          {formData.coverImage && (
            <Image
              src={formData.coverImage}
              alt="Preview"
              width={256}
              height={128}
              className="mt-3 object-cover rounded-md border"
              style={{ height: "8rem", width: "auto" }}
            />
          )}
        </div>

        {/* Content */}
        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700"
          >
            Content
          </label>
          <textarea
            name="content"
            id="content"
            rows={10}
            required
            value={formData.content}
            onChange={handleChange}
            className="mt-1 w-full border border-gray-300 rounded-md p-2 shadow-sm"
          ></textarea>
          <p className="text-sm text-gray-500 mt-1">
            Markdown/Rich Editor can be added later.
          </p>
        </div>

        {/* Categories */}
        <div>
          <label
            htmlFor="categories"
            className="block text-sm font-medium text-gray-700"
          >
            Categories
          </label>
          <select
            multiple
            id="categories"
            name="categories"
            value={formData.categories}
            onChange={handleSelectChange}
            className="mt-1 w-full border border-gray-300 rounded-md p-2 shadow-sm"
          >
            <option value="ai">AI</option>
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
            <option value="ux">UX/UI</option>
            <option value="devops">DevOps</option>
          </select>
          <p className="text-sm text-gray-500 mt-1">
            Use Ctrl/Cmd + click to select multiple.
          </p>
        </div>

        {/* Tags */}
        <div>
          <label
            htmlFor="tags"
            className="block text-sm font-medium text-gray-700"
          >
            Tags
          </label>
          <input
            type="text"
            name="tags"
            id="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="e.g. react, firebase, hooks"
            className="mt-1 w-full border border-gray-300 rounded-md p-2 shadow-sm"
          />
        </div>

        {/* Read Time */}
        <div>
          <label
            htmlFor="read_time"
            className="block text-sm font-medium text-gray-700"
          >
            Estimated Read Time
          </label>
          <input
            type="text"
            name="read_time"
            id="read_time"
            value={formData.read_time}
            onChange={handleChange}
            placeholder="e.g. 5 min"
            className="mt-1 w-full border border-gray-300 rounded-md p-2 shadow-sm"
          />
        </div>

        {/* Views */}
        <div>
          <label
            htmlFor="views"
            className="block text-sm font-medium text-gray-700"
          >
            Views
          </label>
          <input
            type="number"
            name="views"
            id="views"
            value={formData.views}
            onChange={handleChange}
            className="mt-1 w-full border border-gray-300 rounded-md p-2 shadow-sm"
          />
        </div>

        {/* Published + Featured */}
        <div className="flex gap-6">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="published"
              checked={formData.published}
              onChange={handleToggleChange}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
            <span className="text-sm font-medium text-gray-700">Published</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="featured"
              checked={formData.featured}
              onChange={handleToggleChange}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
            <span className="text-sm font-medium text-gray-700">Featured</span>
          </label>
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition"
          >
            {initialData ? "Save Changes" : "Create Blog"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogForm;
