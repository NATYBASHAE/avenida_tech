"use client"
import { motion } from "framer-motion"

const STEPS = [
  "Site Survey",
  "Technical Planning",
  "Proposal & Quote",
  "Installation",
  "Configuration",
  "Testing",
  "Support"
]

export function ProjectProcess() {
  return (
    <section className="py-24 bg-[#121922] relative border-t border-white/5 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-8">
        <div className="mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-3xl md:text-4xl font-bold"
          >
            Installation Workflow
          </motion.h2>
        </div>

        <div className="relative">
          {/* Background Line */}
          <div className="absolute top-[24px] left-0 w-full h-[2px] bg-white/10 hidden md:block" />
          
          {/* Animated Line */}
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute top-[24px] left-0 w-full h-[2px] bg-primary origin-left hidden md:block"
            style={{ boxShadow: "0 0 10px rgba(0, 183, 255, 0.5)" }}
          />

          <div className="grid grid-cols-1 md:grid-cols-7 gap-8 relative z-10">
            {STEPS.map((step, i) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="flex md:flex-col items-center md:items-start gap-6 md:gap-4"
              >
                {/* Node */}
                <div className="w-[50px] h-[50px] shrink-0 rounded-full bg-[#0A0F14] border-2 border-primary flex items-center justify-center font-mono text-sm text-primary box-glow">
                  0{i + 1}
                </div>
                
                {/* Text */}
                <div>
                  <h4 className="font-heading font-bold text-white text-lg md:text-base lg:text-lg">{step}</h4>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
