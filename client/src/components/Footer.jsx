import { Link } from "react-router-dom";
import { Github, Mail } from "lucide-react";
import { Logo } from "./ui/logo";

const CONTACT_EMAIL = "growwithhustler@gmail.com";
const REPO_URL = "https://github.com/arunabha369/CodeMate";

const columns = [
    {
        title: "Product",
        links: [
            { label: "Features", href: "/#features" },
            { label: "How it works", href: "/#how-it-works" },
            { label: "Get started", to: "/login" },
        ],
    },
    {
        title: "Company",
        links: [
            { label: "Contact", href: "/#contact" },
            { label: "Email us", href: `mailto:${CONTACT_EMAIL}` },
            { label: "Source code", href: REPO_URL, external: true },
        ],
    },
];

const Footer = () => {
    return (
        <footer className="border-t bg-surface">
            <div className="container py-12 md:py-16">
                <div className="grid gap-10 md:grid-cols-12">
                    <div className="space-y-4 md:col-span-6">
                        <Logo />
                        <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
                            The matchmaking platform for developers. Find collaborators who share your stack,
                            goals and coding style — then build something great together.
                        </p>
                        <div className="flex gap-2">
                            <a
                                href={REPO_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="CodeMate on GitHub"
                                className="flex h-9 w-9 items-center justify-center rounded-lg border bg-background text-muted-foreground transition-colors hover:text-foreground"
                            >
                                <Github className="h-4 w-4" />
                            </a>
                            <a
                                href={`mailto:${CONTACT_EMAIL}`}
                                aria-label="Email CodeMate"
                                className="flex h-9 w-9 items-center justify-center rounded-lg border bg-background text-muted-foreground transition-colors hover:text-foreground"
                            >
                                <Mail className="h-4 w-4" />
                            </a>
                        </div>
                    </div>

                    {columns.map((col) => (
                        <div key={col.title} className="md:col-span-3">
                            <h3 className="text-sm font-semibold">{col.title}</h3>
                            <ul className="mt-4 space-y-3 text-sm">
                                {col.links.map((l) => (
                                    <li key={l.label}>
                                        {l.to ? (
                                            <Link to={l.to} className="text-muted-foreground transition-colors hover:text-foreground">
                                                {l.label}
                                            </Link>
                                        ) : (
                                            <a
                                                href={l.href}
                                                {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                                                className="text-muted-foreground transition-colors hover:text-foreground"
                                            >
                                                {l.label}
                                            </a>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="mt-12 flex flex-col items-center justify-between gap-2 border-t pt-8 text-xs text-muted-foreground sm:flex-row">
                    <p>© {new Date().getFullYear()} CodeMate. All rights reserved.</p>
                    <p>Made in Kolkata, India.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
