import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addRequests, removeRequest } from "../store/requestSlice";
import { showToast } from "../store/toastSlice";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";

const Requests = () => {
    const requests = useSelector((store) => store.requests);
    const dispatch = useDispatch();

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
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    if (!requests) return null;

    if (requests.length === 0) {
        return (
            <div className="flex flex-col justify-center items-center my-10 animate-in fade-in zoom-in-95">
                <h1 className="font-bold text-2xl text-primary">No Pending Requests</h1>
                <p className="text-muted-foreground mt-2">Check back later for new connections!</p>
            </div>
        )
    }

    return (
        <div className="text-center my-10 sm:w-8/12 mx-auto animate-in fade-in slide-in-from-bottom-4 pb-20">
            <h1 className="font-bold text-4xl mb-8 text-foreground tracking-tight">Connection Requests</h1>
            <div className="space-y-4">
                {requests.map((request) => {
                    const { _id, firstName, lastName, photoUrl, age, gender, about } =
                        request.fromUserId;

                    return (
                        <Card
                            key={request._id}
                            className="flex flex-col sm:flex-row justify-between items-center p-6 border-border/50 bg-card/80 backdrop-blur-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1"
                        >
                            <div className="flex items-center gap-4 w-full sm:w-auto">
                                <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full ring-2 ring-primary ring-offset-2">
                                    <img src={photoUrl} alt="photo" className="h-full w-full object-cover" />
                                </div>
                                <div className="text-left">
                                    <h2 className="font-bold text-2xl text-foreground">
                                        {firstName} {lastName}
                                    </h2>
                                    {age && <p className="text-sm text-primary font-medium uppercase tracking-wide">{age} • {gender}</p>}
                                    <p className="text-sm text-muted-foreground mt-1 line-clamp-1 max-w-xs">{about}</p>
                                </div>
                            </div>
                            <div className="flex gap-3 mt-4 sm:mt-0 w-full sm:w-auto justify-end">
                                <Button
                                    variant="outline"
                                    className="rounded-full px-6 border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive"
                                    onClick={() => reviewRequest("rejected", request._id)}
                                >
                                    Reject
                                </Button>
                                <Button
                                    className="rounded-full px-6 shadow-md bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                                    onClick={() => reviewRequest("accepted", request._id)}
                                >
                                    Accept
                                </Button>
                            </div>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
};
export default Requests;
