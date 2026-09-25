import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

// The API returns errors as plain strings ("ERROR : ...") or as { message }.
export function getErrorMessage(err, fallback = "Something went wrong. Please try again.") {
  const data = err?.response?.data
  let message = typeof data === "string" ? data : data?.message
  if (!message && !err?.response && err?.message === "Network Error") {
    message = "Can't reach the server. Check your connection."
  }
  if (!message) return fallback
  return message.replace(/^ERROR\s*:\s*/i, "").trim() || fallback
}

export function fullName(user) {
  return [user?.firstName, user?.lastName].filter(Boolean).join(" ")
}

export function capitalize(s = "") {
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : s
}

export function formatTime(date) {
  return new Date(date).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })
}
