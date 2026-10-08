import { NextResponse } from "next/server";
import { getSiteSettings, updateSiteSettings } from "@/lib/db";

export const dynamic = "force-dynamic";

const NO_CACHE_HEADERS = {
  "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
  "CDN-Cache-Control": "no-store",
  "Vercel-CDN-Cache-Control": "no-store",
};

export async function GET() {
  try {
    const settings = getSiteSettings();
    return NextResponse.json({ success: true, settings }, { headers: NO_CACHE_HEADERS });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500, headers: NO_CACHE_HEADERS });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { settings } = body;
    if (!settings) {
      return NextResponse.json({ error: "Missing settings payload" }, { status: 400, headers: NO_CACHE_HEADERS });
    }
    const updated = updateSiteSettings(settings);
    return NextResponse.json({ success: true, settings: updated }, { headers: NO_CACHE_HEADERS });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500, headers: NO_CACHE_HEADERS });
  }
}
