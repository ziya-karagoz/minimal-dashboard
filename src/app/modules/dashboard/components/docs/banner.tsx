import Banner from '@base/components/common/banners/Banner'
import { Icon } from '@iconify/react/dist/iconify.js'
import React from 'react'

const CBanner = () => {
    return (
        <>
            <div className='ms-4 mb-4'>
                <h5 className="mb-2 text-gray-600 text-xl">Activate Random Banner</h5>
                <div>
                    <Banner dismissible={true} icon={<Icon icon="bi:info-circle" className="w-5 h-5" />} onDismiss={() => console.log('dismissed')} dissmissIcon={<Icon icon="bi:x" className="w-4 h-4" />}>
                        <p className="text-gray-500">This is a dismissible banner.</p>
                    </Banner>
                </div>
            </div>
        </>
    )
}

export default CBanner