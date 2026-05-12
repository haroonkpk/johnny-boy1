"use server";

import dbConnect from "@/lib/mongodb";
import User from "@/models/User";

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