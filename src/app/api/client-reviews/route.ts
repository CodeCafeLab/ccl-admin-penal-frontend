import { NextRequest, NextResponse } from "next/server";
import { getApiUrl } from "@/lib/apiConfig";

const BACKEND_URL = getApiUrl('/client-reviews');

export async function GET() {
  const backendRes = await fetch(BACKEND_URL);
  const data = await backendRes.json();
  return NextResponse.json(data, { status: backendRes.status });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const backendRes = await fetch(BACKEND_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await backendRes.json();
  return NextResponse.json(data, { status: backendRes.status });
}

export async function PUT(request: NextRequest) {
  const body = await request.json();
  const { id, ...rest } = body;
  const backendRes = await fetch(`${BACKEND_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(rest),
  });
  const data = await backendRes.json();
  return NextResponse.json(data, { status: backendRes.status });
}

export async function DELETE(request: NextRequest) {
  const { id } = await request.json();
  const backendRes = await fetch(`${BACKEND_URL}/${id}`, {
    method: "DELETE",
  });
  const data = await backendRes.json();
  return NextResponse.json(data, { status: backendRes.status });
}
