import { cva } from "class-variance-authority"
import { cn } from "../../lib/utils"

const badgeVariants = cva(
    "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors [&_svg]:size-3",
    {
        variants: {
            variant: {
                default: "border-transparent bg-primary/10 text-primary",
                secondary: "border-transparent bg-secondary text-secondary-foreground",
                outline: "text-foreground",
                success: "border-transparent bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
                info: "border-transparent bg-sky-500/10 text-sky-600 dark:text-sky-400",
            },
        },
        defaultVariants: { variant: "default" },
    }
)

function Badge({ className, variant, ...props }) {
    return <span className={cn(badgeVariants({ variant }), className)} {...props} />
}

// eslint-disable-next-line react-refresh/only-export-components
export { Badge, badgeVariants }
