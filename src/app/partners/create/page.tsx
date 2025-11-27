"use client";
import React, { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { useRouter } from "next/navigation";
import apiClient from "@/lib/axios";

interface PartnerRequest {
  fullName: string;
  company: string;
  email: string;
  phone: string;
  cityCountry: string;
  website: string;
  areaOfInterest: string[];
  productsOfInterest: string[];
  collaborationPlan: string;
  portfolio: string | File | null;
}

export default function CreatePartnerPage() {
  const router = useRouter();
  
  // Form state
  const [form, setForm] = useState<PartnerRequest>({
    fullName: "",
    company: "",
    email: "",
    phone: "",
    cityCountry: "",
    website: "",
    areaOfInterest: [],
    productsOfInterest: [],
    collaborationPlan: "",
    portfolio: null,
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [errors, setErrors] = useState<string[]>([]);

  // Area of Interest options
  const areaOfInterestOptions = [
    "Referral Partner",
    "Reseller",
    "Technical/Integration Partner",
    "Affiliate / Influencer"
  ];

  // Products of Interest options
  const productsOfInterestOptions = [
    "AI Call Automation",
    "WhatsApp Automation",
    "CRM / ERP",
    "Car Wash App",
    "Grocery Delivery",
    "Custom Development"
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, category: 'areaOfInterest' | 'productsOfInterest') => {
    const { value, checked } = e.target;
    if (checked) {
      setForm({ ...form, [category]: [...form[category], value] });
    } else {
      setForm({ ...form, [category]: form[category].filter(item => item !== value) });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors([]);
    setSuccess(null);

    try {
      // Prepare the data to send
      const requestData = {
        fullName: form.fullName,
        company: form.company,
        email: form.email,
        phone: form.phone,
        cityCountry: form.cityCountry,
        website: form.website,
        areaOfInterest: form.areaOfInterest,
        productsOfInterest: form.productsOfInterest,
        collaborationPlan: form.collaborationPlan,
        portfolio: typeof form.portfolio === 'string' ? form.portfolio : ''
      };

      const response = await apiClient.post('/partners', requestData);

      if (response.status === 201) {
        setSuccess("Thank you! Your partnership request has been submitted successfully. Our team will contact you within 48 hours for onboarding and discussion. We're excited to partner with you!");

        // Reset form
        setForm({
          fullName: "",
          company: "",
          email: "",
          phone: "",
          cityCountry: "",
          website: "",
          areaOfInterest: [],
          productsOfInterest: [],
          collaborationPlan: "",
          portfolio: null,
        });
        
        // Redirect to partners list after 2 seconds
        setTimeout(() => {
          router.push('/partners/list');
        }, 2000);
      } else {
        setErrors([response.data.message || "Failed to submit request"]);
      }
    } catch (error) {
      console.error("Error submitting partner request:", error);
      setErrors(["An error occurred while submitting your request. Please try again."]);
    }
    setLoading(false);
  };

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
          <h1 className="text-3xl font-bold text-gray-900">Create Partner</h1>
        </div>

        <div className="bg-blue-50 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-blue-800 mb-2">
            Join the CodeCafe Lab Partner Network
          </h2>
          <p className="text-blue-700">
            Become a part of our growing ecosystem and unlock new opportunities for collaboration and growth.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                required
                value={form.fullName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                Company / Brand (if any)
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={form.company}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your company/brand name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your email address"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                WhatsApp / Phone *
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                required
                value={form.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your phone number"
              />
            </div>

            <div>
              <label htmlFor="cityCountry" className="block text-sm font-medium text-gray-700 mb-1">
                City & Country
              </label>
              <input
                type="text"
                id="cityCountry"
                name="cityCountry"
                value={form.cityCountry}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your city and country"
              />
            </div>

            <div>
              <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
                Website / LinkedIn (optional)
              </label>
              <input
                type="text"
                id="website"
                name="website"
                value={form.website}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your website or LinkedIn profile"
              />
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Area of Interest (select multiple)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {areaOfInterestOptions.map((option) => (
                <div key={option} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`area-${option}`}
                    value={option}
                    checked={form.areaOfInterest.includes(option)}
                    onChange={(e) => handleCheckboxChange(e, 'areaOfInterest')}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor={`area-${option}`} className="ml-2 block text-sm text-gray-700">
                    {option}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Products you are interested in promoting (select)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {productsOfInterestOptions.map((option) => (
                <div key={option} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`product-${option}`}
                    value={option}
                    checked={form.productsOfInterest.includes(option)}
                    onChange={(e) => handleCheckboxChange(e, 'productsOfInterest')}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor={`product-${option}`} className="ml-2 block text-sm text-gray-700">
                    {option}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <label htmlFor="collaborationPlan" className="block text-sm font-medium text-gray-700 mb-1">
              How do you plan to collaborate? (Short description) *
            </label>
            <textarea
              id="collaborationPlan"
              name="collaborationPlan"
              required
              value={form.collaborationPlan}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Describe your collaboration plan..."
            ></textarea>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <label htmlFor="portfolio" className="block text-sm font-medium text-gray-700 mb-1">
              Upload Portfolio / Brochure (Optional)
            </label>
            <input
              type="file"
              id="portfolio"
              name="portfolio"
              accept="application/pdf"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (file) {
                  // Upload to Cloudinary
                  const formData = new FormData();
                  formData.append("file", file);
                  formData.append("upload_preset", "unsigned_preset");
                  formData.append("resource_type", "raw"); // For PDF files
                  
                  try {
                    const res = await fetch(
                      "https://api.cloudinary.com/v1_1/dubvzmk7g/raw/upload",
                      {
                        method: "POST",
                        body: formData,
                      }
                    );
                    const data = await res.json();
                    setForm({ ...form, portfolio: data.secure_url });
                  } catch (error) {
                    console.error("Error uploading file:", error);
                    setErrors(["Error uploading portfolio file. Please try again."]);
                  }
                }
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <p className="mt-1 text-sm text-gray-500">
              Please upload a PDF file for your portfolio or brochure.
            </p>
          </div>

          {errors.length > 0 && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">There were errors with your submission</h3>
                  <div className="mt-2 text-sm text-red-700">
                    <ul className="list-disc pl-5 space-y-1">
                      {errors.map((error, index) => (
                        <li key={index}>{error}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {success && (
            <div className="rounded-md bg-green-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-green-800">{success}</p>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 w-full md:w-auto"
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.649z"></path>
                  </svg>
                  Submitting...
                </span>
              ) : (
                "Submit Request"
              )}
            </button>
          </div>
        </form>

        <div className="mt-8 text-center text-gray-600">
          <p>Our team will contact you within 48 hours for onboarding and discussion. We are excited to partner with you!</p>
        </div>
      </div>
    </AdminLayout>
  );
}
