import { Route, Routes } from "react-router";
import UserSettingList from "./user-settting-list/UserSettingList";
import EditUserSetting from "./edit-user-setting/EditUserSetting";
import Breadcrumb from "@base/components/common/breadcrumbs/BreadCrumb";

const SettingsPage = () => {
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
                                    link: "/ayarlar/kullanici",
                                    name: "Kullanıcı Ayarları",
                                },

                            ]}
                            color="red"
                            style="solid"
                        />
                        <UserSettingList />
                    </>
                }
            ></Route>

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
                                    link: "/ayarlar/kullanici",
                                    name: "Kullanıcı Ayarları",
                                },
                                {
                                    disabled: true,
                                    link: "/ayarlar/kullanici/duzenle/:id",
                                    name: "Kullanıcı Ayarı Düzenle",
                                },

                            ]}
                            color="red"
                            style="solid"
                        />
                        <EditUserSetting />
                    </>
                }
            ></Route>
        </Routes>
    );
};

export default SettingsPage;
