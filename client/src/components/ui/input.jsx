import * as React from "react"
import { cn } from "../../lib/utils"

const Input = React.forwardRef(({ className, type, icon: Icon, ...props }, ref) => {
    const input = (
        <input
            type={type}
            className={cn(
                "flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground/70 hover:border-muted-foreground/40 focus-visible:outline-none focus-visible:border-primary/60 focus-visible:ring-4 focus-visible:ring-primary/15 disabled:cursor-not-allowed disabled:opacity-50 aria-[invalid=true]:border-destructive aria-[invalid=true]:ring-destructive/15",
                Icon && "pl-10",
                className
            )}
            ref={ref}
            {...props}
        />
    )
    if (!Icon) return input
    return (
        <div className="relative w-full">
            <Icon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            {input}
        </div>
    )
})
Input.displayName = "Input"

export { Input }
