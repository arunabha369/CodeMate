import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Github, Linkedin, BadgeCheck, Check, X, Plus, AlertCircle, Link2, ExternalLink, Save, RotateCcw } from "lucide-react";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../store/userSlice";
import { showToast } from "../store/toastSlice";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { PageHeader } from "./ui/page-header";
import UserCard from "./UserCard";
import { PROFILE_LINKS } from "./profile-links";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { cn, getErrorMessage } from "../lib/utils";

const ABOUT_MAX = 500;
const EDITABLE_LINKS = PROFILE_LINKS.filter((l) => l.editable !== false);

const toForm = (user) => ({
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    photoUrl: user.photoUrl || "",
    age: user.age ?? "",
    gender: user.gender || "",
    about: user.about || "",
    skills: user.skills || [],
    ...Object.fromEntries(EDITABLE_LINKS.map((l) => [l.key, user[l.key] || ""])),
});

const Section = ({ title, description, children, aside }) => (
    <section className="rounded-2xl border bg-card">
        <div className="flex items-start justify-between gap-4 border-b px-5 py-4 sm:px-6">
            <div>
                <h2 className="font-semibold">{title}</h2>
                {description && <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>}
            </div>
            {aside}
        </div>
        <div className="space-y-5 p-5 sm:p-6">{children}</div>
    </section>
);

const Field = ({ label, htmlFor, hint, error, children }) => (
    <div className="space-y-2">
        <Label htmlFor={htmlFor}>{label}</Label>
        {children}
        {error ? <p className="text-xs text-destructive">{error}</p> : hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
);

const SkillsInput = ({ value, onChange }) => {
    const [draft, setDraft] = useState("");

    const add = (raw) => {
        const parts = raw.split(",").map((s) => s.trim()).filter(Boolean);
        if (!parts.length) return;
        const existing = new Set(value.map((s) => s.toLowerCase()));
        const next = [...value];
        parts.forEach((p) => {
            if (!existing.has(p.toLowerCase())) {
                next.push(p);
                existing.add(p.toLowerCase());
            }
        });
        onChange(next);
        setDraft("");
    };

    const onKeyDown = (e) => {
        if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            add(draft);
        } else if (e.key === "Backspace" && !draft && value.length) {
            onChange(value.slice(0, -1));
        }
    };

    return (
        <div className="flex min-h-10 flex-wrap items-center gap-1.5 rounded-lg border border-input bg-background p-1.5 shadow-sm transition-colors focus-within:border-primary/60 focus-within:ring-4 focus-within:ring-primary/15">
            {value.map((skill) => (
                <span key={skill} className="inline-flex items-center gap-1 rounded-md bg-primary/10 py-1 pl-2 pr-1 font-mono text-xs text-primary">
                    {skill}
                    <button
                        type="button"
                        onClick={() => onChange(value.filter((s) => s !== skill))}
                        className="rounded p-0.5 hover:bg-primary/20"
                        aria-label={`Remove ${skill}`}
                    >
                        <X className="h-3 w-3" />
                    </button>
                </span>
            ))}
            <input
                id="skills"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={onKeyDown}
                onBlur={() => add(draft)}
                placeholder={value.length ? "Add another…" : "e.g. React, Node.js, Python"}
                className="min-w-[8rem] flex-1 bg-transparent px-1.5 py-1 text-sm placeholder:text-muted-foreground/70 focus:outline-none"
            />
            {draft && (
                <button type="button" onClick={() => add(draft)} className="rounded-md p-1 text-muted-foreground hover:bg-accent hover:text-foreground" aria-label="Add skill">
                    <Plus className="h-4 w-4" />
                </button>
            )}
        </div>
    );
};

const Integration = ({ icon: Icon, name, connected, connectedLabel, description, onConnect, href, iconClass }) => (
    <div className="flex items-center gap-4 rounded-xl border p-4">
        <span className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-lg", iconClass)}>
            <Icon className="h-5 w-5" />
        </span>
        <div className="min-w-0 flex-1">
            <p className="flex items-center gap-2 text-sm font-medium">
                {name}
                {connected && <Badge variant="success"><Check /> {connectedLabel}</Badge>}
            </p>
            <p className="text-xs text-muted-foreground">{description}</p>
        </div>
        {connected ? (
            href && (
                <Button asChild variant="ghost" size="icon-sm" aria-label={`Open ${name}`}>
                    <a href={href} target="_blank" rel="noopener noreferrer"><ExternalLink /></a>
                </Button>
            )
        ) : (
            <Button variant="outline" size="sm" onClick={onConnect}>
                <Link2 /> Connect
            </Button>
        )}
    </div>
);

const Profile = () => {
    const user = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const [formData, setFormData] = useState(() => toForm(user));
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [fieldErrors, setFieldErrors] = useState({});
    useDocumentTitle("Profile");

    useEffect(() => {
        setFormData(toForm(user));
    }, [user]);

    const initial = useMemo(() => toForm(user), [user]);
    const isDirty = JSON.stringify(initial) !== JSON.stringify(formData);

    // Warn before leaving with unsaved edits.
    useEffect(() => {
        if (!isDirty) return;
        const onBeforeUnload = (e) => {
            e.preventDefault();
            e.returnValue = "";
        };
        window.addEventListener("beforeunload", onBeforeUnload);
        return () => window.removeEventListener("beforeunload", onBeforeUnload);
    }, [isDirty]);

    const set = (name, value) => {
        setFormData((f) => ({ ...f, [name]: value }));
        if (fieldErrors[name]) setFieldErrors((e) => ({ ...e, [name]: undefined }));
    };
    const handleInputChange = (e) => set(e.target.name, e.target.value);

    const completeness = useMemo(() => {
        const checks = [
            { label: "Profile photo", done: !!formData.photoUrl },
            { label: "Age & gender", done: !!formData.age && !!formData.gender },
            { label: "Bio (40+ characters)", done: formData.about.trim().length >= 40 },
            { label: "At least 3 skills", done: formData.skills.length >= 3 },
            { label: "A coding profile", done: EDITABLE_LINKS.some((l) => formData[l.key]) },
            { label: "GitHub linked", done: !!user.githubId },
        ];
        return { checks, percent: Math.round((checks.filter((c) => c.done).length / checks.length) * 100) };
    }, [formData, user.githubId]);

    const validate = () => {
        const errs = {};
        if (formData.firstName.trim().length < 4) errs.firstName = "First name must be at least 4 characters";
        if (formData.age !== "" && (Number(formData.age) < 18 || Number(formData.age) > 120)) errs.age = "You must be 18 or older";
        if (formData.photoUrl && !/^https?:\/\/\S+$/i.test(formData.photoUrl)) errs.photoUrl = "Enter a valid image URL (https://…)";
        EDITABLE_LINKS.forEach(({ key }) => {
            if (formData[key] && !/^https?:\/\/\S+$/i.test(formData[key])) errs[key] = "Enter a full URL starting with https://";
        });
        setFieldErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleSaveProfile = async (e) => {
        e?.preventDefault();
        setError("");
        if (!validate()) {
            dispatch(showToast({ message: "Please fix the highlighted fields", type: "warning" }));
            return;
        }
        setSaving(true);
        try {
            const payload = { ...formData, firstName: formData.firstName.trim(), lastName: formData.lastName.trim() };
            // The server rejects empty values for these, so leave them unchanged instead.
            if (payload.age === "") delete payload.age;
            else payload.age = Number(payload.age);
            if (!payload.gender) delete payload.gender;
            if (!payload.photoUrl) delete payload.photoUrl;

            const res = await axios.patch(BASE_URL + "/profile/edit", payload, { withCredentials: true });
            dispatch(addUser(res.data.data));
            dispatch(showToast({ message: "Profile saved", type: "success" }));
        } catch (err) {
            const message = getErrorMessage(err, "Failed to update profile");
            setError(message);
            dispatch(showToast({ message: "Couldn't save your profile", description: message, type: "error" }));
        } finally {
            setSaving(false);
        }
    };

    const previewUser = { ...user, ...formData, age: formData.age || undefined };

    return (
        <div className="container max-w-6xl py-8">
            <PageHeader title="Your profile" description="This is what other developers see when they discover you." />

            <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
                <form id="profile-form" onSubmit={handleSaveProfile} className="space-y-6" noValidate>
                    <Section title="Basic info" description="Your name and photo appear on your card.">
                        <div className="grid gap-5 sm:grid-cols-2">
                            <Field label="First name" htmlFor="firstName" error={fieldErrors.firstName}>
                                <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleInputChange} autoComplete="given-name" aria-invalid={!!fieldErrors.firstName} />
                            </Field>
                            <Field label="Last name" htmlFor="lastName">
                                <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} autoComplete="family-name" />
                            </Field>
                        </div>
                        <Field label="Photo URL" htmlFor="photoUrl" hint="Link to a square image works best." error={fieldErrors.photoUrl}>
                            <Input id="photoUrl" name="photoUrl" type="url" placeholder="https://…" value={formData.photoUrl} onChange={handleInputChange} aria-invalid={!!fieldErrors.photoUrl} />
                        </Field>
                        <div className="grid gap-5 sm:grid-cols-2">
                            <Field label="Age" htmlFor="age" error={fieldErrors.age}>
                                <Input id="age" name="age" type="number" inputMode="numeric" min={18} max={120} placeholder="18+" value={formData.age} onChange={handleInputChange} aria-invalid={!!fieldErrors.age} />
                            </Field>
                            <Field label="Gender" htmlFor="gender">
                                <select
                                    id="gender"
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleInputChange}
                                    className="flex h-10 w-full rounded-lg border border-input bg-background px-3 text-sm shadow-sm transition-colors hover:border-muted-foreground/40 focus-visible:border-primary/60 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/15"
                                >
                                    <option value="">Prefer not to say</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </Field>
                        </div>
                    </Section>

                    <Section title="About & skills" description="Help others understand what you like to build.">
                        <Field label="Bio" htmlFor="about">
                            <Textarea
                                id="about"
                                name="about"
                                rows={4}
                                maxLength={ABOUT_MAX}
                                value={formData.about}
                                onChange={handleInputChange}
                                placeholder="I'm a full-stack dev who loves building developer tools. Looking for a partner for weekend hackathons…"
                            />
                            <p className="text-right text-xs text-muted-foreground">{formData.about.length}/{ABOUT_MAX}</p>
                        </Field>
                        <Field label="Skills" htmlFor="skills" hint="Press Enter or comma to add. Link GitHub to import them automatically.">
                            <SkillsInput value={formData.skills} onChange={(skills) => set("skills", skills)} />
                        </Field>
                    </Section>

                    <Section title="Coding profiles" description="Show off your competitive programming and practice history.">
                        <div className="grid gap-4 sm:grid-cols-2">
                            {EDITABLE_LINKS.map(({ key, label, icon: Icon, color, placeholder }) => (
                                <Field key={key} label={label} htmlFor={key} error={fieldErrors[key]}>
                                    <div className="relative">
                                        <span className={cn("pointer-events-none absolute left-2 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-md", color)}>
                                            <Icon className="h-3.5 w-3.5" />
                                        </span>
                                        <Input id={key} name={key} type="url" className="pl-10" placeholder={placeholder} value={formData[key]} onChange={handleInputChange} aria-invalid={!!fieldErrors[key]} />
                                    </div>
                                </Field>
                            ))}
                        </div>
                    </Section>

                    <Section title="Integrations" description="Connected accounts boost your credibility and visibility.">
                        <div className="grid gap-3">
                            <Integration
                                icon={Github}
                                name="GitHub"
                                iconClass="bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                                connected={!!user.githubId}
                                connectedLabel={user.githubUsername ? `@${user.githubUsername}` : "Linked"}
                                description="We analyse your repositories to detect your top languages."
                                onConnect={() => (window.location.href = BASE_URL + "/auth/github")}
                                href={user.githubProfileUrl}
                            />
                            <Integration
                                icon={Linkedin}
                                name="LinkedIn"
                                iconClass="bg-[#0a66c2] text-white"
                                connected={!!user.isLinkedInVerified}
                                connectedLabel="Verified"
                                description="Get a verified badge and priority placement in feeds."
                                onConnect={() => (window.location.href = BASE_URL + "/auth/linkedin")}
                                href={user.linkedinProfileUrl}
                            />
                        </div>
                    </Section>

                    {error && (
                        <div role="alert" className="flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
                            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                            {error}
                        </div>
                    )}

                    {/* Spacer so the floating save bar never covers the last section */}
                    <div className="h-16" aria-hidden="true" />
                </form>

                {/* Preview */}
                <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
                    <div>
                        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Live preview</p>
                        <div className="mx-auto aspect-[3/4] max-w-[340px]">
                            <UserCard user={previewUser} />
                        </div>
                    </div>

                    <div className="rounded-2xl border bg-card p-5">
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-semibold">Profile strength</p>
                            <span className="text-sm font-semibold text-primary">{completeness.percent}%</span>
                        </div>
                        <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
                            <div
                                className="h-full rounded-full bg-gradient-to-r from-rose-500 to-pink-500 transition-all duration-500"
                                style={{ width: `${completeness.percent}%` }}
                            />
                        </div>
                        <ul className="mt-4 space-y-2">
                            {completeness.checks.map((c) => (
                                <li key={c.label} className={cn("flex items-center gap-2 text-sm", c.done ? "text-foreground" : "text-muted-foreground")}>
                                    <span className={cn("flex h-4 w-4 items-center justify-center rounded-full", c.done ? "bg-emerald-500 text-white" : "border")}>
                                        {c.done && <Check className="h-3 w-3" strokeWidth={3} />}
                                    </span>
                                    {c.label}
                                </li>
                            ))}
                        </ul>
                        {user.isLinkedInVerified && (
                            <p className="mt-4 flex items-center gap-1.5 text-xs text-sky-600 dark:text-sky-400">
                                <BadgeCheck className="h-4 w-4" /> You're a verified professional
                            </p>
                        )}
                    </div>
                </aside>
            </div>

            {/* Floating save bar */}
            <div
                className={cn(
                    "fixed inset-x-0 bottom-20 z-40 flex justify-center px-4 transition-all duration-300 md:bottom-6",
                    isDirty ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
                )}
                aria-hidden={!isDirty}
            >
                <div className="flex w-full max-w-lg items-center gap-3 rounded-2xl border bg-popover/95 p-2 pl-4 shadow-2xl shadow-black/20 backdrop-blur">
                    <span className="flex-1 text-sm font-medium">Unsaved changes</span>
                    <Button type="button" variant="ghost" size="sm" onClick={() => { setFormData(initial); setFieldErrors({}); setError(""); }} disabled={saving} tabIndex={isDirty ? 0 : -1}>
                        <RotateCcw /> Discard
                    </Button>
                    <Button type="submit" form="profile-form" size="sm" loading={saving} tabIndex={isDirty ? 0 : -1}>
                        {!saving && <Save />} Save changes
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
