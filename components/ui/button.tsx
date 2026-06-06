import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost"
  size?: "default" | "sm" | "lg"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-lg font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
          {
            "bg-primary text-[#0A0F14] hover:bg-[#5CE1E6] box-glow shadow-[0_0_20px_rgba(0,183,255,0.3)]": variant === "primary",
            "border border-border bg-black/20 backdrop-blur-md hover:bg-surface text-foreground": variant === "secondary",
            "hover:bg-surface text-foreground": variant === "ghost",
            "h-10 py-2 px-4": size === "default",
            "h-9 px-3 rounded-md text-sm": size === "sm",
            "h-14 px-8 rounded-md text-lg": size === "lg",
          },
          className
        )}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
