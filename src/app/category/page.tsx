// src/app/category/page.tsx
"use client";
import React, { useEffect, useState } from "react";
import {
  getCategories,
  createCategory,
  deleteCategory,
} from "@/lib/categoryApi";
import { FaTrash, FaPlus, FaBlog } from "react-icons/fa";
import { Category } from "@/lib/constent";
import { useRouter } from "next/navigation";
import AdminLayout from "@/components/AdminLayout";

export default function CategoryPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();

  useEffect(() => {
    getCategories().then((res) => setCategories(res.data));
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    await createCategory({ name, slug, description });
    setName("");
    setSlug("");
    setDescription("");
    getCategories().then((res) => setCategories(res.data));
  };

  const handleDelete = async (id: string) => {
    if (confirm("Delete this category?")) {
      await deleteCategory(id);
      getCategories().then((res) => setCategories(res.data));
    }
  };

  return (
    <AdminLayout adminName="John Doe">
      <div className="mx-auto bg-white rounded-xl shadow-lg p-8">
        <button
          onClick={() => router.push("/blog")}
          className="mb-6 flex items-center gap-2 text-yellow-500 underline hover:text-yellow-600 bg-transparent px-0 py-0 rounded shadow-none"
          style={{ textDecoration: "underline" }}
        >
          <FaBlog />
          Go to Blog Manager
        </button>
        <h1 className="text-3xl font-bold mb-6 text-black-400">Categories</h1>
        <form
          onSubmit={handleCreate}
          className="flex flex-col md:flex-row gap-3 mb-8"
        >
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            required
            className="flex-1 px-3 py-2 rounded border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <input
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="Slug"
            required
            className="flex-1 px-3 py-2 rounded border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="flex-1 px-3 py-2 rounded border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <button
            type="submit"
            className="bg-yellow-400 text-gray-900 px-4 py-2 rounded hover:bg-yellow-500 flex items-center font-semibold"
          >
            <FaPlus className="mr-1" /> Add
          </button>
        </form>
        <hr className="mb-6" />
        <div className="max-h-64 overflow-y-auto">
          <ul className="space-y-2">
            {categories.length === 0 ? (
              <li className="text-gray-400 italic text-center py-8">
                No categories found.
              </li>
            ) : (
              categories.map((cat) => (
                <li
                  key={cat.id}
                  className="flex items-center justify-between px-4 py-3 rounded transition hover:bg-yellow-50"
                >
                  <div>
                    <span className="font-semibold text-gray-900">
                      {cat.name}
                    </span>
                    <span className="ml-2 text-gray-400">({cat.slug})</span>
                    {cat.description && (
                      <span className="ml-2 text-gray-900 text-sm">
                        {cat.description}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => cat.id && handleDelete(cat.id)}
                    className="text-red-400 hover:text-red-600"
                    title="Delete"
                  >
                    <FaTrash />
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </AdminLayout>
  );
}
