"use client"
import { motion } from "framer-motion"
import { Settings, ShieldCheck, Wrench, Users, Building, MonitorPlay } from "lucide-react"

const FEATURES = [
  { icon: Wrench, title: "Professional Installation", desc: "Certified engineers handle structural mounting and calibration." },
  { icon: MonitorPlay, title: "Reliable Hardware", desc: "Commercial-grade panels tested for continuous 24/7 operation." },
  { icon: ShieldCheck, title: "Long-Term Support", desc: "Extended warranties and rapid local technical assistance." },
  { icon: Building, title: "Project Planning", desc: "Site surveys and structural analysis before any installation." },
  { icon: Users, title: "Local Technical Team", desc: "Addis Ababa based team for immediate response and maintenance." },
  { icon: Settings, title: "Scalable Solutions", desc: "Modular designs that can grow with your organizational needs." }
]

export function WhyChooseUs() {
  return (
    <section className="py-24 bg-[#05080A] relative border-t border-white/5">
      <div className="absolute inset-0 blueprint-grid opacity-20 pointer-events-none" />
      
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-3xl md:text-5xl font-bold mb-6"
          >
            Engineering Trust
          </motion.h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            We don&apos;t just sell screens. We build reliable visual infrastructure with a commitment to long-term operational success.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass p-8 rounded-xl group hover:border-primary/50 transition-colors duration-300 relative overflow-hidden"
            >
              {/* Subtle animated glow line */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              
              <div className="w-12 h-12 rounded-lg bg-[#1A222C] flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors">
                <feature.icon className="text-primary" size={24} />
              </div>
              
              <h3 className="font-heading text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-muted text-sm leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
