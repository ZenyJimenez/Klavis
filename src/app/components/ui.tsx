import * as React from "react"
import { cn } from "../../lib/utils"

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("rounded-[12px] bg-[#FFFFFF] text-[#0F172A] border border-[#E2E8F0] shadow-[0_2px_8px_rgba(0,0,0,0.08)]", className)}
      {...props}
    />
  )
)
Card.displayName = "Card"

const Badge = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { variant?: 'default' | 'success' | 'destructive' | 'warning' }>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[#0F172A] focus:ring-offset-2",
          {
            "border-transparent bg-[#F8FAFC] text-[#0F172A]": variant === "default",
            "border-transparent bg-[#16A34A]/10 text-[#16A34A]": variant === "success",
            "border-transparent bg-[#DC2626]/10 text-[#DC2626]": variant === "destructive",
            "border-transparent bg-[#D97706]/10 text-[#D97706]": variant === "warning",
          },
          className
        )}
        {...props}
      />
    )
  }
)
Badge.displayName = "Badge"

const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'default' | 'outline' | 'ghost', size?: 'default' | 'sm' | 'lg' | 'icon' }>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-[8px] text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A1628] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          {
            "bg-[#2563EB] text-[#FFFFFF] hover:bg-[#1E3A5F]": variant === "default",
            "border border-[#E2E8F0] bg-[#FFFFFF] hover:bg-[#F8FAFC] hover:text-[#0F172A]": variant === "outline",
            "hover:bg-[#F8FAFC] hover:text-[#0F172A]": variant === "ghost",
            "h-10 px-4 py-2": size === "default",
            "h-9 px-3": size === "sm",
            "h-12 px-8 text-base": size === "lg",
            "h-10 w-10": size === "icon",
          },
          className
        )}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Card, Badge, Button }
