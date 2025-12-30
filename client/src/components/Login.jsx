import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";
import { useNavigate, Link } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import logo from "../assets/logo.png";

const Login = () => {
    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [isLoginForm, setIsLoginForm] = useState(true);
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const res = await axios.post(
                BASE_URL + "/login",
                {
                    emailId,
                    password,
                },
                { withCredentials: true }
            );
            dispatch(addUser(res.data));
            return navigate("/");
        } catch (err) {
            setError(err?.response?.data || "Something went wrong");
        }
    };

    const handleSignUp = async () => {
        try {
            const res = await axios.post(
                BASE_URL + "/signup",
                { firstName, lastName, emailId, password },
                { withCredentials: true }
            );
            dispatch(addUser(res.data.data));
            return navigate("/profile");
        } catch (err) {
            setError(err?.response?.data || "Something went wrong");
        }
    };

    return (
        <div className="w-full min-h-screen flex items-center justify-center lg:grid lg:grid-cols-2 bg-black text-white selection:bg-rose-500/30">
            {/* Left Side - Form */}
            <div className="flex items-center justify-center p-8 lg:p-12">
                <div className="mx-auto w-full max-w-[450px] space-y-6 animate-in fade-in slide-in-from-left-8 duration-700">
                    <div className="flex flex-col space-y-2 text-center lg:text-left">
                        <Link to="/" className="mb-8 mx-auto lg:mx-0">
                            <img src={logo} alt="CodeMate" className="h-12 w-auto" />
                        </Link>
                        <h1 className="text-3xl font-bold tracking-tight text-white">
                            {isLoginForm ? "Welcome back" : "Create an account"}
                        </h1>
                        <p className="text-muted-foreground">
                            {isLoginForm ? "Please enter your details to sign in." : "Enter your information to get started"}
                        </p>
                    </div>

                    <div className="space-y-4">
                        {!isLoginForm && (
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName">First Name</Label>
                                    <Input
                                        id="firstName"
                                        placeholder="John"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        className="bg-zinc-900/50 border-white/10"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <Input
                                        id="lastName"
                                        placeholder="Doe"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        className="bg-zinc-900/50 border-white/10"
                                    />
                                </div>
                            </div>
                        )}

                        <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="name@example.com"
                                value={emailId}
                                onChange={(e) => setEmailId(e.target.value)}
                                className="bg-zinc-900/50 border-white/10"
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password">Password</Label>
                                {isLoginForm && (
                                    <Link to="#" className="text-sm font-medium text-rose-400 hover:text-rose-300">
                                        Forgot password?
                                    </Link>
                                )}
                            </div>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="bg-zinc-900/50 border-white/10"
                            />
                        </div>

                        {error && <div className="text-red-400 text-sm bg-red-950/20 p-2 rounded border border-red-900/50 text-center">{error}</div>}

                        <Button className="w-full bg-rose-600 hover:bg-rose-500 h-11 text-base shadow-lg shadow-rose-900/20" onClick={isLoginForm ? handleLogin : handleSignUp}>
                            {isLoginForm ? "Sign in" : "Create account"}
                        </Button>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-white/10" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-black px-2 text-muted-foreground">Or continue with</span>
                            </div>
                        </div>

                        <Button variant="outline" className="w-full border-white/10 hover:bg-white/5 hover:text-white" onClick={() => window.open(BASE_URL + "/auth/google", "_self")}>
                            <svg className="h-5 w-5 mr-2" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                                <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                            </svg>
                            Google
                        </Button>

                        <div className="text-center text-sm text-muted-foreground mt-4">
                            {isLoginForm ? "Don't have an account? " : "Already have an account? "}
                            <span
                                className="font-medium text-rose-400 hover:text-rose-300 cursor-pointer underline-offset-4 hover:underline"
                                onClick={() => {
                                    setIsLoginForm(!isLoginForm);
                                    setError("");
                                }}
                            >
                                {isLoginForm ? "Sign up" : "Sign in"}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Image */}
            <div className="hidden lg:flex flex-col relative bg-muted text-white">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10" />
                <img
                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop"
                    alt="Corporate Architecture"
                    className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="relative z-20 mt-auto p-12 max-w-2xl">
                    <blockquote className="space-y-2">
                        <p className="text-xl font-medium leading-relaxed">
                            &ldquo;CodeMate has completely transformed how match with other developers. It&apos;s intuitive, powerful, and truly connects you with the right people.&rdquo;
                        </p>
                        <footer className="text-sm text-rose-400 font-semibold">
                            Sofia Davis, Full Stack Developer
                        </footer>
                    </blockquote>
                </div>
            </div>
        </div>
    );
};
export default Login;
