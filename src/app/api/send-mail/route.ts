
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name, cartItems, totalPrice } = body;

    // 1. Basic validation
    if (!email || !name) {
      return NextResponse.json({ error: "Email and Name are required" }, { status: 400 });
    }

    // 2. Transporter configuration with TLS FIX
  
    const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // 465 ke liye hamesha true
  auth: {
    user: process.env.EMAIL_FROM,
    pass: process.env.PASS,
  },
  tls: {
    rejectUnauthorized: false, 
  },
});

    // 3. Email Body 
    const itemsList = cartItems && cartItems.length > 0 
      ? cartItems.map((item: any) => `<li>${item.name} (x${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}</li>`).join("")
      : "No items found";

    const message = {
      from: `Johnny Boy Wholesale <${process.env.EMAIL_FROM}>`,
      to: process.env.EMAIL_FROM, // Order hamesha aapki email par aayega
      subject: `New Order Received from ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; border: 1px solid #eee; padding: 20px;">
          <h2 style="color: #ea580c;">New Order Details</h2>
          <p><strong>Customer:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <hr />
          <h3>Items Ordered:</h3>
          <ul>${itemsList}</ul>
          <p style="font-size: 18px; font-weight: bold;">Total Amount: $${totalPrice}</p>
          <hr />
          <p style="color: #666; font-size: 12px;">This email was sent from your website's checkout form.</p>
        </div>
      `,
    };

    // 4. Send Email
    await transporter.sendMail(message);

    return NextResponse.json({ message: "Email Sent Successfully" }, { status: 200 });

  } catch (err: any) {
    console.error("Email Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}