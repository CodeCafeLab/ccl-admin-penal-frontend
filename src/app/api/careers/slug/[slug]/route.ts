import { NextRequest, NextResponse } from "next/server";
import { getApiUrl } from "@/lib/apiConfig";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    const backendRes = await fetch(getApiUrl(`/careers/slug/${slug}`), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await backendRes.json();
    return NextResponse.json(data, { status: backendRes.status });
  } catch (error) {
    console.error("Error fetching career by slug:", error);
    return NextResponse.json(
      { error: "Failed to fetch career" },
      { status: 500 }
    );
  }
}

