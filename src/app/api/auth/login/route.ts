import { NextRequest, NextResponse } from "next/server";

// Use environment variables for API base URL with fallbacks
// Backend endpoint: http://localhost:9002/api/auth/login
const getBaseUrl = () => {
  const url = process.env.API_BASE_URL || 
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    (process.env.NODE_ENV === 'development' 
      ? 'http://localhost:9002' 
      : 'https://admin.codecafelab.in');
  
  // Remove /api suffix if present, as endpoints will add it
  return url.replace(/\/api$/, '');
};

const BASE_URL = getBaseUrl();
const LOGIN_ENDPOINT = `${BASE_URL}/api/auth/login`;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    console.log(`[Login API] Calling backend: ${LOGIN_ENDPOINT}`);
    console.log(`[Login API] Request body:`, { email: body.email, password: '***' });

    const backendRes = await fetch(LOGIN_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    console.log(`[Login API] Backend response status: ${backendRes.status}`);
    console.log(`[Login API] Backend response headers:`, Object.fromEntries(backendRes.headers.entries()));

    // Check if the response is JSON
    const contentType = backendRes.headers.get("content-type");
    if (!contentType?.includes("application/json")) {
      const text = await backendRes.text();
      console.error("[Login API] Non-JSON response from backend:", text);
      console.error("[Login API] Response status:", backendRes.status);
      return NextResponse.json(
        { 
          error: "Authentication service is currently unavailable",
          details: `Backend returned non-JSON response (status: ${backendRes.status})`,
          response: text.substring(0, 200) // First 200 chars for debugging
        },
        { status: 503 }
      );
    }

    const data = await backendRes.json();
    return NextResponse.json(data, { status: backendRes.status });
  } catch (error: any) {
    console.error("[Login API] Error in login route:", error);
    console.error("[Login API] Error message:", error.message);
    console.error("[Login API] Error stack:", error.stack);
    return NextResponse.json(
      { 
        error: "An error occurred during authentication",
        details: error.message || "Unknown error",
        backendUrl: LOGIN_ENDPOINT
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");

  if (!authHeader) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const backendRes = await fetch(`${BASE_URL}/api/auth/profile`, {
      method: "GET",
      headers: {
        Authorization: authHeader,
        "Content-Type": "application/json",
      },
    });

    const contentType = backendRes.headers.get("content-type");
    if (!contentType?.includes("application/json")) {
      const text = await backendRes.text();
      console.error("Non-JSON response from profile endpoint:", text);
      return NextResponse.json(
        { error: "Profile service is currently unavailable" },
        { status: 503 }
      );
    }

    const data = await backendRes.json();
    return NextResponse.json(data, { status: backendRes.status });
  } catch (error) {
    console.error("Error in profile route:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching profile" },
      { status: 500 }
    );
  }
}
