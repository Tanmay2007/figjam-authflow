import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const authButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-primary hover:bg-primary-hover text-primary-foreground shadow-[var(--auth-shadow)] hover:shadow-[var(--auth-shadow-hover)] transform hover:scale-[1.02] active:scale-[0.98]",
        outline: "border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground shadow-sm hover:shadow-md transform hover:scale-[1.02] active:scale-[0.98]",
        ghost: "text-primary hover:bg-primary/10 transform hover:scale-[1.02] active:scale-[0.98]",
      },
      size: {
        default: "h-12 px-6 py-3",
        sm: "h-10 px-4 py-2",
        lg: "h-14 px-8 py-4",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)

export interface AuthButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof authButtonVariants> {
  asChild?: boolean
}

const AuthButton = React.forwardRef<HTMLButtonElement, AuthButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(authButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
AuthButton.displayName = "AuthButton"

export { AuthButton, authButtonVariants }