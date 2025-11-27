"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PartnersPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the partners list page
    router.push("/partners/list");
  }, [router]);

  return null;
}
