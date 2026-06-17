"use server"

import { z } from "zod"
import { headers } from "next/headers"

// Schema — all fields are validated server-side
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
// Rate Limiting — simple in-memory cache (per IP, max 5 requests/hour)
// Note: This won't persist across Worker instances in production
// Consider using Cloudflare KV for production
// ───────────────────────────────────────────────────────────────
const rateLimitCache = new Map<string, number[]>()
const RATE_LIMIT_MAX_REQUESTS = 5
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000 // 1 hour

function getClientIp(headersList: Awaited<ReturnType<typeof headers>>): string {
  return (
    headersList.get("x-forwarded-for")?.split(",")[0].trim() ||
    headersList.get("x-real-ip") ||
    "unknown"
  )
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const requests = rateLimitCache.get(ip) || []

  // Remove old requests outside the time window
  const recentRequests = requests.filter((timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS)

  if (recentRequests.length >= RATE_LIMIT_MAX_REQUESTS) {
    return false // Rate limited
  }

  recentRequests.push(now)
  rateLimitCache.set(ip, recentRequests)
  return true
}

// Verify Cloudflare Turnstile token server-side
async function verifyTurnstile(token: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY
  if (!secret) {
    console.error("Security: TURNSTILE_SECRET_KEY is not set")
    return false
  }

  try {
    const formData = new FormData()
    formData.append("secret", secret)
    formData.append("response", token)

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000) 

    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: formData,
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    const data = (await res.json()) as { success: boolean; "error-codes"?: string[] }
    if (!data.success) {
      console.warn("Security: Turnstile verification failed:", data["error-codes"])
    }
    return data.success
  } catch (error) {
    console.error("Security: Turnstile verification error:", error)
    return false
  }
}

// Escape HTML to prevent injection (simple but effective)
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  }
  return text.replace(/[&<>"']/g, (m) => map[m])
}

// HTML email body with proper escaping
function buildEmailHtml(data: z.infer<typeof ContactSchema>): string {
  const escapedName = escapeHtml(data.name)
  const escapedCompany = data.company ? escapeHtml(data.company) : "—"
  const escapedPhone = escapeHtml(data.phone)
  const escapedEmail = escapeHtml(data.email)
  const escapedProjectType = escapeHtml(data.projectType)
  const escapedMessage = escapeHtml(data.message).replace(/\n/g, "<br/>")

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
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.06);">
                    <span style="display:block;font-size:11px;color:#9CA9B7;text-transform:uppercase;letter-spacing:0.08em;font-weight:600;margin-bottom:4px;">Name</span>
                    <span style="font-size:15px;color:#ffffff;">${escapedName}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.06);">
                    <span style="display:block;font-size:11px;color:#9CA9B7;text-transform:uppercase;letter-spacing:0.08em;font-weight:600;margin-bottom:4px;">Company</span>
                    <span style="font-size:15px;color:#ffffff;">${escapedCompany}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.06);">
                    <span style="display:block;font-size:11px;color:#9CA9B7;text-transform:uppercase;letter-spacing:0.08em;font-weight:600;margin-bottom:4px;">Phone</span>
                    <span style="font-size:15px;color:#ffffff;">${escapedPhone}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.06);">
                    <span style="display:block;font-size:11px;color:#9CA9B7;text-transform:uppercase;letter-spacing:0.08em;font-weight:600;margin-bottom:4px;">Email</span>
                    <span style="font-size:15px;color:#ffffff;"><a href="mailto:${escapedEmail}" style="color:#00B7FF;text-decoration:none;">${escapedEmail}</a></span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.06);">
                    <span style="display:block;font-size:11px;color:#9CA9B7;text-transform:uppercase;letter-spacing:0.08em;font-weight:600;margin-bottom:4px;">Project Type</span>
                    <span style="font-size:15px;color:#ffffff;">${escapedProjectType}</span>
                  </td>
                </tr>
              </table>

              <!-- Message -->
              <div style="margin-top:24px;background:rgba(0,183,255,0.05);border:1px solid rgba(0,183,255,0.15);border-radius:12px;padding:20px;">
                <p style="margin:0 0 8px;font-size:12px;color:#9CA9B7;text-transform:uppercase;letter-spacing:0.08em;font-weight:600;">Message</p>
                <p style="margin:0;color:#ffffff;font-size:15px;line-height:1.6;">${escapedMessage}</p>
              </div>

              <!-- Reply CTA -->
              <div style="margin-top:32px;text-align:center;">
                <a href="mailto:${escapedEmail}?subject=Re: ${encodeURIComponent(escapedProjectType)} Inquiry"
                   style="display:inline-block;background:#00B7FF;color:#0A0F14;font-weight:700;font-size:14px;padding:12px 28px;border-radius:8px;text-decoration:none;">
                  Reply to ${escapedName}
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

// Send email using Cloudflare Email Sending Service
async function sendEmailWithCloudflare(
  to: string,
  replyTo: string,
  replyToName: string,
  subject: string,
  htmlContent: string,
  senderEmail: string,
  senderName: string
): Promise<boolean> {
  try {
    // The binding is injected by Cloudflare at runtime
    const emailBinding = (globalThis as any).EMAIL
    
    if (!emailBinding) {
      console.error("Cloudflare Email binding not found. Make sure it's configured in wrangler.jsonc")
      return false
    }

    await emailBinding.send({
      to: [{ email: to }],
      from: { 
        email: senderEmail, 
        name: senderName 
      },
      reply_to: { 
        email: replyTo, 
        name: replyToName 
      },
      subject: subject,
      html: htmlContent,
      text: `New Contact Form Submission\n\nName: ${replyToName}\nEmail: ${replyTo}\nPhone: ${escapeHtml(replyTo)} // Note: Phone is not in reply_to\n\nPlease view the HTML version for full details.`,
    })

    console.info(`Email sent successfully to ${to} via Cloudflare Email Service`)
    return true
  } catch (error) {
    console.error("Cloudflare Email send error:", error)
    return false
  }
}

// Main Server Action
export async function sendContactEmail(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  // 0. Check rate limit
  const headersList = await headers()
  const clientIp = getClientIp(headersList)

  if (!checkRateLimit(clientIp)) {
    console.warn(`Security: Rate limit exceeded for IP: ${clientIp}`)
    return {
      success: false,
      message: "Too many requests. Please try again in 1 hour.",
    }
  }

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
    console.warn(`Security: Turnstile verification failed for email: ${data.email}`)
    return {
      success: false,
      message: "Bot verification failed. Please try again.",
    }
  }

  // 3. Send email using Cloudflare Email Service
  const companyEmail = process.env.COMPANY_EMAIL || "info@avenidatech.com"
  const senderEmail = process.env.SENDER_EMAIL || "info@avenidatech.com"
  const senderName = process.env.SENDER_NAME || "Avenida Technologies Website"

  try {
    const htmlContent = buildEmailHtml(data)
    const emailSent = await sendEmailWithCloudflare(
      companyEmail, // To: your company email
      data.email,   // Reply-To: user's email
      data.name,    // Reply-To name: user's name
      `New ${data.projectType} Inquiry from ${data.name}`,
      htmlContent,
      senderEmail,
      senderName
    )

    if (!emailSent) {
      console.error("Failed to send email via Cloudflare Email Service")
      return {
        success: false,
        message: "Failed to send message. Please try again or contact us via WhatsApp.",
      }
    }

    console.info(`Success: Email sent from ${data.email} (${data.projectType})`)

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
