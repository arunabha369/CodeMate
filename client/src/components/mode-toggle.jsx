import { Moon, Sun } from "lucide-react"
import { Button } from "./ui/button"
import { useTheme } from "./theme-provider"

export function ModeToggle({ className }) {
    const { resolvedTheme, setTheme } = useTheme()
    const next = resolvedTheme === "dark" ? "light" : "dark"

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(next)}
            className={className}
            aria-label={`Switch to ${next} theme`}
            title={`Switch to ${next} theme`}
        >
            <Sun className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
    )
}
