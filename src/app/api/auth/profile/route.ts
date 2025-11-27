import { NextRequest, NextResponse } from "next/server";

// Use environment variables for API base URL with fallbacks
const BASE_URL = process.env.API_BASE_URL || 
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  (process.env.NODE_ENV === 'development' 
    ? 'http://localhost:9002/api' 
    : 'https://admin.codecafelab.in/api');

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");

  if (!authHeader) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const backendRes = await fetch(`${BASE_URL}/auth/profile`, {
    method: "GET",
    headers: {
      Authorization: authHeader,
      "Content-Type": "application/json",
    },
  });

  const data = await backendRes.json();

  return NextResponse.json(data, { status: backendRes.status });
}
