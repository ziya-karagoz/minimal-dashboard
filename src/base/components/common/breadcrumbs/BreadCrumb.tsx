import clsx from 'clsx';
import React from 'react';

// BreadCrumb Props
type BreadcrumbProps = {
    color?:
    | "blue"
    | "gray"
    | "red"
    | "green"
    | "yellow"
    | "indigo"
    | "purple"
    | "pink"
    | "orange";
    style?: "default" | "solid";
    items: {
        name: string;
        icon: React.ReactNode;
        link: string;
    }[];
};

const Breadcrumb: React.FC<BreadcrumbProps> = ({ style = "default", items, color = "blue" }) => {



    return (
        <nav className={clsx("flex mb-2", {
            "px-5 py-3 text-gray-700 border border-gray-200 rounded-lg bg-gray-50": style === "default",

        })
        }>
            <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                {items.map((item, index) => (
                    <li key={index} className="inline-flex items-center">
                        {index > 0 && (
                            <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                            </svg>
                        )}
                        <a href={item.link} className={
                            clsx(
                                {
                                    "inline-flex items-center gap-1 ms-1 text-sm font-medium text-gray-700 md:ms-2": style === "solid",
                                    "inline-flex items-center text-sm font-medium text-gray-700": style === "default",
                                    "hover:text-blue-600": color === "blue",
                                    "hover:text-gray-600": color === "gray",
                                    "hover:text-red-600": color === "red",
                                    "hover:text-green-600": color === "green",
                                    "hover:text-yellow-600": color === "yellow",
                                    "hover:text-indigo-600": color === "indigo",
                                    "hover:text-purple-600": color === "purple",
                                    "hover:text-pink-600": color === "pink",
                                    "hover:text-orange-600": color === "orange",
                                }
                            )
                        }>
                            {item.icon && item.icon}
                            {item.name}
                        </a>
                    </li>
                ))}
            </ol>
        </nav>
    );
};

export default Breadcrumb;
