import { NextResponse } from "next/server";
import { getFullDb } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const db = getFullDb();
    return NextResponse.json({
      success: true,
      siteSettings: db.siteSettings,
      workshops: db.workshops,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to load site data", details: error.message },
      { status: 500 }
    );
  }
}
