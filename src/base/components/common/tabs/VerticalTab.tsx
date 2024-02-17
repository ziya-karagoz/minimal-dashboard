import { Icon } from '@iconify/react/dist/iconify.js';
import React, { useState } from 'react';

type Props = {
    tabs: {
        title: string;
        icon?: string;
        content: React.ReactNode;
    }[];
};

const VerticalTab = ({ tabs }: Props) => {
    const [activeTab, setActiveTab] = useState(tabs[0].title);

    return (
        <div className="md:flex">
            <ul className="flex-column space-y space-y-4 text-sm font-medium text-gray-500  md:me-4 mb-4 md:mb-0">
                {tabs.map((tab) => (
                    <li key={tab.title}>
                        <span
                            onClick={() => setActiveTab(tab.title)}
                            className={`cursor-pointer inline-flex items-center px-4 py-3 rounded-lg w-full ${activeTab === tab.title
                                ? 'text-gray-900 bg-gray-200'
                                : 'hover:text-gray-900 bg-gray-50 hover:bg-gray-100'
                                }`}
                        >
                            {tab.icon && <Icon icon={tab.icon} className="me-2" />}
                            {tab.title}
                        </span>
                    </li>
                ))}
            </ul>
            <div className="p-6 bg-gray-50 text-medium text-gray-500 rounded-lg w-full flex-1">
                {tabs.map(
                    (tab) =>
                        activeTab === tab.title && (
                            <div key={tab.title}>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">{tab.title}</h3>
                                <div>{tab.content}</div>
                            </div>
                        )
                )}
            </div>
        </div>
    );
};

export default VerticalTab;
