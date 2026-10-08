import { NextResponse } from "next/server";
import { getRealRegistrations } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const list = getRealRegistrations();
    return NextResponse.json({
      success: true,
      registrations: list,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to fetch registrations", details: error.message },
      { status: 500 }
    );
  }
}
