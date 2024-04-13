import { Route, Routes } from "react-router";
import ContactList from "./contact-list/ContactList";
import ContactDetail from "./contact-detail/ContactDetail";
import Breadcrumb from "@base/components/common/breadcrumbs/Breadcrumb";

const ContactPage = () => {
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
                                    link: "/istekler",
                                    name: "Kullanıcı İstekleri",
                                },
                            ]}
                            color="red"
                            style="solid"
                        />
                        <ContactList />
                    </>
                }
            ></Route>
            <Route
                path="detay/:id"
                element={
                    <>
                        <Breadcrumb
                            items={[
                                {
                                    link: "/",
                                    name: "Anasayfa",
                                },
                                {
                                    link: "/istekler",
                                    name: "Kullanıcı İstekleri",
                                },
                                {
                                    disabled: true,
                                    link: "/istekler/detay/:id",
                                    name: "Kullanıcı İstekleri",
                                },
                            ]}
                            color="red"
                            style="solid"
                        />
                        <ContactDetail />
                    </>
                }
            ></Route>
        </Routes>
    );
};

export default ContactPage;
