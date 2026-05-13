
"use server"

import dbConnect from "@/lib/mongodb";
import Contact from "@/models/Contact";
import { revalidatePath } from "next/cache";
import { sendEmail } from "@/lib/nodemailer";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";


export async function handleContactForm(prevState: any, formData: FormData) {
  try {
    await dbConnect();
    const name = formData.get("name")?.toString();
    const email = formData.get("email")?.toString();
    const message = formData.get("message")?.toString();

    if (!name || !email || !message) {
      return { success: false, message: "All fields are required." };
    }

    // Server-side email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { success: false, message: "Please enter a valid email address." };
    }

    await Contact.create({ name, email, message });
    
    // Send email notification to admin
    await sendEmail({
      to: process.env.EMAIL_FROM!,
      subject: `New Contact Message from ${name}`,
      replyTo: email,
      fromName: name,
      text:
        `You have received a new message from the Contact Us form.\n\n` +
        `Name: ${name}\n` +
        `Email: ${email}\n` +
        `Message: ${message}\n\n` +
        `Manage contacts: ${process.env.NEXTAUTH_URL}/admin/contacts`,
      html: `
      <div style="font-family: sans-serif; padding: 24px; color: #333; max-width: 600px;">
        <h2 style="color: #2563eb; margin-bottom: 4px;">📩 New Contact Message</h2>
        <p style="color: #666; margin-top: 0;">Sent via the <strong>Contact Us</strong> form</p>
        <div style="background-color: #f3f4f6; padding: 16px; border-radius: 10px; margin: 20px 0;">
          <p><strong>👤 Name:</strong> ${name}</p>
          <p><strong>📧 Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>💬 Message:</strong></p>
          <p style="white-space: pre-wrap; color: #444;">${message.replace(/\n/g, "<br/>")}</p>
        </div>
        <a href="${process.env.NEXTAUTH_URL}/admin/contacts"
           style="display: inline-block; background-color: #2563eb; color: white; padding: 10px 22px; text-decoration: none; border-radius: 6px; font-weight: 600;">
          View in Dashboard
        </a>
        <p style="margin-top: 16px; font-size: 12px; color: #999;">Reply to this email to respond directly to ${name}.</p>
      </div>
      `,
    });

    await sendEmail({
      to: email,
      subject: "✅ We've received your message!",
      fromName: "Johnny Boy Team",
      text:
        `Hi ${name},\n\nThank you for reaching out!\n` +
        `We've received your message and will get back to you soon.\n\n` +
        `Your message:\n${message}`,
      html: `
      <div style="font-family: sans-serif; padding: 24px; color: #333; max-width: 600px;">
        <h2 style="color: #2563eb;">✅ Message Received!</h2>
        <p>Hi <strong>${name}</strong>,</p>
        <p>Thank you for contacting us. We've received your message and our team will get back to you as soon as possible.</p>
        <div style="border-left: 4px solid #2563eb; padding: 12px 16px; margin: 20px 0; background: #f0f4ff; border-radius: 4px; color: #555;">
          <p style="margin: 0 0 6px;"><strong>Your Message:</strong></p>
          <p style="margin: 0; white-space: pre-wrap;">${message.replace(/\n/g, "<br/>")}</p>
        </div>
        <p style="margin-top: 24px;">Best Regards,<br/><strong>Johnny Boy Team</strong></p>
      </div>
      `,
    });

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
    const session = await getServerSession(authOptions);
    if (!session) return [];

    let query = {};
    if ((session.user as any).role === "worker") {
      query = { assignedTo: (session.user as any).id };
    }

    const data = await Contact.find(query).sort({ createdAt: -1 });
    return JSON.parse(JSON.stringify(data));
  } catch (error) {
    return [];
  }
}

export async function replyContact(contactId: string, replyMessage: string) {
  try {
    await dbConnect();
    const session = await getServerSession(authOptions);
    if (!session) return { error: "Not authenticated" };

    const contact = await Contact.findById(contactId);
    if (!contact) return { error: "Contact not found" };

    // Send email
    const emailResult = await sendEmail(
      contact.email,
      "Reply to your message",
      replyMessage
    );

    if (!emailResult.success) {
      return { error: "Failed to send email" };
    }

    // Update contact status
    contact.isReplied = true;
    contact.repliedAt = new Date();
    contact.replyMessage = replyMessage;
    contact.repliedBy = (session.user as any).id;
    await contact.save();

    revalidatePath("/admin/contacts");
    revalidatePath("/worker/messages");
    
    return { success: true, message: "Reply sent successfully!" };
  } catch (error: any) {
    console.error("Reply Contact Error:", error);
    return { error: error.message || "Failed to send reply" };
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