import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addConnections } from "../store/connectionSlice";
import { Link } from "react-router-dom";

const Connections = () => {
    const connections = useSelector((store) => store.connections);
    const dispatch = useDispatch();

    const fetchConnections = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/connections", {
                withCredentials: true,
            });
            dispatch(addConnections(res.data.data));
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchConnections();
    }, []);

    if (!connections) return null;

    if (connections.length === 0) {
        return (
            <div className="flex flex-col justify-center items-center my-10 animate-fade-in">
                <h1 className="font-bold text-2xl text-gray-400">No Connections Yet</h1>
                <p className="text-gray-600 mt-2">Start swiping to find your CodeMate!</p>
            </div>
        )
    }

    return (
        <div className="text-center my-10 max-w-7xl mx-auto animate-fade-in px-4">
            <h1 className="font-bold text-4xl mb-8 text-white tracking-tight">My Connections</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {connections.map((user) => {
                    const { _id, firstName, lastName, photoUrl, age, gender, about } = user;

                    return (
                        <div className="glass-card rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col" key={_id}>
                            <figure className="relative h-48">
                                <img src={photoUrl} alt="user" className="h-full w-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                                <h2 className="absolute bottom-3 left-4 font-bold text-xl text-white">{firstName} {lastName}</h2>
                            </figure>
                            <div className="p-4 text-left flex-grow">
                                <p className="text-gray-400 text-sm line-clamp-2 h-10">{about}</p>
                            </div>
                            <div className="p-4 pt-0 mt-auto">
                                <Link to={"/chat/" + _id}>
                                    <button className="btn btn-gradient btn-sm w-full rounded-full shadow-lg shadow-purple-500/20">Chat Now</button>
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
export default Connections;
