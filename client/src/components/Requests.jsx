import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addRequests, removeRequest } from "../store/requestSlice";
import { showToast } from "../store/toastSlice";
import { Button } from "./ui/button";
import { User, Check, X } from "lucide-react";
import LandingPage from "./LandingPage";

const Requests = () => {
    const requests = useSelector((store) => store.requests);
    const user = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    const reviewRequest = async (status, _id) => {
        try {
            await axios.post(
                BASE_URL + "/request/review/" + status + "/" + _id,
                {},
                { withCredentials: true }
            );
            dispatch(removeRequest(_id));
            if (status === "accepted") {
                dispatch(showToast({ message: "Connection request accepted!", type: "success" }));
            } else {
                dispatch(showToast({ message: "Connection request rejected", type: "info" }));
            }
        } catch (err) {
            console.log(err);
            dispatch(showToast({ message: "Action failed", type: "error" }));
        }
    };

    const fetchRequests = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/requests/received", {
                withCredentials: true,
            });
            dispatch(addRequests(res.data.data));
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user) fetchRequests();
    }, [user]);

    if (!user) return <LandingPage />;

    if (loading) return <div className="text-center mt-20">Loading...</div>;

    if (!requests || requests.length === 0) {
        return (
            <div className="flex flex-col justify-center items-center my-20 animate-in fade-in zoom-in-95">
                <div className="bg-stone-900 p-4 rounded-full mb-4">
                    <User className="w-12 h-12 text-stone-700" />
                </div>
                <h1 className="font-bold text-2xl text-foreground">No Pending Requests</h1>
                <p className="text-muted-foreground mt-2">Check back later for new connections!</p>
            </div>
        )
    }

    return (
        <div className="mx-auto max-w-4xl py-6 animate-in fade-in slide-in-from-bottom-4 pb-20">
            <h1 className="font-bold text-3xl mb-6 px-4 text-foreground tracking-tight">Connection Requests <span className="text-primary text-2xl ml-2">{requests.length}</span></h1>

            <div className="bg-stone-950/50 backdrop-blur-sm rounded-xl overflow-hidden border border-stone-800 shadow-sm mx-4 md:mx-0">
                {requests.map((request, index) => {
                    const { _id, firstName, lastName, photoUrl, about, age, gender } = request.fromUserId;

                    return (
                        <div
                            key={request._id}
                            className={`flex flex-col sm:flex-row items-center gap-4 p-4 hover:bg-stone-900/50 transition-colors cursor-default group ${index !== requests.length - 1 ? "border-b border-stone-800" : ""
                                }`}
                        >
                            {/* Avatar */}
                            <div className="relative shrink-0 w-full sm:w-auto flex justify-center sm:block">
                                <div className="h-16 w-16 rounded-full overflow-hidden ring-2 ring-stone-800 group-hover:ring-primary/20 transition-all">
                                    <img
                                        src={photoUrl}
                                        alt={firstName}
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0 text-center sm:text-left w-full">
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
                                    <h2 className="font-semibold text-lg text-foreground truncate">
                                        {firstName} {lastName}
                                    </h2>
                                    {age && (
                                        <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                                            {age} • {gender}
                                        </span>
                                    )}
                                </div>
                                <p className="text-sm text-stone-400 line-clamp-2 sm:line-clamp-1">
                                    {about || "No bio available."}
                                </p>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-2 w-full sm:w-auto shrink-0">
                                <Button
                                    variant="outline"
                                    className="flex-1 sm:flex-none rounded-full border-red-900/30 bg-red-950/10 text-red-500 hover:bg-red-950/30 hover:text-red-400 hover:border-red-800"
                                    onClick={() => reviewRequest("rejected", request._id)}
                                >
                                    <X className="w-4 h-4 mr-1" />
                                    Reject
                                </Button>
                                <Button
                                    className="flex-1 sm:flex-none rounded-full shadow-md bg-gradient-to-r from-primary to-rose-600 hover:opacity-90 transition-opacity"
                                    onClick={() => reviewRequest("accepted", request._id)}
                                >
                                    <Check className="w-4 h-4 mr-1" />
                                    Accept
                                </Button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
export default Requests;
