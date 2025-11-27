import { NextRequest, NextResponse } from "next/server";
import { getApiUrl } from "@/lib/apiConfig";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const backendRes = await fetch(getApiUrl('/contact'), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await backendRes.json();
    return NextResponse.json(data, { status: backendRes.status });
  } catch (error: any) {
    console.error("Error proxying contact POST request:", error);
    return NextResponse.json(
      { error: "Failed to process contact request", message: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const backendRes = await fetch(getApiUrl('/contact'), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!backendRes.ok) {
      throw new Error(`Backend responded with status ${backendRes.status}`);
    }

    const data = await backendRes.json();
    return NextResponse.json(data, { status: backendRes.status });
  } catch (error: any) {
    console.error("Error proxying contact GET request:", error);
    return NextResponse.json(
      { error: "Failed to fetch contact messages", message: error.message },
      { status: error.message?.includes('404') ? 404 : 500 }
    );
  }
}

