import { Outlet, Route, Routes } from "react-router";
import ServiceDetailHeader from "./partials/ServiceDetailHeader";
import EditService from "./edit-service/EditService";
import EditSVariables from "./edit-s-variables/EditSVariables";



const ServiceDetail = () => {



    return (

        <Routes>
            <Route
                element={
                    <>
                        <ServiceDetailHeader />
                        <Outlet />
                    </>
                }
            >
                <Route
                    path='duzenle'
                    element={
                        <EditService />
                    }
                />
                <Route
                    path='degiskenler'
                    element={
                        <EditSVariables />
                    }
                />
            </Route>
        </Routes>
    );
};

export default ServiceDetail;
