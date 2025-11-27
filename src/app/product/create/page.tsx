"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "@/components/AdminLayout";
import { createProduct, Product } from "@/lib/productApi";
import { FaSave, FaTimes } from "react-icons/fa";
import Image from "next/image";

const defaultDimensions = { width: 0, height: 0, depth: 0 };

export default function CreateProductPage() {
  const router = useRouter();
  const [form, setForm] = useState<Product>({
    name: "",
    slug: "",
    short_description: "",
    description: "",
    price: 0,
    discount_price: 0,
    image_url: "",
    gallery: [],
    stock: 0,
    sku: "",
    brand: "",
    category: "",
    tags: [],
    status: "active",
    is_featured: false,
    weight: 0,
    dimensions: defaultDimensions,
    meta_title: "",
    meta_description: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  // Handle main image upload
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

  // Handle gallery image upload (multiple)
  const handleGalleryUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const urls: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const formData = new FormData();
        formData.append("file", files[i]);
        formData.append("upload_preset", "unsigned_preset");
        const res = await fetch(
          "https://api.cloudinary.com/v1_1/dubvzmk7g/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await res.json();
        urls.push(data.secure_url);
      }
      setForm((f) => ({ ...f, gallery: [...(f.gallery || []), ...urls] }));
    }
  };

  // Auto-generate slug from name
  React.useEffect(() => {
    if (form.name) {
      const slug = form.name
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim();
      setForm((prev) => ({ ...prev, slug }));
    }
  }, [form.name]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    if (name === "is_featured") {
      setForm((prev) => ({ ...prev, is_featured: checked }));
    } else if (name === "tags") {
      setForm((prev) => ({
        ...prev,
        tags: value
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
      }));
    } else if (["width", "height", "depth"].includes(name)) {
      setForm((prev) => ({
        ...prev,
        dimensions: {
          width: name === "width" ? Number(value) : prev.dimensions?.width ?? 0,
          height:
            name === "height" ? Number(value) : prev.dimensions?.height ?? 0,
          depth: name === "depth" ? Number(value) : prev.dimensions?.depth ?? 0,
        },
      }));
    } else if (type === "number") {
      setForm((prev) => ({ ...prev, [name]: Number(value) }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleRemoveGalleryImage = (url: string) => {
    setForm((prev) => ({
      ...prev,
      gallery: (prev.gallery || []).filter((img) => img !== url),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await createProduct(form);
      setIsLoading(false);
      router.push("/product");
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      alert("Failed to create product.");
    }
  };

  const handleCancel = () => {
    router.push("/product");
  };

  return (
    <AdminLayout adminName="Admin">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8 mt-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">Add Product</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name & Slug */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name *
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="Product Name"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Slug
              </label>
              <input
                name="slug"
                value={form.slug}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                placeholder="auto-generated-slug"
                readOnly
              />
            </div>
          </div>
          {/* Short Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Short Description
            </label>
            <input
              name="short_description"
              value={form.short_description || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Short summary"
            />
          </div>
          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={form.description || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Product description"
              rows={3}
            />
          </div>
          {/* Price, Discount, Stock */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price *
              </label>
              <input
                name="price"
                type="number"
                min={0}
                value={form.price}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="0"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Discount Price
              </label>
              <input
                name="discount_price"
                type="number"
                min={0}
                value={form.discount_price || 0}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="0"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Stock
              </label>
              <input
                name="stock"
                type="number"
                min={0}
                value={form.stock || 0}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="0"
              />
            </div>
          </div>
          {/* SKU, Brand, Category */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                SKU
              </label>
              <input
                name="sku"
                value={form.sku || ""}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="SKU"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Brand
              </label>
              <input
                name="brand"
                value={form.brand || ""}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="Brand"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <input
                name="category"
                value={form.category || ""}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="Category"
              />
            </div>
          </div>
          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tags (comma separated)
            </label>
            <input
              name="tags"
              value={form.tags?.join(", ") || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="tag1, tag2"
            />
          </div>
          {/* Status, Featured */}
          <div className="flex gap-4 items-center">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="draft">Draft</option>
              </select>
            </div>
            <div className="flex items-center gap-2 mt-6">
              <input
                type="checkbox"
                name="is_featured"
                checked={!!form.is_featured}
                onChange={handleChange}
                className="h-4 w-4 text-yellow-500 border-gray-300 rounded"
              />
              <label className="text-sm text-gray-700">Featured</label>
            </div>
          </div>
          {/* Weight, Dimensions */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Weight (kg)
              </label>
              <input
                name="weight"
                type="number"
                min={0}
                value={form.weight || 0}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="0"
              />
            </div>
            <div className="flex-1 flex gap-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Width
                </label>
                <input
                  name="width"
                  type="number"
                  min={0}
                  value={form.dimensions?.width || 0}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Height
                </label>
                <input
                  name="height"
                  type="number"
                  min={0}
                  value={form.dimensions?.height || 0}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Depth
                </label>
                <input
                  name="depth"
                  type="number"
                  min={0}
                  value={form.dimensions?.depth || 0}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="0"
                />
              </div>
            </div>
          </div>
          {/* Meta Title/Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Meta Title
            </label>
            <input
              name="meta_title"
              value={form.meta_title || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="SEO Title"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Meta Description
            </label>
            <textarea
              name="meta_description"
              value={form.meta_description || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="SEO Description"
              rows={2}
            />
          </div>
          {/* Main Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
            {form.image_url && (
              <div className="mt-2">
                <Image
                  src={form.image_url}
                  alt="Product Preview"
                  width={96}
                  height={96}
                  className="w-24 h-24 object-cover rounded border"
                  unoptimized
                />
              </div>
            )}
          </div>
          {/* Gallery Images */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Gallery Images
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleGalleryUpload}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
            {form.gallery && form.gallery.length > 0 && (
              <div className="flex gap-2 mt-2 flex-wrap">
                {form.gallery.map((url) => (
                  <div key={url} className="relative">
                    <Image
                      src={url}
                      alt="Gallery"
                      width={64}
                      height={64}
                      className="w-16 h-16 object-cover rounded border"
                      unoptimized
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveGalleryImage(url)}
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* Actions */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100"
            >
              <FaTimes /> Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="bg-yellow-400 text-gray-900 px-6 py-2 rounded font-semibold hover:bg-yellow-500 transition flex items-center gap-2"
            >
              <FaSave />
              {isLoading ? "Saving..." : "Save Product"}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
