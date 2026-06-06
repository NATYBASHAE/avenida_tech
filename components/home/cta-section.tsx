"use client"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export function CTASection() {
  return (
    <section className="relative py-32 bg-[#0A0F14] overflow-hidden border-t border-white/5">
      {/* Background Cinematic Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-[#0A0F14] to-[#0A0F14]" />
      <div className="absolute inset-0 blueprint-grid opacity-10" />
      
      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center flex flex-col items-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-heading text-4xl md:text-6xl font-bold mb-6 text-white drop-shadow-xl"
        >
          Ready to Upgrade Your Visual Communication?
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-muted text-lg md:text-xl max-w-2xl mb-10"
        >
          Professional LED display systems designed for visibility, reliability, and long-term performance.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Button size="lg">Request Consultation</Button>
          <Button variant="secondary" size="lg">Speak With a Specialist</Button>
        </motion.div>
      </div>
    </section>
  )
}
