import HorizontalTab from '@base/components/common/tabs/HorizontalTab';
import VerticalTab from '@base/components/common/tabs/VerticalTab'
import React from 'react'

const examnpleTabs = [
    {
        title: "Example 1",
        content: "This is the content for the Example 1 tab.",
    },
    {
        title: "Example 2",
        icon: "ic:round-dashboard",
        content: (
            <div className="text-red-500">
                This is the content for the Example 2 tab.
            </div>
        ),
    },
];

const CTabnav = () => {
    return (
        <>
            <div className='ms-4 mb-4'>
                <h5 className="mb-2 text-gray-600 text-xl">Horizontal</h5>
                <div>
                    <HorizontalTab tabs={examnpleTabs} />
                </div>
            </div>
            <div className='ms-4 mb-4'>
                <h5 className="mb-2 text-gray-600 text-xl">Vertical</h5>
                <div>
                    <VerticalTab tabs={examnpleTabs} />
                </div>
            </div>

        </>
    )
}

export default CTabnav