import { Icon } from "@iconify/react/dist/iconify.js";
import clsx from "clsx";
import React, { useContext, useEffect } from "react";
import OutsideClickHandler from "react-outside-click-handler";

type ModalProps = {
    size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl";
    open: boolean;
    align?: "center" | "default";
    onClose: () => void;
    backdrop?: "default" | "static";
    children: React.ReactNode;
};

const ModalContext = React.createContext<{
    open: boolean;
    animate: boolean;
    onClose: () => void;
}>({
    open: false,
    animate: false,
    onClose: () => { },
});

const Modal: React.FC<ModalProps> & {
    Header: React.FC<{ children: React.ReactNode }>;
    Body: React.FC<{ children: React.ReactNode }>;
    Footer: React.FC<{ children: React.ReactNode }>;
} = ({ open, onClose, backdrop = "default", children, align = "default", size = "3xl" }) => {
    const [animate, setAnimate] = React.useState(false);
    const value = { open, animate, onClose };

    // Close modal on escape key press
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape" && open) {
                if (backdrop === "static") {
                    setAnimate(true);
                    setTimeout(() => setAnimate(false), 300); // Reset animation state after the animation duration
                }
                else onClose();
            }
        };
        window.addEventListener("keydown", handleEscape);
        return () => window.removeEventListener("keydown", handleEscape);
    }, [open, onClose, backdrop]);

    return (
        <ModalContext.Provider value={value}>
            <div
                className={clsx(
                    "overflow-y-auto overflow-x-hidden fixed z-50 justify-center items-center w-full inset-0  max-h-full bg-gray-900 bg-opacity-50 transition-all duration-300 ease-in-out",
                    {
                        hidden: !open,
                    }
                )}
            >
                <div className={clsx("relative p-4 w-full max-h-full transform", {
                    "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2": align === "center",
                    "left-1/2 top-4 -translate-x-1/2": align === "default",
                    "max-w-sm": size === "sm",
                    "max-w-md": size === "md",
                    "max-w-lg": size === "lg",
                    "max-w-xl": size === "xl",
                    "max-w-2xl": size === "2xl",
                    "max-w-3xl": size === "3xl",
                    "max-w-4xl": size === "4xl",
                    "max-w-5xl": size === "5xl",
                    "max-w-6xl": size === "6xl",
                    "max-w-7xl": size === "7xl"
                })}>
                    <OutsideClickHandler
                        onOutsideClick={() => {
                            if (backdrop === "static" && open) {
                                setAnimate(true);
                                setTimeout(() => setAnimate(false), 300); // Reset animation state after the animation duration
                            }
                            else onClose();
                        }}
                    >
                        <div
                            className={clsx(
                                "relative bg-white rounded-lg shadow transition-all duration-300 ease-in-out",
                                {
                                    "scale-[1.01]": animate,
                                    "scale-100": !animate,
                                }
                            )}
                        >
                            {children}
                        </div>
                    </OutsideClickHandler>
                </div>
            </div>
        </ModalContext.Provider>
    );
};
const ModalHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { onClose, animate } = useContext(ModalContext)!;

    return (
        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
            {children}
            <button
                type="button"
                className={clsx("text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center", {
                    "border border-red-500": animate,
                })}
                onClick={onClose}
            >
                <Icon icon="ri:close-line" className="w-4 h-4" />
                <span className="sr-only">Close modal</span>
            </button>
        </div>
    );
};

const ModalBody: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <div className="p-4 md:p-5 space-y-4">{children}</div>;
};

const ModalFooter: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b ">
            {children}
        </div>
    );
};

Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

export default Modal;
