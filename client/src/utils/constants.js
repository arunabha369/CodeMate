export const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:7778" : (import.meta.env.VITE_API_URL || "/api");
