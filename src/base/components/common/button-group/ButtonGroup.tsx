import clsx from "clsx";
import React from "react";
import { ButtonGroupProps } from "./ButtonGroup.types";



const ButtonGroup: React.FC<ButtonGroupProps> = ({
    color = "blue",
    buttons,
    outlined = false,
}) => {
    return (
        <div className="inline-flex rounded-md shadow-sm">
            {buttons.map((button, index) =>
                !button.to ? (
                    <button
                        type="button"
                        className={clsx(
                            "inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-2",
                            {
                                "text-blue-700 border-blue-200 hover:text-blue-700 focus:ring-blue-700 focus:text-blue-700 hover:bg-blue-100":
                                    color === "blue",
                                "text-gray-700 border-gray-200 hover:text-gray-700 focus:ring-gray-700 focus:text-gray-700 hover:bg-gray-100":
                                    color === "gray",
                                "text-red-700 border-red-200 hover:text-red-700 focus:ring-red-700 focus:text-red-700 hover:bg-red-100":
                                    color === "red",
                                "text-green-700  border-green-200 hover:text-green-700 focus:ring-green-700 focus:text-green-700 hover:bg-green-100":
                                    color === "green",
                                "text-yellow-700 border-yellow-200 hover:text-yellow-700 focus:ring-yellow-700 focus:text-yellow-700 hover:bg-yellow-100":
                                    color === "yellow",
                                "text-indigo-700 border-indigo-200 hover:text-indigo-700 focus:ring-indigo-700 focus:text-indigo-700 hover:bg-indigo-100":
                                    color === "indigo",
                                "text-purple-700 border-purple-200 hover:text-purple-700 focus:ring-purple-700 focus:text-purple-700 hover:bg-purple-100":
                                    color === "purple",
                                "text-pink-700 border-pink-200 hover:text-pink-700 focus:ring-pink-700 focus:text-pink-700 hover:bg-pink-100":
                                    color === "pink",
                                "text-orange-700 border-orange-200 hover:text-orange-700 focus:ring-orange-700 focus:text-orange-700 hover:bg-orange-100":
                                    color === "orange",
                                "bg-transparent border-blue-800": outlined && color === "blue",
                                "bg-transparent border-gray-800": outlined && color === "gray",
                                "bg-transparent border-red-800": outlined && color === "red",
                                "bg-transparent border-green-800":
                                    outlined && color === "green",
                                "bg-transparent border-yellow-800":
                                    outlined && color === "yellow",
                                "bg-transparent border-indigo-800":
                                    outlined && color === "indigo",
                                "bg-transparent border-purple-800":
                                    outlined && color === "purple",
                                "bg-transparent border-pink-800": outlined && color === "pink",
                                "bg-transparent border-orange-800":
                                    outlined && color === "orange",

                                "rounded-l-lg": index === 0,
                                "border-l-0": index !== 0,
                                "rounded-r-lg": index === buttons.length - 1,
                            }
                        )}
                        key={index}
                        onClick={button.onClick}
                    >
                        {button.icon} {button.content}
                    </button>
                ) : (
                    <a
                        href={button.to}
                        className={clsx(
                            "inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200  focus:z-10 focus:ring-2",
                            {
                                "text-blue-700 border-blue-200 hover:text-blue-700 focus:ring-blue-700 focus:text-blue-700 hover:bg-blue-100":
                                    color === "blue",
                                "text-gray-700 border-gray-200 hover:text-gray-700 focus:ring-gray-700 focus:text-gray-700 hover:bg-gray-100":
                                    color === "gray",
                                "text-red-700 border-red-200 hover:text-red-700 focus:ring-red-700 focus:text-red-700 hover:bg-red-100":
                                    color === "red",
                                "text-green-700 border-green-200 hover:text-green-700 focus:ring-green-700 focus:text-green-700 hover:bg-green-100":
                                    color === "green",
                                "text-yellow-700 border-yellow-200 hover:text-yellow-700 focus:ring-yellow-700 focus:text-yellow-700 hover:bg-yellow-100":
                                    color === "yellow",
                                "text-indigo-700 border-indigo-200 hover:text-indigo-700 focus:ring-indigo-700 focus:text-indigo-700 hover:bg-indigo-100":
                                    color === "indigo",
                                "text-purple-700 border-purple-200 hover:text-purple-700 focus:ring-purple-700 focus:text-purple-700 hover:bg-purple-100":
                                    color === "purple",
                                "text-pink-700 border-pink-200 hover:text-pink-700 focus:ring-pink-700 focus:text-pink-700 hover:bg-pink-100":
                                    color === "pink",
                                "text-orange-700 border-orange-200 hover:text-orange-700 focus:ring-orange-700 focus:text-orange-700 hover:bg-orange-100":
                                    color === "orange",
                                "bg-transparent border-blue-800": outlined && color === "blue",
                                "bg-transparent border-gray-800": outlined && color === "gray",
                                "bg-transparent border-red-800": outlined && color === "red",
                                "bg-transparent border-green-800":
                                    outlined && color === "green",
                                "bg-transparent border-yellow-800":
                                    outlined && color === "yellow",
                                "bg-transparent border-indigo-800":
                                    outlined && color === "indigo",
                                "bg-transparent border-purple-800":
                                    outlined && color === "purple",
                                "bg-transparent border-pink-800": outlined && color === "pink",
                                "bg-transparent border-orange-800":
                                    outlined && color === "orange",

                                "rounded-l-lg": index === 0,
                                "border-l-0": index !== 0,
                                "rounded-r-lg": index === buttons.length - 1,
                            }
                        )}
                        key={index}
                    >
                        {button.icon} {button.content}
                    </a>
                )
            )}
        </div>
    );
};

export default ButtonGroup;
