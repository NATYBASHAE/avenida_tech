"use client"
import { motion } from "framer-motion"
import Image from "next/image"

const PROJECTS = [
  {
    name: "Trinity Worship Center",
    industry: "Church",
    location: "Addis Ababa",
    type: "P2.5 Indoor LED",
    result: "Massive 8x4m backdrop creating an immersive worship experience.",
    image: "/assets/church.jpeg",
    span: "col-span-1 md:col-span-2 row-span-2"
  },
  {
    name: "Capital Hotel Lobby",
    industry: "Hospitality",
    location: "Addis Ababa",
    type: "P1.8 Fine Pitch",
    result: "Luxury digital signage enhancing guest arrivals.",
    image: "/assets/hotel.jpeg",
    span: "col-span-1"
  },
  {
    name: "Skyline Outdoor",
    industry: "Commercial",
    location: "Bole, Addis Ababa",
    type: "P4 Outdoor LED",
    result: "High-brightness commercial billboard visible in direct sunlight.",
    image: "/assets/building.jpeg",
    span: "col-span-1"
  },
  {
    name: "Global Conference Hall",
    industry: "Corporate",
    location: "Addis Ababa",
    type: "P3 Indoor Array",
    result: "Crystal clear presentations for 1000+ attendees.",
    image: "/assets/conference.jpeg",
    span: "col-span-1 md:col-span-2"
  }
]

export function FeaturedProjects() {
  return (
    <section className="py-24 md:py-32 bg-[#0A0F14] relative">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
          <div className="max-w-xl">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-heading text-3xl md:text-5xl font-bold mb-4"
            >
              Proven Real-World <br/> Installations
            </motion.h2>
            <p className="text-muted text-lg">
              Explore our recent display infrastructure projects across various industries.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[250px] md:auto-rows-[300px] gap-6">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative group overflow-hidden rounded-xl cursor-pointer ${project.span}`}
            >
              <Image 
                src={project.image} 
                alt={project.name} 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F14] via-[#0A0F14]/60 to-transparent opacity-90 transition-opacity duration-300" />
              <div className="absolute inset-0 border border-white/10 group-hover:border-primary/50 transition-colors duration-300 rounded-xl" />
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-mono tracking-wider text-primary px-2 py-1 bg-primary/10 rounded-md">
                    {project.industry}
                  </span>
                  <span className="text-xs text-white/60">{project.location}</span>
                </div>
                <h3 className="font-heading text-2xl font-bold text-white mb-2">{project.name}</h3>
                <p className="text-sm text-white/80 line-clamp-2 md:line-clamp-3 mb-2">{project.result}</p>
                <div className="text-xs font-mono text-muted">{project.type}</div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
