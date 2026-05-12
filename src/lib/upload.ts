import cloudinary from "./cloudinary";

export const uploadToCloudinary = async (file: File, folder: string) => {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        folder: `ecommerce/${folder}`,
        resource_type: "auto",
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result?.secure_url);
        }
      }
    ).end(buffer);
  });
};

export const deleteFromCloudinary = async (publicId: string) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error("Cloudinary Delete Error:", error);
    throw error;
  }
};

export const getPublicIdFromUrl = (url: string) => {
  // Example URL: https://res.cloudinary.com/demo/image/upload/v1570979139/sample.jpg
  // Public ID: sample
  // Example with folder: https://res.cloudinary.com/demo/image/upload/v1570979139/folder/sample.jpg
  // Public ID: folder/sample
  
  const parts = url.split("/");
  const lastPart = parts[parts.length - 1]; // sample.jpg
  const fileName = lastPart.split(".")[0]; // sample
  
  // Find the index of 'upload'
  const uploadIndex = parts.indexOf("upload");
  if (uploadIndex === -1) return fileName;
  
  // Join parts after the version (v[digits])
  const publicIdParts = parts.slice(uploadIndex + 2); // skip 'upload' and 'v123456'
  const publicIdWithExtension = publicIdParts.join("/"); // folder/sample.jpg
  return publicIdWithExtension.split(".")[0]; // folder/sample
};
