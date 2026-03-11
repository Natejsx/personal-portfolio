import { Resend } from "resend";

const FROM = "Nate's Blog <blog@natejsx.dev>";

function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
}
const SITE_URL = process.env.SITE_URL ?? "http://localhost:5173";

interface SendNewPostEmailParams {
  postTitle: string;
  postDescription: string;
  postSlug: string;
  subscriberEmail: string;
  unsubscribeToken: string;
}

export async function sendNewPostEmail({
  postTitle,
  postDescription,
  postSlug,
  subscriberEmail,
  unsubscribeToken,
}: SendNewPostEmailParams): Promise<void> {
  const postUrl = `${SITE_URL}/blog/${postSlug}`;
  const unsubscribeUrl = `${SITE_URL.replace("5173", "8080")}/api/subscribers/unsubscribe/${unsubscribeToken}`;

  await getResend().emails.send({
    from: FROM,
    to: subscriberEmail,
    subject: `New post: ${postTitle}`,
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /></head>
      <body style="margin: 0; padding: 0; background-color: #f4f4f5;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f5; padding: 40px 0;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08);">

                <!-- Header -->
                <tr>
                  <td style="background-color: #0f0f0f; padding: 32px 40px; text-align: center;">
                    <p style="margin: 0; font-family: monospace; font-size: 22px; font-weight: 700; color: #4abf66; letter-spacing: 1px;">&lt;N8/&gt;</p>
                    <p style="margin: 8px 0 0; font-family: sans-serif; font-size: 13px; color: #888; letter-spacing: 2px; text-transform: uppercase;">New Post</p>
                  </td>
                </tr>

                <!-- Body -->
                <tr>
                  <td style="padding: 40px;">
                    <p style="margin: 0 0 8px; font-family: sans-serif; font-size: 12px; font-weight: 600; color: #4abf66; text-transform: uppercase; letter-spacing: 1.5px;">Just published</p>
                    <h1 style="margin: 0 0 16px; font-family: sans-serif; font-size: 26px; font-weight: 700; color: #111; line-height: 1.3;">${postTitle}</h1>
                    <p style="margin: 0 0 32px; font-family: sans-serif; font-size: 16px; color: #555; line-height: 1.7;">${postDescription}</p>
                    <a href="${postUrl}" style="display: inline-block; background-color: #4abf66; color: #ffffff; font-family: sans-serif; font-size: 15px; font-weight: 600; text-decoration: none; padding: 14px 32px; border-radius: 8px;">
                      Read Post →
                    </a>
                  </td>
                </tr>

                <!-- Divider -->
                <tr>
                  <td style="padding: 0 40px;">
                    <hr style="border: none; border-top: 1px solid #ebebeb; margin: 0;" />
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="padding: 24px 40px; text-align: center;">
                    <p style="margin: 0; font-family: sans-serif; font-size: 12px; color: #aaa; line-height: 1.6;">
                      You're receiving this because you subscribed to Nate's Blog.<br />
                      <a href="${unsubscribeUrl}" style="color: #aaa; text-decoration: underline;">Unsubscribe</a>
                    </p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `,
  });
}
