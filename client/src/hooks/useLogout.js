import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../store/userSlice";
import { clearFeed } from "../store/feedSlice";
import { clearRequests } from "../store/requestSlice";
import { removeConnection } from "../store/connectionSlice";
import { showToast } from "../store/toastSlice";

export function useLogout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return async () => {
        try {
            await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
        } catch (err) {
            console.error("Logout failed:", err);
        } finally {
            // Drop everything cached for this account so the next sign-in starts clean.
            dispatch(removeUser());
            dispatch(clearFeed());
            dispatch(clearRequests());
            dispatch(removeConnection());
            dispatch(showToast({ message: "You've been signed out", type: "info" }));
            navigate("/login");
        }
    };
}
