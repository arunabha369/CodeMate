import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../store/userSlice";
import { Button } from "./ui/button";
import { useState } from "react";
import { LogOut, User as UserIcon, Users, MessageSquare } from "lucide-react";
import { ModeToggle } from "./mode-toggle";

import logo from "../assets/logo.png";

const NavBar = () => {
    const user = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = async () => {
        try {
            await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
            dispatch(removeUser());
            return navigate("/login");
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div className="flex justify-center w-full fixed top-4 z-50 px-4">
            <nav className="w-full max-w-4xl border border-border/40 bg-background/60 backdrop-blur-md rounded-full shadow-lg supports-[backdrop-filter]:bg-background/40 transition-all hover:border-primary/20 hover:shadow-primary/5">
                <div className="flex h-16 items-center justify-between px-6">
                    <Link to="/" className="flex items-center gap-2">
                        <img src={logo} alt="CodeMate Logo" className="h-44 w-auto -ml-4" />
                    </Link>

                    {user ? (
                        <div className="flex items-center gap-4">
                            <span className="hidden md:inline-block text-sm font-medium text-muted-foreground">
                                Welcome, <span className="text-foreground">{user.firstName}</span>
                            </span>

                            <div className="relative">
                                <button
                                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                                    className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full ring-2 ring-primary/50 ring-offset-2 ring-offset-background focus:outline-none transition-transform hover:scale-105"
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
                                        <div className="absolute right-0 mt-3 w-56 rounded-xl border border-border/50 bg-popover/95 backdrop-blur-xl text-popover-foreground shadow-2xl animate-in fade-in zoom-in-95 data-[side=bottom]:slide-in-from-top-2 p-1 z-50">
                                            <Link to="/profile" onClick={() => setIsMenuOpen(false)} className="relative flex cursor-pointer select-none items-center rounded-md px-2 py-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground transition-colors group">
                                                <UserIcon className="mr-2 h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                                                <span>Profile</span>
                                            </Link>
                                            <Link to="/connections" onClick={() => setIsMenuOpen(false)} className="relative flex cursor-pointer select-none items-center rounded-md px-2 py-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground transition-colors group">
                                                <Users className="mr-2 h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                                                <span>Connections</span>
                                            </Link>
                                            <Link to="/requests" onClick={() => setIsMenuOpen(false)} className="relative flex cursor-pointer select-none items-center rounded-md px-2 py-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground transition-colors group">
                                                <MessageSquare className="mr-2 h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                                                <span>Requests</span>
                                            </Link>
                                            <div className="h-px bg-border/50 my-1" />
                                            <div onClick={handleLogout} className="relative flex cursor-pointer select-none items-center rounded-md px-2 py-2 text-sm outline-none hover:bg-destructive/10 hover:text-destructive text-muted-foreground transition-colors">
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
                                <Button className="rounded-full px-6 bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg transition-all">Login</Button>
                            </Link>
                        </div>
                    )}
                </div>
            </nav>
        </div>
    );
};
export default NavBar;
