"use server";

import dbConnect from "@/lib/mongodb"; 
import Order from "@/models/Order";
import { revalidatePath } from "next/cache";


export async function getOrders() {
  try {
    await dbConnect();
    const orders = await Order.find().sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(orders));
  } catch (error) {
    console.error("Fetch Error:", error);
    return [];
  }
}

// CREATE
export async function createOrder(orderData: any) {
  try {
    await dbConnect();
    const newOrder = await Order.create(orderData);
    revalidatePath("/admin/order");
    return { success: true, orderId: newOrder._id.toString() };
  } catch (error: any) {
    console.error("Create Error:", error);
    return { success: false, error: error.message };
  }
}

// UPDATE status
export async function updateOrderStatus(id: string, status: string) {
  try {
    await dbConnect();
    await Order.findByIdAndUpdate(id, { status });
    revalidatePath("/admin/order");
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}

// GET retailer specific orders
export async function getRetailerOrders(email: string) {
  try {
    await dbConnect();
    const orders = await Order.find({ email }).sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(orders));
  } catch (error) {
    console.error("Fetch Error:", error);
    return [];
  }
}

// DELETE order
export async function deleteOrder(id: string) {
  try {
    await dbConnect();
    await Order.findByIdAndDelete(id);
    revalidatePath("/admin/order");
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}