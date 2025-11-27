import { NextRequest, NextResponse } from "next/server";
import { getApiUrl } from "@/lib/apiConfig";

export async function GET(
  request: NextRequest,
  { params }: { params: { jobId: string } }
) {
  try {
    const { jobId } = params;
    const backendRes = await fetch(getApiUrl(`/job-applications/job/${jobId}`), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await backendRes.json();
    return NextResponse.json(data, { status: backendRes.status });
  } catch (error) {
    console.error("Error fetching job applications by job ID:", error);
    return NextResponse.json(
      { error: "Failed to fetch job applications" },
      { status: 500 }
    );
  }
}

