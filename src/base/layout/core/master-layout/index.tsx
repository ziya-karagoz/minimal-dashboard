import { Outlet } from "react-router-dom";
import React from "react";
import { useAuth } from "@app/modules/auth";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

/**
 * @author ziyakaragoz
 * Yazilacak butun componentlerin ust yapisidir.
 * Ornegin header, footer, sidebar gibi componentlerin hepsi bu componentin icinde olacak.
 * bu componentin bir ustunde intl provider oldugu icin bu
 * componentin ustundeki componentlerde react-intl metodlari kullanilamaz.
 */

const MasterLayout = () => {
    const { currentUser } = useAuth();

    if (!currentUser) return <Outlet />;
    return (
        <React.Fragment>
            <div className="flex">
                <Sidebar />
                <div className="min-h-screen flex-1">
                    <Header />
                    <div className=" p-7">
                        <Outlet />
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export { MasterLayout };
