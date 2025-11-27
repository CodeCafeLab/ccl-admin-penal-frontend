"use client";
import React, { useEffect, useState } from "react";
import { getProducts, deleteProduct, Product } from "@/lib/productApi";
import AdminLayout from "@/components/AdminLayout";
import Link from "next/link";
import { FaPlus, FaEdit, FaTrash, FaBoxOpen } from "react-icons/fa";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    const res = await getProducts();
    setProducts(res.data);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Delete this product?")) {
      await deleteProduct(id);
      fetchProducts();
    }
  };

  return (
    <AdminLayout adminName="Admin">
      <div className="p-6 md:p-8 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <FaBoxOpen className="text-yellow-500" /> Product Management
          </h1>
          <Link
            href="/product/create"
            className="flex items-center space-x-2 bg-yellow-400 text-gray-900 px-6 py-3 rounded-lg hover:bg-yellow-500 font-semibold transition-colors"
          >
            <FaPlus />
            <span>Add Product</span>
          </Link>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          {loading ? (
            <div className="text-center text-gray-400 py-12">Loading...</div>
          ) : products.length === 0 ? (
            <div className="text-center text-gray-400 py-12">No products found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200 rounded-lg">
                <thead>
                  <tr className="bg-gray-100 text-gray-700">
                    <th className="px-4 py-2 text-left">Image</th>
                    <th className="px-4 py-2 text-left">Name</th>
                    <th className="px-4 py-2 text-left">Price</th>
                    <th className="px-4 py-2 text-left">Stock</th>
                    <th className="px-4 py-2 text-left">Status</th>
                    <th className="px-4 py-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((prod) => (
                    <tr key={prod.id} className="border-t hover:bg-yellow-50 transition">
                      <td className="px-4 py-2">
                        {prod.image_url ? (
                          <Image
                            src={prod.image_url}
                            alt={prod.name}
                            width={48}
                            height={48}
                            className="w-12 h-12 object-cover rounded"
                            unoptimized
                          />
                        ) : (
                          <span className="text-gray-400">No Image</span>
                        )}
                      </td>
                      <td className="px-4 py-2 font-semibold">{prod.name}</td>
                      <td className="px-4 py-2 font-bold text-gray-900">₹{prod.price}</td>
                      <td className="px-4 py-2">{prod.stock ?? 0}</td>
                      <td className="px-4 py-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            prod.status === "active"
                              ? "bg-green-100 text-green-700"
                              : prod.status === "inactive"
                              ? "bg-gray-200 text-gray-500"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {prod.status}
                        </span>
                      </td>
                      <td className="px-4 py-2 flex gap-2">
                        <button
                          onClick={() => router.push(`/product/${prod.id}`)}
                          className="text-blue-600 hover:underline flex items-center gap-1"
                        >
                          <FaEdit /> Edit
                        </button>
                        <button
                          onClick={() => handleDelete(prod.id!)}
                          className="text-red-500 hover:underline flex items-center gap-1"
                        >
                          <FaTrash /> Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
