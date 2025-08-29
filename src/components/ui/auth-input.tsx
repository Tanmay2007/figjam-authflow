import * as React from "react"
import { cn } from "@/lib/utils"

export interface AuthInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

const AuthInput = React.forwardRef<HTMLInputElement, AuthInputProps>(
  ({ className, type, label, error, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="text-sm font-medium text-foreground">
            {label}
          </label>
        )}
        <input
          type={type}
          className={cn(
            "flex h-12 w-full rounded-lg border bg-background px-4 py-3 text-sm transition-all duration-200",
            "shadow-[var(--auth-input-shadow)]",
            "placeholder:text-muted-foreground",
            "focus-visible:outline-none focus-visible:shadow-[var(--auth-input-shadow-focus)]",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-destructive shadow-[0_0_0_1px_hsl(var(--destructive)),0_1px_3px_0_hsl(0_0%_0%_/_0.1)]",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="text-sm text-destructive font-medium">{error}</p>
        )}
      </div>
    )
  }
)
AuthInput.displayName = "AuthInput"

export { AuthInput }