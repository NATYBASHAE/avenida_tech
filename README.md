# Avenida Technologies — LED Display Solutions (Next.js)

AVENIDA TECHNOLOGIES is a Next.js (App Router) website for premium **LED display solutions** including consulting, installation, maintenance/support, and technical planning for churches, conference halls, hotels, schools, retail spaces, and commercial buildings across Ethiopia.

## Tech Stack

- **Next.js** (App Router)
- **React + TypeScript**
- **Tailwind CSS**
- **Framer Motion** (animations)
- **Lucide React** (icons)
- **Cloudflare Turnstile** (bot protection on contact form)
- **Brevo (Sendinblue) SMTP API** (send contact requests)
- **@opennextjs/cloudflare** (Cloudflare build support)

## Environment Variables

The contact form submission is implemented as a server action in `app/actions/send-email.ts` and requires:

### Required

- `TURNSTILE_SECRET_KEY`  
  Cloudflare Turnstile secret key used to verify the token server-side.

- `BREVO_API_KEY`  
  API key used to authenticate to Brevo’s SMTP endpoint.

### Optional (defaults in code)

- `COMPANY_EMAIL`  
  Destination email for incoming contact requests.  
  Default: `info@avenidatech.com`

- `SENDER_EMAIL`  
  Sender email for the outbound message.  
  Default: `info@avenidatech.com`

- `SENDER_NAME`  
  Sender display name.  
  Default: `Avenida Technologies Website`

> If you don’t set the required variables, the contact form will fail to send.

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open the app:

- http://localhost:3000

## Scripts

- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run start` — run production server
- `npm run lint` — lint the codebase
- `npm run build:worker` — Cloudflare Workers build (via `@opennextjs/cloudflare`)

## Main Routes

- `/` — Home
- `/about` — About Avenida Technologies
- `/services` — Services overview
- `/services/[slug]` — Individual service details
- `/projects` — Projects
- `/contact` — Contact + consultation request (Turnstile + Brevo email)

## Deployment

- Standard Next.js hosting works out of the box.
- For Cloudflare Workers deployment, run:

```bash
npm run build:worker
```

## License

All rights reserved.
