import { Route, Routes } from "react-router";
import SectorList from "./sector-list/SectorList";
import AddSector from "./add-sector/AddSector";
import EditSector from "./edit-sector/EditSector";
import Breadcrumb from "@base/components/common/breadcrumbs/Breadcrumb";

const SectorsPage = () => {
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
                                    link: "/on-tanimlamalar/sektorler",
                                    name: "Sektörler",
                                },
                            ]}
                            color="red"
                            style="solid"
                        />
                        <SectorList />
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
                                    link: "/on-tanimlamalar/sektorler",
                                    name: "Sektörler",
                                },
                                {
                                    link: "/on-tanimlamalar/sektorler/ekle",
                                    name: "Sektör Ekle",
                                },
                            ]}
                            color="red"
                            style="solid"
                        />
                        <AddSector />
                    </>
                }
            />
            <Route
                path="/duzenle/:id"
                element={
                    <>
                        <Breadcrumb
                            items={[
                                {
                                    link: "/",
                                    name: "Anasayfa",
                                },
                                {
                                    link: "/on-tanimlamalar/sektorler",
                                    name: "Sektörler",
                                },
                                {
                                    disabled: true,
                                    link: "/on-tanimlamalar/sektorler/duzenle/:id",
                                    name: "Sektör Düzenle",
                                },
                            ]}
                            color="red"
                            style="solid"
                        />
                        <EditSector />
                    </>
                }
            />
        </Routes>
    );
};

export default SectorsPage;
