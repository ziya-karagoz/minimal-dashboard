import { Route, Routes } from 'react-router'
import BankList from './bank-list/BankList'
import AddBank from './add-bank/AddBank'
import EditBank from './edit-bank/Editbank'
import Breadcrumb from '@base/components/common/breadcrumbs/BreadCrumb'

const BanksPage = () => {
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
                                    link: "/on-tanimlamalar/bankalar",
                                    name: "Bankalar",
                                },

                            ]}
                            color="red"
                            style="solid"
                        />
                        <BankList />
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
                                    link: "/on-tanimlamalar/bankalar",
                                    name: "Bankalar",
                                },
                                {
                                    link: "/on-tanimlamalar/bankalar/ekle",
                                    name: "Banka Ekle",
                                },
                            ]}
                            color="red"
                            style="solid"
                        />
                        <AddBank />
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
                                    link: "/on-tanimlamalar/bankalar",
                                    name: "Bankalar",
                                },
                                {
                                    disabled: true,
                                    link: "/on-tanimlamalar/bankalar/duzenle/:id",
                                    name: "Banka Düzenle",
                                },
                            ]}
                            color="red"
                            style="solid"
                        />
                        <EditBank />
                    </>
                }
            />
        </Routes>
    )
}

export default BanksPage