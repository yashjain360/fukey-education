import nodemailer from "nodemailer";

const smtpConfig = {
  host: process.env.SMTP_HOST || "smtpout.secureserver.net",
  port: parseInt(process.env.SMTP_PORT || "587", 10),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER || "info@thewebvale.com",
    pass: process.env.SMTP_PASS || "Global5972@",
  },
  tls: {
    rejectUnauthorized: false,
  },
};

export const transporter = nodemailer.createTransport(smtpConfig);

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

// Base HTML Wrapper with Plus Jakarta Sans & Fukey Brand Colors
function renderEmailWrapper(title: string, preheader: string, contentHtml: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f1f5f9;
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      color: #0f172a;
      -webkit-font-smoothing: antialiased;
    }
    .email-container {
      max-width: 600px;
      margin: 30px auto;
      background-color: #ffffff;
      border-radius: 24px;
      overflow: hidden;
      box-shadow: 0 10px 25px -5px rgba(5, 0, 113, 0.08), 0 8px 10px -6px rgba(5, 0, 113, 0.04);
      border: 1px solid #e2e8f0;
    }
    .header-banner {
      background: linear-gradient(135deg, #050071 0%, #1C1A4A 50%, #5751E1 100%);
      padding: 36px 30px;
      text-align: center;
      color: #ffffff;
    }
    .logo-badge {
      display: inline-block;
      background: rgba(255, 255, 255, 0.15);
      padding: 6px 14px;
      border-radius: 100px;
      font-size: 11px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #fed7aa;
      margin-bottom: 12px;
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
    .header-title {
      margin: 0;
      font-size: 26px;
      font-weight: 900;
      letter-spacing: -0.5px;
      line-height: 1.2;
    }
    .header-subtitle {
      margin: 6px 0 0 0;
      font-size: 13px;
      color: #cbd5e1;
    }
    .content-body {
      padding: 32px 30px;
      font-size: 14px;
      line-height: 1.65;
      color: #334155;
    }
    .button-primary {
      display: inline-block;
      background: linear-gradient(90deg, #050071 0%, #5751E1 60%, #FF2424 100%);
      color: #ffffff !important;
      font-weight: 800;
      font-size: 13px;
      padding: 14px 28px;
      border-radius: 14px;
      text-decoration: none;
      box-shadow: 0 4px 14px rgba(5, 0, 113, 0.25);
      margin: 20px 0;
    }
    .card-box {
      background-color: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 16px;
      padding: 20px;
      margin: 20px 0;
    }
    .footer-bar {
      background-color: #0f172a;
      padding: 24px 30px;
      text-align: center;
      font-size: 11px;
      color: #94a3b8;
      border-top: 1px solid #1e293b;
    }
    .footer-bar a {
      color: #a5b4fc;
      text-decoration: none;
      font-weight: 600;
    }
  </style>
</head>
<body>
  <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
    ${preheader}
  </div>
  <div class="email-container">
    <!-- Brand Header -->
    <div class="header-banner">
      <div class="logo-badge">🎓 Fukey Education Platform</div>
      <h1 class="header-title">${title}</h1>
      <p class="header-subtitle">CBSE &amp; State Boards Classes 9th–12th Live Coaching</p>
    </div>

    <!-- Content Body -->
    <div class="content-body">
      ${contentHtml}
    </div>

    <!-- Footer -->
    <div class="footer-bar">
      <p style="margin: 0 0 8px 0; color: #e2e8f0; font-weight: 700;">
        Fukey Education Academy
      </p>
      <p style="margin: 0 0 12px 0;">
        Official Helpline: <a href="tel:+918871835015">+91 88718 35015</a> • Email: <a href="mailto:info@fukeyeducation.com">info@fukeyeducation.com</a>
      </p>
      <p style="margin: 0; font-size: 10px; color: #64748b;">
        Platform Engineered &amp; Managed with ❤️ by <a href="https://thewebvale.com" target="_blank" style="color: #cbd5e1;">TheWebVale</a>
      </p>
    </div>
  </div>
</body>
</html>`;
}

// 1. Send Welcome / Registration Email
export async function sendWelcomeEmail(toEmail: string, studentName: string) {
  const content = `
    <p style="font-size: 16px; font-weight: 700; color: #0f172a; margin-top: 0;">
      Namaste ${studentName}, welcome to Fukey Education! 🙏
    </p>
    <p>
      We are thrilled to have you join our community of over <strong>650+ board exam aspirants</strong>. Your student profile is now activated and ready for your CBSE &amp; State Board preparation.
    </p>

    <div class="card-box">
      <h3 style="margin: 0 0 10px 0; font-size: 14px; font-weight: 800; color: #050071;">
        ✨ What you get with your student access:
      </h3>
      <ul style="margin: 0; padding-left: 18px; font-size: 13px; color: #475569;">
        <li style="margin-bottom: 6px;">Daily interactive live batches &amp; unlimited HD recording replays</li>
        <li style="margin-bottom: 6px;">100% solved NCERT chapter notes &amp; formula cheat-sheets</li>
        <li style="margin-bottom: 6px;">Chapter-wise quizzes, weekly board mock tests &amp; AI doubt resolution</li>
        <li>One-on-one WhatsApp mentorship from gold medalist faculty</li>
      </ul>
    </div>

    <div style="text-align: center;">
      <a href="${BASE_URL}/dashboard" class="button-primary">
        Go to Student Portal &rarr;
      </a>
    </div>

    <p style="font-size: 12px; color: #64748b; margin-bottom: 0;">
      If you have any questions or need batch guidance, simply reply to this email or reach out to our admissions desk at <strong>+91 88718 35015</strong>.
    </p>
  `;

  const html = renderEmailWrapper(
    "Welcome to Fukey Education!",
    "Your student portal account has been successfully created.",
    content
  );

  return await transporter.sendMail({
    from: process.env.SMTP_FROM || "Fukey Education <info@thewebvale.com>",
    to: toEmail,
    subject: "🎓 Welcome to Fukey Education – Your Board Preparation Starts Now!",
    html,
  });
}

// 2. Send Login Alert Email
export async function sendLoginAlertEmail(toEmail: string, studentName: string, role = "Student") {
  const timeString = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

  const content = `
    <p style="font-size: 15px; font-weight: 700; color: #0f172a; margin-top: 0;">
      Hello ${studentName},
    </p>
    <p>
      Your Fukey Education account was recently logged into. Here are the security details of this session:
    </p>

    <div class="card-box">
      <table style="width: 100%; font-size: 12px; border-collapse: collapse;">
        <tr>
          <td style="padding: 6px 0; color: #64748b; font-weight: 600;">Account Email:</td>
          <td style="padding: 6px 0; color: #0f172a; font-weight: 700; text-align: right;">${toEmail}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #64748b; font-weight: 600;">Portal Access:</td>
          <td style="padding: 6px 0; color: #050071; font-weight: 800; text-align: right;">${role} Portal</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #64748b; font-weight: 600;">Time (IST):</td>
          <td style="padding: 6px 0; color: #0f172a; font-weight: 600; text-align: right;">${timeString}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #64748b; font-weight: 600;">Status:</td>
          <td style="padding: 6px 0; color: #16a34a; font-weight: 700; text-align: right;">✓ Authenticated Session</td>
        </tr>
      </table>
    </div>

    <div style="text-align: center;">
      <a href="${BASE_URL}/dashboard" class="button-primary">
        Open Student Portal &rarr;
      </a>
    </div>

    <p style="font-size: 11px; color: #94a3b8; margin-bottom: 0;">
      If you did not initiate this login, please contact support immediately at <a href="mailto:info@fukeyeducation.com" style="color: #4f46e5;">info@fukeyeducation.com</a>.
    </p>
  `;

  const html = renderEmailWrapper(
    "Security Notification",
    "New login detected for your Fukey Education account.",
    content
  );

  return await transporter.sendMail({
    from: process.env.SMTP_FROM || "Fukey Education <info@thewebvale.com>",
    to: toEmail,
    subject: "🔐 Security Alert: Successful Login to Fukey Education",
    html,
  });
}

// 3. Send Course Purchase / Enrollment Receipt Email
export async function sendOrderConfirmationEmail(
  toEmail: string,
  studentName: string,
  order: {
    invoice: string;
    courseTitle: string;
    total: string | number;
    gateway: string;
    phone?: string;
  }
) {
  const content = `
    <p style="font-size: 16px; font-weight: 700; color: #0f172a; margin-top: 0;">
      Congratulations ${studentName}! 🎉
    </p>
    <p>
      Your course enrollment is officially confirmed. Your digital access pass, handwritten chapter notes, and live batch schedule are now active.
    </p>

    <div class="card-box" style="border-left: 4px solid #16a34a;">
      <div style="font-size: 11px; font-weight: 800; color: #16a34a; text-transform: uppercase; margin-bottom: 6px;">
        ✓ Verified Enrollment Receipt
      </div>
      <table style="width: 100%; font-size: 13px; border-collapse: collapse;">
        <tr>
          <td style="padding: 6px 0; color: #64748b;">Invoice Number:</td>
          <td style="padding: 6px 0; font-family: monospace; font-weight: 800; text-align: right; color: #050071;">${order.invoice}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #64748b;">Enrolled Batch:</td>
          <td style="padding: 6px 0; font-weight: 700; text-align: right; color: #0f172a;">${order.courseTitle}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #64748b;">Payment Method:</td>
          <td style="padding: 6px 0; font-weight: 600; text-align: right; color: #0f172a;">${order.gateway}</td>
        </tr>
        <tr style="border-top: 1px dashed #cbd5e1;">
          <td style="padding: 10px 0 4px 0; font-weight: 800; color: #0f172a;">Total Amount Paid:</td>
          <td style="padding: 10px 0 4px 0; font-weight: 900; font-size: 16px; color: #16a34a; text-align: right;">${order.total}</td>
        </tr>
      </table>
    </div>

    <div style="text-align: center;">
      <a href="${BASE_URL}/dashboard" class="button-primary">
        Start Attending Live Lectures &rarr;
      </a>
    </div>

    <p style="font-size: 12px; color: #64748b; margin-bottom: 0;">
      ${order.phone ? `A confirmation SMS and WhatsApp invite link have also been dispatched to your mobile number <strong>${order.phone}</strong>.` : `Your course enrollment and student pass have been successfully activated.`}
    </p>
  `;

  const html = renderEmailWrapper(
    "Enrollment Confirmed!",
    `Your receipt for ${order.courseTitle} (#${order.invoice})`,
    content
  );

  return await transporter.sendMail({
    from: process.env.SMTP_FROM || "Fukey Education <info@thewebvale.com>",
    to: toEmail,
    subject: `🧾 Official Invoice & Course Enrollment Receipt #${order.invoice}`,
    html,
  });
}

// 4. Send Password Reset Email
export async function sendPasswordResetEmail(toEmail: string, resetToken: string) {
  const resetLink = `${BASE_URL}/login?resetToken=${resetToken}`;

  const content = `
    <p style="font-size: 15px; font-weight: 700; color: #0f172a; margin-top: 0;">
      Password Reset Request
    </p>
    <p>
      We received a request to reset the password for your Fukey Education account (<strong>${toEmail}</strong>).
    </p>

    <div style="text-align: center; margin: 24px 0;">
      <a href="${resetLink}" class="button-primary">
        Reset My Password &rarr;
      </a>
    </div>

    <div class="card-box" style="font-size: 12px; color: #64748b;">
      <p style="margin: 0 0 6px 0;"><strong>Security Note:</strong></p>
      <p style="margin: 0;">
        This password reset link is valid for 30 minutes. If you did not request a password change, no action is required and your account remains safe.
      </p>
    </div>
  `;

  const html = renderEmailWrapper(
    "Reset Your Password",
    "Instructions to reset your Fukey Education account password.",
    content
  );

  return await transporter.sendMail({
    from: process.env.SMTP_FROM || "Fukey Education <info@thewebvale.com>",
    to: toEmail,
    subject: "🔑 Reset Your Fukey Education Password",
    html,
  });
}

// 5. Send Admission Enquiry & Free Callback Receipt Email
export async function sendEnquiryReceiptEmail(
  toEmail: string,
  studentName: string,
  enquiryData: { targetClass: string; medium: string; phone: string }
) {
  const content = `
    <p style="font-size: 16px; font-weight: 700; color: #0f172a; margin-top: 0;">
      Thank You ${studentName}! 🌟
    </p>
    <p>
      We have received your admission enquiry for <strong>${enquiryData.targetClass} (${enquiryData.medium})</strong>.
    </p>

    <div class="card-box">
      <h3 style="margin: 0 0 8px 0; font-size: 13px; font-weight: 800; color: #050071;">
        📞 What happens next?
      </h3>
      <p style="margin: 0 0 10px 0; font-size: 13px; color: #475569;">
        Our senior academic counselor will call you on <strong>${enquiryData.phone}</strong> within 15 minutes to answer all your syllabus questions and unlock your free live trial class.
      </p>
      <p style="margin: 0; font-size: 12px; color: #16a34a; font-weight: 700;">
        🎁 Bonus: Your Free NCERT Formula Handbook PDF is available in your student portal!
      </p>
    </div>

    <div style="text-align: center;">
      <a href="${BASE_URL}/ebooks" class="button-primary">
        Download Free Formula PDF &rarr;
      </a>
    </div>
  `;

  const html = renderEmailWrapper(
    "Admission Enquiry Received",
    "Our academic counselor will contact you shortly.",
    content
  );

  return await transporter.sendMail({
    from: process.env.SMTP_FROM || "Fukey Education <info@thewebvale.com>",
    to: toEmail,
    subject: "📞 Admission Callback Requested – Fukey Education",
    html,
  });
}
