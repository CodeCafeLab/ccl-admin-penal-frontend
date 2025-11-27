"use client";

import React from "react";
import {
  FaEdit,
  FaTrash,
  FaEye,
  FaCalendar,
  FaUser,
  FaStar,
} from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

interface BlogCardProps {
  id: string;
  title: string;
  author: string;
  status: "published" | "draft";
  createdDate?: string;
  createdAt?: string;
  views?: number;
  coverImage?: string;
  summary?: string;
  tags?: string[];
  featured?: boolean;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const BlogCard: React.FC<BlogCardProps> = ({
  id,
  title,
  author,
  status,
  createdDate,
  createdAt,
  views = 0,
  coverImage,
  summary,
  tags = [],
  featured,
  onEdit,
  onDelete,
}) => {
  const displayDate = createdAt || createdDate || "";

  return (
    <Link href={`/blog/detailPage/${id}`} className="block group">
      <div className="rounded-2xl shadow-lg overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-2xl flex flex-col cursor-pointer">
        {/* Cover Image */}
        {coverImage && (
          <div className="relative aspect-[16/9] bg-gray-200">
            <Image
              src={coverImage}
              alt={title}
              fill
              className="transition-opacity duration-300 group-hover:opacity-90"
              sizes="100vw"
            />
            {featured && (
              <span className="absolute top-3 left-3 bg-yellow-400 text-xs font-bold px-3 py-1 rounded-full shadow text-white flex items-center gap-1">
                <FaStar className="text-white" /> Featured
              </span>
            )}
            <span
              className={`absolute top-3 right-3 px-2 py-1 text-xs font-semibold rounded-full shadow
              ${
                status === "published"
                  ? "bg-green-100 text-green-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {status}
            </span>
          </div>
        )}

        {/* Card Content */}
        <div className="flex-1 flex flex-col p-5">
          {/* Title */}
          <h3 className="text-xl font-bold mb-2 line-clamp-2">{title}</h3>

          {/* Meta Info */}
          <div className="flex items-center text-xs text-gray-500 mb-2 gap-4">
            <span className="flex items-center gap-1">
              <FaUser /> {author}
            </span>
            <span className="flex items-center gap-1">
              <FaCalendar />{" "}
              {displayDate ? new Date(displayDate).toLocaleDateString() : ""}
            </span>
            <span className="flex items-center gap-1">
              <FaEye /> {views}
            </span>
          </div>

          {/* Summary */}
          {summary && (
            <p className="text-gray-700 text-sm mb-3 line-clamp-3">{summary}</p>
          )}

          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="mt-auto flex gap-2">
            <button
              onClick={() => onEdit?.(id)}
              className="flex items-center gap-1 px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
              title="Edit"
            >
              <FaEdit />
              <span className="hidden sm:inline">Edit</span>
            </button>
            <button
              onClick={() => onDelete?.(id)}
              className="flex items-center gap-1 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors"
              title="Delete"
            >
              <FaTrash />
              <span className="hidden sm:inline">Delete</span>
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
