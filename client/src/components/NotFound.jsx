import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Compass } from "lucide-react";
import { Button } from "./ui/button";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

const NotFound = () => {
    useDocumentTitle("Page not found");
    const navigate = useNavigate();
    return (
        <div className="container flex min-h-[70vh] flex-col items-center justify-center py-16 text-center">
            <p className="font-mono text-sm font-medium text-primary">404</p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Page not found</h1>
            <p className="mt-3 max-w-md text-muted-foreground">
                The page you're looking for doesn't exist or has been moved.
            </p>
            <div className="mt-8 flex gap-3">
                <Button variant="outline" onClick={() => navigate(-1)}>
                    <ArrowLeft /> Go back
                </Button>
                <Button asChild>
                    <Link to="/"><Compass /> Home</Link>
                </Button>
            </div>
        </div>
    );
};

export default NotFound;
