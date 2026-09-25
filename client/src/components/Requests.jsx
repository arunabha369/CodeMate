import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Check, X, Inbox, Compass, WifiOff, RotateCw, BadgeCheck } from "lucide-react";
import { BASE_URL } from "../utils/constants";
import { addRequests, removeRequest } from "../store/requestSlice";
import { removeConnection } from "../store/connectionSlice";
import { showToast } from "../store/toastSlice";
import { Button } from "./ui/button";
import { Avatar } from "./ui/avatar";
import { Skeleton } from "./ui/skeleton";
import { EmptyState } from "./ui/empty-state";
import { PageHeader } from "./ui/page-header";
import UserDetailModal from "./UserDetailModal";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { fullName, capitalize, getErrorMessage } from "../lib/utils";

const RequestSkeleton = () => (
    <div className="flex flex-col gap-4 rounded-2xl border bg-card p-5 sm:flex-row sm:items-center">
        <Skeleton className="h-14 w-14 rounded-full" />
        <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-3 w-full max-w-md" />
        </div>
        <div className="flex gap-2">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-24" />
        </div>
    </div>
);

const RequestCard = ({ request, onReview, pending, onView }) => {
    const from = request.fromUserId;
    const { photoUrl, about, age, gender, skills = [], isLinkedInVerified } = from;
    const meta = [age, capitalize(gender)].filter(Boolean).join(" · ");

    return (
        <li className="flex flex-col gap-4 rounded-2xl border bg-card p-5 transition-all duration-200 hover:shadow-md sm:flex-row sm:items-center animate-in fade-in slide-in-from-bottom-2">
            <button onClick={() => onView(from)} className="flex min-w-0 flex-1 items-start gap-4 text-left" aria-label={`View ${fullName(from)}'s profile`}>
                <Avatar src={photoUrl} firstName={from.firstName} lastName={from.lastName} size="lg" />
                <div className="min-w-0 flex-1">
                    <p className="flex items-center gap-1.5 font-semibold hover:text-primary">
                        <span className="truncate">{fullName(from)}</span>
                        {isLinkedInVerified && <BadgeCheck className="h-4 w-4 shrink-0 text-sky-500" />}
                        {meta && <span className="shrink-0 text-sm font-normal text-muted-foreground">· {meta}</span>}
                    </p>
                    <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{about || "No bio yet."}</p>
                    {skills.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1.5">
                            {skills.slice(0, 4).map((s) => (
                                <span key={s} className="rounded-md border bg-muted/50 px-2 py-0.5 font-mono text-[11px]">{s}</span>
                            ))}
                        </div>
                    )}
                </div>
            </button>
            <div className="grid shrink-0 grid-cols-2 gap-2 sm:flex">
                <Button
                    variant="outline"
                    onClick={() => onReview("rejected", request)}
                    loading={pending === "rejected"}
                    disabled={!!pending}
                    className="hover:border-destructive/40 hover:bg-destructive/10 hover:text-destructive"
                >
                    {pending !== "rejected" && <X />} Decline
                </Button>
                <Button variant="gradient" onClick={() => onReview("accepted", request)} loading={pending === "accepted"} disabled={!!pending}>
                    {pending !== "accepted" && <Check />} Accept
                </Button>
            </div>
        </li>
    );
};

const Requests = () => {
    const requests = useSelector((store) => store.requests);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(!requests);
    const [error, setError] = useState(null);
    const [pending, setPending] = useState({});
    const [selected, setSelected] = useState(null);
    useDocumentTitle("Requests");

    const fetchRequests = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await axios.get(BASE_URL + "/user/requests/received", { withCredentials: true });
            dispatch(addRequests(res.data.data));
        } catch (err) {
            setError(getErrorMessage(err, "Couldn't load your requests."));
        } finally {
            setLoading(false);
        }
    }, [dispatch]);

    useEffect(() => {
        fetchRequests();
    }, [fetchRequests]);

    const reviewRequest = async (status, request) => {
        setPending((p) => ({ ...p, [request._id]: status }));
        try {
            await axios.post(`${BASE_URL}/request/review/${status}/${request._id}`, {}, { withCredentials: true });
            dispatch(removeRequest(request._id));
            if (status === "accepted") {
                dispatch(removeConnection()); // force a fresh connections list
                dispatch(showToast({
                    message: `You're now connected with ${request.fromUserId.firstName}`,
                    description: "Say hi from your Connections page.",
                    type: "success",
                }));
            } else {
                dispatch(showToast({ message: "Request declined", type: "info", duration: 2500 }));
            }
        } catch (err) {
            dispatch(showToast({ message: getErrorMessage(err, "Couldn't update the request"), type: "error" }));
        } finally {
            setPending((p) => {
                const next = { ...p };
                delete next[request._id];
                return next;
            });
        }
    };

    const list = (requests || []).filter((r) => r?.fromUserId);
    const closeModal = useCallback(() => setSelected(null), []);

    let content;
    if (loading && !requests) {
        content = <ul className="space-y-3">{Array.from({ length: 3 }).map((_, i) => <RequestSkeleton key={i} />)}</ul>;
    } else if (error && !requests) {
        content = (
            <EmptyState
                icon={WifiOff}
                title="Something went wrong"
                description={error}
                action={<Button onClick={fetchRequests}><RotateCw /> Try again</Button>}
            />
        );
    } else if (list.length === 0) {
        content = (
            <EmptyState
                icon={Inbox}
                title="No pending requests"
                description="When developers want to connect with you, their requests will appear here."
                action={<Button asChild variant="outline"><Link to="/"><Compass /> Discover developers</Link></Button>}
            />
        );
    } else {
        content = (
            <ul className="space-y-3">
                {list.map((r) => (
                    <RequestCard key={r._id} request={r} onReview={reviewRequest} pending={pending[r._id]} onView={setSelected} />
                ))}
            </ul>
        );
    }

    return (
        <div className="container max-w-4xl py-8">
            <PageHeader
                title="Requests"
                description={list.length ? `${list.length} developer${list.length === 1 ? "" : "s"} want${list.length === 1 ? "s" : ""} to connect with you` : "Incoming connection requests"}
            />
            {content}
            {selected && <UserDetailModal user={selected} onClose={closeModal} />}
        </div>
    );
};
export default Requests;
