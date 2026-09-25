import { cn } from "../../lib/utils"

function Logo({ className, showText = true }) {
    return (
        <span className={cn("inline-flex items-center gap-2.5 font-semibold tracking-tight", className)}>
            <span className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-rose-500 to-pink-600 shadow-md shadow-rose-600/30">
                <svg viewBox="0 0 24 24" className="h-4 w-4 text-white" fill="none" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M9 7l-5 5 5 5M15 7l5 5-5 5" />
                </svg>
            </span>
            {showText && (
                <span className="text-lg">
                    Code<span className="text-primary">Mate</span>
                </span>
            )}
        </span>
    )
}

export { Logo }
