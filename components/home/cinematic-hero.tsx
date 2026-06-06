"use client"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function CinematicHero() {
  return (
    <section className="relative w-full h-[100svh] min-h-[600px] overflow-hidden bg-[#0A0F14]">
      {/* Cinematic Overlays */}
      <div className="absolute inset-0 bg-black/55 z-10 cinematic-vignette pointer-events-none" />
      <div className="absolute inset-0 z-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgoJPHJlY3Qgd2lkdGg9IjQiIGhlaWdodD0iNCIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIwLjAyNSIvPgo8L3N2Zz4=')] opacity-20 pointer-events-none" />

      {/* Content */}
      <div className="relative z-20 h-full max-w-[1280px] mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 items-center">
        <div className="lg:col-span-8 xl:col-span-7 flex flex-col items-start gap-6 pt-20">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-heading text-4xl sm:text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight text-white drop-shadow-2xl"
          >
            LED Display Solutions <br className="hidden sm:block" /> Built for High-Impact Spaces
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-base sm:text-lg md:text-xl text-gray-300 max-w-[600px] leading-relaxed drop-shadow-md"
          >
            Professional LED display systems for churches, conference halls, hotels, commercial buildings, and institutions across Ethiopia.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-col sm:flex-row items-center gap-4 mt-6 w-full sm:w-auto"
          >
            <Link href="/contact" className="w-full sm:w-auto">
              <Button size="lg" className="w-full">Request Consultation</Button>
            </Link>
          </motion.div>
        </div>

        <div className="hidden lg:flex lg:col-span-4 xl:col-span-5 justify-end">
           <motion.div 
             initial={{ opacity: 0, x: 30 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 1, delay: 1 }}
             className="flex flex-col gap-5"
           >
              {[
                "Indoor & Outdoor LED",
                "Professional Installation",
                "Ethiopia Based",
                "Technical Support"
              ].map((text, i) => (
                <div 
                  key={text}
                  className="glass px-6 py-4 rounded-xl flex items-center gap-4 shadow-xl backdrop-blur-md border-white/10"
                  style={{ transform: `translateY(${i * 10}px)` }}
                >
                  <div className="w-2 h-2 rounded-full bg-primary box-glow shadow-[0_0_10px_#00B7FF]" />
                  <span className="font-medium text-white/90">{text}</span>
                </div>
              ))}
           </motion.div>
        </div>
      </div>
    </section>
  )
}
