import { Route, Routes } from 'react-router'
import UnitList from './unit-list/UnitList'
import AddUnit from './add-unit/AddUnit'
import EditUnit from './edit-unit/EditUnit'
import Breadcrumb from '@base/components/common/breadcrumbs/Breadcrumb'

const UnitsPage = () => {
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
                                    link: "/on-tanimlamalar/birimler",
                                    name: "Birimler",
                                },

                            ]}
                            color="red"
                            style="solid"
                        />
                        <UnitList />
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
                                    link: "/on-tanimlamalar/birimler",
                                    name: "Birimler",
                                },
                                {
                                    link: "/on-tanimlamalar/birimler/ekle",
                                    name: "Birim Ekle",
                                },
                            ]}
                            color="red"
                            style="solid"
                        />
                        <AddUnit />
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
                                    link: "/on-tanimlamalar/birimler",
                                    name: "Birimler",
                                },
                                {
                                    disabled: true,
                                    link: "/on-tanimlamalar/birimler/duzenle/:id",
                                    name: "Birim Düzenle",
                                },
                            ]}
                            color="red"
                            style="solid"
                        />
                        <EditUnit />
                    </>
                }
            />
        </Routes>
    )
}

export default UnitsPage