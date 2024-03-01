import clsx from 'clsx';
import React from 'react'
import { NavLink } from 'react-router-dom';

type Props = {
    items: {
        icon: React.ReactNode
        content: React.ReactNode
        to: string
    }[];
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
    bordered?: boolean;
    visibleAt?: "sm" | "md" | "lg" | "xl";
    type?: "default" | "appbar"

}

const BottomNavigation: React.FC<Props> = ({ items, color = "blue", bordered = false, type = "default" }) => {

    if (type === "default") {

        return (
            <div className="fixed z-50 w-full h-16 bottom-0 left-0   bg-white border-t border-gray-200 ">
                <div className="grid h-full max-w-lg grid-cols-4 mx-auto font-medium">
                    {
                        items.map((item, index) => (
                            <NavLink key={index} to={item.to} className={
                                clsx("inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50", {
                                    "border-x": bordered,
                                })
                            }>
                                <div className={clsx("", {
                                    "text-blue-500": color === "blue",
                                    "text-gray-500": color === "gray",
                                    "text-red-500": color === "red",
                                    "text-green-500": color === "green",
                                    "text-yellow-500": color === "yellow",
                                    "text-indigo-500": color === "indigo",
                                    "text-purple-500": color === "purple",
                                    "text-pink-500": color === "pink",
                                    "text-orange-500": color === "orange"
                                })}
                                >
                                    {item.icon}
                                </div>
                                <div className={clsx("text-xs", {
                                    "text-blue-500": color === "blue",
                                    "text-gray-500": color === "gray",
                                    "text-red-500": color === "red",
                                    "text-green-500": color === "green",
                                    "text-yellow-500": color === "yellow",
                                    "text-indigo-500": color === "indigo",
                                    "text-purple-500": color === "purple",
                                    "text-pink-500": color === "pink",
                                    "text-orange-500": color === "orange"
                                })}
                                >
                                    {item.content}
                                </div>

                            </NavLink>
                        ))
                    }
                </div>
            </div >
        )
    }

    else {
        return (
            <div className="fixed z-50 w-full h-16 max-w-lg -translate-x-1/2 bg-white border border-gray-200 rounded-full bottom-4 left-1/2 ">
                <div className={`grid h-full max-w-lg grid-cols-${items.length} mx-auto`}>
                    {
                        items.map((item, index) => (

                            <NavLink key={index} to={item.to} className={
                                clsx("inline-flex flex-col items-center justify-center px-5 rounded-e-full rounded-s-full hover:bg-gray-50 ", {
                                    "border-x": bordered,
                                })
                            }>
                                <div className={clsx("", {
                                    "text-blue-500": color === "blue",
                                    "text-gray-500": color === "gray",
                                    "text-red-500": color === "red",
                                    "text-green-500": color === "green",
                                    "text-yellow-500": color === "yellow",
                                    "text-indigo-500": color === "indigo",
                                    "text-purple-500": color === "purple",
                                    "text-pink-500": color === "pink",
                                    "text-orange-500": color === "orange"
                                })}
                                >
                                    {item.icon}
                                </div>
                                <div className={clsx("text-xs", {
                                    "text-blue-500": color === "blue",
                                    "text-gray-500": color === "gray",
                                    "text-red-500": color === "red",
                                    "text-green-500": color === "green",
                                    "text-yellow-500": color === "yellow",
                                    "text-indigo-500": color === "indigo",
                                    "text-purple-500": color === "purple",
                                    "text-pink-500": color === "pink",
                                    "text-orange-500": color === "orange"
                                })}
                                >
                                    {item.content}
                                </div>

                            </NavLink>
                        ))
                    }




                </div>
            </div>
        );
    }
}

export default BottomNavigation


