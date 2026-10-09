import { NextResponse } from "next/server";
import { getRealRegistrations } from "@/lib/db";
import { CORS_HEADERS, handleOptions } from "@/lib/cors";

export const dynamic = "force-dynamic";

export async function OPTIONS() {
  return handleOptions();
}

export async function GET() {
  try {
    const list = getRealRegistrations();
    return NextResponse.json(
      {
        success: true,
        registrations: list,
      },
      {
        headers: CORS_HEADERS,
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to fetch registrations", details: error.message },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}
