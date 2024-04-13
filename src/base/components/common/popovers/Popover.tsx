import clsx from "clsx";
import React, { useState, useEffect, useRef } from "react";
import OutsideClickHandler from "react-outside-click-handler";

interface PopoverProps {
    id: string;
    children: React.ReactNode;
    trigger: "click" | "hover";
    shouldStayVisibleAfterClick?: boolean;
}

const Popover: React.FC<PopoverProps> = ({
    id,
    children,
    trigger = "click",
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const targetElementRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        targetElementRef.current = document.querySelector(
            `[data-popover-id="${id}"]`
        );
        if (trigger === "hover") {
            targetElementRef.current?.addEventListener("mouseenter", () =>
                setIsVisible(true)
            );
            targetElementRef.current?.addEventListener("mouseleave", () => setIsVisible(false));
        } else if (trigger === "click") {
            targetElementRef.current?.addEventListener("click", () =>
                setIsVisible(!isVisible)
            );
        }
    }, [id]);

    return (
        <OutsideClickHandler onOutsideClick={() => setIsVisible(false)}>
            <div
                className={clsx(
                    "absolute z-50 inline-block w-64 text-sm text-gray-500 bg-white border border-gray-200 rounded-lg shadow-sm transition-opacity duration-300",
                    {
                        "opacity-0 invisible": !isVisible,
                        "opacity-100 visible": isVisible,
                    }
                )}
            >
                {children}
            </div>
        </OutsideClickHandler>
    );
};

export default Popover;
