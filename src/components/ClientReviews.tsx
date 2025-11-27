"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ClientReview } from "@/lib/constent";
import apiclint from "@/lib/axios"; // <-- Import your axios instance

export default function ClientReviews() {
  const [reviews, setReviews] = useState<ClientReview[]>([]);
  useEffect(() => {
    apiclint
      .get("/client-reviews")
      .then((res) => {
        if (Array.isArray(res.data)) {
          setReviews(res.data);
        } else {
          console.error("Expected array but got:", res.data);
          setReviews([]); // fallback to empty array
        }
      })
      .catch((err) => {
        console.error("Error fetching client reviews:", err);
        setReviews([]);
      });
  }, []);

  return (
    <section>
      <h2 className="text-3xl font-bold mb-6">What Our Clients Say</h2>
      {reviews.length === 0 && (
        <div className="text-gray-400 italic">No client reviews yet.</div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reviews.map((r) => (
          <div key={r.id} className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center mb-2">
              {r.avatar_url && (
                <Image
                  src={r.avatar_url}
                  alt={r.client_name}
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full mr-3"
                />
              )}
              <span className="font-semibold">{r.client_name}</span>
              <span className="ml-auto text-yellow-500">
                {"★".repeat(r.rating)}
              </span>
            </div>
            <p className="text-gray-700">{r.review_text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
