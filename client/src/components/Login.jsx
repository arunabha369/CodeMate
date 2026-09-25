import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, AlertCircle, Check, ArrowLeft, Github, BadgeCheck, MessageSquare } from "lucide-react";
import { addUser } from "../store/userSlice";
import { showToast } from "../store/toastSlice";
import { BASE_URL } from "../utils/constants";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Logo } from "./ui/logo";
import { ModeToggle } from "./mode-toggle";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { cn, getErrorMessage } from "../lib/utils";

// Mirrors the server's validator.isStrongPassword defaults.
const passwordRules = [
    { label: "8+ characters", test: (p) => p.length >= 8 },
    { label: "Uppercase letter", test: (p) => /[A-Z]/.test(p) },
    { label: "Lowercase letter", test: (p) => /[a-z]/.test(p) },
    { label: "Number", test: (p) => /\d/.test(p) },
    { label: "Symbol", test: (p) => /[^A-Za-z0-9]/.test(p) },
];

const GoogleIcon = () => (
    <svg viewBox="0 0 24 24" aria-hidden="true">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" />
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z" />
        <path fill="#FBBC05" d="M5.84 14.1A6.6 6.6 0 0 1 5.5 12c0-.73.13-1.44.34-2.1V7.06H2.18A11 11 0 0 0 1 12c0 1.78.43 3.45 1.18 4.94l3.66-2.84z" />
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.06l3.66 2.84C6.71 7.3 9.14 5.38 12 5.38z" />
    </svg>
);

const highlights = [
    { icon: Github, title: "Import skills from GitHub", desc: "Your repos speak for you — we detect your top languages." },
    { icon: BadgeCheck, title: "Get verified with LinkedIn", desc: "Stand out with a badge and rank higher in feeds." },
    { icon: MessageSquare, title: "Chat in real time", desc: "Connect with mutual matches and start planning instantly." },
];

const Login = () => {
    const location = useLocation();
    const [isLoginForm, setIsLoginForm] = useState(location.state?.mode !== "signup");
    const [form, setForm] = useState({ firstName: "", lastName: "", emailId: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [fieldErrors, setFieldErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useDocumentTitle(isLoginForm ? "Sign in" : "Create account");

    const update = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        if (fieldErrors[e.target.name]) setFieldErrors({ ...fieldErrors, [e.target.name]: undefined });
    };

    const switchMode = () => {
        setIsLoginForm(!isLoginForm);
        setError("");
        setFieldErrors({});
    };

    const validate = () => {
        const errs = {};
        if (!isLoginForm) {
            if (form.firstName.trim().length < 4) errs.firstName = "At least 4 characters";
            if (!form.lastName.trim()) errs.lastName = "Required";
            if (!passwordRules.every((r) => r.test(form.password))) errs.password = "Password doesn't meet all requirements";
        }
        if (!/^\S+@\S+\.\S+$/.test(form.emailId)) errs.emailId = "Enter a valid email address";
        if (isLoginForm && !form.password) errs.password = "Enter your password";
        setFieldErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        if (!validate()) return;
        setLoading(true);
        try {
            if (isLoginForm) {
                const res = await axios.post(
                    BASE_URL + "/login",
                    { emailId: form.emailId, password: form.password },
                    { withCredentials: true }
                );
                dispatch(addUser(res.data));
                dispatch(showToast({ message: `Welcome back, ${res.data.firstName}!`, type: "success" }));
                navigate(location.state?.from || "/", { replace: true });
            } else {
                const res = await axios.post(
                    BASE_URL + "/signup",
                    {
                        firstName: form.firstName.trim(),
                        lastName: form.lastName.trim(),
                        emailId: form.emailId,
                        password: form.password,
                    },
                    { withCredentials: true }
                );
                dispatch(addUser(res.data.data));
                dispatch(showToast({ message: "Account created!", description: "Complete your profile to get better matches.", type: "success" }));
                navigate("/profile", { replace: true });
            }
        } catch (err) {
            setError(getErrorMessage(err));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="grid min-h-screen lg:grid-cols-2">
            {/* Form */}
            <div className="flex flex-col px-4 py-6 sm:px-8">
                <div className="flex items-center justify-between">
                    <Link to="/" aria-label="CodeMate home"><Logo /></Link>
                    <div className="flex items-center gap-1">
                        <Button asChild variant="ghost" size="sm" className="text-muted-foreground">
                            <Link to="/"><ArrowLeft /> Home</Link>
                        </Button>
                        <ModeToggle />
                    </div>
                </div>

                <div className="flex flex-1 items-center justify-center py-10">
                    <div key={isLoginForm ? "login" : "signup"} className="w-full max-w-sm animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <div className="mb-8">
                            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                                {isLoginForm ? "Welcome back" : "Create your account"}
                            </h1>
                            <p className="mt-2 text-sm text-muted-foreground">
                                {isLoginForm ? "Sign in to continue finding your coding partner." : "Join CodeMate and meet developers who build like you."}
                            </p>
                        </div>

                        <Button
                            type="button"
                            variant="outline"
                            size="lg"
                            className="w-full"
                            onClick={() => window.open(BASE_URL + "/auth/google", "_self")}
                        >
                            <GoogleIcon /> Continue with Google
                        </Button>

                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-background px-3 text-muted-foreground">or with email</span>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} noValidate className="space-y-4">
                            {!isLoginForm && (
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="space-y-2">
                                        <Label htmlFor="firstName">First name</Label>
                                        <Input id="firstName" name="firstName" autoComplete="given-name" placeholder="Ada" value={form.firstName} onChange={update} aria-invalid={!!fieldErrors.firstName} />
                                        {fieldErrors.firstName && <p className="text-xs text-destructive">{fieldErrors.firstName}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="lastName">Last name</Label>
                                        <Input id="lastName" name="lastName" autoComplete="family-name" placeholder="Lovelace" value={form.lastName} onChange={update} aria-invalid={!!fieldErrors.lastName} />
                                        {fieldErrors.lastName && <p className="text-xs text-destructive">{fieldErrors.lastName}</p>}
                                    </div>
                                </div>
                            )}

                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" name="emailId" type="email" icon={Mail} autoComplete="email" placeholder="you@example.com" value={form.emailId} onChange={update} aria-invalid={!!fieldErrors.emailId} autoFocus />
                                {fieldErrors.emailId && <p className="text-xs text-destructive">{fieldErrors.emailId}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        icon={Lock}
                                        autoComplete={isLoginForm ? "current-password" : "new-password"}
                                        placeholder={isLoginForm ? "Your password" : "Create a strong password"}
                                        value={form.password}
                                        onChange={update}
                                        className="pr-10"
                                        aria-invalid={!!fieldErrors.password}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword((s) => !s)}
                                        className="absolute right-1 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground"
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                    >
                                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </button>
                                </div>
                                {!isLoginForm && (
                                    <ul className="grid grid-cols-2 gap-x-3 gap-y-1 pt-1">
                                        {passwordRules.map((r) => {
                                            const ok = r.test(form.password);
                                            return (
                                                <li key={r.label} className={cn("flex items-center gap-1.5 text-xs transition-colors", ok ? "text-emerald-600 dark:text-emerald-400" : "text-muted-foreground")}>
                                                    <Check className={cn("h-3 w-3", !ok && "opacity-30")} /> {r.label}
                                                </li>
                                            );
                                        })}
                                    </ul>
                                )}
                                {fieldErrors.password && isLoginForm && <p className="text-xs text-destructive">{fieldErrors.password}</p>}
                            </div>

                            {error && (
                                <div role="alert" className="flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive animate-in fade-in">
                                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                                    <span>{error}</span>
                                </div>
                            )}

                            <Button type="submit" variant="gradient" size="lg" className="w-full" loading={loading}>
                                {isLoginForm ? "Sign in" : "Create account"}
                            </Button>
                        </form>

                        <p className="mt-6 text-center text-sm text-muted-foreground">
                            {isLoginForm ? "New to CodeMate? " : "Already have an account? "}
                            <button type="button" onClick={switchMode} className="font-medium text-primary underline-offset-4 hover:underline">
                                {isLoginForm ? "Create an account" : "Sign in"}
                            </button>
                        </p>
                    </div>
                </div>
            </div>

            {/* Brand panel */}
            <div className="relative hidden overflow-hidden bg-gradient-to-br from-rose-600 via-pink-600 to-violet-700 lg:flex lg:flex-col lg:justify-center lg:p-16">
                <div className="absolute inset-0 bg-grid opacity-10" />
                <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
                <div className="relative max-w-md text-white">
                    <h2 className="text-4xl font-bold tracking-tight text-balance">Build with people who get your stack.</h2>
                    <p className="mt-4 text-lg text-white/80">CodeMate is where developers find co-founders, hackathon teammates and side-project partners.</p>
                    <ul className="mt-10 space-y-6">
                        {highlights.map(({ icon: Icon, title, desc }) => (
                            <li key={title} className="flex gap-4">
                                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15 backdrop-blur">
                                    <Icon className="h-5 w-5" />
                                </span>
                                <div>
                                    <p className="font-semibold">{title}</p>
                                    <p className="text-sm text-white/75">{desc}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};
export default Login;
