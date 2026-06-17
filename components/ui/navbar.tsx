"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Button } from "./button"
import { Menu, X, Phone, MessageCircle, Mail } from "lucide-react"

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        scrolled ? "bg-background/80 backdrop-blur-xl border-b border-border py-4" : "bg-transparent py-6"
      )}
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 flex items-center justify-between">
        <Link href="/" className="relative z-10 flex items-center gap-2">
          {/* We use an image wrapper with a sensible height for the premium logo */}
          <div className="relative h-8 w-40 sm:h-10 sm:w-48">
            <Image 
              src="/assets/logo/add_light_on_the_logo_202606060204.jpeg" 
              alt="Avenida Technologies" 
              fill 
              sizes="(max-width: 768px) 160px, 192px"
              className="object-contain object-left mix-blend-screen"
              priority
            />
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 font-medium text-sm text-foreground/80">
          <Link href="/about" className="hover:text-primary transition-colors">About</Link>
          <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
        </nav>

        <div className="hidden md:flex items-center gap-4 text-foreground/80">
          <a href="tel:+251967009542" className="hover:text-primary transition-colors" title="Call Us">
            <Phone size={20} />
          </a>
          <a href="https://wa.me/251967009542" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors" title="WhatsApp">
            <MessageCircle size={20} />
          </a>
          <a href="mailto:info@avenidatechs.com" className="hover:text-primary transition-colors" title="Email Us">
            <Mail size={20} />
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden relative z-10 text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="absolute top-0 left-0 w-full h-screen bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 text-xl font-heading z-0">
            <Link href="/about" onClick={() => setMobileMenuOpen(false)}>About</Link>
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
            <div className="flex gap-6 mt-4">
              <a href="tel:+251967009542" onClick={() => setMobileMenuOpen(false)} className="text-foreground/80 hover:text-primary transition-colors">
                <Phone size={24} />
              </a>
              <a href="https://wa.me/251967009542" target="_blank" rel="noreferrer" onClick={() => setMobileMenuOpen(false)} className="text-foreground/80 hover:text-primary transition-colors">
                <MessageCircle size={24} />
              </a>
              <a href="mailto:info@avenidatechs.com" onClick={() => setMobileMenuOpen(false)} className="text-foreground/80 hover:text-primary transition-colors">
                <Mail size={24} />
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
