import { useEffect, useRef } from "react";
import { X, ExternalLink, BadgeCheck, Heart } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar } from "./ui/avatar";
import { PROFILE_LINKS } from "./profile-links";
import { fullName, capitalize } from "../lib/utils";

const UserDetailModal = ({ user, onClose, actions }) => {
    const closeRef = useRef(null);

    useEffect(() => {
        if (!user) return;
        const onKey = (e) => e.key === "Escape" && onClose();
        document.addEventListener("keydown", onKey);
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        closeRef.current?.focus();
        return () => {
            document.removeEventListener("keydown", onKey);
            document.body.style.overflow = prevOverflow;
        };
    }, [user, onClose]);

    if (!user) return null;

    const { photoUrl, age, gender, about, skills = [], isLinkedInVerified } = user;
    const links = PROFILE_LINKS.filter((l) => user[l.key]);
    const meta = [age && `${age} years`, capitalize(gender)].filter(Boolean).join(" · ");

    return (
        <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center sm:p-4" role="dialog" aria-modal="true" aria-labelledby="user-detail-title">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200" onClick={onClose} />

            <div className="relative flex max-h-[92dvh] w-full flex-col overflow-hidden rounded-t-3xl border bg-background shadow-2xl animate-in slide-in-from-bottom-10 duration-300 sm:max-w-lg sm:rounded-3xl sm:zoom-in-95 sm:slide-in-from-bottom-4">
                <div className="overflow-y-auto no-scrollbar">
                    {/* Header */}
                    <div className="relative h-36 bg-gradient-to-br from-rose-500 via-pink-600 to-violet-600">
                        <div className="absolute inset-0 bg-grid opacity-20" />
                        <div className="absolute left-1/2 top-2 h-1 w-10 -translate-x-1/2 rounded-full bg-white/50 sm:hidden" />
                        <button
                            ref={closeRef}
                            onClick={onClose}
                            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/25 text-white backdrop-blur transition-colors hover:bg-black/40 focus-visible:ring-2 focus-visible:ring-white"
                            aria-label="Close"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    <div className="px-6 pb-6">
                        <Avatar src={photoUrl} firstName={user.firstName} lastName={user.lastName} size="xl" className="-mt-12 rounded-full ring-4 ring-background" />
                        <div className="mt-3">
                            <h2 id="user-detail-title" className="flex items-center gap-2 text-2xl font-bold">
                                {fullName(user)}
                                {isLinkedInVerified && <BadgeCheck className="h-5 w-5 text-sky-500" aria-label="Verified" />}
                            </h2>
                            {meta && <p className="text-sm text-muted-foreground">{meta}</p>}
                        </div>

                        <section className="mt-6">
                            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">About</h3>
                            <p className="mt-2 whitespace-pre-line leading-relaxed text-foreground/90">{about || "No bio yet."}</p>
                        </section>

                        {skills.length > 0 && (
                            <section className="mt-6">
                                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Skills</h3>
                                <div className="mt-2 flex flex-wrap gap-2">
                                    {skills.map((skill) => (
                                        <span key={skill} className="rounded-lg border bg-muted/50 px-2.5 py-1 font-mono text-xs">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </section>
                        )}

                        {links.length > 0 && (
                            <section className="mt-6">
                                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Profiles</h3>
                                <div className="mt-2 grid gap-2 sm:grid-cols-2">
                                    {links.map(({ key, label, icon: Icon, color }) => (
                                        <a
                                            key={key}
                                            href={user[key]}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group flex items-center gap-3 rounded-xl border p-3 transition-colors hover:bg-accent"
                                        >
                                            <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${color}`}>
                                                <Icon className="h-4 w-4" />
                                            </span>
                                            <span className="text-sm font-medium">{label}</span>
                                            <ExternalLink className="ml-auto h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                                        </a>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                </div>

                {actions && (
                    <div className="flex gap-3 border-t bg-background/95 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] backdrop-blur">
                        {actions.onPass && (
                            <Button variant="outline" size="lg" className="flex-1" onClick={actions.onPass}>
                                <X /> Pass
                            </Button>
                        )}
                        {actions.onConnect && (
                            <Button variant="gradient" size="lg" className="flex-1" onClick={actions.onConnect}>
                                <Heart fill="currentColor" /> Connect
                            </Button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserDetailModal;
