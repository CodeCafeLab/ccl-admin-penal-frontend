import { NextRequest, NextResponse } from "next/server";
import { getApiUrl } from "@/lib/apiConfig";

export async function POST(request: NextRequest) {
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
}

export async function GET() {
  const backendRes = await fetch(getApiUrl('/contact'), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await backendRes.json();
  return NextResponse.json(data, { status: backendRes.status });
}
