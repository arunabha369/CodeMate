import { useEffect } from "react";

export function useDocumentTitle(title) {
    useEffect(() => {
        const previous = document.title;
        document.title = title ? `${title} · CodeMate` : "CodeMate — Find your perfect coding partner";
        return () => {
            document.title = previous;
        };
    }, [title]);
}
