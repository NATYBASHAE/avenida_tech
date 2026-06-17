import Link from "next/link"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="bg-[#05080A] border-t border-border relative overflow-hidden">
      <div className="absolute inset-0 blueprint-grid opacity-30 pointer-events-none" />
      
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8 py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* Brand */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="relative h-10 w-48">
              <Image 
                src="/assets/logo/add_light_on_the_logo_202606060204.jpeg" 
                alt="Avenida Technologies" 
                fill 
                sizes="(max-width: 768px) 160px, 192px"
                className="object-contain object-left mix-blend-screen opacity-90 hover:opacity-100 transition-opacity"
              />
            </Link>
            <p className="text-muted text-sm leading-relaxed max-w-[280px]">
              Professional LED display systems designed for visibility, reliability, and long-term performance across Ethiopia.
            </p>
          </div>

          {/* Company */}
          <div className="flex flex-col gap-4">
            <h4 className="font-heading font-semibold text-foreground tracking-wide">Company</h4>
            <div className="flex flex-col gap-3 text-sm text-muted">
              <Link href="/about" className="hover:text-primary transition-colors">About Us</Link>
            </div>
          </div>

          {/* Services */}
          <div className="flex flex-col gap-4">
            <h4 className="font-heading font-semibold text-foreground tracking-wide">Services</h4>
            <div className="flex flex-col gap-3 text-sm text-muted">
              <span>LED Display Supply</span>
              <span>Professional Installation</span>
              <span>Maintenance & Support</span>
              <span>Technical Consultation</span>
            </div>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-4">
            <h4 className="font-heading font-semibold text-foreground tracking-wide">Contact</h4>
            <div className="flex flex-col gap-3 text-sm text-muted">
              <a href="tel:+251967009542" className="hover:text-primary transition-colors">+251 96 700 9542</a>
              <a href="mailto:info@avenidatechs.com" className="hover:text-primary transition-colors">info@avenidatechs.com</a>
              <a href="https://wa.me/251967009542" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">WhatsApp Support</a>
              <span className="text-muted">Addis Ababa, Ethiopia</span>
            </div>
          </div>

        </div>

        <div className="mt-20 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted/60">
          <p>© {new Date().getFullYear()} Avenida Technologies. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="/terms-of-service" className="hover:text-foreground transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
