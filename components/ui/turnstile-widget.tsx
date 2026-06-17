"use client"

import { useEffect, useRef } from "react"

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: string | HTMLElement,
        params: {
          sitekey: string
          theme?: "light" | "dark" | "auto"
          callback?: (token: string) => void
          "expired-callback"?: () => void
          "error-callback"?: () => void
        }
      ) => string
      reset: (widgetId?: string) => void
      remove: (widgetId?: string) => void
    }
  }
}

interface TurnstileWidgetProps {
  onVerify: (token: string) => void
  onExpire?: () => void
}

export function TurnstileWidget({ onVerify, onExpire }: TurnstileWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<string | null>(null)
  const scriptLoadedRef = useRef(false)

  useEffect(() => {
    const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
    if (!siteKey || !containerRef.current) return

    const renderWidget = () => {
      if (!window.turnstile || !containerRef.current || widgetIdRef.current) return
      
      widgetIdRef.current = window.turnstile.render(containerRef.current, {
        sitekey: siteKey,
        theme: "dark",
        callback: (token: string) => {
          onVerify(token)
        },
        "expired-callback": () => {
          onExpire?.()
        },
        "error-callback": () => {
          // Reset on error to allow retry
          if (widgetIdRef.current && window.turnstile) {
            window.turnstile.reset(widgetIdRef.current)
          }
        },
      })
    }

    const loadScript = () => {
      if (scriptLoadedRef.current) return
      
      const script = document.createElement("script")
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js"
      script.async = true
      script.defer = true
      script.onload = () => {
        scriptLoadedRef.current = true
        renderWidget()
      }
      document.head.appendChild(script)
    }

    if (window.turnstile) {
      renderWidget()
    } else {
      loadScript()
    }

    return () => {
      if (window.turnstile && widgetIdRef.current) {
        try {
          window.turnstile.remove(widgetIdRef.current)
        } catch {
          // Ignore cleanup errors
        }
        widgetIdRef.current = null
      }
    }
  }, [onVerify, onExpire])

  return <div ref={containerRef} className="mt-2" />
}
