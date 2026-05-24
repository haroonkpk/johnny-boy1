"use server";
import dbConnect from "@/lib/mongodb";
import ReviewVideo from "@/models/ReviewVideo";
import cloudinary from "@/lib/cloudinary"; 
import { revalidatePath } from "next/cache";
import fs from "fs/promises";
import path from "path";
import os from "os";


export async function getReviewVideos() {
  await dbConnect();

const videos = await ReviewVideo.find({}).sort({ createdAt: -1 }).lean();
return videos.map((video) => ({
    ...video,
    _id: video._id.toString(), 
  }));
}

export async function addReviewVideoAction(formData: FormData) {
  console.log("--- Upload Process Started ---");
  await dbConnect();
  
  const file = formData.get("file") as File;
  const thumbnail = formData.get("thumbnail") as File;
  const name = formData.get("name") as string;
  const role = formData.get("role") as string;

  console.log("File Name:", file?.name);
  console.log("File Size:", file?.size);
  console.log("Thumbnail Name:", thumbnail?.name);

  if (!file) {
    console.error("No video file found in FormData");
    return { success: false, error: "No video file found" };
  }

  if (!thumbnail) {
    console.error("No thumbnail image found in FormData");
    return { success: false, error: "Thumbnail is required" };
  }

  const tempDir = os.tmpdir();
  let tempFilePath = "";

  try {
    // 1. Upload Thumbnail first
    console.log("Uploading thumbnail to Cloudinary...");
    const thumbnailBuffer = Buffer.from(await thumbnail.arrayBuffer());
    const thumbResult: any = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: "ecommerce/reviews/thumbnails" },
        (error, result) => {
          if (error) {
            console.error("Thumbnail upload failed:", error);
            reject(error);
          } else {
            console.log("Thumbnail upload successful");
            resolve(result);
          }
        }
      ).end(thumbnailBuffer);
    });

    // 2. Prepare and Upload Video
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    console.log("Video buffer created, size:", buffer.length);

    // Ensure temp directory exists
    await fs.mkdir(tempDir, { recursive: true });
    tempFilePath = path.join(tempDir, `${Date.now()}-${file.name}`);
    await fs.writeFile(tempFilePath, buffer);
    console.log("Temp video file created at:", tempFilePath);

    const result: any = await new Promise((resolve, reject) => {
      console.log("Starting Cloudinary upload_large...");
      cloudinary.uploader.upload_large(
        tempFilePath,
        { 
          folder: "ecommerce/reviews", 
          resource_type: "video",
          chunk_size: 6000000 // 6MB chunk size
        },
        async (error, result) => {
          // clean up file as soon as upload finishes
          try {
            if (tempFilePath) {
              await fs.unlink(tempFilePath);
              console.log("Temp video file deleted successfully");
            }
          } catch (err) {
            console.error("Failed to delete temp video file:", err);
          }

          if (error) {
            console.error("Cloudinary Callback Error:", error);
            reject(error);
          } else {
            console.log("Cloudinary Upload Success!");
            resolve(result);
          }
        }
      );
    });

    console.log("Saving to Database...");
    await ReviewVideo.create({
      name,
      role,
      videoUrl: result.secure_url,
      thumbnailUrl: thumbResult.secure_url,
      tag: "Review",
      publicId: result.public_id,
      thumbnailPublicId: thumbResult.public_id
    });

    revalidatePath("/admin/editor");
    return { success: true };
  } catch (error: any) {
    console.error("CRITICAL UPLOAD ERROR:", error);
    // Cleanup if something crashed before callback
    try {
      if (tempFilePath) {
        await fs.unlink(tempFilePath);
      }
    } catch (_) {}
    return { success: false, error: error.message || "Upload failed. Check terminal for details." };
  }
}
export async function deleteReviewVideo(id: string) {
  await dbConnect();
  const video = await ReviewVideo.findById(id);
  if (video?.publicId) {
    await cloudinary.uploader.destroy(video.publicId, { resource_type: "video" });
  }
  if (video?.thumbnailPublicId) {
    await cloudinary.uploader.destroy(video.thumbnailPublicId);
  }
  await ReviewVideo.findByIdAndDelete(id);
  revalidatePath("/admin/editor");
}
export async function updateReviewVideoAction(formData: FormData) {
  await dbConnect();
  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const role = formData.get("role") as string;
  const file = formData.get("file") as File | null;
  const thumbnail = formData.get("thumbnail") as File | null;

  const video = await ReviewVideo.findById(id);
  if (!video) {
    return { success: false, error: "Video not found" };
  }

  // Update name and role
  video.name = name;
  video.role = role;

  // If a new thumbnail is selected, upload it and destroy the old one
  if (thumbnail && thumbnail.size > 0) {
    console.log("Uploading new thumbnail...");
    const thumbnailBuffer = Buffer.from(await thumbnail.arrayBuffer());
    const thumbResult: any = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: "ecommerce/reviews/thumbnails" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(thumbnailBuffer);
    });

    if (video.thumbnailPublicId) {
      await cloudinary.uploader.destroy(video.thumbnailPublicId);
    }

    video.thumbnailUrl = thumbResult.secure_url;
    video.thumbnailPublicId = thumbResult.public_id;
  }

  // If a new video file is selected, upload it and destroy the old one
  if (file && file.size > 0) {
    console.log("Uploading new video...");
    const tempDir = os.tmpdir();
    await fs.mkdir(tempDir, { recursive: true });
    const tempFilePath = path.join(tempDir, `${Date.now()}-${file.name}`);
    await fs.writeFile(tempFilePath, Buffer.from(await file.arrayBuffer()));

    const result: any = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_large(
        tempFilePath,
        { 
          folder: "ecommerce/reviews", 
          resource_type: "video",
          chunk_size: 6000000 
        },
        async (error, result) => {
          try {
            await fs.unlink(tempFilePath);
          } catch (_) {}

          if (error) reject(error);
          else resolve(result);
        }
      );
    });

    if (video.publicId) {
      await cloudinary.uploader.destroy(video.publicId, { resource_type: "video" });
    }

    video.videoUrl = result.secure_url;
    video.publicId = result.public_id;
  }

  await video.save();
  revalidatePath("/admin/editor");
  return { success: true };
}