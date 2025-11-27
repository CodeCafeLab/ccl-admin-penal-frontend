"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getBlog } from "@/lib/blogApi";
import { BlogPost } from "@/lib/constent";

export default function BlogDetailPage() {
  const { id } = useParams();
  const [blog, setBlog] = useState<BlogPost | null>(null);

  useEffect(() => {
    if (id) {
      getBlog(id as string).then((res) => {
        setBlog(Array.isArray(res.data) ? res.data[0] : res.data);
      });
    }
  }, [id]);

  if (!blog) return <div>Loading...</div>;

  return (
    <div>
      <h1>{blog.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: blog.content }} />
    </div>
  );
}
