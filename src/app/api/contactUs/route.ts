import { NextRequest, NextResponse } from "next/server";

// Use environment variables for API base URL with fallbacks
const BASE_URL = process.env.API_BASE_URL || 
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  (process.env.NODE_ENV === 'development' 
    ? 'http://localhost:9002/api' 
    : 'https://admin.codecafelab.in/api');

export async function POST(request: NextRequest) {
  const body = await request.json();

  const backendRes = await fetch(`${BASE_URL}/contact`, {
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
  const backendRes = await fetch(`${BASE_URL}/contact`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await backendRes.json();
  return NextResponse.json(data, { status: backendRes.status });
}
