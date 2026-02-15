import { io } from "socket.io-client";
import { BASE_URL } from "./constants";

export const createSocketConnection = () => {
    // Assuming BASE_URL is something like "http://localhost:7778"
    // Socket.io usually connects to the root, but we can pass the URL.
    // If your API is at /api, you might need to adjust, but usually it's the root domain.
    // For now, let's assume root.
    // We need to parse BASE_URL to remove /api/v1 if present or just use the origin.
    // But let's keep it simple for now and use a hardcoded dev URL or smarter logic if needed.
    
    // Actually, BASE_URL often includes /api/v1. Let's strip it to get the origin.
    // const origin = BASE_URL.replace("/api/v1", ""); 
    // Or just use the known server URL for dev:
    
    return io("http://localhost:7778"); 
};
