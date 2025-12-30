import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../store/feedSlice";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Button } from "./ui/button";

const UserCard = ({ user }) => {
    const { _id, firstName, lastName, photoUrl, age, gender, about } = user;
    const dispatch = useDispatch();

    const handleSendRequest = async (status, userId) => {
        try {
            await axios.post(
                BASE_URL + "/request/send/" + status + "/" + userId,
                {},
                { withCredentials: true }
            );
            dispatch(removeUserFromFeed(userId));
        } catch (err) { }
    };

    return (
        <Card className="w-96 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-border/50 bg-card/80 backdrop-blur-sm">
            <div className="h-60 overflow-hidden relative group w-full">
                <img
                    src={user.photoUrl}
                    alt="photo"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <CardContent className="pt-6 relative">
                <h2 className="text-2xl font-bold text-foreground">
                    {firstName + " " + lastName}
                </h2>
                {age && gender && <p className="text-primary font-medium text-sm mt-1 uppercase tracking-wide">{age + ", " + gender}</p>}
                <p className="text-muted-foreground mt-4 leading-relaxed line-clamp-3">{about || "No bio available."}</p>
            </CardContent>
            <CardFooter className="justify-center gap-4 pb-6">
                <Button
                    variant="outline"
                    className="rounded-full px-8 border-primary/20 text-foreground hover:bg-primary/10 hover:text-primary"
                    onClick={() => handleSendRequest("ignored", _id)}
                >
                    Pass
                </Button>
                <Button
                    className="rounded-full px-8 shadow-md hover:shadow-lg bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
                    onClick={() => handleSendRequest("interested", _id)}
                >
                    Connect
                </Button>
            </CardFooter>
        </Card>
    );
};
export default UserCard;
