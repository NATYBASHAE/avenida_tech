"use client"
import { motion } from "framer-motion"
import Image from "next/image"

const INDUSTRIES = [
  { title: "Churches", image: "/assets/church.jpeg" },
  { title: "Hotels", image: "/assets/hotel.jpeg" },
  { title: "Conference Centers", image: "/assets/conference.jpeg" },
  { title: "Commercial Buildings", image: "/assets/building.jpeg" },
  { title: "Schools", image: "/assets/school.jpeg" },
  { title: "Retail", image: "/assets/retial.jpeg" }
]

export function IndustriesSection() {
  return (
    <section className="py-24 md:py-32 bg-[#0A0F14] border-t border-white/5 relative">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
          <div className="max-w-xl">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-heading text-3xl md:text-5xl font-bold mb-4"
            >
              Engineered For <br className="hidden md:block" /> Every Environment
            </motion.h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {INDUSTRIES.map((industry, i) => (
            <motion.div
              key={industry.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative aspect-[4/5] rounded-xl overflow-hidden cursor-pointer"
            >
              {/* Image */}
              <Image 
                src={industry.image} 
                alt={industry.title} 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F14] via-[#0A0F14]/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/50 transition-colors duration-300 rounded-xl" />
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 p-8 w-full transform transition-transform duration-300 group-hover:-translate-y-2">
                <h3 className="font-heading text-2xl font-bold text-white mb-2">{industry.title}</h3>
                <div className="h-1 w-8 bg-primary scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
