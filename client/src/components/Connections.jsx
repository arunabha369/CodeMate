import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addConnections } from "../store/connectionSlice";
import { Link } from "react-router-dom";
import { Loader2, MessageCircle } from "lucide-react";

const Connections = () => {
    const connections = useSelector((store) => store.connections);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    const fetchConnections = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/connections", {
                withCredentials: true,
            });
            dispatch(addConnections(res.data.data));
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchConnections();
    }, []);

    if (loading) return <div className="flex justify-center mt-20"><Loader2 className="h-10 w-10 animate-spin text-primary" /></div>;

    if (!connections || connections.length === 0) {
        return (
            <div className="flex flex-col justify-center items-center my-20 animate-in fade-in zoom-in-95">
                <div className="bg-stone-900 p-4 rounded-full mb-4">
                    <MessageCircle className="w-12 h-12 text-stone-700" />
                </div>
                <h1 className="font-bold text-2xl text-primary">No Connections Yet</h1>
                <p className="text-muted-foreground mt-2">Start swiping to find your CodeMate!</p>
            </div>
        )
    }

    return (
        <div className="mx-auto max-w-4xl py-6 animate-in fade-in slide-in-from-bottom-4 pb-20">
            <h1 className="font-bold text-3xl mb-6 px-4 text-foreground tracking-tight">Messages</h1>

            <div className="bg-stone-950/50 backdrop-blur-sm rounded-xl overflow-hidden border border-stone-800 shadow-sm mx-4 md:mx-0">
                {connections.map((user, index) => {
                    const { _id, firstName, lastName, photoUrl, about } = user;

                    // Mock data for WhatsApp-like feel
                    const lastMessage = "Hey! Let's code something awesome.";
                    const timestamp = "10:30 AM";

                    return (
                        <Link
                            to={"/chat/" + _id}
                            key={_id}
                            className={`flex items-center gap-4 p-4 hover:bg-stone-900/50 transition-colors cursor-pointer group ${index !== connections.length - 1 ? "border-b border-stone-800" : ""
                                }`}
                        >
                            {/* Avatar */}
                            <div className="relative shrink-0">
                                <div className="h-14 w-14 rounded-full overflow-hidden ring-2 ring-transparent group-hover:ring-primary/20 transition-all">
                                    <img
                                        src={photoUrl}
                                        alt={firstName}
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                                {/* Online Status Indicator (Mock) */}
                                <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full bg-green-500 border-2 border-stone-950"></span>
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-baseline mb-1">
                                    <h2 className="font-semibold text-lg text-foreground truncate max-w-[70%]">
                                        {firstName} {lastName}
                                    </h2>
                                    <span className="text-xs text-muted-foreground font-medium whitespace-nowrap">
                                        {timestamp}
                                    </span>
                                </div>
                                <p className="text-sm text-stone-400 line-clamp-1 group-hover:text-stone-300 transition-colors">
                                    <span className="text-primary mr-1">✓✓</span>
                                    {about ? about.substring(0, 40) + "..." : lastMessage}
                                </p>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default Connections;
