import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed, removeUserFromFeed } from "../store/feedSlice";
import { useEffect, useState } from "react";
import UserCard from "./UserCard";
import { Loader2, Heart, X, RotateCcw, Star, Zap } from "lucide-react";
import LandingPage from "./LandingPage";

const Feed = () => {
    const feed = useSelector((store) => store.feed);
    const user = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const [direction, setDirection] = useState(null); // 'left' or 'right'

    const getFeed = async () => {
        if (feed) return;
        try {
            const res = await axios.get(BASE_URL + "/feed", {
                withCredentials: true,
            });
            dispatch(addFeed(res?.data));
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        if (user) {
            getFeed();
        }
    }, [user]);

    // Handle Swipe (via buttons)
    const handleSwipe = async (dir) => {
        if (!feed || feed.length === 0) return;

        const currentUser = feed[0];
        setDirection(dir);

        // API Call logic
        const status = dir === "right" ? "interested" : "ignored";
        try {
            await axios.post(
                BASE_URL + "/request/send/" + status + "/" + currentUser._id,
                {},
                { withCredentials: true }
            );

            // Wait for animation to finish before removing from feed
            setTimeout(() => {
                dispatch(removeUserFromFeed(currentUser._id));
                setDirection(null);
            }, 300); // 300ms matches the transition duration

        } catch (err) {
            console.error("Error sending request:", err);
            setDirection(null);
        }
    };

    if (!user) return <LandingPage />;

    if (!feed) return <div className="flex justify-center mt-20"><Loader2 className="h-10 w-10 animate-spin text-primary" /></div>;

    if (feed.length <= 0)
        return (
            <div className="flex flex-col items-center justify-center my-20 text-center animate-in fade-in zoom-in-95">
                <div className="text-6xl mb-4">🎉</div>
                <h1 className="text-2xl font-bold text-foreground">Youre all caught up!</h1>
                <p className="text-muted-foreground mt-2">No new users found at the moment.</p>
            </div>
        );

    // Dynamic classes for animation
    const cardClass = direction === 'left'
        ? '-translate-x-[150%] -rotate-12 opacity-0'
        : direction === 'right'
            ? 'translate-x-[150%] rotate-12 opacity-0'
            : '';

    return (
        <div className="flex flex-col items-center justify-center h-[calc(100vh-6rem)] overflow-hidden relative">
            <div className="relative w-full max-w-sm h-[600px]">
                {/* Render current user card with transition classes */}
                <div className={`transition-all duration-300 ease-out transform ${cardClass}`}>
                    <UserCard user={feed[0]} />
                </div>

                {/* Render next card below for stacking effect (optional, static) */}
                {feed.length > 1 && (
                    <div className="absolute inset-0 -z-10 scale-95 opacity-50 translate-y-2 pointer-events-none">
                        <UserCard user={feed[1]} />
                    </div>
                )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-8 z-10">
                <button className="p-4 rounded-full bg-stone-900 border border-stone-800 text-yellow-500 hover:scale-110 transition-transform shadow-lg">
                    <RotateCcw className="w-6 h-6" />
                </button>
                <button
                    onClick={() => handleSwipe('left')}
                    className="p-4 rounded-full bg-stone-900 border border-stone-800 text-red-500 hover:scale-110 transition-transform shadow-lg"
                >
                    <X className="w-8 h-8" />
                </button>
                <button className="p-4 rounded-full bg-stone-900 border border-stone-800 text-blue-500 hover:scale-110 transition-transform shadow-lg">
                    <Star className="w-6 h-6" />
                </button>
                <button
                    onClick={() => handleSwipe('right')}
                    className="p-4 rounded-full bg-stone-900 border border-stone-800 text-green-500 hover:scale-110 transition-transform shadow-lg"
                >
                    <Heart className="w-8 h-8" fill="currentColor" />
                </button>
                <button className="p-4 rounded-full bg-stone-900 border border-stone-800 text-purple-500 hover:scale-110 transition-transform shadow-lg">
                    <Zap className="w-6 h-6" />
                </button>
            </div>
        </div>
    );
};

export default Feed;
