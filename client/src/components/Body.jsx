import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";

const Body = () => {
    return (
        <div className="flex flex-col min-h-screen bg-base-200">
            <NavBar />
            <div className="flex-grow flex justify-center items-start pt-10 pb-20 px-4">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default Body;
