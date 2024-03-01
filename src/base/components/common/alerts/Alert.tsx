import clsx from "clsx";
import React, { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

type Props = {
    children?: React.ReactNode;
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
    icon?: React.ReactNode | undefined;
    dismissible?: boolean;
    dismissIcon?: React.ReactNode;
    onDismiss?: () => void;
};

const Alert = ({ children, color = "blue", bordered = false, icon = undefined, dismissible = false, onDismiss, dismissIcon }: Props) => {
    const [isVisible, setIsVisible] = useState(true);

    const handleDismiss = () => {
        setIsVisible(false);
        if (onDismiss) {
            onDismiss();
        }
    };

    return (
        isVisible ? (
            <div
                className={clsx("p-4 mb-4 text-sm rounded-lg", {
                    "text-blue-800 bg-blue-50 border-blue-300 ": color === "blue",
                    "text-gray-800 bg-gray-50 border-gray-300 ": color === "gray",
                    "text-red-800 bg-red-50 border-red-300 ": color === "red",
                    "text-green-800 bg-green-50 border-green-300 ": color === "green",
                    "text-yellow-800 bg-yellow-50 border-yellow-300 ": color === "yellow",
                    "text-indigo-800 bg-indigo-50 border-indigo-300 ": color === "indigo",
                    "text-purple-800 bg-purple-50 border-purple-300 ": color === "purple",
                    "text-pink-800 bg-pink-50 border-pink-300 ": color === "pink",
                    "text-orange-800 bg-orange-50 border-orange-300 ": color === "orange",
                    "border": bordered,
                })}
                role="alert"
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-x-2">
                        {icon ? icon : null}
                        {children}
                    </div>
                    {dismissible ? (

                        dismissIcon ? dismissIcon : <button
                            onClick={handleDismiss}
                            className="text-gray-400 hover:text-gray-500"
                        >
                            <Icon icon="bx:bx-x" width="20" height="20" />
                        </button>

                    ) : null}
                </div>
            </div>
        ) : null
    );
};

export default Alert;
