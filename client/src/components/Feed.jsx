import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../store/feedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";
import { Loader2 } from "lucide-react";

const Feed = () => {
    const feed = useSelector((store) => store.feed);
    const dispatch = useDispatch();

    const getFeed = async () => {
        if (feed) return;
        try {
            const res = await axios.get(BASE_URL + "/feed", {
                withCredentials: true,
            });
            dispatch(addFeed(res?.data));
        } catch (err) {
            //TODO: handle error
        }
    };

    useEffect(() => {
        getFeed();
    }, []);

    if (!feed) return <div className="flex justify-center mt-20"><Loader2 className="h-10 w-10 animate-spin text-primary" /></div>;

    if (feed.length <= 0)
        return (
            <div className="flex flex-col items-center justify-center my-20 text-center animate-in fade-in zoom-in-95">
                <div className="text-6xl mb-4">🎉</div>
                <h1 className="text-2xl font-bold text-foreground">Youre all caught up!</h1>
                <p className="text-muted-foreground mt-2">No new users found at the moment.</p>
            </div>
        );

    return (
        feed && (
            <div className="flex justify-center my-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <UserCard user={feed[0]} />
            </div>
        )
    );
};
export default Feed;
