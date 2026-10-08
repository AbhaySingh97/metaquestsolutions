import { NextResponse } from "next/server";
import { getSiteSettings, updateSiteSettings } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const settings = getSiteSettings();
    return NextResponse.json({ success: true, settings });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { settings } = body;
    if (!settings) {
      return NextResponse.json({ error: "Missing settings payload" }, { status: 400 });
    }
    const updated = updateSiteSettings(settings);
    return NextResponse.json({ success: true, settings: updated });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
