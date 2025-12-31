import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../store/userSlice";
import { useEffect } from "react";

const Body = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userData = useSelector((store) => store.user);

    const fetchUser = async () => {
        if (userData) return;
        try {
            const res = await axios.get(BASE_URL + "/profile/view", {
                withCredentials: true,
            });
            // Validate user data structure before dispatching
            if (res.data && res.data._id) {
                dispatch(addUser(res.data));
            } else {
                throw new Error("Invalid user data");
            }
        } catch (err) {
            console.error("Profile fetch failed:", err);
            // If authentication fails or data is invalid, ensure we're logged out
            if (err.status === 401 || err.message === "Invalid user data") {
                navigate("/login");
            }
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <div className="flex flex-col min-h-[calc(100vh-0px)]">
            <NavBar />
            <div className="flex-grow container mx-auto px-4 py-8">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};
export default Body;
