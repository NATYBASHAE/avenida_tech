"use client"
import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"

const SERVICES = [
  {
    title: "LED Display Supply",
    desc: "Commercial-grade indoor and outdoor LED panels with customizable configurations for any environment.",
    bullets: ["Indoor & Outdoor Displays", "High Brightness Panels", "Custom Screen Configurations"],
    image: "/assets/massive_LED_panel_close-up_image._202606060116.jpeg",
    reverse: false,
  },
  {
    title: "Professional Installation",
    desc: "End-to-end technical installation ensuring structural integrity, perfect alignment, and reliable operation.",
    bullets: ["Mounting Systems", "Cable Management", "Power Distribution"],
    image: "/assets/professional_installation.jpeg",
    reverse: true,
  },
  {
    title: "Maintenance & Support",
    desc: "Long-term operational support to keep your displays running flawlessly year after year.",
    bullets: ["Troubleshooting", "Replacement Modules", "Preventive Maintenance"],
    image: "/assets/maintenance.jpeg",
    reverse: false,
  },
  {
    title: "Technical Consultation",
    desc: "Expert guidance on pixel pitch, viewing distance, and environmental factors before you invest.",
    bullets: ["Viewing Distance Analysis", "Screen Sizing", "Budget Planning"],
    image: "/assets/Technical_Consultation.jpeg",
    reverse: true,
  }
]

export function ServicesIntro() {
  return (
    <section className="py-24 md:py-32 bg-background relative" id="services">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        
        <div className="mb-20 max-w-2xl">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-3xl md:text-5xl font-bold mb-6"
          >
            Complete LED <br/> Display Solutions
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted text-lg leading-relaxed"
          >
            From consultation and planning to installation and maintenance, Avenida Technologies delivers professional LED systems built for reliability and long-term performance.
          </motion.p>
        </div>

        <div className="flex flex-col gap-24 md:gap-32">
          {SERVICES.map((service, idx) => (
            <motion.div 
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className={`flex flex-col gap-10 lg:gap-16 items-center ${service.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}
            >
              {/* Image Side */}
              <div className="w-full lg:w-1/2">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden glass group">
                  <Image 
                    src={service.image} 
                    alt={service.title} 
                    fill 
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 border border-white/10 rounded-2xl pointer-events-none" />
                </div>
              </div>

              {/* Content Side */}
              <div className="w-full lg:w-1/2 flex flex-col items-start">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-primary font-mono text-sm tracking-wider">0{idx + 1}</span>
                  <div className="h-[1px] w-12 bg-primary/30" />
                </div>
                <h3 className="font-heading text-2xl md:text-3xl font-bold mb-4">{service.title}</h3>
                <p className="text-muted leading-relaxed mb-8">{service.desc}</p>
                
                <ul className="flex flex-col gap-3 mb-10 w-full">
                  {service.bullets.map(bullet => (
                    <li key={bullet} className="flex items-center gap-3 text-sm md:text-base text-foreground/90">
                      <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                      {bullet}
                    </li>
                  ))}
                </ul>

                <Button variant="secondary">Learn More</Button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
