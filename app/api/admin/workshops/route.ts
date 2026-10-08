import { NextResponse } from "next/server";
import { saveWorkshop, deleteWorkshop, getWorkshops } from "@/lib/db";

export const dynamic = "force-dynamic";

const NO_CACHE_HEADERS = {
  "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
  "CDN-Cache-Control": "no-store",
  "Vercel-CDN-Cache-Control": "no-store",
};

export async function GET() {
  try {
    const list = getWorkshops();
    return NextResponse.json({ success: true, workshops: list }, { headers: NO_CACHE_HEADERS });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500, headers: NO_CACHE_HEADERS });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { workshop } = body;
    if (!workshop || !workshop.id || !workshop.title) {
      return NextResponse.json({ error: "Invalid workshop data" }, { status: 400, headers: NO_CACHE_HEADERS });
    }
    const updated = saveWorkshop(workshop);
    return NextResponse.json({ success: true, workshops: updated }, { headers: NO_CACHE_HEADERS });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500, headers: NO_CACHE_HEADERS });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Missing workshop id" }, { status: 400, headers: NO_CACHE_HEADERS });
    }
    const updated = deleteWorkshop(id);
    return NextResponse.json({ success: true, workshops: updated }, { headers: NO_CACHE_HEADERS });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500, headers: NO_CACHE_HEADERS });
  }
}
