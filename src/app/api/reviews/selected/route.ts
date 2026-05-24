import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import SiteContent from "@/models/SiteContent";
import ReviewVideo from "@/models/ReviewVideo";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await dbConnect();
    const config = await SiteContent.findOne({ configId: "main" }).lean();
    const selectedIds = config?.selectedReviewVideos || [];
    
    if (selectedIds.length === 0) {
      return NextResponse.json([]);
    }

    // Fetch all matching videos
    const videos = await ReviewVideo.find({ _id: { $in: selectedIds } }).lean();

    // Map to preserve the order in selectedIds
    const orderedVideos = selectedIds
      .map((id: string) => {
        const found = videos.find((v: any) => v._id.toString() === id.toString());
        if (found) {
          return {
            ...found,
            _id: found._id.toString(),
          };
        }
        return null;
      })
      .filter(Boolean);

    return NextResponse.json(orderedVideos);
  } catch (error) {
    console.error("GET /api/reviews/selected error:", error);
    return NextResponse.json([], { status: 500 });
  }
}
