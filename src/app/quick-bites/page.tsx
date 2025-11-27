"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import AdminLayout from "@/components/AdminLayout";
import QuickBiteCard from "@/components/QuickBiteCard";
import { FaPlus, FaSearch, FaFilter, FaVideo } from "react-icons/fa";
import { getQuickBites, deleteQuickBite, likeQuickBite, QuickBite } from "@/lib/quickBiteApi";
import { useRouter } from "next/navigation";

const QuickBitesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft">("all");
  const [quickBites, setQuickBites] = useState<QuickBite[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchQuickBites();
  }, []);

  const fetchQuickBites = async () => {
    try {
      setIsLoading(true);
      const response = await getQuickBites();
      setQuickBites(response.data);
    } catch (error) {
      console.error("Error fetching quick bites:", error);
      setQuickBites([]);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredQuickBites = quickBites.filter((quickBite) => {
    const matchesSearch =
      quickBite.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quickBite.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quickBite.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quickBite.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesStatus =
      statusFilter === "all" || quickBite.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleEdit = (id: string) => {
    router.push(`/quick-bites/edit/${id}`);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteQuickBite(id);
      fetchQuickBites(); // Refresh the list
    } catch (error) {
      console.error("Error deleting quick bite:", error);
      alert("Failed to delete quick bite");
    }
  };

  const handleLike = async (id: string) => {
    try {
      await likeQuickBite(id);
      fetchQuickBites(); // Refresh to get updated like count
    } catch (error) {
      console.error("Error liking quick bite:", error);
    }
  };

  // const categories = Array.from(
  //   new Set(quickBites.map((qb) => qb.category).filter(Boolean))
  // );

  return (
    <AdminLayout adminName="John Doe">
      <div className="p-6 md:p-8 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Featured Quick Bites
            </h1>
            <p className="text-gray-600">
              Manage your reel-style videos and short-form content
            </p>
          </div>
          <Link
            href="/quick-bites/create"
            className="mt-4 sm:mt-0 flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FaPlus />
            <span>Create New Quick Bite</span>
          </Link>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
            <div className="flex-1">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search quick bites by title, description, or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <FaFilter className="text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as "all" | "published" | "draft")}
                className="px-4 py-2 border border-gray-300 rounded-lg"
              >
                <option value="all">All Status</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>
        
          </div>
        </div>

        {/* Quick Bites Grid */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading quick bites...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredQuickBites.map((quickBite) => (
              <QuickBiteCard
                key={quickBite.id}
                quickBite={quickBite}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onLike={handleLike}
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && filteredQuickBites.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaVideo className="text-gray-400 text-xl" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No quick bites found
            </h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || statusFilter !== "all"
                ? "Try adjusting your search or filter criteria."
                : "Get started by creating your first quick bite video."}
            </p>
            {!searchTerm && statusFilter === "all" && (
              <Link
                href="/quick-bites/create"
                className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <FaPlus />
                <span>Create Your First Quick Bite</span>
              </Link>
            )}
          </div>
        )}

        {/* Stats */}
        {!isLoading && quickBites.length > 0 && (
          <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {quickBites.length}
                </div>
                <div className="text-sm text-gray-600">Total Quick Bites</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {quickBites.filter((qb) => qb.status === "published").length}
                </div>
                <div className="text-sm text-gray-600">Published</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">
                  {quickBites.filter((qb) => qb.featured).length}
                </div>
                <div className="text-sm text-gray-600">Featured</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {quickBites.reduce((total, qb) => total + qb.views, 0)}
                </div>
                <div className="text-sm text-gray-600">Total Views</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default QuickBitesPage; 