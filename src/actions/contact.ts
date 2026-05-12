
"use server"

import dbConnect from "@/lib/mongodb";
import Contact from "@/models/Contact";
import { revalidatePath } from "next/cache";


export async function handleContactForm(prevState: any, formData: FormData) {
  try {
    await dbConnect();
    const name = formData.get("name")?.toString();
    const email = formData.get("email")?.toString();
    const message = formData.get("message")?.toString();

    if (!name || !email || !message) {
      return { success: false, message: "All fields are required." };
    }

    await Contact.create({ name, email, message });
    
    // Admin page  refresh
    revalidatePath("/admin/contacts");
    
    return { success: true, message: "Message sent successfully!" };
  } catch (error) {
    return { success: false, message: "Failed to send message." };
  }
}

//  GET ALL MESSAGES 
export async function getContacts() {
  try {
    await dbConnect();
    const data = await Contact.find({}).sort({ createdAt: -1 });
    return JSON.parse(JSON.stringify(data));
  } catch (error) {
    return [];
  }
}

//DELETE MESSAGE for admin
export async function deleteContact(id: string) {
  try {
    await dbConnect();
    await Contact.findByIdAndDelete(id);
    revalidatePath("/admin/contacts");
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}