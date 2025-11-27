"use client";

import React, { useState } from "react";
import {
  FaPlay,
  // FaPause,
  FaHeart,
  FaEye,
  FaEdit,
  FaTrash,
  FaStar,
  FaClock,
} from "react-icons/fa";
// import Image from "next/image";
import { QuickBite } from "@/lib/quickBiteApi";

interface QuickBiteCardProps {
  quickBite: QuickBite;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onLike?: (id: string) => void;
}

const QuickBiteCard: React.FC<QuickBiteCardProps> = ({
  quickBite,
  onEdit,
  onDelete,
  onLike,
}) => {
  const [isLiked, setIsLiked] = useState(false);



  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
    onLike?.(quickBite.id);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onEdit?.(quickBite.id);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this Quick Bite?")) {
      onDelete?.(quickBite.id);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-2xl">
      {/* Video Section */}
      <div className="relative aspect-[9/16] bg-gray-900 group cursor-pointer">
        {quickBite.video_url ? (
          <video
            src={quickBite.video_url}
            controls
            className="object-cover w-full h-full"
            style={{ aspectRatio: "9/16" }}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
            <FaPlay className="text-white text-4xl opacity-50" />
          </div>
        )}

        {/* Status Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {quickBite.featured && (
            <span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full shadow flex items-center gap-1">
              <FaStar className="text-xs" /> Featured
            </span>
          )}
          <span
            className={`text-xs font-semibold px-2 py-1 rounded-full shadow ${
              quickBite.status === "published"
                ? "bg-green-100 text-green-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {quickBite.status}
          </span>
        </div>

        {/* Duration */}
        <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
          <FaClock className="text-xs" />
          {quickBite.duration}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4">
        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
          {quickBite.title}
        </h3>

        {/* Description */}
        {quickBite.description && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {quickBite.description}
          </p>
        )}

        {/* Meta Info */}
        <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
          <span className="font-medium">{quickBite.author}</span>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <FaEye /> {quickBite.views}
            </span>
            <span className="flex items-center gap-1">
              <FaHeart /> {quickBite.likes}
            </span>
          </div>
        </div>

        {/* Category and Tags */}
        <div className="mb-4">
          {quickBite.category && (
            <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mr-2 mb-2">
              {quickBite.category}
            </span>
          )}
          {quickBite.tags?.map((tag) => (
            <span
              key={tag}
              className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full mr-2 mb-2"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex gap-2">
            <button
              onClick={handleLike}
              className={`flex items-center gap-1 px-3 py-2 text-sm rounded-md transition-colors ${
                isLiked
                  ? "text-red-600 bg-red-50"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
              title="Like"
            >
              <FaHeart className={isLiked ? "fill-current" : ""} />
              <span className="hidden sm:inline">Like</span>
            </button>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleEdit}
              className="flex items-center gap-1 px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
              title="Edit"
            >
              <FaEdit />
              <span className="hidden sm:inline">Edit</span>
            </button>
            <button
              onClick={handleDelete}
              className="flex items-center gap-1 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors"
              title="Delete"
            >
              <FaTrash />
              <span className="hidden sm:inline">Delete</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickBiteCard; 