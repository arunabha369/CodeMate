import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
    ArrowRight, Github, MessageSquare, Sparkles, Code2, Heart, X,
    BadgeCheck, Trophy, Mail, MapPin, UserPlus, Compass, Send, Zap,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { showToast } from "../store/toastSlice";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { cn } from "../lib/utils";

const CONTACT_EMAIL = "growwithhustler@gmail.com";

const SectionHeading = ({ eyebrow, title, description }) => (
    <div className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">{eyebrow}</p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-balance sm:text-4xl">{title}</h2>
        {description && <p className="mt-4 text-lg text-muted-foreground text-balance">{description}</p>}
    </div>
);

/* ----------------------------- Hero mockup ----------------------------- */

const MockCard = ({ name, role, skills, gradient, className }) => (
    <div className={cn("w-72 overflow-hidden rounded-2xl border bg-card shadow-2xl shadow-black/20", className)}>
        <div className={cn("relative h-44 bg-gradient-to-br", gradient)}>
            <div className="absolute inset-0 bg-grid opacity-20" />
            <div className="absolute bottom-3 left-4 flex items-center gap-1.5 text-white">
                <span className="text-lg font-semibold">{name}</span>
                <BadgeCheck className="h-4 w-4 text-sky-300" />
            </div>
        </div>
        <div className="space-y-3 p-4">
            <p className="text-sm text-muted-foreground">{role}</p>
            <div className="flex flex-wrap gap-1.5">
                {skills.map((s) => (
                    <span key={s} className="rounded-md border bg-muted/60 px-2 py-0.5 font-mono text-[11px] text-foreground/80">
                        {s}
                    </span>
                ))}
            </div>
            <div className="flex justify-center gap-4 pt-1">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border text-rose-500">
                    <X className="h-5 w-5" />
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 to-pink-600 text-white shadow-lg shadow-rose-500/30">
                    <Heart className="h-5 w-5" fill="currentColor" />
                </span>
            </div>
        </div>
    </div>
);

const HeroMockup = () => (
    <div className="relative mx-auto flex h-[420px] w-full max-w-md items-center justify-center" aria-hidden="true">
        <div className="absolute inset-10 rounded-full bg-gradient-to-tr from-rose-500/30 to-violet-500/30 blur-3xl" />
        <MockCard
            name="Priya S."
            role="Backend engineer · open to hackathons"
            skills={["Go", "Postgres", "gRPC"]}
            gradient="from-violet-500 to-indigo-600"
            className="absolute -rotate-6 -translate-x-10 scale-95 opacity-80"
        />
        <MockCard
            name="Arjun M."
            role="Full-stack dev · building a SaaS side project"
            skills={["React", "Node.js", "TypeScript", "AWS"]}
            gradient="from-rose-500 to-orange-400"
            className="relative rotate-3 translate-x-6"
        />
        <div className="absolute right-0 top-10 flex items-center gap-2 rounded-xl border bg-card/90 px-3 py-2 shadow-lg backdrop-blur animate-float">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-500">
                <Sparkles className="h-3.5 w-3.5" />
            </span>
            <span className="text-xs font-semibold">It's a match!</span>
        </div>
        <div className="absolute bottom-12 left-0 flex items-center gap-2 rounded-xl border bg-card/90 px-3 py-2 shadow-lg backdrop-blur animate-float [animation-delay:1.5s]">
            <Code2 className="h-4 w-4 text-primary" />
            <span className="font-mono text-xs">92% stack overlap</span>
        </div>
    </div>
);

/* ------------------------------- Sections ------------------------------ */

const features = [
    {
        icon: Compass,
        title: "Skill-based discovery",
        desc: "Browse developers one card at a time and see their stack, bio and coding profiles at a glance.",
        className: "md:col-span-2",
    },
    {
        icon: Github,
        title: "GitHub skill import",
        desc: "Link GitHub and we read the languages across your repos to fill in your skills automatically.",
    },
    {
        icon: BadgeCheck,
        title: "Verified professionals",
        desc: "Verify with LinkedIn to earn a badge and get prioritised in other developers' feeds.",
    },
    {
        icon: MessageSquare,
        title: "Real-time chat",
        desc: "Once you both connect, jump straight into a live conversation and start planning.",
    },
    {
        icon: Trophy,
        title: "Competitive coding profiles",
        desc: "Show off LeetCode, Codeforces, CodeChef, GFG and takeUforward — all on one profile.",
    },
];

const steps = [
    { icon: UserPlus, title: "Create your profile", desc: "Sign up in seconds, add your skills or import them from GitHub." },
    { icon: Heart, title: "Discover & connect", desc: "Swipe through developers. When interest is mutual, you're connected." },
    { icon: Zap, title: "Start building", desc: "Chat in real time, pick a project and ship it together." },
];

const platforms = ["GitHub", "LinkedIn", "LeetCode", "Codeforces", "CodeChef", "GeeksforGeeks"];

const ContactForm = () => {
    const dispatch = useDispatch();
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        const subject = encodeURIComponent(`CodeMate enquiry from ${form.name}`);
        const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
        window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
        dispatch(showToast({ message: "Opening your email app…", type: "success" }));
    };

    return (
        <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border bg-card p-6 shadow-sm sm:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                    <Label htmlFor="contact-name">Name</Label>
                    <Input id="contact-name" name="name" required placeholder="Ada Lovelace" value={form.name} onChange={update} autoComplete="name" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="contact-email">Email</Label>
                    <Input id="contact-email" name="email" type="email" required placeholder="ada@example.com" value={form.email} onChange={update} autoComplete="email" />
                </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor="contact-message">Message</Label>
                <Textarea id="contact-message" name="message" required rows={5} placeholder="Tell us what's on your mind…" value={form.message} onChange={update} />
            </div>
            <Button type="submit" variant="gradient" size="lg" className="w-full">
                <Send /> Send message
            </Button>
        </form>
    );
};

const LandingPage = () => {
    useDocumentTitle();

    return (
        <div className="overflow-x-hidden">
            {/* Hero */}
            <section id="home" className="relative -mt-16 pt-16">
                <div className="absolute inset-0 -z-10 bg-grid [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)]" />
                <div className="absolute left-1/2 top-0 -z-10 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-primary/15 blur-[120px]" />

                <div className="container grid items-center gap-12 py-16 md:py-24 lg:grid-cols-2 lg:py-28">
                    <div className="text-center lg:text-left animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <Badge variant="outline" className="mb-6 gap-2 bg-background/60 px-3 py-1 text-sm backdrop-blur">
                            <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                            </span>
                            Now with GitHub skill import
                        </Badge>
                        <h1 className="text-4xl font-extrabold tracking-tight text-balance sm:text-5xl lg:text-6xl">
                            Find the developer who <span className="text-gradient">codes like you think</span>
                        </h1>
                        <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground lg:mx-0">
                            CodeMate matches you with collaborators based on your stack, goals and coding
                            style — so you can spend less time searching and more time shipping.
                        </p>
                        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
                            <Button asChild variant="gradient" size="xl">
                                <Link to="/login" state={{ mode: "signup" }}>
                                    Get started — it's free <ArrowRight />
                                </Link>
                            </Button>
                            <Button asChild variant="outline" size="xl">
                                <a href="#how-it-works">See how it works</a>
                            </Button>
                        </div>
                        <p className="mt-6 text-sm text-muted-foreground">No credit card · Set up in under a minute</p>
                    </div>

                    <div className="animate-in fade-in zoom-in-95 duration-1000">
                        <HeroMockup />
                    </div>
                </div>
            </section>

            {/* Platforms strip */}
            <section className="border-y bg-surface/60">
                <div className="container flex flex-col items-center gap-4 py-8 md:flex-row md:justify-between">
                    <p className="text-sm font-medium text-muted-foreground">Bring your profiles from</p>
                    <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
                        {platforms.map((p) => (
                            <li key={p} className="text-sm font-semibold text-muted-foreground/80">{p}</li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* Features */}
            <section id="features" className="container scroll-mt-20 py-20 md:py-28">
                <SectionHeading
                    eyebrow="Features"
                    title="Everything you need to find your coding partner"
                    description="Built for hackers, indie makers and anyone who'd rather build with someone than alone."
                />
                <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-3">
                    {features.map(({ icon: Icon, title, desc, className }) => (
                        <div
                            key={title}
                            className={cn(
                                "group relative overflow-hidden rounded-2xl border bg-card p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg",
                                className
                            )}
                        >
                            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/10 opacity-0 blur-2xl transition-opacity group-hover:opacity-100" />
                            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border bg-primary/10 text-primary">
                                <Icon className="h-5 w-5" />
                            </div>
                            <h3 className="text-lg font-semibold">{title}</h3>
                            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* How it works */}
            <section id="how-it-works" className="scroll-mt-20 border-y bg-surface/60 py-20 md:py-28">
                <div className="container">
                    <SectionHeading eyebrow="How it works" title="From sign-up to shipping in three steps" />
                    <ol className="relative mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
                        <div className="absolute left-[16%] right-[16%] top-6 hidden h-px bg-gradient-to-r from-transparent via-border to-transparent md:block" />
                        {steps.map(({ icon: Icon, title, desc }, i) => (
                            <li key={title} className="relative text-center">
                                <div className="relative mx-auto flex h-12 w-12 items-center justify-center rounded-full border bg-background text-primary shadow-sm">
                                    <Icon className="h-5 w-5" />
                                    <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                                        {i + 1}
                                    </span>
                                </div>
                                <h3 className="mt-5 text-lg font-semibold">{title}</h3>
                                <p className="mx-auto mt-2 max-w-xs text-sm text-muted-foreground">{desc}</p>
                            </li>
                        ))}
                    </ol>
                </div>
            </section>

            {/* Contact */}
            <section id="contact" className="container scroll-mt-20 py-20 md:py-28">
                <div className="mx-auto grid max-w-5xl items-start gap-12 lg:grid-cols-2">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-wider text-primary">Contact</p>
                        <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Get in touch</h2>
                        <p className="mt-4 text-lg text-muted-foreground">
                            Questions, feedback or partnership ideas? We read every message and usually reply within a day.
                        </p>
                        <ul className="mt-8 space-y-4">
                            <li className="flex items-center gap-4">
                                <span className="flex h-10 w-10 items-center justify-center rounded-xl border bg-card text-primary"><Mail className="h-4 w-4" /></span>
                                <a href={`mailto:${CONTACT_EMAIL}`} className="font-medium hover:text-primary">{CONTACT_EMAIL}</a>
                            </li>
                            <li className="flex items-center gap-4">
                                <span className="flex h-10 w-10 items-center justify-center rounded-xl border bg-card text-primary"><MapPin className="h-4 w-4" /></span>
                                <span className="font-medium">Kolkata, India</span>
                            </li>
                        </ul>
                    </div>
                    <ContactForm />
                </div>
            </section>

            {/* CTA */}
            <section className="container pb-20 md:pb-28">
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-rose-600 via-pink-600 to-violet-700 px-6 py-16 text-center text-white shadow-2xl shadow-rose-900/20 sm:px-12">
                    <div className="absolute inset-0 bg-grid opacity-10 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
                    <h2 className="relative text-3xl font-bold tracking-tight text-balance sm:text-4xl">
                        Your next collaborator is one swipe away
                    </h2>
                    <p className="relative mx-auto mt-4 max-w-xl text-white/80">
                        Create your profile, import your skills, and start meeting developers who want to build what you want to build.
                    </p>
                    <Button asChild size="xl" className="relative mt-8 bg-white text-rose-600 shadow-lg hover:bg-white/90">
                        <Link to="/login" state={{ mode: "signup" }}>
                            Create your free account <ArrowRight />
                        </Link>
                    </Button>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
