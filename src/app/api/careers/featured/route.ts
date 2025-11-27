import { NextResponse } from "next/server";
import { getApiUrl } from "@/lib/apiConfig";

export async function GET() {
  try {
    const backendRes = await fetch(getApiUrl('/careers/featured'), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await backendRes.json();
    return NextResponse.json(data, { status: backendRes.status });
  } catch (error) {
    console.error("Error fetching featured careers:", error);
    return NextResponse.json(
      { error: "Failed to fetch featured careers" },
      { status: 500 }
    );
  }
}

