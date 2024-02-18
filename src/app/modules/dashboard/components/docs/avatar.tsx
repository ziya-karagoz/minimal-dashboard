import Avatar from '@base/components/common/avatars/Avatar'

const CAvatar = () => {
    return (
        <>
            <div className='ms-4 mb-4'>
                <h5 className="mb-2 text-gray-600 text-xl">Sizes</h5>
                <div className="flex items-center space-x-4">
                    <Avatar
                        size="xs"
                        initial='ZK'
                        shape="rounded"
                        src="/media/avatars/300-1.jpg"
                        alt="User's Name"
                        bordered
                    />
                    <Avatar
                        size="sm"
                        initial='ZK'
                        shape="circle"
                        src="/media/avatars/300-2.jpg"
                        alt="User's Name"
                    />
                    <Avatar
                        size="md"
                        initial='ZK'
                        src="/media/avatars/300-3.jpg"
                        shape="rounded"
                        alt="User's Name"
                        bordered
                    />
                    <Avatar
                        size="lg"
                        initial='ZK'
                        src="/media/avatars/300-4.jpg"
                        shape="circle"
                        alt="User's Name"
                    />
                    <Avatar
                        size="xl"
                        initial='ZK'
                        shape="rounded"
                        src="/media/avatars/300-5.jpg"
                        alt="User's Name"
                        bordered
                    />
                </div>
            </div>
            <div className='ms-4 mb-4'>
                <h5 className="mb-2 text-gray-600 text-xl">Default | Bordered & Indicated | Initial | Rounded</h5>
                <div className="flex items-center space-x-4">
                    <Avatar
                        size="lg"
                        initial='ZK'
                        shape="circle"
                        src="/media/avatars/300-6.jpg"
                        alt="User's Name"
                    />
                    <Avatar
                        size="lg"
                        initial='ZK'
                        shape="circle"
                        bordered
                        indicator={{ color: 'blue', position: "top-left" }}
                        src="/media/avatars/300-7.jpg"
                        alt="User's Name"
                    />
                    <Avatar
                        size="lg"
                        initial='ZK'
                        shape="circle"
                        alt="User's Name"
                    />
                    <Avatar
                        size="lg"
                        initial='ZK'
                        shape="rounded"
                        alt="User's Name"
                    />
                </div>
            </div>
            <div className='ms-4 mb-4'>
                <h5 className="mb-2 text-gray-600 text-xl">Stacked</h5>
                <div className="flex items-center space-x-4">
                    <div className="flex -space-x-4">
                        <Avatar
                            size="lg"
                            initial='ZK'
                            shape="circle"
                            src="/media/avatars/300-8.jpg"
                            alt="User's Name"

                        />
                        <Avatar
                            size="lg"
                            initial='ZK'
                            shape="circle"
                            src="/media/avatars/300-9.jpg"
                            alt="User's Name"

                        />
                        <Avatar
                            size="lg"
                            initial='ZK'
                            shape="circle"
                            src="/media/avatars/300-10.jpg"
                            alt="User's Name"

                        />
                        <Avatar
                            size="lg"
                            initial='+91'
                            shape="circle"
                            alt="User's Name"
                        />
                    </div>

                </div>
            </div>
        </>

    )
}

export default CAvatar