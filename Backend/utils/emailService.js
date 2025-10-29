import nodemailer from "nodemailer";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Create transporter for Gmail SMTP
let transporter = null;
if (
  process.env.EMAIL_USER &&
  process.env.EMAIL_PASS &&
  process.env.EMAIL_USER !== "your-email@gmail.com" &&
  process.env.EMAIL_PASS !== "your-16-char-app-password"
) {
  transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || "smtp.gmail.com",
    port: process.env.EMAIL_PORT || 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
}

// Function to send verification email
export const sendVerificationEmail = async (email, verificationCode) => {
  try {
    // Check if email credentials are configured
    if (
      !process.env.EMAIL_USER ||
      !process.env.EMAIL_PASS ||
      process.env.EMAIL_USER === "your-email@gmail.com" ||
      process.env.EMAIL_PASS === "your-16-char-app-password" ||
      !transporter
    ) {
      console.log("Gmail SMTP not configured - skipping email in development");
      return; // Skip sending email in development
    }

    const mailOptions = {
      from: process.env.EMAIL_FROM || `"Bhāga" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Email Verification - Bhāga",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Welcome to Bhāga!</h2>
          <p>Please verify your email address by entering the following verification code:</p>
          <div style="background-color: #f4f4f4; padding: 20px; text-align: center; margin: 20px 0;">
            <h1 style="color: #333; font-size: 32px; margin: 0;">${verificationCode}</h1>
          </div>
          <p>This code will expire in 24 hours.</p>
          <p>If you didn't create an account, please ignore this email.</p>
          <br>
          <p>Best regards,<br>Bhāga Team</p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Verification email sent successfully:", info.messageId);
  } catch (error) {
    console.error("Failed to send verification email:", error.message);
    // Don't throw error in development - allow registration to continue
    if (process.env.NODE_ENV === "production") {
      throw new Error("Failed to send verification email");
    }
  }
};

// Function to send password reset email
export const sendPasswordResetEmail = async (email, resetCode) => {
  try {
    // Check if email credentials are configured
    if (
      !process.env.EMAIL_USER ||
      !process.env.EMAIL_PASS ||
      process.env.EMAIL_USER === "your-email@gmail.com" ||
      process.env.EMAIL_PASS === "your-16-char-app-password" ||
      !transporter
    ) {
      console.log("Gmail SMTP not configured - skipping email in development");
      console.log(`Password reset code for ${email}: ${resetCode}`);
      return; // Skip sending email in development
    }

    const mailOptions = {
      from: process.env.EMAIL_FROM || `"Bhāga" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Password Reset - Bhāga",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Password Reset Request</h2>
          <p>You have requested to reset your password. Please use the following code to reset your password:</p>
          <div style="background-color: #f4f4f4; padding: 20px; text-align: center; margin: 20px 0;">
            <h1 style="color: #333; font-size: 32px; margin: 0;">${resetCode}</h1>
          </div>
          <p>This code will expire in 10 minutes.</p>
          <p>If you didn't request a password reset, please ignore this email or contact support if you have concerns.</p>
          <br>
          <p>Best regards,<br>Bhāga Team</p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Password reset email sent successfully:", info.messageId);
  } catch (error) {
    console.error("Failed to send password reset email:", error.message);
    // Don't throw error in development
    if (process.env.NODE_ENV === "production") {
      throw new Error("Failed to send password reset email");
    }
  }
};
