import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { hideToast } from "../store/toastSlice";

const Toast = () => {
    const { message, type, isVisible } = useSelector((store) => store.toast);
    const dispatch = useDispatch();

    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                dispatch(hideToast());
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [isVisible, dispatch]);

    if (!isVisible) return null;

    const indicatorColor =
        type === "success" ? "bg-green-400" :
            type === "error" ? "bg-rose-500" :
                type === "warning" ? "bg-yellow-400" : "bg-blue-400";
    return (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] transition-all duration-300 animate-in fade-in slide-in-from-top-5">
            <div className="flex items-center gap-3 px-6 py-3 rounded-full shadow-lg border bg-popover text-popover-foreground">
                <span className={`w-3 h-3 rounded-full ${indicatorColor} ring-2 ring-background`}></span>
                <span className="font-medium text-sm">{message}</span>
            </div>
        </div>
    );
};

export default Toast;
