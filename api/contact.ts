import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactForm {
  firstName: string;
  lastName: string;
  email: string;
  service: string;
  message: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }

  const { firstName, lastName, email, service, message } = req.body as ContactForm;

  if (!firstName || !email || !service) {
    return res.status(400).json({ success: false, error: "Missing required fields" });
  }

  const notificationEmail = process.env.NOTIFICATION_EMAIL;
  if (!notificationEmail) {
    return res.status(500).json({ success: false, error: "Server configuration error" });
  }

  try {
    await resend.emails.send({
      from: "Fit Content Productions <onboarding@resend.dev>",
      to: notificationEmail,
      subject: `New Booking Request from ${firstName} ${lastName}`,
      html: `
        <h2>New Booking Request</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Message:</strong></p>
        <p>${message || "No message provided"}</p>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Failed to send email";
    return res.status(500).json({ success: false, error: errorMessage });
  }
}
