import { NextRequest, NextResponse } from "next/server";
import { getApiUrl } from "@/lib/apiConfig";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const backendRes = await fetch(getApiUrl('/partners'), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await backendRes.json();
    return NextResponse.json(data, { status: backendRes.status });
  } catch (error) {
    return NextResponse.json({ message: "Server error", error: (error as Error).message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const backendRes = await fetch(getApiUrl('/partners'), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await backendRes.json();
    return NextResponse.json(data, { status: backendRes.status });
  } catch (error) {
    return NextResponse.json({ message: "Server error", error: (error as Error).message }, { status: 500 });
  }
}
