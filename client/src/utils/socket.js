import { io } from "socket.io-client";
import { BASE_URL } from "./constants";

// Socket.io lives on the API server's origin, not under its /api path.
const getSocketOrigin = () => {
    try {
        return new URL(BASE_URL, window.location.origin).origin;
    } catch {
        return window.location.origin;
    }
};

export const createSocketConnection = () => {
    return io(getSocketOrigin(), { withCredentials: true });
};
