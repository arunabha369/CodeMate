import { cn } from "../../lib/utils"

function EmptyState({ icon: Icon, title, description, action, className }) {
    return (
        <div className={cn("flex flex-col items-center justify-center rounded-2xl border border-dashed bg-surface px-6 py-16 text-center animate-in fade-in zoom-in-95 duration-300", className)}>
            {Icon && (
                <div className="relative mb-5">
                    <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl" />
                    <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border bg-card text-primary shadow-sm">
                        <Icon className="h-6 w-6" />
                    </div>
                </div>
            )}
            <h2 className="text-lg font-semibold">{title}</h2>
            {description && <p className="mt-1.5 max-w-sm text-sm text-muted-foreground">{description}</p>}
            {action && <div className="mt-6">{action}</div>}
        </div>
    )
}

export { EmptyState }
