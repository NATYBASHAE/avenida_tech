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
          size?: "normal" | "compact"
          "refresh-expired"?: "auto" | "manual"
          "execution"?: "render" | "execute"
        }
      ) => string
      reset: (widgetId?: string) => void
      remove: (widgetId?: string) => void
      execute: (widgetId?: string) => void
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
  const isRenderedRef = useRef(false)
  const hasCheckedCacheRef = useRef(false)

  useEffect(() => {
    const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
    if (!siteKey || !containerRef.current) return

    // Clear any existing widget
    if (widgetIdRef.current && window.turnstile) {
      try {
        window.turnstile.remove(widgetIdRef.current)
        widgetIdRef.current = null
        isRenderedRef.current = false
      } catch {
        // Ignore cleanup errors
      }
    }

    const renderWidget = () => {
      if (!window.turnstile || !containerRef.current || isRenderedRef.current) return

      try {
        widgetIdRef.current = window.turnstile.render(containerRef.current, {
          sitekey: siteKey,
          theme: "dark",
          size: "normal",
          "refresh-expired": "auto",
          // Only render the widget, don't auto-execute
          "execution": "render",
          callback: (token: string) => {
            onVerify(token)
          },
          "expired-callback": () => {
            onExpire?.()
            isRenderedRef.current = false
          },
          "error-callback": () => {
            if (widgetIdRef.current && window.turnstile) {
              window.turnstile.reset(widgetIdRef.current)
            }
            isRenderedRef.current = false
          },
        })
        isRenderedRef.current = true

        // Check if there's already a cached token
        if (!hasCheckedCacheRef.current) {
          hasCheckedCacheRef.current = true
          // Execute the challenge silently - if already verified, it will callback immediately
          setTimeout(() => {
            if (widgetIdRef.current && window.turnstile) {
              window.turnstile.execute(widgetIdRef.current)
            }
          }, 100)
        }
      } catch {
        // Silently fail - widget will retry on next render
      }
    }

    // Check if Turnstile is already loaded
    if (window.turnstile) {
      renderWidget()
    } else {
      // Load the script
      const script = document.createElement("script")
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js"
      script.async = true
      script.defer = true
      script.onload = renderWidget
      document.head.appendChild(script)
    }

    return () => {
      if (window.turnstile && widgetIdRef.current) {
        try {
          window.turnstile.remove(widgetIdRef.current)
          widgetIdRef.current = null
          isRenderedRef.current = false
        } catch {
          // Ignore cleanup errors
        }
      }
    }
  }, [onVerify, onExpire])

  return <div ref={containerRef} className="mt-2" />
}
