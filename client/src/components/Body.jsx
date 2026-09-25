import { Outlet, useLocation } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import MobileNav from "./MobileNav";
import Footer from "./Footer";
import Toast from "./Toast";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../store/userSlice";
import { addRequests } from "../store/requestSlice";
import { Logo } from "./ui/logo";

const SplashScreen = () => (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background">
        <Logo className="animate-in fade-in zoom-in-95 duration-500" />
        <div className="h-1 w-32 overflow-hidden rounded-full bg-muted">
            <div className="h-full w-1/2 animate-[shimmer_1.2s_ease-in-out_infinite] rounded-full bg-primary [transform:translateX(-100%)]" />
        </div>
    </div>
);

const Body = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const userData = useSelector((store) => store.user);
    const requests = useSelector((store) => store.requests);
    const [authChecked, setAuthChecked] = useState(Boolean(userData));

    useEffect(() => {
        if (userData) {
            setAuthChecked(true);
            return;
        }
        let cancelled = false;
        axios
            .get(BASE_URL + "/profile/view", { withCredentials: true })
            .then((res) => {
                if (!cancelled && res.data && res.data._id) dispatch(addUser(res.data));
            })
            .catch(() => {
                // Not signed in: public routes render, protected routes redirect to /login.
            })
            .finally(() => {
                if (!cancelled) setAuthChecked(true);
            });
        return () => {
            cancelled = true;
        };
        // Only runs on first mount; later sign-ins dispatch the user directly.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Preload pending requests so the nav can show a badge.
    useEffect(() => {
        if (!userData || requests) return;
        axios
            .get(BASE_URL + "/user/requests/received", { withCredentials: true })
            .then((res) => dispatch(addRequests(res.data.data)))
            .catch(() => {});
    }, [userData, requests, dispatch]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "instant" });
    }, [location.pathname]);

    if (!authChecked) return <SplashScreen />;

    const isAuthPage = location.pathname === "/login";
    const isChat = location.pathname.startsWith("/chat/");

    return (
        <div className="flex min-h-screen flex-col">
            <a
                href="#main"
                className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
            >
                Skip to content
            </a>
            {!isAuthPage && <NavBar />}
            <main id="main" className={userData && !isChat ? "flex-1 pb-20 md:pb-0" : "flex-1"}>
                <Outlet />
            </main>
            {!userData && !isAuthPage && <Footer />}
            {userData && !isChat && <MobileNav />}
            <Toast />
        </div>
    );
};
export default Body;
