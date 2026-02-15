import { Card, CardContent } from "./ui/card";

const UserCard = ({ user }) => {
    const { firstName, lastName, photoUrl, age, gender, about } = user;

    return (
        <Card className="w-96 overflow-hidden hover:shadow-xl transition-all duration-300 border-border/50 bg-card/80 backdrop-blur-sm h-full flex flex-col">
            <div className="h-3/5 overflow-hidden relative group w-full">
                <img
                    src={user.photoUrl}
                    alt="photo"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>

                <div className="absolute bottom-4 left-4 right-4">
                    <h2 className="text-2xl font-bold text-white drop-shadow-md">
                        {firstName + " " + lastName}
                    </h2>
                    {age && gender && <p className="text-white/90 font-medium text-sm mt-1 uppercase tracking-wide drop-shadow-md">{age + ", " + gender}</p>}
                </div>
            </div>
            <CardContent className="pt-6 relative flex-1">
                <p className="text-muted-foreground leading-relaxed line-clamp-4">{about || "No bio available."}</p>
            </CardContent>
        </Card>
    );
};
export default UserCard;
