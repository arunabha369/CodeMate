import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../store/userSlice";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";
import { LogOut, User as UserIcon, Users, MessageSquare } from "lucide-react";
import { ModeToggle } from "./mode-toggle";

import logo from "../assets/logo.png";

const NavBar = () => {
    const user = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("home");

    useEffect(() => {
        const handleScroll = () => {
            const sections = ["home", "features", "contact"];
            const scrollPosition = window.scrollY + 100; // Offset

            for (const section of sections) {
                const element = document.getElementById(section);
                if (element && element.offsetTop <= scrollPosition && (element.offsetTop + element.offsetHeight) > scrollPosition) {
                    setActiveSection(section);
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = (e, sectionId) => {
        e.preventDefault();
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
            setActiveSection(sectionId);
        } else {
            navigate("/");
            setTimeout(() => {
                const el = document.getElementById(sectionId);
                if (el) el.scrollIntoView({ behavior: "smooth" });
            }, 100);
        }
    };

    const handleLogout = async () => {
        try {
            await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
        } catch (err) {
            console.error("Logout failed:", err);
        } finally {
            dispatch(removeUser());
            navigate("/login");
        }
    };
    return (
        <div className="fixed top-0 w-full z-50 transition-all duration-300 py-4">
            <nav className="container mx-auto px-6 flex items-center justify-between">

                {/* Logo Section */}
                <Link to="/" className="flex items-center gap-2 relative z-50">
                    <img src={logo} alt="CodeMate Logo" className="h-16 w-auto" />

                </Link>

                {/* Center Navigation Pill */}
                <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center gap-1 bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-2 py-1.5 shadow-lg">
                    {["Home", "Features", "Contact"].map((item) => {
                        const sectionId = item.toLowerCase();
                        const isActive = activeSection === sectionId;
                        return (
                            <a
                                key={item}
                                href={`#${sectionId}`}
                                onClick={(e) => scrollToSection(e, sectionId)}
                                className={`px-6 py-2 text-sm font-medium rounded-full transition-all duration-300 ${isActive
                                    ? "bg-rose-600 text-white shadow-lg shadow-rose-500/25"
                                    : "text-gray-300 hover:text-white hover:bg-white/10"
                                    }`}
                            >
                                {item}
                            </a>
                        );
                    })}
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-4 relative z-50">
                    {user ? (
                        <div className="flex items-center gap-4">
                            <span className="hidden lg:inline-block text-sm font-medium text-gray-400">
                                Welcome, <span className="text-white">{user.firstName}</span>
                            </span>

                            <div className="relative">
                                <button
                                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                                    className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full ring-2 ring-rose-500/50 ring-offset-2 ring-offset-black focus:outline-none transition-transform hover:scale-105"
                                >
                                    <img
                                        className="aspect-square h-full w-full object-cover"
                                        src={user.photoUrl}
                                        alt={user.firstName}
                                    />
                                </button>

                                {isMenuOpen && (
                                    <>
                                        <div
                                            className="fixed inset-0 z-40"
                                            onClick={() => setIsMenuOpen(false)}
                                        />
                                        <div className="absolute right-0 mt-3 w-56 rounded-xl border border-white/10 bg-black/90 backdrop-blur-xl text-white shadow-2xl animate-in fade-in zoom-in-95 p-1 z-50">
                                            <Link to="/profile" onClick={() => setIsMenuOpen(false)} className="relative flex cursor-pointer select-none items-center rounded-md px-2 py-2 text-sm outline-none hover:bg-white/10 transition-colors group">
                                                <UserIcon className="mr-2 h-4 w-4 text-gray-400 group-hover:text-rose-500 transition-colors" />
                                                <span>Profile</span>
                                            </Link>
                                            <Link to="/connections" onClick={() => setIsMenuOpen(false)} className="relative flex cursor-pointer select-none items-center rounded-md px-2 py-2 text-sm outline-none hover:bg-white/10 transition-colors group">
                                                <Users className="mr-2 h-4 w-4 text-gray-400 group-hover:text-rose-500 transition-colors" />
                                                <span>Connections</span>
                                            </Link>
                                            <Link to="/requests" onClick={() => setIsMenuOpen(false)} className="relative flex cursor-pointer select-none items-center rounded-md px-2 py-2 text-sm outline-none hover:bg-white/10 transition-colors group">
                                                <MessageSquare className="mr-2 h-4 w-4 text-gray-400 group-hover:text-rose-500 transition-colors" />
                                                <span>Requests</span>
                                            </Link>
                                            <div className="h-px bg-white/10 my-1" />
                                            <div onClick={handleLogout} className="relative flex cursor-pointer select-none items-center rounded-md px-2 py-2 text-sm outline-none hover:bg-white/10 hover:text-rose-500 text-gray-400 transition-colors">
                                                <LogOut className="mr-2 h-4 w-4" />
                                                <span>Logout</span>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center gap-4">
                            <Link to="/login">
                                <Button className="text-white bg-transparent border border-white/20 hover:border-rose-500 hover:bg-rose-500/10 hover:shadow-[0_0_20px_rgba(244,63,94,0.5)] rounded-full px-8 transition-all duration-300">
                                    Login
                                </Button>
                            </Link>
                            <Link to="/login">
                                <Button className="rounded-full px-6 bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-500/20 transition-all hover:scale-105">
                                    Get Started
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>
            </nav>
        </div>
    );
};
export default NavBar;
