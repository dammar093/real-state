// utils/sendEmail.ts
import nodemailer from "nodemailer";
import ejs from "ejs";
import path from "path";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER!,
    pass: process.env.MAIL_PASS!,
  },
});

export const sendOtpEmail = async (to: string, userName: string, otpCode: string) => {
  const templatePath = path.join(process.cwd(), "src", "views", "emails", "otp.ejs");

  const forwardSlashPath = templatePath.replace(/\\/g, '/');
  console.log(forwardSlashPath)
  try {
    const html = await ejs.renderFile(forwardSlashPath, { userName, otpCode });
    const mailOptions = {
      from: `"Book My Room" <${process.env.MAIL_USER!}>`,
      to,
      subject: "Your OTP Code - Book My Room",
      html,
    };

    await transporter.sendMail(mailOptions);
    console.log("✅ OTP email sent to:", to);
  } catch (error) {
    console.error("❌ Failed to send OTP email:", error);
    throw error;
  }
};
