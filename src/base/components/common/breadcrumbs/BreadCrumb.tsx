import clsx from "clsx";
import React from "react";
import { NavLink } from "react-router-dom";
import { BreadcrumbProps } from "./Breadcrumb.types";


const Breadcrumb: React.FC<BreadcrumbProps> = ({
    style = "default",
    items,
    color = "blue",
}) => {
    return (
        <nav
            className={clsx("flex mb-4", {
                "px-5 py-3 text-gray-700 border border-gray-200 rounded-lg bg-gray-50":
                    style === "default",
            })}
        >
            <ol className="fb-breadcrumb inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                {items.map((item, index) => (
                    <li key={index} className="inline-flex items-center">
                        {index > 0 && (
                            <svg
                                className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 6 10"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m1 9 4-4-4-4"
                                />
                            </svg>
                        )}
                        {item.disabled ? (
                            <span className="inline-flex items-center text-sm font-medium text-gray-500 cursor-default">
                                {item.icon && item.icon}
                                {item.name}
                            </span>
                        ) : (
                            <NavLink
                                end
                                to={item.link}
                                className={clsx(
                                    "inline-flex items-center  text-sm font-medium",
                                    {
                                        "gap-1 ms-1 md:ms-2": style === "solid",
                                        "text-blue-500 hover:text-blue-600": color === "blue",
                                        "text-gray-500 hover:text-gray-600": color === "gray",
                                        "text-red-500 hover:text-red-600": color === "red",
                                        "text-green-500 hover:text-green-600": color === "green",
                                        "text-yellow-500 hover:text-yellow-600": color === "yellow",
                                        "text-indigo-500 hover:text-indigo-600": color === "indigo",
                                        "text-purple-500 hover:text-purple-600": color === "purple",
                                        "text-pink-500 hover:text-pink-600": color === "pink",
                                        "text-orange-500 hover:text-orange-600": color === "orange",
                                    }
                                )}
                            >
                                {item.icon && item.icon}
                                {item.name}
                            </NavLink>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
};

export default Breadcrumb;
