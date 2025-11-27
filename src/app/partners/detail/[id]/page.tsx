"use client";
import React, { useEffect, useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import apiClient from "@/lib/axios";
import { useRouter, useParams } from "next/navigation";

interface PartnerData {
  id: string;
  fullName: string;
  company: string;
  email: string;
  phone: string;
  cityCountry: string;
  website: string;
  areaOfInterest: string[];
  productsOfInterest: string[];
  collaborationPlan: string;
  portfolio: string;
  created_at: string;
}

export default function PartnerDetailPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [partner, setPartner] = useState<PartnerData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPartner = async () => {
      try {
        const response = await apiClient.get(`/partners/${id}`);
        setPartner(response.data);
      } catch (error) {
        console.error("Error fetching partner:", error);
        setError("An error occurred while fetching partner details");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPartner();
    }
  }, [id]);

  if (loading) {
    return (
      <AdminLayout adminName="Admin">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-8 mt-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout adminName="Admin">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-8 mt-8">
          <div className="mb-6 rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error</h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>{error}</p>
                </div>
              </div>
            </div>
          </div>
          <button 
            onClick={() => router.push('/partners/list')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Back to Partners
          </button>
        </div>
      </AdminLayout>
    );
  }

  if (!partner) {
    return (
      <AdminLayout adminName="Admin">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-8 mt-8">
          <div className="text-center py-12">
            <div className="text-gray-500">Partner not found</div>
            <button 
              onClick={() => router.push('/partners/list')}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Back to Partners
            </button>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout adminName="Admin">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-8 mt-8">
        <div className="flex items-center mb-6">
          <button 
            onClick={() => router.push('/partners/list')}
            className="mr-4 text-gray-500 hover:text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Partner Details</h1>
        </div>

        <div className="bg-blue-50 rounded-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-blue-800">{partner.fullName}</h2>
              <p className="text-blue-700">{partner.company || "Independent Partner"}</p>
            </div>
            <div className="mt-4 md:mt-0">
              <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
                {partner.areaOfInterest.length > 0 ? partner.areaOfInterest[0] : "Partner"}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <svg className="w-5 h-5 text-gray-400 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                <div>
                  <div className="text-sm font-medium text-gray-500">Email</div>
                  <div className="text-gray-900">{partner.email}</div>
                </div>
              </div>

              <div className="flex items-start">
                <svg className="w-5 h-5 text-gray-400 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
                <div>
                  <div className="text-sm font-medium text-gray-500">Phone</div>
                  <div className="text-gray-900">{partner.phone}</div>
                </div>
              </div>

              <div className="flex items-start">
                <svg className="w-5 h-5 text-gray-400 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                <div>
                  <div className="text-sm font-medium text-gray-500">Location</div>
                  <div className="text-gray-900">{partner.cityCountry || "Not specified"}</div>
                </div>
              </div>

              {partner.website && (
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-gray-400 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path>
                  </svg>
                  <div>
                    <div className="text-sm font-medium text-gray-500">Website</div>
                    <div className="text-blue-600">
                      <a href={partner.website} target="_blank" rel="noopener noreferrer">
                        {partner.website}
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Interests</h3>
            <div className="space-y-6">
              <div>
                <div className="text-sm font-medium text-gray-500 mb-2">Area of Interest</div>
                <div className="flex flex-wrap gap-2">
                  {partner.areaOfInterest.length > 0 ? (
                    partner.areaOfInterest.map((interest: string, index: number) => (
                      <span key={index} className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                        {interest}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-500">Not specified</span>
                  )}
                </div>
              </div>

              <div>
                <div className="text-sm font-medium text-gray-500 mb-2">Products of Interest</div>
                <div className="flex flex-wrap gap-2">
                  {partner.productsOfInterest.length > 0 ? (
                    partner.productsOfInterest.map((product: string, index: number) => (
                      <span key={index} className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full">
                        {product}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-500">Not specified</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Collaboration Plan</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-700 whitespace-pre-wrap">{partner.collaborationPlan || "No collaboration plan provided"}</p>
          </div>
        </div>

        {partner.portfolio && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Portfolio / Brochure</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <a href={partner.portfolio} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                View Portfolio/Brochure (PDF)
              </a>
            </div>
          </div>
        )}

        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="text-sm text-gray-500">
            Submitted on {new Date(partner.created_at).toLocaleDateString()} at {new Date(partner.created_at).toLocaleTimeString()}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
