import React from "react"
import { cn } from "@/lib/utils"

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-14 w-full rounded-xl bg-surface-container-lowest px-4 py-2 text-sm text-on-surface ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-on-surface-variant focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-secondary/40 focus-visible:shadow-[inset_0_0_8px_rgba(189,194,255,0.1)] disabled:cursor-not-allowed disabled:opacity-50 ghost-border transition-all",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Input.displayName = "Input"

export { Input }
