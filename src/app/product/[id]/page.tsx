"use client";
import React, { useEffect, useState } from "react";
import { getProduct, deleteProduct, Product } from "@/lib/productApi";
import AdminLayout from "@/components/AdminLayout";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import { FaEdit, FaTrash, FaArrowLeft } from "react-icons/fa";

export default function ProductDetailPage() {
  const [product, setProduct] = useState<Product | null>(null);
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getProduct(id as string).then((res) => setProduct(res.data));
    }
  }, [id]);

  const handleDelete = async () => {
    if (product && product.id && confirm("Delete this product?")) {
      await deleteProduct(product.id);
      router.push("/product");
    }
  };

  if (!product) {
    return (
      <AdminLayout adminName="Admin">
        <div className="text-center text-gray-400 py-12">Loading...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout adminName="Admin">
      <div className=" mx-auto bg-white rounded-2xl shadow-2xl p-8">
        <button
          onClick={() => router.push("/product")}
          className="mb-6 flex items-center gap-2 text-yellow-500 underline hover:text-yellow-600 bg-transparent px-0 py-0 rounded shadow-none"
        >
          <FaArrowLeft /> Back to Products
        </button>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col items-center">
            {product.image_url ? (
              <Image
                src={product.image_url}
                alt={product.name}
                width={200}
                height={200}
                className="w-48 h-48 object-cover rounded-xl border mb-4"
                unoptimized
              />
            ) : (
              <div className="w-48 h-48 flex items-center justify-center bg-gray-100 rounded-xl text-gray-400 mb-4">
                No Image
              </div>
            )}
            {product.gallery && product.gallery.length > 0 && (
              <div className="flex gap-2 flex-wrap mt-2">
                {product.gallery.map((url, idx) => (
                  <Image
                    key={idx}
                    src={url}
                    alt={`Gallery ${idx + 1}`}
                    width={48}
                    height={48}
                    className="w-12 h-12 object-cover rounded border"
                    unoptimized
                  />
                ))}
              </div>
            )}
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-2 text-gray-900">
              {product.name}
            </h1>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-lg font-bold text-gray-900">
                ₹{product.price}
              </span>
              {product.discount_price && (
                <span className="text-green-600 font-bold text-lg line-through">
                  ₹{product.discount_price}
                </span>
              )}
              {product.is_featured && (
                <span className="ml-2 px-2 py-1 bg-yellow-400 text-white rounded-full text-xs font-bold">
                  Featured
                </span>
              )}
              <span
                className={`ml-2 px-2 py-1 rounded-full text-xs font-semibold ${
                  product.status === "active"
                    ? "bg-green-100 text-green-700"
                    : product.status === "inactive"
                    ? "bg-gray-200 text-gray-500"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {product.status}
              </span>
            </div>
            <div className="mb-4 text-gray-600 italic">
              {product.short_description}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Stock:</span> {product.stock}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Category:</span>{" "}
              {product.category}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Brand:</span> {product.brand}
            </div>
            <div className="mb-2">
              <span className="font-semibold">SKU:</span> {product.sku}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Tags:</span>{" "}
              {product.tags?.length ? (
                <span className="flex flex-wrap gap-1">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </span>
              ) : (
                "-"
              )}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Dimensions:</span>{" "}
              {product.dimensions
                ? `${product.dimensions.width} x ${product.dimensions.height} x ${product.dimensions.depth}`
                : "-"}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Weight:</span> {product.weight}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Meta Title:</span>{" "}
              {product.meta_title}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Meta Description:</span>{" "}
              {product.meta_description}
            </div>
            <div className="mb-4">
              <span className="font-semibold">Description:</span>
              <div className="text-gray-700">{product.description}</div>
            </div>
            <div className="flex gap-3 mt-6">
              <Link
                href={`/product/edit/${product.id}`}
                className="text-blue-600 hover:underline flex items-center gap-1"
              >
                <FaEdit /> Edit
              </Link>
              <button
                onClick={handleDelete}
                className="text-red-500 hover:underline flex items-center gap-1"
              >
                <FaTrash /> Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
