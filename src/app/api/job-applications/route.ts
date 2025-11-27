import { NextRequest, NextResponse } from "next/server";
import { getApiUrl } from "@/lib/apiConfig";

export async function GET() {
  try {
    const backendRes = await fetch(getApiUrl('/job-applications'), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await backendRes.json();
    return NextResponse.json(data, { status: backendRes.status });
  } catch (error) {
    console.error("Error fetching job applications:", error);
    return NextResponse.json(
      { error: "Failed to fetch job applications" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const backendRes = await fetch(getApiUrl('/job-applications'), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await backendRes.json();
    return NextResponse.json(data, { status: backendRes.status });
  } catch (error) {
    console.error("Error submitting job application:", error);
    return NextResponse.json(
      { error: "Failed to submit job application" },
      { status: 500 }
    );
  }
}

