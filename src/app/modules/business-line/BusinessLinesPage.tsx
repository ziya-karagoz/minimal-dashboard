import { Route, Routes } from "react-router";
import BusinessLineList from "./business-line-list/BusinessLineList";
import AddBusinessLine from "./add-business-line/AddBusinessLine";
import BusinessLineDetail from "./business-line-detail/BusinessLineDetail";
import Breadcrumb from "@base/components/common/breadcrumbs/Breadcrumb";

const BusinessLinePage = () => {


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
                                    link: "/is-kollari",
                                    name: "İş Kolları",
                                },

                            ]}
                            color="red"
                            style="solid"
                        />
                        <BusinessLineList />
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
                                    link: "/is-kollari",
                                    name: "İş Kolları",
                                },
                                {
                                    link: "/is-kollari/ekle",
                                    name: "İş Kolu Ekle",
                                },
                            ]}
                            color="red"
                            style="solid"
                        />
                        <AddBusinessLine />
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
                                    link: "/is-kollari",
                                    name: "İş Kolları",
                                },
                                {
                                    disabled: true,
                                    link: "/is-kollari/duzenle/:id",
                                    name: "İş Kolu Detay",
                                },
                            ]}
                            color="red"
                            style="solid"
                        />
                        <BusinessLineDetail />
                    </>
                }
            />

        </Routes >
    );
};

export default BusinessLinePage;
