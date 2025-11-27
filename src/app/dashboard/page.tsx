"use client";

import React from "react";
import Link from "next/link";
import AdminLayout from "@/components/AdminLayout";
import StatsCard from "@/components/StatsCard";
import {
  FaBlog,
  FaEye,
  FaEdit,
  FaCalendarAlt,
  FaChartLine,
  FaPlus,
  FaVideo,
} from "react-icons/fa";
import ProtectedRoute from "@/components/ProtectedRoute";
import ClientReviews from "@/components/ClientReviews";

const DashboardPage: React.FC = () => {
  const stats = [
    {
      title: "Total Blogs",
      value: 24,
      icon: <FaBlog className="w-6 h-6" />,
      color: "blue" as const,
      change: { value: 12, isPositive: true },
    },
    {
      title: "Quick Bites",
      value: 8,
      icon: <FaVideo className="w-6 h-6" />,
      color: "purple" as const,
      change: { value: 3, isPositive: true },
    },
    {
      title: "Published",
      value: 18,
      icon: <FaEye className="w-6 h-6" />,
      color: "green" as const,
      change: { value: 8, isPositive: true },
    },
    {
      title: "This Month",
      value: 5,
      icon: <FaCalendarAlt className="w-6 h-6" />,
      color: "yellow" as const,
      change: { value: 15, isPositive: true },
    },
  ];

  const recentBlogs = [
    {
      id: "1",
      title: "Getting Started with React Hooks",
      author: "John Doe",
      status: "published" as const,
      createdDate: "2024-01-15",
      views: 1250,
    },
    {
      id: "2",
      title: "Advanced TypeScript Patterns",
      author: "Jane Smith",
      status: "draft" as const,
      createdDate: "2024-01-14",
      views: 0,
    },
    {
      id: "3",
      title: "Building Scalable APIs with Node.js",
      author: "Mike Johnson",
      status: "published" as const,
      createdDate: "2024-01-13",
      views: 890,
    },
  ];

  return (
    <ProtectedRoute>
      <AdminLayout adminName="John Doe">
        <div className="p-6 md:p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-dark mb-4 tracking-tight">
              Welcome to CodeCafe Admin Panel
            </h1>
            <p className="text-gray-500 mb-8">
              Manage your content and settings with ease.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <StatsCard key={index} {...stat} />
            ))}
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">
                Quick Actions
              </h2>
              <Link
                href="/blog/create"
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <FaPlus />
                <span>Create New Blog</span>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link
                href="/blog"
                className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <FaBlog className="text-blue-600 text-xl" />
                  <div>
                    <h3 className="font-medium text-gray-900">Manage Blogs</h3>
                    <p className="text-sm text-gray-600">
                      View and edit all blog posts
                    </p>
                  </div>
                </div>
              </Link>
              <Link
                href="/blog/create"
                className="p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <FaEdit className="text-green-600 text-xl" />
                  <div>
                    <h3 className="font-medium text-gray-900">
                      Write New Post
                    </h3>
                    <p className="text-sm text-gray-600">
                      Create a new blog article
                    </p>
                  </div>
                </div>
              </Link>
              <Link
                href="/quick-bites/create"
                className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <FaVideo className="text-purple-600 text-xl" />
                  <div>
                    <h3 className="font-medium text-gray-900">
                      Create Quick Bite
                    </h3>
                    <p className="text-sm text-gray-600">Upload a new video</p>
                  </div>
                </div>
              </Link>
              <Link
                href="/settings"
                className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <FaChartLine className="text-purple-600 text-xl" />
                  <div>
                    <h3 className="font-medium text-gray-900">
                      View Analytics
                    </h3>
                    <p className="text-sm text-gray-600">
                      Check blog performance
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* Recent Blogs */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Recent Blog Posts
              </h2>
              <Link
                href="/blog"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                View all
              </Link>
            </div>
            <div className="space-y-4">
              {recentBlogs.map((blog) => (
                <div
                  key={blog.id}
                  className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{blog.title}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                      <span>{blog.author}</span>
                      <span>•</span>
                      <span>
                        {new Date(blog.createdDate).toLocaleDateString()}
                      </span>
                      <span>•</span>
                      <span>{blog.views} views</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        blog.status === "published"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {blog.status}
                    </span>
                    <Link
                      href={`/blog/edit/${blog.id}`}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      Edit
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Client Reviews */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mt-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              What Our Clients Say
            </h2>
            <ClientReviews />
          </div>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
};

export default DashboardPage;
