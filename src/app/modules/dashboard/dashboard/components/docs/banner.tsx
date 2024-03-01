import Banner from '@base/components/common/banners/Banner'
import { Icon } from '@iconify/react/dist/iconify.js'
import { ReactElement, useState } from 'react'

const CBanner = () => {

    const pool: ReactElement[] = [
        <Banner color='blue' dismissible={true} icon={<Icon icon="bi:info-circle" className="w-5 h-5" />} onDismiss={() => console.log('dismissed')} dismissIcon={<Icon icon="bi:x" className="w-4 h-4" />}>
            <p >This is a dismissible banner.</p>
        </Banner>,
        <Banner color='gray' dismissible={true} icon={<Icon icon="bi:info-circle" className="w-5 h-5" />} onDismiss={() => console.log('dismissed')} dismissIcon={<Icon icon="bi:x" className="w-4 h-4" />}>
            <p >This is a dismissible banner.</p>
        </Banner>,
        <Banner color='red' dismissible={true} icon={<Icon icon="bi:info-circle" className="w-5 h-5" />} onDismiss={() => console.log('dismissed')} dismissIcon={<Icon icon="bi:x" className="w-4 h-4" />}>
            <p >This is a dismissible banner.</p>
        </Banner>,
        <Banner color='green' dismissible={true} icon={<Icon icon="bi:info-circle" className="w-5 h-5" />} onDismiss={() => console.log('dismissed')} dismissIcon={<Icon icon="bi:x" className="w-4 h-4" />}>
            <p >This is a dismissible banner.</p>
        </Banner>,
        <Banner color='yellow' dismissible={true} icon={<Icon icon="bi:info-circle" className="w-5 h-5" />} onDismiss={() => console.log('dismissed')} dismissIcon={<Icon icon="bi:x" className="w-4 h-4" />}>
            <p >This is a dismissible banner.</p>
        </Banner>,
        <Banner color='indigo' dismissible={true} icon={<Icon icon="bi:info-circle" className="w-5 h-5" />} onDismiss={() => console.log('dismissed')} dismissIcon={<Icon icon="bi:x" className="w-4 h-4" />}>
            <p >This is a dismissible banner.</p>
        </Banner>,
        <Banner color='purple' dismissible={true} icon={<Icon icon="bi:info-circle" className="w-5 h-5" />} onDismiss={() => console.log('dismissed')} dismissIcon={<Icon icon="bi:x" className="w-4 h-4" />}>
            <p >This is a dismissible banner.</p>
        </Banner>,
        <Banner color='pink' dismissible={true} icon={<Icon icon="bi:info-circle" className="w-5 h-5" />} onDismiss={() => console.log('dismissed')} dismissIcon={<Icon icon="bi:x" className="w-4 h-4" />}>
            <p >This is a dismissible banner.</p>
        </Banner>,
        <Banner color='orange' dismissible={true} icon={<Icon icon="bi:info-circle" className="w-5 h-5" />} onDismiss={() => console.log('dismissed')} dismissIcon={<Icon icon="bi:x" className="w-4 h-4" />}>
            <p >This is a dismissible banner.</p>
        </Banner>
    ]

    const [selectedBanner, setSelectedBanner] = useState<ReactElement | null>(null);

    const activateRandomBanner = () => {
        const randomIndex = Math.floor(Math.random() * pool.length);
        setSelectedBanner(pool[randomIndex]);
    };


    return (
        <>
            <div className='ms-4 mb-4'>
                <h5 className="mb-2 text-gray-600 text-xl">Activate Random Banner</h5>
                <div>
                    <button className='bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300' onClick={activateRandomBanner}>Activate Random Banner</button>
                </div>
                {selectedBanner}
            </div>
        </>
    )
}

export default CBanner