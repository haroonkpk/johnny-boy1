"use server";

import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function signupAction(formData: any) {
  try {
    await dbConnect();

    // Check if user already exists
    const existingUser = await User.findOne({ email: formData.email });
    if (existingUser) {
      return { error: "User already exists with this email" };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(formData.password, 10);

    // Create user
    const newUser = new User({
      ...formData,
      password: hashedPassword,
      role: "wholesaler", // Default for signup
    });

    await newUser.save();

    return { success: true, message: "Account created successfully" };
  } catch (error: any) {
    console.error("Signup Error:", error);
    return { error: error.message || "Something went wrong during signup" };
  }
}
