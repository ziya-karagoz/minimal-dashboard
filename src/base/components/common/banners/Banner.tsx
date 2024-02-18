import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";

type Props = {
    icon?: React.ReactNode;
    children: React.ReactNode;
    dismissible?: boolean;
    dissmissIcon?: React.ReactNode;
    onDismiss?: () => void;
};

const Banner: React.FC<Props> = ({
    icon,
    children,
    dismissible = false,
    onDismiss,
    dissmissIcon,
}) => {
    const [isVisible, setIsVisible] = useState(true);

    const handleDismiss = () => {
        setIsVisible(false);
        if (onDismiss) {
            onDismiss();
        }
    };

    return (
        <div
            id="sticky-banner"
            className="fixed top-0 start-0 z-50 flex justify-between w-full p-4 border-b border-gray-200 bg-gray-50 "
        >
            <div className="flex items-center mx-auto">
                <p className="flex items-center text-sm font-normal text-gray-500 ">
                    {icon && (
                        <span className="inline-flex p-1 me-3 bg-gray-200 text-gray-500 rounded-full  w-6 h-6 items-center justify-center flex-shrink-0">
                            {icon}
                        </span>
                    )}
                    {children}
                </p>
            </div>
            <div className="flex items-center">
                {dismissible ? (
                    <button
                        data-dismiss-target="#sticky-banner"
                        type="button"
                        className="flex-shrink-0 inline-flex justify-center w-7 h-7 items-center text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 "
                    >
                        {dissmissIcon ? (
                            dissmissIcon
                        ) : (
                            <Icon icon="bi:x" className="w-4 h-4" />
                        )}
                    </button>
                ) : null}
            </div>
        </div>
    );
}

export default Banner;