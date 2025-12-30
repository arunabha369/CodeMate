import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";

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
        <div className="flex justify-center items-center h-[calc(100vh-100px)] animate-in fade-in zoom-in-95 duration-500">
            <Card className="w-full max-w-md relative overflow-hidden backdrop-blur-sm bg-card/80">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 rounded-full bg-primary/20 blur-2xl"></div>
                <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-32 h-32 rounded-full bg-secondary/20 blur-2xl"></div>

                <CardHeader>
                    <CardTitle className="text-3xl font-bold text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        {isLoginForm ? "Welcome Back" : "Join CodeMate"}
                    </CardTitle>
                    <CardDescription className="text-center">
                        {isLoginForm ? "Enter your credentials to access your account" : "Create an account to start matching"}
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 z-10 relative">
                    {!isLoginForm && (
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="firstName">First Name</Label>
                                <Input
                                    id="firstName"
                                    type="text"
                                    placeholder="John"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="lastName">Last Name</Label>
                                <Input
                                    id="lastName"
                                    type="text"
                                    placeholder="Doe"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </div>
                        </div>
                    )}

                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="m@example.com"
                            value={emailId}
                            onChange={(e) => setEmailId(e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {error && <p className="text-destructive text-sm font-medium text-center bg-destructive/10 py-2 rounded-md">{error}</p>}
                </CardContent>
                <CardFooter className="flex flex-col gap-4 z-10 relative">
                    <Button
                        className="w-full text-lg shadow-lg shadow-primary/20"
                        size="lg"
                        onClick={isLoginForm ? handleLogin : handleSignUp}
                    >
                        {isLoginForm ? "Login" : "Create Account"}
                    </Button>
                    <p
                        className="text-center text-sm text-muted-foreground cursor-pointer hover:text-primary transition-colors"
                        onClick={() => {
                            setIsLoginForm((value) => !value);
                            setError("");
                        }}
                    >
                        {isLoginForm
                            ? "Don't have an account? Sign up"
                            : "Already have an account? Login"}
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
};
export default Login;
