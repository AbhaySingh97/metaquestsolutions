import { NextResponse } from "next/server";
import { saveWorkshop, deleteWorkshop, getWorkshops } from "@/lib/db";
import { CORS_HEADERS, handleOptions } from "@/lib/cors";

export const dynamic = "force-dynamic";

export async function OPTIONS() {
  return handleOptions();
}

export async function GET() {
  try {
    const list = getWorkshops();
    return NextResponse.json({ success: true, workshops: list }, { headers: CORS_HEADERS });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500, headers: CORS_HEADERS });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { workshop } = body;
    if (!workshop || !workshop.id || !workshop.title) {
      return NextResponse.json({ error: "Invalid workshop data" }, { status: 400, headers: CORS_HEADERS });
    }
    const updated = saveWorkshop(workshop);
    return NextResponse.json({ success: true, workshops: updated }, { headers: CORS_HEADERS });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500, headers: CORS_HEADERS });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Missing workshop id" }, { status: 400, headers: CORS_HEADERS });
    }
    const updated = deleteWorkshop(id);
    return NextResponse.json({ success: true, workshops: updated }, { headers: CORS_HEADERS });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500, headers: CORS_HEADERS });
  }
}
