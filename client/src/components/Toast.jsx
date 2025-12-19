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

    const alertType =
        type === "success"
            ? "alert-success"
            : type === "error"
                ? "alert-error"
                : type === "warning"
                    ? "alert-warning"
                    : "alert-info";

    const bgColor =
        type === "success" ? "bg-green-500" :
            type === "error" ? "bg-red-500" :
                type === "warning" ? "bg-yellow-500" : "bg-blue-500";

    return (
        <div className="toast toast-top toast-center z-50 transition-all duration-300 animate-fade-in pt-20">
            <div className={`alert ${alertType} text-white shadow-lg glass-card border-none flex items-center gap-2 px-6 py-3 rounded-full`}>
                <span className={`w-3 h-3 rounded-full ${bgColor} ring-2 ring-white/30 animate-pulse`}></span>
                <span className="font-semibold tracking-wide">{message}</span>
            </div>
        </div>
    );
};

export default Toast;
