import React from "react"
import { cn } from "@/lib/utils"

const Button = React.forwardRef(({ className, variant = "primary", size = "default", ...props }, ref) => {
  const variants = {
    primary: "gradient-primary text-blue-950 border-none shadow-[0_4px_14px_rgba(189,194,255,0.2)] hover:shadow-[0_6px_20px_rgba(189,194,255,0.3)] hover:-translate-y-[1px] transition-all",
    secondary: "bg-surface-container-highest text-primary border-none hover:bg-surface-container-high transition-colors",
    ghost: "bg-transparent text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface transition-colors",
  }

  const sizes = {
    default: "h-12 px-6 py-3",
    sm: "h-9 px-4 py-2 text-sm",
    lg: "h-14 px-8 py-4 text-lg",
    icon: "h-12 w-12 flex justify-center items-center"
  }

  return (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded-xl font-medium uppercase tracking-[0.05em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  )
})
Button.displayName = "Button"

export { Button }
