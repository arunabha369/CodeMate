import { Compass, Users, Inbox, UserRound } from "lucide-react";

export const APP_NAV = [
    { to: "/", label: "Discover", icon: Compass, end: true },
    { to: "/connections", label: "Connections", icon: Users },
    { to: "/requests", label: "Requests", icon: Inbox, badge: "requests" },
    { to: "/profile", label: "Profile", icon: UserRound, mobileOnly: true },
];

export const MARKETING_NAV = [
    { id: "features", label: "Features" },
    { id: "how-it-works", label: "How it works" },
    { id: "contact", label: "Contact" },
];
