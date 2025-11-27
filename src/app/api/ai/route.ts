import { NextRequest, NextResponse } from "next/server";

// Use environment variables for API base URL with fallbacks
const BASE_URL = process.env.API_BASE_URL || 
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  (process.env.NODE_ENV === 'development' 
    ? 'http://localhost:9002/api' 
    : 'https://admin.codecafelab.in/api');
const API_URL = `${BASE_URL}/ai`;

export async function GET() {
  try {
    const res = await fetch(API_URL);
    const text = await res.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = [];
    }
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
  console.log(err)
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const text = await res.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = { error: "Invalid response from backend" };
    }
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    console.log(err)
    return NextResponse.json({ error: "Network error" }, { status: 500 });
  }
}



