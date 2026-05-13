
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name, userId, cartItems, totalPrice } = body;

    // 1. Basic validation
    if (!email || !name) {
      return NextResponse.json({ error: "Email and Name are required" }, { status: 400 });
    }

    // 2. Fetch User Details if logged in
    let userDetails = null;
    if (userId) {
      await dbConnect();
      userDetails = await User.findById(userId).lean();
    }

    // 3. Transporter configuration
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_FROM,
        pass: process.env.PASS,
      },
      tls: {
        rejectUnauthorized: false, 
      },
    });

    // 4. Email Body 
    const itemsList = cartItems && cartItems.length > 0 
      ? cartItems.map((item: any) => `
          <tr style="border-bottom: 1px solid #f3f4f6;">
            <td style="padding: 12px 0; color: #1f2937;">
              <div style="font-weight: 600;">${item.name}</div>
              <div style="font-size: 11px; color: #9ca3af; text-transform: uppercase;">ID: ${item.id}</div>
            </td>
            <td style="padding: 12px 0; text-align: center; color: #4b5563;">x${item.quantity}</td>
            <td style="padding: 12px 0; text-align: right; font-weight: 600; color: #111827;">$${(item.price * item.quantity).toFixed(2)}</td>
          </tr>
        `).join("")
      : "<tr><td colspan='3' style='padding: 12px 0; text-align: center; color: #9ca3af;'>No items found</td></tr>";

    const userProfileHtml = userDetails ? `
      <div style="background-color: #ffffff; border-radius: 16px; padding: 32px; margin-bottom: 32px; border: 1px solid #e5e7eb; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
        <h3 style="margin: 0 0 24px 0; color: #ea580c; font-size: 20px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 2px solid #f3f4f6; padding-bottom: 12px;">
          Customer Details
        </h3>
        
        <div style="space-y: 12px;">
          <p style="margin: 10px 0; font-size: 14px; display: flex; align-items: baseline;">
            <strong style="color: #64748b; min-width: 140px; display: inline-block;">Customer Name:</strong> 
            <span style="color: #111827; font-weight: 700;">${userDetails.firstName} ${userDetails.lastName}</span>
          </p>
          <p style="margin: 10px 0; font-size: 14px; display: flex; align-items: baseline;">
            <strong style="color: #64748b; min-width: 140px; display: inline-block;">Business Name:</strong> 
            <span style="color: #111827; font-weight: 700;">${userDetails.businessName || 'N/A'}</span>
          </p>
          <p style="margin: 10px 0; font-size: 14px; display: flex; align-items: baseline;">
            <strong style="color: #64748b; min-width: 140px; display: inline-block;">Email Address:</strong> 
            <span style="color: #111827; font-weight: 700;">${userDetails.email}</span>
          </p>
          <p style="margin: 10px 0; font-size: 14px; display: flex; align-items: baseline;">
            <strong style="color: #64748b; min-width: 140px; display: inline-block;">Phone Number:</strong> 
            <span style="color: #111827; font-weight: 700;">${userDetails.phone || 'N/A'}</span>
          </p>
          <p style="margin: 10px 0; font-size: 14px; display: flex; align-items: baseline;">
            <strong style="color: #64748b; min-width: 140px; display: inline-block;">Website:</strong> 
            <span style="color: #111827; font-weight: 700;">${userDetails.website || 'N/A'}</span>
          </p>
          <p style="margin: 10px 0; font-size: 14px; display: flex; align-items: baseline;">
            <strong style="color: #64748b; min-width: 140px; display: inline-block;">Monthly Sales:</strong> 
            <span style="color: #111827; font-weight: 700;">${userDetails.monthlyUnitSales || 'N/A'}</span>
          </p>
          <p style="margin: 10px 0; font-size: 14px; display: flex; align-items: baseline;">
            <strong style="color: #64748b; min-width: 140px; display: inline-block;">Store Address:</strong> 
            <span style="color: #111827; font-weight: 700;">${userDetails.storeAddress || 'N/A'}</span>
          </p>
        </div>

        <div style="margin-top: 24px; padding: 20px; background-color: #f9fafb; border-radius: 12px; border: 1px solid #e5e7eb;">
          <strong style="display: block; color: #64748b; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 8px;">Business Bio / Intro</strong>
          <div style="color: #4b5563; font-size: 14px; line-height: 1.6; font-style: italic; border-left: 3px solid #ea580c; padding-left: 15px;">
            "${userDetails.briefIntro || 'No bio provided'}"
          </div>
        </div>
      </div>
    ` : `
      <div style="background-color: #ffffff; border-radius: 16px; padding: 24px; margin-bottom: 32px; border: 1px solid #fee2e2; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
        <div style="display: flex; align-items: center; margin-bottom: 16px;">
          <div style="width: 12px; height: 12px; background-color: #ef4444; border-radius: 50%; margin-right: 12px;"></div>
          <h3 style="margin: 0; color: #ef4444; font-size: 16px; font-weight: 800;">Guest Inquiry</h3>
        </div>
        <p style="margin: 0 0 8px 0; color: #111827; font-weight: 600;">Customer: ${name}</p>
        <p style="margin: 0; color: #6b7280;">Email: ${email}</p>
      </div>
    `;

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.5; color: #374151; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
          .header { text-align: center; margin-bottom: 48px; }
          .logo { color: #111827; font-size: 24px; font-weight: 900; text-transform: uppercase; letter-spacing: -0.05em; }
          .logo span { color: #ea580c; }
          .footer { text-align: center; margin-top: 48px; color: #9ca3af; font-size: 12px; }
        </style>
      </head>
      <body style="background-color: #f8fafc;">
        <div class="container">
          <div class="header">
            <div class="logo">JOHNNY<span>BOY</span> WHOLESALE</div>
            <div style="height: 2px; width: 40px; background-color: #ea580c; margin: 16px auto;"></div>
            <p style="color: #64748b; font-size: 14px; font-weight: 500; margin-top: 8px;">New Order Inquiry Received</p>
          </div>

          ${userProfileHtml}

          <div style="background-color: #ffffff; border-radius: 16px; padding: 32px; border: 1px solid #e5e7eb; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
              <h3 style="margin: 0; color: #111827; font-size: 18px; font-weight: 800;">Order Summary</h3>
              <div style="background-color: #f3f4f6; padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: 700; color: #6b7280; text-transform: uppercase;">
                ${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </div>
            </div>
            
            <table style="width: 100%; border-collapse: collapse;">
              <thead>
                <tr style="border-bottom: 2px solid #f8fafc;">
                  <th style="text-align: left; padding-bottom: 12px; color: #9ca3af; font-size: 10px; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 700;">Items</th>
                  <th style="text-align: center; padding-bottom: 12px; color: #9ca3af; font-size: 10px; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 700;">Qty</th>
                  <th style="text-align: right; padding-bottom: 12px; color: #9ca3af; font-size: 10px; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 700;">Total</th>
                </tr>
              </thead>
              <tbody>
                ${itemsList}
              </tbody>
            </table>
            
            <div style="margin-top: 32px; padding-top: 24px; border-top: 2px solid #f8fafc; display: flex; justify-content: space-between; align-items: flex-end;">
              <div>
                <div style="color: #9ca3af; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 4px;">Grand Total</div>
                <div style="color: #ea580c; font-size: 32px; font-weight: 900; letter-spacing: -0.05em;">$${totalPrice}</div>
              </div>
              <div style="text-align: right; color: #9ca3af; font-size: 11px; font-weight: 500;">
                All prices are in USD
              </div>
            </div>
          </div>

          <div class="footer">
            <p style="margin-bottom: 8px; font-weight: 600;">Johnny Boy Wholesale &copy; ${new Date().getFullYear()}</p>
            <p>This inquiry requires a response within 24 business hours.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const message = {
      from: `"Johnny Boy Wholesale" <${process.env.EMAIL_FROM}>`,
      to: process.env.EMAIL_FROM,
      subject: ` ORDER INQUIRY: ${userDetails?.businessName || name}`,
      html: htmlContent,
    };

    // 5. Send Email
    await transporter.sendMail(message);

    return NextResponse.json({ message: "Email Sent Successfully" }, { status: 200 });

  } catch (err: any) {
    console.error("Email Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}