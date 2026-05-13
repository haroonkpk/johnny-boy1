"use server";

import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import Contact from "@/models/Contact";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

export async function getRetailers() {
  try {
    await dbConnect();

    const retailers = await User.find({ role: "retailer" })
      .select("firstName lastName email phone businessName status createdAt storeAddress monthlyUnitSales website briefIntro")
      .sort({ createdAt: -1 })
      .lean();

    // Serialize MongoDB documents
    return retailers.map((r: any) => ({
      id: r._id.toString(),
      firstName: r.firstName,
      lastName: r.lastName,
      email: r.email,
      phone: r.phone,
      businessName: r.businessName,
      storeAddress: r.storeAddress,
      monthlyUnitSales: r.monthlyUnitSales,
      website: r.website,
      briefIntro: r.briefIntro,
      status: r.status || "pending",
      createdAt: new Date(r.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
    }));
  } catch (error: any) {
    console.error("Get Retailers Error:", error);
    return [];
  }
}

export async function updateRetailerStatus(
  retailerId: string,
  status: "approved" | "rejected"
) {
  try {
    await dbConnect();

    const user = await User.findByIdAndUpdate(
      retailerId,
      { status },
      { new: true }
    );

    if (!user) {
      return { error: "Retailer not found" };
    }

    return { success: true, message: `Retailer ${status} successfully` };
  } catch (error: any) {
    console.error("Update Retailer Status Error:", error);
    return { error: error.message || "Something went wrong" };
  }
}

export async function deleteRetailer(retailerId: string) {
  try {
    await dbConnect();

    const deleted = await User.findByIdAndDelete(retailerId);

    if (!deleted) {
      return { success: false, error: "Retailer not found" };
    }

    return { success: true, message: "Retailer deleted successfully" };
  } catch (error: any) {
    console.error("Delete Retailer Error:", error);
    return { success: false, error: error.message || "Something went wrong" };
  }
}

export async function getWorkers() {
  try {
    await dbConnect();
    const workers = await User.find({ role: "worker" })
      .select("username email createdAt")
      .sort({ createdAt: -1 })
      .lean();

    return workers.map((w: any) => ({
      id: w._id.toString(),
      username: w.username,
      email: w.email,
      createdAt: new Date(w.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
    }));
  } catch (error: any) {
    console.error("Get Workers Error:", error);
    return [];
  }
}

export async function createWorker(data: any) {
  try {
    await dbConnect();
    const { username, email, password } = data;

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return { error: "User already exists with this email" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const worker = await User.create({
      username,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: "worker",
    });

    revalidatePath("/admin/workers");
    return { success: true, message: "Worker created successfully" };
  } catch (error: any) {
    console.error("Create Worker Error:", error);
    return { error: error.message || "Something went wrong" };
  }
}

export async function deleteWorker(workerId: string) {
  try {
    await dbConnect();
    await User.findByIdAndDelete(workerId);
    revalidatePath("/admin/workers");
    return { success: true, message: "Worker deleted successfully" };
  } catch (error: any) {
    console.error("Delete Worker Error:", error);
    return { error: error.message || "Something went wrong" };
  }
}

export async function assignContact(contactId: string, workerId: string) {
  try {
    await dbConnect();
    const contact = await Contact.findByIdAndUpdate(
      contactId,
      { assignedTo: workerId },
      { new: true }
    );

    if (!contact) {
      return { error: "Contact message not found" };
    }

    revalidatePath("/admin/contacts");
    revalidatePath("/worker/messages");
    return { success: true, message: "Contact assigned successfully" };
  } catch (error: any) {
    console.error("Assign Contact Error:", error);
    return { error: error.message || "Something went wrong" };
  }
}

export async function updateWorker(workerId: string, data: any) {
  try {
    await dbConnect();
    const { username, email, password } = data;

    const updateData: any = {
      username,
      email: email.toLowerCase(),
    };

    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const worker = await User.findByIdAndUpdate(workerId, updateData, { new: true });
    if (!worker) {
      return { error: "Worker not found" };
    }

    revalidatePath("/admin/workers");
    return { success: true, message: "Worker updated successfully" };
  } catch (error: any) {
    console.error("Update Worker Error:", error);
    return { error: error.message || "Something went wrong" };
  }
}

export async function updateAdminProfile(adminId: string, data: any) {
  try {
    await dbConnect();
    const { username, email, password } = data;

    const updateData: any = {
      username,
      email: email.toLowerCase(),
    };

    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const admin = await User.findByIdAndUpdate(adminId, updateData, { new: true });
    if (!admin) {
      return { error: "Admin not found" };
    }

    return { success: true, message: "Profile updated successfully" };
  } catch (error: any) {
    console.error("Update Admin Profile Error:", error);
    return { error: error.message || "Something went wrong" };
  }
}