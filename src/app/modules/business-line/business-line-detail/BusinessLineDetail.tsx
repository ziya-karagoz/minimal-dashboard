import { Outlet, Route, Routes } from "react-router";
import BusinessLineDetailHeader from "./partials/BusinessLineDetailHeader";
import EditBusinessLine from "./edit-business-line/EditBusinessLine";
import EditBLVariables from "./edit-bl-variables/EditBLVariables";



const BusinessLineDetail = () => {



    return (

        <Routes>
            <Route
                element={
                    <>
                        <BusinessLineDetailHeader />
                        <Outlet />
                    </>
                }
            >
                <Route
                    path='duzenle'
                    element={
                        <EditBusinessLine />
                    }
                />
                <Route
                    path='degiskenler'
                    element={
                        <EditBLVariables />
                    }
                />
            </Route>
        </Routes>
    );
};

export default BusinessLineDetail;
