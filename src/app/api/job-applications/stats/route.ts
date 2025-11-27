import { NextResponse } from "next/server";
import { getApiUrl } from "@/lib/apiConfig";

export async function GET() {
  try {
    const backendRes = await fetch(getApiUrl('/job-applications/stats'), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await backendRes.json();
    return NextResponse.json(data, { status: backendRes.status });
  } catch (error) {
    console.error("Error fetching job application stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch job application stats" },
      { status: 500 }
    );
  }
}

