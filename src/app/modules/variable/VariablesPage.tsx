import { Route, Routes } from "react-router";
import VariableList from "./variable-list/VariableList";
import AddVariable from "./add-variable/AddVariable";
import EditVariable from "./edit-variable/EditVariable";
import VariableUsageList from "./variable-usage-list/VariableUsageList";
import Breadcrumb from "@base/components/common/breadcrumbs/BreadCrumb";

const VariablesPage = () => {
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
                                    link: "/degiskenler",
                                    name: "Değişkenler",
                                },

                            ]}
                            color="red"
                            style="solid"
                        />
                        <VariableList />
                    </>
                }
            />
            <Route
                path="ekle"
                element={
                    <>
                        <Breadcrumb
                            items={[
                                {
                                    link: "/",
                                    name: "Anasayfa",
                                },
                                {
                                    link: "/degiskenler",
                                    name: "Değişkenler",
                                },
                                {
                                    link: "/degiskenler/ekle",
                                    name: "Değişken Ekle",
                                },
                            ]}
                            color="red"
                            style="solid"
                        />
                        <AddVariable />
                    </>
                }
            />
            <Route
                path="duzenle/:id"
                element={
                    <>
                        <Breadcrumb
                            items={[
                                {
                                    link: "/",
                                    name: "Anasayfa",
                                },
                                {
                                    link: "/degiskenler",
                                    name: "Değişkenler",
                                },
                                {
                                    disabled: true,
                                    link: "/degiskenler/duzenle/:id",
                                    name: "Değişken Düzenle",
                                },
                            ]}
                            color="red"
                            style="solid"
                        />
                        <EditVariable />
                    </>
                }
            />
            <Route
                path="kullanim-alanlari/:id"
                element={
                    <>
                        <Breadcrumb
                            items={[
                                {
                                    link: "/",
                                    name: "Anasayfa",
                                },
                                {
                                    link: "/degiskenler",
                                    name: "Değişkenler",
                                },
                                {
                                    disabled: true,
                                    link: "/degiskenler/kullanim-alanlari/:id",
                                    name: "Değişken Kullanım Alanları",
                                },
                            ]}
                            color="red"
                            style="solid"
                        />
                        <VariableUsageList />
                    </>
                }
            />

        </Routes>
    );
};

export default VariablesPage;
