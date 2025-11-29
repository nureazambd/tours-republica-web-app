// utils/sendEmail.ts
import nodemailer from "nodemailer";

export async function sendEmail(to: string, subject: string, html: string) {
  const host = process.env.EMAIL_HOST;
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;
  const port = process.env.EMAIL_PORT ? Number(process.env.EMAIL_PORT) : 587;

  if (!host || !user || !pass) {
    // fallback: log to server console so you can click the link during dev
    console.info("EMAIL CREDENTIALS MISSING - logging email to console:");
    console.info({ to, subject, html });
    return;
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // true for 465
    auth: { user, pass },
  });

  await transporter.sendMail({
    from: `"ToursRepublica" <${user}>`,
    to,
    subject,
    html,
  });
}
