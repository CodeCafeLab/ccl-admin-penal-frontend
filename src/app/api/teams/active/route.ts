import { NextResponse } from "next/server";
import { getApiUrl } from "@/lib/apiConfig";

export async function GET() {
  const backendRes = await fetch(getApiUrl('/teams/active'), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await backendRes.json();
  return NextResponse.json(data, { status: backendRes.status });
}
