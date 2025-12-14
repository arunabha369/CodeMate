import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
// import { removeUser } from "../store/userSlice"; // Will be used later
// import axios from "axios";
// import { BASE_URL } from "../utils/constants";

const NavBar = () => {
    const user = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        // Implement logout logic here
        console.log("Logout clicked");
    }

    return (
        <div className="navbar bg-base-300 shadow-lg px-4 sm:px-10">
            <div className="flex-1">
                <Link to="/" className="btn btn-ghost normal-case text-xl font-bold text-primary tracking-tighter">
                    CodeMate 🚀
                </Link>
            </div>
            <div className="flex-none gap-2">
                {user ? (
                    <div className="flex items-center gap-4">
                        <div className="hidden sm:flex gap-2">
                            <Link to="/" className="btn btn-ghost btn-sm">Feed</Link>
                            <Link to="/connections" className="btn btn-ghost btn-sm">Connections</Link>
                            <Link to="/requests" className="btn btn-ghost btn-sm">Requests</Link>
                        </div>
                        <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full border border-primary">
                                    <img src={user.photoUrl || "https://geographyandyou.com/images/user-profile.png"} alt="user" />
                                </div>
                            </label>
                            <ul
                                tabIndex={0}
                                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-200 rounded-box w-52"
                            >
                                <li>
                                    <Link to="/profile" className="justify-between">
                                        Profile
                                        <span className="badge">New</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/connections">My Connections</Link>
                                </li>
                                <li>
                                    <a onClick={handleLogout}>Logout</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                ) : (
                    <div>
                        <Link to="/login" className="btn btn-primary btn-sm">
                            Login
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NavBar;
