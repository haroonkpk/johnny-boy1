
import { NextResponse } from "next/server";

// Yeh variable temporary data save karega (Sirf Testing ke liye)
let savedData = {
  title: "",
  subtitle: "",
  badge: "Engineering",
  bgText: "Aroma"
};

export async function GET() {
  return NextResponse.json(savedData);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    savedData = { ...savedData, ...body }; // Data update ho raha hai
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }
}