import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { ArrowLeft, Info, SendHorizontal, UserX, Hand } from "lucide-react";
import { createSocketConnection } from "../utils/socket";
import { BASE_URL } from "../utils/constants";
import { Avatar } from "./ui/avatar";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import { EmptyState } from "./ui/empty-state";
import UserDetailModal from "./UserDetailModal";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { cn, fullName, formatTime } from "../lib/utils";

const GROUP_WINDOW_MS = 5 * 60 * 1000;

const ChatRoom = ({ targetUserId }) => {
    const user = useSelector((store) => store.user);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [targetUser, setTargetUser] = useState(null);
    const [targetError, setTargetError] = useState(false);
    const [connected, setConnected] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const socketRef = useRef();
    const scrollRef = useRef(null);
    const inputRef = useRef(null);
    useDocumentTitle(targetUser ? `Chat with ${targetUser.firstName}` : "Chat");

    useEffect(() => {
        const el = scrollRef.current;
        if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
    }, [messages]);

    useEffect(() => {
        let cancelled = false;
        axios
            .get(`${BASE_URL}/user/${targetUserId}`, { withCredentials: true })
            .then((res) => !cancelled && setTargetUser(res.data))
            .catch(() => !cancelled && setTargetError(true));
        return () => {
            cancelled = true;
        };
    }, [targetUserId]);

    useEffect(() => {
        if (!user) return;

        const socket = createSocketConnection();
        socketRef.current = socket;

        socket.on("connect", () => {
            setConnected(true);
            socket.emit("joinChat", { userId: user._id });
        });
        socket.on("disconnect", () => setConnected(false));

        socket.on("messageReceived", ({ senderId, text, timestamp }) => {
            // Only show messages that belong to this conversation.
            if (senderId !== targetUserId && senderId !== user._id) return;
            setMessages((prev) => [
                ...prev,
                { id: `${Date.now()}-${Math.random()}`, text, sender: senderId === user._id ? "me" : "other", timestamp: timestamp || new Date() },
            ]);
        });

        return () => {
            socket.disconnect();
        };
    }, [user, targetUserId]);

    // Auto-grow the composer.
    useLayoutEffect(() => {
        const el = inputRef.current;
        if (!el) return;
        el.style.height = "auto";
        el.style.height = Math.min(el.scrollHeight, 160) + "px";
    }, [newMessage]);

    const handleSendMessage = (e) => {
        e?.preventDefault();
        const text = newMessage.trim();
        if (!text || !socketRef.current) return;

        socketRef.current.emit("sendMessage", {
            senderId: user._id,
            receiverId: targetUserId,
            text,
        });

        setMessages((prev) => [...prev, { id: `${Date.now()}-me`, text, sender: "me", timestamp: new Date() }]);
        setNewMessage("");
        inputRef.current?.focus();
    };

    const onKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) handleSendMessage(e);
    };

    const closeProfile = useCallback(() => setShowProfile(false), []);

    if (!user) return null;

    if (targetError) {
        return (
            <div className="container max-w-lg py-16">
                <EmptyState
                    icon={UserX}
                    title="Conversation unavailable"
                    description="We couldn't find this developer. They may have deleted their account."
                    action={<Button asChild variant="outline"><Link to="/connections"><ArrowLeft /> Back to connections</Link></Button>}
                />
            </div>
        );
    }

    return (
        <div className="container max-w-4xl px-0 sm:px-4 sm:py-4">
            <div className="flex h-[calc(100dvh-4rem)] flex-col overflow-hidden border-x bg-card sm:h-[calc(100dvh-6rem)] sm:rounded-2xl sm:border sm:shadow-sm">
                {/* Header */}
                <div className="flex items-center gap-3 border-b bg-background/60 px-3 py-3 backdrop-blur sm:px-4">
                    <Button asChild variant="ghost" size="icon-sm" aria-label="Back to connections">
                        <Link to="/connections"><ArrowLeft /></Link>
                    </Button>
                    {targetUser ? (
                        <button onClick={() => setShowProfile(true)} className="flex min-w-0 flex-1 items-center gap-3 rounded-lg text-left">
                            <Avatar src={targetUser.photoUrl} firstName={targetUser.firstName} lastName={targetUser.lastName} size="sm" />
                            <div className="min-w-0">
                                <h1 className="truncate font-semibold leading-tight">{fullName(targetUser)}</h1>
                                <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                    <span className={cn("h-1.5 w-1.5 rounded-full", connected ? "bg-emerald-500" : "bg-amber-500 animate-pulse")} />
                                    {connected ? "Live" : "Connecting…"}
                                </p>
                            </div>
                        </button>
                    ) : (
                        <div className="flex flex-1 items-center gap-3">
                            <Skeleton className="h-9 w-9 rounded-full" />
                            <div className="space-y-1.5">
                                <Skeleton className="h-4 w-28" />
                                <Skeleton className="h-3 w-14" />
                            </div>
                        </div>
                    )}
                    <Button variant="ghost" size="icon-sm" onClick={() => setShowProfile(true)} disabled={!targetUser} aria-label="View profile">
                        <Info />
                    </Button>
                </div>

                {/* Messages */}
                <div ref={scrollRef} className="flex-1 overflow-y-auto bg-surface px-3 py-4 sm:px-6" aria-live="polite">
                    {messages.length === 0 ? (
                        <div className="flex h-full flex-col items-center justify-center text-center">
                            {targetUser && (
                                <Avatar src={targetUser.photoUrl} firstName={targetUser.firstName} lastName={targetUser.lastName} size="xl" className="mb-4" />
                            )}
                            <p className="font-semibold">{targetUser ? `You and ${targetUser.firstName} are connected` : "Loading…"}</p>
                            <p className="mt-1 max-w-xs text-sm text-muted-foreground">
                                Messages are delivered live while you're both online. Say hello!
                            </p>
                            <div className="mt-5 flex flex-wrap justify-center gap-2">
                                {["👋 Hey there!", "What are you building?", "Up for a hackathon?"].map((s) => (
                                    <button
                                        key={s}
                                        onClick={() => {
                                            setNewMessage(s);
                                            inputRef.current?.focus();
                                        }}
                                        className="rounded-full border bg-background px-3 py-1.5 text-sm transition-colors hover:border-primary/40 hover:text-primary"
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <ol className="flex flex-col gap-0.5">
                            <li className="mb-3 text-center">
                                <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 text-[11px] font-medium text-muted-foreground">
                                    <Hand className="h-3 w-3" /> Today
                                </span>
                            </li>
                            {messages.map((msg, i) => {
                                const prev = messages[i - 1];
                                const nextMsg = messages[i + 1];
                                const mine = msg.sender === "me";
                                const startsGroup = !prev || prev.sender !== msg.sender || new Date(msg.timestamp) - new Date(prev.timestamp) > GROUP_WINDOW_MS;
                                const endsGroup = !nextMsg || nextMsg.sender !== msg.sender || new Date(nextMsg.timestamp) - new Date(msg.timestamp) > GROUP_WINDOW_MS;
                                return (
                                    <li key={msg.id} className={cn("flex animate-in fade-in slide-in-from-bottom-1 duration-200", mine ? "justify-end" : "justify-start", startsGroup && i > 0 && "mt-3")}>
                                        <div className={cn("flex max-w-[80%] flex-col sm:max-w-[65%]", mine ? "items-end" : "items-start")}>
                                            <div
                                                className={cn(
                                                    "whitespace-pre-wrap break-words px-3.5 py-2 text-[15px] leading-snug shadow-sm",
                                                    mine
                                                        ? "rounded-2xl bg-primary text-primary-foreground"
                                                        : "rounded-2xl border bg-background text-foreground",
                                                    mine && endsGroup && "rounded-br-md",
                                                    !mine && endsGroup && "rounded-bl-md"
                                                )}
                                            >
                                                {msg.text}
                                            </div>
                                            {endsGroup && (
                                                <span className="mt-1 px-1 text-[11px] text-muted-foreground">{formatTime(msg.timestamp)}</span>
                                            )}
                                        </div>
                                    </li>
                                );
                            })}
                        </ol>
                    )}
                </div>

                {/* Composer */}
                <form onSubmit={handleSendMessage} className="border-t bg-background/60 p-3 backdrop-blur pb-[max(0.75rem,env(safe-area-inset-bottom))]">
                    <div className="flex items-end gap-2 rounded-2xl border bg-background p-1.5 pl-4 shadow-sm transition-colors focus-within:border-primary/50 focus-within:ring-4 focus-within:ring-primary/10">
                        <textarea
                            ref={inputRef}
                            rows={1}
                            className="max-h-40 flex-1 resize-none bg-transparent py-2 text-[15px] placeholder:text-muted-foreground focus:outline-none"
                            placeholder={targetUser ? `Message ${targetUser.firstName}…` : "Type a message…"}
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyDown={onKeyDown}
                            aria-label="Message"
                        />
                        <Button type="submit" size="icon" className="shrink-0 rounded-xl" disabled={!newMessage.trim()} aria-label="Send message">
                            <SendHorizontal />
                        </Button>
                    </div>
                    <p className="mt-1.5 hidden px-1 text-[11px] text-muted-foreground sm:block">
                        <kbd className="font-sans font-medium">Enter</kbd> to send · <kbd className="font-sans font-medium">Shift + Enter</kbd> for a new line
                    </p>
                </form>
            </div>

            {showProfile && targetUser && <UserDetailModal user={targetUser} onClose={closeProfile} />}
        </div>
    );
};

// Keyed by the other user's id so switching conversations starts from a clean state.
const Chat = () => {
    const { targetUserId } = useParams();
    return <ChatRoom key={targetUserId} targetUserId={targetUserId} />;
};

export default Chat;
