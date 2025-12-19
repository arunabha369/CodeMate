import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addRequests, removeRequest } from "../store/requestSlice";
import { showToast } from "../store/toastSlice";

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
            <div className="flex flex-col justify-center items-center my-10 animate-fade-in">
                <h1 className="font-bold text-2xl text-gray-400">No Pending Requests</h1>
                <p className="text-gray-600 mt-2">Check back later for new connections!</p>
            </div>
        )
    }

    return (
        <div className="text-center my-10 sm:w-8/12 mx-auto animate-fade-in">
            <h1 className="font-bold text-4xl mb-8 text-white tracking-tight">Connection Requests</h1>
            <div className="space-y-4">
                {requests.map((request) => {
                    const { _id, firstName, lastName, photoUrl, age, gender, about } =
                        request.fromUserId;

                    return (
                        <div
                            key={request._id}
                            className="flex flex-col sm:flex-row justify-between items-center p-6 rounded-2xl glass-card border border-white/10 hover:border-brand-pink/30 transition-all duration-300 transform hover:-translate-y-1"
                        >
                            <div className="flex items-center gap-4 w-full sm:w-auto">
                                <div className="avatar">
                                    <div className="w-16 h-16 rounded-full ring ring-brand-purple ring-offset-base-100 ring-offset-2">
                                        <img src={photoUrl} alt="photo" />
                                    </div>
                                </div>
                                <div className="text-left">
                                    <h2 className="font-bold text-2xl text-white">
                                        {firstName} {lastName}
                                    </h2>
                                    {age && <p className="text-sm text-gray-400 font-medium">{age} • {gender}</p>}
                                    <p className="text-sm text-gray-500 mt-1 line-clamp-1 max-w-xs">{about}</p>
                                </div>
                            </div>
                            <div className="flex gap-3 mt-4 sm:mt-0 w-full sm:w-auto justify-end">
                                <button
                                    className="btn btn-outline btn-error btn-sm sm:btn-md rounded-full px-6 hover:shadow-lg hover:shadow-red-500/20"
                                    onClick={() => reviewRequest("rejected", request._id)}
                                >
                                    Reject
                                </button>
                                <button
                                    className="btn btn-gradient btn-sm sm:btn-md rounded-full px-6 shadow-lg shadow-purple-500/20"
                                    onClick={() => reviewRequest("accepted", request._id)}
                                >
                                    Accept
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
export default Requests;
