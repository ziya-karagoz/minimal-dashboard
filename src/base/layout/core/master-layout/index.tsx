import { Outlet } from "react-router-dom";
import React from "react";
import { useAuth } from "@app/modules/auth";
import AuthedLayout from "../AuthedLayout";

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
            <AuthedLayout />
        </React.Fragment>
    );
};

export { MasterLayout };
