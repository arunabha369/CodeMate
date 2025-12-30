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
        <nav className="w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
            <div className="container flex h-20 items-center justify-between px-4">
                <Link to="/">
                    <img src={logo} alt="CodeMate Logo" className="h-44 w-auto -ml-4" />
                </Link>

                {user ? (
                    <div className="flex items-center gap-4">
                        <span className="hidden md:inline-block text-sm font-medium text-muted-foreground">
                            Welcome, {user.firstName}
                        </span>

                        <ModeToggle />

                        <div className="relative">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full ring-2 ring-primary ring-offset-2 focus:outline-none transition-transform hover:scale-105"
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
                                    <div className="absolute right-0 mt-2 w-56 rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in zoom-in-95 data-[side=bottom]:slide-in-from-top-2 p-1 z-50">
                                        <Link to="/profile" onClick={() => setIsMenuOpen(false)} className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground">
                                            <UserIcon className="mr-2 h-4 w-4" />
                                            <span>Profile</span>
                                        </Link>
                                        <Link to="/connections" onClick={() => setIsMenuOpen(false)} className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground">
                                            <Users className="mr-2 h-4 w-4" />
                                            <span>Connections</span>
                                        </Link>
                                        <Link to="/requests" onClick={() => setIsMenuOpen(false)} className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground">
                                            <MessageSquare className="mr-2 h-4 w-4" />
                                            <span>Requests</span>
                                        </Link>
                                        <div className="h-px bg-muted my-1" />
                                        <div onClick={handleLogout} className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-destructive hover:text-destructive-foreground">
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
                        <ModeToggle />
                        <Link to="/login">
                            <Button>Login</Button>
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
};
export default NavBar;
