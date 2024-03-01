import Badge from '@base/components/common/badge/Badge'
import { Icon } from '@iconify/react/dist/iconify.js'

const CBadge = () => {
    return (
        <>
            <div className='ms-4 mb-4'>
                <h5 className="mb-2 text-gray-600 text-xl">Colors</h5>
                <div>
                    <Badge>Blue</Badge>
                    <Badge color="gray">Gray</Badge>
                    <Badge color="red">Red</Badge>
                    <Badge color="green">Green</Badge>
                    <Badge color="yellow">Yellow</Badge>
                    <Badge color="indigo">Indigo</Badge>
                    <Badge color="purple">Purple</Badge>
                    <Badge color="pink">Pink</Badge>
                    <Badge color="orange">Orange</Badge>
                </div>
            </div>
            <div className='ms-4 mb-4'>
                <h5 className="mb-2 text-gray-600 text-xl">Bordered</h5>
                <div>
                    <Badge bordered>Blue</Badge>
                    <Badge bordered color="gray">Gray</Badge>
                    <Badge bordered color="red">Red</Badge>
                    <Badge bordered color="green">Green</Badge>
                    <Badge bordered color="yellow">Yellow</Badge>
                    <Badge bordered color="indigo">Indigo</Badge>
                    <Badge bordered color="purple">Purple</Badge>
                    <Badge bordered color="pink">Pink</Badge>
                    <Badge bordered color="orange">Orange</Badge>
                </div>
            </div>
            <div className='ms-4 mb-4'>
                <h5 className="mb-2 text-gray-600 text-xl">Pilled</h5>
                <div>
                    <Badge pill>Blue</Badge>
                    <Badge pill color="gray">Gray</Badge>
                    <Badge pill color="red">Red</Badge>
                    <Badge pill color="green">Green</Badge>
                    <Badge pill color="yellow">Yellow</Badge>
                    <Badge pill color="indigo">Indigo</Badge>
                    <Badge pill color="purple">Purple</Badge>
                    <Badge pill color="pink">Pink</Badge>
                    <Badge pill color="orange">Orange</Badge>
                </div>
            </div>
            <div className='ms-4 mb-4'>
                <h5 className="mb-2 text-gray-600 text-xl">Pilled Bordered</h5>
                <div>
                    <Badge pill bordered>Blue</Badge>
                    <Badge pill bordered color="gray">Gray</Badge>
                    <Badge pill bordered color="red">Red</Badge>
                    <Badge pill bordered color="green">Green</Badge>
                    <Badge pill bordered color="yellow">Yellow</Badge>
                    <Badge pill bordered color="indigo">Indigo</Badge>
                    <Badge pill bordered color="purple">Purple</Badge>
                    <Badge pill bordered color="pink">Pink</Badge>
                    <Badge pill bordered color="orange">Orange</Badge>
                </div>
            </div>
            <div className='ms-4 mb-4'>
                <h5 className="mb-2 text-gray-600 text-xl">With Icons - (Left | Right)</h5>
                <div>
                    <Badge pill bordered icon={<Icon icon="akar-icons:react-fill" />}>Blue</Badge>
                    <Badge pill bordered iconDirection='right' icon={<Icon icon="akar-icons:react-fill" />} color="gray">Gray</Badge>
                    <Badge pill bordered icon={<Icon icon="akar-icons:react-fill" />} color="red">Red</Badge>
                    <Badge pill bordered icon={<Icon icon="akar-icons:react-fill" />} color="green">Green</Badge>
                    <Badge pill bordered icon={<Icon icon="akar-icons:react-fill" />} color="yellow">Yellow</Badge>
                    <Badge pill bordered iconDirection='right' icon={<Icon icon="akar-icons:react-fill" />} color="indigo">Indigo</Badge>
                    <Badge pill bordered icon={<Icon icon="akar-icons:react-fill" />} color="purple">Purple</Badge>
                    <Badge pill bordered icon={<Icon icon="akar-icons:react-fill" />} color="pink">Pink</Badge>
                    <Badge pill bordered iconDirection='right' icon={<Icon icon="akar-icons:react-fill" />} color="orange">Orange</Badge>
                </div>
            </div>
            <div className='ms-4 mb-4'>
                <h5 className="mb-2 text-gray-600 text-xl">Medium</h5>
                <div>
                    <Badge size='sm' >Blue</Badge>
                    <Badge size='sm' pill bordered iconDirection='right' icon={<Icon icon="akar-icons:react-fill" />} color="gray">Gray</Badge>
                    <Badge size='sm' color="red">Red</Badge>
                    <Badge size='sm' color="green">Green</Badge>
                    <Badge size='sm' color="yellow">Yellow</Badge>
                    <Badge size='sm' pill bordered iconDirection='right' icon={<Icon icon="akar-icons:react-fill" />} color="indigo">Indigo</Badge>
                    <Badge size='sm' color="purple">Purple</Badge>
                    <Badge size='sm' color="pink">Pink</Badge>
                    <Badge size='sm' pill bordered iconDirection='right' icon={<Icon icon="akar-icons:react-fill" />} color="orange">Orange</Badge>
                </div>
            </div>
            <div className='ms-4 mb-4'>
                <h5 className="mb-2 text-gray-600 text-xl">Large</h5>
                <div>
                    <Badge size='md' >Blue</Badge>
                    <Badge size='md' pill bordered iconDirection='right' icon={<Icon icon="akar-icons:react-fill" />} color="gray">Gray</Badge>
                    <Badge size='md' color="red">Red</Badge>
                    <Badge size='md' color="green">Green</Badge>
                    <Badge size='md' color="yellow">Yellow</Badge>
                    <Badge size='md' pill bordered iconDirection='right' icon={<Icon icon="akar-icons:react-fill" />} color="indigo">Indigo</Badge>
                    <Badge size='md' color="purple">Purple</Badge>
                    <Badge size='md' color="pink">Pink</Badge>
                    <Badge size='md' pill bordered iconDirection='right' icon={<Icon icon="akar-icons:react-fill" />} color="orange">Orange</Badge>
                </div>
            </div>
            <div className='ms-4 mb-4'>
                <h5 className="mb-2 text-gray-600 text-xl">Link</h5>
                <div>
                    <Badge link='https://google.com' size='md' icon={<Icon icon="flat-color-icons:google" />}>Search on Google</Badge>

                </div>
            </div>
        </>

    )
}

export default CBadge