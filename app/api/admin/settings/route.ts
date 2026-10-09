import { NextResponse } from "next/server";
import { getSiteSettings, updateSiteSettings } from "@/lib/db";
import { CORS_HEADERS, handleOptions } from "@/lib/cors";

export const dynamic = "force-dynamic";

export async function OPTIONS() {
  return handleOptions();
}

export async function GET() {
  try {
    const settings = getSiteSettings();
    return NextResponse.json({ success: true, settings }, { headers: CORS_HEADERS });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500, headers: CORS_HEADERS });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { settings } = body;
    if (!settings) {
      return NextResponse.json({ error: "Missing settings payload" }, { status: 400, headers: CORS_HEADERS });
    }
    const updated = updateSiteSettings(settings);
    return NextResponse.json({ success: true, settings: updated }, { headers: CORS_HEADERS });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500, headers: CORS_HEADERS });
  }
}
