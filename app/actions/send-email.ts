"use server"

import { z } from "zod"

// ───────────────────────────────────────────────────────────────
// Schema — all fields are validated server-side (never trust client)
// ───────────────────────────────────────────────────────────────
const ContactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100).trim(),
  company: z.string().max(100).trim().optional(),
  phone: z.string().min(7, "Valid phone number required").max(30).trim(),
  email: z.string().email("Valid email address required").max(200).toLowerCase().trim(),
  projectType: z.enum([
    "Indoor LED Display",
    "Outdoor LED Display",
    "Maintenance / Support",
    "Technical Consultation",
    "Other",
  ]),
  message: z.string().min(10, "Please provide more detail (min 10 characters)").max(5000).trim(),
  // Honeypot — must be empty. Real users never fill this.
  website: z.string().max(0, "Bot detected"),
  // Turnstile token from the widget
  turnstileToken: z.string().min(1, "Bot verification required"),
})

export type ContactFormState = {
  success: boolean
  message: string
  errors?: Record<string, string[]>
}

// ───────────────────────────────────────────────────────────────
// Verify Cloudflare Turnstile token server-side
// ───────────────────────────────────────────────────────────────
async function verifyTurnstile(token: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY
  if (!secret) {
    console.error("TURNSTILE_SECRET_KEY is not set")
    return false
  }

  const formData = new FormData()
  formData.append("secret", secret)
  formData.append("response", token)

  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body: formData,
  })

  const data = (await res.json()) as { success: boolean; "error-codes"?: string[] }
  if (!data.success) {
    console.warn("Turnstile verification failed:", data["error-codes"])
  }
  return data.success
}

// ───────────────────────────────────────────────────────────────
// Build a rich HTML email body
// ───────────────────────────────────────────────────────────────
function buildEmailHtml(data: z.infer<typeof ContactSchema>): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Consultation Request — Avenida Technologies</title>
</head>
<body style="margin:0;padding:0;background-color:#0A0F14;font-family:Inter,Arial,sans-serif;color:#ffffff;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;padding:32px 16px;">
    <tr>
      <td>
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#121922;border:1px solid rgba(255,255,255,0.08);border-radius:16px;overflow:hidden;">
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#00B7FF,#5CE1E6);padding:4px 0;"></td>
          </tr>
          <tr>
            <td style="padding:32px 40px 24px;">
              <h1 style="margin:0 0 8px;font-size:24px;font-weight:700;color:#ffffff;">New Consultation Request</h1>
              <p style="margin:0;color:#9CA9B7;font-size:14px;">Submitted via avenidatech.com contact form</p>
            </td>
          </tr>
          <!-- Details -->
          <tr>
            <td style="padding:0 40px 32px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                ${buildRow("Name", data.name)}
                ${buildRow("Company", data.company || "—")}
                ${buildRow("Phone", data.phone)}
                ${buildRow("Email", `<a href="mailto:${data.email}" style="color:#00B7FF;text-decoration:none;">${data.email}</a>`)}
                ${buildRow("Project Type", data.projectType)}
              </table>

              <!-- Message -->
              <div style="margin-top:24px;background:rgba(0,183,255,0.05);border:1px solid rgba(0,183,255,0.15);border-radius:12px;padding:20px;">
                <p style="margin:0 0 8px;font-size:12px;color:#9CA9B7;text-transform:uppercase;letter-spacing:0.08em;font-weight:600;">Message</p>
                <p style="margin:0;color:#ffffff;font-size:15px;line-height:1.6;">${data.message.replace(/\n/g, "<br/>")}</p>
              </div>

              <!-- Reply CTA -->
              <div style="margin-top:32px;text-align:center;">
                <a href="mailto:${data.email}?subject=Re: ${encodeURIComponent(data.projectType)} Inquiry"
                   style="display:inline-block;background:#00B7FF;color:#0A0F14;font-weight:700;font-size:14px;padding:12px 28px;border-radius:8px;text-decoration:none;">
                  Reply to ${data.name}
                </a>
              </div>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding:20px 40px;border-top:1px solid rgba(255,255,255,0.08);">
              <p style="margin:0;color:#9CA9B7;font-size:12px;text-align:center;">
                This email was generated automatically from your website contact form.<br/>
                © ${new Date().getFullYear()} Avenida Technologies
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

function buildRow(label: string, value: string): string {
  return `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.06);">
        <span style="display:block;font-size:11px;color:#9CA9B7;text-transform:uppercase;letter-spacing:0.08em;font-weight:600;margin-bottom:4px;">${label}</span>
        <span style="font-size:15px;color:#ffffff;">${value}</span>
      </td>
    </tr>`
}

// ───────────────────────────────────────────────────────────────
// Main Server Action
// ───────────────────────────────────────────────────────────────
export async function sendContactEmail(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  // 1. Parse + validate input
  const raw = {
    name: formData.get("name"),
    company: formData.get("company"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    projectType: formData.get("projectType"),
    message: formData.get("message"),
    website: formData.get("website"), // honeypot
    turnstileToken: formData.get("turnstileToken"),
  }

  const parsed = ContactSchema.safeParse(raw)

  if (!parsed.success) {
    const errors: Record<string, string[]> = {}
    for (const [field, messages] of Object.entries(parsed.error.flatten().fieldErrors)) {
      errors[field] = messages as string[]
    }
    return { success: false, message: "Please fix the errors below.", errors }
  }

  const data = parsed.data

  // 2. Verify Turnstile (bot check)
  const isHuman = await verifyTurnstile(data.turnstileToken)
  if (!isHuman) {
    return {
      success: false,
      message: "Bot verification failed. Please try again.",
    }
  }

  // 3. Send via Brevo API (HTTP, works on Cloudflare Workers edge)
  const apiKey = process.env.BREVO_API_KEY
  const companyEmail = process.env.COMPANY_EMAIL || "info@avenidatech.com"
  const senderEmail = process.env.SENDER_EMAIL || "info@avenidatech.com"
  const senderName = process.env.SENDER_NAME || "Avenida Technologies Website"

  if (!apiKey) {
    console.error("BREVO_API_KEY is not configured")
    return {
      success: false,
      message: "Email service is not configured. Please contact us directly.",
    }
  }

  try {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        sender: { name: senderName, email: senderEmail },
        to: [{ email: companyEmail, name: "Avenida Technologies" }],
        replyTo: { email: data.email, name: data.name },
        subject: `New ${data.projectType} Inquiry from ${data.name}`,
        htmlContent: buildEmailHtml(data),
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Brevo API error:", response.status, errorText)
      return {
        success: false,
        message: "Failed to send message. Please try again or contact us via WhatsApp.",
      }
    }

    return {
      success: true,
      message: "Your message has been sent successfully! We will get back to you within 24 hours.",
    }
  } catch (error) {
    console.error("Email send error:", error)
    return {
      success: false,
      message: "Network error. Please try again or contact us via WhatsApp.",
    }
  }
}
