import { NextRequest, NextResponse } from "next/server";
import { getApiUrl } from "@/lib/apiConfig";

// Backend endpoint: /api/auth/login
const LOGIN_ENDPOINT = getApiUrl('/auth/login');

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
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    const errorStack = error instanceof Error ? error.stack : undefined;
    
    console.error("[Login API] Error in login route:", error);
    console.error("[Login API] Error message:", errorMessage);
    console.error("[Login API] Error stack:", errorStack);
    return NextResponse.json(
      { 
        error: "An error occurred during authentication",
        details: errorMessage,
        backendUrl: LOGIN_ENDPOINT,
        environment: process.env.NODE_ENV
      },
      { status: 500 }
    );
  }
}

// GET method not supported for login endpoint
// Use POST to login, or GET /api/auth/profile to get user profile
export async function GET() {
  return NextResponse.json(
    { error: "Method not allowed. Use POST to login." },
    { status: 405 }
  );
}
