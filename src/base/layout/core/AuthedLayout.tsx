import { Outlet } from "react-router";
import Sidebar from "./master-layout/components/Sidebar";
import Header from "./master-layout/components/Header";
const AuthedLayout = () => {
    return (
        <div className="flex">
            <Sidebar />
            <div className="min-h-screen flex-1">
                <Header />
                <div className=" p-7">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};
export default AuthedLayout;
