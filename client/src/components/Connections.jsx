import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addConnections } from "../store/connectionSlice";
import { Link } from "react-router-dom";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";

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
            <div className="flex flex-col justify-center items-center my-10 animate-in fade-in zoom-in-95">
                <h1 className="font-bold text-2xl text-primary">No Connections Yet</h1>
                <p className="text-muted-foreground mt-2">Start swiping to find your CodeMate!</p>
            </div>
        )
    }

    return (
        <div className="text-center my-10 max-w-7xl mx-auto px-4 pb-20 animate-in fade-in slide-in-from-bottom-4">
            <h1 className="font-bold text-4xl mb-8 text-foreground tracking-tight">My Connections</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {connections.map((user) => {
                    const { _id, firstName, lastName, photoUrl, age, gender, about } = user;

                    return (
                        <Card className="rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col border-border/50 bg-card/80 backdrop-blur-sm" key={_id}>
                            <div className="relative h-48 group w-full">
                                <img src={photoUrl} alt="user" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <h2 className="absolute bottom-3 left-4 font-bold text-xl text-white">{firstName} {lastName}</h2>
                            </div>
                            <CardContent className="p-4 text-left flex-grow flex flex-col pt-4">
                                <p className="text-muted-foreground text-sm line-clamp-2 h-10 mb-4">{about || "No bio available"}</p>
                                <div className="mt-auto">
                                    <Link to={"/chat/" + _id}>
                                        <Button className="w-full rounded-full shadow-sm bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity">Chat Now</Button>
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
};
export default Connections;
