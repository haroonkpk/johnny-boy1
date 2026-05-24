"use server";
import dbConnect from "@/lib/mongodb";
import ReviewVideo from "@/models/ReviewVideo";
import cloudinary from "@/lib/cloudinary"; 
import { revalidatePath } from "next/cache";

export async function getReviewVideos() {
  await dbConnect();

const videos = await ReviewVideo.find({}).sort({ createdAt: -1 }).lean();
return videos.map((video) => ({
    ...video,
    _id: video._id.toString(), 
  }));
}

// export async function addReviewVideoAction(formData: FormData) {
//   await dbConnect();
//   const file = formData.get("file") as File;
//   const name = formData.get("name") as string;
//   const role = formData.get("role") as string;

//   const arrayBuffer = await file.arrayBuffer();
//   const buffer = Buffer.from(arrayBuffer);

//   // Cloudinary Upload
//   const result: any = await new Promise((resolve, reject) => {
//     cloudinary.uploader.upload_stream(
//       { folder: "ecommerce/reviews", resource_type: "video" },
//       (error, result) => {
//         if (error) reject(error);
//         else resolve(result);
//       }
//     ).end(buffer);
//   });

//   // DB Save
//   await ReviewVideo.create({
//     name,
//     role,
//     videoUrl: result.secure_url,
//     tag: "Review",
//     publicId: result.public_id 
//   });

//   revalidatePath("/admin/editor"); 
// }
export async function addReviewVideoAction(formData: FormData) {
  console.log("--- Upload Process Started ---");
  await dbConnect();
  
  const file = formData.get("file") as File;
  const name = formData.get("name") as string;
  const role = formData.get("role") as string;

  console.log("File Name:", file?.name);
  console.log("File Size:", file?.size);

  if (!file) {
    console.error("No file found in FormData");
    return { success: false, error: "No file found" };
  }

  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    console.log("Buffer created, size:", buffer.length);

    const result: any = await new Promise((resolve, reject) => {
      console.log("Starting Cloudinary upload stream...");
      cloudinary.uploader.upload_stream(
        { 
          folder: "ecommerce/reviews", 
          resource_type: "video",
          timeout: 600000 
        },
        (error, result) => {
          if (error) {
            console.error("Cloudinary Callback Error:", error);
            reject(error);
          } else {
            console.log("Cloudinary Upload Success!");
            resolve(result);
          }
        }
      ).end(buffer);
    });

    console.log("Saving to Database...");
    await ReviewVideo.create({
      name,
      role,
      videoUrl: result.secure_url,
      tag: "Review",
      publicId: result.public_id
    });

    revalidatePath("/admin/editor");
    return { success: true };
  } catch (error) {
    console.error("CRITICAL UPLOAD ERROR:", error); 
    return { success: false, error: "Upload failed. Check terminal for details." };
  }
}
export async function deleteReviewVideo(id: string) {
  await dbConnect();
  const video = await ReviewVideo.findById(id);
  if (video?.publicId) {
    await cloudinary.uploader.destroy(video.publicId, { resource_type: "video" });
  }
  await ReviewVideo.findByIdAndDelete(id);
  revalidatePath("/admin/editor");
}