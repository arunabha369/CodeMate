import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="w-full py-8 bg-background border-t mt-auto">
            <div className="container flex flex-col md:flex-row justify-between items-center gap-4 px-4">
                <p className="text-sm text-muted-foreground text-center md:text-left">
                    Copyright © 2024 - All rights reserved by <span className="text-primary font-bold">CodeMate Inc</span>.
                </p>
                <div className="flex gap-6 text-sm text-muted-foreground">
                    <Link to="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
                    <Link to="#" className="hover:text-primary transition-colors">Terms of Service</Link>
                    <Link to="#" className="hover:text-primary transition-colors">Contact</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
