import { Route, Routes } from "react-router";
import EcommerceSettings from "./ecommerce-settings/EcommerceSettings";
import UserSettings from "./user-settings/UserSettingsPage";
import SystemSettings from "./system-settings/SystemSettings";
import Breadcrumb from "@base/components/common/breadcrumbs/Breadcrumb";

const SettingsPage = () => {
    return (
        <Routes>
            <Route
                path="/sistem"
                element={
                    <>
                        <Breadcrumb
                            items={[
                                {
                                    link: "/",
                                    name: "Anasayfa",
                                },
                                {
                                    link: "/ayarlar/sistem",
                                    name: "Sistem Ayarları",
                                },

                            ]}
                            color="red"
                            style="solid"
                        />
                        <SystemSettings />
                    </>
                }
            ></Route>
            <Route
                path="e-ticaret"
                element={
                    <>
                        <Breadcrumb
                            items={[
                                {
                                    link: "/",
                                    name: "Anasayfa",
                                },
                                {
                                    link: "/ayarlar/e-ticaret",
                                    name: "E-Ticaret Ayarları",
                                },

                            ]}
                            color="red"
                            style="solid"
                        />
                        <EcommerceSettings />
                    </>
                }
            ></Route>
            <Route
                path="kullanici/*"
                element={
                    <>

                        <UserSettings />
                    </>
                }
            ></Route>
        </Routes>
    );
};

export default SettingsPage;
