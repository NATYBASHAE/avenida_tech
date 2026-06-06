"use client"
import { motion } from "framer-motion"
import Image from "next/image"
import { ShieldCheck, Target, HeartHandshake, Briefcase, Zap } from "lucide-react"

const VALUES = [
  { icon: ShieldCheck, title: "Reliability", desc: "We design systems meant to run flawlessly for years, not months." },
  { icon: Target, title: "Technical Precision", desc: "Every installation is engineered for perfect alignment and structural safety." },
  { icon: HeartHandshake, title: "Long-Term Support", desc: "Our relationship begins, not ends, after the installation is complete." },
  { icon: Briefcase, title: "Professional Execution", desc: "We operate with the highest standards of commercial project management." },
  { icon: Zap, title: "Client Partnership", desc: "We align our visual infrastructure with your actual business goals." }
]

export default function AboutPage() {
  return (
    <div className="pt-24 min-h-screen bg-background">
      {/* Hero */}
      <section className="relative py-32 bg-[#05080A] overflow-hidden">
        <div className="absolute inset-0 blueprint-grid opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/90" />
        <div className="max-w-[1000px] mx-auto px-6 lg:px-8 relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading text-4xl md:text-6xl font-bold mb-6 text-white"
          >
            Built Around Professional <br/> Visual Communication Systems
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted text-lg md:text-xl"
          >
            Avenida Technologies is the leading commercial display systems integrator in Ethiopia, committed to delivering uncompromising technical quality.
          </motion.p>
        </div>
      </section>

      {/* Story */}
      <section className="py-24">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden glass">
              <Image src="/assets/conference.jpeg" alt="Our Team" fill sizes="(max-width: 1024px) 100vw, 50vw" priority className="object-cover" />
              <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
            </div>
            <div className="flex flex-col gap-6">
              <h2 className="font-heading text-3xl md:text-4xl font-bold">Bridging the Gap Between Ambition and Infrastructure</h2>
              <p className="text-muted leading-relaxed text-lg">
                Most organizations in Ethiopia struggle to find reliable visual infrastructure partners. They are forced to choose between cheap, failing equipment or disjointed service providers who disappear after the sale.
              </p>
              <p className="text-muted leading-relaxed text-lg">
                Avenida Technologies exists to solve this. We bring international engineering standards to the local market. From pixel-perfect indoor panels to weather-hardened outdoor billboards, we provide systems that actually work, supported by a local team that actually cares.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-[#0A0F14] border-t border-white/5 relative">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl font-bold mb-4">Core Operational Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {VALUES.map((val, i) => (
              <motion.div 
                key={val.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass p-8 rounded-xl"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                  <val.icon className="text-primary" size={24} />
                </div>
                <h3 className="font-heading text-xl font-bold text-white mb-3">{val.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
