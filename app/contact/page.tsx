"use client"

import { useActionState, useState, useCallback, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Phone, Mail, MapPin, MessageCircle, CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TurnstileWidget } from "@/components/ui/turnstile-widget"
import { sendContactEmail, type ContactFormState } from "@/app/actions/send-email"

const initialState: ContactFormState = { success: false, message: "" }

export default function ContactPage() {
  const [state, formAction, isPending] = useActionState(sendContactEmail, initialState)
  const [turnstileToken, setTurnstileToken] = useState("")
  const formRef = useRef<HTMLFormElement>(null)

  const handleVerify = useCallback((token: string) => {
    setTurnstileToken(token)
  }, [])

  const handleExpire = useCallback(() => {
    setTurnstileToken("")
  }, [])

  return (
    <div className="pt-24 min-h-screen bg-background">
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 blueprint-grid opacity-10 pointer-events-none" />
        
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-heading text-4xl md:text-5xl font-bold mb-4 text-white"
            >
              Let&apos;s Discuss Your LED Display Project
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-muted text-lg max-w-2xl mx-auto"
            >
              Speak with Avenida Technologies about consultation, installation, maintenance, or commercial display planning.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
            
            {/* Contact Info */}
            <div className="flex flex-col gap-6">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="glass p-6 rounded-xl flex items-start gap-4 hover:border-primary/50 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Phone className="text-primary" size={20} />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-white mb-1">Phone Support</h3>
                  <p className="text-muted text-sm mb-2">Mon–Fri from 8am to 6pm.</p>
                  <a href="tel:+251967009542" className="text-primary font-mono hover:underline">+251 96 700 9542</a>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="glass p-6 rounded-xl flex items-start gap-4 hover:border-primary/50 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-[#25D366]/10 flex items-center justify-center shrink-0">
                  <MessageCircle className="text-[#25D366]" size={20} />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-white mb-1">WhatsApp</h3>
                  <p className="text-muted text-sm mb-2">Fastest way to reach our technical team.</p>
                  <a href="https://wa.me/251967009542" target="_blank" rel="noreferrer noopener" className="text-[#25D366] font-mono hover:underline">+251 96 700 9542</a>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="glass p-6 rounded-xl flex items-start gap-4 hover:border-primary/50 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Mail className="text-primary" size={20} />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-white mb-1">Email</h3>
                  <p className="text-muted text-sm mb-2">Send us your project RFPs.</p>
                  <a href="mailto:info@avenidatechs.com" className="text-primary font-mono hover:underline">info@avenidatechs.com</a>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }} className="glass p-6 rounded-xl flex items-start gap-4 hover:border-primary/50 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <MapPin className="text-primary" size={20} />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-white mb-1">Office</h3>
                  <p className="text-muted text-sm">Addis Ababa, Ethiopia</p>
                </div>
              </motion.div>
            </div>

            {/* Form */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.3 }}
              className="glass p-8 md:p-10 rounded-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary" />
              <h3 className="font-heading text-2xl font-bold mb-6 text-white">Request a Consultation</h3>
              
              {/* Success State */}
              {state.success ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center text-center gap-6 py-12"
                >
                  <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center">
                    <CheckCircle className="text-green-400" size={32} />
                  </div>
                  <div>
                    <h4 className="font-heading text-xl font-bold text-white mb-2">Message Sent!</h4>
                    <p className="text-muted">{state.message}</p>
                  </div>
                  <Button
                    variant="secondary"
                    onClick={() => { window.location.reload() }}
                  >
                    Send Another Message
                  </Button>
                </motion.div>
              ) : (
                <form ref={formRef} action={formAction} className="flex flex-col gap-5" noValidate>
                  {/* Honeypot field — hidden from real users, bots fill it */}
                  <input
                    name="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    style={{ display: "none" }}
                  />

                  {/* Error Banner */}
                  {state.message && !state.success && (
                    <div className="flex items-center gap-3 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                      <AlertCircle size={16} className="shrink-0" />
                      {state.message}
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="name" className="text-sm text-muted">Name *</label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        maxLength={100}
                        autoComplete="name"
                        className="bg-[#0A0F14] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors"
                        placeholder="John Doe"
                      />
                      {state.errors?.name && (
                        <span className="text-red-400 text-xs">{state.errors.name[0]}</span>
                      )}
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="company" className="text-sm text-muted">Company</label>
                      <input
                        id="company"
                        name="company"
                        type="text"
                        maxLength={100}
                        autoComplete="organization"
                        className="bg-[#0A0F14] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors"
                        placeholder="Organization"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="phone" className="text-sm text-muted">Phone *</label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        maxLength={30}
                        autoComplete="tel"
                        className="bg-[#0A0F14] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors"
                        placeholder="+251..."
                      />
                      {state.errors?.phone && (
                        <span className="text-red-400 text-xs">{state.errors.phone[0]}</span>
                      )}
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="email" className="text-sm text-muted">Email *</label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        maxLength={200}
                        autoComplete="email"
                        className="bg-[#0A0F14] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors"
                        placeholder="john@example.com"
                      />
                      {state.errors?.email && (
                        <span className="text-red-400 text-xs">{state.errors.email[0]}</span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="projectType" className="text-sm text-muted">Project Type *</label>
                    <select
                      id="projectType"
                      name="projectType"
                      required
                      className="bg-[#0A0F14] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors appearance-none"
                    >
                      <option>Indoor LED Display</option>
                      <option>Outdoor LED Display</option>
                      <option>Maintenance / Support</option>
                      <option>Technical Consultation</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="message" className="text-sm text-muted">Message *</label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      minLength={10}
                      maxLength={5000}
                      className="bg-[#0A0F14] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors resize-none"
                      placeholder="Tell us about your project requirements..."
                    />
                    {state.errors?.message && (
                      <span className="text-red-400 text-xs">{state.errors.message[0]}</span>
                    )}
                  </div>

                  {/* Turnstile Bot Protection */}
                  <div className="flex flex-col gap-1">
                    <TurnstileWidget onVerify={handleVerify} onExpire={handleExpire} />
                    {state.errors?.turnstileToken && (
                      <span className="text-red-400 text-xs">{state.errors.turnstileToken[0]}</span>
                    )}
                    {/* Hidden input to pass token to form action */}
                    <input type="hidden" name="turnstileToken" value={turnstileToken} />
                  </div>

                  <Button
                    size="lg"
                    className="mt-4"
                    disabled={isPending || !turnstileToken}
                  >
                    {isPending ? (
                      <span className="flex items-center gap-2">
                        <Loader2 size={18} className="animate-spin" />
                        Sending...
                      </span>
                    ) : (
                      "Submit Request"
                    )}
                  </Button>
                </form>
              )}
            </motion.div>

          </div>
        </div>
      </section>
    </div>
  )
}
