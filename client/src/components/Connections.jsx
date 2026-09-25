import { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MessageCircle, Search, Users, Compass, WifiOff, RotateCw, BadgeCheck } from "lucide-react";
import { BASE_URL } from "../utils/constants";
import { addConnections } from "../store/connectionSlice";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Avatar } from "./ui/avatar";
import { Skeleton } from "./ui/skeleton";
import { EmptyState } from "./ui/empty-state";
import { PageHeader } from "./ui/page-header";
import UserDetailModal from "./UserDetailModal";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { fullName, capitalize, getErrorMessage } from "../lib/utils";

const ConnectionSkeleton = () => (
    <div className="rounded-2xl border bg-card p-5">
        <div className="flex items-center gap-3">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-20" />
            </div>
        </div>
        <Skeleton className="mt-4 h-3 w-full" />
        <Skeleton className="mt-2 h-3 w-2/3" />
        <Skeleton className="mt-5 h-9 w-full" />
    </div>
);

const ConnectionCard = ({ user, onView }) => {
    const { _id, photoUrl, about, skills = [], age, gender, isLinkedInVerified } = user;
    const meta = [age, capitalize(gender)].filter(Boolean).join(" · ");

    return (
        <li className="group flex flex-col rounded-2xl border bg-card p-5 transition-all duration-200 hover:border-primary/30 hover:shadow-md">
            <button onClick={() => onView(user)} className="flex items-center gap-3 text-left" aria-label={`View ${fullName(user)}'s profile`}>
                <Avatar src={photoUrl} firstName={user.firstName} lastName={user.lastName} size="lg" />
                <div className="min-w-0">
                    <p className="flex items-center gap-1.5 truncate font-semibold group-hover:text-primary">
                        {fullName(user)}
                        {isLinkedInVerified && <BadgeCheck className="h-4 w-4 shrink-0 text-sky-500" />}
                    </p>
                    {meta && <p className="text-sm text-muted-foreground">{meta}</p>}
                </div>
            </button>
            <p className="mt-4 line-clamp-2 min-h-[2.5rem] text-sm text-muted-foreground">{about || "No bio yet."}</p>
            {skills.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                    {skills.slice(0, 3).map((s) => (
                        <span key={s} className="rounded-md border bg-muted/50 px-2 py-0.5 font-mono text-[11px]">{s}</span>
                    ))}
                    {skills.length > 3 && <span className="px-1 py-0.5 text-[11px] text-muted-foreground">+{skills.length - 3}</span>}
                </div>
            )}
            <div className="mt-auto pt-5">
                <Button asChild className="w-full">
                    <Link to={"/chat/" + _id}>
                        <MessageCircle /> Message
                    </Link>
                </Button>
            </div>
        </li>
    );
};

const Connections = () => {
    const connections = useSelector((store) => store.connections);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [query, setQuery] = useState("");
    const [selected, setSelected] = useState(null);
    useDocumentTitle("Connections");

    const fetchConnections = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await axios.get(BASE_URL + "/user/connections", { withCredentials: true });
            dispatch(addConnections(res.data.data));
        } catch (err) {
            setError(getErrorMessage(err, "Couldn't load your connections."));
        } finally {
            setLoading(false);
        }
    }, [dispatch]);

    useEffect(() => {
        fetchConnections();
    }, [fetchConnections]);

    const filtered = useMemo(() => {
        const list = (connections || []).filter(Boolean);
        const q = query.trim().toLowerCase();
        if (!q) return list;
        return list.filter((c) =>
            fullName(c).toLowerCase().includes(q) || (c.skills || []).some((s) => s.toLowerCase().includes(q))
        );
    }, [connections, query]);

    const count = connections?.length || 0;
    const closeModal = useCallback(() => setSelected(null), []);

    let content;
    if (loading && !connections) {
        content = (
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => <ConnectionSkeleton key={i} />)}
            </ul>
        );
    } else if (error && !connections) {
        content = (
            <EmptyState
                icon={WifiOff}
                title="Something went wrong"
                description={error}
                action={<Button onClick={fetchConnections}><RotateCw /> Try again</Button>}
            />
        );
    } else if (count === 0) {
        content = (
            <EmptyState
                icon={Users}
                title="No connections yet"
                description="When someone accepts your request — or you accept theirs — they'll show up here."
                action={<Button asChild variant="gradient"><Link to="/"><Compass /> Start discovering</Link></Button>}
            />
        );
    } else if (filtered.length === 0) {
        content = (
            <EmptyState
                icon={Search}
                title="No matches"
                description={`No connections match "${query}".`}
                action={<Button variant="outline" onClick={() => setQuery("")}>Clear search</Button>}
            />
        );
    } else {
        content = (
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 animate-in fade-in duration-300">
                {filtered.map((c) => <ConnectionCard key={c._id} user={c} onView={setSelected} />)}
            </ul>
        );
    }

    return (
        <div className="container py-8">
            <PageHeader
                title="Connections"
                description={count ? `${count} developer${count === 1 ? "" : "s"} in your network` : "Your developer network"}
            >
                {count > 0 && (
                    <div className="w-full sm:w-72">
                        <Input
                            icon={Search}
                            type="search"
                            placeholder="Search by name or skill"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            aria-label="Search connections"
                        />
                    </div>
                )}
            </PageHeader>
            {content}
            {selected && <UserDetailModal user={selected} onClose={closeModal} />}
        </div>
    );
};

export default Connections;
