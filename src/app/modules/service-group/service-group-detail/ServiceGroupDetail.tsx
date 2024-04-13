import { Outlet, Route, Routes } from "react-router";
import ServiceGroupDetailHeader from "./partials/ServiceGroupDetailHeader";
import EditServiceGroup from "./edit-service-group/EditServiceGroup";
import EditSGVariables from "./edit-sg-variables/EditSGVariables";



const ServiceGroupDetail = () => {



    return (

        <Routes>
            <Route
                element={
                    <>
                        <ServiceGroupDetailHeader />
                        <Outlet />
                    </>
                }
            >
                <Route
                    path='duzenle'
                    element={
                        <EditServiceGroup />
                    }
                />
                <Route
                    path='degiskenler'
                    element={
                        <EditSGVariables />
                    }
                />
            </Route>
        </Routes>
    );
};

export default ServiceGroupDetail;
