import { useState } from "react"
import { cn } from "../../lib/utils"

const sizes = {
    xs: "h-7 w-7 text-[10px]",
    sm: "h-9 w-9 text-xs",
    md: "h-11 w-11 text-sm",
    lg: "h-14 w-14 text-base",
    xl: "h-24 w-24 text-2xl",
    "2xl": "h-32 w-32 text-3xl",
}

const getInitials = (first = "", last = "") =>
    `${first?.[0] ?? ""}${last?.[0] ?? ""}`.toUpperCase() || "?"

function Avatar({ src, firstName, lastName, size = "md", className, online }) {
    const [failed, setFailed] = useState(false)
    return (
        <div className={cn("relative inline-flex shrink-0 rounded-full", className)}>
            <div className={cn("flex overflow-hidden rounded-full bg-gradient-to-br from-rose-500 to-violet-500 ring-1 ring-border", sizes[size])}>
                {src && !failed ? (
                    <img
                        src={src}
                        alt={`${firstName ?? ""} ${lastName ?? ""}`.trim() || "Avatar"}
                        className="h-full w-full object-cover"
                        loading="lazy"
                        onError={() => setFailed(true)}
                    />
                ) : (
                    <span className="flex h-full w-full items-center justify-center font-semibold text-white">
                        {getInitials(firstName, lastName)}
                    </span>
                )}
            </div>
            {online && (
                <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-background" />
            )}
        </div>
    )
}

export { Avatar }
