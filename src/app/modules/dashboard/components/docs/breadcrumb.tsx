import Breadcrumb from '@base/components/common/breadcrumbs/BreadCrumb'
import { Icon } from '@iconify/react/dist/iconify.js'
import React from 'react'




const CBreadcrumb = () => {
    return (
        <>
            <div className='ms-4 mb-4'>
                <h5 className="mb-2 text-gray-600 text-xl">Default</h5>
                <div>
                    <Breadcrumb
                        style="default"
                        items={[
                            {
                                name: "Dashboard",
                                icon: <Icon icon="bx:bx-home" />,
                                link: "/dashboard",
                            },
                            {
                                name: "Components",
                                icon: <Icon icon="bx:bx-cog" />,
                                link: "/dashboard/components",
                            },
                        ]}
                    />
                </div>
            </div>
            <div className='ms-4 mb-4'>
                <h5 className="mb-2 text-gray-600 text-xl">Solid</h5>
                <div>
                    <Breadcrumb
                        style="solid"
                        items={[
                            {
                                name: "Dashboard",
                                icon: <Icon icon="bx:bx-home" />,
                                link: "/dashboard",
                            },
                            {
                                name: "Components",
                                icon: <Icon icon="bx:bx-cog" />,
                                link: "/dashboard/components",
                            },
                        ]}
                    />
                </div>
            </div>
        </>
    )
}

export default CBreadcrumb