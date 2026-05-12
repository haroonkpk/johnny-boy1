"use server";

import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";
import { revalidatePath } from "next/cache";

export async function getProducts() {
  try {
    await dbConnect();
    const products = await Product.find({}).sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(products));
  } catch (error: any) {
    console.error("Get Products Error:", error);
    return [];
  }
}

import { uploadToCloudinary, deleteFromCloudinary, getPublicIdFromUrl } from "@/lib/upload";

export async function createProduct(formData: FormData) {
  try {
    await dbConnect();

    const name = formData.get("name") as string;
    const price = Number(formData.get("price"));
    const series = formData.get("series") as string;
    const comingSoon = formData.get("comingSoon") === "true";
    const imageFile = formData.get("image") as File;
    const fruitsFile = formData.get("fruits") as File;
    const bgFile = formData.get("bg") as File;

    if (!imageFile || imageFile.size === 0 || !fruitsFile || fruitsFile.size === 0 || !bgFile || bgFile.size === 0) {
      throw new Error("All images are required. Please upload all three images.");
    }

    const [imageUrl, fruitsUrl, bgUrl] = await Promise.all([
      uploadToCloudinary(imageFile, "products"),
      uploadToCloudinary(fruitsFile, "fruits"),
      uploadToCloudinary(bgFile, "backgrounds"),
    ]);

    const newProduct = await Product.create({
      name,
      price,
      series,
      comingSoon,
      image: imageUrl,
      fruits: fruitsUrl,
      bg: bgUrl,
    });

    revalidatePath("/admin/products");
    revalidatePath("/");
    return { success: true, product: JSON.parse(JSON.stringify(newProduct)) };
  } catch (error: any) {
    console.error("Create Product Error:", error);
    return { error: error.message || "Failed to create product" };
  }
}

export async function updateProduct(id: string, formData: FormData) {
  try {
    await dbConnect();

    // Fetch existing product to get old image URLs
    const existingProduct = await Product.findById(id);
    if (!existingProduct) throw new Error("Product not found");

    const updateData: any = {
      name: formData.get("name"),
      price: Number(formData.get("price")),
      series: formData.get("series"),
      comingSoon: formData.get("comingSoon") === "true",
    };

    const imageFile = formData.get("image") as File;
    const fruitsFile = formData.get("fruits") as File;
    const bgFile = formData.get("bg") as File;

    if (imageFile && imageFile.size > 0) {
      // Delete old image
      if (existingProduct.image) {
        await deleteFromCloudinary(getPublicIdFromUrl(existingProduct.image));
      }
      updateData.image = await uploadToCloudinary(imageFile, "products");
    }
    if (fruitsFile && fruitsFile.size > 0) {
      // Delete old fruits
      if (existingProduct.fruits) {
        await deleteFromCloudinary(getPublicIdFromUrl(existingProduct.fruits));
      }
      updateData.fruits = await uploadToCloudinary(fruitsFile, "fruits");
    }
    if (bgFile && bgFile.size > 0) {
      // Delete old bg
      if (existingProduct.bg) {
        await deleteFromCloudinary(getPublicIdFromUrl(existingProduct.bg));
      }
      updateData.bg = await uploadToCloudinary(bgFile, "backgrounds");
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, { new: true });

    revalidatePath("/admin/products");
    revalidatePath("/");
    return { success: true, product: JSON.parse(JSON.stringify(updatedProduct)) };
  } catch (error: any) {
    console.error("Update Product Error:", error);
    return { error: error.message || "Failed to update product" };
  }
}

export async function deleteProduct(id: string) {
  try {
    await dbConnect();
    
    const product = await Product.findById(id);
    if (!product) return { error: "Product not found" };

    // Delete images from Cloudinary
    const imageDeletions = [];
    if (product.image) imageDeletions.push(deleteFromCloudinary(getPublicIdFromUrl(product.image)));
    if (product.fruits) imageDeletions.push(deleteFromCloudinary(getPublicIdFromUrl(product.fruits)));
    if (product.bg) imageDeletions.push(deleteFromCloudinary(getPublicIdFromUrl(product.bg)));

    await Promise.all(imageDeletions);

    // Delete from DB
    await Product.findByIdAndDelete(id);

    revalidatePath("/admin/products");
    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    console.error("Delete Product Error:", error);
    return { error: error.message || "Failed to delete product" };
  }
}
