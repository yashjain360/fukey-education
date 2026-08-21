import { NextResponse } from "next/server";
import { transporter } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { recipients, subject, message, audienceType } = body;

    if (!recipients || recipients.length === 0 || !subject || !message) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Plus Jakarta Sans', Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; }
          .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; }
          .header { background: linear-gradient(135deg, #050071 0%, #1C1A4A 50%, #5751E1 100%); padding: 32px 24px; text-align: center; color: #ffffff; }
          .logo { max-height: 44px; margin-bottom: 12px; }
          .content { padding: 32px 24px; color: #334155; line-height: 1.6; font-size: 14px; }
          .highlight-box { background: #f1f5f9; border-left: 4px solid #5751E1; padding: 16px; border-radius: 8px; margin: 20px 0; }
          .footer { background: #030045; padding: 24px; text-align: center; font-size: 11px; color: #94a3b8; }
          .btn { display: inline-block; background: #5751E1; color: #ffffff !important; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; margin-top: 16px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0; font-size: 22px; font-weight: 800;">Fukey Education Official Notice</h1>
            <p style="margin: 6px 0 0; font-size: 12px; opacity: 0.9;">Live Online Coaching • Bhopal Offline Studio</p>
          </div>
          <div class="content">
            <h2 style="color: #050071; margin-top: 0; font-size: 18px;">${subject}</h2>
            <div class="highlight-box">
              <p style="margin: 0; font-weight: 600; color: #1e293b;">${message.replace(/\n/g, "<br/>")}</p>
            </div>
            <p>For urgent academic assistance or batch timetable inquiries, contact our Bhopal admissions helpline:</p>
            <p><strong>📞 Official Helpline:</strong> +91 88718 35015 / +91 70248 49838<br/>
            <strong>📍 Center:</strong> Guru Kripa Tower, Kolar Road, Bhopal (M.P.)</p>
            <center>
              <a href="https://fukey-education-rosy.vercel.app/courses" class="btn">View Live Batches &amp; Timetable</a>
            </center>
          </div>
          <div class="footer">
            <p style="margin: 0;">© ${new Date().getFullYear()} Fukey Education Pvt. Ltd. All rights reserved.</p>
            <p style="margin: 4px 0 0;">CBSE &amp; State Board Online Coaching for Classes 9th to 12th</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Send emails
    const sendPromises = recipients.map((email: string) =>
      transporter.sendMail({
        from: `"Fukey Education Announcements" <info@thewebvale.com>`,
        to: email,
        subject: `[Fukey Education] ${subject}`,
        html: htmlContent,
      }).catch((e) => ({ error: String(e), email }))
    );

    await Promise.all(sendPromises);

    return NextResponse.json({
      success: true,
      deliveredCount: recipients.length,
      audienceType: audienceType || "all",
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
