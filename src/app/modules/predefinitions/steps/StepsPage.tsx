import { Route, Routes } from 'react-router'
import StepList from './step-list/StepList'
import EditStep from './edit-step/EditStep'
import Breadcrumb from '@base/components/common/breadcrumbs/Breadcrumb'

const StepsPage = () => {
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
                                    link: "/on-tanimlamalar/adimlar",
                                    name: "Adımlar",
                                },

                            ]}
                            color="red"
                            style="solid"
                        />
                        <StepList />
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
                                    link: "/on-tanimlamalar/adimlar",
                                    name: "Adımlar",
                                },
                                {
                                    disabled: true,
                                    link: "/on-tanimlamalar/adimlar/duzenle/:id",
                                    name: "Adım Düzenle",
                                },
                            ]}
                            color="red"
                            style="solid"
                        />
                        <EditStep />
                    </>
                }
            />
        </Routes>
    )
}

export default StepsPage