import { Resend } from "resend";

const FROM = "Nate's Blog <onboarding@resend.dev>";

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
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #f9f9f9;">
        <h1 style="color: #333; font-size: 24px; margin-bottom: 8px;">New post on Nate's Blog</h1>
        <h2 style="color: #4abf66; font-size: 20px; margin-bottom: 12px;">${postTitle}</h2>
        <p style="color: #555; font-size: 16px; line-height: 1.6; margin-bottom: 24px;">${postDescription}</p>
        <a href="${postUrl}" style="display: inline-block; background: #4abf66; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600;">
          Read Post →
        </a>
        <hr style="margin: 32px 0; border: none; border-top: 1px solid #ddd;" />
        <p style="color: #999; font-size: 12px;">
          You're receiving this because you subscribed to Nate's Blog.
          <a href="${unsubscribeUrl}" style="color: #999;">Unsubscribe</a>
        </p>
      </div>
    `,
  });
}
