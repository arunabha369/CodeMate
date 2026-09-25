import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from "lucide-react";
import { hideToast } from "../store/toastSlice";
import { cn } from "../lib/utils";

const styles = {
    success: { icon: CheckCircle2, color: "text-emerald-500", bar: "bg-emerald-500" },
    error: { icon: AlertCircle, color: "text-destructive", bar: "bg-destructive" },
    warning: { icon: AlertTriangle, color: "text-amber-500", bar: "bg-amber-500" },
    info: { icon: Info, color: "text-sky-500", bar: "bg-sky-500" },
};

const ToastItem = ({ toast }) => {
    const dispatch = useDispatch();
    const { icon: Icon, color, bar } = styles[toast.type] || styles.info;

    useEffect(() => {
        const timer = setTimeout(() => dispatch(hideToast(toast.id)), toast.duration);
        return () => clearTimeout(timer);
    }, [toast.id, toast.duration, dispatch]);

    return (
        <div
            role={toast.type === "error" ? "alert" : "status"}
            className="pointer-events-auto relative flex w-full items-start gap-3 overflow-hidden rounded-xl border bg-popover p-4 pr-10 text-popover-foreground shadow-lg shadow-black/10 animate-in fade-in slide-in-from-bottom-4 sm:slide-in-from-right-8 duration-300"
        >
            <Icon className={cn("mt-0.5 h-5 w-5 shrink-0", color)} />
            <div className="min-w-0">
                <p className="text-sm font-medium">{toast.message}</p>
                {toast.description && <p className="mt-0.5 text-sm text-muted-foreground">{toast.description}</p>}
            </div>
            <button
                onClick={() => dispatch(hideToast(toast.id))}
                className="absolute right-2 top-2 rounded-md p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                aria-label="Dismiss notification"
            >
                <X className="h-4 w-4" />
            </button>
            <span
                className={cn("absolute bottom-0 left-0 h-0.5 w-full origin-left opacity-60 animate-toast-progress", bar)}
                style={{ animationDuration: `${toast.duration}ms` }}
            />
        </div>
    );
};

const Toast = () => {
    const toasts = useSelector((store) => store.toast);

    return (
        <div
            aria-live="polite"
            className="pointer-events-none fixed inset-x-0 bottom-20 z-[100] flex flex-col items-center gap-2 px-4 sm:bottom-6 sm:left-auto sm:right-6 sm:w-96 sm:items-end sm:px-0"
        >
            {toasts.map((t) => (
                <ToastItem key={t.id} toast={t} />
            ))}
        </div>
    );
};

export default Toast;
