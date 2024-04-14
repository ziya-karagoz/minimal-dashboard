import { Icon } from "@iconify/react/dist/iconify.js";
import clsx from "clsx";
import React, { useState } from "react";
import { BannerProps } from "./Banner.types";



const Banner: React.FC<BannerProps> = ({
    icon,
    children,
    dismissible = false,
    onDismiss,
    dismissIcon,
    color = "blue",
}) => {
    const [isVisible, setIsVisible] = useState(true);

    const handleDismiss = () => {
        setIsVisible(false);
        if (onDismiss) {
            onDismiss();
        }
    };

    return isVisible ? (
        <div
            className={clsx(
                "fixed top-0 start-0 z-50 flex justify-between w-full p-4 border-b",
                {
                    "border-blue-200 bg-blue-50": color === "blue",
                    "border-gray-200 bg-gray-50": color === "gray",
                    "border-primary-200 bg-primary-50": color === "red",
                    "border-green-200 bg-green-50": color === "green",
                    "border-yellow-200 bg-yellow-50": color === "yellow",
                    "border-indigo-200 bg-indigo-50": color === "indigo",
                    "border-purple-200 bg-purple-50": color === "purple",
                    "border-pink-200 bg-pink-50": color === "pink",
                    "border-orange-200 bg-orange-50": color === "orange",
                }
            )}
        >
            <div className="flex items-center mx-auto">
                <div
                    className={clsx("flex items-center text-sm font-normal", {
                        "text-blue-500": color === "blue",
                        "text-gray-500": color === "gray",
                        "text-primary-500": color === "red",
                        "text-green-500": color === "green",
                        "text-yellow-500": color === "yellow",
                        "text-indigo-500": color === "indigo",
                        "text-purple-500": color === "purple",
                        "text-pink-500": color === "pink",
                        "text-orange-500": color === "orange",
                    })}
                >
                    {icon && (
                        <span
                            className={clsx(
                                "inline-flex p-1 me-3 rounded-full  w-6 h-6 items-center justify-center flex-shrink-0",
                                {
                                    "bg-blue-200": color === "blue",
                                    "bg-gray-200": color === "gray",
                                    "bg-primary-200": color === "red",
                                    "bg-green-200": color === "green",
                                    "bg-yellow-200": color === "yellow",
                                    "bg-indigo-200": color === "indigo",
                                    "bg-purple-200": color === "purple",
                                    "bg-pink-200": color === "pink",
                                    "bg-orange-200": color === "orange",
                                }
                            )}
                        >
                            {icon}
                        </span>
                    )}
                    {children}
                </div>
            </div>
            <div className="flex items-center">
                {dismissible ? (
                    <button
                        onClick={handleDismiss}
                        type="button"
                        className={clsx(
                            "flex-shrink-0 inline-flex justify-center w-7 h-7 items-center rounded-lg text-sm p-1.5",
                            {
                                "text-blue-400 hover:bg-blue-200 hover:text-blue-900":
                                    color === "blue",
                                "text-gray-400 hover:bg-gray-200 hover:text-gray-900":
                                    color === "gray",
                                "text-primary-400 hover:bg-primary-200 hover:text-primary-900":
                                    color === "red",
                                "text-green-400 hover:bg-green-200 hover:text-green-900":
                                    color === "green",
                                "text-yellow-400 hover:bg-yellow-200 hover:text-yellow-900":
                                    color === "yellow",
                                "text-indigo-400 hover:bg-indigo-200 hover:text-indigo-900":
                                    color === "indigo",
                                "text-purple-400 hover:bg-purple-200 hover:text-purple-900":
                                    color === "purple",
                                "text-pink-400 hover:bg-pink-200 hover:text-pink-900":
                                    color === "pink",
                                "text-orange-400 hover:bg-orange-200 hover:text-orange-900":
                                    color === "orange",
                            }
                        )}
                    >
                        {dismissIcon ? (
                            dismissIcon
                        ) : (
                            <Icon icon="bi:x" className="w-4 h-4" />
                        )}
                    </button>
                ) : null}
            </div>
        </div>
    ) : null;
};

export default Banner;
