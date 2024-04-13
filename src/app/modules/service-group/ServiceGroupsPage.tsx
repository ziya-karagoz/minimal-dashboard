import { Route, Routes } from "react-router";
import ServiceGroupList from "./service-group-list/ServiceGroupList";
import AddServiceGroup from "./add-service-group/AddServiceGroup";
import ServiceGroupDetail from "./service-group-detail/ServiceGroupDetail";
import Breadcrumb from "@base/components/common/breadcrumbs/BreadCrumb";

const ServiceGroupPage = () => {


    return (
        <Routes>
            <Route
                path="/"
                element={
                    <>
                        <Breadcrumb
                            items={[
                                {
                                    link: "/",
                                    name: "Anasayfa",
                                },
                                {
                                    link: "/hizmet-gruplari",
                                    name: "Hizmet Grupları",
                                },

                            ]}
                            color="red"
                            style="solid"
                        />
                        <ServiceGroupList />
                    </>
                }
            />
            <Route
                path="/ekle"
                element={
                    <>
                        <Breadcrumb
                            items={[
                                {
                                    link: "/",
                                    name: "Anasayfa",
                                },
                                {
                                    link: "/hizmet-gruplari",
                                    name: "Hizmet Grupları",
                                },
                                {
                                    link: "/hizmet-gruplari/ekle",
                                    name: "Hizmet Grubu Ekle",
                                },
                            ]}
                            color="red"
                            style="solid"
                        />
                        <AddServiceGroup />
                    </>
                }
            />
            <Route
                path="/detay/:id/*"
                element={
                    <>
                        <Breadcrumb
                            items={[
                                {
                                    link: "/",
                                    name: "Anasayfa",
                                },
                                {
                                    link: "/hizmet-gruplari",
                                    name: "Hizmet Grupları",
                                },
                                {
                                    disabled: true,
                                    link: "/hizmet-gruplari/duzenle/:id",
                                    name: "Hizmet Grubu Detay",
                                },
                            ]}
                            color="red"
                            style="solid"
                        />
                        <ServiceGroupDetail />
                    </>
                }
            />

        </Routes >
    );
};

export default ServiceGroupPage;
