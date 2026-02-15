import { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { createSocketConnection } from "../utils/socket";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Chat = () => {
    const { targetUserId } = useParams();
    const user = useSelector((store) => store.user);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [targetUser, setTargetUser] = useState(null);
    const socketRef = useRef();
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        const fetchTargetUser = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/user/${targetUserId}`, {
                    withCredentials: true,
                });
                setTargetUser(res.data);
            } catch (err) {
                console.error("Error fetching user details:", err);
            }
        };

        if (targetUserId) {
            fetchTargetUser();
        }
    }, [targetUserId]);

    useEffect(() => {
        if (!user) return;

        const socket = createSocketConnection();
        socketRef.current = socket;

        socket.emit("joinChat", { userId: user._id });

        socket.on("messageReceived", ({ senderId, text, timestamp }) => {
            setMessages((prev) => [
                ...prev,
                {
                    text,
                    sender: senderId === user._id ? "me" : "other",
                    timestamp: timestamp || new Date()
                }
            ]);
        });

        return () => {
            socket.disconnect();
        };
    }, [user]);

    const handleSendMessage = () => {
        if (!newMessage.trim() || !socketRef.current) return;

        socketRef.current.emit("sendMessage", {
            senderId: user._id,
            receiverId: targetUserId,
            text: newMessage,
        });

        setMessages((prev) => [
            ...prev,
            {
                text: newMessage,
                sender: "me",
                timestamp: new Date()
            }
        ]);
        setNewMessage("");
    };

    if (!user) return null;

    return (
        <div className="flex flex-col h-[calc(100vh-6rem)] w-full max-w-4xl mx-auto border border-stone-800 rounded-xl bg-stone-950 text-white shadow-2xl overflow-hidden mt-4">
            {/* Header */}
            <div className="p-4 border-b border-stone-800 bg-stone-900/50 backdrop-blur-sm flex items-center gap-4">
                {targetUser ? (
                    <div className="flex items-center gap-3">
                        <img
                            src={targetUser.photoUrl}
                            alt={targetUser.firstName}
                            className="w-10 h-10 rounded-full object-cover border-2 border-primary"
                        />
                        <div>
                            <h2 className="font-semibold text-lg leading-none">
                                {targetUser.firstName} {targetUser.lastName}
                            </h2>
                            <span className="text-xs text-stone-400">Online</span>
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center gap-3 animate-pulse">
                        <div className="w-10 h-10 rounded-full bg-stone-800"></div>
                        <div className="h-4 w-24 bg-stone-800 rounded"></div>
                    </div>
                )}
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-stone-950">
                {messages.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-stone-500 space-y-2">
                        <div className="w-16 h-16 rounded-full bg-stone-900 flex items-center justify-center mb-2">
                            <span className="text-2xl">👋</span>
                        </div>
                        <p>No messages yet.</p>
                        <p className="text-sm">Start the conversation with {targetUser?.firstName || 'them'}!</p>
                    </div>
                ) : (
                    messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
                        >
                            <div className={`flex flex-col max-w-[70%] ${msg.sender === "me" ? "items-end" : "items-start"}`}>
                                <div
                                    className={`px-4 py-2 rounded-2xl ${msg.sender === "me"
                                            ? "bg-primary text-primary-foreground rounded-br-none"
                                            : "bg-stone-800 text-stone-100 rounded-bl-none"
                                        }`}
                                >
                                    {msg.text}
                                </div>
                                <span className="text-[10px] text-stone-500 mt-1 px-1">
                                    {msg.timestamp ? new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                                </span>
                            </div>
                        </div>
                    ))
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-stone-900/50 border-t border-stone-800 backdrop-blur-sm">
                <div className="flex gap-2 items-end bg-stone-950 border border-stone-800 p-1.5 rounded-full pl-4 focus-within:border-primary/50 transition-colors">
                    <input
                        type="text"
                        className="flex-1 bg-transparent border-none focus:outline-none text-white py-2 placeholder:text-stone-500"
                        placeholder="Type a message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                    />
                    <button
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim()}
                        className="bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed text-primary-foreground p-2.5 rounded-full transition-all duration-200 transform active:scale-95"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                            <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chat;
