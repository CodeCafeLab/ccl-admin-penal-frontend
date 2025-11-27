"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import AdminLayout from "@/components/AdminLayout";
import { getTeamMember, deleteTeamMember, TeamMember } from "@/lib/teamApi";
import { FaArrowLeft, FaEdit, FaTrash, FaEnvelope, FaPhone, FaLinkedin, FaTwitter, FaGithub, FaGlobe, FaStar, FaSort, FaUsers } from "react-icons/fa";
import Image from "next/image";

const TeamMemberDetailPage: React.FC = () => {
  const { id } = useParams();
  const router = useRouter();
  const [teamMember, setTeamMember] = useState<TeamMember | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchTeamMember = async () => {
        try {
          setIsLoading(true);
          const response = await getTeamMember(id as string);
          setTeamMember(response.data);
        } catch (error) {
          console.error("Error fetching team member:", error);
          alert("Failed to fetch team member details");
        } finally {
          setIsLoading(false);
        }
      };
      fetchTeamMember();
    }
  }, [id]);

  const handleEdit = () => {
    router.push(`/teams/edit/${id}`);
  };

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this team member? This action cannot be undone.")) {
      try {
        setIsDeleting(true);
        await deleteTeamMember(id as string);
        router.push("/teams");
      } catch (error) {
        console.error("Error deleting team member:", error);
        alert("Failed to delete team member");
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDepartmentColor = (department: string) => {
    switch (department) {
      case 'Leadership': return 'bg-purple-100 text-purple-800';
      case 'Technology': return 'bg-blue-100 text-blue-800';
      case 'Engineering': return 'bg-indigo-100 text-indigo-800';
      case 'Design': return 'bg-pink-100 text-pink-800';
      case 'Operations': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <AdminLayout adminName="John Doe">
        <div className="p-6 md:p-8 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
          <div className="text-center py-12">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading team member details...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (!teamMember) {
    return (
      <AdminLayout adminName="John Doe">
        <div className="p-6 md:p-8 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Team Member Not Found</h2>
            <p className="text-gray-600 mb-6">The team member you are looking for does not exist or has been removed.</p>
            <button
              onClick={() => router.push("/teams")}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Back to Team
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
              onClick={() => router.push("/teams")}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <FaArrowLeft />
              <span>Back to Team</span>
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

        {/* Team Member Details */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-6">
                {teamMember.avatar_url ? (
                  <Image
                    src={teamMember.avatar_url}
                    alt={teamMember.name}
                    width={120}
                    height={120}
                    className="rounded-full object-cover border-4 border-white"
                  />
                ) : (
                  <div className="w-30 h-30 bg-white bg-opacity-20 rounded-full flex items-center justify-center border-4 border-white">
                    <FaUsers className="text-white text-4xl" />
                  </div>
                )}
                <div>
                  <h1 className="text-3xl font-bold mb-2">{teamMember.name}</h1>
                  <p className="text-xl mb-4">{teamMember.position}</p>
                  <div className="flex items-center space-x-3">
                    {teamMember.department && (
                      <span className={`px-3 py-1 text-sm font-medium rounded-full ${getDepartmentColor(teamMember.department)}`}>
                        {teamMember.department}
                      </span>
                    )}
                    <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(teamMember.status)}`}>
                      {teamMember.status.charAt(0).toUpperCase() + teamMember.status.slice(1)}
                    </span>
                    {teamMember.featured && (
                      <span className="px-3 py-1 text-sm font-medium rounded-full bg-yellow-100 text-yellow-800">
                        <FaStar className="inline mr-1" />
                        Featured
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

 
          {/* Details Section */}
          <div className="p-8">
            {teamMember.bio && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Bio</h2>
                <p className="text-gray-700">{teamMember.bio}</p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Contact & Social */}
              <div>
                <h2 className="text-xl font-semibold mb-2">Contact</h2>
                <ul className="space-y-2">
                  {teamMember.email && (
                    <li className="flex items-center gap-2">
                      <FaEnvelope className="text-blue-600" />
                      <a href={`mailto:${teamMember.email}`} className="text-blue-700 hover:underline">{teamMember.email}</a>
                    </li>
                  )}
                  {teamMember.phone && (
                    <li className="flex items-center gap-2">
                      <FaPhone className="text-blue-600" />
                      <a href={`tel:${teamMember.phone}`} className="text-blue-700 hover:underline">{teamMember.phone}</a>
                    </li>
                  )}
                  {teamMember.linkedin_url && (
                    <li className="flex items-center gap-2">
                      <FaLinkedin className="text-blue-600" />
                      <a href={teamMember.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline">LinkedIn</a>
                    </li>
                  )}
                  {teamMember.twitter_url && (
                    <li className="flex items-center gap-2">
                      <FaTwitter className="text-blue-600" />
                      <a href={teamMember.twitter_url} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline">Twitter</a>
                    </li>
                  )}
                  {teamMember.github_url && (
                    <li className="flex items-center gap-2">
                      <FaGithub className="text-blue-600" />
                      <a href={teamMember.github_url} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline">GitHub</a>
                    </li>
                  )}
                  {teamMember.portfolio_url && (
                    <li className="flex items-center gap-2">
                      <FaGlobe className="text-blue-600" />
                      <a href={teamMember.portfolio_url} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline">Portfolio</a>
                    </li>
                  )}
                </ul>
              </div>

              {/* Skills, Experience, Education */}
              <div>
                {teamMember.skills && teamMember.skills.length > 0 && (
                  <div className="mb-4">
                    <h2 className="text-xl font-semibold mb-2">Skills</h2>
                    <div className="flex flex-wrap gap-2">
                      {teamMember.skills.map((skill, idx) => (
                        <span key={idx} className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">{skill}</span>
                      ))}
                    </div>
                  </div>
                )}
                {teamMember.experience_years !== undefined && (
                  <div className="mb-4">
                    <h2 className="text-xl font-semibold mb-2">Experience</h2>
                    <span className="text-gray-700">{teamMember.experience_years} years</span>
                  </div>
                )}
                {teamMember.education && (
                  <div className="mb-4">
                    <h2 className="text-xl font-semibold mb-2">Education</h2>
                    <span className="text-gray-700">{teamMember.education}</span>
                  </div>
                )}
                {teamMember.certifications && teamMember.certifications.length > 0 && (
                  <div className="mb-4">
                    <h2 className="text-xl font-semibold mb-2">Certifications</h2>
                    <ul className="list-disc list-inside text-gray-700">
                      {teamMember.certifications.map((cert, idx) => (
                        <li key={idx}>{cert}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
            {/* Sort Order */}
            <div className="mt-8 flex items-center gap-2 text-gray-500">
              <FaSort />
              <span>Sort Order: {teamMember.sort_order}</span>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default TeamMemberDetailPage;