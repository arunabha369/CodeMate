import { useState } from "react";
// import axios from "axios";
// import { useDispatch } from "react-redux";
// import { addUser } from "../store/userSlice";
// import { BASE_URL } from "../utils/constants";
// import { useNavigate } from "react-router-dom";

const Login = () => {
    const [isSignInForm, setIsSignInForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // const dispatch = useDispatch();
    // const navigate = useNavigate();

    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm);
        setErrorMessage(null);
    };

    const handleButtonClick = async () => {
        // Validate the form data
        // For now just console log
        console.log(email, password);
        // Implement API call here
    };

    return (
        <div className="flex justify-center my-10 w-full">
            <div className="card w-96 bg-base-100 shadow-xl border border-base-300">
                <div className="card-body">
                    <h2 className="card-title justify-center text-3xl font-bold mb-4">{isSignInForm ? "Login" : "Sign Up"}</h2>

                    {!isSignInForm && (
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Full Name</span>
                            </label>
                            <input type="text" placeholder="John Doe" className="input input-bordered w-full max-w-xs" />
                        </div>
                    )}

                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Email Id</span>
                        </label>
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="test@example.com"
                            className="input input-bordered w-full max-w-xs"
                        />
                    </div>

                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="password"
                            className="input input-bordered w-full max-w-xs"
                        />
                    </div>

                    <p className="text-red-500 font-bold text-lg py-2">{errorMessage}</p>

                    <div className="card-actions justify-center mt-4">
                        <button className="btn btn-primary w-full" onClick={handleButtonClick}>
                            {isSignInForm ? "Login" : "Sign Up"}
                        </button>
                    </div>

                    <p className="py-4 cursor-pointer hover:underline text-center" onClick={toggleSignInForm}>
                        {isSignInForm ? "New to CodeMate? Sign Up Now" : "Already registered? Login Now"}
                    </p>
                </div>
            </div>
        </div>
    );
};
export default Login;
