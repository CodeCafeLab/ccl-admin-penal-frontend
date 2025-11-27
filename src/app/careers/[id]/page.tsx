"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import AdminLayout from "@/components/AdminLayout";
import { getCareer, deleteCareer, Career } from "@/lib/careerApi";
import {
  FaArrowLeft,
  FaEdit,
  FaTrash,
  FaBriefcase,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaStar,
  FaEye,
} from "react-icons/fa";

const CareerDetailPage: React.FC = () => {
  const { id } = useParams();
  const router = useRouter();
  const [career, setCareer] = useState<Career | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchCareer = async () => {
        try {
          setIsLoading(true);
          const response = await getCareer(id as string);
          setCareer(response.data);
        } catch (error) {
          console.error("Error fetching career:", error);
          alert("Failed to fetch career details");
        } finally {
          setIsLoading(false);
        }
      };
      fetchCareer();
    }
  }, [id]);

  const handleEdit = () => {
    router.push(`/careers/edit/${id}`);
  };

  const handleDelete = async () => {
    if (
      confirm(
        "Are you sure you want to delete this career? This action cannot be undone."
      )
    ) {
      try {
        setIsDeleting(true);
        await deleteCareer(id as string);
        router.push("/careers");
      } catch (error) {
        console.error("Error deleting career:", error);
        alert("Failed to delete career");
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-gray-100 text-gray-800";
      case "draft":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "full-time":
        return "bg-blue-100 text-blue-800";
      case "part-time":
        return "bg-purple-100 text-purple-800";
      case "contract":
        return "bg-orange-100 text-orange-800";
      case "internship":
        return "bg-pink-100 text-pink-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getExperienceLevelColor = (level: string) => {
    switch (level) {
      case "entry":
        return "bg-green-100 text-green-800";
      case "mid":
        return "bg-blue-100 text-blue-800";
      case "senior":
        return "bg-purple-100 text-purple-800";
      case "lead":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (isLoading) {
    return (
      <AdminLayout adminName="John Doe">
        <div className="p-6 md:p-8 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
          <div className="text-center py-12">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading career details...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (!career) {
    return (
      <AdminLayout adminName="John Doe">
        <div className="p-6 md:p-8 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Career Not Found
            </h2>
            <p className="text-gray-600 mb-6">
              The career youre looking for doesnt exist or has been removed.
            </p>
            <button
              onClick={() => router.push("/careers")}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Back to Careers
            </button>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout adminName="John Doe">
      <div className="p-6 md:p-8 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.push("/careers")}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <FaArrowLeft />
              <span>Back to Careers</span>
            </button>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={handleEdit}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <FaEdit />
              <span>Edit</span>
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
            >
              <FaTrash />
              <span>{isDeleting ? "Deleting..." : "Delete"}</span>
            </button>
          </div>
        </div>

        {/* Career Details */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-4">{career.title}</h1>
                <div className="flex items-center space-x-4 mb-4">
                  <span
                    className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(
                      career.status
                    )}`}
                  >
                    {career.status.charAt(0).toUpperCase() +
                      career.status.slice(1)}
                  </span>
                  <span
                    className={`px-3 py-1 text-sm font-medium rounded-full ${getTypeColor(
                      career.type
                    )}`}
                  >
                    {career.type.charAt(0).toUpperCase() + career.type.slice(1)}
                  </span>
                  <span
                    className={`px-3 py-1 text-sm font-medium rounded-full ${getExperienceLevelColor(
                      career.experience_level
                    )}`}
                  >
                    {career.experience_level.charAt(0).toUpperCase() +
                      career.experience_level.slice(1)}{" "}
                    Level
                  </span>
                  {career.featured && (
                    <span className="px-3 py-1 text-sm font-medium rounded-full bg-yellow-100 text-yellow-800">
                      <FaStar className="inline mr-1" />
                      Featured
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-8">
            {/* Key Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="flex items-center space-x-3">
                <FaBriefcase className="text-blue-600 text-xl" />
                <div>
                  <p className="text-sm text-gray-500">Department</p>
                  <p className="font-semibold text-gray-900">
                    {career.department}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <FaMapMarkerAlt className="text-blue-600 text-xl" />
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-semibold text-gray-900">
                    {career.location}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <FaMoneyBillWave className="text-blue-600 text-xl" />
                <div>
                  <p className="text-sm text-gray-500">Salary Range</p>
                  <p className="font-semibold text-gray-900">
                    ₹{career.salary_min?.toLocaleString()} - ₹
                    {career.salary_max?.toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <FaEye className="text-blue-600 text-xl" />
                <div>
                  <p className="text-sm text-gray-500">Views</p>
                  <p className="font-semibold text-gray-900">{career.views}</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Job Description
              </h3>
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-gray-700 whitespace-pre-wrap">
                  {career.description}
                </p>
              </div>
            </div>

            {/* Requirements */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Requirements
              </h3>
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-gray-700 whitespace-pre-wrap">
                  {career.requirements}
                </p>
              </div>
            </div>

            {/* Responsibilities */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Responsibilities
              </h3>
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-gray-700 whitespace-pre-wrap">
                  {career.responsibilities}
                </p>
              </div>
            </div>

            {/* Benefits */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Benefits
              </h3>
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-gray-700 whitespace-pre-wrap">
                  {career.benefits}
                </p>
              </div>
            </div>

            {/* Tags */}
            {career.tags && career.tags.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Skills & Technologies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {career.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Additional Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Job Details
                </h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>
                    <span className="font-medium">Type:</span> {career.type}
                  </p>
                  <p>
                    <span className="font-medium">Experience Level:</span>{" "}
                    {career.experience_level}
                  </p>
                  <p>
                    <span className="font-medium">Applications:</span>{" "}
                    {career.applications_count}
                  </p>
                  <p>
                    <span className="font-medium">Created:</span>{" "}
                    {career.created_at
                      ? new Date(career.created_at).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Quick Actions
                </h3>
                <div className="space-y-2">
                  <button
                    onClick={handleEdit}
                    className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <FaEdit />
                    <span>Edit Career</span>
                  </button>
                  <button
                    onClick={() => router.push("/careers")}
                    className="w-full flex items-center justify-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    <FaArrowLeft />
                    <span>Back to List</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default CareerDetailPage;
