"use server"

import { z } from "zod"
import { headers } from "next/headers"

// Validation schema for contact form
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
  website: z.string().max(0, "Bot detected"),
  turnstileToken: z.string().min(1, "Bot verification required"),
})

export type ContactFormState = {
  success: boolean
  message: string
  errors?: Record<string, string[]>
}

// Rate limiting configuration
const rateLimitCache = new Map<string, number[]>()
const RATE_LIMIT_MAX_REQUESTS = 5
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000

// Extract client IP from request headers
function getClientIp(headersList: Awaited<ReturnType<typeof headers>>): string {
  return (
    headersList.get("x-forwarded-for")?.split(",")[0].trim() ||
    headersList.get("x-real-ip") ||
    "unknown"
  )
}

// Check if IP has exceeded rate limit
function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const requests = rateLimitCache.get(ip) || []
  const recentRequests = requests.filter((timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS)

  if (recentRequests.length >= RATE_LIMIT_MAX_REQUESTS) {
    return false
  }

  recentRequests.push(now)
  rateLimitCache.set(ip, recentRequests)
  return true
}

// Verify Turnstile token with Cloudflare API
async function verifyTurnstile(token: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY
  if (!secret) return false

  try {
    const formData = new FormData()
    formData.append("secret", secret)
    formData.append("response", token)

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000)

    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: formData,
      signal: controller.signal,
    })

    clearTimeout(timeoutId)
    const data = (await response.json()) as { success: boolean }
    return data.success
  } catch {
    return false
  }
}

// Escape HTML to prevent injection attacks
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

// Generate HTML email body
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
          <tr>
            <td style="background:linear-gradient(135deg,#00B7FF,#5CE1E6);padding:4px 0;"></td>
          </tr>
          <tr>
            <td style="padding:32px 40px 24px;">
              <h1 style="margin:0 0 8px;font-size:24px;font-weight:700;color:#ffffff;">New Consultation Request</h1>
              <p style="margin:0;color:#9CA9B7;font-size:14px;">Submitted via avenidatech.com contact form</p>
            </td>
          </tr>
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
              <div style="margin-top:24px;background:rgba(0,183,255,0.05);border:1px solid rgba(0,183,255,0.15);border-radius:12px;padding:20px;">
                <p style="margin:0 0 8px;font-size:12px;color:#9CA9B7;text-transform:uppercase;letter-spacing:0.08em;font-weight:600;">Message</p>
                <p style="margin:0;color:#ffffff;font-size:15px;line-height:1.6;">${escapedMessage}</p>
              </div>
              <div style="margin-top:32px;text-align:center;">
                <a href="mailto:${escapedEmail}?subject=Re: ${encodeURIComponent(escapedProjectType)} Inquiry"
                   style="display:inline-block;background:#00B7FF;color:#0A0F14;font-weight:700;font-size:14px;padding:12px 28px;border-radius:8px;text-decoration:none;">
                  Reply to ${escapedName}
                </a>
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding:20px 40px;border-top:1px solid rgba(255,255,255,0.08);">
              <p style="margin:0;color:#9CA9B7;font-size:12px;text-align:center;">
                This email was generated automatically from your website contact form.
                ${new Date().getFullYear()} Avenida Technologies
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
    const emailBinding = (globalThis as any).EMAIL
    
    if (!emailBinding) {
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
      text: `New Contact Form Submission\n\nName: ${replyToName}\nEmail: ${replyTo}\n\nPlease view the HTML version for full details.`,
    })

    return true
  } catch {
    return false
  }
}

// Main server action for contact form submission
export async function sendContactEmail(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const headersList = await headers()
  const clientIp = getClientIp(headersList)

  // Apply rate limiting
  if (!checkRateLimit(clientIp)) {
    return {
      success: false,
      message: "Too many requests. Please try again in 1 hour.",
    }
  }

  // Parse and validate form data
  const raw = {
    name: formData.get("name"),
    company: formData.get("company"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    projectType: formData.get("projectType"),
    message: formData.get("message"),
    website: formData.get("website"),
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

  // Verify Turnstile token
  const isHuman = await verifyTurnstile(data.turnstileToken)
  if (!isHuman) {
    return {
      success: false,
      message: "Bot verification failed. Please try again.",
    }
  }

  // Send email
  const companyEmail = process.env.COMPANY_EMAIL || "info@avenidatech.com"
  const senderEmail = process.env.SENDER_EMAIL || "info@avenidatech.com"
  const senderName = process.env.SENDER_NAME || "Avenida Technologies Website"

  try {
    const htmlContent = buildEmailHtml(data)
    const emailSent = await sendEmailWithCloudflare(
      companyEmail,
      data.email,
      data.name,
      `New ${data.projectType} Inquiry from ${data.name}`,
      htmlContent,
      senderEmail,
      senderName
    )

    if (!emailSent) {
      return {
        success: false,
        message: "Failed to send message. Please try again or contact us via WhatsApp.",
      }
    }

    return {
      success: true,
      message: "Your message has been sent successfully. We will get back to you within 24 hours.",
    }
  } catch {
    return {
      success: false,
      message: "Network error. Please try again or contact us via WhatsApp.",
    }
  }
}
