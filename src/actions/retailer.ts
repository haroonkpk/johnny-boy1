
"use server";

import dbConnect from "@/lib/mongodb"; 
import User from "@/models/User"; 
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

export const updateRetailerProfile = async (id: string, data: any) => {
  try {
    // 1. Database connection lazmi hai
    await dbConnect();

    if (!id) return { error: "User ID is required" };

    // Aapke model ke mutabiq fields extract karein
    const { firstName, lastName, email, businessName, phone, password, storeAddress, website } = data;

    // 2. Find user using Mongoose (findById)
    const existingUser = await User.findById(id);

    if (!existingUser) {
      return { error: "User not found in database!" };
    }

    // 3. Email uniqueness check (agar email change ho rahi ho)
    if (email && email !== existingUser.email) {
      const emailExists = await User.findOne({ email });
      if (emailExists) {
        return { error: "This email is already registered." };
      }
    }

    // 4. Update data (Aapke model ke schema ke mutabiq fields name change kiye hain)
    existingUser.firstName = firstName || existingUser.firstName;
    existingUser.lastName = lastName || existingUser.lastName;
    existingUser.email = email || existingUser.email;
    existingUser.businessName = businessName || existingUser.businessName;
    existingUser.phone = phone || existingUser.phone;
    existingUser.storeAddress = storeAddress || existingUser.storeAddress;
    existingUser.website = website || existingUser.website;

    // 5. Password update (agar user ne input diya hai)
    if (password && password.trim() !== "") {
      if (password.length < 6) {
        return { error: "Password must be at least 6 characters long." };
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      existingUser.password = hashedPassword;
    }

    // 6. Save changes
    await existingUser.save();

    // UI update karein
    revalidatePath("/retailer/profile");

    return { success: true };
  } catch (error: any) {
    console.error("RETAILER_UPDATE_ERROR:", error);
    return { error: "Something went wrong while updating profile." };
  }
};