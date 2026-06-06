"use client"
import { motion } from "framer-motion"

const CLIENTS = [
  "Churches", "Hotels", "Conference Centers", "Schools", "Commercial Buildings", "Retail Spaces"
]

const TRUST_MARKS = [
  "Professional Installation", "Technical Support", "Ethiopia-Based", "Reliable LED Systems"
]

export function TrustStrip() {
  return (
    <section className="w-full bg-[#10151B] border-y border-white/5 py-8 overflow-hidden flex flex-col gap-6">
      <div className="relative flex overflow-x-hidden group">
        <motion.div 
          className="flex space-x-12 whitespace-nowrap min-w-full"
          animate={{ x: ["0%", "-100%"] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        >
          {/* Double array for seamless loop */}
          {[...CLIENTS, ...CLIENTS, ...CLIENTS].map((client, i) => (
            <div key={`${client}-${i}`} className="flex items-center gap-4 text-muted/60 font-heading text-lg sm:text-2xl uppercase tracking-widest font-semibold">
              <span>{client}</span>
              <span className="text-primary/40">•</span>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 lg:px-8 w-full">
        <div className="flex flex-wrap items-center justify-center sm:justify-between gap-4 text-xs sm:text-sm font-medium text-muted/80">
          {TRUST_MARKS.map((mark) => (
            <div key={mark} className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-secondary box-glow" />
              {mark}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
