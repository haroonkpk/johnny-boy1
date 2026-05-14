import { NextResponse } from "next/server";

// Yahan hum default tagline set kar rahe hain jo Editor mein pehli baar nazar aayegi
let contentStore = {
  content: `<p>Smooth hits. Bold flavors.<br>Crafted for a premium vaping experience that defines excellence.</p>`,
};

export async function GET() {
  try {
    return NextResponse.json(contentStore, {
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    });
  } catch (error) {
    return NextResponse.json({ error: "Fetch failed" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body || typeof body.content !== "string") {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    // Jo aap edit karenge wo yahan save ho jayega
    contentStore.content = body.content;

    return NextResponse.json({ success: true, message: "Saved!" });
  } catch (error) {
    return NextResponse.json({ error: "Invalid Request" }, { status: 400 });
  }
}