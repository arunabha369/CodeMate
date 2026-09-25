import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { APP_NAV } from "./nav-items";
import { cn } from "../lib/utils";

const MobileNav = () => {
    const requests = useSelector((store) => store.requests);
    const pending = requests?.length || 0;

    return (
        <nav
            aria-label="Primary"
            className="fixed inset-x-0 bottom-0 z-40 border-t bg-background/85 backdrop-blur-xl pb-safe md:hidden"
        >
            <ul className="grid grid-cols-4">
                {APP_NAV.map(({ to, label, icon: Icon, end, badge }) => (
                    <li key={to}>
                        <NavLink
                            to={to}
                            end={end}
                            className={({ isActive }) =>
                                cn(
                                    "relative flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium transition-colors",
                                    isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                                )
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    <span className={cn("absolute top-0 h-0.5 w-8 rounded-full bg-primary transition-opacity", isActive ? "opacity-100" : "opacity-0")} />
                                    <span className="relative">
                                        <Icon className="h-5 w-5" strokeWidth={isActive ? 2.4 : 2} />
                                        {badge === "requests" && pending > 0 && (
                                            <span className="absolute -right-2 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold text-primary-foreground">
                                                {pending > 9 ? "9+" : pending}
                                            </span>
                                        )}
                                    </span>
                                    {label}
                                </>
                            )}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default MobileNav;
