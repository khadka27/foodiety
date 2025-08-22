import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: parseInt(process.env.EMAIL_SERVER_PORT || "587"),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
});

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export async function sendEmail({ to, subject, html, text }: EmailOptions) {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to,
      subject,
      html,
      text,
    });

    console.log("Email sent:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Email sending failed:", error);
    return { success: false, error };
  }
}

export function generateVerificationEmailHTML(
  username: string,
  verificationUrl: string
) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Verify Your Email - Foodiety</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #dc2626, #f97316); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .button { display: inline-block; background: #dc2626; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🍽️ Welcome to Foodiety!</h1>
        </div>
        <div class="content">
          <h2>Hi ${username}!</h2>
          <p>Thank you for joining our community of food lovers! To complete your registration and start exploring amazing recipes and restaurants, please verify your email address.</p>
          <div style="text-align: center;">
            <a href="${verificationUrl}" class="button">Verify Email Address</a>
          </div>
          <p>If the button doesn't work, copy and paste this link into your browser:</p>
          <p style="word-break: break-all; color: #666;">${verificationUrl}</p>
          <p><strong>This link will expire in 24 hours.</strong></p>
          <p>If you didn't create an account with Foodiety, please ignore this email.</p>
        </div>
        <div class="footer">
          <p>© 2025 Foodiety. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export function generatePasswordResetEmailHTML(
  username: string,
  resetUrl: string
) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Reset Your Password - Foodiety</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #dc2626, #f97316); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .button { display: inline-block; background: #dc2626; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
        .warning { background: #fef2f2; border: 1px solid #fecaca; padding: 15px; border-radius: 5px; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🔐 Password Reset Request</h1>
        </div>
        <div class="content">
          <h2>Hi ${username}!</h2>
          <p>We received a request to reset your password for your Foodiety account. If you made this request, click the button below to reset your password:</p>
          <div style="text-align: center;">
            <a href="${resetUrl}" class="button">Reset Password</a>
          </div>
          <p>If the button doesn't work, copy and paste this link into your browser:</p>
          <p style="word-break: break-all; color: #666;">${resetUrl}</p>
          <div class="warning">
            <p><strong>⚠️ Important:</strong></p>
            <ul>
              <li>This link will expire in 1 hour</li>
              <li>If you didn't request this reset, please ignore this email</li>
              <li>Your password will remain unchanged until you create a new one</li>
            </ul>
          </div>
        </div>
        <div class="footer">
          <p>© 2025 Foodiety. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export function generateWelcomeEmailHTML(username: string) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to Foodiety!</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #dc2626, #f97316); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .feature { background: white; padding: 20px; margin: 15px 0; border-radius: 8px; border-left: 4px solid #dc2626; }
        .button { display: inline-block; background: #dc2626; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎉 Welcome to Foodiety, ${username}!</h1>
        </div>
        <div class="content">
          <p>Your email has been verified successfully! You're now part of our amazing community of food enthusiasts.</p>
          
          <h3>Here's what you can do now:</h3>
          
          <div class="feature">
            <h4>🍳 Discover Recipes</h4>
            <p>Browse thousands of delicious recipes from around the world, with step-by-step instructions and nutritional information.</p>
          </div>
          
          <div class="feature">
            <h4>🏪 Find Restaurants</h4>
            <p>Explore curated restaurants in your area, read reviews, and discover new dining experiences.</p>
          </div>
          
          <div class="feature">
            <h4>❤️ Create Your Wishlist</h4>
            <p>Save your favorite recipes and restaurants to your personal wishlist for easy access.</p>
          </div>
          
          <div class="feature">
            <h4>📝 Share & Review</h4>
            <p>Share your own recipes, write reviews, and connect with fellow food lovers.</p>
          </div>
          
          <div style="text-align: center;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL}" class="button">Start Exploring</a>
          </div>
          
          <p>Happy cooking and dining!</p>
          <p>The Foodiety Team</p>
        </div>
        <div class="footer">
          <p>© 2025 Foodiety. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}
