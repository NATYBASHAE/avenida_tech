"use client"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const SERVICES = [
  {
    slug: "led-display-supply",
    title: "LED Display Supply",
    desc: "Commercial-grade indoor and outdoor LED panels with customizable configurations for any environment. We provide high brightness panels with tight pixel pitch for optimal viewing.",
    bullets: ["Indoor LED", "Outdoor LED", "High Brightness", "Custom Configurations"],
    image: "/assets/massive_LED_panel_close-up_image._202606060116.jpeg",
  },
  {
    slug: "professional-installation",
    title: "Professional Installation",
    desc: "End-to-end technical installation ensuring structural integrity, perfect alignment, and reliable operation.",
    bullets: ["Mounting Systems", "Cable Management", "Power Distribution", "Controller Setup"],
    image: "/assets/church.jpeg",
  },
  {
    slug: "maintenance-support",
    title: "Maintenance & Support",
    desc: "Long-term operational support to keep your displays running flawlessly year after year.",
    bullets: ["Troubleshooting", "Replacement Modules", "Diagnostics", "Preventive Maintenance"],
    image: "/assets/conference.jpeg",
  },
  {
    slug: "consultation-planning",
    title: "Consultation & Planning",
    desc: "Expert guidance on pixel pitch, viewing distance, and environmental factors before you invest.",
    bullets: ["Viewing Distance", "Screen Sizing", "Environmental Analysis", "Budget Planning"],
    image: "/assets/building.jpeg",
  }
]


export default function ServicesPage() {
  return (
    <div className="pt-24 min-h-screen">
      {/* Hero */}
      <section className="relative py-24 bg-[#05080A] border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 blueprint-grid opacity-10" />
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="max-w-2xl">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-heading text-4xl md:text-5xl font-bold mb-6 text-white"
            >
              Professional LED Display Solutions Designed for Real-World Performance
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-muted text-lg leading-relaxed"
            >
              From consultation and planning to installation and long-term support, Avenida Technologies delivers complete LED display systems for commercial environments.
            </motion.p>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="hidden lg:flex flex-col gap-4 min-w-[280px]"
          >
            {["Indoor LED", "Outdoor LED", "Pixel Pitch Planning", "Installation Systems", "Maintenance Support"].map(item => (
              <div key={item} className="glass px-6 py-4 rounded-lg flex items-center gap-3">
                <div className="w-1.5 h-1.5 bg-primary rounded-full box-glow" />
                <span className="text-white/80 font-medium text-sm">{item}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Overview Grid */}
      <section className="py-24 bg-background">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {SERVICES.map((service, i) => (
              <motion.div 
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-xl overflow-hidden group border border-white/5 hover:border-primary/30 transition-colors flex flex-col"
              >
                <div className="relative h-64 w-full">
                  <Image src={service.image} alt={service.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121922] to-transparent" />
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <h3 className="font-heading text-2xl font-bold text-white mb-3">{service.title}</h3>
                  <p className="text-muted text-sm mb-6 flex-1">{service.desc}</p>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {service.bullets.map(b => (
                      <span key={b} className="text-xs font-mono text-primary bg-primary/10 px-3 py-1 rounded-md">
                        {b}
                      </span>
                    ))}
                  </div>
                  <Link href={`/services/${service.slug}`} className="w-full">
                    <Button variant="secondary" className="w-full">Explore Service →</Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Detail Section */}
      <section className="py-24 bg-[#0A0F14] border-y border-white/5 relative">
        <div className="absolute inset-0 blueprint-grid opacity-5" />
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl font-bold mb-4">Technical Specifications Guide</h2>
            <p className="text-muted">Understanding display parameters for optimal viewing experiences.</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Pixel Pitch */}
            <div className="glass p-8 rounded-xl border border-white/10">
              <h3 className="font-heading text-xl font-bold text-white mb-4 flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full box-glow" />
                Pixel Pitch Guide
              </h3>
              <p className="text-muted text-sm mb-6">Pixel pitch indicates the distance between LEDs. Smaller pitch equals higher resolution for closer viewing.</p>
              <div className="flex flex-col gap-4">
                {[
                  { pitch: "P1.5 - P2.0", use: "Control rooms, boardrooms", dist: "1.5m - 2m+" },
                  { pitch: "P2.5 - P3.0", use: "Churches, conference halls", dist: "2.5m - 3m+" },
                  { pitch: "P4.0 - P5.0", use: "Retail, large indoor venues", dist: "4m - 5m+" },
                  { pitch: "P6.0 - P10.0", use: "Outdoor billboards, stadiums", dist: "6m - 10m+" }
                ].map(item => (
                  <div key={item.pitch} className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/5">
                    <span className="font-mono text-primary font-bold">{item.pitch}</span>
                    <span className="text-sm text-white/80 w-1/2">{item.use}</span>
                    <span className="text-xs text-muted text-right">{item.dist}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Indoor vs Outdoor */}
            <div className="glass p-8 rounded-xl border border-white/10 flex flex-col justify-between">
               <div>
                  <h3 className="font-heading text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <div className="w-2 h-2 bg-secondary rounded-full box-glow" />
                    Indoor vs Outdoor LED
                  </h3>
                  <div className="space-y-6 mt-8">
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between text-sm font-bold text-white">
                        <span>Indoor Screens</span>
                        <span className="text-primary font-mono">600 - 1,200 Nits</span>
                      </div>
                      <p className="text-muted text-sm">Optimized for artificial lighting, close viewing distances, and high refresh rates.</p>
                    </div>
                    <div className="h-[1px] w-full bg-white/10" />
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between text-sm font-bold text-white">
                        <span>Outdoor Screens</span>
                        <span className="text-primary font-mono">5,000 - 10,000 Nits</span>
                      </div>
                      <p className="text-muted text-sm">Weatherproof (IP65+), ultra-high brightness to compete with direct sunlight.</p>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-[#121922] text-center px-6">
        <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">Need Help Choosing the Right LED Display System?</h2>
        <Button size="lg" className="mt-4">Request Technical Consultation</Button>
      </section>
    </div>
  )
}
