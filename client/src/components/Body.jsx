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
            dispatch(addUser(res.data));
        } catch (err) {
            console.error(err);
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
