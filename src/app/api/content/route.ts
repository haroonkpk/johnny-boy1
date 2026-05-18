import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import SiteContent from "@/models/SiteContent";
import { CONTENT_DEFAULTS } from "@/data/content-defaults";

export async function GET() {
  try {
    await dbConnect();
    let config = await SiteContent.findOne({ configId: "main" }).lean();

    if (!config) {
      config = await SiteContent.create({
        configId: "main",
        ...CONTENT_DEFAULTS,
      });
      config = JSON.parse(JSON.stringify(config));
    }

    // Merge with defaults so empty values fall back
    const merged: Record<string, any> = {};
    for (const [key, defaultVal] of Object.entries(CONTENT_DEFAULTS)) {
      merged[key] = (config as any)[key] || defaultVal;
    }

    return NextResponse.json(merged);
  } catch (error) {
    console.error("GET /api/content Error:", error);
    return NextResponse.json(CONTENT_DEFAULTS);
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();

    await SiteContent.findOneAndUpdate(
      { configId: "main" },
      { ...body },
      { upsert: true, new: true }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("POST /api/content Error:", error);
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }
}