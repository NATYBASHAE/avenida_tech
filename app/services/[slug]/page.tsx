import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

// ── Service data ────────────────────────────────────────────────
const SERVICES: Record<string, {
  slug: string
  title: string
  subtitle: string
  hero: string
  description: string
  highlights: string[]
  techSpecs: { label: string; value: string }[]
  processSteps: string[]
}> = {
  "led-display-supply": {
    slug: "led-display-supply",
    title: "LED Display Supply",
    subtitle: "Commercial-Grade Panels for Every Application",
    hero: "/assets/massive_LED_panel_close-up_image._202606060116.jpeg",
    description:
      "We source and supply commercial-grade indoor and outdoor LED display panels engineered for continuous high-performance operation. From intimate boardroom displays to large-scale outdoor billboards, every panel is selected for reliability, brightness accuracy, and long service life.",
    highlights: [
      "Indoor Fine-Pitch Panels (P1.5 – P3.0)",
      "Outdoor High-Brightness Screens (P4 – P10)",
      "Custom screen configurations and sizes",
      "Front and rear serviceable cabinet options",
      "CE/RoHS certified commercial hardware",
      "Refresh rates from 1920Hz to 3840Hz",
    ],
    techSpecs: [
      { label: "Indoor Brightness", value: "600 – 1,200 nits" },
      { label: "Outdoor Brightness", value: "5,000 – 10,000 nits" },
      { label: "Pixel Pitch Range", value: "P1.5 – P10" },
      { label: "Refresh Rate", value: "1,920 Hz – 3,840 Hz" },
      { label: "Panel Lifespan", value: "100,000+ hours" },
      { label: "IP Rating (Outdoor)", value: "IP65 / IP67" },
    ],
    processSteps: ["Site survey & requirements analysis", "Panel specification & selection", "Quotation & lead time confirmation", "Quality inspection on arrival", "Handover to installation team"],
  },
  "professional-installation": {
    slug: "professional-installation",
    title: "Professional Installation",
    subtitle: "Precision Engineering for Permanent Installations",
    hero: "/assets/church.jpeg",
    description:
      "Our installation team manages every structural, electrical, and technical aspect of your LED display deployment. We follow international safety standards and architectural best practices to deliver installations that are safe, visually precise, and built to last.",
    highlights: [
      "Structural load analysis & mounting design",
      "Certified electrical power distribution",
      "Concealed cable management systems",
      "Controller and media player integration",
      "On-site calibration for colour uniformity",
      "Post-installation documentation",
    ],
    techSpecs: [
      { label: "Mounting Options", value: "Wall, Ceiling, Freestanding, Truss" },
      { label: "Power Supply", value: "Redundant PSU configurations available" },
      { label: "Cable Standards", value: "Category 6 / Fibre optic signal lines" },
      { label: "Safety Compliance", value: "IEC 60364, EN 60598" },
      { label: "Typical Installation", value: "2 – 10 business days" },
      { label: "Team Size", value: "2 – 8 certified engineers" },
    ],
    processSteps: ["Structural site assessment", "Custom mounting fabrication", "Electrical installation & distribution", "Panel mounting & alignment", "System integration & calibration", "Sign-off & training handover"],
  },
  "maintenance-support": {
    slug: "maintenance-support",
    title: "Maintenance & Support",
    subtitle: "Keeping Your Investment Running at Peak Performance",
    hero: "/assets/conference.jpeg",
    description:
      "We provide scheduled preventive maintenance and rapid-response corrective support to ensure your displays continue performing at their best. Our local Addis Ababa team means fast response times with no reliance on distant service centres.",
    highlights: [
      "Scheduled preventive maintenance visits",
      "Module-level diagnostics & replacement",
      "Remote monitoring where applicable",
      "Power supply & controller servicing",
      "Firmware & software updates",
      "Priority emergency response",
    ],
    techSpecs: [
      { label: "Response Time", value: "Same-day or next-business-day" },
      { label: "Support Hours", value: "Mon – Sat, 8am – 6pm" },
      { label: "Maintenance Cycles", value: "Quarterly or bi-annual plans" },
      { label: "Spare Parts", value: "Local inventory maintained" },
      { label: "Remote Diagnostics", value: "Available for networked systems" },
      { label: "Service Reports", value: "Provided after each visit" },
    ],
    processSteps: ["System health assessment", "Dust cleaning & thermal inspection", "Module brightness calibration", "Electrical connection verification", "Firmware/software update check", "Detailed service report"],
  },
  "consultation-planning": {
    slug: "consultation-planning",
    title: "Consultation & Planning",
    subtitle: "Expert Guidance Before You Commit a Single Birr",
    hero: "/assets/building.jpeg",
    description:
      "The right display system starts with the right plan. Our technical consultants work with architects, venue managers, and procurement teams to define exact display requirements — ensuring every investment decision is backed by data.",
    highlights: [
      "Pixel pitch and viewing distance analysis",
      "Environmental brightness assessment",
      "Structural feasibility report",
      "Power and electrical load planning",
      "Budget estimation and ROI modelling",
      "Manufacturer-independent recommendations",
    ],
    techSpecs: [
      { label: "Site Visit", value: "Included for all major projects" },
      { label: "Report Format", value: "PDF technical specification document" },
      { label: "Typical Turnaround", value: "5 – 10 business days" },
      { label: "Viewing Distance Calc", value: "Based on audience positioning" },
      { label: "Budget Accuracy", value: "±10% of final project cost" },
      { label: "Revisions", value: "Up to 2 included" },
    ],
    processSteps: ["Initial discovery call", "Site visit & measurements", "Technical analysis & modelling", "Draft specification review", "Final report & quotation"],
  },
}

// ── Static Params for SSG ────────────────────────────────────────
export function generateStaticParams() {
  return Object.keys(SERVICES).map((slug) => ({ slug }))
}

// ── SEO Metadata ─────────────────────────────────────────────────
export function generateMetadata({ params }: { params: { slug: string } }) {
  const service = SERVICES[params.slug]
  if (!service) return {}
  return {
    title: `${service.title} | Avenida Technologies`,
    description: service.description.slice(0, 160),
  }
}

// ── Page ─────────────────────────────────────────────────────────
export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = SERVICES[params.slug]
  if (!service) notFound()

  return (
    <div className="pt-24 min-h-screen bg-background">
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <Image src={service.hero} alt={service.title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F14] via-[#0A0F14]/70 to-[#0A0F14]/30" />
        <div className="absolute inset-0 flex flex-col items-start justify-end max-w-[1280px] mx-auto px-6 lg:px-8 pb-16">
          <Link href="/services" className="text-primary/80 hover:text-primary text-sm font-mono mb-4 flex items-center gap-2 transition-colors">
            ← Back to Services
          </Link>
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-white mb-3">{service.title}</h1>
          <p className="text-muted text-lg md:text-xl">{service.subtitle}</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-16">

          {/* Main Content */}
          <div className="lg:col-span-2 flex flex-col gap-12">
            <div>
              <h2 className="font-heading text-2xl font-bold text-white mb-4">Overview</h2>
              <p className="text-muted text-lg leading-relaxed">{service.description}</p>
            </div>

            <div>
              <h2 className="font-heading text-2xl font-bold text-white mb-6">What&apos;s Included</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {service.highlights.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-foreground/90">
                    <CheckCircle size={18} className="text-primary shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="font-heading text-2xl font-bold text-white mb-6">Process</h2>
              <div className="flex flex-col gap-0">
                {service.processSteps.map((step, i) => (
                  <div key={step} className="flex items-start gap-6 pb-8 last:pb-0 relative">
                    {i < service.processSteps.length - 1 && (
                      <div className="absolute left-[19px] top-[40px] bottom-0 w-[2px] bg-white/10" />
                    )}
                    <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0 font-mono text-sm text-primary z-10">
                      0{i + 1}
                    </div>
                    <div className="pt-2">
                      <p className="text-white font-medium">{step}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="flex flex-col gap-6">
            {/* Tech Specs */}
            <div className="glass p-6 rounded-xl border border-white/10 sticky top-28">
              <h3 className="font-heading text-lg font-bold text-white mb-5">Technical Parameters</h3>
              <div className="flex flex-col gap-4">
                {service.techSpecs.map((spec) => (
                  <div key={spec.label} className="flex flex-col gap-1 pb-4 border-b border-white/5 last:border-0 last:pb-0">
                    <span className="text-xs text-muted uppercase tracking-wider font-semibold">{spec.label}</span>
                    <span className="text-white font-mono text-sm">{spec.value}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-3">
                <Link href="/contact">
                  <Button className="w-full">Request Consultation</Button>
                </Link>
                <Link href="/services">
                  <Button variant="secondary" className="w-full">All Services</Button>
                </Link>
              </div>
            </div>
          </aside>

        </div>
      </section>
    </div>
  )
}
