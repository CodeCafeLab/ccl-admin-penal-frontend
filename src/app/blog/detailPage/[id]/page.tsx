"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getBlog } from "@/lib/blogApi";
import { BlogPost } from "@/lib/constent";
import Image from "next/image";

export default function BlogDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [blog, setBlog] = useState<BlogPost | null>(null);

  useEffect(() => {
    if (id) {
      getBlog(id as string).then((res) => {
        setBlog(Array.isArray(res.data) ? res.data[0] : res.data);
      });
    }
  }, [id]);

  if (!blog)
    return (
      <div className="text-center py-20 text-gray-400 text-lg animate-pulse">
        Loading blog post...
      </div>
    );

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto animate-fade-in">
        <button
          onClick={() => router.back()}
          className="mb-6 inline-flex items-center text-sm text-[var(--accent)] hover:underline transition"
        >
          ← Back to Blogs
        </button>

        <div className="bg-[var(--card-bg)] rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row gap-0 md:gap-8">
          {blog.coverImage && (
            <div className="relative w-full md:w-1/2 h-64 md:h-auto">
              <Image
                src={blog.coverImage}
                alt="Cover"
                fill
                className="p-20 w-full h-full md:rounded-l-3xl"
                sizes="(min-width: 768px) 50vw, 100vw"
                priority
              />
            </div>
          )}

          <div className="p-8 sm:p-10 flex-1 bg-white md:rounded-r-3xl">
            <h1 className="text-4xl font-extrabold text-[var(--accent)] mb-4 leading-tight">
              {blog.title}
            </h1>

            <div className="flex items-center gap-4 text-sm text-gray-600 mb-6 flex-wrap">
              <span className="font-semibold">{blog.author}</span>
              <span>•</span>
              <span>
                {blog.createdAt
                  ? new Date(blog.createdAt).toLocaleDateString()
                  : ""}
              </span>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {Array.isArray(blog.category)
                ? blog.category.map((cat) => (
                    <span
                      key={typeof cat === "string" ? cat : cat.id}
                      className="bg-yellow-100 text-[var(--accent)] px-3 py-1 rounded-full text-xs font-medium"
                    >
                      {typeof cat === "string" ? cat : cat.name}
                    </span>
                  ))
                : blog.category && (
                    <span className="bg-yellow-100 text-[var(--accent)] px-3 py-1 rounded-full text-xs font-medium">
                      {blog.category}
                    </span>
                  )}
              {Array.isArray(blog.tags) &&
                blog.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-gray-200 text-[var(--accent)] px-3 py-1 rounded-full text-xs font-medium"
                  >
                    #{tag}
                  </span>
                ))}
            </div>

            {blog.summary && (
              <p className="text-gray-700 text-lg mb-8 italic border-l-4 border-[var(--accent)] pl-4">
                {blog.summary}
              </p>
            )}

            <hr className="my-8 border-[var(--border)]" />

            <div
              className="prose prose-lg max-w-none prose-invert"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
