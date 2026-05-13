import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_FROM,
    pass: process.env.PASS,
  },
});

interface SendEmailOptions {
  to: string;
  subject: string;
  text: string;
  html?: string;
  replyTo?: string;
  fromName?: string;
}

export const sendEmail = async (
  toOrOptions: string | SendEmailOptions,
  subject?: string,
  text?: string,
  html?: string
) => {
  try {
    let mailOptions: any;

    if (typeof toOrOptions === "object") {
      // New object-based API
      const { to, subject: subj, text: txt, html: htm, replyTo, fromName } = toOrOptions;
      mailOptions = {
        from: fromName
          ? `"${fromName}" <${process.env.EMAIL_FROM}>`
          : process.env.EMAIL_FROM,
        to,
        subject: subj,
        text: txt,
        html: htm || txt,
        ...(replyTo && { replyTo }),
      };
    } else {
      // Backwards-compatible old API
      mailOptions = {
        from: process.env.EMAIL_FROM,
        to: toOrOptions,
        subject,
        text,
        html: html || text,
      };
    }

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: %s", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Email send error:", error);
    return { success: false, error };
  };
};
