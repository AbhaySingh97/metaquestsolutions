import { NextResponse } from "next/server";
import { getFullDb } from "@/lib/db";
import { CORS_HEADERS, handleOptions } from "@/lib/cors";

export const dynamic = "force-dynamic";

export async function OPTIONS() {
  return handleOptions();
}

export async function GET() {
  try {
    const db = getFullDb();
    return NextResponse.json(
      {
        success: true,
        siteSettings: db.siteSettings,
        workshops: db.workshops,
      },
      {
        headers: CORS_HEADERS,
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to load site data", details: error.message },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}
