import Indicator from '@base/components/common/indicators/Indicator'

const CIndicator = () => {
    return (
        <>
            <div className='ms-4 mb-4'>
                <h5 className="mb-2 text-gray-600 text-xl">Colors</h5>
                <div className='flex'>
                    <Indicator>Blue</Indicator>
                    <Indicator color="gray">Gray</Indicator>
                    <Indicator color="red">Red</Indicator>
                    <Indicator color="green">Green</Indicator>
                    <Indicator color="yellow">Yellow</Indicator>
                    <Indicator color="indigo">Indigo</Indicator>
                    <Indicator color="purple">Purple</Indicator>
                    <Indicator color="pink">Pink</Indicator>
                    <Indicator color="orange">Orange</Indicator>

                </div>
            </div>
            <div className='ms-4 mb-4'>
                <h5 className="mb-2 text-gray-600 text-xl">Without Texts</h5>
                <div className='flex'>
                    <Indicator />
                    <Indicator color="gray" />
                    <Indicator color="red" />
                    <Indicator color="green" />
                    <Indicator color="yellow" />
                    <Indicator color="indigo" />
                    <Indicator color="purple" />
                    <Indicator color="pink" />
                    <Indicator color="orange" />

                </div>
            </div>
        </>
    )
}

export default CIndicator