import { Route, Routes } from "react-router";
import ServiceList from "./service-list/ServiceList";
import AddService from "./add-service/AddService";
import ServiceDetail from "./service-detail/ServiceDetail";
import Breadcrumb from "@base/components/common/breadcrumbs/Breadcrumb";

const ServicePage = () => {


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
                                    link: "/hizmetler",
                                    name: "Hizmetler",
                                },

                            ]}
                            color="red"
                            style="solid"
                        />
                        <ServiceList />
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
                                    link: "/hizmetler",
                                    name: "Hizmetler",
                                },
                                {
                                    link: "/hizmetler/ekle",
                                    name: "Hizmet Ekle",
                                },
                            ]}
                            color="red"
                            style="solid"
                        />
                        <AddService />
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
                                    link: "/hizmetler",
                                    name: "Hizmetler",
                                },
                                {
                                    disabled: true,
                                    link: "/hizmetler/duzenle/:id",
                                    name: "Hizmet Detay",
                                },
                            ]}
                            color="red"
                            style="solid"
                        />
                        <ServiceDetail />
                    </>
                }
            />

        </Routes >
    );
};

export default ServicePage;
