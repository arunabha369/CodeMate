import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addRequests, removeRequest } from "../store/requestSlice";
import { showToast } from "../store/toastSlice";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Check, X, User } from "lucide-react";
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
        <div className="container mx-auto px-4 py-8 animate-in fade-in slide-in-from-bottom-4 pb-20 max-w-6xl">
            <h1 className="font-bold text-3xl md:text-4xl mb-8 text-foreground tracking-tight text-center md:text-left">
                Connection Requests <span className="text-primary text-2xl align-top ml-1">{requests.length}</span>
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {requests.map((request) => {
                    const { _id, firstName, lastName, photoUrl, age, gender, about } = request.fromUserId;

                    return (
                        <Card
                            key={request._id}
                            className="overflow-hidden border-stone-800 bg-stone-950/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 group"
                        >
                            <div className="relative h-48 w-full overflow-hidden">
                                <img
                                    src={photoUrl}
                                    alt="photo"
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                                <div className="absolute bottom-3 left-4 text-white">
                                    <h2 className="font-bold text-2xl leading-none">
                                        {firstName} {lastName}
                                    </h2>
                                    {age && (
                                        <p className="text-sm text-stone-300 font-medium uppercase tracking-wide mt-1">
                                            {age} • {gender}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="p-4 space-y-4">
                                <p className="text-sm text-muted-foreground line-clamp-2 h-10">
                                    {about || "No bio available."}
                                </p>

                                <div className="grid grid-cols-2 gap-3 pt-2">
                                    <Button
                                        variant="outline"
                                        className="w-full rounded-xl border-red-900/50 bg-red-950/10 text-red-500 hover:bg-red-950/30 hover:text-red-400 hover:border-red-800 transition-colors h-12"
                                        onClick={() => reviewRequest("rejected", request._id)}
                                    >
                                        <X className="w-5 h-5 mr-2" />
                                        Reject
                                    </Button>
                                    <Button
                                        className="w-full rounded-xl shadow-md bg-gradient-to-r from-primary to-rose-600 hover:opacity-90 transition-opacity h-12 font-semibold"
                                        onClick={() => reviewRequest("accepted", request._id)}
                                    >
                                        <Check className="w-5 h-5 mr-2" />
                                        Accept
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
};
export default Requests;
