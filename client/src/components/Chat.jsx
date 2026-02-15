import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { createSocketConnection } from "../utils/socket";

const Chat = () => {
    const { targetUserId } = useParams();
    const user = useSelector((store) => store.user);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const socketRef = useRef();

    useEffect(() => {
        if (!user) return;

        const socket = createSocketConnection();
        socketRef.current = socket;

        socket.emit("joinChat", { userId: user._id });

        socket.on("messageReceived", ({ senderId, text }) => {
            setMessages((prev) => [...prev, { text, sender: senderId === user._id ? "me" : "other" }]);
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

        setMessages((prev) => [...prev, { text: newMessage, sender: "me" }]);
        setNewMessage("");
    };

    if (!user) return null;

    return (
        <div className="flex flex-col h-[80vh] w-full max-w-4xl mx-auto border border-white/20 rounded-lg bg-black text-white mt-8">
            <div className="p-4 border-b border-white/20 bg-stone-900 rounded-t-lg">
                <h2 className="text-xl font-bold">Chat with User {targetUserId}</h2>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.length === 0 ? (
                    <div className="text-center text-gray-500 mt-10">Start a conversation!</div>
                ) : (
                    messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
                        >
                            <div
                                className={`p-3 rounded-lg max-w-xs ${msg.sender === "me" ? "bg-blue-600" : "bg-stone-800"
                                    }`}
                            >
                                {msg.text}
                            </div>
                        </div>
                    ))
                )}
            </div>

            <div className="p-4 border-t border-white/20 bg-stone-900 rounded-b-lg flex gap-2">
                <input
                    type="text"
                    className="flex-1 p-2 bg-black border border-white/20 rounded-md focus:outline-none focus:border-blue-500 text-white"
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                />
                <button
                    onClick={handleSendMessage}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-semibold transition"
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default Chat;
