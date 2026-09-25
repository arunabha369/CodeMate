import { createContext, useContext, useEffect, useState } from "react"

const initialState = {
    theme: "system",
    resolvedTheme: "dark",
    setTheme: () => null,
}

const ThemeProviderContext = createContext(initialState)

const getSystemTheme = () =>
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"

const readStoredTheme = (key) => {
    try {
        return localStorage.getItem(key)
    } catch {
        return null
    }
}

export function ThemeProvider({
    children,
    defaultTheme = "system",
    storageKey = "vite-ui-theme",
    ...props
}) {
    const [theme, setTheme] = useState(() => readStoredTheme(storageKey) || defaultTheme)
    const [systemTheme, setSystemTheme] = useState(getSystemTheme)

    useEffect(() => {
        const media = window.matchMedia("(prefers-color-scheme: dark)")
        const onChange = () => setSystemTheme(getSystemTheme())
        media.addEventListener("change", onChange)
        return () => media.removeEventListener("change", onChange)
    }, [])

    const resolvedTheme = theme === "system" ? systemTheme : theme

    useEffect(() => {
        const root = window.document.documentElement
        root.classList.remove("light", "dark")
        root.classList.add(resolvedTheme)
        root.style.colorScheme = resolvedTheme
    }, [resolvedTheme])

    const value = {
        theme,
        resolvedTheme,
        setTheme: (next) => {
            try {
                localStorage.setItem(storageKey, next)
            } catch {
                // Storage can be unavailable (private mode); the theme still applies for this visit.
            }
            setTheme(next)
        },
    }

    return (
        <ThemeProviderContext.Provider {...props} value={value}>
            {children}
        </ThemeProviderContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => {
    const context = useContext(ThemeProviderContext)

    if (context === undefined)
        throw new Error("useTheme must be used within a ThemeProvider")

    return context
}
