"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

const CATEGORIES = ["All", "Churches", "Hotels", "Conference", "Commercial", "Schools", "Outdoor"]

const PROJECTS = [
  { name: "Trinity Worship Center", category: "Churches", location: "Addis Ababa", type: "P2.5 Indoor", result: "Massive 8x4m backdrop", image: "/assets/church.jpeg", span: "col-span-1 md:col-span-2 row-span-2" },
  { name: "Capital Hotel Lobby", category: "Hotels", location: "Addis Ababa", type: "P1.8 Fine Pitch", result: "Luxury digital signage", image: "/assets/hotel.jpeg", span: "col-span-1" },
  { name: "Skyline Outdoor", category: "Outdoor", location: "Bole", type: "P4 Outdoor", result: "High-brightness commercial billboard", image: "/assets/building.jpeg", span: "col-span-1 md:col-span-2" },
  { name: "Global Conference Hall", category: "Conference", location: "Addis Ababa", type: "P3 Array", result: "Crystal clear presentations", image: "/assets/conference.jpeg", span: "col-span-1 md:col-span-2 row-span-2" },
  { name: "Unity University", category: "Schools", location: "Gerji", type: "P3 Indoor", result: "Auditorium display system", image: "/assets/school.jpeg", span: "col-span-1" },
  { name: "Bole Retail Center", category: "Commercial", location: "Bole", type: "P2.5 Indoor", result: "Interactive retail experience", image: "/assets/retial.jpeg", span: "col-span-1" }
]

export default function ProjectsPage() {
  const [activeTab, setActiveTab] = useState("All")

  const filteredProjects = PROJECTS.filter(p => activeTab === "All" || p.category === activeTab)

  return (
    <div className="pt-24 min-h-screen bg-background">
      {/* Hero */}
      <section className="relative py-24 md:py-32 overflow-hidden bg-[#0A0F14]">
        <div className="absolute inset-0 opacity-40">
          <Image src="/assets/church.jpeg" alt="Background" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-[#0A0F14]/80 cinematic-vignette" />
        </div>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading text-4xl md:text-6xl font-bold mb-6 text-white"
          >
            Real Display Installations for <br/> Real Commercial Environments
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted text-lg md:text-xl max-w-2xl mx-auto"
          >
            Explore LED display solutions delivered for churches, conference centers, hotels, schools, and commercial properties.
          </motion.p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-8 border-b border-white/5 sticky top-[80px] md:top-[88px] bg-background/80 backdrop-blur-xl z-40">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2 min-w-max">
            {CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => setActiveTab(category)}
                className={`px-6 py-2 rounded-full font-medium text-sm transition-all duration-300 ${
                  activeTab === category 
                    ? "bg-primary text-[#0A0F14] box-glow" 
                    : "bg-transparent text-muted hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <motion.div layout className="grid grid-cols-1 md:grid-cols-3 auto-rows-[300px] gap-6">
            <AnimatePresence>
              {filteredProjects.map((project) => (
                <motion.div
                  layout
                  key={project.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className={`relative group overflow-hidden rounded-xl cursor-pointer ${project.span}`}
                >
                  <Image 
                    src={project.image} 
                    alt={project.name} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F14] via-[#0A0F14]/50 to-transparent opacity-90 transition-opacity duration-300" />
                  <div className="absolute inset-0 border border-white/10 group-hover:border-primary/50 transition-colors duration-300 rounded-xl" />
                  
                  <div className="absolute bottom-0 left-0 p-8 w-full transform transition-transform duration-300 group-hover:-translate-y-2">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs font-mono tracking-wider text-primary px-2 py-1 bg-primary/10 rounded-md">
                        {project.category}
                      </span>
                      <span className="text-xs text-white/60">{project.location}</span>
                    </div>
                    <h3 className="font-heading text-2xl font-bold text-white mb-2">{project.name}</h3>
                    <p className="text-sm text-white/80 mb-2">{project.result}</p>
                    <div className="text-xs font-mono text-muted">{project.type}</div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
