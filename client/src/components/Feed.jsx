import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Heart, X, Info, RotateCw, PartyPopper, WifiOff, UserRound } from "lucide-react";
import { BASE_URL } from "../utils/constants";
import { addFeed, removeUserFromFeed } from "../store/feedSlice";
import { showToast } from "../store/toastSlice";
import UserCard from "./UserCard";
import UserDetailModal from "./UserDetailModal";
import LandingPage from "./LandingPage";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import { EmptyState } from "./ui/empty-state";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { cn, getErrorMessage } from "../lib/utils";

const SWIPE_THRESHOLD = 110;
const EXIT_MS = 280;

// Leaves room for the header, action buttons and (on mobile) the bottom tab bar.
const CARD_SIZE = "h-[clamp(360px,calc(100dvh-22rem),560px)] w-full max-w-sm";

const Kbd = ({ children }) => (
    <kbd className="inline-flex h-6 min-w-6 items-center justify-center rounded-md border bg-muted px-1.5 font-mono text-[11px] font-medium text-muted-foreground shadow-sm">
        {children}
    </kbd>
);

const ActionButton = ({ onClick, label, className, size = "lg", children, disabled }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        aria-label={label}
        title={label}
        className={cn(
            "flex items-center justify-center rounded-full border bg-card shadow-lg shadow-black/5 transition-all duration-200 hover:scale-110 active:scale-95 disabled:pointer-events-none disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            size === "lg" ? "h-16 w-16" : "h-12 w-12",
            className
        )}
    >
        {children}
    </button>
);

const FeedSkeleton = () => (
    <div className="flex flex-col items-center gap-8">
        <Skeleton className={cn(CARD_SIZE, "rounded-3xl")} />
        <div className="flex items-center gap-6">
            <Skeleton className="h-16 w-16 rounded-full" />
            <Skeleton className="h-12 w-12 rounded-full" />
            <Skeleton className="h-16 w-16 rounded-full" />
        </div>
    </div>
);

const Feed = () => {
    const feed = useSelector((store) => store.feed);
    const user = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const [exit, setExit] = useState(null); // 'left' | 'right'
    const [drag, setDrag] = useState({ x: 0, y: 0, active: false });
    const [loading, setLoading] = useState(false);
    const [loadError, setLoadError] = useState(null);
    const dragStart = useRef(null);
    useDocumentTitle(user ? "Discover" : undefined);
    const closeModal = useCallback(() => setShowModal(false), []);

    const fetchFeed = useCallback(async () => {
        setLoading(true);
        setLoadError(null);
        try {
            const res = await axios.get(BASE_URL + "/feed", { withCredentials: true });
            dispatch(addFeed(res?.data || []));
        } catch (err) {
            setLoadError(getErrorMessage(err, "Couldn't load developers."));
        } finally {
            setLoading(false);
        }
    }, [dispatch]);

    useEffect(() => {
        if (user && !feed) fetchFeed();
    }, [user, feed, fetchFeed]);

    const current = feed?.[0];

    const handleSwipe = useCallback(
        async (dir) => {
            if (!current || exit) return;
            setShowModal(false);
            setExit(dir);
            const status = dir === "right" ? "interested" : "ignored";

            setTimeout(() => {
                dispatch(removeUserFromFeed(current._id));
                setExit(null);
                setDrag({ x: 0, y: 0, active: false });
            }, EXIT_MS);

            try {
                await axios.post(`${BASE_URL}/request/send/${status}/${current._id}`, {}, { withCredentials: true });
                if (dir === "right") {
                    dispatch(showToast({ message: `Request sent to ${current.firstName}`, type: "success", duration: 2500 }));
                }
            } catch (err) {
                dispatch(showToast({ message: getErrorMessage(err, "Couldn't send your response"), type: "error" }));
            }
        },
        [current, exit, dispatch]
    );

    // Keyboard shortcuts
    useEffect(() => {
        if (!current) return;
        const onKey = (e) => {
            if (e.target.closest("input, textarea, select, [contenteditable]")) return;
            if (showModal && e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
            if (e.key === "ArrowLeft") handleSwipe("left");
            else if (e.key === "ArrowRight") handleSwipe("right");
            else if (e.key === " " || e.key.toLowerCase() === "i") {
                e.preventDefault();
                setShowModal(true);
            }
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [current, showModal, handleSwipe]);

    // Pointer drag
    const onPointerDown = (e) => {
        if (exit || e.button > 0) return;
        dragStart.current = { x: e.clientX, y: e.clientY, moved: false };
        e.currentTarget.setPointerCapture(e.pointerId);
        setDrag({ x: 0, y: 0, active: true });
    };
    const onPointerMove = (e) => {
        if (!dragStart.current) return;
        const x = e.clientX - dragStart.current.x;
        const y = e.clientY - dragStart.current.y;
        if (Math.abs(x) > 4 || Math.abs(y) > 4) dragStart.current.moved = true;
        setDrag({ x, y, active: true });
    };
    const onPointerUp = () => {
        if (!dragStart.current) return;
        const { moved } = dragStart.current;
        dragStart.current = null;
        if (drag.x > SWIPE_THRESHOLD) handleSwipe("right");
        else if (drag.x < -SWIPE_THRESHOLD) handleSwipe("left");
        else {
            setDrag({ x: 0, y: 0, active: false });
            if (!moved) setShowModal(true);
        }
    };

    if (!user) return <LandingPage />;

    const header = (
        <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold tracking-tight">Discover</h1>
            <p className="mt-1 text-sm text-muted-foreground">
                {feed?.length ? "Swipe right to connect, left to pass." : "Developers picked for you."}
            </p>
        </div>
    );

    if (loadError && !feed) {
        return (
            <div className="container max-w-lg py-8">
                {header}
                <EmptyState
                    icon={WifiOff}
                    title="Couldn't load your feed"
                    description={loadError}
                    action={<Button onClick={fetchFeed} loading={loading}><RotateCw /> Try again</Button>}
                />
            </div>
        );
    }

    if (!feed) {
        return (
            <div className="container py-8">
                {header}
                <FeedSkeleton />
            </div>
        );
    }

    if (feed.length === 0) {
        return (
            <div className="container max-w-lg py-8">
                {header}
                <EmptyState
                    icon={PartyPopper}
                    title="You're all caught up!"
                    description="You've seen everyone for now. Check back later, or polish your profile so others find you."
                    action={
                        <div className="flex flex-col gap-2 sm:flex-row">
                            <Button variant="outline" onClick={fetchFeed} loading={loading}><RotateCw /> Refresh</Button>
                            <Button asChild><Link to="/profile"><UserRound /> Edit profile</Link></Button>
                        </div>
                    }
                />
            </div>
        );
    }

    const next = feed[1];
    const third = feed[2];

    const rotation = exit ? (exit === "right" ? 18 : -18) : drag.x / 18;
    const translateX = exit ? (exit === "right" ? "140%" : "-140%") : `${drag.x}px`;
    const translateY = exit ? `${drag.y}px` : `${drag.y * 0.3}px`;
    const likeOpacity = exit === "right" ? 1 : Math.min(Math.max(drag.x / SWIPE_THRESHOLD, 0), 1);
    const passOpacity = exit === "left" ? 1 : Math.min(Math.max(-drag.x / SWIPE_THRESHOLD, 0), 1);
    const progress = Math.min(Math.abs(drag.x) / SWIPE_THRESHOLD, 1);

    return (
        <div className="container flex flex-col items-center py-6 sm:py-8">
            {header}

            <div className={cn("relative", CARD_SIZE)}>
                {third && (
                    <div className="absolute inset-0 translate-y-5 scale-[0.9] opacity-40 transition-transform duration-300" aria-hidden="true">
                        <UserCard user={third} />
                    </div>
                )}
                {next && (
                    <div
                        className="absolute inset-0 transition-transform duration-300"
                        style={{ transform: `translateY(${10 - progress * 10}px) scale(${0.95 + progress * 0.05})`, opacity: 0.7 + progress * 0.3 }}
                        aria-hidden="true"
                    >
                        <UserCard user={next} />
                    </div>
                )}

                <div
                    key={current._id}
                    className={cn(
                        "absolute inset-0 cursor-grab touch-none active:cursor-grabbing animate-in fade-in zoom-in-95 duration-300",
                        !drag.active || exit ? "transition-transform ease-out" : ""
                    )}
                    style={{
                        transform: `translate(${translateX}, ${translateY}) rotate(${rotation}deg)`,
                        transitionDuration: exit ? `${EXIT_MS}ms` : drag.active ? "0ms" : "250ms",
                    }}
                    onPointerDown={onPointerDown}
                    onPointerMove={onPointerMove}
                    onPointerUp={onPointerUp}
                    onPointerCancel={onPointerUp}
                    role="group"
                    aria-roledescription="profile card"
                    aria-label={`${current.firstName} ${current.lastName}`}
                >
                    <UserCard user={current}>
                        <span
                            className="pointer-events-none absolute left-6 top-8 -rotate-12 rounded-lg border-4 border-emerald-400 px-3 py-1 text-2xl font-extrabold tracking-widest text-emerald-400"
                            style={{ opacity: likeOpacity }}
                        >
                            CONNECT
                        </span>
                        <span
                            className="pointer-events-none absolute right-6 top-8 rotate-12 rounded-lg border-4 border-rose-500 px-3 py-1 text-2xl font-extrabold tracking-widest text-rose-500"
                            style={{ opacity: passOpacity }}
                        >
                            PASS
                        </span>
                    </UserCard>
                </div>
            </div>

            <div className="mt-8 flex items-center gap-5">
                <ActionButton onClick={() => handleSwipe("left")} label="Pass (←)" className="text-rose-500 hover:border-rose-500/40 hover:bg-rose-500/10" disabled={!!exit}>
                    <X className="h-7 w-7" strokeWidth={2.5} />
                </ActionButton>
                <ActionButton onClick={() => setShowModal(true)} label="View full profile (Space)" size="md" className="text-sky-500 hover:border-sky-500/40 hover:bg-sky-500/10">
                    <Info className="h-5 w-5" />
                </ActionButton>
                <ActionButton
                    onClick={() => handleSwipe("right")}
                    label="Connect (→)"
                    className="border-transparent bg-gradient-to-br from-rose-500 to-pink-600 text-white shadow-rose-500/30 hover:shadow-xl hover:shadow-rose-500/40"
                    disabled={!!exit}
                >
                    <Heart className="h-7 w-7" fill="currentColor" />
                </ActionButton>
            </div>

            <p className="mt-6 hidden items-center gap-2 text-xs text-muted-foreground md:flex">
                <Kbd>←</Kbd> pass <span className="mx-1 text-border">|</span> <Kbd>Space</Kbd> details <span className="mx-1 text-border">|</span> <Kbd>→</Kbd> connect
            </p>

            {showModal && (
                <UserDetailModal
                    user={current}
                    onClose={closeModal}
                    actions={{ onPass: () => handleSwipe("left"), onConnect: () => handleSwipe("right") }}
                />
            )}
        </div>
    );
};

export default Feed;
