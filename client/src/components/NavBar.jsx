import { useSelector } from "react-redux";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { LogOut, UserRound, Menu, X, Moon, Sun, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar } from "./ui/avatar";
import { Logo } from "./ui/logo";
import { ModeToggle } from "./mode-toggle";
import { useTheme } from "./theme-provider";
import { APP_NAV, MARKETING_NAV } from "./nav-items";
import { useLogout } from "../hooks/useLogout";
import { cn, fullName } from "../lib/utils";

const useScrolled = (offset = 8) => {
    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > offset);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, [offset]);
    return scrolled;
};

const UserMenu = ({ user }) => {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);
    const logout = useLogout();
    const { resolvedTheme, setTheme } = useTheme();

    useEffect(() => {
        if (!open) return;
        const onClick = (e) => ref.current && !ref.current.contains(e.target) && setOpen(false);
        const onKey = (e) => e.key === "Escape" && setOpen(false);
        document.addEventListener("mousedown", onClick);
        document.addEventListener("keydown", onKey);
        return () => {
            document.removeEventListener("mousedown", onClick);
            document.removeEventListener("keydown", onKey);
        };
    }, [open]);

    const itemClass =
        "flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-sm text-foreground/90 transition-colors hover:bg-accent hover:text-foreground [&_svg]:h-4 [&_svg]:w-4 [&_svg]:text-muted-foreground";

    return (
        <div className="relative" ref={ref}>
            <button
                onClick={() => setOpen((o) => !o)}
                className="flex items-center gap-2 rounded-full p-0.5 pr-2 transition-colors hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring"
                aria-haspopup="menu"
                aria-expanded={open}
                aria-label="Open account menu"
            >
                <Avatar src={user.photoUrl} firstName={user.firstName} lastName={user.lastName} size="sm" />
                <ChevronDown className={cn("hidden h-4 w-4 text-muted-foreground transition-transform sm:block", open && "rotate-180")} />
            </button>

            {open && (
                <div
                    role="menu"
                    className="absolute right-0 mt-2 w-64 origin-top-right rounded-xl border bg-popover p-1.5 text-popover-foreground shadow-xl shadow-black/10 animate-in fade-in zoom-in-95 slide-in-from-top-2 duration-150"
                >
                    <div className="flex items-center gap-3 px-2.5 py-2.5">
                        <Avatar src={user.photoUrl} firstName={user.firstName} lastName={user.lastName} size="md" />
                        <div className="min-w-0">
                            <p className="truncate text-sm font-semibold">{fullName(user)}</p>
                            {user.email && <p className="truncate text-xs text-muted-foreground">{user.email}</p>}
                        </div>
                    </div>
                    <div className="my-1 h-px bg-border" />
                    <Link to="/profile" role="menuitem" onClick={() => setOpen(false)} className={itemClass}>
                        <UserRound /> Your profile
                    </Link>
                    <button
                        role="menuitem"
                        onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                        className={itemClass}
                    >
                        {resolvedTheme === "dark" ? <Sun /> : <Moon />}
                        {resolvedTheme === "dark" ? "Light mode" : "Dark mode"}
                    </button>
                    <div className="my-1 h-px bg-border" />
                    <button
                        role="menuitem"
                        onClick={() => {
                            setOpen(false);
                            logout();
                        }}
                        className={cn(itemClass, "text-destructive hover:text-destructive [&_svg]:text-destructive")}
                    >
                        <LogOut /> Sign out
                    </button>
                </div>
            )}
        </div>
    );
};

const AppNav = () => {
    const requests = useSelector((store) => store.requests);
    const pending = requests?.length || 0;

    return (
        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
            {APP_NAV.filter((i) => !i.mobileOnly).map(({ to, label, icon: Icon, end, badge }) => (
                <NavLink
                    key={to}
                    to={to}
                    end={end}
                    className={({ isActive }) =>
                        cn(
                            "relative flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                            isActive ? "bg-accent text-foreground" : "text-muted-foreground hover:bg-accent/60 hover:text-foreground"
                        )
                    }
                >
                    <Icon className="h-4 w-4" />
                    {label}
                    {badge === "requests" && pending > 0 && (
                        <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-[11px] font-semibold text-primary-foreground">
                            {pending > 9 ? "9+" : pending}
                        </span>
                    )}
                </NavLink>
            ))}
        </nav>
    );
};

const MarketingNav = ({ onNavigate, className }) => (
    <nav aria-label="Primary" className={className}>
        {MARKETING_NAV.map(({ id, label }) => (
            <a
                key={id}
                href={`/#${id}`}
                onClick={(e) => onNavigate(e, id)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent/60 hover:text-foreground"
            >
                {label}
            </a>
        ))}
    </nav>
);

const NavBar = () => {
    const user = useSelector((store) => store.user);
    const navigate = useNavigate();
    const location = useLocation();
    const scrolled = useScrolled();
    // Remember which page the mobile menu was opened on so navigating closes it.
    const [menuPath, setMenuPath] = useState(null);
    const mobileOpen = menuPath === location.pathname;
    const setMobileOpen = (open) => setMenuPath(open ? location.pathname : null);

    const scrollToSection = (e, id) => {
        e.preventDefault();
        setMobileOpen(false);
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: "smooth" });
        } else {
            navigate("/");
            setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 100);
        }
    };

    return (
        <header
            className={cn(
                "sticky top-0 z-50 w-full border-b transition-all duration-300",
                scrolled || user || mobileOpen
                    ? "border-border/70 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/70"
                    : "border-transparent bg-transparent"
            )}
        >
            <div className="container flex h-16 items-center justify-between gap-4">
                <div className="flex items-center gap-8">
                    <Link to="/" aria-label="CodeMate home" className="rounded-lg focus-visible:ring-2 focus-visible:ring-ring">
                        <Logo />
                    </Link>
                    {user ? <AppNav /> : <MarketingNav onNavigate={scrollToSection} className="hidden items-center gap-1 md:flex" />}
                </div>

                <div className="flex items-center gap-1.5 sm:gap-2">
                    {user ? (
                        <>
                            <ModeToggle className="hidden sm:inline-flex" />
                            <UserMenu user={user} />
                        </>
                    ) : (
                        <>
                            <ModeToggle />
                            <Button asChild variant="ghost" className="hidden sm:inline-flex">
                                <Link to="/login">Log in</Link>
                            </Button>
                            <Button asChild variant="gradient" className="hidden sm:inline-flex">
                                <Link to="/login" state={{ mode: "signup" }}>Get started</Link>
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="md:hidden"
                                onClick={() => setMobileOpen(!mobileOpen)}
                                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                                aria-expanded={mobileOpen}
                            >
                                {mobileOpen ? <X /> : <Menu />}
                            </Button>
                        </>
                    )}
                </div>
            </div>

            {!user && mobileOpen && (
                <div className="border-t bg-background md:hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="container flex flex-col gap-1 py-4">
                        <MarketingNav onNavigate={scrollToSection} className="flex flex-col" />
                        <div className="mt-3 grid grid-cols-2 gap-2 border-t pt-4">
                            <Button asChild variant="outline">
                                <Link to="/login">Log in</Link>
                            </Button>
                            <Button asChild variant="gradient">
                                <Link to="/login" state={{ mode: "signup" }}>Get started</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};
export default NavBar;
